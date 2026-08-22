export async function translateText(
  text: string,
  targetLanguage: string,
  options?: { raw?: boolean }
): Promise<string> {
  if (
    targetLanguage === 'EN' ||
    targetLanguage === 'en' ||
    !text?.trim()
  ) {
    return text
  }

  const langMap: Record<string, string> = {
    'EN': 'English',
    'MY': 'Myanmar (Burmese)',
    'MM': 'Myanmar (Burmese)',
    'ZH': 'Chinese (Simplified)',
    'JA': 'Japanese',
    'KO': 'Korean',
    'DE': 'German',
    'FR': 'French',
    'ES': 'Spanish',
    'AR': 'Arabic',
    'RU': 'Russian',
    'TH': 'Thai',
  }

  const langName = langMap[targetLanguage] || targetLanguage
  const promptText = options?.raw
    ? text
    : `Translate to ${langName}. Return ONLY the translation, nothing else:\n${text}`

  try {
    const keys = [
      process.env.GEMINI_PRO_API_KEY,
    ].filter(Boolean)

    if (keys.length === 0) return text

    const key = keys[Math.floor(Math.random() * keys.length)]
    const model = 'gemini-2.5-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: promptText,
          }],
        }],
      }),
    })

    if (!response.ok) {
      console.error(`Gemini API error: ${response.status} ${response.statusText}`)
      return text
    }

    const responseText = await response.text()

    const data = JSON.parse(responseText)
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text

  } catch (error) {
    console.error('[translate] Error:', error)
    return text
  }
}

interface TourTranslationData {
  title: string
  short_description: string
  description: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itineraries: Array<{
    title: string
    content: string
    highlights: string[]
    meals_included: string[]
    accommodation: string | null
  }>
}

interface TranslatedTourData {
  title: string
  short_description: string
  description: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itineraries: Array<{
    title: string
    content: string
    highlights: string[]
    meals_included: string[]
    accommodation: string | null
  }>
}

export async function translateTourBatch(
  data: TourTranslationData,
  targetLanguage: string
): Promise<TranslatedTourData> {
  if (
    targetLanguage === 'EN' ||
    targetLanguage === 'en'
  ) {
    return data
  }

  const langMap: Record<string, string> = {
    'EN': 'English',
    'MY': 'Myanmar (Burmese)',
    'MM': 'Myanmar (Burmese)',
    'ZH': 'Chinese (Simplified)',
    'JA': 'Japanese',
    'KO': 'Korean',
    'DE': 'German',
    'FR': 'French',
    'ES': 'Spanish',
    'AR': 'Arabic',
    'RU': 'Russian',
    'TH': 'Thai',
  }

  const langName = langMap[targetLanguage] || targetLanguage

  const promptText = `Translate the following JSON object to ${langName}. 
Translate ONLY the string values, preserving the exact JSON structure and keys.
Return ONLY the translated JSON object with no additional text or markdown formatting.

${JSON.stringify(data, null, 2)}`

  try {
    const keys = [
      process.env.GEMINI_PRO_API_KEY,
    ].filter(Boolean)

    if (keys.length === 0) return data

    const key = keys[Math.floor(Math.random() * keys.length)]
    const model = 'gemini-2.5-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: promptText,
          }],
        }],
      }),
    })

    if (!response.ok) {
      console.error(`Gemini API error: ${response.status} ${response.statusText}`)
      return data
    }

    const responseText = await response.text()

    const dataResponse = JSON.parse(responseText)
    const translatedText = dataResponse?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!translatedText) {
      console.error('[translateTourBatch] No translated text in response')
      return data
    }

    // Remove markdown code blocks if present
    const cleanJsonText = translatedText.replace(/^```json\s*\n?/, '').replace(/^```\s*\n?/, '').replace(/\n?```\s*$/, '')

    try {
      const translatedData = JSON.parse(cleanJsonText)
      return translatedData
    } catch (parseError) {
      console.error('[translateTourBatch] Failed to parse translated JSON:', cleanJsonText)
      return data
    }

  } catch (error) {
    console.error('[translateTourBatch] Error:', error)
    return data
  }
}
