"use client";

import { Question } from "@/constants/interfaces/questionInterfaces";
import { generateQuestionPrompt } from "@/constants/prompts/geminiPrompts";
import { useQuestionStore } from "@/stores/useQuestionStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");
  const setQuestion = useQuestionStore((s) => s.setQuestion);
  const clearQuestion = useQuestionStore((s) => s.clearQuestion);

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

      if (parsed.value === false) {
        clearQuestion();
        console.log("Illegal prompt");
        return;
      }

      const question: Question = {
        constraints: parsed.constraints,
        description: parsed.description,
        difficulty: parsed.difficulty,
        edgeCases: parsed.edgeCases,
        examples: parsed.examples,
        hints: parsed.hints,
        id: parsed.id,
        question: parsed.question,
        spaceComplexity: parsed.spaceComplexity,
        timeComplexity: parsed.timeComplexity,
        title: parsed.title,
        topics: parsed.topics,
      };

      setQuestion(question);

      console.log(question);
    } catch (e) {
      console.error("Failed to parse Gemini response:", e);
    }
  };

  // useEffect(() => {
  //   console.log(parsed);
  // }, [parsed]);

  // useEffect(() => {
  //   console.log(parsed);
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
