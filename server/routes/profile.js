const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); // Import the Profile model

// POST endpoint to handle profile creation
router.post('/addProfile', async (req, res) => {
    const { userId, personalDetails, educationDetails, skills, experience } = req.body;
  
    // Validate required fields
    if (!userId || !personalDetails || !educationDetails) {
      return res.status(400).json({ message: 'Missing required fields: userId, personalDetails, or educationDetails' });
    }
  
    try {
      const newProfile = new Profile({
        userId, // Link to the user
        personalDetails,
        educationDetails,
        skills: skills || [], // Default to empty array if not provided
        experience: experience || [], // Default to empty array if not provided
      });
  
      await newProfile.save(); // Save the profile details
      res.status(201).json({ message: 'Profile created successfully!', profile: newProfile });
    } catch (error) {
      console.error('Error creating profile:', error.message); // Log the error message for better debugging
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });


// GET endpoint to fetch all profiles
router.get('/viewProfile', async (req, res) => {
    try {
      const profiles = await Profile.find(); // Fetch all profiles
      res.json(profiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/viewProfile/:id', async (req, res) => {
    const profileId = req.params.id;
    try {
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


  router.put('/updateProfile/:id', async (req, res) => {
    const { personalDetails, educationDetails, skills, experience } = req.body;
    const profileId = req.params.id; // Get the profile ID from the request parameters
  
    console.log('Updating profile with ID:', profileId); // Log the profile ID
  
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId,
            { personalDetails, educationDetails, skills, experience },
            { new: true, runValidators: true } // Return the updated document and run validation
        );
  
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
  
        res.json({ message: 'Profile updated successfully', updatedProfile });
    } catch (error) {
        console.error('Error updating profile:', error); // Log the error
        res.status(500).json({ message: 'Internal server error' });
    }
});

  

module.exports = router;
