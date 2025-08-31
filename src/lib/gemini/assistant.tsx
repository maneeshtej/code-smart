import { Question } from "@/constants/interfaces/questionInterfaces";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { judgePrompt } from "@/constants/prompts/geminiPrompts";
import { apiResponse } from "@/constants/responses/apiResponse";

export const askGeminiAssistantInEditor = async (prompt: string) => {
  try {
    const res = await fetch("/api/gemini/general", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return apiResponse(false, null, error, "Something failed", 400);
  }
};

export const judgeWithGemini = async (
  mainCode?: string,
  functionCode?: string,
  question?: Question
) => {
  if (!mainCode || !functionCode || !question)
    return apiResponse(
      false,
      null,
      "params_missing",
      "Something is missing",
      400
    );

  const prompt = judgePrompt(
    question.title,
    question.question,
    functionCode,
    question.description,
    mainCode
  );

  try {
    const res = await fetch("/api/gemini/general", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data: apiResponseInterface = await res.json();

    return data;
  } catch (error) {
    return apiResponse(false, null, error, "Something Failed, 400");
  }
};
