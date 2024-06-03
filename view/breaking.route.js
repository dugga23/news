// photoUploadRoute.js
const express = require('express');
const Router = express.Router();
const middleware= require('../middleware/mediaupload');
// const video=require('../middleware/videoupload');
const filecontroler= require('../controller/breaking');
const jwtmiddleware=require('../middleware/jwtmiddleware')
// POST route for uploading a single photo
Router.post('/breakingnews', jwtmiddleware,middleware, filecontroler.uploadfile);
Router.get('/getbreakingnews',filecontroler.getbreakingnews);
//Router.post('/breakingvideo',video,photocontroler.breakingvideo);
// Router.get('/get/breakingphoto',photocontroler.getAllbreaking);
// Router.delete('/deletephoto/:id',photocontroler.deletePhoto);
// Router.get('/get/breakingvideo',photocontroler.getAllbreakingvideo);
// Router.delete('/deletevideo/:id',photocontroler.deleteVideo);
module.exports = Router;