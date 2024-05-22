const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadDirectory = 'uploads/';

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Define storage for uploaded videos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // specify the directory where uploaded videos will be stored
  },
  filename: function (req, file, cb) {
    // specify how uploaded files should be named
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize multer with storage options
const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Only accept video files
    if (!file.mimetype.startsWith('video/')) {
      return cb(new Error('Only video files are allowed!'), false);
    }
    cb(null, true);
  }
}).single('video');

module.exports = upload;
