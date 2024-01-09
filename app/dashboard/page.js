"use client";
import React, { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../AuthContext";
import { db } from "../config";
import { doc, getDoc, collection, query, getDocs } from "firebase/firestore";
import Image from "next/image";


export default function Dashboard() {
  const { user } = useAuthContext();
  const [teamRecords, setTeamRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchRecords = async () => {
      if (user) {
        try {
          // Fetch user's team ID
          const userDocRef = doc(db, "users", user.email);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.teams && userData.teams.length > 0) {
              // Fetch records for the team
              const recordsQuery = query(
                collection(db, "teams", userData.teams[0], "records")
              );
              const querySnapshot = await getDocs(recordsQuery);
              const records = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setTeamRecords(records);
            }
          }
        } catch (error) {
          console.error("Error fetching records: ", error);
          // Handle error appropriately
        }
      }
    };

    fetchRecords();
  }, [user]);
  

  const lastRecordIndex = currentPage * recordsPerPage;
  const firstRecordIndex = lastRecordIndex - recordsPerPage;
  const currentRecords = teamRecords.slice(firstRecordIndex, lastRecordIndex);

  const totalPages = Math.ceil(teamRecords.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <main className="p-4">
      <div className="max-w-xl mx-auto">
        <div className="text-xl font-semibold mb-4">All Records</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentRecords.map((record, index) => (
            <div
              key={index}
              className="bg-white justify-center shadow-lg rounded-lg flex flex-col overflow-hidden p-4 h-full"
            >
              <div className="w-full text-center flex justify-center items-center mb-4">
                <Image
                  src="/images/profile.jpg"
                  className="rounded-full"
                  width={40}
                  height={40}
                  alt="Logo"
                />
              </div>
              <h3 className="text-xl text-center font-semibold mb-2">
                {record.forename} {record.surname}
              </h3>
              <div className="text-gray-700 flex-grow text-sm">
                <p className="mb-1"><span className="font-medium">Forename:</span> {record.forename}</p>
                <p className="mb-1"><span className="font-medium">Surname:</span> {record.surname}</p>
                <p className="mb-1"><span className="font-medium">Date of Birth:</span> {record.dob}</p>
              </div>
              <div className="flex justify-center mt-4">
                <button className="btn btn-primary">Primary</button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              className={`px-4 py-2 mx-1 rounded-md ${currentPage === number + 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}