import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const languages = [
  'myanmar', 'english', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

const englishTemplate = `# Thailand General Information

## 1. Basics & Cultural Etiquette

*   **[The Greeting (Wai)]:** *Thais greet others by pressing their palms together in a prayer-like gesture and bowing slightly.*
*   **[Men]:** Say "Sawasdee Krub"
*   **[Women]:** Say "Sawasdee Ka"
*   **[Dress Code]:** __<u>Modest attire is mandatory</u>__ at the Grand Palace and all Temples (Wats). Shoulders and knees must be covered; sleeveless tops, ripped jeans, and short skirts are strictly prohibited.
*   **[Tipping Etiquette]:** *Not mandatory but appreciated.* Large restaurants usually add a 10% service charge. For small vendors or taxis, rounding up the change is a common local practice.

## 2. Logistics & Connectivity

*   **[Transport Apps]:** Download **Grab** or **Bolt** for reliable rides and transparent pricing. Use **Google Maps** for real-time bus and train schedules.
*   **[Public Transit]:** Utilize the **BTS (Skytrain)** and **MRT (Subway)** to bypass Bangkok’s famous traffic jams.
*   **[Connectivity]:** Purchase a **Tourist SIM Card** (AIS, TrueMove, or DTAC) at the airport upon arrival for instant 5G access.
*   **[The "7-Eleven" Rule]:** These stores are open __<u>24/7</u>__ and are your best resource for snacks, emergency supplies, and bill payments.

## 3. Safety & Health

*   **[Emergency Numbers]:**
    -   **[Tourist Police]:** **1155** (English speaking)
    -   **[Ambulance]:** **1669**
*   **[Scam Alert]:** *If a driver tells you a major landmark is "closed for a holiday" or "closed today," politely decline.* It is almost always a scam to take you to a high-commission jewelry or tailor shop.
*   **[Medical]:** **Bumrungrad** and **Bangkok Hospital** provide world-class international care. **Boots/Watsons** pharmacies are available in every mall.

## 4. Money Matters

*   **[Currency]:** **Thai Baht (THB)**.
*   **[Best Exchange]:** Look for **SuperRich** (Orange or Green) for the highest rates compared to banks.
*   **[Payment]:** __<u>Cash is King</u>__ at street markets and food stalls. Use Credit Cards for malls, hotels, and fine dining.
*   **[ATM Usage]:** Expect a **220 Baht fee** per withdrawal for international cards. Withdraw larger amounts to minimize fees.

## 5. Food, Sightseeing & Climate

*   **[Must-Eat]:** **Tom Yum Goong**, **Pad Thai**, and **Mango Sticky Rice**.
*   **[Top Landmarks]:** **Grand Palace**, **Wat Arun**, and **Wat Pho**.
*   **[Best Shopping]:** **Siam Paragon** (Luxury) and **Iconsiam** (Riverfront).
*   **[Weather]:** *Hot and humid (28°C - 35°C).* The rainy season is June to October. Always carry a lightweight poncho.

---

## Do’s and Don’ts in Thailand

### __<u>Monarchy</u>__
*   **[Do]:** **Show Deep Respect**—*Treat all images of the King with reverence.*
*   **[Don't]:** **Never Deface Currency**—*Stepping on a coin or bill is a crime as it bears the King's image.*

### __<u>Social</u>__
*   **[Do]:** **The "Smile"**—*Use a smile to resolve minor conflicts or confusion.*
*   **[Don't]:** **No Touching Heads**—*The head is sacred. Never touch anyone (including children) on the head.*

### __<u>Etiquette</u>__
*   **[Do]:** **Remove Shoes**—*Take off footwear before entering homes or temple interiors.*
*   **[Don't]:** **No Feet Pointing—Never point your feet at people, monks, or Buddha statues.*

### __<u>Transport</u>__
*   **[Do]:** **Ask for the Meter**—*Ensure the "Meter" is on before the taxi starts moving.*
*   **[Don't]:** **No Public Anger**—*Avoid shouting or losing your temper (this causes "loss of face").*

### __<u>Safety</u>__
*   **[Do]:** **Drink Bottled Water**—*Only drink sealed, bottled, or filtered water.*
*   **[Don't]:** **Respect Buddha**—*Do not climb on statues or use Buddha images as fashion/tattoos.*`;

async function translateAll() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return;
  }

  const ai = new GoogleGenAI({ apiKey });

  const translations: Record<string, string> = { english: englishTemplate };

  for (const lang of languages) {
    if (lang === 'english') continue;

    console.log(`Translating to ${lang}...`);
    const prompt = `Translate the following Markdown text about Thailand Travel Information into ${lang}. 
Keep the Markdown structure exactly same, including headers (##, ###), bold (**), italics (*), underlines (__<u>...</u>__), and horizontal rules (---). 
Translate the content but keep specific names like "Grab", "Bolt", "Google Maps", "BTS", "MRT", "Tourist SIM", "AIS", "TrueMove", "DTAC", "7-Eleven", "Bumrungrad", "Bangkok Hospital", "Boots", "Watsons", "SuperRich", "Thai Baht", "THB", "Tom Yum Goong", "Pad Thai", "Mango Sticky Rice", "Siam Paragon", "Iconsiam", "Grand Palace", "Wat Arun", "Wat Pho" in their original form or their common local transliteration if applicable, but prefer keeping them recognizable.
Translate phrases like "[Do]", "[Don't]", "[Yes]", "[No]", "[Men]", "[Women]" into the target language.

Text:
${englishTemplate}`;

    try {
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      const translatedText = result.text.trim().replace(/^```markdown\n/, '').replace(/\n```$/, '');
      translations[lang] = translatedText;
    } catch (error) {
      console.error(`Failed to translate ${lang}:`, error);
      translations[lang] = `Error translating to ${lang}`;
    }
  }

  const outputFilePath = path.join(process.cwd(), "src/data/generalInformation.ts");
  
  let outputContent = "import { ThaiLanguage } from '../types';\n\n";
  outputContent += "export const GENERAL_INFORMATION: Record<ThaiLanguage, string> = {\n";
  
  for (const lang of languages) {
    const escapedContent = translations[lang].replace(/`/g, "\\`").replace(/\${/g, "\\${");
    outputContent += `  ${lang}: \`${escapedContent}\`,\n`;
  }
  
  outputContent += "};\n";

  fs.writeFileSync(outputFilePath, outputContent);
  console.log("Translation complete and file updated.");
}

translateAll();
