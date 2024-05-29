// view/video.route.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/videoupload'); // Ensure this path is correct
const videoController = require('../controller/video'); // Ensure this path is correct

// POST route for uploading a single video
router.post('/upload/video', upload, videoController.uploadVideo);
router.get('/get/video',videoController.getAllvideo);
router.get('/get/video/:state',videoController.getbystate);
router.get('/get/video/:district',videoController.getbydistrict);
router.get('/get/video/:city',videoController.getbycity);

module.exports = router;
