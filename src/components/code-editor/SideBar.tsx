"use client";

import { Question } from "@/constants/interfaces/questionInterfaces";
import { ArrowLeft, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SideBar = ({ question }: { question: Question | null }) => {
  // if (question === null)
  //   return (
  //     <div className="w-full h-full bg-background-dark animate-pulse"></div>
  //   );
  const router = useRouter();
  return (
    <>
      {/* header */}
      <div className="px-4 py-2 h-10 flex flex-row items-center border-b-1 border-borderc">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h1 className="ml-auto text-2xl">Editor</h1>
      </div>
      {/* difficulty */}
      <div className="flex flex-col p-4 gap-4">
        <p className="text-border">Difficulty</p>
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
        <p className="text-border">Topics</p>
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
          <p className="text-border">Constraints</p>
          <div className="flex flex-col gap-4 text-[12px] font-mono text-blue-400">
            {question?.constraints.map((item, index) => {
              return <span key={index}>{item}</span>;
            })}
          </div>
        </div> */}
      {/* related questions */}
      <div className="p-4 flex-1">
        <p className="text-border">Related Questions</p>
      </div>
      {/* Footer */}
      <div className="p-4 flex flex-col gap-4">
        {["Questions", "Playlists"].map((item, index) => (
          <span
            key={index}
            className="text-border flex flex-row items-center text-sm cursor-pointer"
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
