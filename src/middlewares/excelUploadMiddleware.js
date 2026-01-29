const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /xlsx|xls/;
        // Check extension
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mimetype (optional, but good practice. Excel mimetypes can be tricky, so sticking to extension mainly or specific mimes)
        // frequent mimes: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel

        if (extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten archivos Excel (.xlsx, .xls)'));
    }
});

module.exports = upload;
