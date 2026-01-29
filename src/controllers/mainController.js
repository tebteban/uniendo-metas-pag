const fs = require('fs');
const path = require('path');
const Organ = require('../database/models/Organ');
const Schedule = require('../database/models/Schedule');
const Volunteer = require('../database/models/Volunteer');

const controller = {
    index: async (req, res) => {
        try {
            // Fetch dynamically from DB
            const organs = await Organ.findAll();
            const rawSchedule = await Schedule.findAll({
                order: [['id', 'ASC']]
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

            const nosotrosPath = path.join(__dirname, '../data/nosotros.json');
            const nosotros = JSON.parse(fs.readFileSync(nosotrosPath, 'utf-8'));

            res.render('index', {
                title: 'Inicio',
                organos: organs,
                cronograma: schedule,
                nosotros
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            res.render('index', { title: 'Uniendo Metas Santiago del Estero', organos: [], cronograma: [], nosotros: [] });
        }
    },

    cronograma: async (req, res) => {
        try {
            const rawSchedule = await Schedule.findAll({
                order: [['id', 'ASC']]
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



            res.render('voluntarios_new', {
                title: 'Voluntariado',
                team: authorities,
                team: authorities
            });
        } catch (error) {
            console.error('Error fetching volunteers:', error);
            res.render('voluntarios_new', {
                title: 'Voluntariado',
                team: [],
                team: []
            });
        }
    },

    participacion: (req, res) => {
        res.render('participacion', { title: 'Participación' });
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
        // Placeholder para autoridades si existe la vista
        res.render('autoridades', { title: 'Autoridades' });
    }
};

module.exports = controller;