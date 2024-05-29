// photoUploadRoute.js
const express = require('express');
const Router = express.Router();
const middleware= require('../middleware/photoupload');

const cardcontroler= require('../controller/cardphoto');

// POST route for uploading a single photo
Router.post('/cardphoto', middleware, cardcontroler.cardphoto);
//Router.post('/videobreaking',video,photocontroler.breakingvideo);
Router.get('/getbreakingphoto',cardcontroler.getAllcard);
//Router.get('/getbreakingvideo',photocontroler.getAllbreakingvideo);
module.exports = Router;