const express = require('express');
const multer = require('multer');
const Profile = require('../models/Profile'); // Adjust the path as necessary
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    // Ensure the uploads directory exists
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Set max file size to 5MB

// Upload Image
router.post('/:profileId/uploadImage', upload.single('image'), async (req, res) => {
  const { profileId } = req.params;

  try {
    const imageUrl = req.file.path; // Get the file path

    // Find the profile and add the image path
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    profile.profileImages.push({ imageUrl });
    await profile.save();
    res.status(201).json({ message: "Image uploaded successfully!", profile });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

// Edit Image
router.put('/:profileId/editImage/:imageId', upload.single('image'), async (req, res) => {
  const { profileId, imageId } = req.params;

  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const imageIndex = profile.profileImages.findIndex(img => img._id.toString() === imageId);
    if (imageIndex === -1) {
      return res.status(404).json({ message: "Image not found." });
    }

    // Optionally delete the old image file
    const oldImagePath = profile.profileImages[imageIndex].imageUrl;
    fs.unlinkSync(oldImagePath); // Remove old image from file system

    // Update image with new file path
    const newImageUrl = req.file.path;
    profile.profileImages[imageIndex].imageUrl = newImageUrl;
    await profile.save();
    res.status(200).json({ message: "Image updated successfully!", profile });
  } catch (error) {
    console.error("Error editing image:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

// Delete Image
router.delete('/:profileId/deleteImage/:imageId', async (req, res) => {
  const { profileId, imageId } = req.params;

  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const imageIndex = profile.profileImages.findIndex(img => img._id.toString() === imageId);
    if (imageIndex === -1) {
      return res.status(404).json({ message: "Image not found." });
    }

    // Remove image from file system
    const imagePath = profile.profileImages[imageIndex].imageUrl;
    fs.unlinkSync(imagePath);

    // Remove image from profile
    profile.profileImages.splice(imageIndex, 1);
    await profile.save();
    res.status(200).json({ message: "Image deleted successfully!", profile });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

// View Images
router.get('/:profileId/images', async (req, res) => {
  const { profileId } = req.params;

  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    res.status(200).json({ images: profile.profileImages });
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

module.exports = router;
