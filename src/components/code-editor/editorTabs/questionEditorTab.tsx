"use client";

import { Question } from "@/constants/interfaces/questionInterfaces";
import { getLocalItem, setLocalItem } from "@/lib/utils/localStorage";
import { useEffect, useState } from "react";

const QuestionTabContent = ({ question }: { question: Question | null }) => {
  const [hideHints, setHideHints] = useState(true);
  if (!question) {
    return (
      <div className="p-4 text-sm text-text-light">No question selected.</div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Title */}
      <div className="font-bold text-3xl">{question.title}</div>
      {/* Question */}
      <div className="text-lg font-semibold">Question:</div>
      <div className="text-base text-text-light">{question.question}</div>
      {/* Description */}
      <div className="text-lg font-semibold mt-2">Description:</div>
      <div className="text-base text-text-light">{question.description}</div>
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
          <div className="text-text-light">No examples provided.</div>
        )}
      </div>
      {/* Constraints */}
      <div className="text-lg font-semibold mt-2">Constraints:</div>
      <div className="list-disc list-inside text-base text-text-light">
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
      <ul className="list-disc list-inside text-base text-text-light">
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
          <span className="text-text-light">{question.timeComplexity}</span>
        </div>
        <div>
          <span className="font-semibold">Space Complexity:</span>{" "}
          <span className="text-text-light">{question.spaceComplexity}</span>
        </div>
      </div>
      {/* Hints */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex flex-row items-center justify-between">
          <span className="font-semibold">Hints</span>{" "}
          <button
            className="hover:underline cursor-pointer px-4 py-2"
            onClick={() => {
              setHideHints((prev) => !prev);
            }}
          >
            {hideHints ? "Show hints" : "Hide hints"}
          </button>
        </div>
        <div
          className={`${
            hideHints ? "blur-sm" : "blur-none"
          } transition-all duration-200 ease-in-out relative flex flex-col gap-4 pl-4`}
        >
          {question &&
            question.hints.length > 0 &&
            question.hints.map((item, index) => (
              <span className="text-sm text-text-light" key={index}>
                {item}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTabContent;
