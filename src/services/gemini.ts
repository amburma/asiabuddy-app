import { GoogleGenerativeAI } from '@google/generative-ai';
import { getRecentChatHistory, ChatHistory } from '../lib/database';
import { getPricingDataForAI, getTourDataForAI, getPolicyDataForAI } from './googleSheets';

let currentKeyIndex = 0;

function getApiKeys(): string[] {
  const keys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
  ].filter(Boolean) as string[];
  if (keys.length === 0) throw new Error('No Gemini API keys configured');
  return keys;
}

function getNextApiKey(excludeIndices: Set<number> = new Set()): string {
  const keys = getApiKeys();
  
  // Find next available key that hasn't been tried
  let attempts = 0;
  while (attempts < keys.length) {
    if (!excludeIndices.has(currentKeyIndex)) {
      const key = keys[currentKeyIndex];
      currentKeyIndex = (currentKeyIndex + 1) % keys.length;
      return key;
    }
    currentKeyIndex = (currentKeyIndex + 1) % keys.length;
    attempts++;
  }
  
  throw new Error('All API keys exhausted');
}

// Cache data to avoid repeated API calls
let cachedPricingData: string | null = null;
let pricingDataCacheTime: number = 0;
const PRICING_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

let cachedTourData: string | null = null;
let tourDataCacheTime: number = 0;
const TOUR_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

let cachedPolicyData: string | null = null;
let policyDataCacheTime: number = 0;
const POLICY_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Get pricing data with caching
 * @returns Pricing data string
 */
async function getPricingDataWithCache(): Promise<string> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedPricingData && (now - pricingDataCacheTime) < PRICING_CACHE_DURATION) {
    return cachedPricingData;
  }

  // Fetch fresh pricing data
  try {
    cachedPricingData = await getPricingDataForAI();
    pricingDataCacheTime = now;
    return cachedPricingData;
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    // Return cached data even if expired, or empty string if no cache
    return cachedPricingData || '';
  }
}

/**
 * Get tour data with caching
 * @returns Tour data string
 */
async function getTourDataWithCache(): Promise<string> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedTourData && (now - tourDataCacheTime) < TOUR_CACHE_DURATION) {
    return cachedTourData;
  }

  // Fetch fresh tour data
  try {
    cachedTourData = await getTourDataForAI();
    tourDataCacheTime = now;
    return cachedTourData;
  } catch (error) {
    console.error('Error fetching tour data:', error);
    // Return cached data even if expired, or empty string if no cache
    return cachedTourData || '';
  }
}

/**
 * Get policy data with caching
 * @returns Policy data string
 */
async function getPolicyDataWithCache(): Promise<string> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedPolicyData && (now - policyDataCacheTime) < POLICY_CACHE_DURATION) {
    return cachedPolicyData;
  }

  // Fetch fresh policy data
  try {
    cachedPolicyData = await getPolicyDataForAI();
    policyDataCacheTime = now;
    return cachedPolicyData;
  } catch (error) {
    console.error('Error fetching policy data:', error);
    // Return cached data even if expired, or empty string if no cache
    return cachedPolicyData || '';
  }
}

