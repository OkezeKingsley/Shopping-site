const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const itemModel = require("../models/itemModel");

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  
  const uploadItem = async (req, res) => {
    const { name, description, price, category } = req.body;
    console.log('name, description, price, category', name, description, price, category)
  
    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: "Don't leave a field empty!"});
    }
  
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image"});
    }
  
    try { 
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      
      // Create new item with Cloudinary URL
      const newItem = new itemModel({
        name,
        description,
        price,
        category,
        imageUrl: result.secure_url,
      });
      
      // Save item to MongoDB
      await newItem.save();
      
      // Delete the uploaded file from local storage
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(err);
        }
      });
      console.log("Item uploaded successfully")
      return res.status(201).json({ message: 'Item uploaded successfully' });
  
    } catch (error) {
      console.error("Item not uploaded successfully", error);
      res.status(500).json({ error: 'Error uploading item' });
    }

  };



module.exports = { uploadItem }