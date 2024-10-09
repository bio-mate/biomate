const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User', // Reference to the User model
  // },
  personalDetails: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], // Optional: Enum for gender
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      zipCode: {
        type: String,
      },
    },
  },
  educationDetails: [{
    degree: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    grade: {
      type: String,
    },
  }],
  skills: [{
    type: String, // Array of skills
  }],
  experience: [{
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    responsibilities: {
      type: String,
    },
  }],
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model('Profile', profileSchema);
