const express = require('express');
const path = require('path');
const session = require('express-session'); // NEW

const app = express();

// --- CONFIGURACIÓN ---
// 1. Definimos el puerto (usará el 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Middleware
// Hacemos pública la carpeta 'public' para que el navegador acceda al CSS y las imágenes
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); // Para procesar datos de formularios
app.use(express.json()); // Para procesar JSON

// Configuración de Sesión
app.use(session({
    secret: 'uniendo-metas-sde-secret-key-2026', // Cambiar esto en producción
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Establecer a true si se usa HTTPS
}));

// 2. Configuración del Motor de Plantillas (EJS)
// Le decimos a Express dónde están las vistas y qué motor usar
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

const globalSettingsMiddleware = require('./src/middlewares/globalSettingsMiddleware');
app.use(globalSettingsMiddleware);

// --- RUTAS ---
// Importamos los archivos de rutas
const mainRoutes = require('./src/routes/mainRoutes');
const adminRoutes = require('./src/routes/adminRoutes'); // Importar rutas de admin

// Usamos las rutas
// IMPORTANTE: Las rutas más específicas deben ir primero
app.use('/admin', adminRoutes); // Rutas de admin primero
app.use('/', mainRoutes); // Rutas principales (con catch-all 404) al final

// Manejador de Error 500 (Debe tener 4 argumentos: err, req, res, next)
app.use((err, req, res, next) => {
    console.error(err.stack); // Esto te muestra el error en tu consola para que lo arregles
    res.status(500).render('500', { title: 'Error del Servidor' });
});

// app.listen(...)

// --- SERVIDOR ---
// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🚀 Presiona Ctrl + C para detenerlo`);
});