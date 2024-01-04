"use client";
import React from "react";
import signIn from "../firebase/auth/signin";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      return console.log(error); // Consider adding user-friendly error handling here
    }
    console.log(result);
    router.push("/admin");
  };

  return (
    <div>
      <Header />
      <div className=" min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-3xl">
          <div className="md:flex">
            <div className="hidden md:block md:w-1/2">
              <Image
                className="object-cover h-full w-full"
                width={500}
                height={300}
                src="/hero.jpg"
                alt="Glasgow"
              />
            </div>
            <div className="w-full p-8">
              <div className="text-center mb-6">
                <h1 className="font-bold text-3xl text-gray-900">Sign In</h1>
                <p>Enter your credentials to sign in</p>
              </div>
              <form className="pb-12" onSubmit={handleForm}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="input input-bordered w-full"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="************"
                    className="input input-bordered w-full"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <button type="submit" className="btn btn-primary w-full">
                    Sign In
                  </button>
                </div>
              </form>
              <p className="text-black text-center">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-700">
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
