export async function translateText(
  text: string,
  targetLanguage: string
): Promise<string> {
  if (
    targetLanguage === 'EN' ||
    targetLanguage === 'en' ||
    !text?.trim()
  ) {
    return text
  }

  const langMap: Record<string, string> = {
    'FR': 'French',
    'DE': 'German',
    'TH': 'Thai',
    'MM': 'Burmese',
    'ES': 'Spanish',
  }

  const langName = langMap[targetLanguage] || targetLanguage

  try {
    const keys = [
      process.env.GEMINI_API_KEY_1,
      process.env.GEMINI_API_KEY_2,
      process.env.GEMINI_API_KEY_3,
    ].filter(Boolean)

    if (keys.length === 0) return text

    const key = keys[Math.floor(Math.random() * keys.length)]

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Translate to ${langName}. Return ONLY the translation, nothing else:\n${text}`
            }]
          }]
        })
      }
    )

    if (!response.ok) {
      console.error(`Gemini API error: ${response.status} ${response.statusText}`)
      return text
    }

    const data = await response.json()
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text

  } catch (error) {
    console.error('[translate] Error:', error)
    return text
  }
}
