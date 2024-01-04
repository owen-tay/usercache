"use client";

import Image from "next/image";
import { useAuthContext } from "../../AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout(router);
  };
  return (
    <header className="p-1">
      <nav className="flex items-center">
        <a className="flex items-center" href="/">
        <Image src="/LOGOblue.svg" width={35} height={35} alt="Logo" />
        <span className="text-sm md:text-lg font-bold text-primary">Usercache</span></a>
        <div className="w-full flex justify-end">
          {user ? (
            <>
              <button
                className=" btn btn-sm  btn-primary mr-2"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>
              <button className="btn btn-sm btn-primary" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => router.push("/signin")}
            >
              Log In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
