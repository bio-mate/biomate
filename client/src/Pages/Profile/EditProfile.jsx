// Profile.js
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    degree: '',
    institution: '',
    yearOfPassing: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/viewProfile');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data.message);
      setIsEditing(false); // Exit edit mode after update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>
        <div>
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>
        <div>
          <label>Mobile:</label>
          {isEditing ? (
            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{user.mobile}</span>
          )}
        </div>
        <div>
          <label>Degree:</label>
          {isEditing ? (
            <input
              type="text"
              name="degree"
              value={user.degree}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{user.degree}</span>
          )}
        </div>
        <div>
          <label>Institution:</label>
          {isEditing ? (
            <input
              type="text"
              name="institution"
              value={user.institution}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{user.institution}</span>
          )}
        </div>
        <div>
          <label>Year of Passing:</label>
          {isEditing ? (
            <input
              type="text"
              name="yearOfPassing"
              value={user.yearOfPassing}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{user.yearOfPassing}</span>
          )}
        </div>
        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && <button type="submit">Save</button>}
      </form>
    </div>
  );
};

export default Profile;
