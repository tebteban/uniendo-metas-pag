const express = require('express');
const router = express.Router();

// Importamos el controlador
const mainController = require('../controllers/mainController');

// Ruta Principal
router.get('/', mainController.index);

// Ruta Autoridades
router.get('/autoridades', (req, res) => {
    res.render('autoridades', {
        title: 'Autoridades | Uniendo Metas'
    });
});

// Ruta Voluntarios
router.get('/voluntarios', mainController.voluntarios);

// Ruta Órganos
router.get('/organos', mainController.organos);

// Ruta Participación
router.get('/participacion', mainController.participacion);

// Ruta Cronograma
router.get('/cronograma', mainController.cronograma);

// --- MANEJO DE ERROR 404 ---
// ¡IMPORTANTE! Esto debe ir SIEMPRE al final de todas las rutas.
// Si ninguna de las de arriba coincide, entra aquí.
// En lugar de router.get('*', ...) usa esto:
router.get(/(.*)/, (req, res) => {
    res.status(404).render('404', {
        title: 'Página no encontrada | Uniendo Metas'
    });
});

module.exports = router;