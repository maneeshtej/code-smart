"use client";

import { FullButton, TextButton } from "@/components/buttons/buttons";
import { useRouter } from "next/navigation";
import React from "react";

const LandingPage = (path) => {
  const router = useRouter();
  const navToDash = () => {
    router.push(path);
  };
  return (
    <div className="h-screen w-screen fixed flex flex-col gap-20 items-center justify-center">
      <FullButton name={"SignUp"} onClick={() => router.push("/SignUp/")} />
      <button className="full-button" onClick={() => router.push("/SignIn/")}>
        Sign In
      </button>
    </div>
  );
};

export default LandingPage;
