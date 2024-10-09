const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure you have User model imported

// POST endpoint to handle profile creation
router.post('/addProfile', async (req, res) => {
  const { personalDetails, educationDetails } = req.body;

  try {
    // Here you would typically save the data to the database
    const newUser = new User({
      ...personalDetails,
      ...educationDetails,
    });

    await newUser.save(); // Save the user details
    res.status(201).json({ message: 'Profile created successfully!' });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET endpoint to fetch user profile
router.get('/viewProfile', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user authentication middleware
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT endpoint to update user profile
router.put('/updateProfile', async (req, res) => {
  const { name, email, mobile, degree, institution, yearOfPassing } = req.body;

  try {
    const userId = req.user.id; // Assuming you have user authentication middleware
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, mobile, degree, institution, yearOfPassing },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
