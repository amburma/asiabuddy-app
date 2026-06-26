import { NextResponse } from 'next/server'
import { translateText } from '@/lib/translate'

export async function GET() {
  try {
    const inputText = "Explore the magic of Thailand beside AsiaBuddy."
    const targetLanguage = "th"
    
    const translatedText = await translateText(inputText, targetLanguage)
    
    return NextResponse.json({
      success: true,
      input: inputText,
      targetLanguage,
      output: translatedText,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
