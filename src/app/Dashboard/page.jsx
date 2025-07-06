"use client";

import CodeEditorPanel from "@/components/Dashboard/Content/CodeEditorComponent";
import ContentComponent from "@/components/Dashboard/Content/ContentComponent";
import { universalPrompt } from "@/utils/prompts";
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [functionCode, setFunctionCode] = useState("");

  const askGemini = async () => {
    setLoading(true);
    setResult(null);

    const language = "JavaScript";
    const query = universalPrompt(prompt, language);

    console.log("starting");
    try {
      const res = await fetch("/api/ask/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const parsed = JSON.parse(data.content.trim());
      setResult(parsed);

      localStorage.setItem("data", JSON.stringify(parsed));
      setFunctionCode(parsed.function || "");

      console.log(parsed);
    } catch (error) {
      console.error("Error:", err);
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSetCode = (code) => {
    setFunctionCode(code);
    localStorage.setItem("code", JSON.stringify(code));
  };

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data"));
    const localPrompt = localStorage.getItem("prompt");
    const localFunctionCode = JSON.parse(localStorage.getItem("code"));

    if (localData) setResult(localData);
    if (prompt) setPrompt(localPrompt);
    if (localFunctionCode) setFunctionCode(localFunctionCode);
  }, []);

  return (
    <div className="h-full w-full overflow-auto flex flex-col">
      <div className="w-full p-4 flex gap-5 md:gap-10">
        <input
          name="input"
          type="text"
          value={prompt}
          placeholder="Type to generate question"
          className="w-full outline-none bg-bg-dark p-4 rounded-xl"
          onChange={(e) => {
            setPrompt(e.target.value);
            localStorage.setItem("prompt", prompt);
          }}
        />
        <button className="full-button hidden md:block" onClick={askGemini}>
          Generate
        </button>
        <button className="full-button md:hidden" onClick={askGemini}>
          {">"}
        </button>
      </div>
      <div className="flex flex-col xl:flex-row p-4 gap-4 h-full ">
        {/* Left Panel */}
        <div
          className={`flex-1 bg-bg-dark rounded-lg min-h-[70dvh] xl:h-full overflow-hidden ${
            loading ? "animate-pulse" : ""
          }`}
        >
          {!loading && <ContentComponent result={result} code={functionCode} />}
        </div>

        {/* Right Panel */}
        <div className="flex-1 overflow-hidden bg-bg-dark rounded-lg min-h-[70dvh] xl:h-full">
          <div className="h-10 bg-bg-dark">Run</div>
          {loading ? (
            <div className="w-full h-full p-6 space-y-4 animate-pulse">
              <div className="h-6 w-1/3 bg-gray-700 rounded" />
              <div className="h-4 w-1/2 bg-gray-700 rounded" />
              <div className="h-4 w-full bg-gray-700 rounded" />
              <div className="h-4 w-5/6 bg-gray-700 rounded" />
              <div className="h-4 w-2/3 bg-gray-700 rounded" />
              <div className="h-4 w-3/4 bg-gray-700 rounded" />
              <div className="h-4 w-full bg-gray-700 rounded" />
              <div className="h-4 w-1/2 bg-gray-700 rounded" />
            </div>
          ) : (
            <div className="flex h-full w-full">
              <CodeEditorPanel code={functionCode} setCode={handleSetCode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
