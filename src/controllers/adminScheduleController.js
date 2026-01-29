const Schedule = require('../database/models/Schedule');

const controller = {
    // List all events
    index: async (req, res) => {
        try {
            // Order by date might be tricky with string '4 de Octubre'
            // For now, we'll order by ID or Day which is not ideal but works for simple lists
            // A better approach would be to have a real Date column or a sorting key
            const events = await Schedule.findAll();

            // Helper to sort somewhat logically if possible, or just pass as is
            // For this project, we might just trust the insertion order or grouped by Day

            res.render('admin/cronograma/index', {
                title: 'Administrar Cronograma',
                user: req.session.user,
                events
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar cronograma');
        }
    },

    // Show create form
    create: (req, res) => {
        res.render('admin/cronograma/create', {
            title: 'Nuevo Evento',
            user: req.session.user
        });
    },

    // Process create form
    store: async (req, res) => {
        try {
            const { day, date, time, activity, location, type } = req.body;
            await Schedule.create({
                day,
                date,
                time,
                activity,
                location: location || '',
                type: type || 'general'
            });
            res.redirect('/admin/cronograma');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al guardar evento');
        }
    },

    // Show edit form
    edit: async (req, res) => {
        try {
            const event = await Schedule.findByPk(req.params.id);
            if (!event) return res.status(404).send('Evento no encontrado');
            res.render('admin/cronograma/edit', {
                title: 'Editar Evento',
                user: req.session.user,
                event
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar formulario');
        }
    },

    // Process edit form
    update: async (req, res) => {
        try {
            const { day, date, time, activity, location, type } = req.body;
            await Schedule.update({
                day,
                date,
                time,
                activity,
                location,
                type
            }, {
                where: { id: req.params.id }
            });
            res.redirect('/admin/cronograma');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar evento');
        }
    },

    // Delete event
    destroy: async (req, res) => {
        try {
            await Schedule.destroy({ where: { id: req.params.id } });
            res.redirect('/admin/cronograma');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al eliminar evento');
        }
    }
};

module.exports = controller;
