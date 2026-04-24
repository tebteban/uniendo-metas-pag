const Setting = require('../database/models/Setting');

// ─── Keys por página ────────────────────────────────────────────────────────
const PAGE_KEYS = {
    inicio: {
        title: 'Página de Inicio',
        sections: [
            {
                id: 'hero',
                title: '1. Hero Principal',
                desc: 'El gran bloque de bienvenida al tope de la página.',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
                keys: [
                    { key: 'text_home_hero_badge',     label: 'Badge (ej: XI Edición • SDE)',  type: 'text'     },
                    { key: 'text_home_hero_title',     label: 'Título (podés usar <br>)',       type: 'text'     },
                    { key: 'text_home_hero_highlight', label: 'Palabra destacada (gradiente)', type: 'text'     },
                    { key: 'text_home_hero_subtitle',  label: 'Bajada / subtítulo',            type: 'textarea' },
                ]
            },
            {
                id: 'stats',
                title: '2. Contadores / Estadísticas',
                desc: 'Los 4 números animados debajo del hero (Ediciones, Alumnos, Escuelas, Voluntarios).',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                keys: [
                    { key: 'stat_1_value', label: 'Contador 1 — Número',   type: 'text' },
                    { key: 'stat_1_label', label: 'Contador 1 — Etiqueta', type: 'text' },
                    { key: 'stat_2_value', label: 'Contador 2 — Número',   type: 'text' },
                    { key: 'stat_2_label', label: 'Contador 2 — Etiqueta', type: 'text' },
                    { key: 'stat_3_value', label: 'Contador 3 — Número',   type: 'text' },
                    { key: 'stat_3_label', label: 'Contador 3 — Etiqueta', type: 'text' },
                    { key: 'stat_4_value', label: 'Contador 4 — Número',   type: 'text' },
                    { key: 'stat_4_label', label: 'Contador 4 — Etiqueta', type: 'text' },
                ]
            },
            {
                id: 'countdown',
                title: '3. Contador y Fecha del Modelo',
                desc: 'La cuenta regresiva que aparece en la sección "El Modelo 2026 se acerca".',
                color: '#FFB819', bg: '#FEF6E0',
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                keys: [
                    { key: 'proxima_edicion_fecha',  label: 'Fecha del modelo',                   type: 'datetime-local' },
                    { key: 'mostrar_fecha_modelo',   label: 'Mostrar contador (OFF = muestra ??)', type: 'checkbox'       },
                ]
            },
            {
                id: 'sponsors',
                title: '4. Sponsors / Nos Acompañan',
                desc: 'Los logos de los sponsors. Podés editar los 3 fijos o agregar hasta 6 extras. Si hay más de 6 aparece un carrusel automáticamente.',
                color: '#8A8A8D', bg: '#F3F3F4',
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                keys: [
                    { key: 'sponsor_1_url',   label: 'Sponsor 1 — Link web',    type: 'url'   },
                    { key: 'sponsor_1_img',   label: 'Sponsor 1 — Logo',        type: 'image' },
                    { key: 'sponsor_1_name',  label: 'Sponsor 1 — Nombre (alt)',type: 'text'  },
                    { key: 'sponsor_2_url',   label: 'Sponsor 2 — Link web',    type: 'url'   },
                    { key: 'sponsor_2_img',   label: 'Sponsor 2 — Logo',        type: 'image' },
                    { key: 'sponsor_2_name',  label: 'Sponsor 2 — Nombre (alt)',type: 'text'  },
                    { key: 'sponsor_3_url',   label: 'Sponsor 3 — Link web',    type: 'url'   },
                    { key: 'sponsor_3_img',   label: 'Sponsor 3 — Logo',        type: 'image' },
                    { key: 'sponsor_3_name',  label: 'Sponsor 3 — Nombre (alt)',type: 'text'  },
                    { key: 'sponsor_4_url',   label: 'Sponsor 4 — Link web',    type: 'url'   },
                    { key: 'sponsor_4_img',   label: 'Sponsor 4 — Logo',        type: 'image' },
                    { key: 'sponsor_4_name',  label: 'Sponsor 4 — Nombre (alt)',type: 'text'  },
                    { key: 'sponsor_5_url',   label: 'Sponsor 5 — Link web',    type: 'url'   },
                    { key: 'sponsor_5_img',   label: 'Sponsor 5 — Logo',        type: 'image' },
                    { key: 'sponsor_5_name',  label: 'Sponsor 5 — Nombre (alt)',type: 'text'  },
                    { key: 'sponsor_6_url',   label: 'Sponsor 6 — Link web',    type: 'url'   },
                    { key: 'sponsor_6_img',   label: 'Sponsor 6 — Logo',        type: 'image' },
                    { key: 'sponsor_6_name',  label: 'Sponsor 6 — Nombre (alt)',type: 'text'  },
                    { key: 'sponsor_7_url',   label: 'Sponsor 7 — Link web',    type: 'url'   },
                    { key: 'sponsor_7_img',   label: 'Sponsor 7 — Logo',        type: 'image' },
                    { key: 'sponsor_7_name',  label: 'Sponsor 7 — Nombre (alt)',type: 'text'  },
                    { key: 'sponsor_8_url',   label: 'Sponsor 8 — Link web',    type: 'url'   },
                    { key: 'sponsor_8_img',   label: 'Sponsor 8 — Logo',        type: 'image' },
                    { key: 'sponsor_8_name',  label: 'Sponsor 8 — Nombre (alt)',type: 'text'  },
                ]
            },
            {
                id: 'nosotros',
                title: '5. ¿Qué es Uniendo Metas?',
                desc: 'El bloque institucional con las 3 cards y la descripción.',
                color: '#73A950', bg: '#EDF5E8',
                icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                keys: [
                    { key: 'text_home_about_badge', label: 'Badge',        type: 'text'     },
                    { key: 'text_home_about_title', label: 'Título',        type: 'text'     },
                    { key: 'text_home_about_desc',  label: 'Descripción',   type: 'textarea' },
                    { key: 'text_home_card1_title', label: 'Card 1 Título', type: 'text'     },
                    { key: 'text_home_card1_desc',  label: 'Card 1 Texto',  type: 'textarea' },
                    { key: 'text_home_card2_title', label: 'Card 2 Título', type: 'text'     },
                    { key: 'text_home_card2_desc',  label: 'Card 2 Texto',  type: 'textarea' },
                    { key: 'text_home_card3_title', label: 'Card 3 Título', type: 'text'     },
                    { key: 'text_home_card3_desc',  label: 'Card 3 Texto',  type: 'textarea' },
                ]
            },
            {
                id: 'objetivos',
                title: '6. Objetivos Educativos',
                desc: 'Las pills/chips de la sección "¿Qué es Uniendo Metas?".',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
                keys: [
                    { key: 'text_home_obj_1',      label: 'Objetivo 1 — Texto', type: 'text' },
                    { key: 'text_home_obj_1_icon',  label: 'Objetivo 1 — Ícono', type: 'icon' },
                    { key: 'text_home_obj_2',      label: 'Objetivo 2 — Texto', type: 'text' },
                    { key: 'text_home_obj_2_icon',  label: 'Objetivo 2 — Ícono', type: 'icon' },
                    { key: 'text_home_obj_3',      label: 'Objetivo 3 — Texto', type: 'text' },
                    { key: 'text_home_obj_3_icon',  label: 'Objetivo 3 — Ícono', type: 'icon' },
                    { key: 'text_home_obj_4',      label: 'Objetivo 4 — Texto', type: 'text' },
                    { key: 'text_home_obj_4_icon',  label: 'Objetivo 4 — Ícono', type: 'icon' },
                    { key: 'text_home_obj_5',      label: 'Objetivo 5 — Texto', type: 'text' },
                    { key: 'text_home_obj_5_icon',  label: 'Objetivo 5 — Ícono', type: 'icon' },
                    { key: 'text_home_obj_6',      label: 'Objetivo 6 — Texto', type: 'text' },
                    { key: 'text_home_obj_6_icon',  label: 'Objetivo 6 — Ícono', type: 'icon' },
                ]
            },
            {
                id: 'fotos_sde',
                title: '7. Fotos Santiago del Estero',
                desc: 'Las 4 fotos del mosaico de la sección "Nuestra Sede".',
                color: '#E15829', bg: '#FCEEE9',
                icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
                keys: [
                    { key: 'index_sde_1', label: 'Foto 1 (Izq Arriba)', type: 'image' },
                    { key: 'index_sde_2', label: 'Foto 2 (Izq Abajo)',  type: 'image' },
                    { key: 'index_sde_3', label: 'Foto 3 (Der Arriba)', type: 'image' },
                    { key: 'index_sde_4', label: 'Foto 4 (Der Abajo)',  type: 'image' },
                ]
            },
            {
                id: 'faq',
                title: '8. Preguntas Frecuentes Fijas (FAQ)',
                desc: 'Las 8 preguntas y respuestas del acordeón principal.',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                keys: [
                    { key: 'text_home_faq1_q', label: 'Pregunta 1', type: 'text'     },
                    { key: 'text_home_faq1_a', label: 'Respuesta 1', type: 'textarea' },
                    { key: 'text_home_faq2_q', label: 'Pregunta 2', type: 'text'     },
                    { key: 'text_home_faq2_a', label: 'Respuesta 2', type: 'textarea' },
                    { key: 'text_home_faq3_q', label: 'Pregunta 3', type: 'text'     },
                    { key: 'text_home_faq3_a', label: 'Respuesta 3', type: 'textarea' },
                    { key: 'text_home_faq4_q', label: 'Pregunta 4', type: 'text'     },
                    { key: 'text_home_faq4_a', label: 'Respuesta 4', type: 'textarea' },
                    { key: 'text_home_faq5_q', label: 'Pregunta 5', type: 'text'     },
                    { key: 'text_home_faq5_a', label: 'Respuesta 5', type: 'textarea' },
                    { key: 'text_home_faq6_q', label: 'Pregunta 6', type: 'text'     },
                    { key: 'text_home_faq6_a', label: 'Respuesta 6', type: 'textarea' },
                    { key: 'text_home_faq7_q', label: 'Pregunta 7', type: 'text'     },
                    { key: 'text_home_faq7_a', label: 'Respuesta 7', type: 'textarea' },
                    { key: 'text_home_faq8_q', label: 'Pregunta 8', type: 'text'     },
                    { key: 'text_home_faq8_a', label: 'Respuesta 8', type: 'textarea' },
                ]
            },
            {
                id: 'extra_faq',
                title: '9. Preguntas Adicionales (FAQ)',
                desc: 'Hasta 5 preguntas extra que podés agregar libremente. Dejá vacío lo que no uses.',
                color: '#E15829', bg: '#FCEEE9',
                icon: 'M12 4v16m8-8H4',
                keys: [
                    { key: 'text_home_faq_extra1_q', label: 'Pregunta Extra 1', type: 'text'     },
                    { key: 'text_home_faq_extra1_a', label: 'Respuesta Extra 1', type: 'textarea' },
                    { key: 'text_home_faq_extra2_q', label: 'Pregunta Extra 2', type: 'text'     },
                    { key: 'text_home_faq_extra2_a', label: 'Respuesta Extra 2', type: 'textarea' },
                    { key: 'text_home_faq_extra3_q', label: 'Pregunta Extra 3', type: 'text'     },
                    { key: 'text_home_faq_extra3_a', label: 'Respuesta Extra 3', type: 'textarea' },
                    { key: 'text_home_faq_extra4_q', label: 'Pregunta Extra 4', type: 'text'     },
                    { key: 'text_home_faq_extra4_a', label: 'Respuesta Extra 4', type: 'textarea' },
                    { key: 'text_home_faq_extra5_q', label: 'Pregunta Extra 5', type: 'text'     },
                    { key: 'text_home_faq_extra5_a', label: 'Respuesta Extra 5', type: 'textarea' },
                ]
            },
            {
                id: 'links_inicio',
                title: '10. Links del Inicio',
                desc: 'Galería de fotos e Instagram que aparecen en el inicio.',
                color: '#FFB819', bg: '#FEF6E0',
                icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
                keys: [
                    { key: 'link_fotos',     label: 'Link Galería de Fotos (OneDrive)', type: 'url' },
                    { key: 'link_instagram', label: 'Link Instagram',                   type: 'url' },
                ]
            },
        ]
    },
    autoridades: {
        title: 'Página de Autoridades',
        sections: [
            {
                id: 'hero_aut',
                title: '1. Hero Principal',
                desc: 'El bloque de bienvenida al tope de la página.',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                keys: [
                    { key: 'text_aut_hero_badge',     label: 'Badge',                      type: 'text'     },
                    { key: 'text_aut_hero_title',     label: 'Título (podés usar <br>)',    type: 'text'     },
                    { key: 'text_aut_hero_highlight', label: 'Frase destacada (gradiente)', type: 'text'     },
                    { key: 'text_aut_hero_desc',      label: 'Descripción',                type: 'textarea' },
                    { key: 'auth_hero_1',             label: 'Foto Hero 1',                type: 'image'    },
                    { key: 'auth_hero_2',             label: 'Foto Hero 2',                type: 'image'    },
                ]
            },
            {
                id: 'exp_aut',
                title: '2. La Experiencia',
                desc: 'Textos y checks de la sección "Un grupo de amigos trabajando juntos".',
                color: '#73A950', bg: '#EDF5E8',
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                keys: [
                    { key: 'text_aut_exp_badge',     label: 'Badge',              type: 'text'     },
                    { key: 'text_aut_exp_title',     label: 'Título (con <br>)',   type: 'text'     },
                    { key: 'text_aut_exp_highlight', label: 'Frase verde',         type: 'text'     },
                    { key: 'text_aut_exp_p1',        label: 'Párrafo 1',          type: 'textarea' },
                    { key: 'text_aut_exp_p2',        label: 'Párrafo 2',          type: 'textarea' },
                    { key: 'aut_check_1',            label: 'Check 1 — Texto',    type: 'text'     },
                    { key: 'aut_check_1_icon',       label: 'Check 1 — Ícono',    type: 'icon'     },
                    { key: 'aut_check_2',            label: 'Check 2 — Texto',    type: 'text'     },
                    { key: 'aut_check_2_icon',       label: 'Check 2 — Ícono',    type: 'icon'     },
                    { key: 'aut_check_3',            label: 'Check 3 — Texto',    type: 'text'     },
                    { key: 'aut_check_3_icon',       label: 'Check 3 — Ícono',    type: 'icon'     },
                ]
            },
            {
                id: 'legado_aut',
                title: '3. Galería Legado',
                desc: 'Carrusel de fotos de ediciones anteriores. Podés agregar todas las que quieras.',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
                keys: [
                    { key: 'text_aut_legado_badge', label: 'Badge',       type: 'text'     },
                    { key: 'text_aut_legado_title', label: 'Título',       type: 'text'     },
                    { key: 'text_aut_legado_desc',  label: 'Descripción',  type: 'textarea' },
                ],
                dynamicImages: { prefix: 'auth_legacy_', label: 'Foto del legado' }
            },
            {
                id: 'roles_aut',
                title: '4. Roles',
                desc: 'Las 4 tarjetas de roles (Secretaría, Presidencia, Consejeros, Ujieres).',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5',
                keys: [
                    { key: 'text_aut_roles_badge', label: 'Badge sección',       type: 'text'     },
                    { key: 'text_aut_roles_title', label: 'Título sección',       type: 'text'     },
                    { key: 'text_aut_roles_desc',  label: 'Descripción sección',  type: 'textarea' },
                    { key: 'aut_rol_1_title', label: 'Rol 1 — Título',  type: 'text'     },
                    { key: 'aut_rol_1_desc',  label: 'Rol 1 — Desc',    type: 'textarea' },
                    { key: 'aut_rol_1_icon',  label: 'Rol 1 — Ícono',   type: 'icon'     },
                    { key: 'aut_rol_2_title', label: 'Rol 2 — Título',  type: 'text'     },
                    { key: 'aut_rol_2_desc',  label: 'Rol 2 — Desc',    type: 'textarea' },
                    { key: 'aut_rol_2_icon',  label: 'Rol 2 — Ícono',   type: 'icon'     },
                    { key: 'aut_rol_3_title', label: 'Rol 3 — Título',  type: 'text'     },
                    { key: 'aut_rol_3_desc',  label: 'Rol 3 — Desc',    type: 'textarea' },
                    { key: 'aut_rol_3_icon',  label: 'Rol 3 — Ícono',   type: 'icon'     },
                    { key: 'aut_rol_4_title', label: 'Rol 4 — Título',  type: 'text'     },
                    { key: 'aut_rol_4_desc',  label: 'Rol 4 — Desc',    type: 'textarea' },
                    { key: 'aut_rol_4_icon',  label: 'Rol 4 — Ícono',   type: 'icon'     },
                ]
            },
            {
                id: 'cap_aut',
                title: '5. Capacitación',
                desc: 'Textos de la sección de capacitación y las 3 etapas.',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                keys: [
                    { key: 'text_aut_cap_badge', label: 'Badge',              type: 'text'     },
                    { key: 'text_aut_cap_title', label: 'Título (con <br>)',   type: 'text'     },
                    { key: 'text_aut_cap_desc',  label: 'Descripción',         type: 'textarea' },
                    { key: 'aut_cap_1_title', label: 'Etapa 1 — Título', type: 'text'     },
                    { key: 'aut_cap_1_desc',  label: 'Etapa 1 — Desc',   type: 'textarea' },
                    { key: 'aut_cap_2_title', label: 'Etapa 2 — Título', type: 'text'     },
                    { key: 'aut_cap_2_desc',  label: 'Etapa 2 — Desc',   type: 'textarea' },
                    { key: 'aut_cap_3_title', label: 'Etapa 3 — Título', type: 'text'     },
                    { key: 'aut_cap_3_desc',  label: 'Etapa 3 — Desc',   type: 'textarea' },
                ]
            },
            {
                id: 'faq_aut',
                title: '6. Preguntas Frecuentes (FAQ)',
                desc: 'Las 6 preguntas y respuestas del acordeón.',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                keys: [
                    { key: 'aut_faq_1_q', label: 'Pregunta 1', type: 'text'     },
                    { key: 'aut_faq_1_a', label: 'Respuesta 1', type: 'textarea' },
                    { key: 'aut_faq_2_q', label: 'Pregunta 2', type: 'text'     },
                    { key: 'aut_faq_2_a', label: 'Respuesta 2', type: 'textarea' },
                    { key: 'aut_faq_3_q', label: 'Pregunta 3', type: 'text'     },
                    { key: 'aut_faq_3_a', label: 'Respuesta 3', type: 'textarea' },
                    { key: 'aut_faq_4_q', label: 'Pregunta 4', type: 'text'     },
                    { key: 'aut_faq_4_a', label: 'Respuesta 4', type: 'textarea' },
                    { key: 'aut_faq_5_q', label: 'Pregunta 5', type: 'text'     },
                    { key: 'aut_faq_5_a', label: 'Respuesta 5', type: 'textarea' },
                    { key: 'aut_faq_6_q', label: 'Pregunta 6', type: 'text'     },
                    { key: 'aut_faq_6_a', label: 'Respuesta 6', type: 'textarea' },
                ]
            },
            {
                id: 'biblioteca_aut',
                title: '6b. Biblioteca Digital',
                desc: 'Hasta 6 documentos/archivos descargables. Podés subir PDFs, Word, etc.',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                keys: [
                    { key: 'bib_1_name', label: 'Doc 1 — Nombre',        type: 'text'  },
                    { key: 'bib_1_desc', label: 'Doc 1 — Descripción',    type: 'text'  },
                    { key: 'bib_1_icon', label: 'Doc 1 — Ícono',          type: 'icon'  },
                    { key: 'bib_1_file', label: 'Doc 1 — Archivo (PDF)',   type: 'file'  },
                    { key: 'bib_2_name', label: 'Doc 2 — Nombre',        type: 'text'  },
                    { key: 'bib_2_desc', label: 'Doc 2 — Descripción',    type: 'text'  },
                    { key: 'bib_2_icon', label: 'Doc 2 — Ícono',          type: 'icon'  },
                    { key: 'bib_2_file', label: 'Doc 2 — Archivo (PDF)',   type: 'file'  },
                    { key: 'bib_3_name', label: 'Doc 3 — Nombre',        type: 'text'  },
                    { key: 'bib_3_desc', label: 'Doc 3 — Descripción',    type: 'text'  },
                    { key: 'bib_3_icon', label: 'Doc 3 — Ícono',          type: 'icon'  },
                    { key: 'bib_3_file', label: 'Doc 3 — Archivo (PDF)',   type: 'file'  },
                    { key: 'bib_4_name', label: 'Doc 4 — Nombre',        type: 'text'  },
                    { key: 'bib_4_desc', label: 'Doc 4 — Descripción',    type: 'text'  },
                    { key: 'bib_4_icon', label: 'Doc 4 — Ícono',          type: 'icon'  },
                    { key: 'bib_4_file', label: 'Doc 4 — Archivo (PDF)',   type: 'file'  },
                    { key: 'bib_5_name', label: 'Doc 5 — Nombre',        type: 'text'  },
                    { key: 'bib_5_desc', label: 'Doc 5 — Descripción',    type: 'text'  },
                    { key: 'bib_5_icon', label: 'Doc 5 — Ícono',          type: 'icon'  },
                    { key: 'bib_5_file', label: 'Doc 5 — Archivo (PDF)',   type: 'file'  },
                    { key: 'bib_6_name', label: 'Doc 6 — Nombre',        type: 'text'  },
                    { key: 'bib_6_desc', label: 'Doc 6 — Descripción',    type: 'text'  },
                    { key: 'bib_6_icon', label: 'Doc 6 — Ícono',          type: 'icon'  },
                    { key: 'bib_6_file', label: 'Doc 6 — Archivo (PDF)',   type: 'file'  },
                ]
            },
            {
                id: 'extra_faq_aut',
                title: '6c. Preguntas Adicionales (FAQ)',
                desc: 'Hasta 5 preguntas extra. Dejá vacío lo que no uses.',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M12 4v16m8-8H4',
                keys: [
                    { key: 'aut_faq_extra1_q', label: 'Pregunta Extra 1', type: 'text'     },
                    { key: 'aut_faq_extra1_a', label: 'Respuesta Extra 1', type: 'textarea' },
                    { key: 'aut_faq_extra2_q', label: 'Pregunta Extra 2', type: 'text'     },
                    { key: 'aut_faq_extra2_a', label: 'Respuesta Extra 2', type: 'textarea' },
                    { key: 'aut_faq_extra3_q', label: 'Pregunta Extra 3', type: 'text'     },
                    { key: 'aut_faq_extra3_a', label: 'Respuesta Extra 3', type: 'textarea' },
                    { key: 'aut_faq_extra4_q', label: 'Pregunta Extra 4', type: 'text'     },
                    { key: 'aut_faq_extra4_a', label: 'Respuesta Extra 4', type: 'textarea' },
                    { key: 'aut_faq_extra5_q', label: 'Pregunta Extra 5', type: 'text'     },
                    { key: 'aut_faq_extra5_a', label: 'Respuesta Extra 5', type: 'textarea' },
                ]
            },
            {
                id: 'links_aut',
                title: '7. Links',
                desc: 'Botones de acción de la página.',
                color: '#FFB819', bg: '#FEF6E0',
                icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
                keys: [
                    { key: 'link_autoridades_sumarme', label: 'Botón "Quiero Sumarme"',            type: 'url' },
                    { key: 'link_autoridades_fotos',   label: 'Botón "Ver Fotos Edición Anterior"', type: 'url' },
                ]
            },
        ]
    },

    voluntarios: {
        title: 'Página de Voluntarios',
        sections: [
            {
                id: 'hero_vol',
                title: '1. Hero Principal',
                desc: 'El bloque de bienvenida al tope de la página.',
                color: '#73A950', bg: '#EDF5E8',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                keys: [
                    { key: 'text_vol_hero_badge', label: 'Badge',       type: 'text'     },
                    { key: 'text_vol_hero_title', label: 'Título',       type: 'text'     },
                    { key: 'text_vol_hero_desc',  label: 'Descripción',  type: 'textarea' },
                    { key: 'vol_hero_1',          label: 'Foto Hero 1',  type: 'image'    },
                    { key: 'vol_hero_2',          label: 'Foto Hero 2',  type: 'image'    },
                ]
            },
            {
                id: 'por_que_vol',
                title: '2. ¿Por qué unirte?',
                desc: 'Título y descripción de la sección de razones para sumarse.',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                keys: [
                    { key: 'text_vol_why_title', label: 'Título',      type: 'text'     },
                    { key: 'text_vol_why_desc',  label: 'Descripción', type: 'textarea' },
                ]
            },
            {
                id: 'beneficios_vol',
                title: '2b. Beneficios / Razones',
                desc: 'Las 3 tarjetas con íconos que aparecen en la sección "¿Por qué unirte?".',
                color: '#73A950', bg: '#EDF5E8',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                keys: [
                    { key: 'vol_benefit_1',      label: 'Beneficio 1 — Texto', type: 'text' },
                    { key: 'vol_benefit_1_icon', label: 'Beneficio 1 — Ícono', type: 'icon' },
                    { key: 'vol_benefit_2',      label: 'Beneficio 2 — Texto', type: 'text' },
                    { key: 'vol_benefit_2_icon', label: 'Beneficio 2 — Ícono', type: 'icon' },
                    { key: 'vol_benefit_3',      label: 'Beneficio 3 — Texto', type: 'text' },
                    { key: 'vol_benefit_3_icon', label: 'Beneficio 3 — Ícono', type: 'icon' },
                ]
            },
            {
                id: 'adn_vol',
                title: '3. ADN Voluntario',
                desc: 'Estadísticas y datos que describen al equipo de voluntarios.',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                keys: [
                    { key: 'text_vol_adn_badge', label: 'Badge (ej: Radiografía 2025)', type: 'text'     },
                    { key: 'text_vol_adn_title', label: 'Título',                       type: 'text'     },
                    { key: 'text_vol_adn_desc',  label: 'Descripción',                  type: 'textarea' },
                ]
            },
            {
                id: 'semillero_vol',
                title: '4. Efecto Semillero',
                desc: 'El círculo de porcentaje y el texto del "Efecto Semillero".',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                keys: [
                    { key: 'text_vol_semillero_title', label: 'Título (podés usar HTML)', type: 'text'     },
                    { key: 'text_vol_semillero_desc',  label: 'Descripción',              type: 'textarea' },
                    { key: 'vol_semillero_pct',        label: '% del círculo (ej: 85)',   type: 'text'     },
                    { key: 'vol_semillero_label',      label: 'Etiqueta del círculo',     type: 'text'     },
                ]
            },
            {
                id: 'paridad_vol',
                title: '5. Paridad de Género',
                desc: 'Los porcentajes de las barras de género.',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
                keys: [
                    { key: 'vol_paridad_f',       label: '% Género 1 (ej: 52)',    type: 'text' },
                    { key: 'vol_paridad_f_label', label: 'Etiqueta Género 1',      type: 'text' },
                    { key: 'vol_paridad_m_label', label: 'Etiqueta Género 2',      type: 'text' },
                ]
            },
            {
                id: 'multi_vol',
                title: '6. Multidisciplinario',
                desc: 'Las carreras universitarias que aparecen en el bloque multidisciplinario.',
                color: '#73A950', bg: '#EDF5E8',
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                keys: [
                    { key: 'vol_multi_count',    label: 'Cantidad total (ej: +8)',              type: 'text' },
                    { key: 'vol_multi_carreras', label: 'Carreras visibles (separadas por ,)',  type: 'text' },
                    { key: 'vol_multi_extra',    label: 'Badge "más" (ej: +4 más)',            type: 'text' },
                ]
            },
            {
                id: 'habs_vol',
                title: '7. Habilidades',
                desc: 'Las 4 barras de habilidades con su etiqueta y porcentaje.',
                color: '#E15829', bg: '#FCEEE9',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                keys: [
                    { key: 'vol_hab_1_label', label: 'Habilidad 1 — Nombre', type: 'text' },
                    { key: 'vol_hab_1_pct',   label: 'Habilidad 1 — % (ej: 83)', type: 'text' },
                    { key: 'vol_hab_2_label', label: 'Habilidad 2 — Nombre', type: 'text' },
                    { key: 'vol_hab_2_pct',   label: 'Habilidad 2 — %', type: 'text' },
                    { key: 'vol_hab_3_label', label: 'Habilidad 3 — Nombre', type: 'text' },
                    { key: 'vol_hab_3_pct',   label: 'Habilidad 3 — %', type: 'text' },
                    { key: 'vol_hab_4_label', label: 'Habilidad 4 — Nombre', type: 'text' },
                    { key: 'vol_hab_4_pct',   label: 'Habilidad 4 — %', type: 'text' },
                ]
            },
            {
                id: 'testimonios_vol',
                title: '8. Testimonios del Equipo',
                desc: 'Las 3 tarjetas de frases de ex voluntarios.',
                color: '#73A950', bg: '#EDF5E8',
                icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
                keys: [
                    { key: 'text_vol_test_badge', label: 'Badge sección',      type: 'text'     },
                    { key: 'text_vol_test_title', label: 'Título sección',      type: 'text'     },
                    { key: 'text_vol_test_desc',  label: 'Descripción sección', type: 'textarea' },
                    { key: 'vol_test_1_frase',    label: 'Testimonio 1 — Frase',  type: 'textarea' },
                    { key: 'vol_test_1_nombre',   label: 'Testimonio 1 — Nombre', type: 'text'     },
                    { key: 'vol_test_1_rol',      label: 'Testimonio 1 — Rol',    type: 'text'     },
                    { key: 'vol_test_2_frase',    label: 'Testimonio 2 — Frase',  type: 'textarea' },
                    { key: 'vol_test_2_nombre',   label: 'Testimonio 2 — Nombre', type: 'text'     },
                    { key: 'vol_test_2_rol',      label: 'Testimonio 2 — Rol',    type: 'text'     },
                    { key: 'vol_test_3_frase',    label: 'Testimonio 3 — Frase',  type: 'textarea' },
                    { key: 'vol_test_3_nombre',   label: 'Testimonio 3 — Nombre', type: 'text'     },
                    { key: 'vol_test_3_rol',      label: 'Testimonio 3 — Rol',    type: 'text'     },
                ]
            },
            {
                id: 'galeria_vol',
                title: '9. Galería / Carrusel',
                desc: 'Título de la sección y fotos del carrusel. Podés agregar todas las fotos que quieras.',
                color: '#E15829', bg: '#FCEEE9',
                icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
                keys: [
                    { key: 'text_vol_galeria_badge', label: 'Badge',       type: 'text'     },
                    { key: 'text_vol_galeria_title', label: 'Título',       type: 'text'     },
                    { key: 'text_vol_galeria_desc',  label: 'Descripción',  type: 'textarea' },
                ],
                dynamicImages: { prefix: 'vol_slider_', label: 'Foto de galería' }
            },
            {
                id: 'links_vol',
                title: '10. Links',
                desc: 'El botón de inscripción al equipo.',
                color: '#FFB819', bg: '#FEF6E0',
                icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
                keys: [
                    { key: 'link_voluntarios_sumate', label: 'Botón "Sumate al equipo"', type: 'url' },
                ]
            },
        ]
    },

    cronograma: {
        title: 'Cronograma',
        sections: [
            {
                id: 'hero_sch',
                title: '1. Hero',
                desc: 'Textos del encabezado de la página de cronograma.',
                color: '#E15829', bg: '#FCEEE9',
                icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                keys: [
                    { key: 'text_sch_hero_badge', label: 'Badge',      type: 'text'     },
                    { key: 'text_sch_hero_title', label: 'Título',      type: 'text'     },
                    { key: 'text_sch_hero_desc',  label: 'Descripción', type: 'textarea' },
                ]
            },
            {
                id: 'crud_sch',
                title: '2. Eventos del Cronograma',
                desc: 'Agregá, editá o eliminá las actividades del cronograma.',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
                keys: [],
                crudType: 'cronograma'
            },
        ]
    },

    participacion: {
        title: 'Página de Participación',
        sections: [
            {
                id: 'hero_par',
                title: '1. Hero',
                desc: 'Título y descripción del encabezado.',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
                keys: [
                    { key: 'text_par_hero_highlight', label: 'Palabra destacada (gradiente)', type: 'text'     },
                    { key: 'text_par_hero_desc',      label: 'Descripción',                   type: 'textarea' },
                ]
            },
            {
                id: 'guia_par',
                title: '2. Guía de Inscripción',
                desc: 'Textos de la sección con los 3 pasos de inscripción.',
                color: '#73A950', bg: '#EDF5E8',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
                keys: [
                    { key: 'text_par_guia_badge', label: 'Badge',       type: 'text'     },
                    { key: 'text_par_guia_title', label: 'Título',       type: 'text'     },
                    { key: 'text_par_guia_desc',  label: 'Descripción',  type: 'textarea' },
                    { key: 'par_paso_1_title', label: 'Paso 1 — Título', type: 'text'     },
                    { key: 'par_paso_1_desc',  label: 'Paso 1 — Desc',   type: 'textarea' },
                    { key: 'par_paso_2_title', label: 'Paso 2 — Título', type: 'text'     },
                    { key: 'par_paso_2_desc',  label: 'Paso 2 — Desc',   type: 'textarea' },
                    { key: 'par_paso_3_title', label: 'Paso 3 — Título', type: 'text'     },
                    { key: 'par_paso_3_desc',  label: 'Paso 3 — Desc',   type: 'textarea' },
                ]
            },
            {
                id: 'alerta_par',
                title: '3. Alerta Informativa',
                desc: 'El cuadro azul "¿Tu escuela nunca participó?".',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                keys: [
                    { key: 'text_par_alerta_title', label: 'Título alerta', type: 'text'     },
                    { key: 'text_par_alerta_desc',  label: 'Texto alerta',  type: 'textarea' },
                ]
            },
            {
                id: 'docs_par',
                title: '4. Documentos Descargables',
                desc: 'Las 3 autorizaciones PDF. Podés cambiar nombre, descripción y subir nuevos archivos.',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                keys: [
                    { key: 'text_par_docs_title', label: 'Título sección',       type: 'text'     },
                    { key: 'text_par_docs_desc',  label: 'Descripción sección',  type: 'textarea' },
                    { key: 'par_doc_1_name', label: 'Doc 1 — Nombre', type: 'text' },
                    { key: 'par_doc_1_desc', label: 'Doc 1 — Desc',   type: 'text' },
                    { key: 'par_doc_1_file', label: 'Doc 1 — Archivo', type: 'file' },
                    { key: 'par_doc_2_name', label: 'Doc 2 — Nombre', type: 'text' },
                    { key: 'par_doc_2_desc', label: 'Doc 2 — Desc',   type: 'text' },
                    { key: 'par_doc_2_file', label: 'Doc 2 — Archivo', type: 'file' },
                    { key: 'par_doc_3_name', label: 'Doc 3 — Nombre', type: 'text' },
                    { key: 'par_doc_3_desc', label: 'Doc 3 — Desc',   type: 'text' },
                    { key: 'par_doc_3_file', label: 'Doc 3 — Archivo', type: 'file' },
                ]
            },
            {
                id: 'links_par',
                title: '5. Links',
                desc: 'Los links de los botones de inscripción.',
                color: '#FFB819', bg: '#FEF6E0',
                icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
                keys: [
                    { key: 'link_inscripcion_general',       label: 'Link Inscripción General',  type: 'url' },
                    { key: 'link_participacion_inscribirse', label: 'Botón "Inscribirme Ahora"', type: 'url' },
                ]
            },
        ]
    },

    organos: {
        title: 'Órganos',
        sections: [
            {
                id: 'hero_org',
                title: '1. Hero',
                desc: 'Textos del encabezado de la página de órganos.',
                color: '#73A950', bg: '#EDF5E8',
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                keys: [
                    { key: 'text_org_hero_badge', label: 'Badge',      type: 'text'     },
                    { key: 'text_org_hero_title', label: 'Título',      type: 'text'     },
                    { key: 'text_org_hero_desc',  label: 'Descripción', type: 'textarea' },
                ]
            },
            {
                id: 'crud_org',
                title: '2. Órganos',
                desc: 'Agregá, editá o eliminá los órganos con sus archivos y tópicos.',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                keys: [],
                crudType: 'organos'
            },
        ]
    },

    global: {
        title: 'Navbar & Footer',
        sections: [
            {
                id: 'navbar_branding',
                title: '1. Branding / Logo',
                desc: 'El logo y textos que aparecen en navbar y footer.',
                color: '#A02140', bg: '#F9E8EC',
                icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
                keys: [
                    { key: 'nav_logo',            label: 'Logo (imagen)',                 type: 'image' },
                    { key: 'nav_brand_main',      label: 'Texto principal (ej: UNIENDO)', type: 'text'  },
                    { key: 'nav_brand_highlight', label: 'Texto destacado (ej: METAS)',   type: 'text'  },
                    { key: 'nav_brand_subtitle',  label: 'Subtítulo (ej: SANTIAGO DEL ESTERO)', type: 'text' },
                ]
            },
            {
                id: 'navbar_buttons',
                title: '2. Botón Navbar',
                desc: 'El botón de "Inscribirse" en el navbar (el link ya está en Inicio → Links).',
                color: '#61B4E4', bg: '#E8F5FB',
                icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
                keys: [
                    { key: 'nav_show_button',        label: 'Mostrar botón Inscribirse', type: 'checkbox' },
                    { key: 'nav_button_text',        label: 'Texto botón desktop',   type: 'text' },
                    { key: 'nav_button_text_mobile', label: 'Texto botón mobile (opcional)', type: 'text' },
                ]
            },
            {
                id: 'footer_info',
                title: '3. Footer / Información',
                desc: 'Descripción, contacto y copyright del footer.',
                color: '#73A950', bg: '#EDF5E8',
                icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
                keys: [
                    { key: 'footer_text',     label: 'Descripción principal',         type: 'textarea' },
                    { key: 'footer_email',    label: 'Email de contacto',             type: 'text'     },
                    { key: 'footer_address',  label: 'Dirección / ubicación',         type: 'text'     },
                    { key: 'footer_copyright',label: 'Texto copyright (sin el año)',  type: 'text'     },
                ]
            },
            {
                id: 'footer_conciencia',
                title: '4. Footer / Asociación Conciencia',
                desc: 'El link a Asociación Conciencia que aparece en el footer.',
                color: '#FFB819', bg: '#FEF6E0',
                icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
                keys: [
                    { key: 'footer_conciencia_text', label: 'Texto del link',     type: 'text' },
                    { key: 'footer_conciencia_url',  label: 'URL de Conciencia',  type: 'url'  },
                ]
            },
            {
                id: 'footer_social',
                title: '5. Footer / Redes Sociales',
                desc: 'URLs de Instagram y YouTube que aparecen en el footer.',
                color: '#8A8A8D', bg: '#F3F3F4',
                icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
                keys: [
                    { key: 'footer_instagram_url', label: 'URL de Instagram', type: 'url' },
                    { key: 'footer_youtube_url',   label: 'URL de YouTube',   type: 'url' },
                ]
            },
        ]
    },
};

