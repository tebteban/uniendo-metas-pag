const Setting = require('../database/models/Setting');

const globalSettingsMiddleware = async (req, res, next) => {
    try {
        const settingsCalls = await Setting.findAll();
        const settings = {};

        // Convert array to object { key: value }
        settingsCalls.forEach(s => {
            settings[s.key] = s.value;
        });

        // Set defaults if missing (fallback)
        if (!settings.link_fotos) settings.link_fotos = '#';
        if (!settings.proxima_edicion_fecha) settings.proxima_edicion_fecha = '2026-10-01';

        res.locals.settings = settings;
        next();
    } catch (error) {
        console.error('Error loading global settings:', error);
        res.locals.settings = {}; // Fallback empty
        next();
    }
};

module.exports = globalSettingsMiddleware;
