const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createCloudinaryStorage } = require('../config/cloudinary');

// Usar Cloudinary en producción, almacenamiento local en desarrollo
const isProduction = process.env.NODE_ENV === 'production';

let storage;
if (isProduction) {
    // Producción: Usar Cloudinary para imágenes y documentos del sitio.
    // 'auto' permite que Cloudinary maneje los tipos de archivo según su extensión.
    storage = createCloudinaryStorage('site', 'auto', ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'doc', 'docx', 'xlsx', 'xls', 'csv']);
} else {
    // Desarrollo: Usar almacenamiento local
    // Ensure directory exists
    const uploadDir = path.join(__dirname, '../../frontend/public/img/site');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
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
        const allowedExtensions = /jpeg|jpg|png|webp|pdf|doc|docx|xlsx|xls|csv/;
        const mimetype = allowedExtensions.test(file.mimetype);
        const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten imágenes o documentos compatibles (jpg, jpeg, png, webp, pdf, doc, docx, xlsx, xls, csv)'));
    }
});

module.exports = upload;

