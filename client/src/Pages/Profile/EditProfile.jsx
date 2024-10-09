import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfileForm = () => {
  const { id } = useParams(); // Get the profile ID from the URL
  console.log('id', id)
  const navigate = useNavigate(); // For navigation after submission
  const [formData, setFormData] = useState({
    userId: '',
    personalDetails: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
    },
    educationDetails: [],
    skills: [],
    experience: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/viewProfile/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/profile/updateProfile/${id}`, formData);
      navigate(`/view-profile/${id}`); // Redirect after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>

      <h4>Personal Details</h4>
      <input
        type="text"
        name="firstName"
        value={formData.personalDetails.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.personalDetails.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="date"
        name="dateOfBirth"
        value={formData.personalDetails.dateOfBirth.split('T')[0]} // Format for input
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        value={formData.personalDetails.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <h5>Address</h5>
      <input
        type="text"
        name="street"
        value={formData.personalDetails.address.street}
        onChange={(e) => handleChange({ target: { name: 'address.street', value: e.target.value } })}
        placeholder="Street"
      />
      <input
        type="text"
        name="city"
        value={formData.personalDetails.address.city}
        onChange={(e) => handleChange({ target: { name: 'address.city', value: e.target.value } })}
        placeholder="City"
      />
      <input
        type="text"
        name="state"
        value={formData.personalDetails.address.state}
        onChange={(e) => handleChange({ target: { name: 'address.state', value: e.target.value } })}
        placeholder="State"
      />
      <input
        type="text"
        name="country"
        value={formData.personalDetails.address.country}
        onChange={(e) => handleChange({ target: { name: 'address.country', value: e.target.value } })}
        placeholder="Country"
      />
      <input
        type="text"
        name="zipCode"
        value={formData.personalDetails.address.zipCode}
        onChange={(e) => handleChange({ target: { name: 'address.zipCode', value: e.target.value } })}
        placeholder="Zip Code"
      />

      <h4>Education Details</h4>
      {formData.educationDetails.map((edu, index) => (
        <div key={index}>
          <input
            type="text"
            name={`degree_${index}`}
            value={edu.degree}
            onChange={(e) => {
              const updatedEdu = [...formData.educationDetails];
              updatedEdu[index].degree = e.target.value;
              setFormData({ ...formData, educationDetails: updatedEdu });
            }}
            placeholder="Degree"
          />
          <input
            type="text"
            name={`institution_${index}`}
            value={edu.institution}
            onChange={(e) => {
              const updatedEdu = [...formData.educationDetails];
              updatedEdu[index].institution = e.target.value;
              setFormData({ ...formData, educationDetails: updatedEdu });
            }}
            placeholder="Institution"
          />
          <input
            type="date"
            name={`startDate_${index}`}
            value={edu.startDate.split('T')[0]}
            onChange={(e) => {
              const updatedEdu = [...formData.educationDetails];
              updatedEdu[index].startDate = e.target.value;
              setFormData({ ...formData, educationDetails: updatedEdu });
            }}
          />
          <input
            type="date"
            name={`endDate_${index}`}
            value={edu.endDate ? edu.endDate.split('T')[0] : ''}
            onChange={(e) => {
              const updatedEdu = [...formData.educationDetails];
              updatedEdu[index].endDate = e.target.value;
              setFormData({ ...formData, educationDetails: updatedEdu });
            }}
          />
        </div>
      ))}
      {/* Optionally, you could add a button to add more education fields */}

      <h4>Skills</h4>
      <input
        type="text"
        value={formData.skills.join(', ')}
        onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(skill => skill.trim()) })}
        placeholder="Enter skills separated by commas"
      />

      <h4>Experience</h4>
      {formData.experience.map((exp, index) => (
        <div key={index}>
          <input
            type="text"
            name={`jobTitle_${index}`}
            value={exp.jobTitle}
            onChange={(e) => {
              const updatedExp = [...formData.experience];
              updatedExp[index].jobTitle = e.target.value;
              setFormData({ ...formData, experience: updatedExp });
            }}
            placeholder="Job Title"
          />
          <input
            type="text"
            name={`company_${index}`}
            value={exp.company}
            onChange={(e) => {
              const updatedExp = [...formData.experience];
              updatedExp[index].company = e.target.value;
              setFormData({ ...formData, experience: updatedExp });
            }}
            placeholder="Company"
          />
          <input
            type="date"
            name={`expStartDate_${index}`}
            value={exp.startDate.split('T')[0]}
            onChange={(e) => {
              const updatedExp = [...formData.experience];
              updatedExp[index].startDate = e.target.value;
              setFormData({ ...formData, experience: updatedExp });
            }}
          />
          <input
            type="date"
            name={`expEndDate_${index}`}
            value={exp.endDate ? exp.endDate.split('T')[0] : ''}
            onChange={(e) => {
              const updatedExp = [...formData.experience];
              updatedExp[index].endDate = e.target.value;
              setFormData({ ...formData, experience: updatedExp });
            }}
          />
          <input
            type="text"
            name={`responsibilities_${index}`}
            value={exp.responsibilities}
            onChange={(e) => {
              const updatedExp = [...formData.experience];
              updatedExp[index].responsibilities = e.target.value;
              setFormData({ ...formData, experience: updatedExp });
            }}
            placeholder="Responsibilities"
          />
        </div>
      ))}
      {/* Optionally, you could add a button to add more experience fields */}

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfileForm;