// ─── Defaults para findOrCreate ─────────────────────────────────────────────
const ALL_DEFAULTS = {
    // ─── NAVBAR & FOOTER (GLOBAL) ───
    nav_logo:                    { label: 'Navbar - Logo',                  type: 'image',         value: '/img/logo-um.png' },
    nav_brand_main:              { label: 'Navbar - Texto principal',       type: 'text',          value: 'UNIENDO' },
    nav_brand_highlight:         { label: 'Navbar - Texto destacado',       type: 'text',          value: 'METAS' },
    nav_brand_subtitle:          { label: 'Navbar - Subtítulo',             type: 'text',          value: 'SANTIAGO DEL ESTERO' },
    nav_show_button:             { label: 'Navbar - Mostrar botón',         type: 'checkbox',      value: 'true' },
    nav_button_text:             { label: 'Navbar - Texto botón desktop',   type: 'text',          value: 'Inscribirse' },
    nav_button_text_mobile:      { label: 'Navbar - Texto botón mobile',    type: 'text',          value: 'Inscribirse Ahora' },
    footer_text:                 { label: 'Footer - Descripción',           type: 'textarea',      value: 'Un programa de Asociación Conciencia que empodera a los jóvenes para liderar el cambio a través del debate y el consenso.' },
    footer_email:                { label: 'Footer - Email',                 type: 'text',          value: 'umsantiago@conciencia.org' },
    footer_address:              { label: 'Footer - Dirección',             type: 'text',          value: 'Santiago del Estero, Argentina' },
    footer_copyright:            { label: 'Footer - Copyright',             type: 'text',          value: 'Uniendo Metas Santiago del Estero. Todos los derechos reservados.' },
    footer_conciencia_text:      { label: 'Footer - Texto Conciencia',      type: 'text',          value: 'Asociación Conciencia' },
    footer_conciencia_url:       { label: 'Footer - URL Conciencia',        type: 'url',           value: 'https://conciencia.org/' },
    footer_instagram_url:        { label: 'Footer - URL Instagram',         type: 'url',           value: 'https://www.instagram.com/umsantiagodelestero' },
    footer_youtube_url:          { label: 'Footer - URL YouTube',           type: 'url',           value: 'https://youtube.com/@uniendometassde' },
    
    // ─── INICIO ───
    text_home_hero_badge:        { label: 'Inicio - Badge Hero',            type: 'text',          value: 'XI Edición • Santiago Del Estero' },
    text_home_hero_title:        { label: 'Inicio - Título Hero',           type: 'text',          value: 'JÓVENES PARA <br>' },
    text_home_hero_highlight:    { label: 'Inicio - Destacado Hero',        type: 'text',          value: 'EL FUTURO' },
    text_home_hero_subtitle:     { label: 'Inicio - Subtítulo Hero',        type: 'textarea',      value: '"Tu voz tiene poder."' },
    text_home_about_badge:       { label: 'Inicio - Badge Nosotros',        type: 'text',          value: 'Institucional' },
    text_home_about_title:       { label: 'Inicio - Título Nosotros',       type: 'text',          value: '¿Qué es Uniendo Metas?' },
    text_home_about_desc:        { label: 'Inicio - Desc Nosotros',         type: 'textarea',      value: 'Uniendo Metas es la simulación de Naciones Unidas más importante de Argentina.' },
    text_home_card1_title:       { label: 'Inicio - Card 1 Título',         type: 'text',          value: 'Metodología Harvard' },
    text_home_card1_desc:        { label: 'Inicio - Card 1 Desc',           type: 'textarea',      value: '' },
    text_home_card2_title:       { label: 'Inicio - Card 2 Título',         type: 'text',          value: 'Red de Voluntarios' },
    text_home_card2_desc:        { label: 'Inicio - Card 2 Desc',           type: 'textarea',      value: '' },
    text_home_card3_title:       { label: 'Inicio - Card 3 Título',         type: 'text',          value: 'Acompañamiento Docente' },
    text_home_card3_desc:        { label: 'Inicio - Card 3 Desc',           type: 'textarea',      value: '' },
    proxima_edicion_fecha:       { label: 'Fecha Próxima Edición',          type: 'datetime-local',value: '2026-10-15T18:00' },
    mostrar_fecha_modelo:        { label: 'Mostrar Contador',               type: 'checkbox',      value: 'false' },
    index_sde_1:                 { label: 'Inicio - Foto SDE 1',            type: 'image',         value: '' },
    index_sde_2:                 { label: 'Inicio - Foto SDE 2',            type: 'image',         value: '' },
    index_sde_3:                 { label: 'Inicio - Foto SDE 3',            type: 'image',         value: '' },
    index_sde_4:                 { label: 'Inicio - Foto SDE 4',            type: 'image',         value: '' },
    stat_1_value:                { label: 'Contador 1 Número',   type: 'text', value: '10'  },
    stat_1_label:                { label: 'Contador 1 Etiqueta', type: 'text', value: 'Ediciones'  },
    stat_1_prefix:               { label: 'Contador 1 Prefijo',  type: 'text', value: ''   },
    stat_2_value:                { label: 'Contador 2 Número',   type: 'text', value: '550' },
    stat_2_label:                { label: 'Contador 2 Etiqueta', type: 'text', value: 'Alumnos'    },
    stat_2_prefix:               { label: 'Contador 2 Prefijo',  type: 'text', value: '+'  },
    stat_3_value:                { label: 'Contador 3 Número',   type: 'text', value: '20'  },
    stat_3_label:                { label: 'Contador 3 Etiqueta', type: 'text', value: 'Escuelas'   },
    stat_3_prefix:               { label: 'Contador 3 Prefijo',  type: 'text', value: '+'  },
    stat_4_value:                { label: 'Contador 4 Número',   type: 'text', value: '40'  },
    stat_4_label:                { label: 'Contador 4 Etiqueta', type: 'text', value: 'Voluntarios'},
    stat_4_prefix:               { label: 'Contador 4 Prefijo',  type: 'text', value: '+'  },
    text_home_faq_extra1_q:      { label: 'FAQ Extra 1 Pregunta', type: 'text',     value: '' },
    text_home_faq_extra1_a:      { label: 'FAQ Extra 1 Respuesta',type: 'textarea', value: '' },
    text_home_faq_extra2_q:      { label: 'FAQ Extra 2 Pregunta', type: 'text',     value: '' },
    text_home_faq_extra2_a:      { label: 'FAQ Extra 2 Respuesta',type: 'textarea', value: '' },
    text_home_faq_extra3_q:      { label: 'FAQ Extra 3 Pregunta', type: 'text',     value: '' },
    text_home_faq_extra3_a:      { label: 'FAQ Extra 3 Respuesta',type: 'textarea', value: '' },
    text_home_faq_extra4_q:      { label: 'FAQ Extra 4 Pregunta', type: 'text',     value: '' },
    text_home_faq_extra4_a:      { label: 'FAQ Extra 4 Respuesta',type: 'textarea', value: '' },
    text_home_faq_extra5_q:      { label: 'FAQ Extra 5 Pregunta', type: 'text',     value: '' },
    text_home_faq_extra5_a:      { label: 'FAQ Extra 5 Respuesta',type: 'textarea', value: '' },
    sponsor_1_url:               { label: 'Sponsor 1 Link',   type: 'url',   value: 'https://sde.gob.ar/' },
    sponsor_1_img:               { label: 'Sponsor 1 Logo',   type: 'image', value: '/img/logos/gobierno.png' },
    sponsor_1_name:              { label: 'Sponsor 1 Nombre', type: 'text',  value: 'Gobierno de Santiago' },
    sponsor_2_url:               { label: 'Sponsor 2 Link',   type: 'url',   value: 'https://www.facebook.com/cyt.nodotecnologico/' },
    sponsor_2_img:               { label: 'Sponsor 2 Logo',   type: 'image', value: '/img/logos/logo-secretaria.png' },
    sponsor_2_name:              { label: 'Sponsor 2 Nombre', type: 'text',  value: 'Secretaría de CyT' },
    sponsor_3_url:               { label: 'Sponsor 3 Link',   type: 'url',   value: 'https://conciencia.org/' },
    sponsor_3_img:               { label: 'Sponsor 3 Logo',   type: 'image', value: '/img/logos/logo-ccc.png' },
    sponsor_3_name:              { label: 'Sponsor 3 Nombre', type: 'text',  value: 'Asociación Conciencia' },
    sponsor_4_url:               { label: 'Sponsor 4 Link',   type: 'url',   value: '' },
    sponsor_4_img:               { label: 'Sponsor 4 Logo',   type: 'image', value: '' },
    sponsor_4_name:              { label: 'Sponsor 4 Nombre', type: 'text',  value: '' },
    sponsor_5_url:               { label: 'Sponsor 5 Link',   type: 'url',   value: '' },
    sponsor_5_img:               { label: 'Sponsor 5 Logo',   type: 'image', value: '' },
    sponsor_5_name:              { label: 'Sponsor 5 Nombre', type: 'text',  value: '' },
    sponsor_6_url:               { label: 'Sponsor 6 Link',   type: 'url',   value: '' },
    sponsor_6_img:               { label: 'Sponsor 6 Logo',   type: 'image', value: '' },
    sponsor_6_name:              { label: 'Sponsor 6 Nombre', type: 'text',  value: '' },
    sponsor_7_url:               { label: 'Sponsor 7 Link',   type: 'url',   value: '' },
    sponsor_7_img:               { label: 'Sponsor 7 Logo',   type: 'image', value: '' },
    sponsor_7_name:              { label: 'Sponsor 7 Nombre', type: 'text',  value: '' },
    sponsor_8_url:               { label: 'Sponsor 8 Link',   type: 'url',   value: '' },
    sponsor_8_img:               { label: 'Sponsor 8 Logo',   type: 'image', value: '' },
    sponsor_8_name:              { label: 'Sponsor 8 Nombre', type: 'text',  value: '' },
    link_fotos:                  { label: 'Link Galería Fotos',             type: 'url',           value: '#' },
    link_instagram:              { label: 'Link Instagram',                 type: 'url',           value: 'https://instagram.com/umsantiagodelestero' },
    text_home_obj_1:             { label: 'Objetivo 1',                     type: 'text',          value: 'Oratoria y Comunicación' },
    text_home_obj_1_icon:        { label: 'Objetivo 1 Ícono',               type: 'icon',          value: 'mic' },
    text_home_obj_2:             { label: 'Objetivo 2',                     type: 'text',          value: 'Pensamiento Crítico' },
    text_home_obj_2_icon:        { label: 'Objetivo 2 Ícono',               type: 'icon',          value: 'lightbulb' },
    text_home_obj_3:             { label: 'Objetivo 3',                     type: 'text',          value: 'Trabajo Colaborativo' },
    text_home_obj_3_icon:        { label: 'Objetivo 3 Ícono',               type: 'icon',          value: 'users' },
    text_home_obj_4:             { label: 'Objetivo 4',                     type: 'text',          value: 'Visión Global' },
    text_home_obj_4_icon:        { label: 'Objetivo 4 Ícono',               type: 'icon',          value: 'globe' },
    text_home_obj_5:             { label: 'Objetivo 5',                     type: 'text',          value: 'Liderazgo' },
    text_home_obj_5_icon:        { label: 'Objetivo 5 Ícono',               type: 'icon',          value: 'star' },
    text_home_obj_6:             { label: 'Objetivo 6',                     type: 'text',          value: 'Empatía' },
    text_home_obj_6_icon:        { label: 'Objetivo 6 Ícono',               type: 'icon',          value: 'heart' },
    text_home_faq1_q:            { label: 'FAQ 1 Pregunta',                 type: 'text',          value: '¿Cuándo abre el período de inscripciones?' },
    text_home_faq1_a:            { label: 'FAQ 1 Respuesta',                type: 'textarea',      value: 'Aún no hay fechas definidas. Seguí nuestro Instagram para enterarte.' },
    text_home_faq2_q:            { label: 'FAQ 2 Pregunta',                 type: 'text',          value: '¿Cómo sé si mi escuela puede participar?' },
    text_home_faq2_a:            { label: 'FAQ 2 Respuesta',                type: 'textarea',      value: 'Puede participar cualquier escuela secundaria que complete todos los pasos.' },
    text_home_faq3_q:            { label: 'FAQ 3 Pregunta',                 type: 'text',          value: '¿Cuáles son los pasos para inscribir una delegación?' },
    text_home_faq3_a:            { label: 'FAQ 3 Respuesta',                type: 'textarea',      value: 'Tres pasos: 1) Inscripción del establecimiento. 2) Docente referente. 3) Participantes.' },
    text_home_faq4_q:            { label: 'FAQ 4 Pregunta',                 type: 'text',          value: '¿Tiene algún costo la inscripción?' },
    text_home_faq4_a:            { label: 'FAQ 4 Respuesta',                type: 'textarea',      value: '¡No! La inscripción es 100% gratuita.' },
    text_home_faq5_q:            { label: 'FAQ 5 Pregunta',                 type: 'text',          value: '¿Participo solo o en pareja?' },
    text_home_faq5_a:            { label: 'FAQ 5 Respuesta',                type: 'textarea',      value: 'En parejas: Asamblea General, ECOSOC y Consejo de Seguridad. Individual: CHD y Sala de Tratados.' },
    text_home_faq6_q:            { label: 'FAQ 6 Pregunta',                 type: 'text',          value: '¿Necesito experiencia previa?' },
    text_home_faq6_a:            { label: 'FAQ 6 Respuesta',                type: 'textarea',      value: '¡Para nada! Contamos con capacitaciones previas.' },
    text_home_faq7_q:            { label: 'FAQ 7 Pregunta',                 type: 'text',          value: 'Soy docente, ¿cómo inscribo a mi colegio?' },
    text_home_faq7_a:            { label: 'FAQ 7 Respuesta',                type: 'textarea',      value: 'Completá el formulario de Docente/Colegio en el botón INSCRIBIRSE.' },
    text_home_faq8_q:            { label: 'FAQ 8 Pregunta',                 type: 'text',          value: '¿Recibo algún certificado?' },
    text_home_faq8_a:            { label: 'FAQ 8 Respuesta',                type: 'textarea',      value: '¡Sí! Se entrega un diploma oficial certificado por Asociación Conciencia.' },
    text_aut_hero_title:         { label: 'Aut - Hero Título',        type: 'text',     value: 'Viví el modelo<br>' },
    text_aut_hero_highlight:     { label: 'Aut - Hero Highlight',     type: 'text',     value: 'desde el corazón.' },
    text_aut_hero_desc:          { label: 'Aut - Hero Desc',          type: 'textarea', value: 'Ser autoridad es mucho más que moderar un debate. Es hacer amigos, compartir mates en los recreos y ser parte del equipo que hace magia para que todo salga bien.' },
    text_aut_exp_badge:          { label: 'Aut - Exp Badge',          type: 'text',     value: 'La experiencia' },
    text_aut_exp_title:          { label: 'Aut - Exp Título',         type: 'text',     value: 'Un grupo de amigos<br>' },
    text_aut_exp_highlight:      { label: 'Aut - Exp Highlight',      type: 'text',     value: 'trabajando juntos.' },
    text_aut_exp_p1:             { label: 'Aut - Exp Párrafo 1',      type: 'textarea', value: 'Olvidate de la presión. Acá venimos a pasarla bien. El staff de autoridades es famoso por ser el grupo más unido del modelo.' },
    text_aut_exp_p2:             { label: 'Aut - Exp Párrafo 2',      type: 'textarea', value: 'No importa si te toca ser Presidente, Ujier o Secretario — lo importante son las anécdotas que te llevás, las risas en las capacitaciones.' },
    aut_check_1:                 { label: 'Aut - Check 1',            type: 'text',     value: 'Sin competencia, pura colaboración.' },
    aut_check_1_icon:            { label: 'Aut - Check 1 Ícono',      type: 'icon',     value: 'shield' },
    aut_check_2:                 { label: 'Aut - Check 2',            type: 'text',     value: 'Conocés gente de todos los colegios.' },
    aut_check_2_icon:            { label: 'Aut - Check 2 Ícono',      type: 'icon',     value: 'users' },
    aut_check_3:                 { label: 'Aut - Check 3',            type: 'text',     value: 'Una experiencia que recordás toda la vida.' },
    aut_check_3_icon:            { label: 'Aut - Check 3 Ícono',      type: 'icon',     value: 'star' },
    text_aut_legado_badge:       { label: 'Aut - Legado Badge',       type: 'text',     value: 'Nuestra Historia' },
    text_aut_legado_title:       { label: 'Aut - Legado Título',      type: 'text',     value: 'El Legado del Equipo' },
    text_aut_legado_desc:        { label: 'Aut - Legado Desc',        type: 'textarea', value: 'Miles de historias, un solo espíritu. Así disfrutaron las camadas anteriores.' },
    text_aut_roles_badge:        { label: 'Aut - Roles Badge',        type: 'text',     value: 'Tu lugar en el equipo' },
    text_aut_roles_title:        { label: 'Aut - Roles Título',       type: 'text',     value: '¿Desde dónde te gustaría participar?' },
    text_aut_roles_desc:         { label: 'Aut - Roles Desc',         type: 'textarea', value: 'Todos estos roles forman parte del mismo equipo. En las capacitaciones veremos juntos cuál es el ideal para vos.' },
    aut_rol_1_title:             { label: 'Aut - Rol 1 Título',       type: 'text',     value: 'Secretaría General' },
    aut_rol_1_desc:              { label: 'Aut - Rol 1 Desc',         type: 'textarea', value: 'El corazón del modelo. Coordinan que todo funcione, apoyan a las demás autoridades y garantizan que todos la pasen bien.' },
    aut_rol_1_badge:             { label: 'Aut - Rol 1 Badge',        type: 'text',     value: '' },
    aut_rol_2_title:             { label: 'Aut - Rol 2 Título',       type: 'text',     value: 'Presidencia' },
    aut_rol_2_desc:              { label: 'Aut - Rol 2 Desc',         type: 'textarea', value: 'Quienes guían el debate. Se aseguran de que todos hablen, se respeten los turnos y el intercambio fluya con buena onda.' },
    aut_rol_2_badge:             { label: 'Aut - Rol 2 Badge',        type: 'text',     value: '' },
    aut_rol_3_title:             { label: 'Aut - Rol 3 Título',       type: 'text',     value: 'Consejeros' },
    aut_rol_3_desc:              { label: 'Aut - Rol 3 Desc',         type: 'textarea', value: 'Fundamentales en el Consejo de Seguridad. Ayudan a redactar las ideas y dan soporte técnico a los delegados.' },
    aut_rol_3_badge:             { label: 'Aut - Rol 3 Badge',        type: 'text',     value: '' },
    aut_rol_4_title:             { label: 'Aut - Rol 4 Título',       type: 'text',     value: 'Ujieres' },
    aut_rol_4_desc:              { label: 'Aut - Rol 4 Desc',         type: 'textarea', value: 'El alma de la sala. Llevan los mensajes y ayudan con la organización del espacio.' },
    aut_rol_4_badge:             { label: 'Aut - Rol 4 Badge',        type: 'text',     value: 'Ideal para empezar' },
    text_aut_cap_badge:          { label: 'Aut - Cap Badge',          type: 'text',     value: 'Formación y Metodología' },
    text_aut_cap_title:          { label: 'Aut - Cap Título',         type: 'text',     value: 'Aprendemos juntos,<br>a tu ritmo.' },
    text_aut_cap_desc:           { label: 'Aut - Cap Desc',           type: 'textarea', value: 'Nuestro sistema de capacitación está diseñado para que disfrutes aprendiendo. No importa si es tu primera vez — te acompañamos.' },
    aut_cap_1_title:             { label: 'Aut - Cap 1 Título',       type: 'text',     value: 'Encuentros Virtuales' },
    aut_cap_1_desc:              { label: 'Aut - Cap 1 Desc',         type: 'textarea', value: 'Clases teóricas por Zoom. Ideales para entender los conceptos básicos desde tu casa.' },
    aut_cap_2_title:             { label: 'Aut - Cap 2 Título',       type: 'text',     value: 'Prácticas Presenciales' },
    aut_cap_2_desc:              { label: 'Aut - Cap 2 Desc',         type: 'textarea', value: 'Simulacros de debate. El momento de perder la vergüenza y conocer al equipo.' },
    aut_cap_3_title:             { label: 'Aut - Cap 3 Título',       type: 'text',     value: 'Instancia Final' },
    aut_cap_3_desc:              { label: 'Aut - Cap 3 Desc',         type: 'textarea', value: 'Un pequeño examen para validar lo aprendido. Si participaste activamente, lo pasás seguro.' },
    aut_faq_1_q:                 { label: 'Aut - FAQ 1 Pregunta',     type: 'text',     value: '¿Tengo que saber mucho para inscribirme?' },
    aut_faq_1_a:                 { label: 'Aut - FAQ 1 Respuesta',    type: 'textarea', value: '¡Para nada! Lo único que necesitás son ganas y compromiso. Nosotros te enseñamos todo.' },
    aut_faq_2_q:                 { label: 'Aut - FAQ 2 Pregunta',     type: 'text',     value: 'Si soy de 1er o 2do año, ¿puedo participar?' },
    aut_faq_2_a:                 { label: 'Aut - FAQ 2 Respuesta',    type: 'textarea', value: '¡Sí! El rol de Ujier está pensado especialmente para los primeros años.' },
    aut_faq_3_q:                 { label: 'Aut - FAQ 3 Pregunta',     type: 'text',     value: '¿Me ocupa mucho tiempo ser autoridad?' },
    aut_faq_3_a:                 { label: 'Aut - FAQ 3 Respuesta',    type: 'textarea', value: 'Las capacitaciones son pocas — usualmente 3 o 4 encuentros — en horarios que no interrumpan tus clases.' },
    aut_faq_4_q:                 { label: 'Aut - FAQ 4 Pregunta',     type: 'text',     value: '¿Me anoto solo o con amigos?' },
    aut_faq_4_a:                 { label: 'Aut - FAQ 4 Respuesta',    type: 'textarea', value: 'La inscripción es individual, ¡pero invitá a tus amigos! Van a compartir todas las capacitaciones juntos.' },
    aut_faq_5_q:                 { label: 'Aut - FAQ 5 Pregunta',     type: 'text',     value: '¿Cómo tengo que ir vestido?' },
    aut_faq_5_a:                 { label: 'Aut - FAQ 5 Respuesta',    type: 'textarea', value: 'Durante el Modelo la vestimenta es formal. Para capacitaciones podés ir con ropa casual.' },
    aut_faq_6_q:                 { label: 'Aut - FAQ 6 Pregunta',     type: 'text',     value: '¿Recibo algún certificado?' },
    aut_faq_6_a:                 { label: 'Aut - FAQ 6 Respuesta',    type: 'textarea', value: '¡Sí! Se entrega un diploma oficial certificado por Asociación Conciencia y Uniendo Metas.' },
    text_aut_hero_badge:         { label: 'Autoridades - Badge',            type: 'text',          value: 'Autoridades 2026' },
    text_aut_hero_title:         { label: 'Autoridades - Título',           type: 'text',          value: 'El corazón del modelo.' },
    text_aut_hero_desc:          { label: 'Autoridades - Descripción',      type: 'textarea',      value: '' },
    auth_hero_1:                 { label: 'Autoridades - Hero Foto 1',      type: 'image',         value: '' },
    auth_hero_2:                 { label: 'Autoridades - Hero Foto 2',      type: 'image',         value: '' },
    auth_legacy_1:               { label: 'Autoridades - Legado 1',         type: 'image',         value: '' },
    auth_legacy_2:               { label: 'Autoridades - Legado 2',         type: 'image',         value: '' },
    auth_legacy_3:               { label: 'Autoridades - Legado 3',         type: 'image',         value: '' },
    auth_legacy_4:               { label: 'Autoridades - Legado 4',         type: 'image',         value: '' },
    auth_legacy_5:               { label: 'Autoridades - Legado 5',         type: 'image',         value: '' },
    aut_rol_1_icon:              { label: 'Aut - Rol 1 Ícono', type: 'icon', value: 'building' },
    aut_rol_2_icon:              { label: 'Aut - Rol 2 Ícono', type: 'icon', value: 'chat'     },
    aut_rol_3_icon:              { label: 'Aut - Rol 3 Ícono', type: 'icon', value: 'pencil'   },
    aut_rol_4_icon:              { label: 'Aut - Rol 4 Ícono', type: 'icon', value: 'send'     },
    bib_1_name:                  { label: 'Bib 1 Nombre', type: 'text', value: 'Manual General' },
    bib_1_desc:                  { label: 'Bib 1 Desc',   type: 'text', value: 'Procedimiento parlamentario completo.' },
    bib_1_icon:                  { label: 'Bib 1 Ícono',  type: 'icon', value: 'academic' },
    bib_1_file:                  { label: 'Bib 1 Archivo',type: 'file', value: '/documents/Capacitacion/Manual_Autoridades.pdf' },
    bib_2_name:                  { label: 'Bib 2 Nombre', type: 'text', value: 'Guía de Logística' },
    bib_2_desc:                  { label: 'Bib 2 Desc',   type: 'text', value: 'Protocolo específico para Ujieres.' },
    bib_2_icon:                  { label: 'Bib 2 Ícono',  type: 'icon', value: 'pencil' },
    bib_2_file:                  { label: 'Bib 2 Archivo',type: 'file', value: '/documents/Capacitacion/Protocolo_Ujieres.pdf' },
    bib_3_name:  { label: 'Bib 3 Nombre', type: 'text', value: '' }, bib_3_desc: { label: 'Bib 3 Desc', type: 'text', value: '' }, bib_3_icon: { label: 'Bib 3 Ícono', type: 'icon', value: 'academic' }, bib_3_file: { label: 'Bib 3 Archivo', type: 'file', value: '' },
    bib_4_name:  { label: 'Bib 4 Nombre', type: 'text', value: '' }, bib_4_desc: { label: 'Bib 4 Desc', type: 'text', value: '' }, bib_4_icon: { label: 'Bib 4 Ícono', type: 'icon', value: 'academic' }, bib_4_file: { label: 'Bib 4 Archivo', type: 'file', value: '' },
    bib_5_name:  { label: 'Bib 5 Nombre', type: 'text', value: '' }, bib_5_desc: { label: 'Bib 5 Desc', type: 'text', value: '' }, bib_5_icon: { label: 'Bib 5 Ícono', type: 'icon', value: 'academic' }, bib_5_file: { label: 'Bib 5 Archivo', type: 'file', value: '' },
    bib_6_name:  { label: 'Bib 6 Nombre', type: 'text', value: '' }, bib_6_desc: { label: 'Bib 6 Desc', type: 'text', value: '' }, bib_6_icon: { label: 'Bib 6 Ícono', type: 'icon', value: 'academic' }, bib_6_file: { label: 'Bib 6 Archivo', type: 'file', value: '' },
    aut_faq_extra1_q: { label: 'Aut Extra FAQ 1 P', type: 'text', value: '' }, aut_faq_extra1_a: { label: 'Aut Extra FAQ 1 R', type: 'textarea', value: '' },
    aut_faq_extra2_q: { label: 'Aut Extra FAQ 2 P', type: 'text', value: '' }, aut_faq_extra2_a: { label: 'Aut Extra FAQ 2 R', type: 'textarea', value: '' },
    aut_faq_extra3_q: { label: 'Aut Extra FAQ 3 P', type: 'text', value: '' }, aut_faq_extra3_a: { label: 'Aut Extra FAQ 3 R', type: 'textarea', value: '' },
    aut_faq_extra4_q: { label: 'Aut Extra FAQ 4 P', type: 'text', value: '' }, aut_faq_extra4_a: { label: 'Aut Extra FAQ 4 R', type: 'textarea', value: '' },
    aut_faq_extra5_q: { label: 'Aut Extra FAQ 5 P', type: 'text', value: '' }, aut_faq_extra5_a: { label: 'Aut Extra FAQ 5 R', type: 'textarea', value: '' },
    link_autoridades_sumarme:    { label: 'Autoridades - Link Sumarme',     type: 'url',           value: '#' },
    link_autoridades_fotos:      { label: 'Autoridades - Link Fotos',       type: 'url',           value: '#' },
    vol_benefit_1:               { label: 'Vol - Beneficio 1',       type: 'text', value: 'Hacés amigos para toda la vida.' },
    vol_benefit_1_icon:          { label: 'Vol - Beneficio 1 Ícono', type: 'icon', value: 'users' },
    vol_benefit_2:               { label: 'Vol - Beneficio 2',       type: 'text', value: 'Impactás en la educación de cientos de jóvenes.' },
    vol_benefit_2_icon:          { label: 'Vol - Beneficio 2 Ícono', type: 'icon', value: 'academic' },
    vol_benefit_3:               { label: 'Vol - Beneficio 3',       type: 'text', value: 'Certificado oficial de Asociación Conciencia.' },
    vol_benefit_3_icon:          { label: 'Vol - Beneficio 3 Ícono', type: 'icon', value: 'shield' },
    text_vol_adn_badge:          { label: 'Vol - ADN Badge',         type: 'text',     value: 'Radiografía 2025' },
    text_vol_adn_title:          { label: 'Vol - ADN Título',         type: 'text',     value: 'ADN Voluntario' },
    text_vol_adn_desc:           { label: 'Vol - ADN Desc',           type: 'textarea', value: 'Un análisis de quienes hacen posible Uniendo Metas.' },
    text_vol_semillero_title:    { label: 'Vol - Semillero Título',   type: 'text',     value: 'El "Efecto Semillero"' },
    text_vol_semillero_desc:     { label: 'Vol - Semillero Desc',     type: 'textarea', value: 'La experiencia es tan transformadora que los participantes deciden volver. 8 de cada 10 voluntarios comenzaron su camino como delegados.' },
    vol_semillero_pct:           { label: 'Vol - Semillero %',        type: 'text',     value: '85' },
    vol_semillero_label:         { label: 'Vol - Semillero Label',    type: 'text',     value: 'Retorno' },
    vol_paridad_f:               { label: 'Vol - Paridad % F',        type: 'text',     value: '52' },
    vol_paridad_f_label:         { label: 'Vol - Paridad Label F',    type: 'text',     value: 'Mujeres' },
    vol_paridad_m_label:         { label: 'Vol - Paridad Label M',    type: 'text',     value: 'Varones' },
    vol_multi_count:             { label: 'Vol - Multi Count',        type: 'text',     value: '+8' },
    vol_multi_carreras:          { label: 'Vol - Multi Carreras',     type: 'text',     value: 'Abogacía,Medicina,Ingeniería' },
    vol_multi_extra:             { label: 'Vol - Multi Extra',        type: 'text',     value: '+4 más' },
    vol_hab_1_label:             { label: 'Vol - Hab 1 Nombre',       type: 'text',     value: 'Trabajo en Equipo' },
    vol_hab_1_pct:               { label: 'Vol - Hab 1 %',           type: 'text',     value: '83' },
    vol_hab_2_label:             { label: 'Vol - Hab 2 Nombre',       type: 'text',     value: 'Oratoria' },
    vol_hab_2_pct:               { label: 'Vol - Hab 2 %',           type: 'text',     value: '78' },
    vol_hab_3_label:             { label: 'Vol - Hab 3 Nombre',       type: 'text',     value: 'Confianza' },
    vol_hab_3_pct:               { label: 'Vol - Hab 3 %',           type: 'text',     value: '66' },
    vol_hab_4_label:             { label: 'Vol - Hab 4 Nombre',       type: 'text',     value: 'Liderazgo' },
    vol_hab_4_pct:               { label: 'Vol - Hab 4 %',           type: 'text',     value: '51' },
    text_vol_test_badge:         { label: 'Vol - Test Badge',         type: 'text',     value: 'Voces del equipo' },
    text_vol_test_title:         { label: 'Vol - Test Título',        type: 'text',     value: 'Lo que dejó el modelo' },
    text_vol_test_desc:          { label: 'Vol - Test Desc',          type: 'textarea', value: 'Palabras reales de quienes vivieron la experiencia desde adentro.' },
    vol_test_1_frase:            { label: 'Vol - Test 1 Frase',       type: 'textarea', value: 'El modelo me enseñó que podés organizar algo enorme con puro compromiso y sin cobrar un peso.' },
    vol_test_1_nombre:           { label: 'Vol - Test 1 Nombre',      type: 'text',     value: 'Valentina R.' },
    vol_test_1_rol:              { label: 'Vol - Test 1 Rol',         type: 'text',     value: 'Ex Presidenta de Sala · 3 ediciones' },
    vol_test_2_frase:            { label: 'Vol - Test 2 Frase',       type: 'textarea', value: 'Vine a ayudar y terminé siendo ayudado. Las habilidades que desarrollé en UM las uso todos los días.' },
    vol_test_2_nombre:           { label: 'Vol - Test 2 Nombre',      type: 'text',     value: 'Matías G.' },
    vol_test_2_rol:              { label: 'Vol - Test 2 Rol',         type: 'text',     value: 'Ex Secretario General · 2 ediciones' },
    vol_test_3_frase:            { label: 'Vol - Test 3 Frase',       type: 'textarea', value: 'Entré sin saber nada de ONU y salí con amigos para toda la vida.' },
    vol_test_3_nombre:           { label: 'Vol - Test 3 Nombre',      type: 'text',     value: 'Rocío T.' },
    vol_test_3_rol:              { label: 'Vol - Test 3 Rol',         type: 'text',     value: 'Ex Coordinadora de Logística · 4 ediciones' },
    text_vol_galeria_badge:      { label: 'Vol - Galería Badge',      type: 'text',     value: 'Momentos' },
    text_vol_galeria_title:      { label: 'Vol - Galería Título',     type: 'text',     value: 'Galería de Voluntariado' },
    text_vol_galeria_desc:       { label: 'Vol - Galería Desc',       type: 'textarea', value: 'Momentos inolvidables de nuestro equipo.' },
    text_vol_hero_badge:         { label: 'Voluntarios - Badge',            type: 'text',          value: 'Equipo de Voluntarios 2026' },
    text_vol_hero_title:         { label: 'Voluntarios - Título',           type: 'text',          value: 'El equipo detrás de la experiencia.' },
    text_vol_hero_desc:          { label: 'Voluntarios - Descripción',      type: 'textarea',      value: '' },
    vol_hero_1:                  { label: 'Voluntarios - Hero Foto 1',      type: 'image',         value: '' },
    vol_hero_2:                  { label: 'Voluntarios - Hero Foto 2',      type: 'image',         value: '' },
    text_vol_why_title:          { label: 'Voluntarios - Por qué Título',   type: 'text',          value: '¿Por qué unirte a nuestra familia?' },
    text_vol_why_desc:           { label: 'Voluntarios - Por qué Desc',     type: 'textarea',      value: '' },
    vol_slider_1:                { label: 'Voluntarios - Slider 1',         type: 'image',         value: '' },
    vol_slider_2:                { label: 'Voluntarios - Slider 2',         type: 'image',         value: '' },
    vol_slider_3:                { label: 'Voluntarios - Slider 3',         type: 'image',         value: '' },
    vol_slider_4:                { label: 'Voluntarios - Slider 4',         type: 'image',         value: '' },
    vol_slider_5:                { label: 'Voluntarios - Slider 5',         type: 'image',         value: '' },
    link_voluntarios_sumate:     { label: 'Voluntarios - Link Sumate',      type: 'url',           value: '#' },
    text_org_hero_badge:         { label: 'Órganos - Badge',             type: 'text',          value: 'Órganos 2026' },
    text_org_hero_title:         { label: 'Órganos - Título',            type: 'text',          value: 'Los Órganos del Modelo' },
    text_org_hero_desc:          { label: 'Órganos - Descripción',       type: 'textarea',      value: '' },
    text_sch_hero_badge:         { label: 'Cronograma - Badge',             type: 'text',          value: 'Agenda 2026' },
    text_sch_hero_title:         { label: 'Cronograma - Título',            type: 'text',          value: 'Cronograma de Actividades' },
    text_sch_hero_desc:          { label: 'Cronograma - Descripción',       type: 'textarea',      value: '' },
    text_par_hero_title:         { label: 'Par - Hero Título',      type: 'text',     value: '¿Cómo <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Participar?</span>' },
    text_par_hero_desc:          { label: 'Par - Hero Desc',        type: 'textarea', value: 'Todo lo que necesitas saber para ser parte del encuentro y la documentación necesaria.' },
    text_par_hero_highlight:     { label: 'Par - Hero Highlight',   type: 'text',     value: 'Participar' },
    text_par_guia_badge:         { label: 'Par - Guía Badge',       type: 'text',     value: 'Guía de Inscripción' },
    text_par_guia_title:         { label: 'Par - Guía Título',      type: 'text',     value: '¿Cómo sumarte al Encuentro?' },
    text_par_guia_desc:          { label: 'Par - Guía Desc',        type: 'textarea', value: 'La inscripción consta de tres pasos dependientes. Los participantes no podrán inscribirse si los pasos previos no están completos.' },
    par_paso_1_title:            { label: 'Par - Paso 1 Título',    type: 'text',     value: 'Inscripción del Establecimiento' },
    par_paso_1_desc:             { label: 'Par - Paso 1 Desc',      type: 'textarea', value: 'La escuela debe completar su registro institucional. Puede participar cualquier escuela secundaria (pública o privada).' },
    par_paso_2_title:            { label: 'Par - Paso 2 Título',    type: 'text',     value: 'Inscripción del Docente' },
    par_paso_2_desc:             { label: 'Par - Paso 2 Desc',      type: 'textarea', value: 'El docente referente debe registrarse una vez que la escuela esté dada de alta. Él será el nexo con la organización.' },
    par_paso_3_title:            { label: 'Par - Paso 3 Título',    type: 'text',     value: 'Inscripción de Participantes' },
    par_paso_3_desc:             { label: 'Par - Paso 3 Desc',      type: 'textarea', value: 'Finalmente, se inscriben los alumnos (Delegados/Autoridades) y los adultos acompañantes.' },
    text_par_alerta_title:       { label: 'Par - Alerta Título',    type: 'text',     value: '¿Tu escuela nunca participó?' },
    text_par_alerta_desc:        { label: 'Par - Alerta Desc',      type: 'textarea', value: 'Si tenés dudas sobre si tu institución está registrada o con quién comunicarte, escribinos a umsantiago@conciencia.org.' },
    text_par_docs_title:         { label: 'Par - Docs Título',      type: 'text',     value: 'Documentación para Acreditarse' },
    text_par_docs_desc:          { label: 'Par - Docs Desc',        type: 'textarea', value: 'Para completar tu participación, es indispensable presentar estas autorizaciones firmadas el primer día del modelo.' },
    par_doc_1_name:              { label: 'Par - Doc 1 Nombre',     type: 'text',     value: 'Delegados / Alumnos' },
    par_doc_1_desc:              { label: 'Par - Doc 1 Desc',       type: 'text',     value: 'Autorización de participación y uso de imagen para menores de edad.' },
    par_doc_1_file:              { label: 'Par - Doc 1 Archivo',    type: 'file',     value: '/documents/Autorizaciones/AUTORIZACIÓN ESTUDIANTES.pdf' },
    par_doc_2_name:              { label: 'Par - Doc 2 Nombre',     type: 'text',     value: 'Docentes Acompañantes' },
    par_doc_2_desc:              { label: 'Par - Doc 2 Desc',       type: 'text',     value: 'Autorización personal para docentes y asesores. Requiere firma del docente y sello de dirección.' },
    par_doc_2_file:              { label: 'Par - Doc 2 Archivo',    type: 'file',     value: '/documents/Autorizaciones/AUTORIZACIÓN DOCENTES.pdf' },
    par_doc_3_name:              { label: 'Par - Doc 3 Nombre',     type: 'text',     value: 'Establecimiento' },
    par_doc_3_desc:              { label: 'Par - Doc 3 Desc',       type: 'text',     value: 'Nota formal donde el Representante Legal autoriza la participación institucional del colegio.' },
    par_doc_3_file:              { label: 'Par - Doc 3 Archivo',    type: 'file',     value: '/documents/Autorizaciones/AUTORIZACIÓN ESTABLECIMIENTO.pdf' },
    text_par_hero_badge:         { label: 'Participación - Badge',          type: 'text',          value: 'Participá 2026' },
    text_par_hero_title:         { label: 'Participación - Título',         type: 'text',          value: '¿Querés participar?' },
    text_par_hero_desc:          { label: 'Participación - Descripción',    type: 'textarea',      value: '' },
    link_inscripcion_general:    { label: 'Link Inscripción General',       type: 'url',           value: '#' },
    link_participacion_inscribirse: { label: 'Link Inscribirme Ahora',      type: 'url',           value: '#' },
};

