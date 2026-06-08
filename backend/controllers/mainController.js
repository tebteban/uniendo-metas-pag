const Organ = require('../database/models/Organ');
const Schedule = require('../database/models/Schedule');
const Setting = require('../database/models/Setting');

const controller = {
    index: async (req, res) => {
        try {
            // Fetch dynamically from DB
            const organs = await Organ.findAll();
            const rawSchedule = await Schedule.findAll({
                order: [['sort_date', 'ASC'], ['time', 'ASC'], ['id', 'ASC']]
            });

            // Group schedule by day: [{ dia: "Agosto", actividades: [...] }]
            const scheduleMap = new Map();
            rawSchedule.forEach(item => {
                if (!scheduleMap.has(item.day)) {
                    scheduleMap.set(item.day, { dia: item.day, actividades: [] });
                }
                scheduleMap.get(item.day).actividades.push({
                    fecha: item.date,
                    titulo: item.activity, // 'activity' in DB, 'titulo' in JSON/View?
                    horario: item.time,
                    lugar: item.location,
                    tipo: item.type
                });
            });
            const schedule = Array.from(scheduleMap.values());
            const settings = res.locals.settings;

            res.render('index', {
                title: 'Inicio',
                organos: organs,
                cronograma: schedule,
                settings
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            res.render('index', { title: 'Uniendo Metas Santiago del Estero', organos: [], cronograma: [], settings: {} });
        }
    },

    cronograma: async (req, res) => {
        try {
            const rawSchedule = await Schedule.findAll({
                order: [['sort_date', 'ASC'], ['time', 'ASC'], ['id', 'ASC']]
            });

            const scheduleMap = new Map();
            rawSchedule.forEach(item => {
                if (!scheduleMap.has(item.day)) {
                    scheduleMap.set(item.day, { dia: item.day, actividades: [] });
                }
                scheduleMap.get(item.day).actividades.push({
                    fecha: item.date,
                    titulo: item.activity,
                    horario: item.time,
                    lugar: item.location,
                    tipo: item.type
                });
            });
            const schedule = Array.from(scheduleMap.values());

            res.render('cronograma', {
                title: 'Cronograma 2026',
                cronograma: schedule
            });
        } catch (error) {
            console.error('Error fetching schedule:', error);
            res.render('cronograma', { title: 'Cronograma 2026', cronograma: [] });
        }
    },

    voluntarios: async (req, res) => {
        try {
            // Fetch team members (Authorities)
            const Authority = require('../database/models/Authority');
            const authorities = await Authority.findAll({
                where: { active: true },
                order: [['order', 'ASC'], ['name', 'ASC']]
            });

            // Load settings
            const settingsArray = await Setting.findAll();
            const settings = {};
            settingsArray.forEach(s => {
                settings[s.key] = s.value;
            });

            res.render('voluntarios_new', {
                title: 'Voluntariado',
                team: authorities,
                settings: settings
            });
        } catch (error) {
            console.error('Error fetching volunteers:', error);
            res.render('voluntarios_new', {
                title: 'Voluntariado',
                team: [],
                settings: {}
            });
        }
    },

    participacion: async (req, res) => {
        try {
            const settings = res.locals.settings;

            res.render('participacion', {
                title: 'Participación',
                settings: settings
            });
        } catch (error) {
            console.error('Error loading participacion settings:', error);
            res.render('participacion', {
                title: 'Participación',
                settings: {}
            });
        }
    },

    delegados: async (req, res) => {
        try {
            // Load settings for the delegados page
            const settingsArray = await Setting.findAll();
            const settings = {};
            settingsArray.forEach(s => { settings[s.key] = s.value; });

            res.render('delegados', {
                title: 'Delegados | Uniendo Metas',
                settings
            });
        } catch (error) {
            console.error('Error loading delegados page:', error);
            res.render('delegados', { title: 'Delegados | Uniendo Metas', settings: {} });
        }
    },

    organos: async (req, res) => {
        try {
            const organs = await Organ.findAll();
            res.render('organos', {
                title: 'Órganos | Uniendo Metas Santiago',
                path: '/organos',
                organos: organs
            });
        } catch (error) {
            console.error('Error fetching organs:', error);
            res.render('organos', {
                title: 'Órganos | Uniendo Metas Santiago',
                path: '/organos',
                organos: []
            });
        }
    },

    autoridades: async (req, res) => {
    try {
            const settings = res.locals.settings;
        res.render('autoridades', {
            title: 'Autoridades | Uniendo Metas',
            settings
        });
    } catch (error) {
        res.render('autoridades', { title: 'Autoridades | Uniendo Metas', settings: {} });
    }
},
};

module.exports = controller;



