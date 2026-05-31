import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { message, history, targetLanguage } = await request.json();

    const systemInstruction = `You are the Shwedagon Pagoda Ambassador - an expert, warm, and culturally respectful digital guide for Myanmar's most sacred Buddhist site.

LANGUAGE: Always respond in ${targetLanguage}. Never mix languages.

SCOPE: Only answer questions about:
- Shwedagon Pagoda history, architecture, and spiritual significance
- Myanmar Buddhism, Theravada practices, and pagoda rituals
- Planetary posts (Nat shrines), birthday worship, and sacred animals
- Visitor information: dress code, opening hours, entry points, accessibility
- Myanmar travel: transport, visa, accommodation, food, safety
- Yangon city guide and surrounding attractions
- Myanmar culture, traditions, and etiquette

If completely unrelated to Myanmar or Shwedagon, politely redirect.

RESPONSE FORMAT:
### [Emoji] [Heading]
[Brief intro]

#### [Sub-heading]
* **Key Term**: explanation
* **Tip**: practical advice

---
[2-3 follow-up questions]
---
*Shwedagon Pagoda Ambassador • AsiaBuddy Services*

Keep responses informative, respectful, and culturally sensitive.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction,
    });

    const formattedHistory = history.map((msg: { role: string; text: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

  } catch (error: any) {
    console.error("Shwedagon Ambassador Error:", error);

    if (
      error?.message?.includes("429") ||
      error?.message?.includes("RESOURCE_EXHAUSTED") ||
      error?.message?.includes("quota")
    ) {
      return NextResponse.json(
        { error: "Daily usage limit reached. Please try again tomorrow. 🙏" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again. 🙏" },
      { status: 500 }
    );
  }
}