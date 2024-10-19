import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProfile from "./AddProfile";
import ProfileCard from "../../components/ProfileCard"; // Ensure you import the ProfileCard component
import { FaPlus } from "react-icons/fa"; // Import the plus icon
import useAuth from "../../context/useAuth";
import AddProfileCard from "../../components/AddProfileCard";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth(); // Get the logged-in user from context
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/profile/viewProfile");
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Could not fetch profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading profiles...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  const handleClick =()=>{
    navigate(`/addProfile`)
  }

  return (
    <div className="container my-5">
      <div style={{display:'flex', justifyContent:'space-between'}}>
      <h1 className="text-center mb-4">Profiles</h1>

      <div
        className="cursor-pointer mb-4 d-flex align-items-center justify-content-center bg-blue-500 text-white rounded-pill p-3 shadow btn btn-success"
        onClick={handleClick}
        
      >
        <FaPlus className="mr-2" /> Create New Profile
      </div>
      </div>
      <div className="row">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div className="col-md-4 mb-4" key={profile.userId}>
              <AddProfileCard
                userId={profile.userId || "670be21366eb9770ed8867c1"}
                name={`${profile.personalDetails?.firstName || "N/A"} ${profile.personalDetails?.lastName || "N/A"}`}
                age={profile.personalDetails?.age || "N/A"}
                location={`${profile.contactInformation?.address.district || "N/A"}, ${profile.contactInformation?.address.state || "N/A"}, ${profile.contactInformation?.address.country || "N/A"}`}
                profession={profile.careerDetails?.designation || "N/A"}
                company={profile.careerDetails?.companyName || "N/A"}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No profiles available.</p>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default Profile;
