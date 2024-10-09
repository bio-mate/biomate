// MultiStepForm.js
import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [educationDetails, setEducationDetails] = useState({
    degree: "",
    institution: "",
    yearOfPassing: "",
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/addProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ personalDetails, educationDetails }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <div>
          <h2>Personal Details</h2>
          <input
            type="text"
            placeholder="Name"
            value={personalDetails.name}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={personalDetails.email}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Mobile"
            value={personalDetails.mobile}
            onChange={(e) =>
              setPersonalDetails({ ...personalDetails, mobile: e.target.value })
            }
            required
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
              setEducationDetails({
                ...educationDetails,
                degree: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Institution"
            value={educationDetails.institution}
            onChange={(e) =>
              setEducationDetails({
                ...educationDetails,
                institution: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Year of Passing"
            value={educationDetails.yearOfPassing}
            onChange={(e) =>
              setEducationDetails({
                ...educationDetails,
                yearOfPassing: e.target.value,
              })
            }
            required
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
