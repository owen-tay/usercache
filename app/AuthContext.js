"use client";

import React from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import firebase_app from "./config";
const auth = getAuth(firebase_app);
import Loading from "./components/home/Loading";
import { useRouter } from "next/router";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async (router) => {
    console.log("TEEEST");
    try {
      await signOut(auth);
      setUser(null); // Upddate user state to null
      router.push("/"); 
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
