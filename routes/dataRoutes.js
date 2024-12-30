const express = require('express');
const router = express.Router();
const { uploadData,getAllUploads } = require('../controllers/dataController');
const multer = require('multer');

// Multer setup for file uploads (e.g., videos)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

// File filter to accept only MP4 files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(new Error('Only MP4 files are allowed!'), false);
    }
};

// Multer upload configuration with file size limit (6MB)
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 6 * 1024 * 1024 // 6MB size limit
    }
});

// Route for uploading data (with file upload support)
router.post('/upload', upload.single('video'), uploadData);
//Listing the data Get API
router.get('/getAll', getAllUploads);

module.exports = router;
