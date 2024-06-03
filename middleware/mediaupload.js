const multer = require('multer');
const fs = require('fs'); 

const uploadDirectory = 'uploads/';

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Define storage for uploaded photos
const storage = multer.diskStorage({});

// Initialize multer with storage options
const upload = multer({ storage: storage }).single('file'); // 'product' is the field name, and 10 is the max count of files

// Add logging middleware to inspect incoming requests

module.exports = upload;
