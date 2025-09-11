"use client";

import { Question } from "@/constants/interfaces/questionInterfaces";
import { StandardResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { getUserID } from "@/lib/auth/auth";
import {
  generateQuestionWithGemini,
  generateRelatedQuestions,
} from "@/lib/gemini/questionGenerate";
import { uploadQuestion } from "@/lib/supabase/supabaseInsert";
import { useCodeStore } from "@/stores/useCodeStore";
import { useQuestionStore } from "@/stores/useQuestionStore";
import { ArrowLeft, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SideBar = ({ question }: { question: Question | null }) => {
  const router = useRouter();
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([""]);
  const clearQuestion = useQuestionStore((s) => s.clearQuestion);
  const clearAllCodes = useCodeStore((s) => s.clearAllCodes);
  const setQuestion = useQuestionStore((s) => s.setQuestion);

  const fetchRelatedQuestions = async () => {
    if (!question) return;
    if (question.title === null || question.description === null) return;

    const storageKey = `relatedQuestions`;

    // Check localStorage first
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setRelatedQuestions(JSON.parse(cached));
        return; // skip API call
      }
    }

    // Fetch from API
    setRelatedQuestions(["Fetching questions"]);
    try {
      const data: StandardResponseInterface = await generateRelatedQuestions(
        question
      );

      if (!data.success) {
        console.log(data);
        setRelatedQuestions(["Unable to fetch"]);
        return;
      }

      setRelatedQuestions(data.data);

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(data.data));
      }
    } catch (error) {
      setRelatedQuestions(["Unable to fetch"]);
      console.log(error);
    }
  };

  const handleBack = () => {
    localStorage.removeItem(`relatedQuestions`);
    clearAllCodes();
    clearQuestion();
    router.back();
  };

  const handleChangeQuestion = async (prompt: string) => {
    if (relatedQuestions.length <= 0) return;
    console.log("loading");

    try {
      const userID = await getUserID();

      // console.log(userIDRes);

      if (!userID) {
        console.error("No user ID");
        return;
      }
      console.log("fetched ID");

      // Generate question using Gemini
      const res: StandardResponseInterface = await generateQuestionWithGemini(
        prompt
      );

      if (!res.success) {
        console.error("Failed to generate question", res);
        return;
      }

      console.log("fetched question");

      const data: Question = res.data;

      const question: Question = {
        userId: userID,
        title: data.title,
        question: data.question,
        description: data.description,
        examples: data.examples,
        constraints: data.constraints || [],
        edgeCases: data.edgeCases || [],
        hints: data.hints || [],
        topics: data.topics || [],
        tags: data.tags || [],
        difficulty: data.difficulty as "Easy" | "Medium" | "Hard",
        timeComplexity: data.timeComplexity,
        spaceComplexity: data.spaceComplexity,
      };

      console.log("generated question");
      const id = await uploadQuestion(question);
      if (!id) {
        console.error("np id");
        return;
      }
      console.log("uploaded to supabase");
      const finalQuestion: Question = { ...question, id: id };
      console.log(finalQuestion);

      localStorage.removeItem(`relatedQuestions`);
      setQuestion(finalQuestion);
      clearAllCodes();
    } catch (error) {
      console.log("Error in handleChangeQuestion:", error);
    }
  };

  useEffect(() => {
    fetchRelatedQuestions();
  }, [question]);
  return (
    <>
      {/* header */}
      <div className="px-4 py-2 h-10 flex flex-row items-center border-b-1 border-borderc">
        <ArrowLeft onClick={() => handleBack()} className="cursor-pointer" />
        <h1 className="ml-auto text-2xl">Editor</h1>
      </div>
      {/* difficulty */}
      <div className="flex flex-col p-4 gap-4">
        <p className="text-text-light">Difficulty</p>
        <div className="h-2 w-full rounded-full bg-background flex items-start">
          <div
            className={`h-full ${
              question?.difficulty === "Easy"
                ? "w-1/3"
                : question?.difficulty === "Medium"
                ? "w-2/3"
                : "w-3/3"
            } bg-text rounded-full`}
          ></div>
        </div>
        <h1 className="font-bold w-full flex items-center justify-center">
          {question?.difficulty}
        </h1>
      </div>
      {/* topics */}
      <div className="flex flex-col px-4 py-2 gap-2">
        <p className="text-text-light">Topics</p>
        <div className="flex flex-wrap gap-4">
          {question &&
            question.topics.map((item, index) => (
              <h1
                key={index}
                className="bg-text text-background-dark px-4 py-2 rounded-full text-sm"
              >
                {item}
              </h1>
            ))}
        </div>
      </div>
      {/* constraints */}
      {/* <div className="p-4 flex w-full flex-col gap-4">
          <p className="text-text-light">Constraints</p>
          <div className="flex flex-col gap-4 text-[12px] font-mono text-blue-400">
            {question?.constraints.map((item, index) => {
              return <span key={index}>{item}</span>;
            })}
          </div>
        </div> */}
      {/* related questions */}
      <div className="p-4 flex-1 flex flex-col h-full overflow-y-auto gap-2 hide-scrollbar">
        <p className="text-text-light">Related Questions</p>
        <div className="flex flex-col gap-4 pl-4 text-sm">
          {relatedQuestions.map((item, index) => (
            <div
              key={index}
              className="text-text-light hover:underline cursor-pointer"
              onClick={() => handleChangeQuestion(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 flex flex-col gap-4">
        {["Questions", "Playlists"].map((item, index) => (
          <span
            key={index}
            className="text-text-light flex flex-row items-center text-sm cursor-pointer"
          >
            {item}
            <Link height={10} />
          </span>
        ))}
      </div>
    </>
  );
};

export default SideBar;
