"use client";

import { Question } from "@/constants/interfaces/questionInterfaces";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import {
  fetchAllQuestions,
  fetchSelfQuestions,
} from "@/lib/supabase/supabaseFetch";
import React, { useState } from "react";

const Home = () => {
  const [questions, setQuestions] = useState<Array<Question> | null>();

  const getUserQuestions = async () => {
    const res = await fetchSelfQuestions();
    const data: apiResponseInterface = await res.json();
    console.log(data);

    if (!data.success) return;
    setQuestions(data.data);
  };
  return (
    <div className="h-screen w-screen bg-background fixed text-text font-inter">
      <button onClick={getUserQuestions}>Fetch questions</button>
      <div className="h-full w-full flex gap-4 flex-col">
        {questions &&
          questions.map((item, index) => {
            return <div key={index}>{item.title}</div>;
          })}
      </div>
    </div>
  );
};

export default Home;
