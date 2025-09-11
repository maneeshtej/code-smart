import { Question } from "@/constants/interfaces/questionInterfaces";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { judgePrompt } from "@/constants/prompts/geminiPrompts";
import { standardResponse } from "@/constants/responses/apiResponse";

export const askGeminiAssistantInEditor = async (prompt: string) => {
  if (!prompt)
    return standardResponse(false, null, "no_prompt", "Prompt is not passed");
  try {
    const res = await fetch("/api/gemini/general", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data: apiResponseInterface = await res.json();
    return standardResponse(data.success, data.data, data.error, data.message);
  } catch (error) {
    return standardResponse(false, null, error, "Something failed");
  }
};

export const judgeWithGemini = async (
  mainCode?: string,
  functionCode?: string,
  question?: Question
) => {
  if (!mainCode || !functionCode || !question)
    return standardResponse(
      false,
      null,
      "params_missing",
      "Something is missing"
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

    return standardResponse(data.success, data.data, data.error, data.message);
  } catch (error) {
    return standardResponse(false, null, error, "Something Failed");
  }
};
