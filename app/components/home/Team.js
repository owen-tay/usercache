import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../AuthContext";
import { useRouter } from "next/navigation";
;
import { db } from "../../config";
import ErrorAlert from "./Error";

import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
} from "firebase/firestore";

//This handles everything for joining and leaving teams. This db is also formatted for future work

export default function Team() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [action, setAction] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [emailToJoin, setEmailToJoin] = useState("");
  const [currentTeam, setCurrentTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      checkUserTeam();
    }
  }, [user, router]);

  const checkUserTeam = async () => {
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
              setCurrentTeam(teamData);

              const membersData = await Promise.all(
                teamData.members.map(async (memberEmail) => {
                  const memberDoc = await getDoc(doc(db, "users", memberEmail));
                  return memberDoc.exists() ? memberDoc.data() : null;
                })
              );
              setTeamMembers(membersData.filter((member) => member != null));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching team data: ", error);
        setErrorMessage("An error occurred: " + error.message);
      }
    }
  };

  const handleCreateTeam = async () => {
    if (teamName) {
      try {
        const teamDocRef = await addDoc(collection(db, "teams"), {
          name: teamName,
          createdBy: user.email,
          members: [user.email],
          createdAt: new Date(),
        });

        const userDocRef = doc(db, "users", user.email);
        await setDoc(
          userDocRef,
          {
            email: user.email,
            teams: [teamDocRef.id],
          },
          { merge: true }
        );

        setCurrentTeam({
          name: teamName,
          createdBy: user.email,
          members: [user.email],
        });
      } catch (error) {
        console.error("Error creating team: ", error);
      }
    }
  };

  const handleJoinTeam = async () => {
    setErrorMessage(""); // Reset error message
    if (emailToJoin) {
      try {
        const teamsQuery = query(
          collection(db, "teams"),
          where("createdBy", "==", emailToJoin)
        );
        const querySnapshot = await getDocs(teamsQuery);

        if (!querySnapshot.empty) {
          const teamToJoin = querySnapshot.docs[0];
          const teamId = teamToJoin.id;

          // Update collectionn
          await updateDoc(doc(db, "teams", teamId), {
            members: arrayUnion(user.email),
          });

          // Check if user
          const userDocRef = doc(db, "users", user.email);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            // Create a new user document if no
            await setDoc(userDocRef, {
              email: user.email,
              teams: [teamId],
            });
          } else {
            await updateDoc(userDocRef, {
              teams: arrayUnion(teamId),
            });
          }

          setCurrentTeam(teamToJoin.data());
          // fetch new team members list and update state
        } else {
          // Sett error message if no team is found
          setErrorMessage("No team found with the provided email.");
        }
      } catch (error) {
        console.error("Error joining team: ", error);
        setErrorMessage("An error occurred while joining the team.");
      }
    }
  };

  const handleLeaveTeam = async () => {
    if (currentTeam && user) {
      try {
        await updateDoc(doc(db, "users", user.email), {
          teams: [],
        });

        await updateDoc(doc(db, "teams", currentTeam.id), {
          members: arrayUnion(user.email),
        });

        setCurrentTeam(null);
        setTeamMembers([]);
        setAction(null); //
      } catch (error) {
        console.error("Error leaving team: ", error);
      }
    }
  };

  if (currentTeam) {
    return (
      <div className="container mx-auto h-screen p-4">
        <h2 className="text-xl font-bold mb-2">Team: {currentTeam.name}</h2>
        <h3 className="text-lg font-semibold mb-4">Team Members:</h3>
        <ul className="list-disc list-inside">
          {teamMembers.map((member) => (
            <li key={member.email} className="mb-1">
              {member.email}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 px-4 py-2 btn-error btn"
          onClick={handleLeaveTeam}
        >
          Leave Team
        </button>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 mt-10 text-center">
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {user ? (
        <h1 className="text-2xl font-bold mb-6">
          Welcome, {user.displayName || "User"}!
        </h1>
      ) : (
        <h1 className="text-2xl font-bold mb-6">
          Only logged in users can view this page. Redirecting now.
        </h1>
      )}

      {!action && (
        <div className="space-x-4 h-screen">
          <button
            className="px-4 py-2 btn btn-primary"
            onClick={() => setAction("create")}
          >
            Create a new team
          </button>
          <button className="px-4 py-2 btn" onClick={() => setAction("join")}>
            Join an existing team
          </button>
          <div className="mt-5 text-xl bg-gray-100 p-4 rounded shadow">
            <h1 className="text-2xl font-bold p-4">Join or Create A Team!</h1>
            <p className="text-justify">
              A team keeps all your data together and allows other users to
              join, edit, and view it together. If you want to work solo, then
              select "Create a new Team". If you want to join an established
              team, click "Join an existing team". Please note, you will be able
              to leave a team after you join it.
            </p>
          </div>
        </div>
      )}

      {action === "create" && (
        <div className="mt-4">
          <label className="block mb-2">
            Give your team a name
            <input
              type="text"
              placeholder="Team Name"
              className="mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500 w-full max-w-xs"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </label>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
            onClick={handleCreateTeam}
          >
            Create Team
          </button>
        </div>
      )}

      {action === "join" && (
        <div className="mt-4">
          <label className="block mb-2">
            Enter the email of the team owner
            <input
              type="email"
              placeholder="Owner Email"
              className="mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500 w-full max-w-xs"
              value={emailToJoin}
              onChange={(e) => setEmailToJoin(e.target.value)}
            />
          </label>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            onClick={handleJoinTeam}
          >
            Join Team
          </button>
        </div>
      )}
    </div>
  );
}
