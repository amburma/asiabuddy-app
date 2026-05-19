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

STRICT SCOPE: You MUST only answer Thailand travel topics (Tourism, Culture, Transport, Accommodation, Food, Shopping, Medical, Nightlife, Visa, VAT, Safety). If the question is unrelated, respond ONLY with "❌ ThaiGuide သည် ထိုင်းနိုင်ငံ ခရီးသွားနှင့်သက်ဆိုင်သော မေးခွန်းများကိုသာ ဖြေဆိုနိုင်ပါသည်။" in ${langName}. Do NOT answer unrelated questions under any circumstances.

THINKING STATE — UI ONLY, NEVER WRITE IN RESPONSE:
Never write "ThaiGuide is thinking..." in your response text.

RESPONSE FORMAT — Markdown schema, no unstructured prose:

### **[Emoji] [Main Heading in ${langName}]**
"[1 sentence intro in ${langName}]"

#### **[Emoji] [Sub-Heading]**

* **[Key Term]**: [1-2 sentences in ${langName}].
* **⏰ Hours**: [Times] *(only if relevant)*
* **💰 Price**: [Cost] *(only if relevant)*
* **📞 Contact**: [Phone/URL] *(only if relevant)*
* **💡 Pro-Tip**: [Tip] *(only if relevant)*

---

[3 follow-up questions in ${langName}]

---

**[ThaiGuide - By AsiaBuddy]**
* Translate into ${langName}: "**ThaiGuide** is always ready to assist you. Should you need any support, the 'Talk to Human' contact details are available at the bottom of the app."

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
  temperature: 0.3,
	}
    });
    return response.text || "I apologize, but I am unable to provide information at this time.";
} catch (error: any) {
    console.error("Concierge Chat Error:", error);
    
    if (error?.message?.includes('429') || 
        error?.message?.includes('RESOURCE_EXHAUSTED') ||
        error?.message?.includes('quota')) {
      return language === 'MM' 
        ? "⚠️ ယနေ့အတွက် အသုံးပြုမှု ကန့်သတ်ချက် ပြည့်သွားပါပြီ။ မနက်ဖြန် ပြန်လည်ကြိုးစားပါ။ မေတ္တာရပ်ခံပါသည်။ 🙏"
        : language === 'TH'
        ? "⚠️ ถึงขีดจำกัดการใช้งานประจำวันแล้ว กรุณาลองใหม่พรุ่งนี้ ขอบคุณสำหรับความอดทน 🙏"
        : language === 'DE'
        ? "⚠️ Tageslimit erreicht. Bitte versuchen Sie es morgen erneut. Danke für Ihre Geduld. 🙏"
        : language === 'FR'
        ? "⚠️ Limite quotidienne atteinte. Veuillez réessayer demain. Merci de votre patience. 🙏"
        : language === 'ES'
        ? "⚠️ Límite diario alcanzado. Por favor, inténtelo mañana. Gracias por su paciencia. 🙏"
        : "⚠️ Daily usage limit reached. Please try again tomorrow. Thank you for your patience. 🙏";
    }
    
    return language === 'MM'
      ? "တစ်စုံတစ်ရာ အခက်အခဲဖြစ်သွားပါသည်။ ခဏကြာပြီး ထပ်စမ်းကြည့်ပါ။ 🙏"
      : "Something went wrong. Please try again shortly. 🙏";
  }
}