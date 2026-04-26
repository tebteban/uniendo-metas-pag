/**
 * adminCertificatesController.js
 * Genera certificados PDF y los envía por mail.
 *
 * npm install puppeteer archiver nodemailer
 *
 * Variables de entorno requeridas:
 *   MAIL_USER=tumail@gmail.com
 *   MAIL_PASS=xxxx xxxx xxxx xxxx   ← contraseña de aplicación de Google
 */

const Inscription = require('../database/models/Inscription');
const puppeteer   = require('puppeteer');
const archiver    = require('archiver');
const nodemailer  = require('nodemailer');
const path        = require('path');
const fs          = require('fs');

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function extraerDatos(inscripcion) {
    const data = inscripcion.data || {};
    const name = inscripcion.name || data.nombre || 'Participante';

    let rol = '';
    switch (inscripcion.type) {
        case 'autoridad':
            rol = data.rol || 'Autoridad';
            break;
        case 'delegado':
            rol = data.organo ? `Delegado — ${data.organo}` : 'Delegado';
            break;
        case 'voluntario':
            rol = data.area ? `Voluntario — ${data.area}` : 'Voluntario';
            break;
        default:
            rol = inscripcion.type || 'Participante';
    }

    return { name, rol };
}

function imagenABase64(filePath) {
    try {
        if (!fs.existsSync(filePath)) return null;
        const ext  = path.extname(filePath).replace('.', '') || 'jpeg';
        const mime = ext === 'jpg' ? 'jpeg' : ext;
        const data = fs.readFileSync(filePath).toString('base64');
        return `data:image/${mime};base64,${data}`;
    } catch (e) {
        console.error('Error leyendo imagen:', e.message);
        return null;
    }
}

function obtenerImagenFondo(tipo, appDir) {
    const intentos = [
        path.join(appDir, 'public', 'img', `cert_${tipo}.jpg`),
        path.join(appDir, 'public', 'img', `cert_${tipo}.png`),
        path.join(appDir, 'public', 'img', 'cert_base.jpg'),
        path.join(appDir, 'public', 'img', 'cert_base.png'),
    ];
    for (const p of intentos) {
        const b64 = imagenABase64(p);
        if (b64) return b64;
    }
    return null;
}

async function obtenerImagenDB() {
    try {
        const s = await Setting.findOne({ where: { key: 'cert_imagen_base' } });
        return (s && s.value) ? s.value : null;
    } catch {
        return null;
    }
}

async function urlABase64(urlOrPath) {
    // Si es ruta local (Windows C:\ o Unix /path), leer del disco directamente
    if (!urlOrPath.startsWith('http://') && !urlOrPath.startsWith('https://')) {
        return imagenABase64(urlOrPath);
    }
    try {
        const https = require('https');
        const http  = require('http');
        const lib   = urlOrPath.startsWith('https') ? https : http;
        const safeUrl = urlOrPath.replace(/ /g, '%20');
        return await new Promise((resolve, reject) => {
            lib.get(safeUrl, (res) => {
                // Seguir redirecciones
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    urlABase64(res.headers.location).then(resolve).catch(reject);
                    return;
                }
                const chunks = [];
                res.on('data', c => chunks.push(c));
                res.on('end', () => {
                    const buf  = Buffer.concat(chunks);
                    const mime = (res.headers['content-type'] || 'image/jpeg').split(';')[0];
                    resolve(`data:${mime};base64,${buf.toString('base64')}`);
                });
                res.on('error', reject);
            }).on('error', reject);
        });
    } catch (e) {
        console.error('Error descargando imagen:', e.message);
        return null;
    }
}

async function resolverImagenFondo(tipo, appDir) {
    const urlDB = await obtenerImagenDB();
    if (urlDB && (urlDB.startsWith('http://') || urlDB.startsWith('https://'))) {
        // Producción: URL de Cloudinary → descargar y convertir a base64
        const b64 = await urlABase64(urlDB);
        if (b64) return b64;
    }
    // Local o fallback: buscar cert_base.png / cert_<tipo>.png en public/img
    return obtenerImagenFondo(tipo, appDir);
}

