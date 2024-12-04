import React from "react";
import Typewriter from "typewriter-effect"; // Install this package using: npm install typewriter-effect
import foodIcon from "../../assets/foodd.png";

const Banner = () => {
  return (
    <div className="relative mx-6 rounded-2xl text-white mt-6 h-40 flex items-center justify-between overflow-hidden">
      {/* Background Blurred Circles */}
      <div className="absolute inset-0 -z-10 flex justify-center bg-[#8a76db] items-center">
        <div
          className="absolute w-48 h-48 bg-[#ffbcc8] rounded-full opacity-50 blur-xl"
          style={{ top: "50%", left: "60%" }}
        ></div>
        <div
          className="absolute w-40 h-40 bg-[#c3d4f1] rounded-full opacity-50 blur-xl"
          style={{ top: "5%", left: "80%" }}
        ></div>
        <div
          className="absolute w-32 h-32 bg-[#eecdff] rounded-full opacity-[.7] blur-lg"
          style={{ top: "70%", left: "30%" }}
        ></div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-start justify-center text-left ml-6">
        <h2 className="text-xl font-bold">
          Find your food recipe{""}
          <span className="text-[#e8e4fc] inline text-xl font-bold">
            <Typewriter
              options={{
                strings: ["Easily", "Simply", "Faster"],
                autoStart: true,
                loop: true,
                delay: 75,
              }}
            />
          </span>
        </h2>
      </div>

      {/* Food Icon */}
      <div className="flex-shrink-0 mr-4">
        <img src={foodIcon} alt="Food Icon" className="w-24 h-24" />
      </div>
    </div>
  );
};

export default Banner;
