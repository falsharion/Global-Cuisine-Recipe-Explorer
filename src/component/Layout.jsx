
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// import DesktopWarning from './DesktopWarning';

const Layout = () => {
  return ( 
    <div>
    {/* <DesktopWarning /> */}
    <div className="flex flex-col h-full">
      <main className="z-0 overflow-y-auto pb-12 bg-slate-100 h-screen">
        <Outlet />
      </main>
      <Navbar />
    </div></div>
  );
};

export default Layout;