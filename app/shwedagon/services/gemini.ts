import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}
export async function translateToMyanmar(text: string): Promise<string> {
  const prompt = `Translate the following text to Myanmar (Burmese) language. Return only the translated text without any explanation:\n\n${text}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  });
  return response.text || "";
}
export async function chatWithAmbassador(
  message: string,
  history: ChatMessage[],
  languageName: string
) {
  if (!apiKey) {
    console.error("API Key Configuration Missing Status Error");
    throw new Error("Gemini API key is missing. Please configure NEXT_PUBLIC_GEMINI_API_KEY in your deployment environment.");
  }

  // System prompt guidelines tailored specifically for Shwedagon Pagoda expert knowledge
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

  try {
    // 🛠️ ရှင်းလင်းပြီး စနစ်ကျသော Array Mapping ပုံစံဖြင့် Error ကို ပြင်ဆင်ထားပါသည်
    const contents = history.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Append the active user query message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.35,
        maxOutputTokens: 1500
      }
    });

    if (!response || !response.text) {
      throw new Error("Empty response received from GenAI platform engine.");
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini SDK Communication Infrastructure Error:", error);
    throw new Error(error?.message || "Failed to retrieve information from Shwedagon AI Ambassador.");
  }
}