// ─── Helpers ────────────────────────────────────────────────────────────────
async function ensureDefaults(keys) {
    for (const key of keys) {
        const def = ALL_DEFAULTS[key];
        if (!def) continue;
        await Setting.findOrCreate({
            where: { key },
            defaults: { key, ...def }
        });
    }
}

async function getSettingsMap(keys) {
    const rows = await Setting.findAll({ where: { key: keys } });
    const map = {};
    rows.forEach(r => { map[r.key] = r.value; });
    // Fill defaults for missing
    keys.forEach(k => {
        if (map[k] === undefined) map[k] = ALL_DEFAULTS[k]?.value ?? '';
    });
    return map;
}

async function saveBody(body, files, page) { // <--- Agregamos 'page'
    // Collect keys to clear (logo removed by user)
    const clearKeys = new Set();
    for (const key of Object.keys(body)) {
        if (key.endsWith('_img_clear') && body[key] === '1') {
            const imgKey = key.replace('_img_clear', '_img');
            clearKeys.add(imgKey);
        }
    }

    // Text / url / checkbox fields
    for (const key of Object.keys(body)) {
        // Skip meta fields
        if (key.endsWith('_current') || key.endsWith('_img_clear') || key.endsWith('_img_current')) continue;
        let value = body[key];
        if (Array.isArray(value)) value = value.includes('true') ? 'true' : 'false';
        if (key === 'proxima_edicion_fecha' && typeof value === 'string') value = value.replace('T', ' ');
        // Always upsert
        const existing = await Setting.findOne({ where: { key } });
        if (existing) {
            await existing.update({ value });
        } else if (value !== '') {
            await Setting.create({ key, value, type: ALL_DEFAULTS[key]?.type || 'text', label: ALL_DEFAULTS[key]?.label || key });
        }
    }
    
    // SOLO limpiar sponsors y FAQs extra si estamos guardando la página de 'inicio'
    if (page === 'inicio') {
        for (let i = 1; i <= 8; i++) {
            const urlKey  = 'sponsor_' + i + '_url';
            const nameKey = 'sponsor_' + i + '_name';
            const imgKey  = 'sponsor_' + i + '_img';
            const bodyKeys = Object.keys(body);

            if (!bodyKeys.includes(urlKey) && !bodyKeys.includes(nameKey)) {
                for (const k of [urlKey, nameKey, imgKey]) {
                    const existing = await Setting.findOne({ where: { key: k } });
                    if (existing) await existing.update({ value: '' });
                }
            }
        }

        for (let i = 1; i <= 5; i++) {
            const qKey = 'text_home_faq_extra' + i + '_q';
            const aKey = 'text_home_faq_extra' + i + '_a';
            if (!Object.keys(body).includes(qKey)) {
                for (const k of [qKey, aKey]) {
                    const existing = await Setting.findOne({ where: { key: k } });
                    if (existing) await existing.update({ value: '' });
                }
            }
        }
    }

    // SOLO limpiar imágenes dinámicas si estamos en la página correcta
    const { Op } = require('sequelize');
    const dynamicPrefixes = [];
    if (page === 'voluntarios') dynamicPrefixes.push('vol_slider_');
    if (page === 'autoridades') dynamicPrefixes.push('auth_legacy_');

    for (const prefix of dynamicPrefixes) {
        const existingRows = await Setting.findAll({
            where: { key: { [Op.like]: prefix + '%' } }
        });

        const submittedKeys = new Set(Object.keys(body).filter(k => k.startsWith(prefix)));
        const uploadedKeys = new Set((files || []).filter(f => f.fieldname.startsWith(prefix)).map(f => f.fieldname));

        for (const row of existingRows) {
            // Solo limpiar si el usuario NO envió ninguna clave para esta imagen
            // (ni campo de formulario ni archivo nuevo)
            if (!submittedKeys.has(row.key) && !uploadedKeys.has(row.key)) {
                await row.update({ value: '' });
            }
        }

        for (const key of submittedKeys) {
            const value = body[key];
            // Preservar la URL existente: puede ser local ('/img/...') o Cloudinary ('https://...')
            // Si el campo está vacío, no sobreescribir (significa que no se cambió)
            if (value && value.trim() !== '') {
                const existing = await Setting.findOne({ where: { key } });
                if (existing) await existing.update({ value });
            }
        }

        for (const file of (files || [])) {
            if (!file.fieldname.startsWith(prefix)) continue;
            const key   = file.fieldname;
            const value = process.env.NODE_ENV === 'production' && file.path ? file.path : '/img/site/' + file.filename;
            const [setting, created] = await Setting.findOrCreate({
                where: { key },
                defaults: { key, value, type: 'image' }
            });
            if (!created) await setting.update({ value });
        }
    }

    // Clear logos marked for removal
    for (const imgKey of clearKeys) {
        const setting = await Setting.findOne({ where: { key: imgKey } });
        if (setting) await setting.update({ value: '' });
    }

    // Image and file uploads (Ignoramos los prefijos dinámicos porque ya los procesamos)
    const allDynamicPrefixes = ['vol_slider_', 'auth_legacy_']; 
    if (files && files.length > 0) {
        for (const file of files) {
            const key = file.fieldname;
            if (clearKeys.has(key)) continue;
            if (allDynamicPrefixes.some(p => key.startsWith(p))) continue;
            
            const isDocFile = key.startsWith('bib_') && key.endsWith('_file');
            let value = process.env.NODE_ENV === 'production' && file.path ? file.path : (isDocFile ? '/documents/site/' : '/img/site/') + file.filename;

            const [setting, created] = await Setting.findOrCreate({
                where: { key },
                defaults: { key, value, type: isDocFile ? 'file' : 'image' }
            });
            if (!created) await setting.update({ value });
        }
    }
}

