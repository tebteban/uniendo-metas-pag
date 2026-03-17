const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createCloudinaryStorage } = require('../config/cloudinary');

// Usar Cloudinary en producción, almacenamiento local en desarrollo
const isProduction = process.env.NODE_ENV === 'production';

let storage;
if (isProduction) {
    // Producción: Usar Cloudinary (raw para documentos)
    storage = createCloudinaryStorage('documents', 'raw', ['pdf', 'doc', 'docx']);
} else {
    // Desarrollo: Usar almacenamiento local
    // Ensure directory exists
    const uploadDir = path.join(__dirname, '../../public/uploads/documents');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            // Keep original name sanitized + fieldname prefix to avoid collisions
            const ext = path.extname(file.originalname).toLowerCase();
            const baseName = path.basename(file.originalname, ext)
                .replace(/[^a-zA-Z0-9_\-\.]/g, '_')
                .substring(0, 60);
            const unique = Date.now() + '-' + Math.round(Math.random() * 1E5);
            cb(null, file.fieldname + '_' + baseName + '_' + unique + ext);
        }
    });
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|doc|docx/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten archivos PDF o Word (.pdf, .doc, .docx)'));
    }
});

module.exports = upload;
