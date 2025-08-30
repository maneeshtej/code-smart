/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Question } from "@/constants/interfaces/questionInterfaces";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { getUserID } from "@/lib/auth/auth";
import { generateQuestionWithGemini } from "@/lib/gemini/questionGenerate";
import { useCodeStore } from "@/stores/useCodeStore";
import { useQuestionStore } from "@/stores/useQuestionStore";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Generate = () => {
  const router = useRouter();
  const clearAllCodes = useCodeStore((s) => s.clearAllCodes);
  const [textField, setTextField] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const questionTypes = [
    { id: 0, label: "Question" },
    { id: 1, label: "Playlist" },
  ];

  const [questionParams, setQuestionParams] = useState({
    typeID: 0,
    difficultyID: 1,
  });
  const { setQuestion } = useQuestionStore();
  // const [result, setResult] = useState<string>("");

  const getResponse = async () => {
    if (questionParams.typeID === 0) {
      try {
        setLoading(true);
        const userId = await getUserID();
        if (!userId) {
          console.error("No suer ID");
          return;
        }
        const res: apiResponseInterface = await generateQuestionWithGemini(
          textField
        );
        const data = res.data;
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
          difficulty: data.difficulty as "Easy" | "Medium" | "Hard",
          timeComplexity: data.timeComplexity,
          spaceComplexity: data.spaceComplexity,
        };
        console.log(question);
        setQuestion(question);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-full w-full flex flex-row items-center font-inter">
      {/* Left side */}
      <div className="flex flex-1 flex-col items-start bg-background-dark h-full w-full pt-4 gap-8">
        {/* Header */}
        <div className="flex w-full flex-row items-center gap-4 px-4">
          <ArrowLeft className="cursor-pointer" />
          <h1 className="text-2xl font-bold">Generate Question</h1>
        </div>
        {/* Input */}
        <div className="flex w-full px-4">
          <textarea
            placeholder="Enter your topic"
            className="resize-none bg-background w-full rounded-md p-4 outline-borderc outline-1"
            value={textField}
            onChange={(e) => setTextField(e.target.value)}
          ></textarea>
        </div>
        {/* Type */}
        <div className="flex flex-row items-center gap-8 pl-8 w-full overflow-x-auto">
          <h1 className="text-xl font-bold">Type</h1>
          <div className="flex bg-background p-2 gap-4 rounded-full">
            {questionTypes.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`cursor-pointer px-4 py-2 rounded-full ${
                    questionParams.typeID === item.id
                      ? "bg-text text-background-dark"
                      : ""
                  }`}
                  onClick={() => {
                    setQuestionParams((prev) => {
                      return { ...prev, typeID: item.id };
                    });
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Components */}
        <div className="flex w-full pl-8 flex-col flex-1">
          {/* Conditional components */}
          {questionParams.typeID === 0 ? (
            <QuestionComponents
              questionParams={questionParams}
              setQuestionParams={setQuestionParams}
            />
          ) : (
            <PlaylistComponents
              questionParams={questionParams}
              setQuestionParams={setQuestionParams}
            />
          )}
        </div>
        {/* Footer */}
        <div className="p-4 flex w-full justify-end gap-4">
          <button
            className="text-text bg-background px-4 py-2 rounded-full cursor-pointer"
            onClick={() => {
              clearAllCodes();
              router.push("/editor/");
            }}
          >
            Go To Editor
          </button>
          <button
            className="bg-text text-background-dark px-4 py-2 rounded-full cursor-pointer"
            onClick={getResponse}
          >
            Generate
          </button>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex flex-2 flex-col w-full items-center justify-center gap-10 h-full overflow-y-auto pt-40">
        {!loading ? (
          <div className="flex flex-1">
            {/* <EditorTabs question={question} /> */}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center animate-pulse">
            Magic...
          </div>
        )}
      </div>
    </div>
  );
};

export default Generate;

interface typeComponents {
  questionParams: any;
  setQuestionParams: React.Dispatch<React.SetStateAction<any>>;
}

const QuestionComponents = ({
  questionParams,
  setQuestionParams,
}: typeComponents) => {
  const difficultyTypes = [
    { id: 0, label: "Easy" },
    { id: 1, label: "Medium" },
    { id: 2, label: "Hard" },
  ];
  return (
    <div className="flex w-full">
      {/* Difficulty */}
      <div className="flex flex-row items-center gap-8 w-full overflow-x-auto">
        <h1 className="text-xl font-bold">Difficulty</h1>
        <div className="flex bg-background p-2 gap-4 rounded-full">
          {difficultyTypes.map((item, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer px-4 py-2 rounded-full ${
                  questionParams.difficultyID === item.id
                    ? "bg-text text-background-dark"
                    : ""
                }`}
                onClick={() => {
                  setQuestionParams((prev) => {
                    return { ...prev, difficultyID: item.id };
                  });
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PlaylistComponents = ({
  questionParams,
  setQuestionParams,
}: typeComponents) => {
  return <div className="flex w-full">Playlist params</div>;
};
