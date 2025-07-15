"use client";

import { generateQuestionPrompt } from "@/constants/prompts/geminiPrompts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");
  const [result, setResult] = useState();

  const generateQuestion = async () => {
    console.log("running...");
    const geminiPrompt = generateQuestionPrompt(prompt);
    const res = await fetch("/api/gemini/generate-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: geminiPrompt }),
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    const cleaned = data.text
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    try {
      const parsed = JSON.parse(cleaned);
      console.log("Parsed question:", parsed);
      setResult(parsed); // Set parsed object in state
    } catch (e) {
      console.error("Failed to parse Gemini response:", e);
    }

    // setResult(data);
  };

  // useEffect(() => {
  //   console.log(result);
  // }, [result]);

  // useEffect(() => {
  //   console.log(result);
  // }, []);

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
