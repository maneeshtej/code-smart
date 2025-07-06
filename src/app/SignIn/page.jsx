"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async () => {
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/Dashboard/");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed h-screen w-screen flex flex-col gap-20 justify-center items-center">
      <div className="h-[50%] w-[80%] md:w-[50%] lg:w-[50%] xl:w-[30%] bg-bg-dark rounded-xl flex flex-col justify-evenly items-center px-5 md:px-10">
        <h1 className="title">Sign In</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          className="input"
          required={true}
          onChange={(e) => handleSetEmail(e)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          className="input"
          required={true}
          onChange={(e) => handleSetPassword(e)}
        />
        <button className="text-button" onClick={handleSignUp}>
          Sign up
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {loading && <p>Loading</p>}
    </div>
  );
};

export default SignIn;
