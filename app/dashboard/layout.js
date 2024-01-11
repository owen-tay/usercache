"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddRecord from "../components/dashboard/AddRecord";
import { useAuthContext } from "../AuthContext";
import { useRouter } from "next/navigation";
import { db } from "../config";
import { doc, getDoc } from "firebase/firestore";

const RootLayout = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [team, setTeam] = useState(null); 

  useEffect(() => {
    if (user == null) {
      router.push("/");
    } else {
      fetchUserTeam();
    }
  }, [user, router]);

  const fetchUserTeam = async () => {
    try {
      const userDocRef = doc(db, "users", user.email);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.teams && userData.teams.length > 0) {
          const teamDocRef = doc(db, "teams", userData.teams[0]);
          const teamDoc = await getDoc(teamDocRef);
          if (teamDoc.exists()) {
            setTeam({
              id: teamDoc.id, 
              ...teamDoc.data(), 
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user team: ", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openAddRecordModal = () => {
    setIsAddRecordOpen(true);
  };

  const closeAddRecordModal = () => {
    setIsAddRecordOpen(false);
  };

  return (
    <html lang="en">
      <body>
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          onAddRecordClick={openAddRecordModal}
        />
        <AddRecord
          isOpen={isAddRecordOpen}
          onClose={closeAddRecordModal}
          teamId={team?.id}
        />

        <div
          className={` ${
            isOpen ? " ml-[10.00rem] md:ml-[14.10rem]" : " md:ml-5"
          } flex items-center h-10 fixed bg-primary text-white w-full duration-300 ease-in-out`}
        >
          {team && <h1 className="ml-10 font-bold text-xl"> {team.name}</h1>}
        </div>
          <main
            className={` ${
              isOpen ? " ml-64" : "ml-10"
            } duration-300 ease-in-out `}
          >
            {React.Children.map(children, (child) =>
              React.cloneElement(child, { teamId: team?.id })
            )}
          </main>
      </body>
    </html>
  );
};

export default RootLayout;
