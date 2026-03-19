const multer = require('multer');
const path = require('path');
const { createCloudinaryStorage } = require('../config/cloudinary');

// Usar Cloudinary en producción, almacenamiento local en desarrollo
const isProduction = process.env.NODE_ENV === 'production';

let storage;
if (isProduction) {
    // Producción: Usar Cloudinary con resource_type 'auto' para evitar problemas de autenticación
    // El tipo 'auto' detecta automáticamente el tipo de archivo y NO requiere fl_attachment
    storage = createCloudinaryStorage('documents', 'auto', ['xlsx', 'csv', 'pdf', 'doc', 'docx', 'xls']);
} else {
    // Desarrollo: Usar almacenamiento local
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../public/uploads'));
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
        // Accept excel, csv, pdf, word
        const ext = path.extname(file.originalname).toLowerCase();
        if (['.xlsx', '.csv', '.pdf', '.doc', '.docx', '.xls'].includes(ext)) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten archivos Excel, CSV, PDF o Word'));
    }
});

module.exports = upload;
