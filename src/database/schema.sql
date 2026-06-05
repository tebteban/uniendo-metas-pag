-- ================================================================
--  UNIENDO METAS - Base de Datos de Práctica
--  Estilo Northwind: tablas relacionadas, muchos datos, FK
--  Sintaxis: T-SQL (SQL Server / SSMS)
-- ================================================================
-- INSTRUCCIONES:
--   1. En SSMS, creá una BD nueva: clic derecho en Databases → New Database → "UniendoMetas"
--   2. Seleccioná esa BD (doble clic o USE UniendoMetas)
--   3. Abrí este archivo y ejecutá con F5
-- ================================================================

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'UniendoMetas')
    CREATE DATABASE UniendoMetas;
GO
USE UniendoMetas;
GO

-- ================================================================
-- LIMPIAR TABLAS SI YA EXISTEN (para poder re-ejecutar)
-- ================================================================
IF OBJECT_ID('Inscriptions', 'U') IS NOT NULL DROP TABLE Inscriptions;
IF OBJECT_ID('ScheduleEvents', 'U') IS NOT NULL DROP TABLE ScheduleEvents;
IF OBJECT_ID('OrganDocuments', 'U') IS NOT NULL DROP TABLE OrganDocuments;
IF OBJECT_ID('StaffMembers', 'U') IS NOT NULL DROP TABLE StaffMembers;
IF OBJECT_ID('LegacyVolunteers', 'U') IS NOT NULL DROP TABLE LegacyVolunteers;
IF OBJECT_ID('Organs', 'U') IS NOT NULL DROP TABLE Organs;
IF OBJECT_ID('Schools', 'U') IS NOT NULL DROP TABLE Schools;
IF OBJECT_ID('Editions', 'U') IS NOT NULL DROP TABLE Editions;
IF OBJECT_ID('Areas', 'U') IS NOT NULL DROP TABLE Areas;
IF OBJECT_ID('Users', 'U') IS NOT NULL DROP TABLE Users;
GO

-- ================================================================
-- 1. Editions — Ediciones del modelo (tabla maestra)
-- ================================================================
CREATE TABLE Editions (
    edition_id   INT IDENTITY(1,1) PRIMARY KEY,
    year         INT           NOT NULL UNIQUE,
    theme        NVARCHAR(300),
    location     NVARCHAR(255),
    start_date   DATE,
    end_date     DATE,
    total_participants INT     DEFAULT 0,
    status       NVARCHAR(20)  DEFAULT 'finalizada'  -- 'planificada', 'en_curso', 'finalizada'
);
GO

INSERT INTO Editions (year, theme, location, start_date, end_date, total_participants, status) VALUES
(2015, 'Desarrollo Sostenible',              'Santiago del Estero', '2015-10-15', '2015-10-17', 80,  'finalizada'),
(2016, 'Cambio Climático',                   'Santiago del Estero', '2016-10-20', '2016-10-22', 110, 'finalizada'),
(2017, 'Derechos Humanos',                   'Santiago del Estero', '2017-10-19', '2017-10-21', 135, 'finalizada'),
(2018, 'Paz y Seguridad Internacional',      'Santiago del Estero', '2018-10-18', '2018-10-20', 160, 'finalizada'),
(2019, 'Refugiados y Migraciones',           'Santiago del Estero', '2019-10-17', '2019-10-19', 200, 'finalizada'),
(2020, 'Pandemia y Salud Global',            'Virtual',             '2020-11-05', '2020-11-07', 90,  'finalizada'),
(2021, 'Recuperación Post-Pandemia',         'Virtual',             '2021-10-21', '2021-10-23', 95,  'finalizada'),
(2022, 'Tecnología y Futuro del Trabajo',    'Santiago del Estero', '2022-10-20', '2022-10-22', 220, 'finalizada'),
(2023, 'Inteligencia Artificial y Ética',   'Santiago del Estero', '2023-10-19', '2023-10-21', 280, 'finalizada'),
(2024, 'Seguridad Alimentaria',              'Santiago del Estero', '2024-10-17', '2024-10-19', 310, 'finalizada'),
(2025, 'Energía y Transición Verde',         'Santiago del Estero', '2025-10-16', '2025-10-18', 350, 'finalizada'),
(2026, 'Democracia y Participación Juvenil', 'Santiago del Estero', '2026-10-15', '2026-10-17', 0,   'planificada');
GO

