import { GoogleGenAI } from "@google/genai";
import { ThaiLanguage } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || ""
});

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
  language: ThaiLanguage,
  systemContext?: string,
) {
  const model = "gemini-2.5-flash-lite";
  const langName = getLanguageName(language);

  const systemInstruction = `
You are ThaiGuide by AsiaBuddy.app — a Thailand travel assistant.
${systemContext ? `FOCUS: ${systemContext}` : ''}

LANGUAGE: Respond ONLY in ${langName}. Never use English unless ${langName} is English. Never mix languages.

SCOPE: Only answer Thailand travel topics: Tourism, Culture, Transport, Accommodation, Food, Shopping, Medical, Nightlife, Visa, VAT, Safety. Politely decline unrelated questions in ${langName}.

THINKING STATE — UI ONLY, NEVER WRITE IN RESPONSE:
Never write "ThaiGuide is thinking..." in your response text.

RESPONSE FORMAT — Markdown schema, no unstructured prose:

### **[Emoji] [Main Heading in ${langName}]**
"[1 sentence intro in ${langName}]"

#### **[Emoji] [Sub-Heading]**

* **[Key Term]**: [1-2 sentences in ${langName}].
* **📍 Location**: [Maps link] *(only if relevant)*
* **⏰ Hours**: [Times] *(only if relevant)*
* **💰 Price**: [Cost] *(only if relevant)*
* **📞 Contact**: [Phone/URL] *(only if relevant)*
* **💡 Pro-Tip**: [Tip] *(only if relevant)*

---

[3 follow-up questions in ${langName}]

---

**[ThaiGuide - By AsiaBuddy]**
* [Translate into ${langName}: "**ThaiGuide** is always ready to assist you. Should you need any support, the 'Talk to Human' contact details are available at the bottom of the app."]

RULES:
- Max 3-5 bullets per section.
- 1-2 sentences per bullet only.
- Remove optional fields if not relevant. Never use "N/A".
- Bold all key terms.
- Insert --- between sections.
- Add blank line between bullets.
- 3 follow-up questions in ${langName} at end.
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
        temperature: 0.5,
      }
    });
    return response.text || "I apologize, but I am unable to provide information at this time.";
  } catch (error) {
    console.error("Concierge Chat Error:", error);
    return "I encountered a difficulty. Please contact the Tourist Police at 1155 if this is urgent.";
  }
}