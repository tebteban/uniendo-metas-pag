const Setting = require('../database/models/Setting');

const controller = {
    index: async (req, res) => {
        try {
            const defaults = [
                // ── Generales ────────────────────────────────────────────────
                { key: 'proxima_edicion_fecha',       label: 'Fecha Próxima Edición',                              type: 'datetime-local', value: '2026-10-15T18:00' },
                { key: 'link_fotos',                  label: 'Link Galería de Fotos (OneDrive)',                   type: 'url',            value: '#' },
                { key: 'link_instagram',              label: 'Link Instagram',                                     type: 'url',            value: 'https://instagram.com/umsantiagodelestero' },
                { key: 'link_inscripcion_general',    label: 'Link Inscripción General (fallback si modal vacío)', type: 'url',            value: '#' },
                { key: 'nav_show_button',             label: 'Mostrar botón Inscribirse en navbar',                type: 'checkbox',       value: 'true' },
                { key: 'mostrar_fecha_modelo',        label: 'Mostrar Contador (activado = muestra ??, desactivado = Fecha a Confirmar)', type: 'checkbox', value: 'false' },
                { key: 'link_autoridades_sumarme',    label: 'Autoridades - Botón "Quiero Sumarme"',              type: 'url',            value: '#' },
                { key: 'link_autoridades_fotos',      label: 'Autoridades - Botón "Ver Fotos Edición Anterior"',  type: 'url',            value: '#' },
                { key: 'link_voluntarios_sumate',     label: 'Voluntarios - Botón "Sumate al Equipo"',            type: 'url',            value: '#' },
                { key: 'link_participacion_inscribirse', label: 'Participación - Botón "Inscribirme Ahora"',      type: 'url',            value: '#' },
                { key: 'cert_subtitulo',              label: 'Certificados - Texto del subtítulo',                type: 'textarea',       value: 'Por su participación en el "XII Encuentro Provincial Uniendo Metas Santiago del Estero" llevado a cabo los días 8 y 9 de Octubre del año 2025, desempeñando el rol de' },

                // ── Modal de inscripción — Textos generales ──────────────────
                { key: 'modal_inscripcion_titulo',    label: 'Modal - Título',                                    type: 'text',           value: 'Selecciona tu Rol' },
                { key: 'modal_inscripcion_subtitulo', label: 'Modal - Subtítulo',                                 type: 'text',           value: '¿Cómo quieres participar en esta edición?' },
                { key: 'modal_inscripcion_pie',       label: 'Modal - Texto del pie',                             type: 'text',           value: 'Al inscribirte aceptás los términos y condiciones del Modelo Uniendo Metas Santiago del Estero.' },

                // ── Rol: Delegado ────────────────────────────────────────────
                { key: 'modal_rol_delegado_activo',   label: 'Delegado/a — Mostrar en modal',                    type: 'checkbox',       value: 'true' },
                { key: 'modal_rol_delegado_label',    label: 'Delegado/a — Etiqueta',                            type: 'text',           value: 'Soy Delegado/a' },
                { key: 'modal_rol_delegado_desc',     label: 'Delegado/a — Descripción corta',                   type: 'text',           value: 'Participo debatiendo en un órgano.' },
                { key: 'modal_rol_delegado_url',      label: 'Delegado/a — URL del formulario',                  type: 'url',            value: '#' },

                // ── Rol: Autoridad ───────────────────────────────────────────
                { key: 'modal_rol_autoridad_activo',  label: 'Autoridad — Mostrar en modal',                     type: 'checkbox',       value: 'true' },
                { key: 'modal_rol_autoridad_label',   label: 'Autoridad — Etiqueta',                             type: 'text',           value: 'Soy Autoridad' },
                { key: 'modal_rol_autoridad_desc',    label: 'Autoridad — Descripción corta',                    type: 'text',           value: 'Presidente o Ujier de un órgano.' },
                { key: 'modal_rol_autoridad_url',     label: 'Autoridad — URL del formulario',                   type: 'url',            value: '#' },

                // ── Rol: Voluntario ──────────────────────────────────────────
                { key: 'modal_rol_voluntario_activo', label: 'Voluntario/a — Mostrar en modal',                  type: 'checkbox',       value: 'true' },
                { key: 'modal_rol_voluntario_label',  label: 'Voluntario/a — Etiqueta',                          type: 'text',           value: 'Soy Voluntario/a' },
                { key: 'modal_rol_voluntario_desc',   label: 'Voluntario/a — Descripción corta',                 type: 'text',           value: 'Staff de organización y logística.' },
                { key: 'modal_rol_voluntario_url',    label: 'Voluntario/a — URL del formulario',                type: 'url',            value: '#' },

                // ── Rol: Docente ─────────────────────────────────────────────
                { key: 'modal_rol_docente_activo',    label: 'Docente/Colegio — Mostrar en modal',               type: 'checkbox',       value: 'true' },
                { key: 'modal_rol_docente_label',     label: 'Docente/Colegio — Etiqueta',                       type: 'text',           value: 'Soy Docente/Colegio' },
                { key: 'modal_rol_docente_desc',      label: 'Docente/Colegio — Descripción corta',              type: 'text',           value: 'Inscripción institucional.' },
                { key: 'modal_rol_docente_url',       label: 'Docente/Colegio — URL del formulario',             type: 'url',            value: '#' },
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