function generarHTML({ name, rol, imagenBase64, subtitulo }) {
    const fondo = imagenBase64
        ? `background-image: url('${imagenBase64}'); background-size: cover; background-position: center;`
        : `background: #fff; border: 2px solid #ccc;`;

    const texto = subtitulo || SUBTITULO_DEFAULT;

    let nombreFontSize = 36;
    if (name.length > 38) nombreFontSize = 24;
    else if (name.length > 32) nombreFontSize = 28;
    else if (name.length > 26) nombreFontSize = 32;

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1123px; height: 794px; font-family: 'Montserrat', sans-serif; overflow: hidden; }
    .cert { width: 1123px; height: 794px; position: relative; ${fondo} }
    .nombre {
      position: absolute; top: 49%; left: 50%;
      transform: translate(-50%, -50%);
      width: 64%; text-align: center;
      font-size: ${nombreFontSize}px; font-weight: 900; color: #1A3A6B;
      letter-spacing: 0.01em; line-height: 1.15;
      white-space: nowrap;
    }
    .descripcion {
      position: absolute; top: 61%; left: 50%;
      transform: translate(-50%, -50%);
      width: 56%; text-align: center;
      font-size: 15px; font-weight: 400; color: #444; line-height: 1.75;
    }
    .descripcion strong { font-weight: 800; color: #1A3A6B; }
  </style>
</head>
<body>
  <div class="cert">
    <div class="nombre">${name}</div>
    <div class="descripcion">
      ${texto} <strong>${rol.toUpperCase()}.</strong>
    </div>
  </div>
</body>
</html>`;
}

// ─── PUPPETEER ────────────────────────────────────────────────────────────────

async function lanzarBrowser() {
    return puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: 'new',
    });
}

async function htmlAPDF(browser, html) {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
        width: '1123px',
        height: '794px',
        printBackground: true,
    });
    await page.close();
    return pdf;
}

// ─── MAIL ─────────────────────────────────────────────────────────────────────

function crearTransporter() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
}

function asuntoMail() {
    return 'Tu certificado — XII Encuentro Uniendo Metas Santiago del Estero';
}

function cuerpoMail(name) {
    return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: auto; color: #1e293b;">
  <div style="background: linear-gradient(135deg, #A02140, #61B4E4); padding: 32px 24px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: #fff; font-size: 22px; margin: 0; font-weight: 800; letter-spacing: -0.3px;">
      Uniendo Metas · Santiago del Estero
    </h1>
    <p style="color: rgba(255,255,255,0.85); font-size: 13px; margin: 6px 0 0;">
      XII Encuentro Provincial
    </p>
  </div>
  <div style="background: #fff; padding: 32px 28px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
    <p style="font-size: 16px; font-weight: 700; margin: 0 0 12px;">Hola, ${name}!</p>
    <p style="font-size: 14px; color: #475569; line-height: 1.7; margin: 0 0 20px;">
      Queremos agradecerte por tu participación en el <strong>XII Encuentro Provincial Uniendo Metas</strong>.
      Adjunto a este correo encontrás tu <strong>certificado de participación</strong> en formato PDF.
    </p>
    <p style="font-size: 14px; color: #475569; line-height: 1.7; margin: 0 0 28px;">
      Fue un placer compartir esta experiencia con vos. ¡Esperamos verte en la próxima edición!
    </p>
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 20px;">
    <p style="font-size: 12px; color: #94a3b8; margin: 0;">
      Este mensaje fue enviado automáticamente por el sistema de Uniendo Metas.
      Si creés que fue un error, ignorá este correo.
    </p>
  </div>
</div>`;
}

// ─── CONTROLADOR ─────────────────────────────────────────────────────────────

const TIPOS = ['delegado', 'autoridad', 'voluntario'];
const Setting = require('../database/models/Setting');
const SUBTITULO_DEFAULT = 'Por su participación en el "XII Encuentro Provincial Uniendo Metas Santiago del Estero" llevado a cabo los días 8 y 9 de Octubre del año 2025, desempeñando el rol de';

async function obtenerSubtitulo() {
    try {
        const s = await Setting.findOne({ where: { key: 'cert_subtitulo' } });
        return (s && s.value) ? s.value : SUBTITULO_DEFAULT;
    } catch {
        return SUBTITULO_DEFAULT;
    }
}

exports.index = async (req, res) => {
    try {
        const counts = {};
        for (const tipo of TIPOS) {
            counts[tipo] = await Inscription.count({ where: { type: tipo } });
        }
        const subtitulo = await obtenerSubtitulo();
        const imagenBase = await obtenerImagenDB();
        res.render('admin/certificados/index', {
            title: 'Certificados | Panel Admin',
            counts,
            tipos: TIPOS,
            user: req.session.user,
            subtitulo,
            imagenBase,
            flash: req.session.flash || null,
        });
        delete req.session.flash;
    } catch (err) {
        console.error(err);
        res.status(500).send('Error cargando certificados');
    }
};

