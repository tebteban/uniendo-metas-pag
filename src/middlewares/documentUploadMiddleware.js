const multer = require('multer');
const path = require('path');

// Check if we're in production and Cloudinary is configured
const isProduction = process.env.NODE_ENV === 'production';
const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

let storage;

if (isProduction && hasCloudinary) {
    // Production: Use Cloudinary for documents
    const { documentStorage } = require('../config/cloudinary');
    storage = documentStorage;
    console.log('☁️  Using Cloudinary for document uploads');
} else {
    // Development: Use local storage
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../public/uploads'));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
    console.log('💾 Using local storage for document uploads');
}

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
