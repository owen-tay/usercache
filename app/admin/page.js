"use client";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Team from "../components/home/Team";
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

function AdminPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [team, setTeam] = useState(null);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.email);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.teams && userData.teams.length > 0) {
            const teamDocRef = doc(db, "teams", userData.teams[0]);
            const teamDoc = await getDoc(teamDocRef);
            if (teamDoc.exists()) {
              const teamData = teamDoc.data();
              setTeam(teamData);

              // Check if the current user is the owner of the team
              if (teamData.createdBy === user.email) {
                setIsOwner(true);
                setPendingMembers(teamData.pending || []);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching team data: ", error);
      }
    }
  };

  const approveMember = async (email) => {
    try {
      // Move the email from pending to members
      await updateDoc(doc(db, "teams", team.id), {
        pending: arrayRemove(email),
        members: arrayUnion(email),
      });

      // Update the local state
      setPendingMembers((prevMembers) =>
        prevMembers.filter((member) => member !== email)
      );
    } catch (error) {
      console.error("Error approving member: ", error);
    }
  };

  const denyMember = async (email) => {
    try {
      // Remove the email from pending
      await updateDoc(doc(db, "teams", team.id), {
        pending: arrayRemove(email),
      });

      // Update the local state
      setPendingMembers((prevMembers) =>
        prevMembers.filter((member) => member !== email)
      );
    } catch (error) {
      console.error("Error denying member: ", error);
    }
  };

  return (
    <div>
      <Header />
      <Team />
      <Footer />
      {isOwner && (
        <div className="container mx-auto p-4 mt-10">
          <h2 className="text-xl font-bold mb-2">Approval Needed</h2>
          <div className="grid grid-cols-2 gap-4">
            {pendingMembers.map((email) => (
              <div key={email} className="bg-white shadow-lg rounded-lg p-4">
                <p className="text-lg">{email}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                    onClick={() => approveMember(email)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                    onClick={() => denyMember(email)}
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
