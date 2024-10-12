const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  bloodGroup: { 
    type: String, 
    enum: ['A Positive (A+)', 'A Negative (A-)', 'B Positive (B+)', 'B Negative (B-)', 'AB Positive (AB+)', 'AB Negative (AB-)', 'O Positive (O+)', 'O Negative (O-)'], 
    required: true 
  },
  complexion: { 
    type: String, 
    enum: ['Fair', 'Wheatish', 'Dusky', 'Dark'], 
    required: true 
  },
  height: { type: String, required: true },
  weight: { type: Number, required: true },
});

const religiousBackgroundSchema = new mongoose.Schema({
  religion: { type: String, required: true },
  caste: { type: String },
  subCaste: { type: String },
  language: { type: String, required: true },
});

const astroDetailsSchema = new mongoose.Schema({
  dateOfBirth: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  timeOfBirth: { type: String },
  rashi: { type: String, required: true },
  nakshatra: { type: String },
  gotra: { type: String, required: true },
});

const familyDetailsSchema = new mongoose.Schema({
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  noOfBrothers: { type: Number },
  noOfSisters: { type: Number },
});

const educationDetailsSchema = new mongoose.Schema({
  educationDetails: [{
    degree: { type: String, required: true },
    collegeName: { type: String, required: true },
  }]
});

const careerDetailsSchema = new mongoose.Schema({
  employedIn: { 
    type: String, 
    enum: ['Government/PSU', 'Defence', 'Private', 'Business', 'Self Employed', 'Not Working'], 
    required: true 
  },
  companyName: { type: String },
  designation: { type: String, required: true },
  income: { 
    type: String,
    enum: ['0-2 LPA', '2-4 LPA', '4-7 LPA', '7-10 LPA', '10-15 LPA', '15-20 LPA', '20-25 LPA', 'more than 25 LPA'], 
    required: true 
  },
});


// Updated lifestyleSchema
const lifestyleSchema = new mongoose.Schema({
  diet: { 
    type: String, 
    enum: ['veg', 'non-veg', 'jain', 'vegan', 'occasionallyNon-Veg', 'vegetarian'], // Include vegetarian
    required: true 
  },
});


const addressSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  residentialAddress: { type: String },
  permanentAddress: { type: String },
});

const contactInformationSchema = new mongoose.Schema({
  contactNumber: { type: String, required: true },
  address: { type: addressSchema, required: true },
  linkedInUrl: { type: String },
  instagramUrl: { type: String },
  facebookUrl: { type: String },
});
const profileImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const kundaliImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});
const profileSchema = new mongoose.Schema({
  personalDetails: personalInfoSchema,
  religiousBackground: religiousBackgroundSchema,
  astroDetails: astroDetailsSchema,
  familyDetails: familyDetailsSchema,
  educationDetails: educationDetailsSchema,
  careerDetails: [careerDetailsSchema],
  lifestyle: lifestyleSchema,
  contactInformation: contactInformationSchema,
  profileImages: [profileImageSchema],
  kundaliImages: [kundaliImageSchema],
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
