"use client";

import { useCodeStore } from "@/stores/useCodeStore";
import React from "react";

const supportedLanguages = [
  { key: "java", label: "Java" },
  { key: "python", label: "Python" },
  { key: "c", label: "C" },
  { key: "cpp", label: "C++" },
  { key: "javascript", label: "JavaScript" },
  { key: "csharp", label: "C#" },
] as const;

const LanguageSelector = () => {
  const { currentLanguage, setCurrentLanguage } = useCodeStore();

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
        className="p-2 bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 outline-none"
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