// ─── Controller ─────────────────────────────────────────────────────────────
const controller = {

    // GET /admin/paginas/:page
    show: async (req, res) => {
        const page = req.params.page;
        const pageDef = PAGE_KEYS[page];
        if (!pageDef) return res.redirect('/admin/dashboard');

        try {
            // Collect all keys for this page
            const allKeys = pageDef.sections.flatMap(s => s.keys.map(k => k.key));
            await ensureDefaults(allKeys);
            const settingsMap = await getSettingsMap(allKeys);

            const flash = req.query.saved === '1'
                ? { type: 'success', message: 'Cambios guardados correctamente.' }
                : req.query.saved === '0'
                ? { type: 'error',   message: 'No se pudieron guardar los cambios.' }
                : null;

            // Build dynamic image lists for sections with dynamicImages config
            const dynamicImagesMap = {};
            for (const section of pageDef.sections) {
                if (section.dynamicImages) {
                    const prefix = section.dynamicImages.prefix;
                    const rows = await Setting.findAll({
                        where: { key: { [require('sequelize').Op.like]: prefix + '%' } },
                        order: [['key', 'ASC']]
                    });
                    dynamicImagesMap[section.id] = rows
                        .filter(r => r.value && r.value.trim())
                        .map(r => ({ key: r.key, value: r.value }));
                }
            }

            res.render('admin/pages/show', {
                title: pageDef.title,
                user: req.session.user,
                page,
                pageDef,
                settingsMap,
                dynamicImagesMap,
                flash
            });
        } catch (error) {
            console.error('Error cargando página:', error);
            res.status(500).render('500', { title: 'Error del Servidor' });
        }
    },

    // POST /admin/paginas/:page
    update: async (req, res) => {
        const page = req.params.page;
        try {
            await saveBody(req.body, req.files, page); // <--- ACÁ AGREGÁS LA VARIABLE 'page'
            res.redirect(`/admin/paginas/${page}?saved=1`);
        } catch (error) {
            console.error('Error guardando página:', error);
            res.redirect(`/admin/paginas/${page}?saved=0`);
        }
    },
};

