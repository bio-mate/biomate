// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Assuming a successful response has a status code of 200
      if (response.status === 200) {
        setMessage('Signup successful! Please log in.');
      }
    } catch (error) {
      handleError(error);
    }
  };
  
  const handleError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setMessage(error.response.data.message || 'An error occurred during signup.');
    } else if (error.request) {
      // The request was made but no response was received
      setMessage('No response received from the server.');
    } else {
      // Something happened in setting up the request that triggered an Error
      setMessage('Error: ' + error.message);
    }
  };
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
