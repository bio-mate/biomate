// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Login/Signup';
import Login from './Pages/Login/Login';
import ForgotPassword from './Pages/Login/ForgotPassword';
import ResetPassword from './Pages/Login/ResetPassword';
import Home from './Pages/Home';
import EditProfileForm from './Pages/Profile/EditProfile';
import ProfileList from './Pages/Profile/ViewProfile';
import MultiStepForm from './Pages/Profile/AddProfile';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/addProfile" element={<MultiStepForm />} />
          <Route path="/view-profile" element={<ProfileList />} />
          <Route path="/view-profile/:id" element={<ProfileList />} />
          <Route path="/edit-profile/:id" element={<EditProfileForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
