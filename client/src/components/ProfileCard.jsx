import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { Spinner } from "react-bootstrap"; // Import Spinner from Bootstrap
import axios from "axios"; // Import axios for API calls

const ProfileCard = ({ userId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // State for tracking loading
  const [profileData, setProfileData] = useState(null); // State for profile data
  const [preloadedImages, setPreloadedImages] = useState([]); // State for preloaded images

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/viewProfile/${userId}`);
        setProfileData(response.data); // Set profile data in state
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProfileData();
  }, [userId]);

  // Preload images when profile data is available
  useEffect(() => {
    const loadImages = async () => {
      if (profileData && profileData.images && profileData.images.length > 0) {
        const promises = profileData.images.map((imageUrl) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => resolve(imageUrl);
            img.onerror = reject;
          });
        });

        try {
          const loadedImages = await Promise.all(promises);
          setPreloadedImages(loadedImages); // Set preloaded images
        } catch (error) {
          console.error("Error loading images:", error);
        }
      }
    };

    loadImages(); // Call the loadImages function unconditionally
  }, [profileData]); // Depend on profileData

  // If still loading, show spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  // Check if profileData is available
  if (!profileData) {
    return <div>No profile data found.</div>;
  }

  const { name, age, location, profession, company, facebookUrl, instagramUrl, linkedInUrl } = profileData;

  // Functions to handle image navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === preloadedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? preloadedImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
console.log("profileData", profileData)
  return (
    <div className="text-white mb-4" style={{ width: "100%", height: "100vh", position: "relative" }}>
      {preloadedImages.length > 0 && ( // Ensure there are preloaded images to display
        <div
          style={{
            backgroundImage: `url(${preloadedImages[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
            position: "relative",
            transition: "background-image 1s", // Smooth transition effect
          }}
        >
          {/* Overlay for the text at the bottom */}
          <div className="d-flex flex-column justify-content-center p-3 bg-dark bg-opacity-75" style={{ position: "absolute", bottom: "0", left: "0", width: "100%" }}>
            <h2 className="card-title mb-1">{name}, {age}</h2>
            <p className="card-text mb-1">
              <img src="/placeholder.png" width={"20px"} height={"20px"} style={{ margin: "5px" }} alt="location" />
              {location}
            </p>
            <p className="card-text">
              <img src="/office.png" width={"20px"} height={"20px"} style={{ margin: "5px" }} alt="profession" />
              {profession} at {company}
            </p>
            <div className="d-flex">
              {instagramUrl && <img src="/instagram.png" width={"40px"} height={"40px"} style={{ marginRight: "10px" }} alt="Instagram" onClick={() => window.open(instagramUrl, "_blank")} />}
              {facebookUrl && <img src="/facebook.png" width={"40px"} height={"40px"} style={{ marginRight: "10px" }} alt="Facebook" onClick={() => window.open(facebookUrl, "_blank")} />}
              {linkedInUrl && <img src="/linkedin.png" width={"40px"} height={"40px"} style={{ marginRight: "10px" }} alt="LinkedIn" onClick={() => window.open(linkedInUrl, "_blank")} />}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="position-absolute" style={{ top: "50%", right: "10px", fontSize: "30px" }} onClick={handleNext}>
            <IoIosArrowDroprightCircle />
          </div>
          <div className="position-absolute" style={{ top: "50%", left: "10px", fontSize: "30px" }} onClick={handlePrev}>
            <IoIosArrowDropleftCircle />
          </div>

          {/* Dots for navigation */}
          <div className="d-flex justify-content-center" style={{ position: "absolute", bottom: "10px", width: "100%" }}>
            {preloadedImages.map((_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  height: "10px",
                  width: "10px",
                  margin: "0 5px",
                  backgroundColor: currentIndex === index ? "white" : "gray",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
