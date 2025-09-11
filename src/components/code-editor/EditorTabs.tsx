"use client";

import { Question } from "@/constants/interfaces/questionInterfaces";
import React, { useState } from "react";
import QuestionTabContent from "./editorTabs/questionEditorTab";
import SolutionTabContent from "./editorTabs/solutionEditorTab";
import AssistantTabContent from "./editorTabs/assistantEditorTab";
import RunTabContent from "./editorTabs/runEditorTab";
import { Play, Bot } from "lucide-react";

const HintTabContent = ({ question }: { question: Question | null }) => (
  <div className="p-4 text-sm text-text-light">
    {question?.hints && question.hints.length > 0
      ? question.hints.map((hint, idx) => (
          <div key={idx} className="mb-2">
            Hint {idx + 1}: {hint}
          </div>
        ))
      : "No hints available."}
  </div>
);

const EditorTabs = ({ question }: { question: Question | null }) => {
  // Tabs except Run and Assistant
  const tabs = [
    { id: 0, name: "Question" },
    { id: 2, name: "Hint" },
    { id: 3, name: "Solution" },
  ];
  const [currentTabID, setCurrentTabID] = useState<number>(0);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showRun, setShowRun] = useState(false);

  return (
    <div className="flex flex-col h-full w-full border-borderc">
      {/* Header */}
      <div className="flex flex-row items-center border-b-1 border-borderc px-4 py-2 h-10 relative">
        {/* Scrollable Tabs */}
        <div className="flex-1 flex flex-row gap-4 overflow-x-auto hide-scrollbar">
          {tabs.map((item) => (
            <span
              key={item.id}
              className={`${
                currentTabID === item.id
                  ? "text-text underline underline-offset-8"
                  : "text-text-light"
              } cursor-pointer whitespace-nowrap`}
              onClick={() => {
                setCurrentTabID(item.id);
                setShowAssistant(false);
                setShowRun(false);
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
        {/* Assistant Tab */}
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-full ml-2 transition
            ${
              showAssistant
                ? "text-white font-bold"
                : "text-text-light hover:bg-background-dark"
            }
          `}
          onClick={() => {
            setShowAssistant(true);
            setShowRun(false);
          }}
        >
          <Bot size={16} />
          Assistant
        </button>
        {/* Run Tab */}
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-full ml-2 transition
            ${
              showRun
                ? "text-white font-bold"
                : "text-text-light hover:bg-background-dark"
            }
          `}
          onClick={() => {
            setShowRun(true);
            setShowAssistant(false);
          }}
        >
          <Play size={16} />
          Run
        </button>
      </div>
      {/* Conditional tab content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {showRun ? (
          <RunTabContent question={question} />
        ) : showAssistant ? (
          <AssistantTabContent question={question} />
        ) : currentTabID === 0 ? (
          <QuestionTabContent question={question} />
        ) : currentTabID === 2 ? (
          <HintTabContent question={question} />
        ) : currentTabID === 3 ? (
          <SolutionTabContent question={question} />
        ) : null}
      </div>
    </div>
  );
};

export default EditorTabs;
