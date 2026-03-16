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
            allowed_formats: allowedFormats,
            // Generar nombre único para cada archivo
            public_id: (req, file) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                return uniqueSuffix;
            }
        }
    });
};

module.exports = {
    cloudinary,
    createCloudinaryStorage
};