// Dynamic system instruction generator based on country
export function getSystemInstruction(country: string): string {
  return `
# System Prompt: ThaiGuide (AsiaBuddy.app)

## 🤖 1. Persona & Role

* **Identity:** You are ThaiGuide, a friendly, empathetic, and knowledgeable 24/7 Live Chat Tour Operator and travel assistant for Thailand, created by AsiaBuddy.app.
* **Tone:** Polite, friendly, warm, professional, and deeply empathetic. Never robotic. Sound like a real human travel service provider.
* **Core Objective:** Provide exceptional, human-like travel guidance. Help travelers plan smooth, stress-free trips to Thailand. Keep every response concise, direct, and highly relevant to minimize API cost.

## 🛡️ 2. Scope & Honesty Policy

* **Travel Scope:** Answer questions related to Thailand Travel and Tourism, Culture, Transportation, Accommodation, Entrance Fees, Rentals, Tickets, and related travel services only.
* **Out-of-Scope Handling:** If a user asks an unrelated question, politely decline in the user's language.
* **Honesty Rule:** Never guess. Only provide accurate, verified information. If uncertain, say so honestly.

## 🌐 3. Language Policy

* **Target Language:** Detect and match the language used by the user. If the user writes in English, respond in English. If German, respond in German. If Thai, respond in Thai. Always mirror the user's language in every response.
* **Never Default:** Never default to Thai or any fixed language unless the user writes in Thai.

## 🎯 4. Token & Cost Optimization Rules

* NEVER output "ThaiGuide is thinking...", "AI is thinking...", or any thinking/processing/loading text in any language. This is strictly forbidden.
* Every response must provide only the core, direct answer to the user's specific question.
* No filler sentences. No unnecessary introductions. No repetition.
* Summarize to essential, actionable facts only.
* Limit introductory sentence to 1 line maximum.
* Limit each bullet point to 1–2 short sentences maximum.
* Remove any conditional field (📍 💰 ⏰ 📞 💡) entirely if not directly relevant — never use "N/A".

## 🛍️ 5. Sales Approach — Natural & Non-Pushy

Naturally guide the customer toward AsiaBuddy's travel services without being overly promotional or sales-driven. Weave the following 5 steps invisibly into every response:

* **CRITICAL CONSTRAINT:** Never show these structural steps as headers. Never output [Hook], [Problem], [Benefit], [Offer], [CTA], or any structural label in the response. These must be completely invisible to the customer.
1. **Hook:** Warm, engaging opening with relevant emojis.
2. **Problem:** Acknowledge the travel difficulty empathetically.
3. **Benefit:** Present a clear, practical solution.
4. **Offer:** Naturally introduce AsiaBuddy's service as the best option.
5. **CTA (Call to Action):** Invite the customer to click Book Now ONLY when the conversation topic is directly related to these AsiaBuddy services: Car Rental, Hotel Booking, Flight Ticket, Entrance Tickets, Day Tour, Join Tour, Package Tour, Customize Tour, Tour, Trip. For all other topics (general info, culture, language, food recommendations, safety tips, etc.), do NOT mention Book Now at all.
* **BOOKING CONFIRMATION TRIGGER:** When the customer clearly agrees to proceed with booking (e.g., "yes", "ok", "confirm", "book it", "let's do it", or equivalent in any language), you MUST include exactly [SHOW_CONTACT_FORM] at the very end of your response. This tag is invisible to the customer — never explain it, never show it as text. Only include it when the customer has clearly confirmed they want to book.

## 📋 6. Response Format

Use this format as a flexible guide, not a strict template. Adapt naturally to the conversation flow while respecting the Markdown layout, visual elements, and token constraints.

### **[Emoji] [Main Heading]**

#### **[Emoji] [Sub-Heading]**

* **[Key Term]**: [Description — 1-2 sentences max]
* **📍 [Location]**: [Google Maps link or info] ← only if relevant
* **⏰ [Hours]**: [Operating hours] ← only if relevant
* **💰 [Price]**: [Cost or fee] ← only if relevant
* **📞 [Contact]**: [Phone or website] ← only if relevant
* **💡 [Pro-Tip]**: [Insider advice] ← only if relevant

---

[3 clickable follow-up questions in user's language]

---

**[ThaiGuide - By AsiaBuddy]**

* [Closing line translated into user's language — invite to Book Now naturally if topic-appropriate]

## 🎨 7. Visual Hierarchy Rules

* Use ### for main title, #### for subsections.
* Bold all key terms and prices.
* Insert --- between distinct sections.
* One blank line between bullet blocks.
* No unstructured prose — all content must fit the schema.
* Follow-up questions: Always exactly 3, always in user's language, always clickable.
* Closing signature: Always present, always translated into user's language.
`;
}

/**
 * Map Supabase ChatHistory to Gemini SDK format
 * @param chatHistory - Chat history from Supabase
 * @returns Formatted chat history for Gemini SDK
 */
function mapChatHistoryToGeminiFormat(chatHistory: ChatHistory[]): Array<{ role: 'user' | 'model', parts: Array<{ text: string }> }> {
  return chatHistory.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.message_text }]
  }));
}

/**
 * Check if error is a quota error (429 or RESOURCE_EXHAUSTED)
 */
function isQuotaError(error: any): boolean {
  const errorMessage = error?.message || String(error);
  return errorMessage.includes('429') || 
         errorMessage.includes('RESOURCE_EXHAUSTED') ||
         errorMessage.includes('quota') ||
         errorMessage.includes('rate limit');
}

/**
 * Check if response text indicates quota exhaustion
 */
function isQuotaResponseText(text: string): boolean {
  const lower = text.toLowerCase();
  return lower.includes("couldn't process") ||
         lower.includes("unable to process") ||
         lower.includes("try rephrasing") ||
         lower.includes("cannot process your request");
}

/**
 * Generate AI response using Gemini 2.5 Flash Lite with chat history context
 * @param telegramId - User's Telegram ID
 * @param userMessage - Current user message
 * @param country - Country for dynamic system instruction (default: 'thailand')
 * @param systemInstruction - Optional custom system instruction to override default
 * @returns AI response text
 */
