"use client";

import { universalPrompt } from "@/utils/prompts";
import React, { useState } from "react";

function NewQuestionPrompt({ language = "javascript", processResult }) {
  const [prompt, setPrompt] = useState("");
  const askGemini = async () => {
    const query = universalPrompt(prompt, language);

    console.log("starting");
    processResult({ loading: true });
    try {
      const res = await fetch("/api/ask/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const parsed = JSON.parse(data.content.trim());
      processResult(parsed);

      localStorage.setItem("data", JSON.stringify(parsed));

      console.log(parsed);
    } catch (error) {
      console.error("Error:", error);
      processResult({ error: error.message });
    } finally {
      processResult({ loading: false });
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default NewQuestionPrompt;
