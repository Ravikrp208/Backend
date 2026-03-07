const multer = require('multer');

const storage = multer.diskStorage()

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },

 });

module.exports = upload;