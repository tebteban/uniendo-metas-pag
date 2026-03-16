const multer = require('multer');
const path = require('path');
const { createCloudinaryStorage } = require('../config/cloudinary');

// Usar Cloudinary en producción, almacenamiento local en desarrollo
const isProduction = process.env.NODE_ENV === 'production';

let storage;
if (isProduction) {
    // Producción: Usar Cloudinary
    storage = createCloudinaryStorage('voluntarios', 'image', ['jpg', 'jpeg', 'png', 'webp']);
} else {
    // Desarrollo: Usar almacenamiento local
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../public/img/Voluntarios'));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
}

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, webp)'));
    }
});

module.exports = upload;
