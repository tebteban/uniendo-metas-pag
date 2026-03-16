# Guía de Deployment en Vercel + Cloudinary

Esta guía te llevará paso a paso para desplegar "Uniendo Metas" en Vercel con Cloudinary para almacenamiento de archivos.

---

## 📋 Requisitos Previos

- Cuenta de GitHub con el repositorio del proyecto
- Node.js 16+ instalado localmente
- Git configurado

---

## 🎨 Paso 1: Configurar Cloudinary

### 1.1 Crear Cuenta en Cloudinary

1. Ve a [cloudinary.com](https://cloudinary.com)
2. Click en "Sign Up" (Registrarse)
3. Elige el plan **FREE** (gratuito)
   - 25 GB de almacenamiento
   - 25 GB de ancho de banda/mes
   - Transformaciones ilimitadas

### 1.2 Obtener Credenciales

1. Después de registrarte, ve al **Dashboard**
2. Encontrarás tus credenciales en la sección "Account Details":
   ```
   Cloud Name: dzxxdzoiu
   API Key: 699688885943526
   API Secret: LnNFuQLCvhXmEtM2oDYRgRIe57M
   ```
3. **Guarda estas credenciales**, las necesitarás más adelante

---

## 🗄️ Paso 2: Configurar PostgreSQL

Tienes dos opciones:

### Opción A: Vercel Postgres (Recomendado)

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. En tu dashboard, click en "Storage" → "Create Database"
3. Selecciona "Postgres"
4. Elige la región más cercana a tu ubicación
5. Click en "Create"
6. Vercel te dará automáticamente la `DATABASE_URL` 

**Plan Gratuito:**
- 256 MB de almacenamiento
- 60 horas de cómputo/mes
- Suficiente para empezar

### Opción B: Neon.tech (Alternativa Gratuita)

1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Copia la `DATABASE_URL` que te proporciona postgresql://neondb_owner:npg_H5ZySJg9OIhz@ep-flat-art-aidtn3e5-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require

**Plan Gratuito:**
- 3 GB de almacenamiento
- Ilimitado
- Excelente alternativa

---

## 🚀 Paso 3: Deploy en Vercel

### 3.1 Instalar Vercel CLI

```bash
npm install -g vercel
```

### 3.2 Login en Vercel

```bash
vercel login
```

Sigue las instrucciones para autenticarte (se abrirá tu navegador).

### 3.3 Primer Deploy (Configuración Inicial)

En la carpeta raíz de tu proyecto:

```bash
cd c:\Users\Esteban\paginaum\uniendo-metas
vercel
```

Vercel te hará algunas preguntas:

```
? Set up and deploy "~/uniendo-metas"? [Y/n] y
? Which scope do you want to deploy to? [Selecciona tu cuenta]
? Link to existing project? [N/y] n
? What's your project's name? uniendo-metas
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
```

**IMPORTANTE:** Este primer deploy **fallará** porque aún no configuramos las variables de entorno. Esto es normal.

### 3.4 Configurar Variables de Entorno

Hay dos formas de hacerlo:

#### Opción A: Desde el Dashboard de Vercel (Más Fácil)

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto "uniendo-metas"
3. Ve a "Settings" → "Environment Variables"
4. Agrega las siguientes variables **una por una**:

```bash
NODE_ENV = production
PORT = 3000
DATABASE_URL = postgresql://neondb_owner:npg_H5ZySJg9OIhz@ep-flat-art-aidtn3e5-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
SESSION_SECRET = 99d66febacaae0b7b4d023733667c64c20cd8a858517ed127df5139f097622ed
ADMIN_USERNAME = admin
ADMIN_PASSWORD = Eh4"x38"r0b}
CLOUDINARY_CLOUD_NAME = dzxxdzoiu
CLOUDINARY_API_KEY = 699688885943526
CLOUDINARY_API_SECRET = LnNFuQLCvhXmEtM2oDYRgRIe57M
```

5. Para cada variable, asegúrate de seleccionar los tres ambientes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

#### Opción B: Desde la Terminal (Alternativa)

```bash
vercel env add NODE_ENV
# Ingresa: production
# Selecciona: Production, Preview, Development

vercel env add DATABASE_URL
# Ingresa: tu URL de PostgreSQL
# Selecciona: Production, Preview, Development

vercel env add SESSION_SECRET
# Ingresa: un string aleatorio seguro
# Selecciona: Production, Preview, Development

vercel env add ADMIN_USERNAME
# Ingresa: admin
# Selecciona: Production, Preview, Development

vercel env add ADMIN_PASSWORD
# Ingresa: tu contraseña segura
# Selecciona: Production, Preview, Development

vercel env add CLOUDINARY_CLOUD_NAME
# Ingresa: tu cloud name
# Selecciona: Production, Preview, Development

vercel env add CLOUDINARY_API_KEY
# Ingresa: tu API key
# Selecciona: Production, Preview, Development

vercel env add CLOUDINARY_API_SECRET
# Ingresa: tu API secret
# Selecciona: Production, Preview, Development
```

### 3.5 Deploy a Producción

Ahora que las variables están configuradas, haz el deploy final:

```bash
vercel --prod
```

Vercel te dará una URL como: `https://uniendo-metas-xxxxx.vercel.app`

---

## ✅ Paso 4: Verificar el Deployment

### 4.1 Verificar que la App Funciona

1. Abre la URL que te dio Vercel
2. Deberías ver la página principal de "Uniendo Metas"
3. Si ves un error, revisa los logs:
   ```bash
   vercel logs
   ```

### 4.2 Probar el Login Admin

1. Ve a `https://tu-url.vercel.app/admin`
2. Ingresa las credenciales que configuraste:
   - Username: `admin` (o el que configuraste)
   - Password: tu contraseña
3. Deberías poder acceder al panel de administración

### 4.3 Probar Upload de Archivos

1. En el panel admin, intenta subir:
   - Una foto de voluntario
   - Una imagen del sitio (en configuración)
   - Un documento PDF
   - Un archivo Excel de inscripciones

2. Verifica que las imágenes se muestran correctamente en el sitio

3. Ve a tu dashboard de Cloudinary:
   - [cloudinary.com/console](https://cloudinary.com/console)
   - Deberías ver los archivos subidos en la carpeta `uniendo-metas/`

### 4.4 Verificar Persistencia de Datos

1. Sube algunos archivos y crea contenido
2. Haz un cambio menor en el código (ej: cambiar un texto)
3. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "test: verificar persistencia"
   git push
   ```
4. Vercel hará auto-deploy
5. Verifica que los archivos y datos siguen ahí después del nuevo deploy

---

## 🔄 Paso 5: Configurar Auto-Deploy desde GitHub

### 5.1 Conectar GitHub a Vercel

1. Ve a tu proyecto en [vercel.com/dashboard](https://vercel.com/dashboard)
2. Ve a "Settings" → "Git"
3. Click en "Connect Git Repository"
4. Selecciona tu repositorio de GitHub
5. Autoriza a Vercel

### 5.2 Configurar Branch de Deploy

1. En "Settings" → "Git"
2. Configura:
   - **Production Branch:** `main` (o `master`)
   - **Preview Branches:** Todas las demás

Ahora, cada vez que hagas `git push` a `main`, Vercel desplegará automáticamente.

---

## 🐛 Troubleshooting (Solución de Problemas)

### Error: "Cannot find module 'cloudinary'"

**Solución:** Asegúrate de que las dependencias están en `package.json`:
```bash
npm install cloudinary multer-storage-cloudinary --save
git add package.json package-lock.json
git commit -m "fix: agregar dependencias de cloudinary"
git push
```

### Error: "Database connection failed"

**Solución:** Verifica que `DATABASE_URL` esté correctamente configurada:
1. Ve a Vercel Dashboard → Settings → Environment Variables
2. Verifica que `DATABASE_URL` tenga el formato correcto:
   ```
   postgresql://usuario:password@host:5432/database
   ```
3. Si usas Vercel Postgres, copia la URL exacta del dashboard de Vercel Storage

### Error: "Cloudinary credentials not found"

**Solución:** Verifica las variables de Cloudinary:
```bash
vercel env ls
```
Deberías ver:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Si faltan, agrégalas como se explicó en el Paso 3.4.

### Las imágenes no se muestran

**Problema:** Las URLs de Cloudinary no se están generando correctamente.

**Solución:**
1. Verifica en el dashboard de Cloudinary que los archivos se subieron
2. En tu código, asegúrate de usar `file.path` (URL de Cloudinary) en lugar de `file.filename`
3. Revisa los logs de Vercel:
   ```bash
   vercel logs --follow
   ```

### Error 500 después del deploy

**Solución:**
1. Revisa los logs:
   ```bash
   vercel logs
   ```
2. Busca el error específico
3. Verifica que todas las variables de entorno estén configuradas
4. Asegúrate de que `NODE_ENV=production`

---

## 📝 Comandos Útiles

```bash
# Ver logs en tiempo real
vercel logs --follow

# Ver lista de deployments
vercel ls

# Ver variables de entorno
vercel env ls

# Eliminar un deployment
vercel rm [deployment-url]

# Re-deploy sin cambios
vercel --prod --force
```

---

## 🎯 Próximos Pasos

Una vez que tu app esté funcionando en Vercel:

1. **Configurar Dominio Personalizado** (Opcional)
   - Ve a Settings → Domains en Vercel
   - Agrega tu dominio personalizado

2. **Configurar Backups de Base de Datos**
   - Si usas Vercel Postgres, configura backups automáticos
   - Si usas Neon, ya tiene backups automáticos

3. **Monitorear Uso**
   - Revisa el dashboard de Cloudinary para ver el uso de almacenamiento
   - Revisa el dashboard de Vercel para ver el uso de ancho de banda

4. **Cambiar Contraseña de Admin**
   - Después del primer login, cambia la contraseña del admin por seguridad

---

## 💡 Notas Importantes

- ✅ **Gratis para empezar:** Vercel, Cloudinary y Neon tienen planes gratuitos generosos
- ✅ **Auto-deploy:** Cada push a GitHub despliega automáticamente
- ✅ **Persistencia garantizada:** Los datos en PostgreSQL y archivos en Cloudinary persisten siempre
- ⚠️ **Límites del plan gratuito:** Monitorea tu uso para no exceder los límites
- 🔒 **Seguridad:** Cambia `SESSION_SECRET` y `ADMIN_PASSWORD` por valores seguros

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa esta guía completa
2. Revisa los logs de Vercel: `vercel logs`
3. Revisa la documentación oficial:
   - [Vercel Docs](https://vercel.com/docs)
   - [Cloudinary Docs](https://cloudinary.com/documentation)
