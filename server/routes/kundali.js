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

// Upload Kundali Image
router.post('/:profileId/uploadKundaliImage', upload.single('image'), async (req, res) => {
  const { profileId } = req.params;

  try {
    const imageUrl = req.file.path; // Get the file path

    // Find the profile and add the image path
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    // Ensure kundaliImages array exists
    profile.kundaliImages.push({ imageUrl });
    await profile.save();
    res.status(201).json({ message: "Kundali image uploaded successfully!", profile });
  } catch (error) {
    console.error("Error uploading kundali image:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

// Edit Kundali Image
router.put('/:profileId/editKundaliImage/:imageId', upload.single('image'), async (req, res) => {
  const { profileId, imageId } = req.params;

  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const imageIndex = profile.kundaliImages.findIndex(img => img._id.toString() === imageId);
    if (imageIndex === -1) {
      return res.status(404).json({ message: "Kundali image not found." });
    }

    // Optionally delete the old image file
    const oldImagePath = profile.kundaliImages[imageIndex].imageUrl;
    fs.unlinkSync(oldImagePath); // Remove old image from file system

    // Update image with new file path
    const newImageUrl = req.file.path;
    profile.kundaliImages[imageIndex].imageUrl = newImageUrl;
    await profile.save();
    res.status(200).json({ message: "Kundali image updated successfully!", profile });
  } catch (error) {
    console.error("Error editing kundali image:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

// Delete Kundali Image
router.delete('/:profileId/deleteKundaliImage/:imageId', async (req, res) => {
  const { profileId, imageId } = req.params;

  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const imageIndex = profile.kundaliImages.findIndex(img => img._id.toString() === imageId);
    if (imageIndex === -1) {
      return res.status(404).json({ message: "Kundali image not found." });
    }

    // Remove image from file system
    const imagePath = profile.kundaliImages[imageIndex].imageUrl;
    fs.unlinkSync(imagePath);

    // Remove image from profile
    profile.kundaliImages.splice(imageIndex, 1);
    await profile.save();
    res.status(200).json({ message: "Kundali image deleted successfully!", profile });
  } catch (error) {
    console.error("Error deleting kundali image:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

// View Kundali Images
router.get('/:profileId/kundaliImages', async (req, res) => {
  const { profileId } = req.params;

  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    res.status(200).json({ kundaliImages: profile.kundaliImages });
  } catch (error) {
    console.error("Error retrieving kundali images:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

module.exports = router;
