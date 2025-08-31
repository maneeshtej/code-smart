import { Question } from "@/constants/interfaces/questionInterfaces";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { apiResponse } from "@/constants/responses/apiResponse";

export const insertQuestion = async (question: Question) => {
  if (!question)
    return apiResponse(
      false,
      null,
      "missing_question",
      "Question is missing",
      400
    );

  try {
    const res = await fetch("/api/supabase/insert/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data: apiResponseInterface = await res.json();

    return data;
  } catch (error) {
    return apiResponse(false, null, error, "Unable to insert.", 400);
  }
};

export const uploadQuestion = async (question: Question) => {
  if (!question) return;

  try {
    const res: apiResponseInterface = await insertQuestion(question);
    const questionID = res.data[0].question_id;

    if (!res.success || !questionID) return null;

    return questionID;
  } catch (error) {
    console.error(error);
    return null;
  }
};
