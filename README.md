# Uniendo Metas Santiago del Estero - Sitio Web Oficial

Plataforma web oficial para el Modelo de Naciones Unidas "Uniendo Metas" en Santiago del Estero,
un programa de Asociacion Conciencia.

---

## Tecnologias

- **Backend:** Node.js + Express.js
- **Motor de Plantillas:** EJS
- **Base de datos:** PostgreSQL (Railway, produccion) / SQLite (desarrollo local)
- **Almacenamiento:** Cloudinary (produccion) / local (desarrollo)
- **Estilos:** Tailwind CSS (CDN)
- **Deploy:** Railway

---

## Estructura del Proyecto

```
uniendo-metas/
|-- app.js                   # Punto de entrada
|-- package.json
|-- .env                     # Variables de entorno (NO subir a git)
|-- DEPLOYMENT_RAILWAY.md    # Guia de deploy paso a paso
|
|-- backend/
|   |-- config/
|   |   \-- cloudinary.js
|   |-- controllers/
|   |   |-- adminAuthoritiesController.js
|   |   |-- adminCertificatesController.js
|   |   |-- adminController.js
|   |   |-- adminExamplesController.js
|   |   |-- adminInscriptionsController.js
|   |   |-- adminPagesController.js
|   |   |-- adminPhotosController.js
|   |   |-- adminSettingsController.js
|   |   |-- adminUsersController.js
|   |   \-- mainController.js
|   |-- database/
|   |   |-- config.js
|   |   \-- models/
|   |       |-- Authority.js
|   |       |-- Inscription.js
|   |       |-- Organ.js
|   |       |-- Schedule.js
|   |       |-- Setting.js
|   |       \-- User.js
|   |-- middlewares/
|   |   |-- authMiddleware.js
|   |   |-- excelUploadMiddleware.js
|   |   |-- globalSettingsMiddleware.js
|   |   |-- publicFileMiddleware.js
|   |   |-- siteUploadMiddleware.js
|   |   \-- uploadMiddleware.js
|   \-- routes/
|       |-- adminRoutes.js
|       \-- mainRoutes.js
|
\-- frontend/
    |-- public/
    |   |-- css/
    |   |-- img/
    |   |   |-- logos/
    |   |   |-- site/         # imagenes subidas dinamicamente
    |   |   \-- Voluntarios/  # fotos de voluntarios
    |   |-- documents/
    |   |   |-- Autorizaciones/
    |   |   |-- Dinamicas/
    |   |   |-- Reglamentos/
    |   |   \-- Topicos/
    |   \-- uploads/
    |       \-- documents/    # PDFs subidos dinamicamente
    \-- views/
        |-- index.ejs
        |-- autoridades.ejs
        |-- cronograma.ejs
        |-- organos.ejs
        |-- participacion.ejs
        |-- voluntarios_new.ejs
        |-- 404.ejs
        |-- 500.ejs
        |-- partials/
        \-- admin/
            |-- dashboard.ejs
            |-- login.ejs
            |-- autoridades/
            |-- certificados/
            |-- inscriptions/
            |-- pages/
            |-- photos/
            |-- settings/
            |-- users/
            \-- voluntarios/
```

---

## Desarrollo Local

```bash
npm install
npm start
```

Corre en http://localhost:3000. Usa SQLite automaticamente, no requiere PostgreSQL local.

---

## Deploy

Ver DEPLOYMENT_RAILWAY.md para instrucciones completas.
