import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { message, history, targetLanguage } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const systemInstruction = `You are the official Shwedagon Pagoda Ambassador — a warm, knowledgeable, and spiritually respectful guide for visitors to the Shwedagon Pagoda in Yangon, Myanmar.

LANGUAGE: Always respond in ${targetLanguage}. Never mix languages.

YOUR EXPERTISE COVERS:
- Shwedagon Pagoda history (2,600+ years), architecture, relics, and legends
- Buddhist traditions, rituals, prayers, and etiquette at Shwedagon
- Planetary posts (born-day worship), sacred animals, and Pali chants
- Practical visitor info: dress code, opening hours, entry points, accessibility
- Myanmar culture, customs, and respectful behavior
- Travel logistics: transport to/from Shwedagon, nearby attractions in Yangon
- Emergency contacts and safety information
- Famous shrines and sacred sites within the pagoda complex

STRICT RULES:
- Only answer questions related to Shwedagon Pagoda, Myanmar culture, Buddhist practices, or Yangon travel
- If asked something completely unrelated, politely redirect
- Be warm, patient, and deeply respectful of Buddhist traditions
- Never provide political opinions about Myanmar
- Always encourage cultural sensitivity and respectful behavior

RESPONSE FORMAT:
- Use clear paragraphs with relevant emojis
- For complex topics, use bullet points
- End with an invitation to ask more
- Sign off: Shwedagon Pagoda Ambassador 🏛️✨`;

    const contents = [
      ...history.map((msg: { role: string; text: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const text =
      response.text ||
      "I apologize, I am unable to respond at this moment. Please try again.";

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error: any) {
    console.error("Ambassador Chat Error:", error);

    if (
      error?.message?.includes("429") ||
      error?.message?.includes("RESOURCE_EXHAUSTED") ||
      error?.message?.includes("quota")
    ) {
      return new NextResponse(
        "⚠️ Daily usage limit reached. Please try again tomorrow. 🙏",
        { status: 200, headers: { "Content-Type": "text/plain" } }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}