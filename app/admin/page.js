"use client";
import React from "react";
import { useAuthContext } from '../AuthContext';
import { useRouter } from "next/navigation";
;
import Image from 'next/image'
import Header from "../components/home/Header";
import Footer from '../components/home/Footer'
import Team from '../components/home/Team'


function Page() {
    const { user } = useAuthContext();
    const router = useRouter();
  
    React.useEffect(() => {
      if (user == null) {
        router.push("/");
      }
    }, [user, router]);
  
    return (
      <div>
        <Header />
        <Team />

        <Footer />
      </div>
    );
  }
  
  export default Page;