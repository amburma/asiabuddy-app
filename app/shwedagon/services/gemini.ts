import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const ai = new GoogleGenerativeAI(apiKey);

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export async function translateToMyanmar(text: string): Promise<string> {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Translate the following text to Myanmar (Burmese) language. Return only the translated text without any explanation:\n\n${text}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function chatWithAmbassador(
  message: string,
  history: ChatMessage[],
  languageName: string
): Promise<string> {
  if (!apiKey) {
    throw new Error("Gemini API key is missing.");
  }

  const systemInstruction = `You are the AsiaBuddy AI Ambassador for the Shwedagon Pagoda in Yangon, Myanmar.
Your goal is to guide international and local pilgrims with deep cultural reverence, historical accuracy, and absolute politeness.
Respond flawlessly, engagingly, and dynamically in the requested language mode or current conversation context. 
Current Active Language Mode: ${languageName}.
Core Knowledge Guidelines:
1. Shwedagon Pagoda is over 2,600 years old, built during the lifetime of Kakusandha, Konagamana, Kassapa, and Gautama Buddhas (enshrining 8 sacred hair relics of Gautama Buddha).
2. It rises 112 meters high on Singuttara Hill.
3. Key structural sites: Padamya Myat Shin (Ruby-eyed Buddha), Victory Ground (Aung Myay), Banyan Tree, and Planetary Posts (devotees pour water based on birth days).
4. Dress code/Rules: Modest attire required (shoulders and knees covered). Shoes, socks, and stockings must be completely removed before entering the sacred pagoda terrace platform.
Formatting Rules:
- Keep answers engaging, highly informative, structured with logical bullet points or paragraphs, and spiritually respectful yet intensely practical.
- Use clean Markdown tags where appropriate. Do not use complex HTML layout structures.`;

  const model = ai.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction,
  });

  const chat = model.startChat({
    history: history.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    })),
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 1500,
    },
  });

  const result = await chat.sendMessage(message);
  return result.response.text();
}