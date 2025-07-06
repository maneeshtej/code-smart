import { GoogleGenAI } from "@google/genai";

// You can keep your API key here for dev, but prefer using .env in production
const ai = new GoogleGenAI({
  apiKey: "AIzaSyCCO6u65g8EfqYIuKFsPqjUi7JCSf2Bt9g", // Or use: process.env.GEMINI_API_KEY
});

export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "Hello from Gemini!";

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = result;
    console.log(response);
    const text = response.text;

    return new Response(JSON.stringify({ content: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Gemini Error]", err);

    return new Response(
      JSON.stringify({ error: err.message || "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
