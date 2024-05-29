const cloudinary=require('../config/cloudinary');
const Photo= require('../module/breakingphoto');
const Video=require('../module/breakingvideo')

const Notification= require('../module/allownotification');

exports.breakingphoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const {headline,description } = req.body;
    const image = req.file;
    console.log(image);

    const img = await cloudinary.uploader.upload(image.path, {
      folder: "photos"
    });
    console.log(img, "this is image");

    const data = await Photo.create({
      image: {
        client_id: img.public_id,
        url: img.url
      },
      headline,description
    });
    console.log(data);

    const notification = new Notification({ message: 'New photo uploaded' });
    await notification.save();

    res.status(200).json({
      message: "File uploaded successfully",
      data: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllbreaking = async (req, res) => {
  try {
      // Fetch all photos from the database
      const photos = await Photo.find();
   
  
      // If no photos found, return an empty array
      if (!photos || photos.length === 0) {
        return res.status(404).json({ message: "No photos found" });
      }
  
      // Return the photos with their captions
      return res.json({ message: "Dashboard retrieved successfully", photos });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Failed to fetch dashboard", error: err.message });
    }
};
exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPhoto = await Photo.findByIdAndDelete(id);

    if (!deletedPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    return res.json({ message: "photo deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to delete photo", error: err.message });
  }
};
exports.breakingvideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { headling,description,link} = req.body;
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
     headline,description,link
    });
    console.log(data);

    // Create a notification
    const notification = new Notification({ message: 'New video uploaded' });
    await notification.save();

    res.status(200).json({
      message: "Video uploaded successfully",
      data: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllbreakingvideo = async (req, res) => {
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