-- ================================================================
-- 2. Areas — Áreas del staff
-- ================================================================
CREATE TABLE Areas (
    area_id     INT IDENTITY(1,1) PRIMARY KEY,
    name        NVARCHAR(100) NOT NULL UNIQUE,
    description NVARCHAR(300),
    color       NVARCHAR(10)
);
GO

INSERT INTO Areas (name, description, color) VALUES
('Coordinación General', 'Dirección y coordinación del evento',             '#A02140'),
('Prensa y Comunicación','Redes sociales, diseño y comunicación externa',   '#61B4E4'),
('Logística',            'Organización de espacio, materiales y traslados', '#E15829'),
('Académica',            'Capacitación de delegados y autoridades',         '#73A950'),
('Tecnología',           'Sistemas, streaming y soporte técnico',           '#FFB819'),
('Relaciones Institucionales', 'Contacto con colegios y sponsors',          '#8A8A8D');
GO

-- ================================================================
-- 3. Organs — Órganos del modelo
-- ================================================================
CREATE TABLE Organs (
    organ_id        INT IDENTITY(1,1) PRIMARY KEY,
    name            NVARCHAR(255) NOT NULL,
    description     NVARCHAR(MAX),
    color           NVARCHAR(10),
    topic           NVARCHAR(500),
    max_delegates   INT           DEFAULT 20,
    difficulty      NVARCHAR(20)  DEFAULT 'intermedio',  -- 'basico', 'intermedio', 'avanzado'
    link_reglamento NVARCHAR(500),
    link_topico     NVARCHAR(500)
);
GO

INSERT INTO Organs (name, description, color, topic, max_delegates, difficulty) VALUES
('Consejo de Seguridad',    'Órgano principal para el mantenimiento de la paz y seguridad internacional.',  '#A02140', 'Conflicto en el Mar del Sur de China',         15, 'avanzado'),
('Asamblea General',        'Principal órgano deliberativo y representativo de las Naciones Unidas.',       '#61B4E4', 'Reforma del sistema de votación en la ONU',   40, 'intermedio'),
('UNICEF',                  'Fondo para la infancia: educación, salud y protección de niños.',              '#73A950', 'Acceso a educación en zonas de conflicto',     25, 'basico'),
('OMS',                     'Organización Mundial de la Salud.',                                            '#E15829', 'Resistencia a antibióticos: una amenaza global',22, 'intermedio'),
('UNESCO',                  'Organización para la Educación, la Ciencia y la Cultura.',                    '#FFB819', 'Preservación del patrimonio cultural en guerra',20, 'intermedio'),
('PNUMA',                   'Programa de las Naciones Unidas para el Medio Ambiente.',                     '#73A950', 'Contaminación plástica en océanos',             18, 'basico'),
('OIT',                     'Organización Internacional del Trabajo.',                                      '#8A8A8D', 'Trabajo infantil en cadenas de suministro',    20, 'intermedio'),
('Corte Internacional',     'Principal órgano judicial de las Naciones Unidas.',                           '#A02140', 'Soberanía territorial en disputas marítimas',  12, 'avanzado');
GO

-- ================================================================
-- 4. Schools — Colegios participantes
-- ================================================================
CREATE TABLE Schools (
    school_id   INT IDENTITY(1,1) PRIMARY KEY,
    name        NVARCHAR(255) NOT NULL,
    type        NVARCHAR(20)  DEFAULT 'publica',   -- 'publica', 'privada'
    city        NVARCHAR(100) DEFAULT 'Santiago del Estero',
    contact     NVARCHAR(255),
    email       NVARCHAR(255),
    editions_participated INT DEFAULT 0
);
GO

