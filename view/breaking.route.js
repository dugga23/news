// photoUploadRoute.js
const express = require('express');
const Router = express.Router();
const middleware= require('../middleware/photoupload');
const video=require('../middleware/videoupload');
const photocontroler= require('../controller/breaking');

// POST route for uploading a single photo
Router.post('/breakingphoto', middleware, photocontroler.breakingphoto);
Router.post('/breakingvideo',video,photocontroler.breakingvideo);
Router.get('/get/breakingphoto',photocontroler.getAllbreaking);
Router.get('/get/breakingvideo',photocontroler.getAllbreakingvideo);
module.exports = Router;