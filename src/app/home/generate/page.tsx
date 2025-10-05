/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { confirmAction } from "@/components/shared/asyncModal";
import { Question } from "@/constants/interfaces/questionInterfaces";
import { StandardResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { getSessionData, manageLogin } from "@/lib/auth/auth";
import { generateQuestionWithGemini } from "@/lib/gemini/questionGenerate";
import { uploadQuestion } from "@/lib/supabase/supabaseInsert";
import { useCodeStore } from "@/stores/useCodeStore";
import { useQuestionStore } from "@/stores/useQuestionStore";
import { CornerDownLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface questionParamsInterface {
  typeID: string;
  difficultyID: number;
}

const Generate = () => {
  const router = useRouter();
  const [textField, setTextField] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<number>(0);
  const { setQuestion } = useQuestionStore();
  const question = useQuestionStore((s) => s.question);
  const clearAllCodes = useCodeStore((s) => s.clearAllCodes);

  const getResponse = async () => {
    try {
      setLoading(true);
      setState(1);
      console.log("started");
      const sessionData = await getSessionData();
      const userId = sessionData.data.userID;
      if (!userId) {
        console.error("No suer ID");
        return;
      }
      console.log("got user ID");
      const res: StandardResponseInterface = await generateQuestionWithGemini(
        textField
      );
      console.log(res);
      const data: Question = res.data;
      console.log(data);
      const question: Question = {
        userId: userId,
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
      console.log(question);
      console.log("generated question");
      setState(2);
      const id = await uploadQuestion(question);
      if (!id) {
        console.error("np id");
        return;
      }
      console.log("uploaded to supabase");
      const finalQuestion: Question = { ...question, id: id };
      console.log(finalQuestion);
      setQuestion(finalQuestion);
      setState(3);
    } catch (error) {
      setState(-1);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const goToEditor = async () => {
    const confirm = await confirmAction({
      title: "Solve",
      message: "You are going to edit page",
    });

    if (confirm) {
      clearAllCodes();
      setTimeout(() => {
        router.push("/editor/");
      }, 500);
    }
  };

  useEffect(() => {
    if (question && question.title) {
      setState(3);
      return; // skip attaching the key listener
    }

    if (state !== 0) return;

    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        await getResponse();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [question]);

  useEffect(() => {
    manageLogin(router);
  }, []);

  return (
    <div className="h-full w-full flex flex-col font-inter bg-background-dark">
      {/* HEADER */}
      <div className="p-4 text-2xl font-bold border-b-[0.5px] border-borderc">
        Generate Question
      </div>
      <div className="flex flex-col p-4 gap-4 h-full w-full">
        <h3 className="text-text-light text-sm">Enter prompt to generate</h3>

        <input
          className={`resize-none outline-none  h-fit border-b-1 border-border
            ${
              state === 0
                ? "text-4xl font-bold "
                : "text-2xl transition-all duration-200 ease-in-out"
            }`}
          value={textField}
          placeholder="Enter"
          onChange={(e) => setTextField(e.target.value)}
          type="text"
        ></input>
        <div className={`flex h-full flex-1 rounded-md`}>
          {state === 0 ? (
            <div className="flex flex-col gap-4 h-fit w-full items-center justify-center">
              <span className="text-sm text-text-light">
                Press enter to generate question
              </span>
              <button
                className="flex flex-row items-center justify-evenly bg-text text-background-dark px-4 py-2 
              rounded-full cursor-pointer"
                onClick={getResponse}
              >
                Generate
                <CornerDownLeft className="h-4" />
              </button>
              <button
                className="flex flex-row items-center justify-evenly bg-text text-background-dark px-4 py-2 
              rounded-full cursor-pointer"
                onClick={goToEditor}
              >
                Go to editor
              </button>
            </div>
          ) : state === 1 ? (
            <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
              <h3>Fetching question</h3>
              <Loader className="animate-spin" />
            </div>
          ) : state === 2 ? (
            <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
              <h3>Almost done</h3>
              <Loader className="animate-spin" />
            </div>
          ) : state === 3 ? (
            <div className="flex flex-col h-fit w-full bg-background rounded-md p-4 gap-4">
              <h1 className="text-4xl font-bold">{question?.title}</h1>
              <div className="flex flex-row gap-4">
                {question?.topics.map((item, index) => (
                  <span
                    className="bg-text px-4 py-2 rounded-full text-background-dark text-sm"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <h3 className="text-text-light text-sm">{question?.question}</h3>
              <div className="flex w-full items-center justify-end">
                <button
                  className="bg-background-dark px-4 py-2 rounded-full w-fit cursor-pointer"
                  onClick={goToEditor}
                >
                  Solve
                </button>
              </div>
            </div>
          ) : state === -1 ? (
            <div className="flex flex-col gap-4 h-fit w-full items-center justify-center">
              <span className="text-sm text-red-400">
                Something failed please try again
              </span>
              <button
                className="flex flex-row items-center justify-evenly bg-text text-background-dark px-4 py-2
               rounded-full cursor-pointer"
                onClick={getResponse}
              >
                Retry
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
