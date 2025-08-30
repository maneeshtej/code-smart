"use client";

import { Question } from "@/constants/interfaces/questionInterfaces";
import { ListPlusIcon, ThumbsUp } from "lucide-react";
import React, { useState } from "react";

// Separated QuestionTabContent component
const QuestionTabContent = ({ question }: { question: Question | null }) => {
  if (!question) {
    return <div className="p-4 text-sm text-border">No question selected.</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Title */}
      <div className="font-bold text-3xl">{question.title}</div>
      {/* Question */}
      <div className="text-lg font-semibold">Question:</div>
      <div className="text-base text-border">{question.question}</div>
      {/* Description */}
      <div className="text-lg font-semibold mt-2">Description:</div>
      <div className="text-base text-border">{question.description}</div>
      {/* Examples */}
      <div className="text-lg font-semibold mt-2">Examples:</div>
      <div className="flex flex-col gap-2">
        {question.examples && question.examples.length > 0 ? (
          question.examples.map((ex, idx) => (
            <div key={idx} className="bg-background-dark rounded p-2">
              <div>
                <span className="font-bold">Input:</span> {ex.input}
              </div>
              <div>
                <span className="font-bold">Output:</span> {ex.output}
              </div>
            </div>
          ))
        ) : (
          <div className="text-border">No examples provided.</div>
        )}
      </div>
      {/* Constraints */}
      <div className="text-lg font-semibold mt-2">Constraints:</div>
      <div className="list-disc list-inside text-base text-border">
        {question.constraints && question.constraints.length > 0 ? (
          question.constraints.map((c, idx) => (
            <div key={idx} className="font-mono text-blue-400 text-sm pl-4">
              {c}
            </div>
          ))
        ) : (
          <div>No constraints provided.</div>
        )}
      </div>
      {/* Edge Cases */}
      <div className="text-lg font-semibold mt-2">Edge Cases:</div>
      <ul className="list-disc list-inside text-base text-border">
        {question.edgeCases && question.edgeCases.length > 0 ? (
          question.edgeCases.map((e, idx) => (
            <li key={idx} className="">
              {e}
            </li>
          ))
        ) : (
          <li>No edge cases provided.</li>
        )}
      </ul>
      {/* Time & Space Complexity */}
      <div className="flex flex-row gap-8 mt-2">
        <div>
          <span className="font-semibold">Time Complexity:</span>{" "}
          <span className="text-border">{question.timeComplexity}</span>
        </div>
        <div>
          <span className="font-semibold">Space Complexity:</span>{" "}
          <span className="text-border">{question.spaceComplexity}</span>
        </div>
      </div>
    </div>
  );
};

const HintTabContent = ({ question }: { question: Question | null }) => (
  <div className="p-4 text-sm text-border">
    {question?.hints && question.hints.length > 0
      ? question.hints.map((hint, idx) => (
          <div key={idx} className="mb-2">
            Hint {idx + 1}: {hint}
          </div>
        ))
      : "No hints available."}
  </div>
);

const SolutionTabContent = ({ question }: { question: Question | null }) => (
  <div className="p-4 text-sm text-border">
    {/* Placeholder for solution content */}
    Solution coming soon.
  </div>
);

const AssistantTabContent = ({ question }: { question: Question | null }) => (
  <div className="p-4 text-sm text-border">
    {/* Placeholder for assistant content */}
    Assistant coming soon.
  </div>
);

const EditorTabs = ({ question }: { question: Question | null }) => {
  const tabs = [
    { id: 0, name: "Question" },
    { id: 1, name: "Hint" },
    { id: 2, name: "Solution" },
    { id: 3, name: "Assistant" },
    { id: 4, name: "Run" },
  ];
  const [currentTabID, setCurrentTabID] = useState<number>(0);

  return (
    <div className="flex flex-col h-full w-full  border-borderc">
      {/* header */}
      <div className="px-4 py-2 h-10 border-b-1 border-borderc flex flex-row gap-4 justify-evenly">
        {tabs.map((item, index) => (
          <span
            key={index}
            className={`${
              currentTabID === item.id
                ? " text-text underline underline-offset-8"
                : ""
            } cursor-pointer text-border`}
            onClick={() => setCurrentTabID(item.id)}
          >
            {item.name}
          </span>
        ))}
      </div>
      {/* Conditional tab content */}
      <div className="flex-1 overflow-y-auto">
        {currentTabID === 0 && <QuestionTabContent question={question} />}
        {currentTabID === 1 && <HintTabContent question={question} />}
        {currentTabID === 2 && <SolutionTabContent question={question} />}
        {currentTabID === 3 && <AssistantTabContent question={question} />}
      </div>
    </div>
  );
};

export default EditorTabs;
