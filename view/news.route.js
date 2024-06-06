// photoUploadRoute.js
const express = require('express');
const Router = express.Router();
const photoupload= require('../middleware/mediaupload');
const newscontroller= require('../controller/news');
const jwtmiddleware=require('../middleware/jwtmiddleware')

// POST route for uploading a single photo
Router.post('/news', jwtmiddleware,photoupload, newscontroller.news);
Router.get('/getnews',newscontroller.getAllnews);
Router.get('/get/:state',newscontroller.getbystate);
Router.get('/getDist/:district',newscontroller.getbydistrict);
Router.get('/getCity/:city',newscontroller.getbycity);
Router.delete('/deletenews/:id',jwtmiddleware,newscontroller.deletenews);

module.exports = Router;