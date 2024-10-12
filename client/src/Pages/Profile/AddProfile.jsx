import React, { useState } from "react";
import axios from "axios";
import apiRequest from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import InputField from "../../Atoms/InputField";
import CustomButton from "../../Atoms/CustomButton";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(""); // User ID field
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    complexion: "",
    height: "",
    weight: "", // Weight field added
  });

  const [religiousBackground, setReligiousBackground] = useState({
    religion: "",
    caste: "", // Corrected from 'cast' to 'caste'
    subCaste: "", // Corrected from 'subCast' to 'subCaste'
    language: "",
  });

  const [astroDetails, setAstroDetails] = useState({
    dateOfBirth: "",
    placeOfBirth: "",
    timeOfBirth: "",
    rashi: "",
    nakshatra: "",
    gotra: "",
  });

  const [familyDetails, setFamilyDetails] = useState({
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    noOfBrothers: "",
    noOfSisters: "",
  });

  const [educationDetails, setEducationDetails] = useState({
    degree: "",
    collegeName: "", // Changed from 'institution' to 'collegeName'
  });

  const [careerDetails, setCareerDetails] = useState({
    employedIn: "", // EmployedIn field added
    companyName: "",
    designation: "", // Changed from 'jobTitle' to 'designation'
    income: "", // Income field added
  });

  const [lifestyle, setLifestyle] = useState({
    diet: "", // Diet field added
  });

  const [contactInformation, setContactInformation] = useState({
    contactNumber: "",
    address: {
      country: "",
      state: "",
      district: "",
      residentialAddress: "",
      permanentAddress: "",
    },
    linkedInUrl: "",
    instagramUrl: "",
    facebookUrl: "",
  });

  const [imagePreviews, setImagePreviews] = useState({
    profileImages: [],
    kundaliImages: [],
  });
  const [profileData, setProfileData] = useState([])

  const navigate = useNavigate();
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };
  // const handleImageUpload = (e, type) => {
  //   //   const files = Array.from(e.target.files);
  //   //   const validFiles = files.filter((file) => file.size <= 3 * 1024 * 1024); // 3 MB size limit
  //   //   if (validFiles.length + profileData[type].length > (type === 'profileImages' ? 5 : 3)) {
  //   //     alert(`You can upload a maximum of ${type === 'profileImages' ? 5 : 3} images.`);
  //   //     return;
  //   //   }
  //   //   const newImages = validFiles.map((file) => URL.createObjectURL(file));
  //   //   setProfileData((prevData) => ({
  //   //     ...prevData,
  //   //     [type]: [...prevData[type], ...validFiles],
  //   //   }));
  //   //   setImagePreviews((prev) => ({
  //   //     ...prev,
  //   //     [type]: [...prev[type], ...newImages],
  //   //   }));
  //   // };
  // };
  // const removeImage = (type, index) => {
  //   // setProfileData((prevData) => {
  //   //   const updatedImages = prevData[type].filter((_, i) => i !== index);
  //   //   return { ...prevData, [type]: updatedImages };
  //   // });
  //   //   setImagePreviews((prev) => {
  //   //     const updatedPreviews = prev[type].filter((_, i) => i !== index);
  //   //     return { ...prev, [type]: updatedPreviews };
  //   //   });
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     userId: uuidv4(), // Generates a unique ID
  //     personalDetails: {
  //       firstName: personalDetails.firstName,
  //       lastName: personalDetails.lastName,
  //       age: personalDetails.age,
  //       gender: personalDetails.gender,
  //       bloodGroup: personalDetails.bloodGroup,
  //       complexion: personalDetails.complexion,
  //       height: personalDetails.height,
  //       weight: personalDetails.weight, // Include weight
  //     },
  //     religiousBackground: {
  //       religion: religiousBackground.religion,
  //       caste: religiousBackground.caste, // Corrected from 'cast' to 'caste'
  //       subCaste: religiousBackground.subCaste, // Corrected from 'subCast' to 'subCaste'
  //       language: religiousBackground.language,
  //     },
  //     astroDetails: {
  //       dateOfBirth: astroDetails.dateOfBirth,
  //       placeOfBirth: astroDetails.placeOfBirth,
  //       timeOfBirth: astroDetails.timeOfBirth,
  //       rashi: astroDetails.rashi,
  //       nakshatra: astroDetails.nakshatra,
  //       gotra: astroDetails.gotra,
  //     },
  //     familyDetails: {
  //       fatherName: familyDetails.fatherName,
  //       motherName: familyDetails.motherName,
  //       fatherOccupation: familyDetails.fatherOccupation,
  //       motherOccupation: familyDetails.motherOccupation,
  //       noOfBrothers: familyDetails.noOfBrothers,
  //       noOfSisters: familyDetails.noOfSisters,
  //     },
  //     educationDetails: {
  //       educationDetails: [
  //         {
  //           degree: educationDetails.degree,
  //           collegeName: educationDetails.collegeName,
  //         },
  //       ],
  //     },
  //     careerDetails: careerDetails.companyName // Include only if companyName is provided
  //       ? [
  //           {
  //             employedIn: careerDetails.employedIn,
  //             designation: careerDetails.designation, // Use designation as intended
  //             companyName: careerDetails.companyName,
  //             income: careerDetails.income, // Include income
  //           },
  //         ]
  //       : [], // Ensure it defaults to an empty array if no companyName is provided
  //     lifestyle: {
  //       diet: lifestyle.diet, // Include diet field
  //     },
  //     contactInformation: {
  //       contactNumber: contactInformation.contactNumber,
  //       address: {
  //         country: contactInformation.address.country,
  //         state: contactInformation.address.state,
  //         district: contactInformation.address.district,
  //         residentialAddress: contactInformation.address.residentialAddress,
  //         permanentAddress: contactInformation.address.permanentAddress,
  //       },
  //       linkedInUrl: contactInformation.linkedInUrl,
  //       instagramUrl: contactInformation.instagramUrl,
  //       facebookUrl: contactInformation.facebookUrl,
  //     },
  //     profileImages: [], // Array to store uploaded profile images
  //     kundaliImages: [],
  //   };

  //   try {
  //     const response = await apiRequest(
  //       "POST",
  //       "http://localhost:4000/api/profile/addProfile",
  //       payload
  //     );
  //     if (response.status === 201) {
  //       console.log(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  //   // navigate(`/view-profile/${userId}`);
  // };

  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= 3 * 1024 * 1024); // 3 MB size limit
    if (validFiles.length + profileData[type].length > (type === 'profileImages' ? 5 : 3)) {
      alert(`You can upload a maximum of ${type === 'profileImages' ? 5 : 3} images.`);
      return;
    }
    const newImages = validFiles.map((file) => URL.createObjectURL(file));
    setProfileData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], ...validFiles],
    }));
    setImagePreviews((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newImages],
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    // Append user data to FormData
    formData.append('userId', uuidv4());
    formData.append('personalDetails', JSON.stringify(personalDetails));
    formData.append('religiousBackground', JSON.stringify(religiousBackground));
    formData.append('astroDetails', JSON.stringify(astroDetails));
    formData.append('familyDetails', JSON.stringify(familyDetails));
    formData.append('educationDetails', JSON.stringify(educationDetails));
    formData.append('careerDetails', JSON.stringify(careerDetails));
    formData.append('lifestyle', JSON.stringify(lifestyle));
    formData.append('contactInformation', JSON.stringify(contactInformation));
  
    // Append images
    profileData.profileImages.forEach((file) => {
      formData.append('profileImages', file);
    });
    profileData.kundaliImages.forEach((file) => {
      formData.append('kundaliImages', file);
    });
  
    try {
      const response = await apiRequest(
        "POST",
        "http://localhost:4000/api/profile/addProfile",
        formData,
        {
          'Content-Type': 'multipart/form-data',
        }
      );
      if (response.status === 201) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    // navigate(`/view-profile/${userId}`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <div>
          <h2>Personal Details</h2>
          <input
            type="text"
            placeholder="First Name"
            value={personalDetails.firstName}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                firstName: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={personalDetails.lastName}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                lastName: e.target.value,
              })
            }
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={personalDetails.age}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, age: e.target.value })
            }
            required
          />
          <select
            value={personalDetails.gender}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                gender: e.target.value,
              })
            }
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={personalDetails.bloodGroup}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                bloodGroup: e.target.value,
              })
            }
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A Positive (A+)">A Positive (A+)</option>
            <option value="A Negative (A-)">A Negative (A-)</option>
            <option value="B Positive (B+)">B Positive (B+)</option>
            <option value="B Negative (B-)">B Negative (B-)</option>
            <option value="AB Positive (AB+)">AB Positive (AB+)</option>
            <option value="AB Negative (AB-)">AB Negative (AB-)</option>
            <option value="O Positive (O+)">O Positive (O+)</option>
            <option value="O Negative (O-)">O Negative (O-)</option>
          </select>
          <select
            value={personalDetails.complexion}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                complexion: e.target.value,
              })
            }
            required
          >
            <option value="">Select Complexion</option>
            <option value="Fair">Fair</option>
            <option value="Wheatish">Wheatish</option>
            <option value="Dusky">Dusky</option>
            <option value="Dark">Dark</option>
          </select>
          <select
            value={personalDetails.height}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                height: e.target.value,
              })
            }
            required
          >
            <option value="">Select Height</option>
            <option value="4'5''">4'5''</option>
            <option value="4'6''">4'6''</option>
            <option value="4'7''">4'7''</option>
            <option value="4'8''">4'8''</option>
            <option value="4'9''">4'9''</option>
            <option value="4'10''">4'10''</option>
            <option value="4'11''">4'11''</option>
            <option value="5'0''">5'0''</option>
            <option value="5'1''">5'1''</option>
            <option value="5'2''">5'2''</option>
            <option value="5'3''">5'3''</option>
            <option value="5'4''">5'4''</option>
            <option value="5'5''">5'5''</option>
            <option value="5'6''">5'6''</option>
            <option value="5'7''">5'7''</option>
            <option value="5'8''">5'8''</option>
            <option value="5'9''">5'9''</option>
            <option value="5'10''">5'10''</option>
            <option value="5'11''">5'11''</option>
            <option value="6'1''">6'1''</option>
            <option value="6'2''">6'2''</option>
            <option value="6'3''">6'3''</option>
            <option value="6'4''">6'4''</option>
            <option value="6'5''">6'5''</option>
          </select>
          <input
            type="number"
            placeholder="Weight"
            value={personalDetails.weight}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                weight: e.target.value,
              })
            }
            required
          />
          <CustomButton
            label="Next"
            onClick={handleNext}
            type="primary"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Religious Background</h2>
          <input
            type="text"
            placeholder="Religion"
            value={religiousBackground.religion}
            onChange={(e) =>
              setReligiousBackground({
                ...religiousBackground,
                religion: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Caste"
            value={religiousBackground.caste}
            onChange={(e) =>
              setReligiousBackground({
                ...religiousBackground,
                caste: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Sub Caste"
            value={religiousBackground.subCaste}
            onChange={(e) =>
              setReligiousBackground({
                ...religiousBackground,
                subCaste: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Language"
            value={religiousBackground.language}
            onChange={(e) =>
              setReligiousBackground({
                ...religiousBackground,
                language: e.target.value,
              })
            }
            required
          />
           <CustomButton
            label="Back"
            onClick={handlePrevious}
            type="secondary" // Red button
          />
          <CustomButton
            label="Next"
            onClick={handleNext}
            type="primary" // Green button
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Astrological Details</h2>
          <input
            type="date"
            placeholder="Date of Birth"
            value={astroDetails.dateOfBirth}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                dateOfBirth: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Place of Birth"
            value={astroDetails.placeOfBirth}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                placeOfBirth: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Time of Birth"
            value={astroDetails.timeOfBirth}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                timeOfBirth: e.target.value,
              })
            }
          />
          {/* <InputField
            label="Time of Birth"
            value={astroDetails.timeOfBirth}
            onChange={(value) =>
              setAstroDetails({ ...astroDetails, timeOfBirth: value })
            }
            required
            placeholder="Enter Time of Birth"
          /> */}
          <input
            type="text"
            placeholder="Rashi"
            value={astroDetails.rashi}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                rashi: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Nakshatra"
            value={astroDetails.nakshatra}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                nakshatra: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Gotra"
            value={astroDetails.gotra}
            onChange={(e) =>
              setAstroDetails({
                ...astroDetails,
                gotra: e.target.value,
              })
            }
            required
          />
          <button
            type="button"
            className="btn btn-success"
            onClick={handlePrevious}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Education Details</h2>
          <input
            type="text"
            placeholder="Degree"
            value={educationDetails.degree}
            onChange={(e) =>
              setEducationDetails({
                ...educationDetails,
                degree: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="College Name"
            value={educationDetails.collegeName}
            onChange={(e) =>
              setEducationDetails({
                ...educationDetails,
                collegeName: e.target.value,
              })
            }
            required
          />

          <button type="button" onClick={handlePrevious}>
            Back
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2>Career Details</h2>

          <select
            value={careerDetails.employedIn}
            onChange={(e) =>
              setCareerDetails({
                ...careerDetails,
                employedIn: e.target.value,
              })
            }
            required
          >
            <option value="">Select Employment Type</option>
            <option value="Government/PSU">Government/PSU</option>
            <option value="Defence">Defence</option>
            <option value="Private">Private</option>
            <option value="Business">Business</option>
            <option value="Self Employed">Self Employed</option>
            <option value="Not Working">Not Working</option>
          </select>

          <input
            type="text"
            placeholder="Company Name"
            value={careerDetails.companyName}
            onChange={(e) =>
              setCareerDetails({
                ...careerDetails,
                companyName: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Designation"
            value={careerDetails.designation}
            onChange={(e) =>
              setCareerDetails({
                ...careerDetails,
                designation: e.target.value,
              })
            }
            required
          />

          <select
            value={careerDetails.income}
            onChange={(e) =>
              setCareerDetails({ ...careerDetails, income: e.target.value })
            }
            required
          >
            <option value="">Select Income Range</option>
            <option value="0-2 LPA">0-2 LPA</option>
            <option value="2-4 LPA">2-4 LPA</option>
            <option value="4-7 LPA">4-7 LPA</option>
            <option value="7-10 LPA">7-10 LPA</option>
            <option value="10-15 LPA">10-15 LPA</option>
            <option value="15-20 LPA">15-20 LPA</option>
            <option value="20-25 LPA">20-25 LPA</option>
            <option value="more than 25 LPA">more than 25 LPA</option>
          </select>
          <button type="button" onClick={handlePrevious}>
            Back
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 6 && (
        <div>
          <h2>Family Details</h2>
          <input
            type="text"
            placeholder="Father's Name"
            value={familyDetails.fatherName}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                fatherName: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Mother's Name"
            value={familyDetails.motherName}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                motherName: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Father's Occupation"
            value={familyDetails.fatherOccupation}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                fatherOccupation: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Mother's Occupation"
            value={familyDetails.motherOccupation}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                motherOccupation: e.target.value,
              })
            }
            required
          />
          <input
            type="number"
            placeholder="Number of Brothers"
            value={familyDetails.noOfBrothers}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                noOfBrothers: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Number of Sisters"
            value={familyDetails.noOfSisters}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                noOfSisters: e.target.value,
              })
            }
          />
          <button type="button" onClick={handlePrevious}>
            Back
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 7 && (
        <div>
          <h2>Lifestyle</h2>
          <select
            value={lifestyle.diet}
            onChange={(e) =>
              setLifestyle({ ...lifestyle, diet: e.target.value })
            }
            required
          >
            <option value="">Select Diet</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="jain">Jain</option>
            <option value="vegan">Vegan</option>
            <option value="occasionallyNon-Veg">Occasionally Non-Veg</option>
          </select>
          <button type="button" onClick={handlePrevious}>
            Back
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 8 && (
        <div>
          <h2>Contact Information</h2>

          <input
            type="text"
            placeholder="Contact Number"
            value={contactInformation.contactNumber}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                contactNumber: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Country"
            value={contactInformation.address.country}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                address: {
                  ...contactInformation.address,
                  country: e.target.value,
                },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="State"
            value={contactInformation.address.state}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                address: {
                  ...contactInformation.address,
                  state: e.target.value,
                },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="District"
            value={contactInformation.address.district}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                address: {
                  ...contactInformation.address,
                  district: e.target.value,
                },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Residential Address"
            value={contactInformation.address.residentialAddress}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                address: {
                  ...contactInformation.address,
                  residentialAddress: e.target.value,
                },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Permanent Address"
            value={contactInformation.address.permanentAddress}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                address: {
                  ...contactInformation.address,
                  permanentAddress: e.target.value,
                },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="LinkedIn URL"
            value={contactInformation.linkedInUrl}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                linkedInUrl: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Instagram URL"
            value={contactInformation.instagramUrl}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                instagramUrl: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Facebook URL"
            value={contactInformation.facebookUrl}
            onChange={(e) =>
              setContactInformation({
                ...contactInformation,
                facebookUrl: e.target.value,
              })
            }
          />

          <button type="button" onClick={handlePrevious}>
            Back
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 9 && (
        <div>
          <h3>Profile Images</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e, "profileImages")}
          />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {imagePreviews.profileImages.map((image, index) => (
              <div key={index} style={{ position: "relative", margin: "5px" }}>
                <img
                  src={image}
                  alt="Profile Preview"
                  style={{ width: "100px", height: "100px" }}
                />
                <button
                  //onClick={() => removeImage("profileImages", index)}
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={handlePrevious}>
            Back
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 10 && (
        <div>
          <h3>Kundali Images</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e, "kundaliImages")}
          />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {imagePreviews.kundaliImages.map((image, index) => (
              <div key={index} style={{ position: "relative", margin: "5px" }}>
                <img
                  src={image}
                  alt="Kundali Preview"
                  style={{ width: "100px", height: "100px" }}
                />
                <button
                  //onClick={() => removeImage("kundaliImages", index)}
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={handlePrevious}>
            Back
          </button>
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  );
};

export default MultiStepForm;