// ─── CRUD Controllers ───────────────────────────────────────────────────────
const Schedule = require('../database/models/Schedule');
const Organ    = require('../database/models/Organ');

// Cronograma CRUD
controller.storeCronograma = async (req, res) => {
    try {
        const data = {
            day:      req.body.day,
            date:     req.body.date,
            time:     req.body.time,
            activity: req.body.activity,
            location: req.body.location || null,
            type:     req.body.type || 'general',
            sort_date: req.body.sort_date || null,
        };
        await Schedule.create(data);
        res.redirect('/admin/paginas/cronograma?saved=1');
    } catch (e) {
        console.error(e);
        res.redirect('/admin/paginas/cronograma?saved=0');
    }
};

controller.updateCronograma = async (req, res) => {
    try {
        const data = {
            day:      req.body.day,
            date:     req.body.date,
            time:     req.body.time,
            activity: req.body.activity,
            location: req.body.location || null,
            type:     req.body.type || 'general',
            sort_date: req.body.sort_date || null,
        };
        await Schedule.update(data, { where: { id: req.params.id } });
        res.redirect('/admin/paginas/cronograma?saved=1');
    } catch (e) {
        console.error(e);
        res.redirect('/admin/paginas/cronograma?saved=0');
    }
};

controller.destroyCronograma = async (req, res) => {
    try {
        await Schedule.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/paginas/cronograma');
    } catch (e) {
        console.error(e);
        res.redirect('/admin/paginas/cronograma');
    }
};

