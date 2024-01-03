"use client"

import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";



const RootLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  

  return (
    <html lang="en">
      <body >
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        <div className={` ${isOpen ? ' ml-[14.10rem]' : 'ml-7'} flex items-center h-10 fixed bg-slate-950 w-full duration-300 ease-in-out`}>
          <p className=' text-white text-md ml-3'>Record name</p>
          <p> </p>
          <p className=' text-white text-md ml-3'>Record number ID</p>

        </div>
        <div className={` ${isOpen ? ' ml-64' : 'ml-10'} duration-300 ease-in-out flex flex-wrap gap-5`}>

        </div>
        <main className={` ${isOpen ? ' ml-64' : 'ml-10'} duration-300 ease-in-out `} >
        {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
