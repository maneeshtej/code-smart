"use client";

import { useRouter } from "next/navigation";
import React from "react";

const LandingPage = (path) => {
  const router = useRouter();
  const navToDash = () => {
    router.push(path);
  };
  return (
    <div className="h-screen w-screen fixed flex flex-col gap-20 items-center justify-center">
      <button className="full-button" onClick={() => router.push("/Editor")}>
        Editor
      </button>
    </div>
  );
};

export default LandingPage;
