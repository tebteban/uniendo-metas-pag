const multer = require('multer');
const path = require('path');

// Check if we're in production and Cloudinary is configured
const isProduction = process.env.NODE_ENV === 'production';
const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

let storage;

if (isProduction && hasCloudinary) {
    // Production: Use Cloudinary
    const { imageStorage } = require('../config/cloudinary');
    storage = imageStorage;
    console.log('☁️  Using Cloudinary for image uploads');
} else {
    // Development: Use local storage
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../public/img/Voluntarios'));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
    console.log('💾 Using local storage for image uploads');
}

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, webp, gif)'));
    }
});

module.exports = upload;
