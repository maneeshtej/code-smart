"use client";

import { generateCodePrompt } from "@/constants/prompts/geminiPrompts";
import { useCodeStore } from "@/stores/useCodeStore";
import { useQuestionStore } from "@/stores/useQuestionStore";
import React, { useEffect } from "react";

const supportedLanguages = [
  { key: "java", label: "Java" },
  { key: "python", label: "Python" },
  { key: "c", label: "C" },
  { key: "cpp", label: "C++" },
  { key: "javascript", label: "JavaScript" },
  { key: "csharp", label: "C#" },
] as const;

type LanguageSelectorProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LanguageSelector = ({ loading, setLoading }: LanguageSelectorProps) => {
  const currentLanguage = useCodeStore((s) => s.currentLanguage);
  const setCurrentLanguage = useCodeStore((s) => s.setCurrentLanguage);
  const getCurrentFunctionCode = useCodeStore((s) => s.getCurrentFunctionCode);
  const setCurrentFunctionCode = useCodeStore((s) => s.setCurrentFunctionCode);
  const question = useQuestionStore((s) => s.question);

  useEffect(() => {
    const currentFunctionCode = getCurrentFunctionCode();
    if (currentFunctionCode === "") {
      console.log("Generating code....");
      getLanguageCode();
    } else {
      console.log("Getting from zustand....");
    }
  }, [currentLanguage, getCurrentFunctionCode, setCurrentFunctionCode]);

  const getLanguageCode = async () => {
    console.log("started...");
    if (
      !question?.title ||
      !question?.question ||
      !question?.description ||
      !currentLanguage
    ) {
      console.error("no proper params");
      return;
    }

    const prompt = generateCodePrompt(
      currentLanguage,
      question.title,
      question.question,
      question.description
    );

    try {
      setLoading(true);
      const res = await fetch("/api/gemini/general-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!res.ok) console.error("Failed to fetch");

      const data = await res.json();

      const cleaned = data.text
        .replace(/^```json/, "")
        .replace(/^```/, "")
        .replace(/```$/, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      setCurrentFunctionCode(parsed.functionCode);

      console.log(parsed);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="font-medium">
        Language:
      </label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) =>
          setCurrentLanguage(
            e.target.value as (typeof supportedLanguages)[number]["key"]
          )
        }
        className={`p-2 bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 outline-none
          ${loading ? "animate-pulse" : ""}`}
      >
        <option value="" disabled>
          Select a language
        </option>
        {supportedLanguages.map((lang) => (
          <option key={lang.key} value={lang.key}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
