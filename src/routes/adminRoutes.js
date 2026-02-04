const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/admin/login');
};

// Public Admin Routes
router.get('/login', adminController.login);
router.post('/login', adminController.processLogin);
router.get('/logout', adminController.logout);

// Protected Admin Routes
router.get('/', authMiddleware, (req, res) => res.redirect('/admin/dashboard'));
router.get('/dashboard', authMiddleware, adminController.dashboard);

// General Settings
const adminSettingsController = require('../controllers/adminSettingsController');
const siteUpload = require('../middlewares/siteUploadMiddleware');
router.get('/configuracion', authMiddleware, adminSettingsController.index);
router.post('/configuracion', authMiddleware, siteUpload.any(), adminSettingsController.update);

// Photos Management
const adminPhotosController = require('../controllers/adminPhotosController');
router.get('/fotos', authMiddleware, adminPhotosController.index);
router.post('/fotos/update/:key', authMiddleware, siteUpload.any(), adminPhotosController.update);
router.post('/fotos/add', authMiddleware, adminPhotosController.addSlot);
router.get('/fotos/eliminar/:key', authMiddleware, adminPhotosController.delete);

// Texts Management
const adminTextsController = require('../controllers/adminTextsController');
router.get('/textos', authMiddleware, adminTextsController.index);
router.post('/textos', authMiddleware, adminTextsController.update);

// Schedule CRUD
const adminScheduleController = require('../controllers/adminScheduleController');
router.get('/cronograma', authMiddleware, adminScheduleController.index);
router.get('/cronograma/crear', authMiddleware, adminScheduleController.create);
router.post('/cronograma/store', authMiddleware, adminScheduleController.store);
router.get('/cronograma/editar/:id', authMiddleware, adminScheduleController.edit);
router.post('/cronograma/update/:id', authMiddleware, adminScheduleController.update);
router.get('/cronograma/eliminar/:id', authMiddleware, adminScheduleController.destroy);

// --- AQUÍ ESTÁ EL CAMBIO IMPORTANTE ---
// Organs CRUD
const adminOrgansController = require('../controllers/adminOrgansController');
const pdfUpload = require('../middlewares/publicFileMiddleware');

router.get('/organos', authMiddleware, adminOrgansController.index);
router.get('/organos/crear', authMiddleware, adminOrgansController.create);

// Cambiado .single('reglamento') por .fields([...])
router.post('/organos/store', authMiddleware, pdfUpload.fields([
    { name: 'reglamento', maxCount: 1 },
    { name: 'archivo_dinamicas', maxCount: 1 },
    { name: 'archivo_topico', maxCount: 1 }
]), adminOrgansController.store);

router.get('/organos/editar/:id', authMiddleware, adminOrgansController.edit);

// Cambiado .single('reglamento') por .fields([...])
router.post('/organos/update/:id', authMiddleware, pdfUpload.fields([
    { name: 'reglamento', maxCount: 1 },
    { name: 'archivo_dinamicas', maxCount: 1 },
    { name: 'archivo_topico', maxCount: 1 }
]), adminOrgansController.update);
// --------------------------------------

// Authorities CRUD
const adminAuthoritiesController = require('../controllers/adminAuthoritiesController');
const upload = require('../middlewares/uploadMiddleware');
const excelUpload = require('../middlewares/excelUploadMiddleware');

router.get('/equipodevoluntarios', authMiddleware, adminAuthoritiesController.index);
router.get('/equipodevoluntarios/crear', authMiddleware, adminAuthoritiesController.create);
router.post('/equipodevoluntarios/store', authMiddleware, upload.single('image'), adminAuthoritiesController.store);
router.get('/equipodevoluntarios/editar/:id', authMiddleware, adminAuthoritiesController.edit);
router.post('/equipodevoluntarios/update/:id', authMiddleware, upload.single('image'), adminAuthoritiesController.update);
router.get('/equipodevoluntarios/eliminar/:id', authMiddleware, adminAuthoritiesController.destroy);
router.post('/equipodevoluntarios/toggle/:id', authMiddleware, adminAuthoritiesController.toggleStatus);
router.post('/equipodevoluntarios/publicar-todos', authMiddleware, adminAuthoritiesController.publishAll);
router.post('/equipodevoluntarios/vaciar', authMiddleware, adminAuthoritiesController.deleteAll);
router.post('/equipodevoluntarios/importar', authMiddleware, excelUpload.single('file'), adminAuthoritiesController.importExcel);

// Inscriptions Routes
const adminInscriptionsController = require('../controllers/adminInscriptionsController');
const docUpload = require('../middlewares/documentUploadMiddleware');

router.get('/inscripciones/:type', authMiddleware, adminInscriptionsController.index);
router.post('/inscripciones/:type/upload', authMiddleware, docUpload.single('file'), adminInscriptionsController.upload);
router.post('/inscripciones/:type/eliminar-todo', authMiddleware, adminInscriptionsController.destroyAll);
router.get('/inscripciones/eliminar/:id', authMiddleware, adminInscriptionsController.destroy);

module.exports = router;