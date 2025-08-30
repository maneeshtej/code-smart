"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [count, setCount] = useState<number>(3);
  const router = useRouter();

  useEffect(() => {
    const intereval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(intereval);
          router.push("/auth/signup/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intereval);
  }, []);
  return (
    <div className="h-screen w-screen bg-background fixed flex items-center justify-center">
      <h1 className="text-text animate-pulse">Loading...</h1>
      <h1>{count}</h1>
    </div>
  );
};

export default Page;
