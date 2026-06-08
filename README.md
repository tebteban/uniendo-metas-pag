# 🌍 Uniendo Metas Santiago del Estero — Sitio Web Oficial

> Modelo de Naciones Unidas · Asociación Conciencia · Santiago del Estero

---

## 📖 ¿Qué es Uniendo Metas?

**Uniendo Metas** es un Modelo de Naciones Unidas (MUN) organizado en Santiago del Estero en el marco del programa nacional de [Asociación Conciencia](https://www.conciencia.org).

Los participantes representan países, debaten resoluciones y trabajan en conjunto para abordar problemáticas globales reales. El programa desarrolla habilidades de debate, liderazgo, oratoria y ciudadanía global en jóvenes estudiantes de toda la provincia.

Este sitio es la plataforma oficial del evento: gestiona inscripciones, publica información institucional, documentos, cronograma, equipo de voluntarios y certificados.

---

## 🛠️ Tecnologías

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logo=ejs&logoColor=black)

### Base de Datos
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white)

### Almacenamiento & Estilos
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

### Deploy & Tools
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat&logo=railway&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)

---

## 📁 Estructura del Proyecto

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
    |   |   |-- site/         # Imagenes subidas dinamicamente
    |   |   \-- Voluntarios/  # Fotos de voluntarios
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

## 🚀 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

Corre en `http://localhost:3000`. Usa SQLite automáticamente — no requiere PostgreSQL local ni configuración extra.

---

## ☁️ Deploy

Ver `DEPLOYMENT_RAILWAY.md` para instrucciones completas paso a paso.

---

## ✅ Features

- ✅ Panel de administración completo (inscripciones, voluntarios, settings, fotos)
- ✅ Generación de certificados con Puppeteer
- ✅ Importación de inscripciones desde Excel
- ✅ Gestión de imágenes con Cloudinary
- ✅ Configuración dinámica del sitio desde el panel admin
- ✅ Autenticación con sesiones
- ✅ Compatible con SQLite (dev) y PostgreSQL (producción)
- ✅ Estructura separada backend / frontend

---

## 👥 Equipo

Desarrollado por Ezequiel Rossetti Carrasco y Esteban Cejas.

Programa educativo de [Asociación Conciencia](https://www.conciencia.org).

---

## ⚠️ Licencia y Uso

**© Uniendo Metas Santiago del Estero / Asociación Conciencia. Todos los derechos reservados.**

Este proyecto es de uso exclusivo del programa Uniendo Metas Santiago del Estero. Queda **estrictamente prohibido** copiar, reproducir, distribuir, modificar o reutilizar este código, total o parcialmente, sin autorización expresa por escrito de los responsables del proyecto.

Este repositorio es privado y su acceso no implica ningún tipo de licencia de uso.

---

**Última actualización:** Junio 2026
