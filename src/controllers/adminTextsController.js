const Setting = require('../database/models/Setting');

const controller = {
    index: async (req, res) => {
        try {
            // Define all text defaults here
            const textDefaults = [
                // --- GLOBAL (Navbar, Footer, General) ---
                { key: 'text_global_navbar_title', label: 'Global - Título Navbar', type: 'text', value: 'UNIENDO METAS' },
                { key: 'text_global_navbar_subtitle', label: 'Global - Subtítulo Navbar', type: 'text', value: 'SANTIAGO DEL ESTERO' },
                { key: 'text_footer_desc', label: 'Footer - Descripción', type: 'textarea', value: 'Un programa de Asociación Conciencia que empodera a los jóvenes para liderar el cambio a través del debate y el consenso.' },
                { key: 'text_footer_address', label: 'Footer - Dirección', type: 'text', value: 'Santiago del Estero, Argentina' },
                { key: 'text_footer_email', label: 'Footer - Email', type: 'text', value: 'umsantiago@conciencia.org' },

                // --- HOME (Inicio) ---
                { key: 'text_home_hero_badge', label: 'Inicio - Badge Hero', type: 'text', value: 'XI Edición • Santiago Del Estero' },
                { key: 'text_home_hero_title', label: 'Inicio - Título Hero (Usa <br> para saltos)', type: 'text', value: 'JÓVENES PARA <br>' },
                { key: 'text_home_hero_highlight', label: 'Inicio - Título Hero (Destacado)', type: 'text', value: 'EL FUTURO' },
                { key: 'text_home_hero_subtitle', label: 'Inicio - Subtítulo Hero', type: 'textarea', value: '"Tu voz tiene poder. Úsala para debatir, proponer y construir el futuro."' },

                { key: 'text_home_about_badge', label: 'Inicio - Badge Nosotros', type: 'text', value: 'Institucional' },
                { key: 'text_home_about_title', label: 'Inicio - Título Nosotros', type: 'text', value: '¿Que es Uniendo Metas?' },
                { key: 'text_home_about_desc', label: 'Inicio - Descripción Nosotros', type: 'textarea', value: 'Uniendo Metas es la simulación de Naciones Unidas más importante de Argentina. Un programa de Asociación Conciencia que, desde 1994, empodera a los jóvenes a través del diálogo y el consenso.' },

                { key: 'text_home_card1_title', label: 'Inicio - Card 1 Título', type: 'text', value: 'Metodología Harvard' },
                { key: 'text_home_card1_desc', label: 'Inicio - Card 1 Desc', type: 'textarea', value: 'Traída de la Universidad de Harvard en 1994. Los tópicos de debate se basan en la Agenda real de las Naciones Unidas, abordando problemáticas globales con seriedad académica.' },

                { key: 'text_home_card2_title', label: 'Inicio - Card 2 Título', type: 'text', value: 'Red de Voluntarios' },
                { key: 'text_home_card2_desc', label: 'Inicio - Card 2 Desc', type: 'textarea', value: 'Más de 900 voluntarios en todo el país. Jóvenes ex-participantes comprometidos con la participación ciudadana que organizan cada detalle del encuentro.' },

                { key: 'text_home_card3_title', label: 'Inicio - Card 3 Título', type: 'text', value: 'Acompañamiento Docente' },
                { key: 'text_home_card3_desc', label: 'Inicio - Card 3 Desc', type: 'textarea', value: 'Consideramos a los docentes piezas clave. Ellos guían el proceso pedagógico para garantizar que el aprendizaje sea la meta central de la experiencia.' },

                // --- VOLUNTARIOS ---
                { key: 'text_vol_hero_badge', label: 'Voluntarios - Badge Hero', type: 'text', value: 'Equipo de Voluntarios 2026' },
                { key: 'text_vol_hero_title', label: 'Voluntarios - Título Hero', type: 'text', value: 'El equipo detrás <br> de la experiencia.' },
                { key: 'text_vol_hero_desc', label: 'Voluntarios - Bajada Hero', type: 'textarea', value: 'Un grupo humano comprometido con la educación y el liderazgo joven. Cada voluntario aporta su tiempo y pasión para construir Uniendo Metas Santiago.' },
                { key: 'text_vol_cta_button', label: 'Voluntarios - Botón CTA', type: 'text', value: 'Sumate al equipo' },

                { key: 'text_vol_why_title', label: 'Voluntarios - Título Razones', type: 'text', value: '¿Por qué unirte a <br>nuestra familia?' },
                { key: 'text_vol_why_desc', label: 'Voluntarios - Desc Razones', type: 'textarea', value: 'Ser voluntario no es solo trabajar; es crecer. Es el lugar donde desarrollas habilidades que no se aprenden en un aula: liderazgo bajo presión, empatía, logística y trabajo en equipo real.' },

                // --- CRONOGRAMA ---
                { key: 'text_sch_hero_badge', label: 'Cronograma - Badge Hero', type: 'text', value: 'Agenda 2026' },
                { key: 'text_sch_hero_title', label: 'Cronograma - Título Hero', type: 'text', value: 'Cronograma de Actividades' },
                { key: 'text_sch_hero_desc', label: 'Cronograma - Bajada Hero', type: 'textarea', value: 'Todas las fechas clave del modelo. Prepárate con tiempo para cada instancia de capacitación, evaluación y debate.' }
            ];

            // Ensure defaults exist
            for (const def of textDefaults) {
                await Setting.findOrCreate({
                    where: { key: def.key },
                    defaults: def
                });
            }

            // Fetch all text settings
            const { Op } = require('sequelize');
            const allSettings = await Setting.findAll({
                where: {
                    key: { [Op.like]: 'text_%' }
                }
            });

            // Group settings by category (section)
            const grouped = {
                'Global': [],
                'Inicio': [],
                'Voluntarios': [],
                'Cronograma': [],
                'Otros': []
            };

            allSettings.forEach(s => {
                if (s.key.startsWith('text_global_') || s.key.startsWith('text_footer_')) grouped['Global'].push(s);
                else if (s.key.startsWith('text_home_')) grouped['Inicio'].push(s);
                else if (s.key.startsWith('text_vol_')) grouped['Voluntarios'].push(s);
                else if (s.key.startsWith('text_sch_')) grouped['Cronograma'].push(s);
                else grouped['Otros'].push(s);
            });

            res.render('admin/texts/index', {
                title: 'Gestión de Textos',
                user: req.session.user,
                groupedSettings: grouped
            });

        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar textos');
        }
    },

    update: async (req, res) => {
        try {
            const keys = Object.keys(req.body);
            for (const key of keys) {
                await Setting.update(
                    { value: req.body[key] },
                    { where: { key: key } }
                );
            }
            res.redirect('/admin/textos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar textos');
        }
    }
};

module.exports = controller;
