const multer = require('multer');

//setting file input
//check is file image or not
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// storage config file
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

module.exports = upload