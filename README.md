# 🇺🇳 Uniendo Metas Santiago del Estero - Sitio Web Oficial

![Estado del Proyecto](https://img.shields.io/badge/Estado-En_Desarrollo-green?style=for-the-badge)
![Versión](https://img.shields.io/badge/Versión-XI_Edición-blue?style=for-the-badge)

Plataforma web oficial para la **XI Edición del Modelo de Naciones Unidas "Uniendo Metas"** en Santiago del Estero, un programa de **Asociación Conciencia**. 

Este proyecto sirve como el centro de información, inscripción y gestión de recursos para alumnos, docentes y voluntarios participantes del modelo.

---

## 📸 Galería del Proyecto

### 🖥️ Vista de Escritorio (Inicio)
Una interfaz moderna y limpia diseñada para captar la atención de los jóvenes.
![Vista Escritorio](screenshots/home-desktop.png)
*(Asegúrate de subir una captura de tu Hero Section aquí)*

### 📱 Diseño Responsivo (Móvil)
Adaptado 100% a dispositivos móviles con menú de navegación flotante y optimización táctil.
<p align="center">
  <img src="screenshots/home-mobile.png" alt="Vista Móvil" width="300">
</p>

### ❤️ Sección Voluntarios y Staff
Página dedicada al equipo organizador con muro de honor y organigrama interactivo.
![Sección Voluntarios](screenshots/voluntarios.png)

---

## 🚀 Características Principales

* **Diseño UI/UX Moderno:** Utilizando Tailwind CSS para una estética limpia, profesional y vibrante (colores institucionales).
* **Galerías Interactivas:** Implementación de *Lightbox* personalizado para visualizar fotos de ediciones anteriores con navegación por teclado y botones.
* **Cronograma Dinámico:** Visualización de eventos con scroll horizontal e indicadores de estado.
* **Gestión de Documentos:** Botones de descarga directa para Reglamentos, Dinámicas y Tópicos organizados por órgano.
* **Sección de Voluntariado:** Organigrama jerárquico visual, muro de legado histórico y carrusel infinito de fotos.
* **Inscripción:** Integración con modales para redirigir a formularios de Google Forms.

---

## 🛠️ Tecnologías Utilizadas

El proyecto está construido utilizando tecnologías web robustas y modernas:

* **Backend:** [Node.js](https://nodejs.org/) con [Express.js](https://expressjs.com/).
* **Motor de Plantillas:** [EJS](https://ejs.co/) (Embedded JavaScript) para renderizado dinámico de vistas y componentes reutilizables (partials).
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (vía CDN para desarrollo rápido) para el diseño responsivo y utilitario.
* **Scripts:** JavaScript (Vanilla) para la lógica del frontend (menús, modales, galerías).
* **Animaciones:** [AOS](https://michalsnik.github.io/aos/) (Animate On Scroll) para efectos de entrada.

---

## 📂 Estructura del Proyecto

```text
/
├── public/
│   ├── css/            # Estilos personalizados
│   ├── img/            # Imágenes (Logos, Equipo, Fondos)
│   │   ├── Voluntarios/
│   │   └── logos/
│   └── documents/      # PDFs (Reglamentos, Tópicos)
├── src/
│   ├── routes/         # Rutas de Express (mainRoutes.js)
│   ├── controllers/    # Lógica del controlador (mainController.js)
│   └── views/          # Plantillas EJS
│       ├── index.ejs   # Página Principal
│       ├── voluntarios.ejs
│       └── partials/   # Componentes (navbar, footer, head)
├── app.js              # Punto de entrada de la aplicación
└── package.json        # Dependencias
