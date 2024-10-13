import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PhotoUpload.css'; // Adjust the path as needed

const PhotoUpload = ({ onUpload }) => {
  return (
    <div id="photo-upload-container" className="photo-upload-container">
      <div className="photo-upload-box" onClick={onUpload}>
        <div className="plus-icon">+</div>
        <div className="size-limit-text">Max size: 5MB</div>
      </div>
      {/* You can add more boxes or upload images dynamically here */}
    </div>
  );
};

PhotoUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default PhotoUpload;