INSERT INTO Schools (name, type, city, email, editions_participated) VALUES
('Colegio Nacional "Absalón Rojas"',           'publica',  'Santiago del Estero', 'absalon@edu.se.gov.ar',    8),
('Instituto "Nuestra Señora del Huerto"',       'privada',  'Santiago del Estero', 'huerto@nsh.edu.ar',        6),
('Escuela Normal Superior "Manuel Belgrano"',   'publica',  'Santiago del Estero', 'normal@edu.se.gov.ar',     7),
('Colegio "San Francisco de Asís"',             'privada',  'Santiago del Estero', 'sfa@sfasde.edu.ar',        5),
('ENET Nº 1',                                   'publica',  'Santiago del Estero', 'enet1@edu.se.gov.ar',      4),
('Instituto "María Auxiliadora"',               'privada',  'La Banda',            'mauxiliadora@edu.ar',      3),
('Colegio "Jesús Adolescente"',                 'privada',  'Santiago del Estero', 'jesusadol@edu.ar',         6),
('Escuela de Comercio "Gral. Güemes"',          'publica',  'Santiago del Estero', 'guemes@edu.se.gov.ar',     2),
('Instituto "Sagrada Familia"',                 'privada',  'La Banda',            'sagradafam@edu.ar',        4),
('Colegio "San José"',                          'privada',  'Santiago del Estero', 'sanjose@sanjose.edu.ar',   5),
('IPEM "25 de Mayo"',                           'publica',  'Añatuya',             'ipem25@edu.se.gov.ar',     1),
('Escuela Técnica "Gdor. Anselmo Rojo"',        'publica',  'Frías',               'tecnica.frias@edu.se.gov.ar', 2);
GO

-- ================================================================
-- 5. StaffMembers — Equipo de voluntarios actuales
-- ================================================================
CREATE TABLE StaffMembers (
    staff_id    INT IDENTITY(1,1) PRIMARY KEY,
    area_id     INT           NOT NULL REFERENCES Areas(area_id),
    name        NVARCHAR(255) NOT NULL,
    role        NVARCHAR(255) NOT NULL,
    email       NVARCHAR(255),
    [order]     INT           DEFAULT 0,
    active      BIT           DEFAULT 1,
    joined_year INT
);
GO

INSERT INTO StaffMembers (area_id, name, role, email, [order], active, joined_year) VALUES
(1, 'Esteban Cejas',         'Director General',            'esteban@um.org',    1,  1, 2023),
(1, 'Ezequiel Rossetti',     'Coordinador de Órganos',      'ezequiel@um.org',   2,  1, 2022),
(1, 'Salvador Navarrete',    'Coordinador Ejecutivo',       'salvador@um.org',   3,  1, 2023),
(2, 'Sol Basualdo',          'Directora de Prensa',         'sol@um.org',        4,  1, 2023),
(2, 'Martina Basualdo',      'Diseñadora Gráfica',         'martina@um.org',    5,  1, 2024),
(2, 'Camila Diaz',           'Community Manager',           'camila@um.org',     6,  1, 2024),
(3, 'Leandro Segura',        'Coordinador Logístico',      'leandro@um.org',    7,  1, 2022),
(3, 'Rodrigo Montenegro',    'Logística y Traslados',       'rodrigo@um.org',    8,  1, 2023),
(3, 'Lourdes Maguicha',      'Acreditación',                'lourdes@um.org',    9,  1, 2024),
(4, 'Mariana Carreras',      'Capacitadora de Delegados',  'mariana@um.org',   10,  1, 2023),
(4, 'Florencia Juarez',      'Capacitadora de Autoridades','florencia@um.org',  11,  1, 2023),
(4, 'Ibrahim Franjieh',      'Mesa Directiva',              'ibrahim@um.org',   12,  1, 2024),
(5, 'Francesco Doffo',       'Soporte Técnico y Streaming', 'francesco@um.org', 13,  1, 2024),
(5, 'Roman Reinoso',         'Sistemas y Web',              'roman@um.org',     14,  1, 2024),
(6, 'Morena Paz',            'Relaciones Institucionales',  'morena@um.org',    15,  1, 2023),
(6, 'Joaquin Maguna',        'Contacto con Colegios',       'joaquin@um.org',   16,  1, 2024),
(2, 'Maite Queirolo',        'Fotógrafa Oficial',          'maite@um.org',     17,  1, 2024),
(1, 'Martin Veliz',          'Coordinador Adjunto',         'martin@um.org',    18,  0, 2022),
(3, 'Yana Garcia',           'Logística (inactiva)',        'yana@um.org',      19,  0, 2023);
GO

