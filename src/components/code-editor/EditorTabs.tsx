"use client";

import { Question } from "@/constants/interfaces/questionInterfaces";
import React, { useState } from "react";
import QuestionTabContent from "./editorTabs/questionEditorTab";
import AssistantTabContent from "./editorTabs/assistantEditorTab";
import RunTabContent from "./editorTabs/runEditorTab";
import { Play, Bot } from "lucide-react";

const EditorTabs = ({ question }: { question: Question | null }) => {
  // Tabs except Run
  const tabs = [
    { id: 0, name: "Question" },
    { id: 1, name: "Assistant" },
  ];
  const [currentTabID, setCurrentTabID] = useState<number>(0);
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
                setShowRun(false);
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
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
            // ...existing code...
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
        ) : currentTabID === 0 ? (
          <QuestionTabContent question={question} />
        ) : currentTabID === 1 ? (
          <AssistantTabContent question={question} />
        ) : null}
      </div>
    </div>
  );
};

export default EditorTabs;
