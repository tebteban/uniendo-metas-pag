/**
 * UNIENDO METAS - Panel de Administracion
 *
 * Desarrollado por: Ezequiel "Talleres" Rossetti y Esteban Cejas.
 * Fecha: Marzo 2026
 * Stack: Node.js + Express + EJS + PostgreSQL
 *
 * v1.2.0 - Mejoras de seguridad: helmet, rate limiting, sanitización XSS.
 */

require('dotenv').config();

const express    = require('express');
const path       = require('path');
const session    = require('express-session');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const sanitizeInputs = require('./backend/middlewares/sanitizeMiddleware');

const app = express();

const PORT         = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// --- SEGURIDAD ---------------------------------------------------------------
// Helmet: agrega headers de seguridad (X-Frame-Options, X-Content-Type, etc.)
app.use(helmet({
    contentSecurityPolicy: false, // Desactivado para compatibilidad con EJS inline scripts
    crossOriginEmbedderPolicy: false
}));

// Rate Limiting global: máximo 100 peticiones por minuto por IP
const generalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Demasiadas peticiones desde esta IP. Intentá de nuevo en un momento.'
});
app.use(generalLimiter);

// Rate Limiting estricto para login: máximo 5 intentos por minuto
const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Demasiados intentos de inicio de sesión. Esperá un minuto antes de reintentar.',
    skipSuccessfulRequests: true // No contar peticiones exitosas
});

// --- MIDDLEWARE --------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'frontend/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sanitización XSS: limpia todos los inputs de texto automáticamente
app.use(sanitizeInputs);

if (isProduction) {
    app.set('trust proxy', 1);
}

if (!process.env.SESSION_SECRET) {
    console.warn('⚠️  ADVERTENCIA: SESSION_SECRET no está definido en .env. Usando clave por defecto (NO USAR EN PRODUCCIÓN).');
}

app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-only-secret-key-cambiar-en-produccion',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: isProduction,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// --- MOTOR DE PLANTILLAS ----------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/views'));

// --- SETTINGS GLOBALES ------------------------------------------------------
const globalSettingsMiddleware = require('./backend/middlewares/globalSettingsMiddleware');
app.use(globalSettingsMiddleware);

// --- RUTAS ------------------------------------------------------------------
const mainRoutes  = require('./backend/routes/mainRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');

// Aplicar rate limit estricto solo a la ruta de login
app.use('/admin/login', loginLimiter);

app.use('/admin', adminRoutes);
app.use('/', mainRoutes);

// --- ERROR 500 --------------------------------------------------------------
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Error del Servidor' });
});

// --- BASE DE DATOS ----------------------------------------------------------
const sequelize   = require('./backend/database/config');
const User        = require('./backend/database/models/User');
const Setting     = require('./backend/database/models/Setting');
const Organ       = require('./backend/database/models/Organ');
const Schedule    = require('./backend/database/models/Schedule');
const Authority   = require('./backend/database/models/Authority');
const Inscription  = require('./backend/database/models/Inscription');
const OrganCountry = require('./backend/database/models/OrganCountry');

async function initializeDatabase() {
    try {
        await sequelize.sync();
        console.log('Servidor: Base de datos sincronizada');

        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminExists   = await User.findOne({ where: { username: adminUsername } });
        if (!adminExists) {
            if (!adminPassword) {
                console.warn('⚠️  ADVERTENCIA: ADMIN_PASSWORD no está definido en .env. Creando admin con contraseña temporal. CAMBIALA DESDE EL PANEL.');
            }
            await User.create({
                username: adminUsername,
                password: adminPassword || 'CambiarEstaContraseña2026!',
                role: 'admin'
            });
            console.log(`Servidor: Usuario admin creado: ${adminUsername}`);
        }

        // Crear órganos por defecto si la tabla está vacía
        const organCount = await Organ.count();
        if (organCount === 0) {
            await Organ.bulkCreate([
                { name: 'Asamblea General (AG)', color: '#73A950', description: 'Principal órgano deliberativo y representativo de la ONU.' },
                { name: 'Sala de Tratados Internacionales (STI)', color: '#FFB819', description: 'Espacio diplomático de negociación directa y firma de acuerdos bilaterales y multilaterales.' },
                { name: 'Consejo Económico y Social (ECOSOC)', color: '#E15829', description: 'Órgano de debate y coordinación de asuntos económicos, sociales y ambientales.' },
                { name: 'ONUDD', color: '#61B4E4', description: 'Oficina de las Naciones Unidas contra la Droga y el Delito.' },
                { name: 'Consejo de Seguridad Histórico (CSH)', color: '#A02140', description: 'Simulación histórica del Consejo de Seguridad de Naciones Unidas.' }
            ]);
            console.log('Servidor: Órganos iniciales creados por defecto');
        }
    } catch (error) {
        console.error('Error inicializando base de datos:', error);
    }
}

initializeDatabase();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Presiona Ctrl + C para detenerlo`);
});

module.exports = app;