-- ================================================================
-- 6. LegacyVolunteers — Voluntarios de ediciones anteriores
-- ================================================================
CREATE TABLE LegacyVolunteers (
    volunteer_id INT IDENTITY(1,1) PRIMARY KEY,
    edition_id   INT           NOT NULL REFERENCES Editions(edition_id),
    name         NVARCHAR(255) NOT NULL,
    role         NVARCHAR(255)
);
GO

INSERT INTO LegacyVolunteers (edition_id, name, role) VALUES
-- 2025 (edition_id = 11)
(11,'Sol Basualdo','Directora de Prensa'),      (11,'Leandro Segura','Coordinador Logístico'),
(11,'Salvador Navarrete','Coordinador Ejecutivo'),(11,'Mariana Carreras','Capacitadora'),
(11,'Lautaro Vera','Logística'),                (11,'Micaela Ledesma','Prensa'),
(11,'Ayelen Banegas','Acreditación'),           (11,'Florencia Juarez','Capacitadora'),
(11,'Morena Paz','Relaciones Institucionales'), (11,'Ana V. Quiroga','Mesa Directiva'),
(11,'Ezequiel Rossetti','Coordinador de Órganos'),(11,'Esteban Cejas','Director General'),
(11,'Luciana Ledesma','Diseño'),                (11,'Marco Nofal','Técnico'),
(11,'Joaquin Rivas','Community Manager'),       (11,'Ibrahim Franjieh','Mesa Directiva'),
(11,'Francesco Doffo','Streaming'),             (11,'Roman Reinoso','Web'),
(11,'Maite Queirolo','Fotografía'),             (11,'Camila Diaz','Redes Sociales'),
-- 2024 (edition_id = 10)
(10,'Juan Pérez','Coordinador'),               (10,'María González','Prensa'),
(10,'Lucas Díaz','Logística'),                  (10,'Sofía Rodriguez','Acreditación'),
(10,'Carlos Gomez','Técnico'),                  (10,'Ana López','Capacitadora'),
(10,'Pedro Ruiz','Mesa Directiva'),             (10,'Lucía Fernández','Diseño'),
-- 2023 (edition_id = 9)
(9,'Sofía Martínez','Coordinadora'),            (9,'Pedro Ruiz','Logística'),
(9,'Ana López','Prensa'),                       (9,'Carlos Gomez','Técnico'),
(9,'Julian Alvarez','Mesa Directiva'),          (9,'Enzo Fernandez','Capacitador'),
-- 2022 (edition_id = 8)
(8,'Carlos Sánchez','Coordinador'),             (8,'Lucía Fernández','Diseño'),
(8,'Miguel Torres','Logística'),                (8,'Julieta Paz','Prensa');
GO

-- ================================================================
-- 7. ScheduleEvents — Cronograma de actividades
-- ================================================================
CREATE TABLE ScheduleEvents (
    event_id    INT IDENTITY(1,1) PRIMARY KEY,
    edition_id  INT           NOT NULL REFERENCES Editions(edition_id),
    day         NVARCHAR(50)  NOT NULL,
    date        NVARCHAR(100) NOT NULL,
    sort_date   DATE,
    time        NVARCHAR(20)  NOT NULL,
    activity    NVARCHAR(500) NOT NULL,
    location    NVARCHAR(255),
    type        NVARCHAR(30)  DEFAULT 'general'
);
GO

INSERT INTO ScheduleEvents (edition_id, day, date, sort_date, time, activity, location, type) VALUES
(12,'Jueves',  '15 de Octubre','2026-10-15','08:00','Acreditación general',              'Hall de entrada',    'general'),
(12,'Jueves',  '15 de Octubre','2026-10-15','10:00','Capacitación de Autoridades',       'Sala A',             'cap_autoridades'),
(12,'Jueves',  '15 de Octubre','2026-10-15','10:00','Capacitación de Delegados - Parte 1','Sala B',            'cap_delegados'),
(12,'Jueves',  '15 de Octubre','2026-10-15','14:00','Capacitación de Delegados - Parte 2','Sala B',            'cap_delegados'),
(12,'Jueves',  '15 de Octubre','2026-10-15','17:00','Sorteo de países',                  'Salón Principal',    'sorteo'),
(12,'Jueves',  '15 de Octubre','2026-10-15','19:00','Cena de camaradería',               'Comedor',            'convivencia'),
(12,'Viernes', '16 de Octubre','2026-10-16','08:30','Examen de delegados',               'Aulas',              'examen'),
(12,'Viernes', '16 de Octubre','2026-10-16','10:00','Sesión 1 del Modelo',               'Salón Principal',    'modelo'),
(12,'Viernes', '16 de Octubre','2026-10-16','14:00','Sesión 2 del Modelo',               'Salón Principal',    'modelo'),
(12,'Viernes', '16 de Octubre','2026-10-16','18:00','Actividad recreativa',              'Patio',              'convivencia'),
(12,'Sábado',  '17 de Octubre','2026-10-17','09:00','Sesión 3 del Modelo - Final',       'Salón Principal',    'modelo'),
(12,'Sábado',  '17 de Octubre','2026-10-17','14:00','Votación y resoluciones',           'Salón Principal',    'modelo'),
(12,'Sábado',  '17 de Octubre','2026-10-17','17:00','Clausura y entrega de diplomas',    'Salón Principal',    'general');
GO

