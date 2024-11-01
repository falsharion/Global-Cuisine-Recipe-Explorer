import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiHome4Line, RiHome5Fill } from 'react-icons/ri';
import { IoReader, IoReaderOutline } from "react-icons/io5";
import { AiFillPieChart, AiOutlinePieChart } from "react-icons/ai";
import { FaRegUser, FaUserAlt } from "react-icons/fa";

const NavItem = ({ to, label, ActiveIcon, InactiveIcon }) => (
  <NavLink 
    to={to} 
    end 
    className={({ isActive }) => 
      `text-center text-2xl flex flex-col items-center ${isActive ? 'text-[#6572bb]' : 'text-[#c9c8c8]'}`
    }
  >
    {({ isActive }) => (
      <>
        {isActive ? <ActiveIcon /> : <InactiveIcon />}
        <span className="text-xs mt-1">{label}</span>
      </>
    )}
  </NavLink>
);

const Navbar = () => {
  return (
    <nav className=" z-40 fixed bottom-0 left-0 w-full p-4 border-t rounded-t-2xl text-center shadow-[8px_-2px_20px_9px_rgba(2,0,24,0.06)]">
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
        <NavItem 
          to="/profile" 
          label="Profile" 
          ActiveIcon={FaUserAlt} 
          InactiveIcon={FaRegUser} 
        />
      </div>
    </nav>
  );
};

export default Navbar;


