import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiHome4Line, RiHome5Fill } from 'react-icons/ri';
import { IoReader, IoReaderOutline } from "react-icons/io5";
import { AiFillPieChart, AiOutlinePieChart } from "react-icons/ai";


const NavItem = ({ to, label, ActiveIcon, InactiveIcon }) => (
  <NavLink 
    to={to} 
    end 
    className={({ isActive }) => 
      `text-center text-xl flex md:text-4xl flex-col items-center ${isActive ? 'text-[#8d79dc]' : 'text-[#c9c8c8]'}`
    }
  >
    {({ isActive }) => (
      <>
        {isActive ? <ActiveIcon /> : <InactiveIcon />}
        <span className="text-xs md:text-xl mt-1">{label}</span>
      </>
    )}
  </NavLink>
);
// md:py-6  lg:py-8
const Navbar = () => {
  return (
    <nav className=" z-40 fixed  mg bottom-0 left-0 w-full p-2 border-t rounded-t-2xl text-center bg-white shadow-[8px_-2px_20px_9px_rgba(2,0,24,0.06)]">
      <div className="flex justify-around space-x-8">
        <NavItem 
          to="/" 
          label="Home" 
          ActiveIcon={RiHome5Fill} 
          InactiveIcon={RiHome4Line} 
        />
        <NavItem 
          to="/statistics" 
          label="Statistics" 
          ActiveIcon={AiFillPieChart} 
          InactiveIcon={AiOutlinePieChart} 
        />
        <NavItem 
          to="/saved" 
          label="Saved" 
          ActiveIcon={IoReader} 
          InactiveIcon={IoReaderOutline} 
        />
      </div>
    </nav>
  );
};

export default Navbar;


