const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept excel and csv
        if (
            file.mimetype.includes('excel') ||
            file.mimetype.includes('spreadsheetml') ||
            file.mimetype.includes('csv') ||
            path.extname(file.originalname).toLowerCase() === '.xlsx' ||
            path.extname(file.originalname).toLowerCase() === '.csv'
        ) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten archivos Excel (.xlsx) o CSV'));
    }
});

module.exports = upload;
