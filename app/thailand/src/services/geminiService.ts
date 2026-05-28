import { GoogleGenAI } from "@google/genai";
import { ThaiLanguage } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || ""
});

function getLanguageName(code: ThaiLanguage): string {
  const map: Record<string, string> = {
    EN: "English",
    TH: "Thai (à¸ à¸²à¸©à¸²à¹„à¸—à¸¢)",
    MM: "Burmese (á€—á€™á€¬á€˜á€¬á€žá€¬)",
    DE: "German (Deutsch)",
    FR: "French (FranÃ§ais)",
    ES: "Spanish (EspaÃ±ol)",
  };
  return map[code] || "English";
}

export async function getConciergeResponse(
  message: string,
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  language: ThaiLanguage,
  systemContext?: string,
) {
  const model = "gemini-2.0-flash";
  const langName = getLanguageName(language);

  const systemInstruction = `
You are ThaiGuide by AsiaBuddy.app â€” a Thailand travel assistant.
${systemContext ? `FOCUS: ${systemContext}` : ''}

LANGUAGE: Respond ONLY in ${langName}. Never use English unless ${langName} is English. Never mix languages.

STRICT SCOPE: You MUST only answer Thailand travel topics (Tourism, Culture, Transport, Accommodation, Food, Shopping, Medical, Nightlife, Visa, VAT, Safety). If the question is unrelated, respond ONLY with the out-of-scope message defined in the code below in ${langName}. Do NOT answer unrelated questions under any circumstances.

THINKING STATE â€” UI ONLY, NEVER WRITE IN RESPONSE:
Never write "ThaiGuide is thinking..." in your response text.

RESPONSE FORMAT â€” Markdown schema, no unstructured prose:

### **[Emoji] [Main Heading in ${langName}]**
"[1 sentence intro in ${langName}]"

#### **[Emoji] [Sub-Heading]**

* **[Key Term]**: [1-2 sentences in ${langName}].
* **â° Hours**: [Times] *(only if relevant)*
* **ðŸ’° Price**: [Cost] *(only if relevant)*
* **ðŸ“ž Contact**: [Phone/URL] *(only if relevant)*
* **ðŸ’¡ Pro-Tip**: [Tip] *(only if relevant)*

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
        ? "âš ï¸ á€šá€”á€±á€·á€¡á€á€½á€€á€º á€¡á€žá€¯á€¶á€¸á€•á€¼á€¯á€™á€¾á€¯ á€€á€”á€·á€ºá€žá€á€ºá€á€»á€€á€º á€•á€¼á€Šá€·á€ºá€žá€½á€¬á€¸á€•á€«á€•á€¼á€®á‹ á€™á€”á€€á€ºá€–á€¼á€”á€º á€•á€¼á€”á€ºá€œá€Šá€ºá€€á€¼á€­á€¯á€¸á€…á€¬á€¸á€•á€«á‹ á€™á€±á€á€¹á€á€¬á€›á€•á€ºá€á€¶á€•á€«á€žá€Šá€ºá‹ ðŸ™"
        : language === 'TH'
        ? "âš ï¸ à¸–à¸¶à¸‡à¸‚à¸µà¸”à¸ˆà¸³à¸à¸±à¸”à¸à¸²à¸£à¹ƒà¸Šà¹‰à¸‡à¸²à¸™à¸›à¸£à¸°à¸ˆà¸³à¸§à¸±à¸™à¹à¸¥à¹‰à¸§ à¸à¸£à¸¸à¸“à¸²à¸¥à¸­à¸‡à¹ƒà¸«à¸¡à¹ˆà¸žà¸£à¸¸à¹ˆà¸‡à¸™à¸µà¹‰ à¸‚à¸­à¸šà¸„à¸¸à¸“à¸ªà¸³à¸«à¸£à¸±à¸šà¸„à¸§à¸²à¸¡à¸­à¸”à¸—à¸™ ðŸ™"
        : language === 'DE'
        ? "âš ï¸ Tageslimit erreicht. Bitte versuchen Sie es morgen erneut. Danke fÃ¼r Ihre Geduld. ðŸ™"
        : language === 'FR'
        ? "âš ï¸ Limite quotidienne atteinte. Veuillez rÃ©essayer demain. Merci de votre patience. ðŸ™"
        : language === 'ES'
        ? "âš ï¸ LÃ­mite diario alcanzado. Por favor, intÃ©ntelo maÃ±ana. Gracias por su paciencia. ðŸ™"
        : "âš ï¸ Daily usage limit reached. Please try again tomorrow. Thank you for your patience. ðŸ™";
    }
    
    return language === 'MM'
      ? "á€á€…á€ºá€…á€¯á€¶á€á€…á€ºá€›á€¬ á€¡á€á€€á€ºá€¡á€á€²á€–á€¼á€…á€ºá€žá€½á€¬á€¸á€•á€«á€žá€Šá€ºá‹ á€á€á€€á€¼á€¬á€•á€¼á€®á€¸ á€‘á€•á€ºá€…á€™á€ºá€¸á€€á€¼á€Šá€·á€ºá€•á€«á‹ ðŸ™"
      : "Something went wrong. Please try again shortly. ðŸ™";
  }
}
