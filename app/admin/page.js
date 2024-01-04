"use client";
import React from "react";
import { useAuthContext } from '../AuthContext';
import { useRouter } from "next/navigation";
function Page() {
    const { user } = useAuthContext();
    const router = useRouter();
  
    React.useEffect(() => {
      // Redirect to home page if not logged in
      if (user == null) {
        router.push("/");
      }
    }, [user, router]);
  
    return (
      <div>
        {user ? (
          <h1>Welcome, {user.displayName || 'User'}!</h1> // Display user's name or 'User' if name is not available
        ) : (
          <h1>Only logged in users can view this page</h1>
        )}
      </div>
    );
  }
  
  export default Page;