controller.editCronograma = async (req, res) => {
    try {
        const event = await Schedule.findByPk(req.params.id);
        if (!event) return res.redirect('/admin/paginas/cronograma');
        const pageDef = PAGE_KEYS['cronograma'];
        const allKeys = pageDef.sections.flatMap(s => s.keys.map(k => k.key));
        const settingsMap = await getSettingsMap(allKeys);
        const events = await Schedule.findAll({ order: [['sort_date', 'ASC'], ['time', 'ASC'], ['id', 'ASC']] });
        res.render('admin/pages/show', {
            title: pageDef.title,
            user: req.session.user,
            page: 'cronograma',
            pageDef,
            settingsMap,
            dynamicImagesMap: {},
            flash: null,
            editingCrud: { type: 'cronograma', item: event },
            crudData: { cronograma: events }
        });
    } catch (e) {
        console.error(e);
        res.redirect('/admin/paginas/cronograma');
    }
};

// Organos CRUD
controller.storeOrgano = async (req, res) => {
    try {
        const data = { name: req.body.name, description: req.body.description, color: req.body.color, topic: req.body.topic };
        if (req.files) {
            if (req.files['reglamento']?.[0]) {
                const f = req.files['reglamento'][0];
                data.link_reglamento = process.env.NODE_ENV === 'production' && f.path ? f.path : '/uploads/documents/' + f.filename;
            }
            if (req.files['archivo_dinamicas']?.[0]) {
                const f = req.files['archivo_dinamicas'][0];
                data.link_dinamicas = process.env.NODE_ENV === 'production' && f.path ? f.path : '/uploads/documents/' + f.filename;
            }
            if (req.files['archivo_topico']?.[0]) {
                const f = req.files['archivo_topico'][0];
                data.link_topico = process.env.NODE_ENV === 'production' && f.path ? f.path : '/uploads/documents/' + f.filename;
            }
        }
        await Organ.create(data);
        res.redirect('/admin/paginas/organos?saved=1');
    } catch (e) {
        console.error(e);
        res.redirect('/admin/paginas/organos?saved=0');
    }
};

