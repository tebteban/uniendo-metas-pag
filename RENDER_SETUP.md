# Configuración de PostgreSQL y Cloudinary en Render

## Paso 1: Crear Base de Datos PostgreSQL

1. Ve a tu dashboard de Render: https://dashboard.render.com
2. Click en "New +" → "PostgreSQL"
3. Configura:
   - **Name:** `uniendo-metas-db`
   - **Database:** `uniendo_metas`
   - **User:** (se genera automáticamente)
   - **Region:** Elige la más cercana
   - **Plan:** Free
4. Click en "Create Database"
5. Espera a que se cree (toma 1-2 minutos)

## Paso 2: Conectar PostgreSQL al Servicio Web

1. Ve a tu servicio web "uniendo-metas-sde"
2. Ve a "Environment"
3. Render ya debería haber agregado automáticamente la variable `DATABASE_URL`
4. Si no está, agrégala manualmente copiando la "External Database URL" de tu PostgreSQL

## Paso 3: Crear Cuenta en Cloudinary

1. Ve a https://cloudinary.com/users/register_free
2. Regístrate con tu email
3. Verifica tu cuenta
4. Ve al Dashboard: https://console.cloudinary.com/

## Paso 4: Obtener Credenciales de Cloudinary

En el Dashboard de Cloudinary, encontrarás:
- **Cloud Name:** (ejemplo: `dxxxxx`)
- **API Key:** (ejemplo: `123456789012345`)
- **API Secret:** Click en "Show" para verlo

## Paso 5: Agregar Variables de Entorno en Render

1. Ve a tu servicio "uniendo-metas-sde" en Render
2. Ve a "Environment"
3. Agrega las siguientes variables:

```
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
NODE_ENV=production
```

4. Click en "Save Changes"

## Paso 6: Deploy

1. Render detectará los cambios en GitHub automáticamente
2. O puedes hacer deploy manual desde el dashboard
3. Espera a que termine el deploy (5-10 minutos)

## Verificación

Una vez que el deploy termine, verifica:

1. **Logs del servidor:** Deberías ver:
   ```
   🐘 Using PostgreSQL database (production)
   ☁️  Using Cloudinary for image uploads
   ☁️  Using Cloudinary for document uploads
   ```

2. **Prueba subir una imagen:** Ve a `/admin` y sube una foto de voluntario
3. **Verifica persistencia:** Haz otro deploy y verifica que los datos NO se borren

## Ventajas

✅ **Datos persistentes:** Los settings, órganos, cronogramas NO se borrarán
✅ **Imágenes seguras:** Las fotos se almacenan en Cloudinary
✅ **Mejor rendimiento:** PostgreSQL es más rápido
✅ **Gratis:** Ambos servicios tienen planes gratuitos generosos

## Notas Importantes

- **PostgreSQL Free Plan:** 256 MB de almacenamiento, suficiente para tu proyecto
- **Cloudinary Free Plan:** 25 GB de almacenamiento, 25 GB de ancho de banda/mes
- **En desarrollo:** Seguirás usando SQLite y almacenamiento local
- **En producción:** Usará PostgreSQL y Cloudinary automáticamente
