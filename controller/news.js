const cloudinary = require('../config/cloudinary');
const File = require('../module/news.module');
//const Notification = require('../module/allownotification');

exports.news = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { headline, description, link,state,district,city } = req.body;
    const file = req.file;
    console.log(file);

    // Determine resource type based on file mimetype
    let resourceType;
    if (file.mimetype.startsWith('video/')) {
      resourceType = 'video';
    } else if (file.mimetype.startsWith('image/')) {
      resourceType = 'image';
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    // Upload file to Cloudinary
    const uploadedfile = await cloudinary.uploader.upload(file.path, {
      resource_type: resourceType,
      folder: "files"
    });
    console.log(uploadedfile, "this is file");

    // Save file details in the database
    const data = await File.create({
      file: { // Ensure this matches your schema
        client_id: uploadedfile.public_id,
        url: uploadedfile.secure_url // Use secure_url to avoid mixed content issues
      },
      headline,
      description,
      link,
      state,district,city
    });
    console.log(data);

    res.status(200).json({
      message: "File uploaded successfully",
      data: data
    });
  } catch (error) { // Ensure error is defined here
    console.error('Error during file upload:', error);

    // Check if the error is from Cloudinary
    if (error.http_code) {
      return res.status(error.http_code).json({
        message: `Cloudinary error: ${error.message}`,
        error: error
      });
    }

    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getAllnews = async (req, res) => {
  try {
      // Fetch all photos from the database
      const file = await File.find();
   
  
      // If no photos found, return an empty array
      if (!file || file.length === 0) {
        return res.status(404).json({ message: "No news found" });
      }
  
      // Return the photos with their captions
      return res.json({ message: "Dashboard retrieved successfully", file});
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

exports.deletenews = async (req, res) => {
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
