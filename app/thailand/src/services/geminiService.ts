import { GoogleGenAI } from "@google/genai";
import { UI_TRANSLATIONS } from "../i18n";
import { ThaiLanguage } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || ""
});

function getGreeting(code: ThaiLanguage): string {
  const greetings: Record<ThaiLanguage, string> = {
    EN: "Sawasdee khrap. I am ThaiGuide from AsiaBuddy.app. How can I help you today? 🙏✨",
    TH: "สวัสดีครับ ผม ThaiGuide จาก AsiaBuddy.app ครับ วันนี้มีอะไรให้ช่วยไหมครับ? 🙏✨",
    MM: "ဆဝါဒီးခရပ်။ ကျွန်တော်သည် AsiaBuddy.app မှ ThaiGuide ဖြစ်ပါသည်။ ယနေ့ လူကြီးမင်းကို ဘာများ ကူညီပေးရမလဲ? 🙏✨",
    DE: "Sawasdee khrap. Ich bin ThaiGuide von AsiaBuddy.app. Wie kann ich Ihnen heute helfen? 🙏✨",
    FR: "Sawasdee khrap. Je suis ThaiGuide d'AsiaBuddy.app. Comment puis-je vous aider aujourd'hui? 🙏✨",
    ES: "Sawasdee khrap. Soy ThaiGuide de AsiaBuddy.app. ¿En qué puedo ayudarte hoy? 🙏✨",
  };
  return greetings[code] || greetings["EN"];
}

function getLanguageName(code: ThaiLanguage): string {
  const map: Record<string, string> = {
    EN: "English",
    TH: "Thai (ภาษาไทย)",
    MM: "Burmese (ဗမာဘာသာ)",
    DE: "German (Deutsch)",
    FR: "French (Français)",
    ES: "Spanish (Español)",
  };
  return map[code] || "English";
}

export async function getConciergeResponse(
  message: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  language: ThaiLanguage
) {
  const model = "gemini-2.5-flash-lite-preview-06-17";
  const langName = getLanguageName(language);

  const systemInstruction = `
You are ThaiGuide, a friendly travel assistant for Thailand, created by AsiaBuddy.app.

### CRITICAL LANGUAGE RULE
You MUST respond ONLY in ${langName}. Never use any other language. Never mix languages.

### SCOPE
Only answer questions related to Thailand travel, tourism, culture, transport, accommodation, food, safety, and practical tips. Politely decline unrelated questions in ${langName}.

### INITIAL GREETING
When starting a new conversation, display ONLY this exact greeting:
"${getGreeting(language)}"

### RESPONSE FORMAT — MANDATORY
Do NOT use Markdown symbols such as #, ##, ###, *, **, or --- in your response.
Use plain text only. Structure your response using line breaks and clear labels instead.

Format every response like this:

[Emoji] [Main Topic Title in ${langName}]

[Introductory sentence in ${langName}]

[Section Label in ${langName}]:
- [Key Term]: [Description in ${langName}]
- [Key Term]: [Description in ${langName}]

Pro-Tip: [Helpful tip in ${langName}]

Follow-up questions:
1. [Question in ${langName}]
2. [Question in ${langName}]
3. [Question in ${langName}]

ThaiGuide — From AsiaBuddy | Tourist Police Hotline: 1155 | Available 24/7

[Closing in ${langName}]: ThaiGuide is always ready to assist you. To contact our staff, please use the contact buttons at the bottom of the App.

### RULES
- No Markdown symbols at all
- All text must be in ${langName} only
- Be friendly, polite, and helpful
- Do not invent information you are unsure about
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    return response.text || "I apologize, but I am unable to provide information at this time.";
  } catch (error) {
    console.error("Concierge Chat Error:", error);
    return "I encountered a difficulty. Please contact the Tourist Police at 1155 if this is urgent.";
  }
}