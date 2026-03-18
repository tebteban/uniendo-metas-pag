const Setting = require('../database/models/Setting');

const controller = {
    index: async (req, res) => {
        try {
            const defaults = [
                { key: 'proxima_edicion_fecha', label: 'Fecha Próxima Edición', type: 'datetime-local', value: '2026-10-15T18:00' },
                { key: 'link_fotos', label: 'Link Galería de Fotos (OneDrive)', type: 'url', value: '#' },
                { key: 'link_instagram', label: 'Link Instagram', type: 'url', value: 'https://instagram.com/umsantiagodelestero' },
                { key: 'link_inscripcion_general', label: 'Link Inscripción General', type: 'url', value: '#' },
                { key: 'mostrar_fecha_modelo', label: 'Mostrar Contador (activado = muestra ??, desactivado = Fecha a Confirmar)', type: 'checkbox', value: 'false' },
                { key: 'link_autoridades_sumarme', label: 'Autoridades - Botón "Quiero Sumarme"', type: 'url', value: '#' },
                { key: 'link_autoridades_fotos', label: 'Autoridades - Botón "Ver Fotos Edición Anterior"', type: 'url', value: '#' },
                { key: 'link_voluntarios_sumate', label: 'Voluntarios - Botón "Sumate al Equipo"', type: 'url', value: '#' },
                { key: 'link_participacion_inscribirse', label: 'Participación - Botón "Inscribirme Ahora"', type: 'url', value: '#' },
                { key: 'index_sde_1', label: 'Inicio - Santiago (Izq Arriba)', type: 'image', value: '' },
                { key: 'index_sde_2', label: 'Inicio - Santiago (Izq Abajo)', type: 'image', value: '' },
                { key: 'index_sde_3', label: 'Inicio - Santiago (Der Arriba)', type: 'image', value: '' },
                { key: 'index_sde_4', label: 'Inicio - Santiago (Der Abajo)', type: 'image', value: '' },
                { key: 'auth_hero_1', label: 'Autoridades - Hero 1', type: 'image', value: '' },
                { key: 'auth_hero_2', label: 'Autoridades - Hero 2', type: 'image', value: '' },
                { key: 'auth_legacy_1', label: 'Autoridades - Legado 1', type: 'image', value: '' },
                { key: 'auth_legacy_2', label: 'Autoridades - Legado 2', type: 'image', value: '' },
                { key: 'auth_legacy_3', label: 'Autoridades - Legado 3', type: 'image', value: '' },
                { key: 'auth_legacy_4', label: 'Autoridades - Legado 4', type: 'image', value: '' },
                { key: 'auth_legacy_5', label: 'Autoridades - Legado 5', type: 'image', value: '' },
                { key: 'vol_hero_1', label: 'Voluntarios - Hero 1', type: 'image', value: '' },
                { key: 'vol_hero_2', label: 'Voluntarios - Hero 2', type: 'image', value: '' },
                { key: 'vol_slider_1', label: 'Voluntarios - Slider 1', type: 'image', value: '' },
                { key: 'vol_slider_2', label: 'Voluntarios - Slider 2', type: 'image', value: '' },
                { key: 'vol_slider_3', label: 'Voluntarios - Slider 3', type: 'image', value: '' },
                { key: 'banner_voluntarios', label: 'Banner Sección Voluntarios (Inicio)', type: 'image', value: '' }
            ];

            for (const def of defaults) {
                await Setting.findOrCreate({
                    where: { key: def.key },
                    defaults: def
                });
            }

            const { Op } = require('sequelize');
            const excludedKeys = [
                'hero_badge', 'hero_title', 'hero_subtitle',
                'footer_text', 'footer_address', 'footer_email',
                'link_inscripcion_delegados', 'link_inscripcion_autoridades', 'link_inscripcion_escuelas'
            ];

            const settings = await Setting.findAll({
                where: {
                    type: { [Op.ne]: 'image' },
                    key: {
                        [Op.notLike]: 'text_%',
                        [Op.notIn]: excludedKeys
                    }
                }
            });

            // Flash via query param — no depende de sesión
            const flash = req.query.saved === '1'
                ? { type: 'success', message: 'Todos los cambios fueron guardados correctamente.' }
                : req.query.saved === '0'
                ? { type: 'error', message: 'Hubo un error al guardar. Revisá los datos e intentá de nuevo.' }
                : null;

            res.render('admin/settings/index', {
                title: 'Configuración General',
                user: req.session.user,
                settings,
                flash
            });
        } catch (error) {
            console.error('Error al cargar configuración:', error);
            res.status(500).render('500', { title: 'Error del Servidor' });
        }
    },

    update: async (req, res) => {
        try {
            const body = req.body;

            for (const key of Object.keys(body)) {
                let value = body[key];

                // FIX CHECKBOX: browser manda ['false','true'] si marcado,
                // o solo 'false' si desmarcado
                if (Array.isArray(value)) {
                    value = value.includes('true') ? 'true' : 'false';
                }

                // FIX FECHA: datetime-local manda 'YYYY-MM-DDTHH:mm'
                // el countdown del index espera 'YYYY-MM-DD HH:mm'
                if (key === 'proxima_edicion_fecha' && typeof value === 'string') {
                    value = value.replace('T', ' ');
                }

                const [setting, created] = await Setting.findOrCreate({
                    where: { key },
                    defaults: { key, value, type: 'text' }
                });

                if (!created) {
                    await setting.update({ value });
                }
            }

            // Guardar imágenes si las hay
            if (req.files && req.files.length > 0) {
                for (const file of req.files) {
                    const key   = file.fieldname;
                    const value = process.env.NODE_ENV === 'production' && file.path ? file.path : '/img/site/' + file.filename;
                    const [setting, created] = await Setting.findOrCreate({
                        where: { key },
                        defaults: { key, value, type: 'image' }
                    });
                    if (!created) {
                        await setting.update({ value });
                    }
                }
            }

            res.redirect('/admin/configuracion?saved=1');

        } catch (error) {
            console.error('Error al guardar configuración:', error);
            res.redirect('/admin/configuracion?saved=0');
        }
    }
};

module.exports = controller;