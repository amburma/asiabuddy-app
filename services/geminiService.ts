import { SupportedLanguage } from '@/types/country';

const API_ENDPOINT = "https://asiabuddy.app/api/web-chat";

function getLanguageName(code: SupportedLanguage): string {
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
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  language: SupportedLanguage,
  systemContext?: string,
  country: string = "thailand"
): Promise<string> {
  const langName = getLanguageName(language);

  const quotaError: Record<string, string> = {
    MM: "⚠️ ယနေ့အတွက် အသုံးပြုမှု ကန့်သတ်ချက် ပြည့်သွားပါပြီ။ မနက်ဖြန် ပြန်လာပေးပါ။ 🙏",
    EN: "⚠️ Daily usage limit reached. Please try again tomorrow. Thank you for your patience. 🙏",
    TH: "⚠️ ถึงขีดจำกัดประจำวันแล้ว กรุณาลองใหม่พรุ่งนี้ 🙏",
    DE: "⚠️ Tageslimit erreicht. Bitte versuchen Sie es morgen erneut. 🙏",
    FR: "⚠️ Limite quotidienne atteinte. Veuillez reessayer demain. 🙏",
    ES: "⚠️ Limite diario alcanzado. Por favor, intentelo manana. 🙏",
  };

  try {
    const sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        sessionId: sessionId,
        country: country,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 429) {
        return quotaError[language] || quotaError.EN;
      }
      throw new Error(errorData.error || "API request failed");
    }

    const data = await response.json();
    
    // Check if API returned a fallback response (AI unavailable)
    if (data.fallback === true && data.reason === 'ai_unavailable') {
      const fallbackError = new Error('AI_UNAVAILABLE') as Error & { fallback: boolean };
      fallbackError.fallback = true;
      throw fallbackError;
    }
    
    return (
      data.response ||
      "Server အရမ်း Busy ဖြစ်နေလို့ ခဏနေမှ ပြန်အသုံးပြုပေးပါ။"
    );
  } catch (error: any) {
    console.error("Concierge Chat Error:", error);
    
    // Re-throw fallback errors so components can handle them
    if (error.fallback === true) {
      throw error;
    }
    
    return language === "MM"
      ? "အဆင်မပြေဖြစ်နေပါသည်။ ခဏနေမှ ပြန်လာပေးပါ။ 🙏"
      : "Server အရမ်း Busy ဖြစ်နေလို့ ခဏနေမှ ပြန်အသုံးပြုပေးပါ။";
  }
}
