# Despliegue gratuito en Render + Neon + Cloudinary

## Estado

El repositorio incluye Dockerfile (Node 22 y Chromium), .dockerignore y un
Blueprint render.yaml con plan free. El arranque espera a la base de datos y
rechaza variables de producción vacías. No se incluyen claves ni bases locales.
La imagen todavía debe compilarse y verificarse en Render.

## Pasos

1. Crear una cuenta y un proyecto Free en https://console.neon.tech.
   Elegir una región cercana a la del servicio Render. Desde Connect, copiar
   la cadena PostgreSQL completa para usarla como DATABASE_URL en Render.
   No pegarla en mensajes, commits ni documentación.
2. Subir los cambios de este repositorio a GitHub, manteniendo el repositorio
   privado si corresponde y sin incluir .env ni bases SQLite.
3. En https://dashboard.render.com elegir New > Blueprint y conectar el
   repositorio y la rama que contienen render.yaml. Revisar que el servicio
   use el plan Free antes de crearlo.
4. Completar DATABASE_URL, ADMIN_USERNAME, ADMIN_PASSWORD y las tres variables
   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET.
   Elegir una contraseña nueva y segura para el administrador.
   Render genera SESSION_SECRET automáticamente. NODE_ENV ya es production.
5. Crear el servicio y revisar los logs de compilación y arranque. El Dockerfile
   define el comando de inicio; no hace falta completar un build/start manual.
6. Abrir la URL onrender.com y verificar /healthz, páginas públicas, acceso a
   /admin/login, una carga de imagen y la descarga de un certificado de prueba.
   Repetir la consulta del contenido tras un redespliegue para comprobar persistencia.

## Datos existentes

Una base nueva empieza vacía: el inicio crea tablas y el usuario administrador,
pero no migra inscripciones ni configuración de SQLite o de otro PostgreSQL.
Si hay información que conservar, respaldarla y migrarla antes de anunciar la URL.
Las imágenes ya versionadas se incluyen en la imagen Docker; las nuevas cargas
en producción se guardan en Cloudinary.

## Límites conocidos

- Render Free se duerme tras 15 minutos sin tráfico. Su disco no es persistente.
- Las sesiones actuales están en memoria: al reiniciar hay que iniciar sesión nuevamente.
- Render Free bloquea SMTP (25, 465, 587). El envío actual por Gmail no funciona
  allí; requiere una integración de correo por HTTPS o un hosting que permita SMTP.
  La descarga de PDF no depende del correo.
- Chromium comparte 512 MB con Node. Probar certificados individuales y lotes
  antes de usarlo durante el evento; no se ha validado su capacidad bajo carga.
- La instalación usa --legacy-peer-deps por el peer antiguo de
  multer-storage-cloudinary con Cloudinary v2. Probar las cargas en el despliegue.
- No añadir servicios pagos ni cambiar el plan para resolver errores sin revisar el costo.

Referencias: https://render.com/docs/free y https://render.com/docs/blueprint-spec.
