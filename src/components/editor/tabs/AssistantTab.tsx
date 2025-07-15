"use client";

import React, { useRef, useState } from "react";
import { User, Bot, BotMessageSquare, Send } from "lucide-react";

const AssistantTab = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [userMessage, setUserMessage] = useState<string>("");
  const [aiMessage, setAiMessage] = useState<string>("");

  const handleSend = () => {
    const prompt = inputRef.current?.value.trim();
    if (!prompt) return;

    setUserMessage(prompt); // show user prompt
    setAiMessage("Thinking..."); // show typing...

    inputRef.current!.value = "";

    // simulate Gemini API
    fakeGeminiResponse(prompt);
  };

  const fakeGeminiResponse = (prompt: string) => {
    setTimeout(() => {
      // simulate response
      setAiMessage(`You said: "${prompt}"`);
    }, 1000); // 1s delay to mimic AI thinking
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden max-w-full pl-4 pb-4">
      <div className="flex-1 overflow-y-auto w-full flex flex-col gap-4 py-2 px-5">
        {userMessage && (
          <div className="flex flex-row-reverse items-center gap-4 w-full">
            <User size={20} />
            <div className="p-4 rounded-xl bg-brightBlue max-w-[60%]">
              {userMessage}
            </div>
          </div>
        )}

        {aiMessage && (
          <div className="flex flex-row items-center gap-4 w-full">
            <Bot size={20} />
            <div className="p-4 rounded-xl bg-brightGreen max-w-[60%]">
              {aiMessage}
            </div>
          </div>
        )}
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
