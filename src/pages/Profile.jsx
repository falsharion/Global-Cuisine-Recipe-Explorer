// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [timeoutId, setTimeoutId] = useState(null);

//   // Replace "your-secure-password" with actual password retrieval logic if needed
//   const password = "your-secure-password";

//   const handleShowPassword = () => {
//     setShowPassword(true);

//     // Hide the password after 10 seconds
//     const id = setTimeout(() => {
//       setShowPassword(false);
//     }, 10000); // 10 seconds in milliseconds
//     setTimeoutId(id);
//   };

//   const handleHidePassword = () => {
//     setShowPassword(false);

//     // Clear the timeout if the user manually hides the password
//     if (timeoutId) clearTimeout(timeoutId);
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/auth"); // Redirect to the authentication page
//     } catch (error) {
//       console.error("Failed to log out:", error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
      
//       {/* Email */}
//       <div className="mb-4">
//         <p className="text-lg text-gray-700">
//           <strong>Email:</strong> {currentUser?.email || "Not available"}
//         </p>
//       </div>

//       {/* Username */}
//       <div className="mb-4">
//         <p className="text-lg text-gray-700">
//           <strong>Username:</strong> {currentUser?.displayName || "Your Username"}
//         </p>
//       </div>

//       {/* Password */}
//       <div className="mb-4">
//         <p className="text-lg text-gray-700">
//           <strong>Password:</strong>{" "}
//           {showPassword ? (
//             <span>{password}</span>
//           ) : (
//             <span>{"*".repeat(password.length)}</span>
//           )}
//         </p>
//         <button
//           onClick={showPassword ? handleHidePassword : handleShowPassword}
//           className="text-sm text-blue-500 hover:underline focus:outline-none"
//         >
//           {showPassword ? "Hide Password" : "Show Password"}
//         </button>
//       </div>

//       {/* Logout */}
//       <button
//         onClick={handleLogout}
//         className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
//       >
//         Log Out
//       </button>
//     </div>
//   );
// };

// export default Profile;
