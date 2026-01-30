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

// Volunteers CRUD

// Schedule CRUD
const adminScheduleController = require('../controllers/adminScheduleController');
router.get('/cronograma', authMiddleware, adminScheduleController.index);
router.get('/cronograma/crear', authMiddleware, adminScheduleController.create);
router.post('/cronograma/store', authMiddleware, adminScheduleController.store);
router.get('/cronograma/editar/:id', authMiddleware, adminScheduleController.edit);
router.post('/cronograma/update/:id', authMiddleware, adminScheduleController.update);
router.get('/cronograma/eliminar/:id', authMiddleware, adminScheduleController.destroy);

// Organs CRUD (Mainly List & Edit)
const adminOrgansController = require('../controllers/adminOrgansController');
const pdfUpload = require('../middlewares/publicFileMiddleware');

router.get('/organos', authMiddleware, adminOrgansController.index);
router.get('/organos/crear', authMiddleware, adminOrgansController.create);
router.post('/organos/store', authMiddleware, pdfUpload.single('reglamento'), adminOrgansController.store);
router.get('/organos/editar/:id', authMiddleware, adminOrgansController.edit);
router.post('/organos/update/:id', authMiddleware, pdfUpload.single('reglamento'), adminOrgansController.update);

// Authorities CRUD
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
// Use the same upload middleware, it's fine for now or we create a specific one if needed.
// However, the existing uploadMiddleware filters for images. We need a new one for xlsx/csv.
// I'll skip middleware middleware usage here and handle multer inside the controller or create a valid one.
// Let's create a generic upload middleware that accepts documents or specifically spreadsheets.

// actually, let's just inline a simple multer config for this route or assume we can reuse/modify.
// The user showed me uploadMiddleware.js and it strictly filters images.
// I should create a new middleware for documents.

const docUpload = require('../middlewares/documentUploadMiddleware');

router.get('/inscripciones/:type', authMiddleware, adminInscriptionsController.index);
router.post('/inscripciones/:type/upload', authMiddleware, docUpload.single('file'), adminInscriptionsController.upload);
router.post('/inscripciones/:type/eliminar-todo', authMiddleware, adminInscriptionsController.destroyAll);
router.get('/inscripciones/eliminar/:id', authMiddleware, adminInscriptionsController.destroy);

module.exports = router;
