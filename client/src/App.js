// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Login/Signup";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import ResetPassword from "./Pages/Login/ResetPassword";
import Home from "./Pages/Home";
import EditProfileForm from "./Pages/Profile/EditProfile";
import ProfileList from "./Pages/Profile/ViewProfile";
import MultiStepForm from "./Pages/Profile/AddProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./Pages/Profile/EditProfile";
import ViewProfile from "./Pages/Profile/ViewProfile";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/home" element={<ProtectedRoute component={Home} />} />
          <Route
            path="/addProfile"
            element={<ProtectedRoute component={MultiStepForm} />}
          />
          {/* <Route
            path="/edit-profile/:id"
            element={<ProtectedRoute component={UpdateProfile} />}
          /> */}
          <Route path="/edit-profile/:id" element={<UpdateProfile />} />
          <Route path="/view-profile" element={<ViewProfile />} />
          <Route path="/view-profile/:id" element={<ViewProfile edit={true} />} />
          <Route path="/user-profile/:id" element={<ViewProfile edit={false} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
