"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background text-text">
      <button
        onClick={() => router.push("/pages/editor/3")}
        className="cursor-pointer"
      >
        Go to editor
      </button>
    </div>
  );
}
