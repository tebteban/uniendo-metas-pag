const Authority = require('../database/models/Authority');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const controller = {
    // List all authorities
    index: async (req, res) => {
        try {
            const authorities = await Authority.findAll({
                order: [['group', 'ASC'], ['order', 'ASC'], ['name', 'ASC']]
            });
            res.render('admin/autoridades/index', {
                title: 'Administrar Equipo',
                user: req.session.user,
                authorities
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar equipo');
        }
    },

    // Show create form
    create: (req, res) => {
        res.render('admin/autoridades/create', {
            title: 'Nuevo Miembro',
            user: req.session.user
        });
    },

    // Process create form
    store: async (req, res) => {
        try {
            const { name, role, group, description, order } = req.body;
            let image = null;
            if (req.file) {
                // Use Cloudinary URL in production, filename in development
                image = req.file.path || req.file.filename;
            }

            await Authority.create({
                name,
                role,
                group: group || 'General',
                description,
                order: order ? parseInt(order) : 0,
                image,
                active: false // Hidden by default
            });
            res.redirect('/admin/equipodevoluntarios');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al guardar miembro');
        }
    },

    // Show edit form
    edit: async (req, res) => {
        try {
            const authority = await Authority.findByPk(req.params.id);
            if (!authority) return res.status(404).send('Miembro no encontrado');
            res.render('admin/autoridades/edit', {
                title: 'Editar Miembro',
                user: req.session.user,
                authority
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar formulario');
        }
    },

    // Process edit form
    update: async (req, res) => {
        try {
            const { name, role, group, description, order } = req.body;

            let updateData = {
                name,
                role,
                group,
                description,
                order: order ? parseInt(order) : 0
            };

            if (req.file) {
                // Use Cloudinary URL in production, filename in development
                updateData.image = req.file.path || req.file.filename;
                // Optional: Delete old image here if needed
            }

            await Authority.update(updateData, {
                where: { id: req.params.id }
            });
            res.redirect('/admin/equipodevoluntarios');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar miembro');
        }
    },

    // Delete
    destroy: async (req, res) => {
        try {
            const auth = await Authority.findByPk(req.params.id);
            if (auth && auth.image) {
                const imagePath = path.join(__dirname, '../../public/img/Voluntarios', auth.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            await Authority.destroy({ where: { id: req.params.id } });
            res.redirect('/admin/equipodevoluntarios');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al eliminar miembro');
        }
    },

    // Toggle Status (Publish/Hide)
    toggleStatus: async (req, res) => {
        try {
            const auth = await Authority.findByPk(req.params.id);
            if (auth) {
                auth.active = !auth.active;
                await auth.save();
            }
            res.redirect('/admin/equipodevoluntarios');
        } catch (error) {
            console.error(error);
            res.redirect('/admin/equipodevoluntarios');
        }
    },

    // Publish All
    publishAll: async (req, res) => {
        try {
            await Authority.update({ active: true }, { where: {} });
            res.redirect('/admin/equipodevoluntarios');
        } catch (error) {
            console.error(error);
            res.redirect('/admin/equipodevoluntarios');
        }
    },

    deleteAll: async (req, res) => {
        try {
            await Authority.destroy({
                where: {},
                truncate: false // Use false for safe deletion, or true to reset ID counters if verified safely supported
            });
            res.redirect('/admin/equipodevoluntarios');
        } catch (error) {
            console.error('Error emptying team list:', error);
            res.redirect('/admin/equipodevoluntarios');
        }
    },

    importExcel: async (req, res) => {
        try {
            console.log('--- Iniciando Importación de Excel ---');
            if (!req.file) {
                console.log('Error: No se recibió ningún archivo (req.file es undefined).');
                return res.redirect('/admin/equipodevoluntarios');
            }
            console.log('Archivo recibido:', req.file.originalname, 'Tamaño:', req.file.size);

            const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            console.log('Hoja detectada:', sheetName);

            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet);
            console.log('Filas encontradas (raw):', data.length);

            if (data.length > 0) {
                const keys = Object.keys(data[0]);
                console.log('Encabezados detectados:', keys);

                const findKey = (keywords) => keys.find(k => keywords.some(w => k.toLowerCase().includes(w)));

                const nameKey = findKey(['nombre', 'name', 'voluntario', 'apellido']);
                const roleKey = findKey(['rol', 'cargo', 'puesto', 'función', 'funcion']);
                const groupKey = findKey(['grupo', 'area', 'área', 'equipo', 'departamento']);
                const descKey = findKey(['descripcion', 'descripción', 'bio', 'sobre']);
                const orderKey = findKey(['orden', 'order', 'prioridad']);

                console.log('Mapeo de columnas:', { nameKey, roleKey, groupKey, descKey, orderKey });

                const authoritiesToCreate = data.map(row => {
                    return {
                        name: nameKey ? String(row[nameKey]).trim() : 'Voluntario Importado',
                        role: roleKey ? String(row[roleKey]).trim() : '',
                        group: groupKey ? String(row[groupKey]).trim() : 'General',
                        description: descKey ? String(row[descKey]).trim() : '',
                        order: orderKey && !isNaN(row[orderKey]) ? parseInt(row[orderKey]) : 0,
                        image: '/images/default-user.png',
                        active: false
                    };
                });

                console.log('Registros preparados para crear:', authoritiesToCreate.length);
                if (authoritiesToCreate.length > 0) {
                    console.log('Primer registro ejemplo:', authoritiesToCreate[0]);
                }

                await Authority.bulkCreate(authoritiesToCreate);
                console.log('--- Importación finalizada exitosamente ---');
            } else {
                console.log('Error: El archivo Excel parece estar vacío o no se pudo leer ninguna fila.');
            }

            res.redirect('/admin/equipodevoluntarios');
        } catch (error) {
            console.error('Error FATAL importando Excel:', error);
            res.redirect('/admin/equipodevoluntarios');
        }
    }
};

module.exports = controller;