exports.guardarSubtitulo = async (req, res) => {
    try {
        const { subtitulo } = req.body;
        if (!subtitulo || !subtitulo.trim()) {
            return res.status(400).json({ ok: false, msg: 'El texto no puede estar vacío' });
        }
        const [setting, created] = await Setting.findOrCreate({
            where: { key: 'cert_subtitulo' },
            defaults: { key: 'cert_subtitulo', value: subtitulo.trim(), type: 'textarea', label: 'Certificados - Texto subtítulo' },
        });
        if (!created) await setting.update({ value: subtitulo.trim() });
        res.json({ ok: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, msg: 'Error guardando el texto' });
    }
};

exports.lista = async (req, res) => {
    try {
        const { tipo } = req.params;
        if (!TIPOS.includes(tipo)) return res.status(400).json([]);
        const items = await Inscription.findAll({
            where: { type: tipo },
            attributes: ['id', 'name', 'data', 'email'],
            order: [['name', 'ASC']],
        });
        res.json(items.map(i => ({
            id: i.id,
            email: i.email || (i.data && i.data.email) || null,
            ...extraerDatos(i),
        })));
    } catch (err) {
        console.error(err);
        res.status(500).json([]);
    }
};

exports.preview = async (req, res) => {
    try {
        const ins = await Inscription.findByPk(req.params.id);
        if (!ins) return res.status(404).send('No encontrado');
        const appDir = path.join(__dirname, '../..');
        const imagenBase64 = await resolverImagenFondo(ins.type, appDir);
        const { name, rol } = extraerDatos(ins);
        const subtitulo = await obtenerSubtitulo();
        res.send(generarHTML({ name, rol, imagenBase64, subtitulo }));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
};

exports.descargar = async (req, res) => {
    let browser;
    try {
        const ins = await Inscription.findByPk(req.params.id);
        if (!ins) return res.status(404).send('No encontrado');
        const appDir = path.join(__dirname, '../..');
        const imagenBase64 = await resolverImagenFondo(ins.type, appDir);
        const { name, rol } = extraerDatos(ins);
        const subtitulo = await obtenerSubtitulo();
        browser = await lanzarBrowser();
        const pdf = await htmlAPDF(browser, generarHTML({ name, rol, imagenBase64, subtitulo }));
        await browser.close();
        const safeName = name.replace(/[^a-z0-9áéíóúñ ]/gi, '_').trim();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="certificado_${safeName}.pdf"`);
        res.send(pdf);
    } catch (err) {
        if (browser) await browser.close().catch(() => {});
        console.error(err);
        res.status(500).send('Error generando PDF');
    }
};

exports.descargarTodos = async (req, res) => {
    let browser;
    try {
        const { tipo } = req.params;
        if (!TIPOS.includes(tipo)) return res.status(400).send('Tipo inválido');
        const items = await Inscription.findAll({ where: { type: tipo } });
        if (!items.length) {
            req.session.flash = { type: 'warning', msg: `No hay inscriptos de tipo "${tipo}"` };
            return res.redirect('/admin/certificados');
        }
        const appDir = path.join(__dirname, '../..');
        const imagenBase64 = await resolverImagenFondo(tipo, appDir);
        const subtitulo = await obtenerSubtitulo();
        browser = await lanzarBrowser();
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="certificados_${tipo}.zip"`);
        const archive = archiver('zip', { zlib: { level: 6 } });
        archive.pipe(res);
        for (const ins of items) {
            const { name, rol } = extraerDatos(ins);
            const pdf = await htmlAPDF(browser, generarHTML({ name, rol, imagenBase64, subtitulo }));
            const safeName = name.replace(/[^a-z0-9áéíóúñ ]/gi, '_').trim();
            archive.append(pdf, { name: `${safeName}.pdf` });
        }
        await browser.close();
        await archive.finalize();
    } catch (err) {
        if (browser) await browser.close().catch(() => {});
        console.error(err);
        if (!res.headersSent) res.status(500).send('Error generando ZIP');
    }
};

// ─── ENVIAR MAIL INDIVIDUAL ───────────────────────────────────────────────────

