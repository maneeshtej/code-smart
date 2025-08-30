import { apiResponse } from "@/constants/responses/apiResponse";
import { getGeminiClient } from "@/lib/gemini/geminiClient";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  if (!prompt)
    return apiResponse(false, null, "prompt-missing", "Prompt is missing", 400);

  const ai = getGeminiClient();

  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const text = res.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const cleanedText = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");

    const parsed = JSON.parse(cleanedText);
    return apiResponse(true, parsed, null, "Generated successfully");

    console.log(res);
  } catch (error) {
    return apiResponse(false, null, error, "Failed", 400);
  }
}