controller.updateOrgano = async (req, res) => {
    try {
        const organ = await Organ.findByPk(req.params.id);
        if (!organ) return res.redirect('/admin/paginas/organos');
        const data = { name: req.body.name, description: req.body.description, color: req.body.color, topic: req.body.topic };
        if (req.files) {
            if (req.files['reglamento']?.[0]) {
                const f = req.files['reglamento'][0];
                data.link_reglamento = process.env.NODE_ENV === 'production' && f.path ? f.path : '/uploads/documents/' + f.filename;
            }
            if (req.files['archivo_dinamicas']?.[0]) {
                const f = req.files['archivo_dinamicas'][0];
                data.link_dinamicas = process.env.NODE_ENV === 'production' && f.path ? f.path : '/uploads/documents/' + f.filename;
            }
            if (req.files['archivo_topico']?.[0]) {
                const f = req.files['archivo_topico'][0];
                data.link_topico = process.env.NODE_ENV === 'production' && f.path ? f.path : '/uploads/documents/' + f.filename;
            }
        }
        await organ.update(data);
        res.redirect('/admin/paginas/organos?saved=1');
    } catch (e) {
        console.error(e);
        res.redirect('/admin/paginas/organos?saved=0');
    }
};

controller.destroyOrgano = async (req, res) => {
    try {
        await Organ.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/paginas/organos');
    } catch (e) {
        console.error(e);
        res.redirect('/admin/paginas/organos');
    }
};

