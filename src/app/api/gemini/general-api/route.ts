import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    console.log("[API] Request received at /api/gemini/generate-question");

    const apiKey = process.env.GEMINI_API_KEY;
    console.log("GEMINI_API_KEY Loaded:", !!apiKey);

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined");
      throw new Error("GEMINI_API_KEY is not defined in .env.local");
    }

    const ai = new GoogleGenAI({ apiKey });
    console.log("GoogleGenAI client initialized");

    const body = await req.json();
    console.log("Request Body:", body);

    const prompt = body.prompt;
    if (!prompt) {
      console.error("Prompt is missing in request body");
      throw new Error("Prompt is missing");
    }
    console.log("Prompt Received:", prompt);

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // console.log(
    //   "Raw Response from Gemini API:",
    //   JSON.stringify(result, null, 2)
    // );

    // 5. Extract response text safely
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    console.log("🔹 Final Extracted Text:", text);

    return NextResponse.json({ text });
  } catch (err: unknown) {
    console.error("[API] Error during Gemini request");

    if (err instanceof Error) {
      console.error("Gemini Error Message:", err.message);

      try {
        const parsed = JSON.parse(err.message);
        console.error("Parsed Gemini Error Object:", parsed);
      } catch {
        console.error("Could not parse Gemini error message as JSON.");
      }
    } else {
      console.error("Unknown Error:", err);
    }

    return NextResponse.json(
      { error: "Something went wrong with Gemini" },
      { status: 500 }
    );
  }
};
