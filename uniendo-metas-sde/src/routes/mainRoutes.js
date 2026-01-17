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
router.get('/voluntarios', (req, res) => {
    res.render('voluntarios', { 
        title: 'Voluntariado | Uniendo Metas Santiago',
        path: '/voluntarios' 
    });
});

module.exports = router;