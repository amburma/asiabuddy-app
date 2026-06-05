import { ThaiLanguage } from "../types";

// API endpoint for chat requests
const API_ENDPOINT = "https://asiabuddy.app/api/web-chat";

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
  const langName = getLanguageName(language);

  const quotaError: Record<string, string> = {
    MM: "\u26A0\uFE0F \u101A\u1014\u1031\u1037\u1021\u1010\u103C\u1000\u103A \u1021\u101E\u102F\u1036\u1038\u1015\u103C\u102F\u1019\u103A \u1000\u1014\u103A\u1037\u101E\u1010\u103A\u1001\u103B\u1000\u103A \u1015\u103C\u100A\u103A\u101E\u103D\u102C\u1038\u1015\u102B\u104B \u1019\u1014\u1000\u103A\u1016\u103C\u1014\u103A \u1015\u103C\u1014\u103A\u101C\u102C \u1016\u103C\u1031\u1006\u102D\u102F\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u104B \ud83d\ude4f",
    EN: "\u26A0\uFE0F Daily usage limit reached. Please try again tomorrow. Thank you for your patience. \ud83d\ude4f",
    TH: "\u26A0\uFE0F \u0E16\u0E36\u0E07\u0E02\u0E35\u0E14\u0E08\u0E33\u0E01\u0E31\u0E14\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E27\u0E31\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E1E\u0E23\u0E38\u0E48\u0E07\u0E19\u0E35\u0E49 \ud83d\ude4f",
    DE: "\u26A0\uFE0F Tageslimit erreicht. Bitte versuchen Sie es morgen erneut. \ud83d\ude4f",
    FR: "\u26A0\uFE0F Limite quotidienne atteinte. Veuillez reessayer demain. \ud83d\ude4f",
    ES: "\u26A0\uFE0F Limite diario alcanzado. Por favor, intentelo manana. \ud83d\ude4f",
  };

  try {
    // Generate a session ID for this conversation
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Call the API endpoint
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        sessionId: sessionId,
        systemInstruction: systemContext
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 429) {
        return quotaError[language] || quotaError.EN;
      }
      throw new Error(errorData.error || 'API request failed');
    }

    const data = await response.json();
    return data.response || "I apologize, but I am unable to provide information at this time.";
  } catch (error: any) {
    console.error("Concierge Chat Error:", error);
    return language === "MM"
      ? "\u1021\u1001\u1000\u103A\u1021\u101C\u102C\u1038 \u1016\u103C\u1031\u1006\u102D\u102F\u1014\u102D\u102F\u1004\u103A\u101B\u1014\u103A\u1015\u102B\u104B \ud83d\ude4f"
      : "Something went wrong. Please try again shortly. \ud83d\ude4f";
  }
}