export async function generateAIResponse(
  telegramId: number,
  userMessage: string,
  country: string = 'thailand',
  systemInstruction?: string
): Promise<string> {
  const triedKeyIndices = new Set<number>();
  const keys = getApiKeys();
  
  // Get chat history from Supabase (fetch once, reuse for all retries)
  const chatHistory: ChatHistory[] = await getRecentChatHistory(telegramId, 10, country);

  // Get pricing, tour, and policy data if country is Thailand (fetch once, reuse for all retries)
  let pricingData = '';
  let tourData = '';
  let policyData = '';
  
  if (country === 'thailand') {
    pricingData = await getPricingDataWithCache();
    tourData = await getTourDataWithCache();
    policyData = await getPolicyDataWithCache();
  }

  // Build system instruction with all context data (build once, reuse for all retries)
  let instruction = systemInstruction || getSystemInstruction(country);
  
  if (pricingData) {
    instruction += `\n\n${pricingData}\n\nWhen users ask about pricing, rates, costs, or fees, use the above pricing data to provide accurate information. If the specific pricing information is not available in the data, inform the user that you don't have current pricing for that item and suggest they contact AsiaBuddy directly for the most accurate quote.`;
  }
  
  if (tourData) {
    instruction += `\n\n${tourData}\n\nWhen users ask about tours, itineraries, or travel packages, use the above tour itinerary data to provide detailed information. If specific tour information is not available, suggest they contact AsiaBuddy for personalized tour planning.`;
  }
  
  if (policyData) {
    instruction += `\n\n${policyData}\n\nWhen users ask about cancellation policies, booking rules, hotel policies, or refund terms, use the above policy data to provide accurate information. Always inform users about important cancellation deadlines and fees.`;
  }

  // Try each available key
  for (let attempt = 0; attempt < keys.length; attempt++) {
    try {
      const apiKey = getNextApiKey(triedKeyIndices);
      triedKeyIndices.add((currentKeyIndex - 1 + keys.length) % keys.length);
      
      const genAI = new GoogleGenerativeAI(apiKey);

      // Initialize the model with generation config
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-lite',
        systemInstruction: instruction,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });

      // If there's chat history, use startChat with history
      if (chatHistory.length > 0) {
        const geminiHistory = mapChatHistoryToGeminiFormat(chatHistory);
        const chat = model.startChat({ history: geminiHistory });
        
        const result = await chat.sendMessage(userMessage);
        const response = result.response;
        const text = response.text();
        
        if (isQuotaResponseText(text)) {
          console.log('Quota response text detected, retrying with next key...');
          continue;
        }
        
        return text;
      }

      // If no history, use simple generateContent
      const result = await model.generateContent(userMessage);
      const response = result.response;
      const text = response.text();

      if (isQuotaResponseText(text)) {
        console.log('Quota response text detected, retrying with next key...');
        continue;
      }

      return text;
    } catch (error: any) {
      console.error(`Error generating AI response with key attempt ${attempt + 1}/${keys.length}:`, JSON.stringify(error?.message || error));
      
      // If it's a quota error, try next key
      if (isQuotaError(error)) {
        console.log('Quota error detected, retrying with next key...');
        continue;
      }
      
      // If it's not a quota error, throw immediately
      throw error;
    }
  }
  
  // All keys exhausted
  console.error('All API keys exhausted for generateAIResponse');
  return 'Server အရမ်း Busy ဖြစ်နေလို့ ခဏနေမှ ပြန်အသုံးပြုပေးပါ။ Respond in the same language the user was using in this conversation.';
}

/**
 * Generate AI response without chat history context (for new conversations)
 * @param userMessage - User message
 * @param country - Country for dynamic system instruction (default: 'thailand')
 * @returns AI response text
 */
export async function generateAIResponseWithoutContext(
  userMessage: string,
  country: string = 'thailand'
): Promise<string> {
  const triedKeyIndices = new Set<number>();
  const keys = getApiKeys();
  const instruction = getSystemInstruction(country);
  
  // Try each available key
  for (let attempt = 0; attempt < keys.length; attempt++) {
    try {
      const apiKey = getNextApiKey(triedKeyIndices);
      triedKeyIndices.add((currentKeyIndex - 1 + keys.length) % keys.length);
      
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Initialize the model with generation config
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-lite',
        systemInstruction: instruction,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });

      // Generate response
      const result = await model.generateContent(userMessage);
      const response = result.response;
      const text = response.text();

      if (isQuotaResponseText(text)) {
        console.log('Quota response text detected, retrying with next key...');
        continue;
      }

      return text;
    } catch (error: any) {
      console.error(`Error generating AI response without context with key attempt ${attempt + 1}/${keys.length}:`, JSON.stringify(error?.message || error));
      
      // If it's a quota error, try next key
      if (isQuotaError(error)) {
        console.log('Quota error detected, retrying with next key...');
        continue;
      }
      
      // If it's not a quota error, throw immediately
      throw error;
    }
  }
  
  // All keys exhausted
  console.error('All API keys exhausted for generateAIResponseWithoutContext');
  return 'Server အရမ်း Busy ဖြစ်နေလို့ ခဏနေမှ ပြန်အသုံးပြုပေးပါ။ Respond in the same language the user was using in this conversation.';
}
