import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import ProfileCard from "../../components/ProfileCard";

const ViewProfile = ({ edit = true }) => {
  const { user } = useAuth(); // Get the logged-in user from context
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("user", user);
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/profile/viewProfile"
        );
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
    return <div>Loading profiles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Profiles</h2>
      {!profiles && profiles.length === 0 ? (
        <p>No profiles available.</p>
      ) : (
        profiles.map((profile) => (
          <div
            key={profile.userId}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <ProfileCard
              userId = "6708b08886ad31e623c612df"
                isPreview={edit}
                name={`${profile.personalDetails?.firstName || "N/A"} ${
                  profile.personalDetails?.lastName || "N/A"
                }`} 
                age={profile.personalDetails?.age || "N/A"}
                location={`${profile.personalDetails?.District || "N/A"}, ${
                  profile.personalDetails?.State || "N/A"
                }, ${profile.personalDetails?.Country || "N/A"}`}
                profession={profile.personalDetails?.Desiganation || "N/A"}
                company={profile.personalDetails?.CompanyName || "N/A"}
                //images={photos} // Use the fetched images here
                facebookUrl={profile.personalDetails?.FacebookUrl}
                instagramUrl={profile.personalDetails?.InstagramUrl}
                linkedInUrl={profile.personalDetails?.LinkedInUrl}
              />
            </div>

            <h3>
              {profile.personalDetails?.firstName || "N/A"}{" "}
              {profile.personalDetails?.lastName || "N/A"}
            </h3>
            <p>Age: {profile.personalDetails?.age || "N/A"}</p>
            <p>Gender: {profile.personalDetails?.gender || "N/A"}</p>
            <p>Blood Group: {profile.personalDetails?.bloodGroup || "N/A"}</p>
            <p>Height: {profile.personalDetails?.height || "N/A"}</p>
            <p>Weight: {profile.personalDetails?.weight || "N/A"}</p>

            <h4>Address</h4>
            <p>
              {profile.contactInformation?.address.residentialAddress || "N/A"},{" "}
              {profile.contactInformation?.address.city || "N/A"},{" "}
              {profile.contactInformation?.address.state || "N/A"},{" "}
              {profile.contactInformation?.address.country || "N/A"}
            </p>

            <h4>Career</h4>
            {profile.careerDetails && profile.careerDetails.length > 0 ? (
              profile.careerDetails.map((career, index) => (
                <div key={index}>
                  <p>Employed In: {career.employedIn || "N/A"}</p>
                  <p>Company Name: {career.companyName || "N/A"}</p>
                  <p>Designation: {career.designation || "N/A"}</p>
                  <p>Income: {career.income || "N/A"}</p>
                </div>
              ))
            ) : (
              <p>No career details listed.</p>
            )}

            <h4>Lifestyle</h4>
            <p>Diet: {profile.lifestyle?.diet || "N/A"}</p>

            {edit ? (
              <Link to={`/edit-profile/670a7ed298b8c120621d87a0`}>
                <button>Edit</button>
              </Link>
            ) : (
              ""
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewProfile;
