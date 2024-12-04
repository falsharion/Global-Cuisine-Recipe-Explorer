import React from 'react'
import nostatspic from "../../assets/nostate.png";
import { useNavigate } from "react-router-dom";

const Nostats = () => {
    const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 bg-gray-50">
      <img
          src={nostatspic}
          alt="signup Illustration"
          className=" max-w-xs"
        />


      <h2 className="text-xl font-semibold text-gray-800">There are no recipe here!</h2>
      <p className="text-sm text-gray-600 mb-6">click on a recipe to see the info</p>

      <button
      onClick={handleBackClick}
      className={`px-4 py-2 rounded-full bg-[#8a76db] text-white hover:bg-white hover:text-black transition shadow`}
    >
      ← Back
    </button>
      </div>
  )
}

export default Nostats