-- ================================================================
-- 8. Inscriptions — Inscripciones de participantes
-- ================================================================
CREATE TABLE Inscriptions (
    inscription_id INT IDENTITY(1,1) PRIMARY KEY,
    edition_id     INT           NOT NULL REFERENCES Editions(edition_id),
    school_id      INT               REFERENCES Schools(school_id),
    organ_id       INT               REFERENCES Organs(organ_id),
    type           NVARCHAR(20)  NOT NULL,  -- 'delegado', 'autoridad', 'escuela', 'voluntario'
    name           NVARCHAR(255) NOT NULL,
    email          NVARCHAR(255),
    country        NVARCHAR(100),           -- país asignado (para delegados)
    status         NVARCHAR(20)  DEFAULT 'pendiente'  -- 'pendiente', 'confirmado', 'presente'
);
GO

INSERT INTO Inscriptions (edition_id, school_id, organ_id, type, name, email, country, status) VALUES
-- Delegados 2026 (edition 12)
(12, 1,  1, 'delegado', 'Ana López',         'ana@colegio.edu.ar',    'China',          'confirmado'),
(12, 1,  1, 'delegado', 'Tomás Ríos',        'tomas@colegio.edu.ar',  'Estados Unidos', 'confirmado'),
(12, 2,  2, 'delegado', 'Lucía Martínez',   'lucia@huerto.edu.ar',   'Francia',        'confirmado'),
(12, 2,  2, 'delegado', 'Bruno Salinas',     'bruno@huerto.edu.ar',   'Rusia',          'confirmado'),
(12, 3,  3, 'delegado', 'Valentina Soria',   'valen@normal.edu.ar',   'Brasil',         'confirmado'),
(12, 3,  3, 'delegado', 'Agustín Paz',       'agus@normal.edu.ar',    'India',          'pendiente'),
(12, 4,  4, 'delegado', 'Renata Molina',     'renata@sfa.edu.ar',     'Alemania',       'confirmado'),
(12, 4,  5, 'delegado', 'Santiago Gómez',   'santi@sfa.edu.ar',      'Japón',          'confirmado'),
(12, 5,  6, 'delegado', 'Camila Rueda',      'camila@enet.edu.ar',    'México',         'pendiente'),
(12, 6,  7, 'delegado', 'Felipe Castro',     'felipe@mauxiliadora.ar','Argentina',      'confirmado'),
(12, 7,  8, 'delegado', 'Julieta Herrera',   'juli@jesusadol.edu.ar', 'España',         'confirmado'),
(12, 8,  1, 'delegado', 'Mateo Vera',        'mateo@guemes.edu.ar',   'Reino Unido',    'confirmado'),
(12, 9,  2, 'delegado', 'Isabella Romero',   'isa@sagradafam.edu.ar', 'Italia',         'pendiente'),
(12,10,  3, 'delegado', 'Nicolás Suárez',   'nico@sanjose.edu.ar',   'Canadá',         'confirmado'),
-- Autoridades 2026
(12, NULL, NULL, 'autoridad', 'Ibrahim Franjieh',  'ibrahim@um.org',  NULL, 'confirmado'),
(12, NULL, NULL, 'autoridad', 'Florencia Juarez',  'florencia@um.org',NULL, 'confirmado'),
(12, NULL, NULL, 'autoridad', 'Mariana Carreras',  'mariana@um.org',  NULL, 'confirmado'),
-- Escuelas 2026
(12,  1, NULL, 'escuela', 'Col. Absalón Rojas',         NULL, NULL, 'confirmado'),
(12,  2, NULL, 'escuela', 'Inst. Ntra. Sra. del Huerto', NULL, NULL, 'confirmado'),
(12,  3, NULL, 'escuela', 'Esc. Normal Manuel Belgrano', NULL, NULL, 'confirmado'),
(12,  4, NULL, 'escuela', 'Col. San Francisco de Asís',  NULL, NULL, 'pendiente'),
(12,  5, NULL, 'escuela', 'ENET Nº 1',                   NULL, NULL, 'confirmado'),
-- Voluntarios 2026
(12, NULL, NULL, 'voluntario', 'Esteban Cejas',    'esteban@um.org',  NULL, 'confirmado'),
(12, NULL, NULL, 'voluntario', 'Sol Basualdo',     'sol@um.org',      NULL, 'confirmado'),
(12, NULL, NULL, 'voluntario', 'Leandro Segura',   'leandro@um.org',  NULL, 'confirmado'),
(12, NULL, NULL, 'voluntario', 'Camila Diaz',      'camila@um.org',   NULL, 'confirmado'),
(12, NULL, NULL, 'voluntario', 'Francesco Doffo',  'francesco@um.org',NULL, 'confirmado');
GO

