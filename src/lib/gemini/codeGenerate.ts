import { generateCodePrompt } from "@/constants/prompts/geminiPrompts";
import { apiResponse } from "@/constants/responses/apiResponse";

export const generateCurrentLanguageCodeWithGemini = async (
  currentLanguage?: string,
  title?: string,
  question?: string,
  description?: string
) => {
  if (!currentLanguage)
    return apiResponse(false, null, "no_language", "No Language Provided", 400);

  const prompt = generateCodePrompt(
    currentLanguage,
    title,
    question,
    description
  );

  if (!prompt)
    return apiResponse(
      false,
      null,
      "prompt_generate_failed",
      "Prompt has failed to generate",
      400
    );

  try {
    const res = await fetch("api/gemini/general", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return apiResponse(false, null, error, "Something Failed", 400);
  }
};
