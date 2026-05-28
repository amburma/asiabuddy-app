import { GoogleGenAI } from "@google/genai";
import { ThaiLanguage } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || ""
});

function getLanguageName(code: ThaiLanguage): string {
  const map: Record<string, string> = {
    EN: "English",
    TH: "Thai",
    MM: "Burmese",
    DE: "German",
    FR: "French",
    ES: "Spanish",
  };
  return map[code] || "English";
}

export async function getConciergeResponse(
  message: string,
  history: { role: "user" | "model", parts: { text: string }[] }[],
  language: ThaiLanguage,
  systemContext?: string,
) {
  const model = "gemini-2.5-flash-lite";
  const langName = getLanguageName(language);

  const outOfScope: Record<string, string> = {
    MM: "\u274C ThaiGuide \u101E\u100E\u1031\u102C\u1011\u1000\u103A\u1001\u101B\u102E\u101E\u103C\u102C\u1038\u1014\u103E\u1004\u103A\u101E\u1000\u103A\u1006\u102D\u102F\u1004\u103A\u101E\u1031\u102C \u1019\u1031\u1038\u1001\u103D\u1014\u103A\u1038\u1019\u103B\u102C\u1038\u1000\u102D\u102F\u101E\u102C \u1016\u103C\u1031\u1006\u102D\u102F\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u101E\u100A\u103A\u104B",
    EN: "\u274C ThaiGuide can only answer Thailand travel-related questions.",
    TH: "\u274C ThaiGuide \u0E15\u0E2D\u0E1A\u0E04\u0E33\u0E16\u0E32\u0E21\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E17\u0E48\u0E2D\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E27\u0E43\u0E19\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19",
    DE: "\u274C ThaiGuide beantwortet nur Fragen zum Reisen in Thailand.",
    FR: "\u274C ThaiGuide ne repond qu'aux questions sur les voyages en Thailande.",
    ES: "\u274C ThaiGuide solo responde preguntas sobre viajes a Tailandia.",
  };

  const quotaError: Record<string, string> = {
    MM: "\u26A0\uFE0F \u101A\u1014\u1031\u1037\u1021\u1010\u103C\u1000\u103A \u1021\u101E\u102F\u1036\u1038\u1015\u103C\u102F\u1019\u103A \u1000\u1014\u103A\u1037\u101E\u1010\u103A\u1001\u103B\u1000\u103A \u1015\u103C\u100A\u103A\u101E\u103D\u102C\u1038\u1015\u102B\u104B \u1019\u1014\u1000\u103A\u1016\u103C\u1014\u103A \u1015\u103C\u1014\u103A\u101C\u102C \u1016\u103C\u1031\u1006\u102D\u102F\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u104B \ud83d\ude4f",
    EN: "\u26A0\uFE0F Daily usage limit reached. Please try again tomorrow. Thank you for your patience. \ud83d\ude4f",
    TH: "\u26A0\uFE0F \u0E16\u0E36\u0E07\u0E02\u0E35\u0E14\u0E08\u0E33\u0E01\u0E31\u0E14\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E27\u0E31\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E1E\u0E23\u0E38\u0E48\u0E07\u0E19\u0E35\u0E49 \ud83d\ude4f",
    DE: "\u26A0\uFE0F Tageslimit erreicht. Bitte versuchen Sie es morgen erneut. \ud83d\ude4f",
    FR: "\u26A0\uFE0F Limite quotidienne atteinte. Veuillez reessayer demain. \ud83d\ude4f",
    ES: "\u26A0\uFE0F Limite diario alcanzado. Por favor, intentelo manana. \ud83d\ude4f",
  };

  const systemInstruction = `
You are ThaiGuide by AsiaBuddy.app - a Thailand travel assistant.
${systemContext ? `FOCUS: ${systemContext}` : ""}

LANGUAGE: Respond ONLY in ${langName}. Never mix languages.

STRICT SCOPE: Only answer Thailand travel topics (Tourism, Culture, Transport, Accommodation, Food, Shopping, Medical, Nightlife, Visa, Immigration, VAT, Safety, Currency, Weather, Customs, Laws, Booking, Taxi, Airport Transfer, Hotels, Restaurants). Be generous in interpreting travel-related questions. If completely unrelated to Thailand or travel, respond with: "${outOfScope[language] || outOfScope.EN}"

RESPONSE FORMAT:
### [Emoji] [Main Heading]
[1 sentence intro]

#### [Emoji] [Sub-Heading]
* **[Key Term]**: [1-2 sentences]
* **Hours**: [Times]
* **Price**: [Cost]
* **Pro-Tip**: [Tip]

---
[3 follow-up questions]
---
**ThaiGuide - AsiaBuddy Services**

RULES:
- Max 3-5 bullets per section
- Bold all key terms
- 3 follow-up questions at end
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });
    return response.text || "I apologize, but I am unable to provide information at this time.";
  } catch (error: any) {
    console.error("Concierge Chat Error:", error);
    if (
      error?.message?.includes("429") ||
      error?.message?.includes("RESOURCE_EXHAUSTED") ||
      error?.message?.includes("quota")
    ) {
      return quotaError[language] || quotaError.EN;
    }
    return language === "MM"
      ? "\u1021\u1001\u1000\u103A\u1021\u101C\u102C\u1038 \u1016\u103C\u1031\u1006\u102D\u102F\u1014\u102D\u102F\u1004\u103A\u101B\u1014\u103A\u1015\u102B\u104B \ud83d\ude4f"
      : "Something went wrong. Please try again shortly. \ud83d\ude4f";
  }
}