"use client";
import { StandardResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { signUpWithEmailAndPassword } from "@/lib/auth/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setMessage("");

    const data: StandardResponseInterface = await signUpWithEmailAndPassword(
      email,
      password
    );
    if (data.error === "user already exists") {
      router.push("/auth/login");
    }
    setMessage(data.message || data.error || "");
    setLoading(false);
  };

  return (
    <div className="min-h-screen min-w-full fixed bg-background flex items-center justify-center text-text">
      <div
        className="bg-background-dark rounded-xl shadow-lg flex flex-col items-center justify-center
        w-[90%] max-w-md sm:w-[70%] md:w-[50%] lg:w-[30%] py-10 px-4"
      >
        <h1 className="text-2xl font-bold mb-8 font-cursive">Sign Up</h1>

        <form className="w-full flex flex-col gap-4 items-center">
          <input
            className="bg-background rounded-md w-full max-w-xs p-4 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="bg-background rounded-md w-full max-w-xs p-4 outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </form>

        {/* Buttons without handlers — hook them yourself */}
        <div className="flex flex-col gap-2 w-full max-w-xs mt-4">
          <button
            className="bg-background border border-softPurple text-softPurple rounded-md p-3 font-semibold transition
           hover:bg-softPurple hover:text-background"
            onClick={handleSignUp}
          >
            Register
          </button>
        </div>

        <h1 className="mt-4 text-center text-sm">{message}</h1>
        {loading && <h1 className="mt-4 text-center text-sm">Loading...</h1>}
        <span className="text-text-light text-sm">
          Already have an account?
          <Link href={"/auth/login"} className="text-blue-400">
            {" "}
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
