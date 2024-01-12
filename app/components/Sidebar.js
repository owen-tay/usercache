"use client";

import React from "react";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { FaHome, FaSearch, FaAddressCard, FaUserAlt    } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ isOpen, toggleSidebar, onAddRecordClick }) => {
  return (
    <div
      className={` w-40 md:w-52 h-full flex justify-evenly shadow-slate-600 bg-primary fixed text-white  ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <nav>
        <Link href="/" className="flex  items-center justify-center">
          <div className="flex justify-items-center mt-4">
            <Image
              src="/logo.SVG"
              width={40}
              height={40}
              alt="Logo"
            />
            <h1 className="flex items-center text-xl">UserCache</h1>
          </div>
        </Link>
        <div className="flex flex-col gap-5 m-5 mt-16 ">
          <Link href="/dashboard" className="flex gap-1 items-center hover:scale-95 ease-in-out duration-100">
            <FaHome className=" text-xl" />
            Dashboard
          </Link>
          <Link href="/dashboard/search" className="flex gap-1 items-center hover:scale-95 ease-in-out duration-100">
            <FaSearch  className=" text-xl" />
            Search
          </Link>{" "}
          <Link href="#" onClick={onAddRecordClick} className="flex gap-1 items-center hover:scale-95 ease-in-out duration-100">
            <FaAddressCard  className=" text-xl" />
            Add New Record
          </Link>
          <Link href="/admin" className="flex gap-1 items-center hover:scale-95 ease-in-out duration-100">
          <FaUserAlt  className=" text-xl" />
            Profile
          </Link>
        </div>
      </nav>
      <div className=" w-7 left-40 md:left-52 h-full fixed bg-primary">
        <div className="flex  justify-center h-full">
          <button className={"  "} onClick={toggleSidebar}>
            {isOpen ? (
              <BsArrowLeftCircle className=" text-white text-3xl scale-95 hover:scale-105 ease-in-out duration-75" />
            ) : (
              <BsArrowRightCircle className=" text-white scale-95 hover:scale-105 text-3xl ease-in-out duration-75" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
