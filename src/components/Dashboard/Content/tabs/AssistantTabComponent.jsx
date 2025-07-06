"use client";
import React, { useEffect, useState } from "react";
import { chatPrompt } from "@/utils/prompts";

const AssistantComponent = ({ result, code }) => {
  const [aiMessage, setAiMessage] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const askGemini = async () => {
    if (!prompt.trim()) return;

    const userMessage = prompt.trim();
    const input = chatPrompt(JSON.stringify(result), code);
    setLoading(true);
    setAiMessage([]);
    const prevContext = localStorage.getItem("chat-context");

    try {
      const res = await fetch("/api/ask/gemini/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${input}\n\nUser:${userMessage}\n\n[Previous Summary]: ${
            prevContext ? prevContext : "none"
          }`,
        }),
      });

      const json = await res.json();
      const reply = json.content.trim();
      const parsed = JSON.parse(reply);

      const messagesArray = parsed.message;
      localStorage.setItem("messageArray", JSON.stringify(messagesArray));
      const summary = parsed.followup?.summary;
      localStorage.setItem("chat-context", summary);

      // Convert mixed message array to formatted blocks
      const formatted = messagesArray.map((msg) => {
        if (msg.startsWith("$$$") && msg.endsWith("$$$")) {
          return {
            type: "code",
            content: msg.replace(/\$\$\$/g, "").trim(),
          };
        } else {
          return {
            type: "text",
            content: msg,
          };
        }
      });

      setAiMessage(formatted);
    } catch (error) {
      setAiMessage([
        { type: "text", content: "Something went wrong. Please try again." },
      ]);
      console.error(error);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 h-full px-6 pt-6 overflow-hidden">
        <div className="h-full overflow-y-auto flex flex-col gap-6 text-text-light">
          {loading && <p className="animate-pulse">Thinking...</p>}

          {!loading &&
            aiMessage.map((block, index) => {
              if (block.type === "text") {
                return <p key={index}>{block.content}</p>;
              } else if (block.type === "code") {
                return (
                  <pre
                    key={index}
                    className="bg-[#1e1e1e] text-sm text-white p-4 rounded-lg "
                  >
                    <code>{block.content}</code>
                  </pre>
                );
              }
            })}
        </div>
      </div>

      <div className="p-6 border-t border-border-light flex flex-row">
        <input
          name="prompt"
          type="text"
          placeholder="Ask AI"
          className="outline-none w-full bg-transparent text-white"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="full-button" onClick={askGemini}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AssistantComponent;
