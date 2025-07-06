"use client";

import { FullButton, TextButton } from "@/components/buttons/buttons";
import { useRouter } from "next/navigation";
import React from "react";

const LandingPage = () => {
  const router = useRouter();
  const navToDash = () => {
    router.push("/Dashboard");
  };
  return (
    <div className="h-screen w-screen fixed flex items-center justify-center">
      <FullButton name={"Dashbord"} onClick={navToDash} />
    </div>
  );
};

export default LandingPage;
