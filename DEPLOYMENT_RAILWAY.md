# Guía de Deployment en Railway + Cloudinary

Esta guía te llevará paso a paso para desplegar "Uniendo Metas" en Railway con Cloudinary para almacenamiento de archivos.

---

## 📋 Requisitos Previos

- Cuenta de GitHub con el repositorio del proyecto
- Credenciales de Cloudinary (ya las tienes configuradas)

---

## 🚂 Paso 1: Crear Cuenta en Railway

1. Ve a [railway.app](https://railway.app)
2. Click en "Start a New Project"
3. **Login con GitHub** (recomendado para auto-deploy)
4. Autoriza a Railway para acceder a tus repositorios

**Plan Gratuito:**
- $5 USD de crédito gratis mensual
- No requiere tarjeta de crédito para empezar
- Crédito se renueva cada mes

---

## 🗄️ Paso 2: Crear Proyecto y Agregar PostgreSQL

### 2.1 Crear Nuevo Proyecto

1. En Railway dashboard, click en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Busca y selecciona tu repositorio: `uniendo-metas`
4. Railway detectará automáticamente que es una app Node.js

### 2.2 Agregar PostgreSQL

1. En tu proyecto, click en "+ New"
2. Selecciona "Database" → "Add PostgreSQL"
3. Railway creará automáticamente la base de datos
4. La variable `DATABASE_URL` se configurará automáticamente

---

## 🔑 Paso 3: Configurar Variables de Entorno

1. En tu proyecto de Railway, click en tu servicio (uniendo-metas)
2. Ve a la pestaña "Variables"
3. Click en "Raw Editor" (más fácil para copiar/pegar)
4. Agrega las siguientes variables:

```env
NODE_ENV=production
SESSION_SECRET=99d66febacaae0b7b4d023733667c64c20cd8a858517ed127df5139f097622ed
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Eh4"x38"r0b}
CLOUDINARY_CLOUD_NAME=dzxxdzoiu
CLOUDINARY_API_KEY=699688885943526
CLOUDINARY_API_SECRET=LnNFuQLCvhXmEtM2oDYRgRIe57M
```

**Nota:** `DATABASE_URL` ya está configurada automáticamente por Railway cuando agregaste PostgreSQL.

5. Click en "Deploy" o espera a que se despliegue automáticamente

---

## 🚀 Paso 4: Deploy

Railway desplegará automáticamente tu aplicación:

1. **Build**: Railway ejecutará `npm install`
2. **Start**: Railway ejecutará `npm start` (definido en tu `package.json`)
3. **URL**: Railway te dará una URL como `https://uniendo-metas-production.up.railway.app`

El proceso toma aproximadamente 2-3 minutos.

---

## ✅ Paso 5: Verificar el Deployment

### 5.1 Acceder a la Aplicación

1. En Railway, ve a "Settings" → "Domains"
2. Copia la URL generada (ej: `https://uniendo-metas-production.up.railway.app`)
3. Abre la URL en tu navegador
4. Deberías ver la página principal de "Uniendo Metas"

### 5.2 Probar el Login Admin

1. Ve a `https://tu-url.railway.app/admin`
2. Ingresa las credenciales:
   - Username: `admin`
   - Password: `Eh4"x38"r0b}`
3. Deberías poder acceder al panel de administración

### 5.3 Probar Upload de Archivos

1. En el panel admin, intenta subir:
   - Una foto de voluntario
   - Una imagen del sitio (en configuración)
   - Un documento PDF
   - Un archivo Excel de inscripciones

2. Verifica que las imágenes se muestran correctamente en el sitio

3. Ve a tu dashboard de Cloudinary:
   - [cloudinary.com/console](https://cloudinary.com/console)
   - Deberías ver los archivos subidos en la carpeta `uniendo-metas/`

### 5.4 Verificar Persistencia de Datos

1. Sube algunos archivos y crea contenido
2. Haz un cambio menor en el código (ej: cambiar un texto)
3. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "test: verificar persistencia"
   git push
   ```
4. Railway hará auto-deploy
5. Verifica que los archivos y datos siguen ahí después del nuevo deploy

---

## 🔄 Auto-Deploy desde GitHub

Railway ya está configurado para auto-deploy:

- Cada `git push` a tu rama principal (`main` o `master`) desplegará automáticamente
- Puedes ver el progreso del deploy en el dashboard de Railway
- Los logs están disponibles en tiempo real

---

## 🎨 Configurar Dominio Personalizado (Opcional)

1. En Railway, ve a "Settings" → "Domains"
2. Click en "Generate Domain" para obtener un dominio `.railway.app`
3. O agrega tu propio dominio personalizado:
   - Click en "Custom Domain"
   - Ingresa tu dominio
   - Configura los DNS según las instrucciones

---

## 📊 Monitoreo y Costos

### Ver Uso y Costos

1. En Railway dashboard, ve a "Usage"
2. Verás:
   - Crédito restante del mes
   - Uso de CPU, RAM, y ancho de banda
   - Costo estimado mensual

### Optimizar Costos

Para mantener los costos bajos:
- ✅ Railway se escala automáticamente según el uso
- ✅ Si tu app consume menos de $5/mes, es completamente gratis
- ✅ Puedes pausar el servicio cuando no lo uses (Settings → Sleep)

---

## 🐛 Troubleshooting (Solución de Problemas)

### Error: "Application failed to respond"

**Solución:** Verifica que `PORT` esté configurado correctamente:
1. Railway asigna automáticamente el puerto
2. Tu `app.js` ya usa `process.env.PORT || 3000` ✅

### Error: "Database connection failed"

**Solución:** Verifica que PostgreSQL esté agregado:
1. En Railway, verifica que tienes un servicio "PostgreSQL"
2. Verifica que `DATABASE_URL` esté en las variables de entorno
3. Revisa los logs: Click en tu servicio → "Deployments" → Click en el deployment → "View Logs"

### Error: "Cloudinary credentials not found"

**Solución:** Verifica las variables de Cloudinary:
1. Ve a "Variables" en Railway
2. Verifica que estén:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### Las imágenes no se muestran

**Problema:** Las URLs de Cloudinary no se están generando correctamente.

**Solución:**
1. Verifica en el dashboard de Cloudinary que los archivos se subieron
2. Revisa los logs de Railway para ver si hay errores
3. Verifica que `NODE_ENV=production` esté configurado

---

## 📝 Comandos Útiles

### Ver Logs en Tiempo Real

1. En Railway dashboard, click en tu servicio
2. Ve a "Deployments"
3. Click en el deployment activo
4. Click en "View Logs"

### Re-deploy Manual

1. Ve a "Deployments"
2. Click en el deployment más reciente
3. Click en "Redeploy"

### Pausar/Reanudar Servicio

1. Ve a "Settings"
2. Scroll hasta "Sleep"
3. Configura cuando quieres que el servicio se pause automáticamente

---

## 💡 Notas Importantes

- ✅ **Gratis para empezar:** $5 USD de crédito mensual
- ✅ **Auto-deploy:** Cada push a GitHub despliega automáticamente
- ✅ **Persistencia garantizada:** PostgreSQL y Cloudinary mantienen tus datos
- ✅ **Muy simple:** No requiere cambios en el código
- 💰 **Costo estimado:** $5-7 USD/mes (cubierto por el crédito gratis en la mayoría de casos)
- 🔒 **Seguridad:** Cambia `SESSION_SECRET` y `ADMIN_PASSWORD` por valores seguros

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa esta guía completa
2. Revisa los logs de Railway (Deployments → View Logs)
3. Revisa la documentación oficial:
   - [Railway Docs](https://docs.railway.app)
   - [Cloudinary Docs](https://cloudinary.com/documentation)

---

## 🎯 Próximos Pasos

Una vez que tu app esté funcionando en Railway:

1. **Monitorear Uso**
   - Revisa el dashboard de Railway para ver el uso de recursos
   - Revisa el dashboard de Cloudinary para ver el uso de almacenamiento

2. **Configurar Backups** (Opcional)
   - Railway hace backups automáticos de PostgreSQL
   - Puedes exportar la base de datos manualmente si lo deseas

3. **Cambiar Contraseña de Admin**
   - Después del primer login, cambia la contraseña del admin por seguridad

4. **Configurar Dominio Personalizado** (Opcional)
   - Agrega tu propio dominio en Settings → Domains
