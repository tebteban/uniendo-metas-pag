const xlsx = require('xlsx');

const controller = {
    /**
     * Descarga un Excel de ejemplo para importar el Equipo de Organización
     */
    teamExample: (req, res) => {
        const data = [
            { nombre: 'María García', rol: 'Coordinadora General', grupo: 'Coordinación', descripcion: 'Responsable de la coordinación general del evento.', orden: 1 },
            { nombre: 'Juan Pérez', rol: 'Logística', grupo: 'Logística', descripcion: 'Encargado de la logística del evento.', orden: 2 },
            { nombre: 'Ana López', rol: 'Comunicación', grupo: 'Prensa', descripcion: 'Maneja las redes sociales y comunicados de prensa.', orden: 3 }
        ];

        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Equipo');

        // Set column widths
        ws['!cols'] = [
            { wch: 25 }, // nombre
            { wch: 25 }, // rol
            { wch: 20 }, // grupo
            { wch: 50 }, // descripcion
            { wch: 8 }   // orden
        ];

        const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

        res.setHeader('Content-Disposition', 'attachment; filename="ejemplo-equipo.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    },

    /**
     * Descarga un Excel de ejemplo para importar Inscripciones de Delegados
     */
    delegadosExample: (req, res) => {
        const data = [
            { nombre: 'Carlos Rodríguez', email: 'carlos@ejemplo.com', telefono: '3854123456', organo: 'Consejo de Seguridad', pais: 'Argentina' },
            { nombre: 'Sofía Martínez', email: 'sofia@ejemplo.com', telefono: '3854654321', organo: 'Asamblea General', pais: 'Brasil' },
        ];

        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Delegados');
        ws['!cols'] = [{ wch: 25 }, { wch: 30 }, { wch: 15 }, { wch: 25 }, { wch: 15 }];

        const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename="ejemplo-delegados.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    },

    /**
     * Descarga un Excel de ejemplo para importar Inscripciones de Autoridades
     */
    autoridadesExample: (req, res) => {
        const data = [
            { nombre: 'Laura Sánchez', email: 'laura@ejemplo.com', telefono: '3854111222', rol: 'Presidente', organo: 'Consejo de Seguridad' },
            { nombre: 'Diego Torres', email: 'diego@ejemplo.com', telefono: '3854333444', rol: 'Vicepresidente', organo: 'Asamblea General' },
        ];

        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Autoridades');
        ws['!cols'] = [{ wch: 25 }, { wch: 30 }, { wch: 15 }, { wch: 20 }, { wch: 25 }];

        const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename="ejemplo-autoridades.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    },

    /**
     * Descarga un Excel de ejemplo para importar Inscripciones de Escuelas
     */
    escuelasExample: (req, res) => {
        const data = [
            { nombre: 'Escuela N°1 Rep. Argentina', email: 'escuela1@ejemplo.com', telefono: '3854555666', docente: 'Prof. Ramírez', cantidad_alumnos: 30 },
            { nombre: 'Colegio San Martín', email: 'sanmartin@ejemplo.com', telefono: '3854777888', docente: 'Prof. Juárez', cantidad_alumnos: 25 },
        ];

        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Escuelas');
        ws['!cols'] = [{ wch: 30 }, { wch: 30 }, { wch: 15 }, { wch: 25 }, { wch: 18 }];

        const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename="ejemplo-escuelas.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    },

    /**
     * Descarga un Excel de ejemplo para importar Inscripciones de Voluntarios
     */
    voluntariosExample: (req, res) => {
        const data = [
            { nombre: 'Valentina Gómez', email: 'valentina@ejemplo.com', telefono: '3854100200', area: 'Logística', disponibilidad: 'Todo el día' },
            { nombre: 'Mateo Díaz', email: 'mateo@ejemplo.com', telefono: '3854300400', area: 'Comunicación', disponibilidad: 'Mañana' },
        ];

        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Voluntarios');
        ws['!cols'] = [{ wch: 25 }, { wch: 30 }, { wch: 15 }, { wch: 20 }, { wch: 20 }];

        const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename="ejemplo-voluntarios.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    },
};

module.exports = controller;
