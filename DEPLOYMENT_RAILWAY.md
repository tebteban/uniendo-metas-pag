# Guia de Deploy en Railway

Cada vez que necesites redesplegar o configurar el proyecto desde cero, segui estos pasos.

---

## 1. Subir el codigo a GitHub

```bash
git add .
git commit -m "descripcion del cambio"
git push
```

Railway hace auto-deploy cada vez que haces push a main. Si solo queres redesplegar sin cambios:
- Railway dashboard -> tu servicio -> Deployments -> Redeploy

---

## 2. Crear proyecto en Railway (solo la primera vez)

1. Ir a railway.app
2. New Project -> Deploy from GitHub repo
3. Seleccionar el repo `uniendo-metas`
4. Railway detecta Node.js automaticamente

---

## 3. Agregar PostgreSQL (solo la primera vez)

1. En el proyecto -> "+ New" -> Database -> PostgreSQL
2. Railway crea la DB y configura DATABASE_URL automaticamente

---

## 4. Configurar variables de entorno

En Railway -> tu servicio -> Variables -> Raw Editor, pegar:

```
NODE_ENV=production
SESSION_SECRET=          <- poner el valor real del .env local
ADMIN_USERNAME=          <- poner el valor real del .env local
ADMIN_PASSWORD=          <- poner el valor real del .env local
CLOUDINARY_CLOUD_NAME=   <- poner el valor real del .env local
CLOUDINARY_API_KEY=      <- poner el valor real del .env local
CLOUDINARY_API_SECRET=   <- poner el valor real del .env local
MAIL_USER=               <- poner el valor real del .env local
MAIL_PASS=               <- poner el valor real del .env local
```

NOTA: DATABASE_URL la pone Railway automaticamente, no hace falta agregarla.
Los valores reales de cada variable estan en el archivo .env de tu maquina local.

---

## 5. Verificar el deploy

- URL del sitio: Railway -> Settings -> Domains
- Panel admin: tu-url.railway.app/admin
- Logs en tiempo real: Railway -> Deployments -> deployment activo -> View Logs

---

## 6. Estructura del proyecto

```
uniendo-metas/
|-- app.js              <- punto de entrada, NO mover
|-- package.json
|-- .env                <- variables locales, NO subir a git
|-- backend/
|   |-- config/         <- cloudinary.js
|   |-- controllers/    <- logica de negocio
|   |-- database/       <- modelos y config de Sequelize
|   |-- middlewares/    <- auth, uploads, settings globales
|   \-- routes/         <- adminRoutes.js, mainRoutes.js
\-- frontend/
    |-- public/         <- css, img, documents (archivos estaticos)
    \-- views/          <- plantillas EJS (admin/ y vistas publicas)
```

---

## 7. Troubleshooting

**El servidor no levanta:**
- Revisar logs en Railway -> Deployments -> View Logs
- Correr `node app.js` local para ver el error exacto

**Error de base de datos:**
- Verificar que el servicio PostgreSQL este activo en Railway
- Verificar que DATABASE_URL este en las variables

**Las imagenes no se ven:**
- Verificar que NODE_ENV=production este configurado en Railway
- Verificar las variables de Cloudinary

**Cloudinary no sube archivos:**
- Verificar CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- Los valores correctos estan en tu .env local

---

## 8. Comandos utiles

```bash
# Correr local
npm start

# Ver si hay vulnerabilidades en dependencias
npm audit

# Actualizar dependencias con cuidado
npm update
```
