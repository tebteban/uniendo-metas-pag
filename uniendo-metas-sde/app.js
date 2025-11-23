const express = require('express');
const path = require('path');
const app = express();

// --- CONFIGURACIÓN ---
// 1. Definimos el puerto (usará el 3000 por defecto)
const PORT = process.env.PORT || 3000;

// 2. Configuración del Motor de Plantillas (EJS)
// Le decimos a Express dónde están las vistas y qué motor usar
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// 3. Archivos Estáticos
// Hacemos pública la carpeta 'public' para que el navegador acceda al CSS y las imágenes
app.use(express.static(path.join(__dirname, 'public')));

// --- RUTAS ---
// Importamos el archivo de rutas principal
const mainRoutes = require('./src/routes/mainRoutes');

// Usamos las rutas (todo lo que llegue a la raíz '/' irá al manejador de rutas)
app.use('/', mainRoutes);

// --- SERVIDOR ---
// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🚀 Presiona Ctrl + C para detenerlo`);
});