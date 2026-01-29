const Setting = require('../database/models/Setting');
const { Op } = require('sequelize');

const controller = {
    index: async (req, res) => {
        try {
            // Ensure default image settings exist
            const imageDefaults = [
                { key: 'banner_voluntarios', label: 'Banner Sección Voluntarios (Inicio)', type: 'image', value: '' },

                // Index - Santiago del Estero
                { key: 'index_sde_1', label: 'Inicio - Santiago (Izq Arriba)', type: 'image', value: '' },
                { key: 'index_sde_2', label: 'Inicio - Santiago (Izq Abajo)', type: 'image', value: '' },
                { key: 'index_sde_3', label: 'Inicio - Santiago (Der Arriba)', type: 'image', value: '' },
                { key: 'index_sde_4', label: 'Inicio - Santiago (Der Abajo)', type: 'image', value: '' },

                // Authorities
                { key: 'auth_hero_1', label: 'Autoridades - Hero 1', type: 'image', value: '' },
                { key: 'auth_hero_2', label: 'Autoridades - Hero 2', type: 'image', value: '' },
                { key: 'auth_legacy_1', label: 'Autoridades - Legado 1', type: 'image', value: '' },
                { key: 'auth_legacy_2', label: 'Autoridades - Legado 2', type: 'image', value: '' },
                { key: 'auth_legacy_3', label: 'Autoridades - Legado 3', type: 'image', value: '' },
                { key: 'auth_legacy_4', label: 'Autoridades - Legado 4', type: 'image', value: '' },
                { key: 'auth_legacy_5', label: 'Autoridades - Legado 5', type: 'image', value: '' },

                // Volunteers
                { key: 'vol_hero_1', label: 'Voluntarios - Hero 1', type: 'image', value: '' },
                { key: 'vol_hero_2', label: 'Voluntarios - Hero 2', type: 'image', value: '' },
                { key: 'vol_slider_1', label: 'Voluntarios - Slider 1', type: 'image', value: '' },
                { key: 'vol_slider_2', label: 'Voluntarios - Slider 2', type: 'image', value: '' },
                { key: 'vol_slider_3', label: 'Voluntarios - Slider 3', type: 'image', value: '' }
            ];

            for (const def of imageDefaults) {
                await Setting.findOrCreate({
                    where: { key: def.key },
                    defaults: def
                });
            }

            // Fetch all settings of type 'image'
            const photos = await Setting.findAll({
                where: { type: 'image' }
            });

            res.render('admin/photos/index', {
                title: 'Gestión de Fotos',
                user: req.session.user,
                photos
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar fotos');
        }
    },

    update: async (req, res) => {
        try {
            const { key } = req.params;

            if (req.files && req.files.length > 0) {
                const file = req.files[0];
                const value = '/img/site/' + file.filename;

                await Setting.update(
                    { value: value },
                    { where: { key: key } }
                );
            }

            res.redirect('/admin/fotos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar foto');
        }
    },

    // Generic Add Slot
    addSlot: async (req, res) => {
        try {
            const { prefix, label } = req.body;

            if (!prefix) return res.status(400).send('Prefijo requerido');

            // Find existing keys with this prefix
            const existing = await Setting.findAll({
                where: {
                    key: { [Op.like]: `${prefix}_%` }
                }
            });

            // Calculate next index
            let maxIndex = 0;
            existing.forEach(s => {
                // key format: prefix_NUMBER
                // Remove prefix+1 char (_) from start
                const numberPart = s.key.substring(prefix.length + 1);
                const idx = parseInt(numberPart);
                if (!isNaN(idx) && idx > maxIndex) maxIndex = idx;
            });

            const nextIndex = maxIndex + 1;
            const newKey = `${prefix}_${nextIndex}`;
            const newLabel = label ? `${label} ${nextIndex}` : `Imagen ${nextIndex}`;

            await Setting.create({
                key: newKey,
                label: newLabel,
                type: 'image',
                value: ''
            });

            res.redirect('/admin/fotos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al agregar slot');
        }
    },

    delete: async (req, res) => {
        try {
            const { key } = req.params;
            // If it's a slider image > 3, we can delete the row. 
            // If it's a core image (like banner), maybe just clear value?
            // User asked to "quitar".

            // For now, if it starts with 'slider_image_', delete the row entirely
            // but keep the first 3 as structural defaults if we want, or just delete.
            // Let's allow deleting any image setting to "reset" or remove it.

            // Actually, deleting the setting means it won't available in code. 
            // Use 'destroy' carefully. 
            // If I delete 'slider_image_1', index.ejs might break if I don't handle missing keys.
            // My globalSettingsMiddleware sends ALL settings. If key is missing, it's undefined.
            // index.ejs uses `<%= settings.slider_image_1 || 'default' %>`. So it is safe to delete.

            await Setting.destroy({ where: { key } });
            res.redirect('/admin/fotos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al eliminar foto');
        }
    }
};

module.exports = controller;