controller.editOrgano = async (req, res) => {
    try {
        const organ = await Organ.findByPk(req.params.id);
        if (!organ) return res.redirect('/admin/paginas/organos');
        const pageDef = PAGE_KEYS['organos'];
        const allKeys = pageDef.sections.flatMap(s => s.keys.map(k => k.key));
        const settingsMap = await getSettingsMap(allKeys);
        const organs = await Organ.findAll({ order: [['name', 'ASC']] });
        res.render('admin/pages/show', {
            title: pageDef.title,
            user: req.session.user,
            page: 'organos',
            pageDef,
            settingsMap,
            dynamicImagesMap: {},
            flash: null,
            editingCrud: { type: 'organos', item: organ },
            crudData: { organos: organs }
        });
    } catch (e) {
        console.error(e);
        res.redirect('/admin/paginas/organos');
    }
};

// Override show to inject crudData for cronograma/organos pages
const originalShow = controller.show;
controller.show = async (req, res) => {
    const page = req.params.page;
    if (page === 'cronograma') {
        try {
            const pageDef = PAGE_KEYS['cronograma'];
            const allKeys = pageDef.sections.flatMap(s => s.keys.map(k => k.key));
            await ensureDefaults(allKeys);
            const settingsMap = await getSettingsMap(allKeys);
            const events = await Schedule.findAll({ order: [['sort_date', 'ASC'], ['time', 'ASC'], ['id', 'ASC']] });
            const flash = req.query.saved === '1' ? { type: 'success', message: 'Cambios guardados correctamente.' }
                        : req.query.saved === '0' ? { type: 'error', message: 'No se pudieron guardar los cambios.' }
                        : null;
            return res.render('admin/pages/show', {
                title: pageDef.title, user: req.session.user, page, pageDef,
                settingsMap, dynamicImagesMap: {}, flash,
                editingCrud: null, crudData: { cronograma: events }
            });
        } catch (e) {
            console.error(e);
            return res.status(500).render('500', { title: 'Error' });
        }
    }
    if (page === 'organos') {
        try {
            const pageDef = PAGE_KEYS['organos'];
            const allKeys = pageDef.sections.flatMap(s => s.keys.map(k => k.key));
            await ensureDefaults(allKeys);
            const settingsMap = await getSettingsMap(allKeys);
            const organs = await Organ.findAll({ order: [['name', 'ASC']] });
            const flash = req.query.saved === '1' ? { type: 'success', message: 'Cambios guardados correctamente.' }
                        : req.query.saved === '0' ? { type: 'error', message: 'No se pudieron guardar los cambios.' }
                        : null;
            return res.render('admin/pages/show', {
                title: pageDef.title, user: req.session.user, page, pageDef,
                settingsMap, dynamicImagesMap: {}, flash,
                editingCrud: null, crudData: { organos: organs }
            });
        } catch (e) {
            console.error(e);
            return res.status(500).render('500', { title: 'Error' });
        }
    }
    return originalShow(req, res);
};

module.exports = controller;
