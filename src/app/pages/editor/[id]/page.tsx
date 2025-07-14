"use client";
import EditorLayout from "@/components/editor/EditorLayout";
import { Question, useQuestionStore } from "@/stores/useQuestionStore";
import { useParams } from "next/navigation";
import React from "react";

const EditorPage = () => {
  const sampleQuestion: Question = {
    id: "placeholder-001",
    title: "sample Question",
    question: "This question was loaded via an ID but no content is available.",
    description:
      "This is a placeholder question used when no actual question is found or passed via Zustand.",
    examples: [
      { input: "input1", output: "output1" },
      { input: "input2", output: "output2" },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length",
      "Time Limit: 1 second",
      "You must use an O(n) sliding window approach (brute force will time out)",
    ],

    edgeCases: [
      "nums contains all negative numbers",
      "nums contains zeros",
      "k = 1 (smallest window size)",
      "k = nums.length (entire array is one window)",
      "nums contains duplicate values",
    ],

    hints: [
      "Try using a sliding window to avoid recalculating the sum repeatedly",
      "Maintain a running sum of the current window and update the max when the window moves",
      "What happens if you subtract the first element of the current window and add the next one?",
    ],

    topics: ["Arrays", "Sliding Window", "Two Pointers"],
    difficulty: "Easy",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
  };

  const noQuestion: Question = {
    id: "null",
    title: "null",
    question: "null",
    description: "null",
    examples: [],
    constraints: [],
    edgeCases: [],
    hints: [],
    topics: [],
    difficulty: "Easy",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
  };

  const params = useParams();
  const id = params.id as string;
  const storedQuestion = useQuestionStore((s) => s.question);
  const question: Question | null = id.startsWith("gen-")
    ? storedQuestion
    : sampleQuestion;

  return (
    <div className="bg-background text-text h-screen w-screen flex flex-row">
      <div className="flex flex-1">
        <EditorLayout id={id} question={question ?? noQuestion} />
      </div>
    </div>
  );
};

export default EditorPage;
