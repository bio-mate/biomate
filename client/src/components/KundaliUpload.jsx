import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../styles/PhotoUpload.css'; // Adjust the path as needed

const KundaliUpload = ({ profileId = "670b75e996c492112cd0a675", onUpload }) => {
  const [image, setImage] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`http://localhost:4000/api/profile/${profileId}/uploadKundaliImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        const uploadedImage = response.data.profile.kundaliImages[response.data.profile.kundaliImages.length - 1];
        setImage(uploadedImage); // Get the newly uploaded image
        onUpload(); // Trigger parent component to refresh images
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = async () => {
    if (!image) return; // Prevent errors if no image is selected

    try {
      const response = await axios.delete(`http://localhost:4000/api/profile/${profileId}/deleteKundaliImage/${image._id}`);
      if (response.status === 200) {
        setImage(null); // Clear the image from state
        onUpload(); // Trigger parent component to refresh images
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div id="photo-upload-container" className="photo-upload-container">
      {image ? (
        <div className="photo-preview">
          <img src={image.imageUrl} alt="Uploaded" className="uploaded-image" />
          <button onClick={handleDelete} className="cancel-button">X</button>
        </div>
      ) : (
        <label className="photo-upload-box">
          <input 
            type="file" 
            onChange={handleUpload} 
            accept="image/*" 
            className="photo-upload-input" 
            style={{ display: 'none' }} // Hide the default file input
          />
          <div className="plus-icon">+</div>
          <div className="size-limit-text">Max size: 5MB</div>
        </label>
      )}
    </div>
  );
};

KundaliUpload.propTypes = {
  profileId: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default KundaliUpload;
