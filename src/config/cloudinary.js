const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configurar Cloudinary con variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Función helper para crear storage de Cloudinary
const createCloudinaryStorage = (folder, resourceType = 'image', allowedFormats = ['jpg', 'jpeg', 'png', 'webp']) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: `uniendo-metas/${folder}`,
            resource_type: resourceType,
            access_mode: 'public',
            allowed_formats: allowedFormats,
            // Generar nombre descriptivo y único para cada archivo
            public_id: (req, file) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                if (file && file.originalname) {
                    const path = require('path');
                    const ext = path.extname(file.originalname);
                    const name = path.basename(file.originalname, ext)
                        .replace(/[^a-zA-Z0-9_\-]/g, '_')
                        .substring(0, 60); // Limitar a 60 caracteres
                        
                    // Para descargas de documentos correctas (raw), Cloudinary necesita la extensión en el public_id
                    if (resourceType === 'raw') {
                        return `${name}_${uniqueSuffix}${ext.toLowerCase()}`;
                    }
                    return `${name}_${uniqueSuffix}`;
                }
                return uniqueSuffix;
            }
        }
    });
};

module.exports = {
    cloudinary,
    createCloudinaryStorage
};
