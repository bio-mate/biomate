const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile"); // Import the Profile model
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

// POST endpoint to handle profile creation
router.post("/addProfile", 
  upload.fields([{ name: 'profileImages', maxCount: 5 }, { name: 'kundaliImages', maxCount: 3 }]), 
  async (req, res) => {
    const {
      userId,
      personalDetails,
      religiousBackground,
      astroDetails,
      familyDetails,
      educationDetails,
      careerDetails,
      lifestyle,
      contactInformation,
    } = req.body;

    // Validate required fields
    if (!userId || !personalDetails || !religiousBackground || !astroDetails || !familyDetails || !educationDetails || !careerDetails || !lifestyle || !contactInformation) {
      return res.status(400).json({ message: "Missing required fields: userId or other profile details" });
    }

    try {
      // Get uploaded files from req.files
      const profileImages = req.files['profileImages'] ? req.files['profileImages'].map(file => ({ imageUrl: file.path })) : [];
      const kundaliImages = req.files['kundaliImages'] ? req.files['kundaliImages'].map(file => ({ imageUrl: file.path })) : [];

      const newProfile = new Profile({
        userId,
        personalDetails: JSON.parse(personalDetails), // Parse JSON strings
        religiousBackground: JSON.parse(religiousBackground),
        astroDetails: JSON.parse(astroDetails),
        familyDetails: JSON.parse(familyDetails),
        educationDetails: JSON.parse(educationDetails),
        careerDetails: JSON.parse(careerDetails),
        lifestyle: JSON.parse(lifestyle),
        contactInformation: JSON.parse(contactInformation),
        profileImages, // Store profile images
        kundaliImages, // Store kundali images
      });

      await newProfile.save(); // Save the profile details
      res.status(201).json({ message: "Profile created successfully!", profile: newProfile });
    } catch (error) {
      console.error("Error creating profile:", error.message); // Log the error message for better debugging
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// GET endpoint to fetch all profiles
router.get("/viewProfile", async (req, res) => {
  try {
    const profiles = await Profile.find(); // Fetch all profiles
    res.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET endpoint to fetch a single profile by ID
router.get("/viewProfile/:id", async (req, res) => {
  const profileId = req.params.id;
  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT endpoint to update a profile by ID
router.put("/updateProfile/:id", 
  upload.fields([{ name: 'profileImages', maxCount: 5 }, { name: 'kundaliImages', maxCount: 5 }]), 
  async (req, res) => {
    const profileId = req.params.id; // Get the profile ID from the request parameters

    const {
      personalDetails,
      religiousBackground,
      astroDetails,
      familyDetails,
      educationDetails,
      careerDetails,
      lifestyle,
      contactInformation,
    } = req.body;

    console.log("Updating profile with ID:", profileId); // Log the profile ID

    try {
      const profile = await Profile.findById(profileId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      // Update fields if they are provided
      if (personalDetails) profile.personalDetails = JSON.parse(personalDetails);
      if (religiousBackground) profile.religiousBackground = JSON.parse(religiousBackground);
      if (astroDetails) profile.astroDetails = JSON.parse(astroDetails);
      if (familyDetails) profile.familyDetails = JSON.parse(familyDetails);
      if (educationDetails) profile.educationDetails = JSON.parse(educationDetails);
      if (careerDetails) profile.careerDetails = JSON.parse(careerDetails);
      if (lifestyle) profile.lifestyle = JSON.parse(lifestyle);
      if (contactInformation) profile.contactInformation = JSON.parse(contactInformation);

      // Handle uploaded files
      if (req.files['profileImages']) {
        const profileImages = req.files['profileImages'].map(file => ({ imageUrl: file.path }));
        profile.profileImages.push(...profileImages); // Append new images
      }

      if (req.files['kundaliImages']) {
        const kundaliImages = req.files['kundaliImages'].map(file => ({ imageUrl: file.path }));
        profile.kundaliImages.push(...kundaliImages); // Append new images
      }

      await profile.save(); // Save the updated profile
      res.json({ message: "Profile updated successfully", profile });
    } catch (error) {
      console.error("Error updating profile:", error); // Log the error
      res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
