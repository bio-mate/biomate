const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile"); // Import the Profile model
const multer = require('multer');
const path = require('path')

// Configure Multer storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// POST endpoint to handle profile creation
router.post("/addProfile", 
    //upload.fields([{ name: 'profileImages', maxCount: 5 }, { name: 'kundaliImages', maxCount: 3 }]),
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
    //   const profileImages = req.files['profileImages'] ? req.files['profileImages'].map(file => ({ imageUrl: file.buffer.toString('base64') })) : [];
    //   const kundaliImages = req.files['kundaliImages'] ? req.files['kundaliImages'].map(file => ({ imageUrl: file.buffer.toString('base64') })) : [];

      const newProfile = new Profile({
        userId,
        personalDetails,
        religiousBackground,
        astroDetails,
        familyDetails,
        educationDetails,
        careerDetails,
        lifestyle,
        contactInformation,
        // profileImages, // Store profile images
        // kundaliImages, // Store kundali images
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
router.put("/updateProfile/:id", upload.fields([{ name: 'profileImages', maxCount: 5 }, { name: 'kundaliImages', maxCount: 5 }]), async (req, res) => {
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
  
    const profileId = req.params.id; // Get the profile ID from the request parameters
  
    console.log("Updating profile with ID:", profileId); // Log the profile ID
  
    try {
      // Get uploaded files from req.files
      const profileImages = req.files['profileImages'] ? req.files['profileImages'].map(file => file.buffer) : [];
      const kundaliImages = req.files['kundaliImages'] ? req.files['kundaliImages'].map(file => file.buffer) : [];
  
      const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
        {
          personalDetails,
          religiousBackground,
          astroDetails,
          familyDetails,
          educationDetails,
          careerDetails,
          lifestyle,
          contactInformation,
          profileImages, // Update profile images
          kundaliImages, // Update kundali images
        },
        { new: true, runValidators: true } // Return the updated document and run validation
      );
  
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
      res.json({ message: "Profile updated successfully", updatedProfile });
    } catch (error) {
      console.error("Error updating profile:", error); // Log the error
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

module.exports = router;
