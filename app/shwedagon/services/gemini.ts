export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export async function chatWithAmbassador(
  message: string,
  history: ChatMessage[],
  languageName: string
): Promise<string> {
  try {
    const response = await fetch("/shwedagon/api/chat-with-ambassador", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history,
        targetLanguage: languageName,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text;
  } catch (error: any) {
    console.error("chatWithAmbassador error:", error);
    throw error;
  }
}

// Keep this export to avoid import errors in page.tsx
export async function translateToMyanmar(text: string, messages?: any[], langName?: string): Promise<string> {
  return text;
}
