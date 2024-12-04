// components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-full overflow:hidden scrollbar-hide">
      <main className="z-0 overflow-y-auto pb-12 bg-[#f6f3fb] h-screen">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;
