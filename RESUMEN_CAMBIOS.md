# Resumen de Cambios - Proyecto Uniendo Metas

Este documento resume todas las modificaciones, implementaciones y correcciones realizadas en el repositorio desde que se comenzó a trabajar en él.

## 1. Migración y Base de Datos (Backend)
- **Implementación de SQLite y Sequelize**: Se migró el sistema de almacenamiento de datos de archivos JSON estáticos a una base de datos relacional SQLite utilizando Sequelize como ORM.
- **Modelos de Datos**: Se definieron y sincronizaron los siguientes modelos:
  - `User`: Para usuarios del panel de administración.
  - `Volunteer`: Para la gestión de voluntarios.
  - `Authority`: Para autoridades y órganos.
  - `Schedule`: Para los eventos del cronograma.
  - `Inscription`: Para almacenar las inscripciones importadas (Google Forms).

## 2. Panel de Administración (Dashboard)
Se construyó un panel de administración completo con las siguientes características:

### Autenticación y Seguridad
- **Sistema de Login**: Implementado con estrategias de sesión (`express-session`).
- **Middleware de Protección**: `authMiddleware` protege todas las rutas `/admin/*`.
- **Hashing de Contraseñas**: Uso de `bcrypt` para seguridad en las contraseñas de usuarios.

### Módulos de Gestión (CRUD)
Se crearon interfaces para Crear, Leer, Actualizar y Eliminar registros en:
- **Voluntarios**: Gestión completa con validaciones.
- **Cronograma**: Administración de horarios y eventos.
- **Autoridades y Órganos**: Gestión de autoridades del evento.
- **Equipo**: Administración de usuarios con acceso al panel.

### Nueva Funcionalidad: Gestión de Inscripciones
Sistema para centralizar datos de Google Forms.
- **Importación Masiva**: Carga de archivos Excel (`.xlsx`) y CSV.
- **Visualización**: Listados con buscador integrado y paginación implícita.
- **Detalles**: Modal para ver la data cruda (JSON) de cada inscripción.
- **Eliminación**: Opciones para eliminar registros individuales o borrado masivo por tipo.

### Interfaz de Usuario (UI/UX)
- **Diseño**: Implementación de Tailwind CSS con un diseño limpio y profesional (fuente Montserrat).
- **Sidebar Dinámico**: Navegación lateral que resalta la sección activa.
- **Manejo de Errores**: Mensajes claros y redirecciones seguras.

## 3. Correcciones Técnicas Importantes
- **Solución a `EADDRINUSE`**: Se implementó una lógica robusta para reiniciar el servidor, asegurando que los procesos de Node.js anteriores se terminen correctamente antes de iniciar uno nuevo.
- **Renderizado EJS**:
  - Se reescribió `voluntarios.ejs` y `inscriptions/index.ejs` para eliminar errores de sintaxis en los bucles `for`.
  - Solución a `ReferenceError` pasando correctamente el objeto `user` a las vistas para la barra de navegación.
  - Manejo seguro de datos JSON en el frontend usando atributos `data-json` y textareas ocultos para evitar conflictos de comillas.

## 4. Dependencias Agregadas
- `sequelize`, `sqlite3`: Base de datos.
- `bcrypt`: Seguridad.
- `express-session`: Manejo de sesiones.
- `multer`: Subida de archivos.
- `xlsx`: Procesamiento de hojas de cálculo.

## Estado Actual
El sistema es completamente funcional, permite la administración total del contenido del sitio y la gestión de datos de inscripciones de manera local y persistente.
