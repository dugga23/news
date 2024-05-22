// photoUploadRoute.js
const express = require('express');
const Router = express.Router();
const photoupload= require('../middleware/photoupload');
const photocontroler= require('../controller/photo');

// POST route for uploading a single photo
Router.post('/upload/photo', photoupload, photocontroler.photocreate);
Router.get('/get/photo',photocontroler.getAllPhoto);
Router.get('/get/photo/:city',photocontroler.getbycity);


module.exports = Router;