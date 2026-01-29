// This script initializes the database and seeds it with data from JSON files and the legacy years array
const sequelize = require('./config');
const Volunteer = require('./models/Volunteer');
const Organ = require('./models/Organ');
const Schedule = require('./models/Schedule');
const User = require('./models/User');
const fs = require('fs');
const path = require('path');

// Legacy Years Data (The "Troublemaker" List) - Cleaned and formatted
const legacyYears = [
    { year: 2025, names: ['Sol Basualdo', 'Leandro Segura', 'Salvador Navarrete', 'Mariana Carreras', 'Lautaro Vera', 'Micaela Ledesma', 'Ayelen Banegas', 'Florencia Juarez', 'Morena Paz', 'Ana V. Quiroga', 'Aldana Lopez', 'Karim Jorge', 'Martina Basualdo', 'Lourdes Maguicha', 'Silvina Chaparro', 'Ezequiel Rossetti', 'Mariana Maguicha', 'Rodrigo Montenegro', 'Martin Veliz', 'Yana Garcia', 'Sofia Beltran', 'Francesco Doffo', 'Kadir Catan', 'Joaquin Maguna', 'Ibrahim Franjieh', 'Camila Diaz', 'Roman Reinoso', 'Maite Queirolo', 'Martina Salas', 'Guillermo Alvarez', 'Constanza Carbajal', 'Josefina Jorge', 'Julian Avila', 'Lourdes Abdala', 'Marianella Fernandez', 'Morena Ruiz', 'Jeremias Cabrera', 'Lautaro Marottoli', 'Valentina Campagna', 'Denis Cardenas', 'Federico Chaparro', 'Leonel Vasquez', 'Joaquin Rivas', 'Mercedes Leoni', 'Esteban Cejas', 'Luciana Ledesma', 'Marco Nofal'] },
    { year: 2024, names: ['Juan Pérez', 'María González', 'Lucas Díaz', 'Sofía Rodriguez', 'Carlos Gomez', 'Ana López', 'Pedro Ruiz', 'Lucía Fernández', 'Miguel Torres', 'Julieta Paz', 'Roberto Carlos', 'Lionel Messi'] },
    { year: 2023, names: ['Sofía Martínez', 'Pedro Ruiz', 'Ana López', 'Carlos Gomez', 'Julian Alvarez', 'Enzo Fernandez'] },
    { year: 2022, names: ['Carlos Sánchez', 'Lucía Fernández', 'Miguel Torres', 'Julieta Paz'] },
    { year: 2021, names: ['Pandemia Hero', 'Virtual Staff', 'Zoom Master', 'Meet Expert'] },
    { year: 2020, names: ['Edición Virtual', 'Staff Resiliente', 'Equipo Técnico'] },
    { year: 2019, names: ['Nombre Apellido', 'Nombre Apellido', 'Nombre Apellido', 'Nombre Apellido'] },
    { year: 2018, names: ['Nombre Apellido', 'Nombre Apellido', 'Nombre Apellido'] },
    { year: 2017, names: ['Nombre Apellido', 'Nombre Apellido', 'Nombre Apellido'] },
    { year: 2016, names: ['Nombre Apellido', 'Nombre Apellido'] },
    { year: 2015, names: ['Fundadores', 'Primer Staff', 'Pioneros'] }
];

async function seedDatabase() {
    try {
        await sequelize.sync({ force: true }); // WARNING: This drops tables!
        console.log('Database synced. Seeding data...');

        // 1. Seed Legacy Volunteers
        for (const data of legacyYears) {
            for (const name of data.names) {
                await Volunteer.create({
                    name: name,
                    year: data.year,
                    category: 'legacy_year',
                    role: 'Voluntario'
                });
            }
        }
        console.log('Legacy volunteers seeded.');

        // 2. Seed Organs
        const organosPath = path.resolve(__dirname, '../data/organos.json');
        if (fs.existsSync(organosPath)) {
            const organosData = JSON.parse(fs.readFileSync(organosPath, 'utf8'));
            for (const org of organosData) {
                await Organ.create({
                    name: org.nombre,
                    description: org.descripcion,
                    color: org.color,
                    topic: org.topico,
                    link_reglamento: org.link_reglamento
                });
            }
            console.log('Organs seeded.');
        }

        // 3. Seed Schedule
        const cronoPath = path.resolve(__dirname, '../data/cronograma.json');
        if (fs.existsSync(cronoPath)) {
            const cronoData = JSON.parse(fs.readFileSync(cronoPath, 'utf8'));
            for (const dayData of cronoData) {
                for (const act of dayData.actividades) {
                    // Extract time from location if present, e.g., "Lugar (08:30 hs)"
                    let time = "A confirmar";
                    let location = act.lugar;
                    const timeMatch = act.lugar.match(/\((.*?)\)/);
                    if (timeMatch) {
                        time = timeMatch[1];
                        location = act.lugar.replace(/\s*\(.*?\)/, '').trim();
                    }

                    await Schedule.create({
                        day: dayData.dia,
                        date: act.fecha,
                        time: time,
                        activity: act.titulo,
                        location: location,
                        type: act.tipo
                    });
                }
            }
            console.log('Schedule seeded.');
        }

        // 4. Create Admin User
        await User.create({
            username: 'admin',
            password: 'adminpassword123', // Change this in production!
            role: 'admin'
        });
        console.log('Admin user created.');

        console.log('Database initialization complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
