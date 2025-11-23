const express = require('express');
const router = express.Router();

// Importamos el controlador (que ya tiene la lógica de los órganos)
const mainController = require('../controllers/mainController');

// Definimos la ruta principal (Home)
// Cuando el usuario entra a '/', ejecutamos el método 'index' del controlador
router.get('/', mainController.index);

module.exports = router;