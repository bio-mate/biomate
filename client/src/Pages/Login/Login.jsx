// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import apiRequest from '../../utils/api'
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:4000/api/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Assuming a successful response has a status code of 200
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token); // Save token
      setMessage('Login successful!');
    }
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    setMessage(error.response.data.message || 'An error occurred during login.');
  } else if (error.request) {
    // The request was made but no response was received
    setMessage('No response received from the server.');
  } else {
    // Something happened in setting up the request that triggered an Error
    setMessage('Error: ' + error.message);
  }
};

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await apiRequest("POST", "http://localhost:4000/api/auth/login", {
//       credentials,
//     });

//     if (response.status === 200) {
//       console.log(response.data.message);
//     }
//   } catch (error) {
//     // Error already handled in apiRequest
//   }
// };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