-- ================================================================
--  CONSULTAS DE PRÁCTICA
-- ================================================================

-- 1. Ver todas las ediciones con su cantidad de participantes
SELECT year, theme, location, total_participants, status
FROM Editions
ORDER BY year;

-- 2. Cuántos voluntarios del staff hay por área
SELECT a.name AS area, COUNT(s.staff_id) AS total_miembros
FROM Areas a
LEFT JOIN StaffMembers s ON a.area_id = s.area_id AND s.active = 1
GROUP BY a.name
ORDER BY total_miembros DESC;

-- 3. Inscripciones 2026 agrupadas por tipo y estado
SELECT type, status, COUNT(*) AS cantidad
FROM Inscriptions
WHERE edition_id = 12
GROUP BY type, status
ORDER BY type, status;

-- 4. Delegados con su colegio y órgano asignado
SELECT i.name AS delegado, s.name AS colegio, o.name AS organo, i.country AS pais
FROM Inscriptions i
LEFT JOIN Schools s ON i.school_id = s.school_id
LEFT JOIN Organs o ON i.organ_id = o.organ_id
WHERE i.type = 'delegado' AND i.edition_id = 12
ORDER BY o.name, i.name;

-- 5. Órganos ordenados por dificultad y cupos
SELECT name, difficulty, max_delegates, topic
FROM Organs
ORDER BY
    CASE difficulty WHEN 'avanzado' THEN 1 WHEN 'intermedio' THEN 2 ELSE 3 END,
    max_delegates DESC;

-- 6. Colegios que más ediciones participaron
SELECT TOP 5 name, type, city, editions_participated
FROM Schools
ORDER BY editions_participated DESC;

-- 7. Cronograma completo del modelo 2026
SELECT day, time, activity, location, type
FROM ScheduleEvents
WHERE edition_id = 12
ORDER BY sort_date, time;

-- 8. Cuántos voluntarios por edición (histórico)
SELECT e.year, COUNT(lv.volunteer_id) AS voluntarios
FROM Editions e
LEFT JOIN LegacyVolunteers lv ON e.edition_id = lv.edition_id
GROUP BY e.year
ORDER BY e.year;

-- 9. Staff activo con su área
SELECT s.name, s.role, a.name AS area, s.joined_year
FROM StaffMembers s
JOIN Areas a ON s.area_id = a.area_id
WHERE s.active = 1
ORDER BY a.name, s.[order];

-- 10. Delegados confirmados por órgano
SELECT o.name AS organo, COUNT(i.inscription_id) AS delegados_confirmados
FROM Organs o
LEFT JOIN Inscriptions i ON o.organ_id = i.organ_id
    AND i.type = 'delegado' AND i.status = 'confirmado'
GROUP BY o.name
ORDER BY delegados_confirmados DESC;
