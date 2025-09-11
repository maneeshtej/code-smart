"use client";

import {
  fetchedQuestionInterface,
  Question,
  questionMapSnakeCaseToCamelCase,
} from "@/constants/interfaces/questionInterfaces";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { fetchLatestUserQuestion } from "@/lib/supabase/supabaseFetch";
import { Search, UserIcon } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

const Home = () => {
  const [question, setQuestion] = useState<Question>();
  const fetchLatestQuestion = async () => {
    try {
      const res = await fetchLatestUserQuestion();
      const data: apiResponseInterface = await res.json();
      if (!data.success) {
        console.error("Error", data.error);
      }
      const fetchedQuestion: fetchedQuestionInterface[] = data.data;
      const question = questionMapSnakeCaseToCamelCase(fetchedQuestion[0]);
      setQuestion(question);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestQuestion();
  }, []);

  return (
    <div className="h-screen w-full bg-background-dark text-text font-inter flex flex-col">
      {/* ---HEADER--- */}
      <div className="p-0 px-8 flex flex-row items-center border-b border-border">
        <h1 className="text-2xl font-bold mr-auto">
          Welcome <span className="text-green-300">Tej</span>
        </h1>
        <div className="h-2/3 w-1/3 flex bg-background rounded-full p-2 px-4 flex-row items-center gap-4">
          <Search className="h-[80%]" />
          <input
            className="outline-none font-inter text-sm"
            placeholder="Enter to search"
          ></input>
        </div>
        <div className="flex flex-row items-center p-4 gap-10">
          <div className="bg-white rounded-full p-2">
            <UserIcon className="text-background-dark" height={15} width={15} />
          </div>
        </div>
      </div>
      {/* ---!HEADER--- */}
      {/* ---BODY--- */}
      <div className="flex flex-1 h-full w-full flex-col items-start justify-start gap-4 p-10">
        {/* --ROW 1-- */}
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* -ITEM 1- */}
          <Card name="Recent" classname="flex-2">
            <div className="flex flex-row items-center gap-4">
              <div className="font-bold text-xl mr-auto">
                {question?.title || "None"}
              </div>
              <div className="bg-text p-2 px-3 rounded-full flex items-center justify-center">
                <span className="text-background-dark text-xs ">
                  {question?.solved ? "Solved" : "Unsolved"}
                </span>
              </div>
            </div>
            <div
              className={`${
                question?.difficulty === "Easy"
                  ? "text-green-300"
                  : question?.difficulty === "Medium"
                  ? "text-orange-300"
                  : "text-red-300"
              } font-bold`}
            >
              {question?.difficulty}
            </div>
            <div className="flex flex-row gap-4">
              {question?.topics.map((item, index) => (
                <h1
                  className="bg-white p-2 rounded-full text-background-dark px-4 text-xs"
                  key={index}
                >
                  {item}
                </h1>
              ))}
            </div>
            <div className="text-text-light text-[10px] text-left">
              {question?.question}
            </div>
            <div className="text-base text-text-light font-inter">
              {question && question?.editedAt
                ? new Date(question?.editedAt).toLocaleDateString("en-GB")
                : ""}
            </div>
          </Card>
          {/* -!ITEM 1- */}
          {/* -ITEM 2- */}
          {/* <Card name="Actions" classname="flex-1" /> */}
          {/* -!ITEM 2- */}
        </div>
        {/* --!ROW 1-- */}
      </div>
      {/* ---!BODY--- */}
    </div>
  );
};

export default Home;

interface CardProps {
  children?: ReactNode;
  name?: string;
  classname?: string;
}

const Card: React.FC<CardProps> = ({ children, name, classname }) => {
  return (
    <div className={`flex flex-col gap-2 ${classname}`}>
      <h1 className="font-bold pl-1 text-text-light text-xs">{name || ""}</h1>
      <div className="flex flex-col flex-2 p-4 border-2 bg-background border-border rounded-md gap-4 hover:bg-border transition duration-200 ease-in-out cursor-pointer">
        {children || <></>}
      </div>
    </div>
  );
};
