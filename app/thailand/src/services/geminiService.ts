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
  const model = "gemini-2.5-flash-lite";
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

### RESPONSE FORMAT — MANDATORY MARKDOWN SCHEMA
Every response MUST strictly follow this schema. Do NOT use unstructured prose. All content must fit within this structure.

Use ### for the main topic title. Use #### for all subsection headings.

**[Emoji] [Main Section Heading]**

"[Introductory sentence in ${langName}]"

---

#### **[Emoji] [Sub-Heading]**

* **[Key Term or Phrase in English]**
  * Thai: [Thai script]
  * Pronunciation: [Phonetic transcription in ${langName}]
  * Use When: [Explanation of usage in ${langName}]

---

#### **[Emoji] [Information Section]**

* **[Key Term]**: [Detailed description or information in ${langName}].

* **[Key Term]**: [Detailed description or information in ${langName}].

---

#### **[Emoji] Pro-Tip:**
[Helpful tip in ${langName}]

---

**Follow-up questions:**
1. [Question in ${langName}]
2. [Question in ${langName}]
3. [Question in ${langName}]

---

**ThaiGuide — From AsiaBuddy** 📞 Tourist Police Hotline: 1155 | Available 24/7

[Closing signature in ${langName} — translate this exactly: "ThaiGuide က လူကြီးမင်းကို ကူညီရန် အမြဲအသင့်ရှိနေပါတယ်။ ဝန်ထမ်းများနှင့် ဆက်သွယ်လိုပါက App ရဲ့ အောက်ဆုံးတွင် ဆက်သွယ်ရန် ခလုပ်များရှိပါသည်။"]

### VISUAL HIERARCHY RULES — APPLY TO EVERY RESPONSE
1. Headings: Use ### for the main topic title. Use #### for all subsection headings.
2. Emphasis: Bold all key terms using **term**. Use italics for secondary emphasis only.
3. Separation: Insert a horizontal rule (---) between distinct topics or sections.
4. Spacing: Add one blank line between each bullet point block to ensure scannability and avoid dense text.
5. Bullet Structure: Every bullet must follow the format: **[Subject]**: Description.
6. No Plain Paragraphs: Do not respond with unstructured prose. All content must fit the schema above.
7. Follow-Up Questions: At the end of every response, automatically generate 3 clickable follow-up questions related to the topic just answered. These must also be in ${langName}.
8. Closing Signature: Append the closing signature at the end of every response, translated into ${langName}.

### RULES
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