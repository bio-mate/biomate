import React, { useState } from "react";
import axios from 'axios';
import apiRequest from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(""); // User ID field
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });
  const [educationDetails, setEducationDetails] = useState({
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    grade: "",
  });
  const [skills, setSkills] = useState(""); // Comma-separated skills
  const [experience, setExperience] = useState({
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
  });
const navigate = useNavigate()
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: uuidv4(), // Generates a unique ID
      personalDetails,
      educationDetails: [educationDetails], // Wrap education details in an array
      skills: skills.split(',').map(skill => skill.trim()), // Convert comma-separated skills into an array
      experience: experience.jobTitle ? [experience] : [], // Only include experience if jobTitle is provided
    };

    try {
      const response = await apiRequest("POST", "http://localhost:4000/api/profile/addProfile", payload);
      if (response.status === 201) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    navigate(`/view-profile/${userId}`)
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
              setPersonalDetails({ ...personalDetails, firstName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={personalDetails.lastName}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, lastName: e.target.value })
            }
            required
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={personalDetails.dateOfBirth}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, dateOfBirth: e.target.value })
            }
          />
          <select
            value={personalDetails.gender}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <h3>Address</h3>
          <input
            type="text"
            placeholder="Street"
            value={personalDetails.address.street}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                address: { ...personalDetails.address, street: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="City"
            value={personalDetails.address.city}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                address: { ...personalDetails.address, city: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="State"
            value={personalDetails.address.state}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                address: { ...personalDetails.address, state: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Country"
            value={personalDetails.address.country}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                address: { ...personalDetails.address, country: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Zip Code"
            value={personalDetails.address.zipCode}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                address: { ...personalDetails.address, zipCode: e.target.value },
              })
            }
          />
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Education Details</h2>
          <input
            type="text"
            placeholder="Degree"
            value={educationDetails.degree}
            onChange={(e) =>
              setEducationDetails({ ...educationDetails, degree: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Institution"
            value={educationDetails.institution}
            onChange={(e) =>
              setEducationDetails({ ...educationDetails, institution: e.target.value })
            }
            required
          />
          <input
            type="date"
            placeholder="Start Date"
            value={educationDetails.startDate}
            onChange={(e) =>
              setEducationDetails({ ...educationDetails, startDate: e.target.value })
            }
            required
          />
          <input
            type="date"
            placeholder="End Date"
            value={educationDetails.endDate}
            onChange={(e) =>
              setEducationDetails({ ...educationDetails, endDate: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Grade"
            value={educationDetails.grade}
            onChange={(e) =>
              setEducationDetails({ ...educationDetails, grade: e.target.value })
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

      {step === 3 && (
        <div>
          <h2>Skills</h2>
          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <button type="button" onClick={handlePrevious}>
            Back
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Experience</h2>
          <input
            type="text"
            placeholder="Job Title"
            value={experience.jobTitle}
            onChange={(e) =>
              setExperience({ ...experience, jobTitle: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Company"
            value={experience.company}
            onChange={(e) =>
              setExperience({ ...experience, company: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Start Date"
            value={experience.startDate}
            onChange={(e) =>
              setExperience({ ...experience, startDate: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="End Date"
            value={experience.endDate}
            onChange={(e) =>
              setExperience({ ...experience, endDate: e.target.value })
            }
          />
          <textarea
            placeholder="Responsibilities"
            value={experience.responsibilities}
            onChange={(e) =>
              setExperience({ ...experience, responsibilities: e.target.value })
            }
          />
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
