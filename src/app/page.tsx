"use client";

import { error } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");

  const generateQuestion = async () => {
    const res = await fetch("/api/gemini/generate-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className="h-screen w-screen flex gap-6 items-center justify-center flex-col bg-background text-text">
      <button
        onClick={() => router.push("/pages/editor/gen-1234")}
        className="cursor-pointer"
      >
        Go to editor
      </button>
      <input
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <button onClick={generateQuestion}>Generate</button>
    </div>
  );
}
