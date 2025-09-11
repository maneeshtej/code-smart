import { Question } from "@/constants/interfaces/questionInterfaces";
import {
  apiResponseInterface,
  StandardResponseInterface,
} from "@/constants/interfaces/resposeInterfaces";
import { standardResponse } from "@/constants/responses/apiResponse";

export const insertQuestion = async (question: Question) => {
  if (!question)
    return standardResponse(
      false,
      null,
      "missing_question",
      "Question is missing"
    );

  try {
    const res = await fetch("/api/supabase/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data: apiResponseInterface = await res.json();

    return standardResponse(data.success, data.data, data.error, data.message);
  } catch (error) {
    return standardResponse(false, null, error, "Unable to insert.");
  }
};

export const uploadQuestion = async (question: Question) => {
  if (!question) return;

  try {
    const res: StandardResponseInterface = await insertQuestion(question);
    const questionID = res.data[0].question_id;

    if (!res.success || !questionID) return null;

    return questionID;
  } catch (error) {
    console.error(error);
    return null;
  }
};
