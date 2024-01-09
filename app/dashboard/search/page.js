"use client";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../AuthContext";
import { db } from "../../config";
import { doc, getDoc, collection, query, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuthContext();
  const [teamRecords, setTeamRecords] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const fetchRecords = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.email);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.teams && userData.teams.length > 0) {
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
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      const filteredRecords = teamRecords.filter((record) =>
        Object.entries(record)
          .filter(([key]) => key !== "id")
          .some(([, value]) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setSearchResults(filteredRecords);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <main className="p-4">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-4 mb-6 mt-10">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-input px-4 py-2 border border-gray-300 rounded-md w-full"
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary px-4 py-2 text-white rounded-md"
          >
            Search
          </button>
        </div>

        {searchResults !== null && (
          <div>
            <div className="text-xl font-semibold mb-4">All Records</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((record, index) => (
                <div
                  key={record.id || index}
                  className="bg-white shadow-lg rounded-lg flex flex-col overflow-hidden p-4 h-full"
                >
                  <div className="w-full text-center flex justify-center items-center mb-4">
                    <Image
                      src="/images/profile.jpg"
                      className="rounded-full"
                      width={40}
                      height={40}
                      alt="Profile"
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
                  <Link href={`/dashboard/record/${record.id}`} passHref>
                    <button className="btn btn-primary mt-4">Go to Record</button>
                  </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
