"use client";

import { Question } from "@/constants/interfaces/questionInterfaces";
import { StandardResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { assistantPrompt } from "@/constants/prompts/geminiPrompts";
import { askGeminiAssistantInEditor } from "@/lib/gemini/assistant";
import { useCodeStore } from "@/stores/useCodeStore";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const AssistantTabContent = ({ question }: { question: Question | null }) => {
  const currentLanguage = useCodeStore((s) => s.currentLanguage);
  const functionCode = useCodeStore((s) => s.getCurrentFunctionCode());
  const [textField, setTextField] = useState<string>("");
  const [assistantRespose, setAssistantResponse] = useState([
    { type: "message", content: "Ask me chad!" },
  ]);

  const getAssistantRespose = async () => {
    setAssistantResponse([{ type: "message", content: "Loading..." }]);
    const prompt = assistantPrompt(
      textField,
      currentLanguage,
      question?.title,
      question?.question,
      question?.description,
      functionCode
    );
    try {
      const data: StandardResponseInterface = await askGeminiAssistantInEditor(
        prompt
      );
      console.log(data);
      if (!data.success) {
        setAssistantResponse([
          { type: "message", content: "Something has failed please try agian" },
        ]);
        setTextField("");
      }
      setAssistantResponse(data.data);
      setTextField("");
    } catch (error) {
      console.log(error);
      setAssistantResponse([
        { type: "message", content: "Something has failed please try agian" },
      ]);
      setTextField("");
    }
  };

  return (
    <div className="p-4 text-sm text-text-light h-full w-full flex flex-col gap-4">
      <div className="flex flex-1 h-full flex-col gap-4 text-white overflow-y-auto">
        <div className="w-full flex flex-col gap-4">
          {assistantRespose.map((item, index) => {
            if (item.type === "message") {
              return (
                <div key={index}>
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </div>
              );
            } else if (item.type === "code" || item.type === "code-insert") {
              return (
                <pre
                  style={{
                    padding: "1rem",
                    borderRadius: "6px",
                    overflowX: "auto",
                  }}
                  className="bg-background rounded-md text-brightGreen"
                  key={index}
                >
                  <code>{item.content}</code>
                </pre>
              );
            }
          })}
        </div>
      </div>
      <div className="flex flex-row w-full bg-background rounded-full items-center p-4 gap-4">
        <input
          type="text"
          placeholder="Ask assistant"
          className=" flex-1 outline-none"
          value={textField}
          onChange={(e) => setTextField(e.target.value)}
        />
        <SendHorizonal
          className="cursor-pointer"
          onClick={getAssistantRespose}
        />
      </div>
    </div>
  );
};

export default AssistantTabContent;
