import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { Spinner } from "react-bootstrap"; // Import Spinner from Bootstrap

const KundaliCard = ({
  images,

  isPreview = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // State for tracking loading
  const [preloadedImages, setPreloadedImages] = useState([]); // State for preloaded images

  // Function to preload images
  useEffect(() => {
    const loadImages = async () => {
      const promises = images.map((imageUrl) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => resolve(imageUrl);
          img.onerror = reject;
        });
      });

      try {
        const loadedImages = await Promise.all(promises);
        setPreloadedImages(loadedImages);
        setLoading(false); // Once all images are loaded, stop showing the spinner
      } catch (error) {
        console.error("Error loading images:", error);
        setLoading(false);
      }
    };

    loadImages();
  }, [images]);

  // Function to go to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === preloadedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? preloadedImages.length - 1 : prevIndex - 1
    );
  };

  // Function to go to a specific image
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentPath = window.location.pathname; // Get the current path from window
  const shareUrl = currentPath; // Replace with your actual URL
  const shareText = "Check this out!";

  return (
    <div
      className="text-white mb-4"
      style={{ width: "100%", position: "relative" }}
    >
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="light" />{" "}
          {/* Display the spinner while loading */}
        </div>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url(${preloadedImages[currentIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "500px",
              position: "relative",
              transition: "background-image 1s", // Smooth transition effect
            }}
          >
            {/* Navigation Buttons */}
            <div
              className="position-absolute"
              style={{ top: "50%", right: "10px", fontSize: "30px" }}
              onClick={handleNext}
            >
              <IoIosArrowDroprightCircle />
            </div>
            <div
              className="position-absolute"
              style={{ top: "50%", left: "10px", fontSize: "30px" }}
              onClick={handlePrev}
            >
              <IoIosArrowDropleftCircle />
            </div>

            {/* Dots for navigation */}
            <div
              className="d-flex justify-content-center"
              style={{ position: "absolute", bottom: "10px", width: "100%" }}
            >
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
        </>
      )}
    </div>
  );
};

export default KundaliCard;
