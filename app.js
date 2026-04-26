/**
 * UNIENDO METAS - Panel de Administración
 * 
 * Desarrollado por: Ezequiel "Talleres" Rossetti y Esteban Cejas.
 * Fecha: Marzo 2026
 * Stack: Node.js + Express + EJS + PostgreSQL (Railway)
 * 
 * "El código que hizo posible que miles de jóvenes debatan el futuro"
 * 
 * v1.1.0 — Fix: las fotos de Cloudinary ya no se borran al hacer deploy.
 */

require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// --- MIDDLEWARE ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Trust proxy solo en producción (Railway usa HTTPS con proxy)
if (isProduction) {
    app.set('trust proxy', 1);
}

// Configuración de Sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'uniendo-metas-sde-secret-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: isProduction, // true en Railway (HTTPS), false en localhost (HTTP)
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// --- MOTOR DE PLANTILLAS ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

const globalSettingsMiddleware = require('./src/middlewares/globalSettingsMiddleware');
app.use(globalSettingsMiddleware);

// --- RUTAS ---
const mainRoutes = require('./src/routes/mainRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

app.use('/admin', adminRoutes);
app.use('/', mainRoutes);

// --- ERROR 500 ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Error del Servidor' });
});

// --- BASE DE DATOS ---
const sequelize = require('./src/database/config');
const User = require('./src/database/models/User');
const Setting = require('./src/database/models/Setting');
const Organ = require('./src/database/models/Organ');
const Schedule = require('./src/database/models/Schedule');
const Volunteer = require('./src/database/models/Volunteer');
const Authority = require('./src/database/models/Authority');
const Inscription = require('./src/database/models/Inscription');

async function initializeDatabase() {
    try {
        await sequelize.sync();
        console.log('✅ Base de datos sincronizada');

        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminExists = await User.findOne({ where: { username: adminUsername } });
        if (!adminExists) {
            await User.create({
                username: adminUsername,
                password: process.env.ADMIN_PASSWORD || 'admin123',
                role: 'admin'
            });
            console.log(`✅ Usuario admin creado: ${adminUsername}`);
        }
    } catch (error) {
        console.error('❌ Error inicializando base de datos:', error);
    }
}

initializeDatabase();

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🚀 Presiona Ctrl + C para detenerlo`);
});

module.exports = app;
