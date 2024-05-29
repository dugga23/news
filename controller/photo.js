const cloudinary = require('../config/cloudinary');
const Photo = require('../module/photo.module');
//const Notification = require('../module/allownotification');

exports.photocreate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { headline,description,state,district,city } = req.body;
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
      headline,description,state,district,city
    });
    console.log(data);

    // const notification = new Notification({ message: 'New photo uploaded' });
    // await notification.save();

    res.status(200).json({
      message: "File uploaded successfully",
      data: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllPhoto = async (req, res) => {
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
exports.getbystate = async (req, res) => {
  try {
    const { state } = req.query;  // Get the city query parameter

    // Fetch photos from the database, optionally filtered by city
    let photos;
    if (state) {
      photos = await Photo.find({ state });
    } else {
      photos = await Photo.find();
    }

    // If no photos found, return an empty array
    if (!photos || photos.length === 0) {
      return res.status(404).json({ message: "No photos found" });
    }

    // Return the photos with their captions
    return res.json({ message: "Dashboard retrieved successfully", photos });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
  }
};
exports.getbydistrict = async (req, res) => {
  try {
    const { district } = req.query;  // Get the city query parameter

    // Fetch photos from the database, optionally filtered by city
    let photos;
    if (district) {
      photos = await Photo.find({ district });
    } else {
      photos = await Photo.find();
    }

    // If no photos found, return an empty array
    if (!photos || photos.length === 0) {
      return res.status(404).json({ message: "No photos found" });
    }

    // Return the photos with their captions
    return res.json({ message: "Dashboard retrieved successfully", photos });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
  }
};
exports.getbycity = async (req, res) => {
  try {
    const { city } = req.query;  // Get the city query parameter

    // Fetch photos from the database, optionally filtered by city
    let photos;
    if (city) {
      photos = await Photo.find({ city });
    } else {
      photos = await Photo.find();
    }

    // If no photos found, return an empty array
    if (!photos || photos.length === 0) {
      return res.status(404).json({ message: "No photos found" });
    }

    // Return the photos with their captions
    return res.json({ message: "Dashboard retrieved successfully", photos });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPhoto = await Photo.findByIdAndDelete(id);

    if (!deletedPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    return res.json({ message: "Photo deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to delete Photo", error: err.message });
  }
};
