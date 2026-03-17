const Inscription = require('../database/models/Inscription');
const xlsx = require('xlsx');
const fs = require('fs');

const controller = {
    index: async (req, res) => {
        try {
            const { type } = req.params;
            const inscriptions = await Inscription.findAll({
                where: { type },
                order: [['createdAt', 'DESC']]
            });

            let title = 'Inscripciones';
            if (type === 'voluntario') title = 'Inscripciones: Voluntarios';
            if (type === 'escuela') title = 'Inscripciones: Colegios/Docentes';
            if (type === 'autoridad') title = 'Inscripciones: Autoridades';
            if (type === 'delegado') title = 'Inscripciones: Delegados';

            res.render('admin/inscriptions/index', {
                title,
                type,
                inscriptions,
                path: `/admin/inscripciones/${type}`,
                user: req.session.user,
                query: req.query
            });
        } catch (error) {
            console.error(error);
            res.redirect('/admin/dashboard');
        }
    },

    upload: async (req, res) => {
        try {
            const { type } = req.params;
            if (!req.file) {
                return res.redirect(`/admin/inscripciones/${type}?msg=imported`);
            }

            const workbook = xlsx.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet);

            const bulkData = data.map(row => {
                // Try to guess Name and Email fields from common headers
                // Keys are usually what's in the first row. We can look for keywords.
                const keys = Object.keys(row);

                // Helper to find key by partial match
                const findKey = (keywords) => keys.find(k => keywords.some(w => k.toLowerCase().includes(w)));

                const nameKey = findKey(['nombre', 'name', 'apellido', 'full name', 'institucion', 'institución', 'escuela', 'colegio']);
                const emailKey = findKey(['email', 'mail', 'correo']);
                const roleKey = findKey(['rol', 'cargo', 'puesto', 'función', 'funcion']);
                const teacherKey = findKey(['docente', 'profesor', 'responsable', 'tutor']);
                const phoneKey = findKey(['telefono', 'teléfono', 'celular', 'whatsapp', 'contacto']);

                const name = nameKey ? row[nameKey] : 'Sin Nombre';
                const email = emailKey ? row[emailKey] : 'Sin Email';
                const role = roleKey ? row[roleKey] : null;
                const teacher = teacherKey ? row[teacherKey] : null;
                const phone = phoneKey ? row[phoneKey] : null;

                // Add normalized role to data object so it's easily accessible even if key varies
                if (role) {
                    row['normalized_role'] = role;
                }
                if (teacher) {
                    row['normalized_teacher'] = teacher;
                }
                if (phone) {
                    row['normalized_phone'] = phone;
                }

                return {
                    type,
                    name: String(name).trim(),
                    email: String(email).trim(),
                    data: row
                };
            });

            if (bulkData.length > 0) {
                await Inscription.bulkCreate(bulkData);
            }

            // Clean up uploaded file
            fs.unlinkSync(req.file.path);

            res.redirect(`/admin/inscripciones/${type}?msg=imported`);
        } catch (error) {
            console.error('Error processing upload:', error);
            res.redirect('/admin/dashboard');
        }
    },

    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Inscription.findByPk(id);
            if (!item) return res.redirect('/admin/dashboard');

            const { name, email, telefono, interes, rol, docente } = req.body;

            // Clonar el JSON para que Sequelize detecte el cambio (evita bug de referencia)
            const data = JSON.parse(JSON.stringify(item.data || {}));
            if (telefono !== undefined) { data.telefono = telefono; data.normalized_phone = telefono; }
            if (interes  !== undefined) data.interes = interes;
            if (rol      !== undefined) { data.rol = rol; data.normalized_role = rol; }
            if (docente  !== undefined) { data.docente = docente; data.normalized_teacher = docente; }

            item.name  = (name  || item.name).trim();
            item.email = (email || item.email).trim();
            item.data  = data;
            item.changed('data', true); // Forzar que Sequelize detecte el cambio en JSON
            await item.save();

            res.redirect(`/admin/inscripciones/${item.type}?msg=edited`);
        } catch (error) {
            console.error('Error editando inscripción:', error);
            res.redirect('/admin/dashboard');
        }
    },

    uploadManual: async (req, res) => {
        try {
            const { type } = req.params;
            const { name, email, telefono, interes, rol, docente } = req.body;
            if (!name || !name.trim()) return res.redirect(`/admin/inscripciones/${type}`);

            const dataObj = {};
            if (telefono)  { dataObj.telefono = telefono; dataObj.normalized_phone = telefono; }
            if (interes)   dataObj.interes = interes;
            if (rol)       { dataObj.rol = rol; dataObj.normalized_role = rol; }
            if (docente)   { dataObj.docente = docente; dataObj.normalized_teacher = docente; }

            await Inscription.create({
                type,
                name: name.trim(),
                email: (email || '').trim() || 'Sin Email',
                data: dataObj
            });
            res.redirect(`/admin/inscripciones/${type}?msg=created`);
        } catch (error) {
            console.error('Error en carga manual:', error);
            res.redirect(`/admin/inscripciones/${req.params.type}`);
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Inscription.findByPk(id);
            if (item) {
                const type = item.type;
                await item.destroy();
                res.redirect(`/admin/inscripciones/${type}`);
            } else {
                res.redirect('/admin/dashboard');
            }
        } catch (error) {
            console.error(error);
            res.redirect('/admin/dashboard');
        }
    },

    destroyAll: async (req, res) => {
        try {
            const { type } = req.params;
            await Inscription.destroy({
                where: { type }
            });
            res.redirect(`/admin/inscripciones/${type}?msg=cleared`);
        } catch (error) {
            console.error(error);
            res.redirect('/admin/dashboard');
        }
    }
};

module.exports = controller;
