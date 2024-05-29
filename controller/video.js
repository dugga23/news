// controllers/videoController.js
const cloudinary = require('../config/cloudinary');
const Video = require('../module/video.moudle'); // Assuming you have a Video model
//const Notification = require('../module/allownotification'); // Assuming you have a Notification model

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { headline,description,link,state,district,city } = req.body;
    const video = req.file;
    console.log(video);

    // Upload video to Cloudinary
    const uploadedVideo = await cloudinary.uploader.upload(video.path, {
      resource_type: "video",
      folder: "videos"
    });
    console.log(uploadedVideo, "this is video");

    // Save video details in the database
    const data = await Video.create({
      video: {
        client_id: uploadedVideo.public_id,
        url: uploadedVideo.url
      },
     headline,description,link,state,district,city
    });
    console.log(data);

    // Create a notification
    // const notification = new Notification({ message: 'New video uploaded' });
    // await notification.save();

    res.status(200).json({
      message: "Video uploaded successfully",
      data: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllvideo = async (req, res) => {
  try {
      // Fetch all photos from the database
      const video = await Video.find();
   
  
      // If no photos found, return an empty array
      if (!video || video.length === 0) {
        return res.status(404).json({ message: "No photos found" });
      }
  
      // Return the photos with their captions
      return res.json({ message: "Dashboard retrieved successfully", video });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Failed to fetch dashboard", error: err.message });
    }
};
exports.getbystate = async (req, res) => {
  try {
    const { state} = req.query;  // Get the city query parameter

    // Fetch photos from the database, optionally filtered by city
    let video;
    if (state) {
      video = await Video.find({ state });
    } else {
      video = await Video.find();
    }

    // If no photos found, return an empty array
    if (!video || video.length === 0) {
      return res.status(404).json({ message: "No photos found" });
    }

    // Return the photos with their captions
    return res.json({ message: "Dashboard retrieved successfully", video });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
  }
};
exports.getbydistrict = async (req, res) => {
  try {
    const { district } = req.query;  // Get the city query parameter

    // Fetch photos from the database, optionally filtered by city
    let video;
    if (district) {
      video = await Video.find({ district});
    } else {
      video = await Video.find();
    }

    // If no photos found, return an empty array
    if (!video || video.length === 0) {
      return res.status(404).json({ message: "No photos found" });
    }

    // Return the photos with their captions
    return res.json({ message: "Dashboard retrieved successfully", video });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
  }
};
exports.getbycity = async (req, res) => {
  try {
    const { city } = req.query;  // Get the city query parameter

    // Fetch photos from the database, optionally filtered by city
    let video;
    if (city) {
      video = await Video.find({ city });
    } else {
      video = await Video.find();
    }

    // If no photos found, return an empty array
    if (!video || video.length === 0) {
      return res.status(404).json({ message: "No photos found" });
    }

    // Return the photos with their captions
    return res.json({ message: "Dashboard retrieved successfully", video });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
  }
};
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to delete video", error: err.message });
  }
};
