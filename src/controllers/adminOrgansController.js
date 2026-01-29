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

            // If file was uploaded, update the link
            if (req.file) {
                // Construct public path
                dataToUpdate.link_reglamento = '/uploads/documents/' + req.file.filename;
            }

            await Organ.update(dataToUpdate, {
                where: { id: req.params.id }
            });
            res.redirect('/admin/organos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar órgano');
        }
    }
};

module.exports = controller;
