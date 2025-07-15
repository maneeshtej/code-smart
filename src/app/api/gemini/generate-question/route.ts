import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) throw new Error("GEMINI_API_KEY is not defined in .env.local");

    const ai = new GoogleGenAI({ apiKey });

    const { prompt } = await req.json();

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return NextResponse.json({ text: result.text });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Gemini Error:", err.message);
    } else {
      console.error("Unknown error", err);
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
