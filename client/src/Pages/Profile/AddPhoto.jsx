// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import apiRequest from "../../utils/api";
// import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";
// import CustomButton from "../../Atoms/CustomButton";
// import ProgressBar from "../../Atoms/ProgressBar";
// import PhotoUpload from "../../Atoms/PhotoUpload";
// import UserPreviewPage from "./UserPreviewPage";

// const AddPhoto = () => {
//   const [step, setStep] = useState(1); // Start at step 1 for profile images
//   const [imagePreviews, setImagePreviews] = useState({
//     profileImages: [],
//     kundaliImages: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const titles = ["Upload Profile Images", "Upload Kundali Images", "Preview"];

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Any necessary fetching can be added here, if required
//     setLoading(false); // Set loading to false once fetching is done
//   }, []);

//   const handleNext = () => {
//     if (step < 3) {
//       setStep(step + 1);
//     } else {
//       handleSubmit();
//     }
//   };

//   const handlePrevious = () => {
//     if (step > 1) {
//       setStep(step - 1);
//     }
//   };

//   const handleBack =()=>{
//     navigate('/profile')
//   }

//   const handleSubmit = async () => {
//     const formData = new FormData();

//     // Append profile images
//     imagePreviews.profileImages.forEach((file) => {
//       formData.append("profileImages", file);
//     });

//     // Append kundali images
//     imagePreviews.kundaliImages.forEach((file) => {
//       formData.append("kundaliImages", file);
//     });

//     try {
//       const response = await apiRequest(
//         "POST",
//         "http://localhost:4000/api/profile/addProfile",
//         formData,
//         {
//           "Content-Type": "multipart/form-data",
//         }
//       );
//       if (response.status === 201) {
//         console.log(response.data.message);
//         // Navigate or show a success message
//         navigate(`/view-profile/${uuidv4()}`); // Adjust this as necessary
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const handleImageUpload = (newImage) => {
//     setImagePreviews((prev) => ({
//       ...prev,
//       profileImages: [...prev.profileImages, newImage],
//     }));
//   };

//   const handleKundaliUpload = (image) => {
//     setImagePreviews((prev) => ({
//       ...prev,
//       kundaliImages: [...prev.kundaliImages, image],
//     }));
//   };

//   return (
//     <form onSubmit={(e) => e.preventDefault()} enctype="multipart/form-data">
//       {step === 1 && (
//         <div>
//           <ProgressBar currentStep={step} titles={titles} />
//           <h3>Profile Images (At least 1 required)</h3>
//           <div style={{ display: "flex", flexWrap: "wrap" }}>
//             {Array.from({ length: 5 }).map((_, index) => (
//               <PhotoUpload
//                 key={index}
//                 onUpload={handleImageUpload}
//               />
//             ))}
//           </div>
//           <CustomButton
//             label="Back"
//             onClick={handleBack}
//             type="secondary"
//           />
//           <CustomButton
//             label="Next"
//             type="primary"
//             onClick={handleNext}
//             disabled={imagePreviews.profileImages.length < 1}
//           />
//         </div>
//       )}

//       {step === 2 && ( // Step for Kundali upload
//         <div>
//           <ProgressBar currentStep={step} titles={titles} />
//           <h3>Kundali Images (At least 1 required)</h3>
//           <div style={{ display: "flex", flexWrap: "wrap" }}>
//             {Array.from({ length: 5 }).map((_, index) => (
//               <PhotoUpload
//                 key={index}
//                 onUpload={handleKundaliUpload}
//               />
//             ))}
//           </div>
//           <CustomButton
//             label="Back"
//             onClick={handlePrevious}
//             type="secondary"
//           />
//           <CustomButton
//             label="Next"
//             type="primary"
//             onClick={handleNext}
//             disabled={imagePreviews.kundaliImages.length < 1}
//           />
//         </div>
//       )}

//       {step === 3 && (
//         <div>
//           <ProgressBar currentStep={step} titles={titles} />
//           <h3>Preview</h3>
//           <UserPreviewPage imagePreviews={imagePreviews} /> {/* Pass image previews to preview component */}
//           <CustomButton
//             label="Back"
//             onClick={handlePrevious}
//             type="secondary"
//           />
//           <CustomButton
//             label="Submit"
//             type="primary"
//             onClick={handleSubmit}
//           />
//         </div>
//       )}
//     </form>
//   );
// };

// export default AddPhoto;
