const Setting = require('../database/models/Setting');

const globalSettingsMiddleware = async (req, res, next) => {
    try {
        const settingsCalls = await Setting.findAll();
        const settings = {};

        // Convert array to object { key: value }
        settingsCalls.forEach(s => {
            settings[s.key] = s.value;
        });

        // ── Defaults generales ──────────────────────────────────
        if (!settings.link_fotos)             settings.link_fotos             = '#';
        if (!settings.proxima_edicion_fecha)  settings.proxima_edicion_fecha  = '2026-10-01';
        if (!settings.nav_show_button)        settings.nav_show_button        = 'true';

        // ── Defaults modal de inscripción ───────────────────────
        if (!settings.modal_inscripcion_titulo)    settings.modal_inscripcion_titulo    = 'Selecciona tu Rol';
        if (!settings.modal_inscripcion_subtitulo) settings.modal_inscripcion_subtitulo = '¿Cómo quieres participar en esta edición?';
        if (!settings.modal_inscripcion_pie)       settings.modal_inscripcion_pie       = 'Al inscribirte aceptás los términos y condiciones del Modelo Uniendo Metas Santiago del Estero.';

        // Delegado
        if (settings.modal_rol_delegado_activo  === undefined) settings.modal_rol_delegado_activo  = 'true';
        if (!settings.modal_rol_delegado_label)  settings.modal_rol_delegado_label  = 'Soy Delegado/a';
        if (!settings.modal_rol_delegado_desc)   settings.modal_rol_delegado_desc   = 'Participo debatiendo en un órgano.';
        if (!settings.modal_rol_delegado_url)    settings.modal_rol_delegado_url    = '#';

        // Autoridad
        if (settings.modal_rol_autoridad_activo === undefined) settings.modal_rol_autoridad_activo = 'true';
        if (!settings.modal_rol_autoridad_label) settings.modal_rol_autoridad_label = 'Soy Autoridad';
        if (!settings.modal_rol_autoridad_desc)  settings.modal_rol_autoridad_desc  = 'Presidente o Ujier de un órgano.';
        if (!settings.modal_rol_autoridad_url)   settings.modal_rol_autoridad_url   = '#';

        // Voluntario
        if (settings.modal_rol_voluntario_activo === undefined) settings.modal_rol_voluntario_activo = 'true';
        if (!settings.modal_rol_voluntario_label) settings.modal_rol_voluntario_label = 'Soy Voluntario/a';
        if (!settings.modal_rol_voluntario_desc)  settings.modal_rol_voluntario_desc  = 'Staff de organización y logística.';
        if (!settings.modal_rol_voluntario_url)   settings.modal_rol_voluntario_url   = '#';

        // Docente
        if (settings.modal_rol_docente_activo === undefined) settings.modal_rol_docente_activo = 'true';
        if (!settings.modal_rol_docente_label) settings.modal_rol_docente_label = 'Soy Docente/Colegio';
        if (!settings.modal_rol_docente_desc)  settings.modal_rol_docente_desc  = 'Inscripción institucional.';
        if (!settings.modal_rol_docente_url)   settings.modal_rol_docente_url   = '#';

        res.locals.settings = settings;
        next();
    } catch (error) {
        console.error('Error loading global settings:', error);
        res.locals.settings = {};
        next();
    }
};

module.exports = globalSettingsMiddleware;
