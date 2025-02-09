import React from "react";
import Typewriter from "typewriter-effect"; 
import foodIcon from "../../assets/foodd.png";
import cutlery from "../../assets/cutleryy.png"

const Banner = () => {
  return (
    <div className="relative mx-6 rounded-2xl  text-white mt-6 h-40  flex items-center justify-between overflow-hidden">
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

    
      <div className="flex flex-col items-start justify-center text-left ml-6">
        <h2 className="text-xl font-bold md:text-3xl lg:text-5xl font-serif ">
          Find your food recipe{""}
          <span className="text-[#e8e4fc] inline text-xl md:text-4xl lg:text-5xl lg:tracking-wider font-bold">
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
      <div className="flex">
      <div className="hidden md:block flex-shrink-0  mr-4 md:mr-7">
  <img 
    src={cutlery} 
    alt="Food Icons" 
    className="w-24 md:w-24   text-white h-32 md:h-28 animate-[spin_3s_linear_infinite]"
  />
</div>
      <div className="flex-shrink-0  mr-4 md:mr-7">
        <img src={foodIcon} alt="Food Icon" className="w-24 md:w-32 md:h-32 h-24" />
      </div></div>
    </div>
  );
};

export default Banner;
