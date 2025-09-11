import { Question } from "@/constants/interfaces/questionInterfaces";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import {
  generateQuestionPrompt,
  relatedQuestionsPrompt,
} from "@/constants/prompts/geminiPrompts";
import { standardResponse } from "@/constants/responses/apiResponse";

export const generateQuestionWithGemini = async (question: string) => {
  if (!question) {
    return standardResponse(
      false,
      null,
      "missing_question",
      "Please chack the question"
    );
  }

  const prompt = generateQuestionPrompt(question);

  if (!prompt) {
    console.error("Prompt not created");
    return standardResponse(false, null, "no_promp", "Prompt not genarated");
  }

  try {
    const res = await fetch("/api/gemini/general", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data: apiResponseInterface = await res.json();
    return standardResponse(data.success, data.data, data.error, data.message);
  } catch (error) {
    return standardResponse(false, null, error, "Failed to fetch");
  }
};

export const generateRelatedQuestions = async (question: Question) => {
  if (!question) {
    return standardResponse(
      false,
      null,
      "missing_question",
      "Please chack the question"
    );
  }

  const prompt = relatedQuestionsPrompt(
    question.title,
    question.question,
    question.description
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
