const Organ = require('../database/models/Organ');

const controller = {
    // List all organs
    index: async (req, res) => {
        try {
            const organs = await Organ.findAll();
            res.render('admin/organos/index', {
                title: 'Administrar Órganos',
                user: req.session.user,
                organs
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar órganos');
        }
    },

    // Show edit form
    edit: async (req, res) => {
        try {
            const organ = await Organ.findByPk(req.params.id);
            if (!organ) return res.status(404).send('Órgano no encontrado');
            res.render('admin/organos/edit', {
                title: 'Editar Órgano',
                user: req.session.user,
                organ
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar formulario');
        }
    },

    // Process edit form
    update: async (req, res) => {
        try {
            const { name, description, topic, color } = req.body;

            const dataToUpdate = {
                name,
                description,
                topic,
                color
            };

            // Lógica para manejar múltiples archivos (req.files)
            if (req.files) {
                // 1. Reglamento
                if (req.files.reglamento && req.files.reglamento.length > 0) {
                    const file = req.files.reglamento[0];
                    dataToUpdate.link_reglamento = process.env.NODE_ENV === 'production' && file.path ? file.path : '/uploads/documents/' + file.filename;
                }

                // 2. Dinámicas
                if (req.files.archivo_dinamicas && req.files.archivo_dinamicas.length > 0) {
                    const file = req.files.archivo_dinamicas[0];
                    dataToUpdate.link_dinamicas = process.env.NODE_ENV === 'production' && file.path ? file.path : '/uploads/documents/' + file.filename;
                }

                // 3. Tópico
                if (req.files.archivo_topico && req.files.archivo_topico.length > 0) {
                    const file = req.files.archivo_topico[0];
                    dataToUpdate.link_topico = process.env.NODE_ENV === 'production' && file.path ? file.path : '/uploads/documents/' + file.filename;
                }
            }

            await Organ.update(dataToUpdate, {
                where: { id: req.params.id }
            });
            res.redirect('/admin/organos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar órgano');
        }
    },

    // Show create form
    create: async (req, res) => {
        try {
            res.render('admin/organos/create', {
                title: 'Crear Órgano',
                user: req.session.user
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar formulario');
        }
    },

    // Process create form
    store: async (req, res) => {
        try {
            const { name, description, topic, color } = req.body;

            const dataToCreate = {
                name,
                description,
                topic,
                color
            };

            // Lógica para manejar múltiples archivos (req.files)
            if (req.files) {
                // 1. Reglamento
                if (req.files.reglamento && req.files.reglamento.length > 0) {
                    const file = req.files.reglamento[0];
                    dataToCreate.link_reglamento = process.env.NODE_ENV === 'production' && file.path ? file.path : '/uploads/documents/' + file.filename;
                }

                // 2. Dinámicas
                if (req.files.archivo_dinamicas && req.files.archivo_dinamicas.length > 0) {
                    const file = req.files.archivo_dinamicas[0];
                    dataToCreate.link_dinamicas = process.env.NODE_ENV === 'production' && file.path ? file.path : '/uploads/documents/' + file.filename;
                }

                // 3. Tópico
                if (req.files.archivo_topico && req.files.archivo_topico.length > 0) {
                    const file = req.files.archivo_topico[0];
                    dataToCreate.link_topico = process.env.NODE_ENV === 'production' && file.path ? file.path : '/uploads/documents/' + file.filename;
                }
            }

            await Organ.create(dataToCreate);
            res.redirect('/admin/organos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al crear órgano');
        }
    }
};

module.exports = controller;