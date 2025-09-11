import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { generateCodePrompt } from "@/constants/prompts/geminiPrompts";
import {
  apiResponse,
  standardResponse,
} from "@/constants/responses/apiResponse";

export const generateCurrentLanguageCodeWithGemini = async (
  currentLanguage?: string,
  title?: string,
  question?: string,
  description?: string
) => {
  if (!currentLanguage)
    return standardResponse(false, null, "no_language", "No Language Provided");

  const prompt = generateCodePrompt(
    currentLanguage,
    title,
    question,
    description
  );

  if (!prompt)
    return standardResponse(
      false,
      null,
      "prompt_generate_failed",
      "Prompt has failed to generate"
    );

  try {
    const res = await fetch("api/gemini/general", {
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
