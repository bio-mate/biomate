import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/profile/viewProfile');
        setProfiles(response.data);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError('Could not fetch profiles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleEdit = (profileId) => {
    navigate(`/edit-profile/${profileId}`); // Navigate with profile ID in the URL
  };

  if (loading) {
    return <div>Loading profiles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Profiles</h2>
      {profiles.length === 0 ? (
        <p>No profiles available.</p>
      ) : (
        profiles.map((profile) => (
          <div key={profile._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>
              {profile.personalDetails.firstName} {profile.personalDetails.lastName}
            </h3>
            <p>Email: {profile.personalDetails.email || 'N/A'}</p>
            <p>Mobile: {profile.personalDetails.mobile || 'N/A'}</p>

            <h4>Education</h4>
            {profile.educationDetails.length > 0 ? (
              profile.educationDetails.map((edu, index) => (
                <div key={index}>
                  <p>Degree: {edu.degree || 'N/A'}</p>
                  <p>Institution: {edu.institution || 'N/A'}</p>
                  <p>Start Date: {edu.startDate ? new Date(edu.startDate).toLocaleDateString() : 'N/A'}</p>
                  <p>End Date: {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}</p>
                </div>
              ))
            ) : (
              <p>No education details available.</p>
            )}

            <h4>Skills</h4>
            <p>{profile.skills && profile.skills.length > 0 ? profile.skills.join(', ') : 'No skills listed.'}</p>

            <h4>Experience</h4>
            {profile.experience && profile.experience.length > 0 ? (
              profile.experience.map((exp, index) => (
                <div key={index}>
                  <p>Job Title: {exp.jobTitle || 'N/A'}</p>
                  <p>Company: {exp.company || 'N/A'}</p>
                  <p>Start Date: {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : 'N/A'}</p>
                  <p>End Date: {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                  <p>Responsibilities: {exp.responsibilities || 'N/A'}</p>
                </div>
              ))
            ) : (
              <p>No experience listed.</p>
            )}

            {/* Edit Button */}
            <button onClick={() => handleEdit(profile._id)}>Edit</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileList;
