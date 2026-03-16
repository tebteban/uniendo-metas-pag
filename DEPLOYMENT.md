# Guía de Deployment - Uniendo Metas

Esta guía explica cómo desplegar el proyecto "Uniendo Metas" en diferentes plataformas.

## 📋 Requisitos Previos

- Node.js 16+ instalado
- PostgreSQL 12+ (para producción)
- Git configurado

## 🔧 Variables de Entorno Necesarias

El proyecto requiere las siguientes variables de entorno (ver `.env.example`):

```bash
NODE_ENV=production              # Entorno (development o production)
PORT=3000                        # Puerto del servidor
DATABASE_URL=postgresql://...    # URL de conexión a PostgreSQL
SESSION_SECRET=tu-secreto-aqui   # Secreto para sesiones (cambiar en producción)
ADMIN_USERNAME=admin             # Usuario administrador inicial
ADMIN_PASSWORD=admin123          # Contraseña administrador inicial
```

## 🗄️ Base de Datos

### Desarrollo Local (SQLite)
```bash
NODE_ENV=development
# No requiere DATABASE_URL, usa SQLite automáticamente
```

### Producción (PostgreSQL)
```bash
NODE_ENV=production
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/nombre_bd
```

## 🚀 Deployment en Diferentes Plataformas

### DigitalOcean (VPS)

1. **Crear Droplet**
   - Ubuntu 22.04 LTS
   - Plan básico ($6/mes)

2. **Conectar por SSH**
   ```bash
   ssh root@tu-ip
   ```

3. **Instalar dependencias**
   ```bash
   # Actualizar sistema
   apt update && apt upgrade -y
   
   # Instalar Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs
   
   # Instalar PostgreSQL
   apt install -y postgresql postgresql-contrib
   
   # Instalar PM2 (gestor de procesos)
   npm install -g pm2
   
   # Instalar Nginx
   apt install -y nginx
   ```

4. **Configurar PostgreSQL**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE uniendom;
   CREATE USER tuusuario WITH PASSWORD 'tucontraseña';
   GRANT ALL PRIVILEGES ON DATABASE uniendom TO tuusuario;
   \q
   ```

5. **Clonar proyecto**
   ```bash
   cd /var/www
   git clone https://github.com/tebteban/uniendo-metas-pag.git
   cd uniendo-metas-pag
   ```

6. **Configurar variables de entorno**
   ```bash
   nano .env
   # Pegar configuración de producción
   ```

7. **Instalar dependencias y ejecutar**
   ```bash
   npm install
   pm2 start app.js --name uniendo-metas
   pm2 startup
   pm2 save
   ```

8. **Configurar Nginx**
   ```bash
   nano /etc/nginx/sites-available/uniendo-metas
   ```
   
   Contenido:
   ```nginx
   server {
       listen 80;
       server_name tu-dominio.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   ln -s /etc/nginx/sites-available/uniendo-metas /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

9. **Configurar SSL (opcional pero recomendado)**
   ```bash
   apt install -y certbot python3-certbot-nginx
   certbot --nginx -d tu-dominio.com
   ```

---

### Railway

1. **Crear cuenta en Railway.app**

2. **Crear nuevo proyecto**
   - Click en "New Project"
   - Seleccionar "Deploy from GitHub repo"
   - Autorizar y seleccionar tu repositorio

3. **Agregar PostgreSQL**
   - Click en "New" → "Database" → "PostgreSQL"
   - Railway generará automáticamente DATABASE_URL

4. **Configurar variables de entorno**
   En el panel de Railway, agregar:
   ```
   NODE_ENV=production
   SESSION_SECRET=tu-secreto-seguro-aqui
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=tu-contraseña-segura
   ```

5. **Deploy automático**
   - Railway detectará automáticamente el `package.json`
   - Ejecutará `npm install` y `npm start`
   - Tu app estará en línea en minutos

---

### Render

1. **Crear cuenta en Render.com**

2. **Crear Web Service**
   - Click en "New" → "Web Service"
   - Conectar repositorio de GitHub

3. **Configurar servicio**
   - Name: uniendo-metas
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Crear base de datos PostgreSQL**
   - Click en "New" → "PostgreSQL"
   - Copiar la "Internal Database URL"

5. **Configurar variables de entorno**
   ```
   NODE_ENV=production
   DATABASE_URL=<pegar Internal Database URL>
   SESSION_SECRET=tu-secreto-seguro
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=tu-contraseña-segura
   ```

6. **Deploy**
   - Click en "Create Web Service"
   - Render desplegará automáticamente

---

## 🔍 Verificación Post-Deployment

Después del deployment, verifica:

1. **Servidor funcionando**
   - Accede a tu URL
   - Verifica que la página principal carga

2. **Base de datos conectada**
   - Intenta iniciar sesión con credenciales admin
   - Verifica que puedes acceder al panel de administración

3. **Funcionalidades principales**
   - Subir imágenes
   - Crear/editar contenido
   - Verificar que los cambios persisten

## 🐛 Troubleshooting

### Error de conexión a base de datos
```bash
# Verificar que DATABASE_URL está correcta
echo $DATABASE_URL

# Verificar que PostgreSQL está corriendo
systemctl status postgresql
```

### Error de permisos
```bash
# Dar permisos correctos
chown -R www-data:www-data /var/www/uniendo-metas-pag
```

### Aplicación no inicia
```bash
# Ver logs de PM2
pm2 logs uniendo-metas

# Reiniciar aplicación
pm2 restart uniendo-metas
```

## 📝 Notas Importantes

- **Cambiar SESSION_SECRET** en producción por algo único y seguro
- **Cambiar ADMIN_PASSWORD** después del primer login
- **Configurar backups** de la base de datos regularmente
- **Monitorear recursos** del servidor (RAM, CPU, disco)
- **Actualizar dependencias** periódicamente con `npm update`

## 🔄 Actualizar Deployment

```bash
# En el servidor
cd /var/www/uniendo-metas-pag
git pull origin main
npm install
pm2 restart uniendo-metas
```

Para Railway/Render: Solo hacer push a GitHub, el deployment es automático.
