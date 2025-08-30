import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { generateQuestionPrompt } from "@/constants/prompts/geminiPrompts";
import { apiResponse } from "@/constants/responses/apiResponse";

export const generateQuestionWithGemini = async (question: string) => {
  if (!question) {
    return apiResponse(
      false,
      null,
      "missing_question",
      "Please chack the question"
    );
  }

  const prompt = generateQuestionPrompt(question);

  try {
    const res = await fetch("/api/gemini/general", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data: apiResponseInterface = await res.json();
    return data;
  } catch (error) {
    return apiResponse(false, null, error, "Failed to fetch", 400);
  }
};
