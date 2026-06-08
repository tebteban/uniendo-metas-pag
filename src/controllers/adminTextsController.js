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
                { key: 'text_sch_hero_desc', label: 'Cronograma - Bajada Hero', type: 'textarea', value: 'Todas las fechas clave del modelo. Prepárate con tiempo para cada instancia de capacitación, evaluación y debate.' },

                // --- DELEGADOS ---
                { key: 'text_del_badge', label: 'Delegados - Badge Hero', type: 'text', value: 'Programa Educativo' },
                { key: 'text_del_hero_title', label: 'Delegados - Título Hero', type: 'text', value: 'Sé el protagonista' },
                { key: 'text_del_hero_highlight', label: 'Delegados - Título Destacado', type: 'text', value: 'de tu futuro.' },
                { key: 'text_del_hero_desc', label: 'Delegados - Descripción Hero', type: 'textarea', value: 'Participá como delegado en el Modelo de Naciones Unidas y descubrí tu potencial para debatir, negociar y transformar el mundo. Tu voz hace la diferencia.' },
                { key: 'text_del_cta_main', label: 'Delegados - CTA Principal', type: 'text', value: 'Quiero participar' },
                { key: 'text_del_cta_secondary', label: 'Delegados - CTA Secundario', type: 'text', value: 'Conocé más' },
                
                { key: 'text_del_what_title', label: 'Delegados - ¿Qué es Delegado?', type: 'text', value: '¿Qué es un Delegado?' },
                { key: 'text_del_what_desc', label: 'Delegados - Descripción Rol', type: 'textarea', value: 'Un delegado es un estudiante que asume el rol de un diplomático, representando los intereses, políticas y cultura de un país asignado ante la ONU.' },
                
                { key: 'text_del_rol_1_title', label: 'Delegados - Rol 1 Título', type: 'text', value: 'Representación' },
                { key: 'text_del_rol_1_desc', label: 'Delegados - Rol 1 Descripción', type: 'textarea', value: 'Sos la voz de toda una nación. Defendés su cultura, historia e intereses globales ante el mundo.' },
                { key: 'text_del_rol_2_title', label: 'Delegados - Rol 2 Título', type: 'text', value: 'Debate' },
                { key: 'text_del_rol_2_desc', label: 'Delegados - Rol 2 Descripción', type: 'textarea', value: 'Exponés tus posturas mediante discursos y argumentos sólidos frente a las otras naciones participantes.' },
                { key: 'text_del_rol_3_title', label: 'Delegados - Rol 3 Título', type: 'text', value: 'Negociación' },
                { key: 'text_del_rol_3_desc', label: 'Delegados - Rol 3 Descripción', type: 'textarea', value: 'Buscás acuerdos estratégicos y puntos en común para resolver crisis internacionales pacíficamente.' },
                { key: 'text_del_rol_4_title', label: 'Delegados - Rol 4 Título', type: 'text', value: 'Trabajo en Equipo' },
                { key: 'text_del_rol_4_desc', label: 'Delegados - Rol 4 Descripción', type: 'textarea', value: 'Construís alianzas dentro de tu bloque regional para redactar proyectos de resolución conjuntos.' },

                { key: 'text_del_skills_badge', label: 'Delegados - Badge Habilidades', type: 'text', value: 'Desarrollo Personal' },
                { key: 'text_del_skills_title', label: 'Delegados - Título Habilidades', type: 'text', value: 'Habilidades para' },
                { key: 'text_del_skills_highlight', label: 'Delegados - Habilidades Destacado', type: 'text', value: 'toda tu vida.' },
                { key: 'text_del_skills_desc', label: 'Delegados - Descripción Habilidades', type: 'textarea', value: 'Participar en Uniendo Metas no es solo un juego de roles. Es adquirir herramientas que usarás en la universidad, en tu carrera profesional y en tu vida diaria.' },
                { key: 'del_skill_1', label: 'Delegados - Habilidad 1', type: 'text', value: 'Oratoria y comunicación efectiva' },
                { key: 'del_skill_2', label: 'Delegados - Habilidad 2', type: 'text', value: 'Pensamiento crítico y análisis' },
                { key: 'del_skill_3', label: 'Delegados - Habilidad 3', type: 'text', value: 'Negociación y empatía' },
                { key: 'del_skills_img_1', label: 'Delegados - Imagen Habilidades 1 (URL)', type: 'text', value: '' },
                { key: 'del_skills_img_2', label: 'Delegados - Imagen Habilidades 2 (URL)', type: 'text', value: '' },

                { key: 'text_del_path_badge', label: 'Delegados - Badge Timeline', type: 'text', value: 'Metodología' },
                { key: 'text_del_path_title', label: 'Delegados - Título Timeline', type: 'text', value: 'El camino del Delegado' },
                { key: 'text_del_path_desc', label: 'Delegados - Descripción Timeline', type: 'textarea', value: 'Prepararse y participar en el modelo conlleva una serie de etapas secuenciales que te forman como un verdadero líder internacional.' },
                { key: 'del_step_1_title', label: 'Delegados - Paso 1 Título', type: 'text', value: 'Investiga' },
                { key: 'del_step_1_desc', label: 'Delegados - Paso 1 Descripción', type: 'textarea', value: 'Aprende sobre la cultura, política y economía de la nación asignada para representarla fielmente.' },
                { key: 'del_step_2_title', label: 'Delegados - Paso 2 Título', type: 'text', value: 'Analiza' },
                { key: 'del_step_2_desc', label: 'Delegados - Paso 2 Descripción', type: 'textarea', value: 'Estudia profundamente los problemas globales a tratar en tu comisión, desde la perspectiva de tu país.' },
                { key: 'del_step_3_title', label: 'Delegados - Paso 3 Título', type: 'text', value: 'Redacta' },
                { key: 'del_step_3_desc', label: 'Delegados - Paso 3 Descripción', type: 'textarea', value: 'Elabora documentos de posición y colabora en proyectos de resolución con formalidad diplomática.' },
                { key: 'del_step_4_title', label: 'Delegados - Paso 4 Título', type: 'text', value: 'Debate' },
                { key: 'del_step_4_desc', label: 'Delegados - Paso 4 Descripción', type: 'textarea', value: 'Utiliza la oratoria para exponer tus ideas, interpelar a otras delegaciones y defender tus posturas en el recinto.' },
                { key: 'del_step_5_title', label: 'Delegados - Paso 5 Título', type: 'text', value: 'Consensa' },
                { key: 'del_step_5_desc', label: 'Delegados - Paso 5 Descripción', type: 'textarea', value: 'Negocia cediendo posiciones estratégicas para lograr soluciones integrales y reales junto a otros bloques.' },

                { key: 'text_del_gallery_badge', label: 'Delegados - Badge Galería', type: 'text', value: 'Momentos Inolvidables' },
                { key: 'text_del_gallery_title', label: 'Delegados - Título Galería', type: 'text', value: 'La experiencia en imágenes' },
                { key: 'text_del_gallery_desc', label: 'Delegados - Descripción Galería', type: 'textarea', value: 'Miles de historias y amistades generadas. Así vivimos las ediciones anteriores.' },
                { key: 'del_legacy_1', label: 'Delegados - Imagen Galería 1 (URL)', type: 'text', value: '' },
                { key: 'del_legacy_2', label: 'Delegados - Imagen Galería 2 (URL)', type: 'text', value: '' },
                { key: 'del_legacy_3', label: 'Delegados - Imagen Galería 3 (URL)', type: 'text', value: '' },
                { key: 'del_legacy_4', label: 'Delegados - Imagen Galería 4 (URL)', type: 'text', value: '' },
                { key: 'del_legacy_5', label: 'Delegados - Imagen Galería 5 (URL)', type: 'text', value: '' },

                { key: 'text_del_testimonials_badge', label: 'Delegados - Badge Testimonios', type: 'text', value: 'Comunidad' },
                { key: 'text_del_testimonials_title', label: 'Delegados - Título Testimonios', type: 'text', value: 'Voces de la experiencia' },
                { key: 'text_del_testimonials_desc', label: 'Delegados - Descripción Testimonios', type: 'textarea', value: 'Lo que opinan los delegados que ya vivieron el Modelo de Naciones Unidas.' },
                { key: 'text_del_test_1_name', label: 'Delegados - Testimonio 1 Nombre', type: 'text', value: 'Martina Gómez' },
                { key: 'text_del_test_1_quote', label: 'Delegados - Testimonio 1 Cita', type: 'textarea', value: 'El Modelo me enseñó a perder el miedo a hablar en público y a entender que mi voz, aunque sea joven, importa para cambiar la realidad.' },
                { key: 'text_del_test_2_name', label: 'Delegados - Testimonio 2 Nombre', type: 'text', value: 'Tomás Medina' },
                { key: 'text_del_test_2_quote', label: 'Delegados - Testimonio 2 Cita', type: 'textarea', value: 'Conocí a chicos de toda la provincia y aprendí a negociar soluciones pacíficas. Entendí cómo funciona realmente la política internacional.' },
                { key: 'text_del_test_3_name', label: 'Delegados - Testimonio 3 Nombre', type: 'text', value: 'Lucía Varela' },
                { key: 'text_del_test_3_quote', label: 'Delegados - Testimonio 3 Cita', type: 'textarea', value: 'Es mucho más que un juego de rol. Te hace investigar, cuestionar todo y construir amistades increíbles con personas que piensan distinto.' },

                { key: 'text_del_faq_title', label: 'Delegados - Título FAQ', type: 'text', value: 'Preguntas Frecuentes' },
                { key: 'text_del_faq_desc', label: 'Delegados - Descripción FAQ', type: 'textarea', value: 'Resolvé tus dudas y animate a participar.' },
                { key: 'text_del_faq_1_q', label: 'Delegados - FAQ 1 Pregunta', type: 'text', value: '¿Necesito experiencia previa para participar?' },
                { key: 'text_del_faq_1_a', label: 'Delegados - FAQ 1 Respuesta', type: 'textarea', value: 'No, no necesitas experiencia previa. Antes del modelo realizamos capacitaciones donde te enseñamos todo: desde cómo buscar información del país hasta cómo redactar un discurso.' },
                { key: 'text_del_faq_2_q', label: 'Delegados - FAQ 2 Pregunta', type: 'text', value: '¿Qué pasa si me equivoco al hablar o en el protocolo?' },
                { key: 'text_del_faq_2_a', label: 'Delegados - FAQ 2 Respuesta', type: 'textarea', value: '¡Absolutamente nada! El Modelo es un espacio de aprendizaje. Todos se equivocan (incluso los más experimentados). Las Autoridades de mesa están para guiarte, no para castigarte.' },
                { key: 'text_del_faq_3_q', label: 'Delegados - FAQ 3 Pregunta', type: 'text', value: '¿Debo saber hablar en inglés fluido?' },
                { key: 'text_del_faq_3_a', label: 'Delegados - FAQ 3 Respuesta', type: 'textarea', value: 'No es obligatorio. La inmensa mayoría de las comisiones se desarrollan íntegramente en español. A veces existe una comisión específica en inglés, pero es optativa.' },
                { key: 'text_del_faq_4_q', label: 'Delegados - FAQ 4 Pregunta', type: 'text', value: '¿Cómo se asignan los países?' },
                { key: 'text_del_faq_4_a', label: 'Delegados - FAQ 4 Respuesta', type: 'textarea', value: 'Se realiza un sorteo previo al encuentro. Tu docente asesor inscribe al colegio y la organización asigna las delegaciones equitativamente.' },
                { key: 'text_del_faq_5_q', label: 'Delegados - FAQ 5 Pregunta', type: 'text', value: '¿Cómo hago para inscribirme?' },
                { key: 'text_del_faq_5_a', label: 'Delegados - FAQ 5 Respuesta', type: 'textarea', value: 'La inscripción se realiza a través de tu colegio. Debés hablar con algún profesor o directivo. Si tu colegio no participa aún, contactanos y te ayudamos a armar el grupo.' },

                { key: 'text_del_cta_link', label: 'Delegados - Enlace CTA', type: 'text', value: '#' },
                { key: 'text_del_cta_button', label: 'Delegados - Botón CTA Final', type: 'text', value: 'Formulario de Inscripción' }
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
                    [Op.or]: [
                        { key: { [Op.like]: 'text_%' } },
                        { key: { [Op.like]: 'del_%' } }
                    ]
                }
            });

            // Group settings by category (section)
            const grouped = {
                'Global': [],
                'Inicio': [],
                'Voluntarios': [],
                'Cronograma': [],
                'Delegados': [],
                'Otros': []
            };

            allSettings.forEach(s => {
                if (s.key.startsWith('text_global_') || s.key.startsWith('text_footer_')) grouped['Global'].push(s);
                else if (s.key.startsWith('text_home_')) grouped['Inicio'].push(s);
                else if (s.key.startsWith('text_vol_')) grouped['Voluntarios'].push(s);
                else if (s.key.startsWith('text_sch_')) grouped['Cronograma'].push(s);
                else if (s.key.startsWith('text_del_') || s.key.startsWith('del_')) grouped['Delegados'].push(s);
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