exports.enviarMail = async (req, res) => {
    let browser;
    try {
        const ins = await Inscription.findByPk(req.params.id);
        if (!ins) return res.status(404).json({ ok: false, msg: 'Inscripto no encontrado' });

        const email = ins.email || (ins.data && ins.data.email);
        if (!email) return res.status(400).json({ ok: false, msg: 'Este inscripto no tiene email cargado' });

        const appDir = path.join(__dirname, '../..');
        const imagenBase64 = await resolverImagenFondo(ins.type, appDir);
        const { name, rol } = extraerDatos(ins);
        const subtitulo = await obtenerSubtitulo();

        browser = await lanzarBrowser();
        const pdf = await htmlAPDF(browser, generarHTML({ name, rol, imagenBase64, subtitulo }));
        await browser.close();

        const transporter = crearTransporter();
        const safeName = name.replace(/[^a-z0-9áéíóúñ ]/gi, '_').trim();

        await transporter.sendMail({
            from: `"Uniendo Metas SDE" <${process.env.MAIL_USER}>`,
            to: email,
            subject: asuntoMail(),
            html: cuerpoMail(name),
            attachments: [{
                filename: `certificado_${safeName}.pdf`,
                content: pdf,
                contentType: 'application/pdf',
            }],
        });

        res.json({ ok: true, msg: `Certificado enviado a ${email}` });
    } catch (err) {
        if (browser) await browser.close().catch(() => {});
        console.error('Error enviando mail:', err);
        res.status(500).json({ ok: false, msg: 'Error al enviar el mail' });
    }
};

// ─── ENVIAR MAIL A TODOS ──────────────────────────────────────────────────────

exports.enviarMailTodos = async (req, res) => {
    let browser;
    try {
        const { tipo } = req.params;
        if (!TIPOS.includes(tipo)) return res.status(400).json({ ok: false, msg: 'Tipo inválido' });

        const items = await Inscription.findAll({ where: { type: tipo } });
        if (!items.length) return res.status(400).json({ ok: false, msg: 'No hay inscriptos' });

        const appDir = path.join(__dirname, '../..');
        const imagenBase64 = await resolverImagenFondo(tipo, appDir);
        const subtitulo = await obtenerSubtitulo();
        const transporter = crearTransporter();
        browser = await lanzarBrowser();

        let enviados = 0;
        let sinEmail = 0;
        const errores = [];

        for (const ins of items) {
            const email = ins.email || (ins.data && ins.data.email);
            if (!email) { sinEmail++; continue; }

            const { name, rol } = extraerDatos(ins);
            try {
                const pdf = await htmlAPDF(browser, generarHTML({ name, rol, imagenBase64, subtitulo }));
                const safeName = name.replace(/[^a-z0-9áéíóúñ ]/gi, '_').trim();
                await transporter.sendMail({
                    from: `"Uniendo Metas SDE" <${process.env.MAIL_USER}>`,
                    to: email,
                    subject: asuntoMail(),
                    html: cuerpoMail(name),
                    attachments: [{
                        filename: `certificado_${safeName}.pdf`,
                        content: pdf,
                        contentType: 'application/pdf',
                    }],
                });
                enviados++;
            } catch (e) {
                errores.push(`${name}: ${e.message}`);
            }
        }

        await browser.close();
        res.json({
            ok: true,
            msg: `${enviados} certificados enviados. ${sinEmail} sin email. ${errores.length} errores.`,
            errores,
        });
    } catch (err) {
        if (browser) await browser.close().catch(() => {});
        console.error('Error enviando mails:', err);
        res.status(500).json({ ok: false, msg: 'Error en el proceso de envío' });
    }
};

// ─── GUARDAR IMAGEN BASE ──────────────────────────────────────────────────────

exports.guardarImagenBase = async (req, res) => {
    try {
        const file = req.files && req.files[0];
        if (!file) return res.status(400).json({ ok: false, msg: 'No se recibió ninguna imagen' });

        const isProduction = process.env.NODE_ENV === 'production';
        let urlAGuardar;

        if (isProduction) {
            // En producción: Cloudinary devuelve file.path como URL https://
            urlAGuardar = file.path;
        } else {
            // En local: copiar el archivo a public/img/cert_base.png (nombre fijo)
            const ext  = path.extname(file.originalname).toLowerCase() || '.png';
            const dest = path.join(__dirname, '../..', 'public', 'img', `cert_base${ext}`);
            fs.copyFileSync(file.path, dest);
            urlAGuardar = dest;
        }

        if (!urlAGuardar) return res.status(400).json({ ok: false, msg: 'No se pudo obtener la URL de la imagen' });

        const [setting, created] = await Setting.findOrCreate({
            where: { key: 'cert_imagen_base' },
            defaults: { key: 'cert_imagen_base', value: urlAGuardar, type: 'image', label: 'Certificados - Imagen base' },
        });
        if (!created) await setting.update({ value: urlAGuardar });

        // Para el preview en el panel: devolver URL relativa si es local
        const urlPreview = isProduction ? urlAGuardar : null;
        res.json({ ok: true, url: urlPreview });
    } catch (err) {
        console.error('Error guardando imagen base:', err);
        res.status(500).json({ ok: false, msg: 'Error guardando la imagen' });
    }
};
