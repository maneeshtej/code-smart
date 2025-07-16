"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bot, BotMessageSquare, ChevronRight, Send } from "lucide-react";
import { assistantPrompt } from "@/constants/prompts/geminiPrompts";
import { useCodeStore } from "@/stores/useCodeStore";
import { useQuestionStore } from "@/stores/useQuestionStore";
import { Title } from "@/components/shared/utils";

type AIBlock =
  | { type: "message"; content: string }
  | { type: "code"; content: string }
  | { type: "code-insert"; content: string }
  | { type: "error"; content: string };

const AssistantTab = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userMessage, setUserMessage] = useState<string>("");
  const [aiMessage, setAiMessage] = useState<AIBlock[]>([]);
  const langauge = useCodeStore((s) => s.currentLanguage);
  const functionCode = useCodeStore((s) => s.getCurrentFunctionCode());
  const setCurrentFunctionCode = useCodeStore((s) => s.setCurrentFunctionCode);
  const question = useQuestionStore((s) => s.question);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    const prompt = inputRef.current?.value.trim();
    if (!prompt || !langauge || !functionCode || !question) return;

    setLoading(true);

    setUserMessage(prompt); // show user prompt
    setAiMessage([{ type: "message", content: "Thinking..." }]);

    const geminiPrompt = assistantPrompt(
      prompt,
      langauge,
      question?.title,
      question?.question,
      question?.description,
      functionCode
    );
    inputRef.current!.value = "";

    await askGemini(geminiPrompt);
  };

  const askGemini = async (prompt: string) => {
    if (!prompt) return;

    try {
      const res = await fetch("/api/gemini/general-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!res.ok) {
        throw new Error("failed to fetch");
      }

      const data = await res.json();

      const cleaned = data.text
        .replace(/^```json/, "")
        .replace(/^```/, "")
        .replace(/```$/, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      console.log(parsed);

      setAiMessage(parsed);
    } catch (error) {
      console.error(error);
      setAiMessage([{ type: "error", content: "Failed to fetch" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCodeInsert = (code: string) => {
    if (!code) return;

    setCurrentFunctionCode(code);
  };

  useEffect(() => {
    const localAiMessage = localStorage.getItem("ai-message");
    if (localAiMessage) {
      try {
        const parsed = JSON.parse(localAiMessage);
        if (Array.isArray(parsed)) {
          setAiMessage(parsed);
        }
      } catch (error) {
        console.error("Invalid JSON in ai-message:", error);
      }
    }
  }, []); // only once on mount

  useEffect(() => {
    if (aiMessage.length > 0) {
      localStorage.setItem("ai-message", JSON.stringify(aiMessage));
    }
  }, [aiMessage]);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden max-w-full pl-4 pb-4">
      <div className="p-4 pl-6 flex flex-row items-center gap-4">
        <Bot size={30} />
        <Title text="Ask Assistant" />
      </div>
      <div className="flex-1 overflow-y-auto w-full flex flex-col gap-4 py-2 px-5">
        {aiMessage.map((message, index) => {
          if (message.type === "message") {
            return <span key={index}>{message.content}</span>;
          }

          if (message.type === "code") {
            return (
              <div
                key={index}
                className="bg-background-dark text-text p-4 rounded-xl flex flex-col gap-4"
              >
                <pre className="whitespace-pre-wrap break-words">
                  {message.content}
                </pre>
              </div>
            );
          }

          if (message.type === "code-insert") {
            return (
              <div
                key={index}
                className="bg-background-dark text-text p-4 rounded-xl flex flex-col gap-4"
              >
                <pre className="whitespace-pre-wrap break-words">
                  {message.content}
                </pre>
                <button
                  className="flex w-full justify-end items-center cursor-pointer text-brightGreen"
                  onClick={() => {
                    handleCodeInsert(message.content);
                  }}
                >
                  <span>Insert</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            );
          }

          if (message.type === "error") {
            return (
              <span key={index} className="text-red-500">
                {message.content}
              </span>
            );
          }

          return null;
        })}
      </div>

      <div className="flex h-17 w-full">
        <div className="h-full w-full bg-background-dark flex flex-row items-center gap-4 px-4 rounded-xl">
          <BotMessageSquare size={20} />
          <input
            ref={inputRef}
            className="flex w-full h-full focus:outline-none"
            placeholder="Ask Assistant"
            onKeyDown={handleKeyDown}
          />
          <button className="h-full cursor-pointer" onClick={handleSend}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantTab;
