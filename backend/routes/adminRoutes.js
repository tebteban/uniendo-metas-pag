const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminOnlyMiddleware } = require('../middlewares/authMiddleware');
const adminUsersController = require('../controllers/adminUsersController');

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
router.post('/equipodevoluntarios/toggle-group', authMiddleware, adminAuthoritiesController.toggleGroup);
router.post('/equipodevoluntarios/publicar-todos', authMiddleware, adminAuthoritiesController.publishAll);
router.post('/equipodevoluntarios/vaciar', authMiddleware, adminAuthoritiesController.deleteAll);
router.post('/equipodevoluntarios/importar', authMiddleware, excelUpload.single('file'), adminAuthoritiesController.importExcel);

// Inscriptions Routes
const adminInscriptionsController = require('../controllers/adminInscriptionsController');

router.get('/inscripciones/:type', authMiddleware, adminInscriptionsController.index);
router.post('/inscripciones/:type/upload', authMiddleware, excelUpload.single('file'), adminInscriptionsController.upload);
router.post('/inscripciones/:type/upload-manual', authMiddleware, adminInscriptionsController.uploadManual);
router.post('/inscripciones/editar/:id', authMiddleware, adminInscriptionsController.edit);
router.post('/inscripciones/:type/eliminar-todo', authMiddleware, adminInscriptionsController.destroyAll);
router.get('/inscripciones/eliminar/:id', authMiddleware, adminInscriptionsController.destroy);

// Example Excel Downloads
const adminExamplesController = require('../controllers/adminExamplesController');
router.get('/ejemplos/equipo', authMiddleware, adminExamplesController.teamExample);
router.get('/ejemplos/delegado', authMiddleware, adminExamplesController.delegadosExample);
router.get('/ejemplos/autoridad', authMiddleware, adminExamplesController.autoridadesExample);
router.get('/ejemplos/escuela', authMiddleware, adminExamplesController.escuelasExample);
router.get('/ejemplos/voluntario', authMiddleware, adminExamplesController.voluntariosExample);

// Gestión de Cuentas (solo para admin)
router.get('/cuentas', authMiddleware, adminOnlyMiddleware, adminUsersController.index);
router.get('/cuentas/crear', authMiddleware, adminOnlyMiddleware, adminUsersController.create);
router.post('/cuentas/store', authMiddleware, adminOnlyMiddleware, adminUsersController.store);
router.get('/cuentas/editar/:id', authMiddleware, adminOnlyMiddleware, adminUsersController.edit);
router.post('/cuentas/update/:id', authMiddleware, adminOnlyMiddleware, adminUsersController.update);
router.post('/cuentas/eliminar/:id', authMiddleware, adminOnlyMiddleware, adminUsersController.destroy);

// Pages Management (CMS por página)
const adminPagesController = require('../controllers/adminPagesController');
router.get('/paginas/:page', authMiddleware, adminPagesController.show);
router.post('/paginas/:page', authMiddleware, siteUpload.any(), adminPagesController.update);

// Rutas CRUD para Cronograma (administradas dentro del CMS)
router.post('/cronograma/store', authMiddleware, adminPagesController.storeCronograma);
router.post('/cronograma/update/:id', authMiddleware, adminPagesController.updateCronograma);
router.get('/cronograma/editar/:id', authMiddleware, adminPagesController.editCronograma);
router.get('/cronograma/eliminar/:id', authMiddleware, adminPagesController.destroyCronograma);

// Rutas CRUD para Organos (administradas dentro del CMS)
router.post('/organos/store', authMiddleware, siteUpload.any(), adminPagesController.storeOrgano);
router.post('/organos/update/:id', authMiddleware, siteUpload.any(), adminPagesController.updateOrgano);
router.get('/organos/editar/:id', authMiddleware, adminPagesController.editOrgano);
router.get('/organos/eliminar/:id', authMiddleware, adminPagesController.destroyOrgano);

// ─── Certificados ────────────────────────────────────────────────────────────

const adminCertificatesController = require('../controllers/adminCertificatesController');
router.get('/certificados',                          authMiddleware, adminCertificatesController.index);
router.get('/certificados/lista/:tipo',              authMiddleware, adminCertificatesController.lista);
router.get('/certificados/preview/:id',              authMiddleware, adminCertificatesController.preview);
router.get('/certificados/descargar/:id',            authMiddleware, adminCertificatesController.descargar);
router.get('/certificados/descargar-todos/:tipo',    authMiddleware, adminCertificatesController.descargarTodos);
router.post('/certificados/mail/:id',                authMiddleware, adminCertificatesController.enviarMail);
router.post('/certificados/mail-todos/:tipo',        authMiddleware, adminCertificatesController.enviarMailTodos);
router.post('/certificados/subtitulo',               authMiddleware, adminCertificatesController.guardarSubtitulo);
router.post('/certificados/imagen-base',             authMiddleware, siteUpload.any(), adminCertificatesController.guardarImagenBase);

module.exports = router;


