// app/thailand/services/geminiService.ts

export async function streamGeminiResponse(messages: any[]) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response;
  } catch (error) {
    console.error('Gemini Service Error:', error);
    throw error;
  }
}