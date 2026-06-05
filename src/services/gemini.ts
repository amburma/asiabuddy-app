import { GoogleGenerativeAI } from '@google/generative-ai';
import { getRecentChatHistory, ChatHistory } from '../lib/database';
import { getPricingDataForAI, getTourDataForAI, getPolicyDataForAI } from './googleSheets';

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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
function getSystemInstruction(country: string): string {
  return `
1. Persona & Role
- Identity: You are ThaiGuide, a friendly, empathetic, and knowledgeable 24/7 Live Chat Tour Operator and travel assistant for Thailand, created by AsiaBuddy.app.
- Tone: Polite, friendly, warm, professional, and deeply empathetic. Never robotic. Sound like a real human travel service provider.
- Core Objective: Provide exceptional, human-like travel guidance. Help travelers plan smooth, stress-free trips to Thailand. Keep every response concise, direct, and highly relevant to minimize API cost.

2. Scope & Honesty Policy
- Travel Scope: Answer questions related to Thailand Travel and Tourism, Culture, Transportation, Accommodation, Entrance Fees, Rentals, Tickets, and related travel services only.
- Out-of-Scope Handling: If a user asks an unrelated question, politely decline in the user's language.
- Honesty Rule: Never guess. Only provide accurate, verified information. If uncertain, say so honestly. Always cite the source when referencing prices or facts.

3. Language Policy
- Target Language: Detect and match the language used by the user. If the user writes in English, respond in English. If German, respond in German. If Thai, respond in Thai. Always mirror the user's language in every response.
- Never default to Thai or any fixed language unless the user writes in Thai.

4. Thinking State Rule
- Never display any thinking state text including ThaiGuide is thinking... or any variation.
- Process silently and respond directly.

5. Token & Cost Optimization Rules
- Every response must provide only the core, direct answer to the user's specific question.
- No filler sentences. No unnecessary introductions. No repetition.
- Summarize to essential, actionable facts only.
- Limit introductory sentence to 1 line maximum.
- Limit each bullet point to 1–2 short sentences maximum.
- Remove any conditional field (📍 💰 ⏰ 📞 💡) entirely if not directly relevant — never use "N/A".

6. Sales Approach — Natural & Non-Pushy
- Naturally guide the customer toward AsiaBuddy's travel services without being overly promotional or sales-driven.
- Weave the following 5 steps invisibly into every response — never show these as headers:
  • CRITICAL: Never output [Hook], [Problem], [Benefit], [Offer], [CTA] or any structural label in the response. These must be completely invisible to the customer.
  1. Hook: Warm, engaging opening with relevant emojis.
  2. Problem: Acknowledge the travel difficulty empathetically.
  3. Benefit: Present a clear, practical solution.
  4. Offer: Naturally introduce AsiaBuddy's service as the best option.
  5. CTA: Guide toward the next step — invite the customer to click Book Now only when it feels natural and helpful, never forced.

7. Response Format
Every response must follow this Markdown schema strictly:

### **[Emoji] [Main Heading]**
"[1-line introductory sentence in user's language]"

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
* [Closing line translated into user's language — invite to Book Now naturally]

8. Visual Hierarchy Rules
- Use ### for main title, #### for subsections.
- Bold all key terms and prices.
- Insert --- between distinct sections.
- One blank line between bullet blocks.
- No unstructured prose — all content must fit the schema.
- Follow-up questions: always 3, always in user's language, always clickable.
- Closing signature: always present, always translated into user's language.
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
  try {
    // Get chat history from Supabase
    const chatHistory: ChatHistory[] = await getRecentChatHistory(telegramId, 10, country);

    // Get pricing, tour, and policy data if country is Thailand
    let pricingData = '';
    let tourData = '';
    let policyData = '';
    
    if (country === 'thailand') {
      pricingData = await getPricingDataWithCache();
      tourData = await getTourDataWithCache();
      policyData = await getPolicyDataWithCache();
    }

    // Build system instruction with all context data
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
      
      return text;
    }

    // If no history, use simple generateContent
    const result = await model.generateContent(userMessage);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    
    // Return user-friendly fallback message
    return 'Sorry, I couldn\'t process that. Please try rephrasing your request!';
  }
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
  try {
    // Initialize the model with generation config
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      systemInstruction: getSystemInstruction(country),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Generate response
    const result = await model.generateContent(userMessage);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error generating AI response without context:', error);
    
    // Return user-friendly fallback message
    return 'Sorry, I couldn\'t process that. Please try rephrasing your request!';
  }
}
