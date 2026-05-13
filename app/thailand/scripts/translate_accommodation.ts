import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY! });
const modelName = 'gemini-3-flash-preview';

const languages = [
  'thai', 'spanish', 'french', 'italian', 'german', 'portuguese', 'russian', 'arabic', 'chinese', 'hindi', 'japanese', 'korean', 'burmese', 'malay', 'indonesian', 'vietnamese', 'hebrew'
];

const englishContent = `
# Comprehensive Guide to Accommodations in Thailand

---

## 1. Hotel Categories (1-Star to 5-Star)

Thailand offers a wide range of hotels categorized by star ratings to fit various budgets and preferences:

*   **1-Star Hotels (Most Budget-Friendly):**
    *   **Features:** Includes only basic necessities such as a bed, fan (or air conditioning), and a bathroom. Elevators or on-site restaurants are usually not available.
    *   **Best For:** Travelers seeking the lowest possible price who only need a place to sleep.

*   **2-Star Hotels (Basic Hotels):**
    *   **Features:** Slightly better than 1-star properties. Typically includes a TV, telephone, and basic toiletries. Some may have a small restaurant or a 24-hour reception desk.
    *   **Best For:** Budget travelers who prioritize basic security and cleanliness.

*   **3-Star Hotels (Mid-Range):**
    *   **Features:** Offers spacious rooms and improved service. Amenities often include a swimming pool, telephone lines, Wi-Fi, air conditioning, a gym, and an on-site restaurant.
    *   **Best For:** Travelers wanting comfort at a moderate price.

*   **4-Star Hotels (Upscale Hotels):**
    *   **Features:** Provides high-end services such as a spa, fine dining, 24-hour room service, and elegant room furnishings.
    *   **Best For:** Vacationers and those who appreciate premium services.

*   **5-Star Hotels (Luxury Hotels):**
    *   **Features:** World-class services including panoramic views, personal butlers, advanced security, and full luxury amenities.
    *   **Best For:** Travelers seeking luxury, high-level privacy, and personalized security.

---

## 2. Alternative Accommodations

*   **Inn:** Smaller than hotels and commonly found along main roads or city outskirts. They often combine lodging with dining services (e.g., Rambuttri Village Inn).
*   **Motel:** Designed for long-distance drivers, featuring parking spaces with direct access to rooms. These are usually found along major highways rather than in city centers.
*   **Guest House:** Usually family-run with a warm, hospitable atmosphere. These are affordable and allow travelers to experience the local lifestyle.
*   **Hostel:** Features dormitory-style shared rooms with bunk beds. Bathrooms and common areas are shared. It is an excellent choice for solo travelers looking to meet new people.
*   **Temporary Rent Apartment / Aparthotel:** Rooms equipped with kitchens, living areas, and washing machines. Some are "Service Apartments" offering hotel-like amenities (e.g., Oakwood Suites or Arcadia Suites).
    *   **Best For:** Long-term residents (one week or more) or families who prefer to cook their own meals.

---

## 3. Essential "Dos" and "Don'ts"

### Dos (Things to Do):
*   **Carry Official Identification:** A Passport is mandatory for check-in. Keeping a photocopy or a photo of your passport on your phone is useful for emergencies.
*   **Choose Location Wisely:** In major cities like Bangkok, prioritize staying within a 5 to 10-minute walk of a BTS (Skytrain) or MRT (Subway) station to save time and taxi fares.
*   **Prepare Cash for Deposits:** Most hotels require a security deposit (usually 1,000 to 3,000 Baht) before issuing room keys. This is refunded upon check-out, but keep extra cash on hand for this purpose.
*   **Read Reviews:** Before booking on Agoda or Booking.com, carefully read reviews from other travelers, specifically regarding cleanliness and safety.

### Don'ts (Things to Avoid):
*   **Do Not Trust Street Touts:** Avoid individuals at airports, train stations, or bus terminals who claim to have "cheap hotels." These places are often poor quality or located in isolated areas.
*   **Do Not Smoke in Rooms:** Most Thai hotels strictly enforce a non-smoking policy. Violations can result in fines ranging from 2,000 to 5,000 Baht.
*   **Do Not Bring Durians:** Most hotels ban durians due to the strong odor. Bringing them can result in fines or eviction.
*   **Do Not Leave Valuables Unattended:** Use the in-room Safety Deposit Box. Do not leave wallets or jewelry exposed on beds or tables.

---

## 4. Important Tips for Travelers

*   **Use Booking Apps:** Agoda is based in Thailand and often provides the best prices and widest selection of hotels within the country.
*   **Check for "Joiner Fees":** If you book a room for one person and later wish to have a friend stay over, some hotels may charge an extra "Joiner Fee."
*   **Be Cautious with Water:** Do not drink tap water directly. Stick to the complimentary bottled water provided by the hotel.
*   **Check-in/Check-out Times:** Standard Check-in is at 2:00 PM and Check-out is at 12:00 PM (Noon). If you arrive early, hotels usually offer free luggage storage.
*   **Book Smartly:** While Airbnb is available for condos or apartments, daily or short-term rentals (1-2 days) are technically illegal in some residential buildings. Hotels remain a safer and more reliable option.
*   **Comparison:** Use apps like Agoda, Booking.com, or Expedia to compare prices and secure the best deals.
`;

const englishUI = {
  title: 'Ask any Accommodations in Thailand you want to know.',
  detailsTitle: 'Accommodations in Thailand',
  modalTitle: 'Comprehensive Guide to Accommodations in Thailand',
  suggestions: [
    'What are the common hotel star ratings in Thailand?',
    'Is Agoda the best app for booking hotels in Thailand?',
    'What are "Joiner Fees" in Thai hotels?',
    'Should I book a Guest House or a Hostel for a local experience?'
  ]
};

async function translate() {
  for (const lang of languages) {
    console.log(`Translating to ${lang}...`);
    
    // Translate Guide
    const promptGuide = `Translate this Markdown guide about accommodations in Thailand to ${lang}. Keep the same structure, headers, and bullet points. Content: ${englishContent}`;
    const resultGuide = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: promptGuide }] }]
    });
    const translatedGuide = resultGuide.text || '';
    
    // Translate UI
    const promptUI = `Translate these UI keys to ${lang} as a JSON object. Keys: ${JSON.stringify(englishUI)}. Output only valid JSON.`;
    const resultUI = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: promptUI }] }]
    });
    const translatedTextUI = resultUI.text || '{}';
    const translatedUI = JSON.parse(translatedTextUI.trim().replace(/```json\n?/, '').replace(/```/, ''));
    
    // Update data/accommodationGuide.ts
    let guideFile = fs.readFileSync('src/data/accommodationGuide.ts', 'utf8');
    const guideRegex = new RegExp(`${lang}: '',`);
    guideFile = guideFile.replace(guideRegex, `${lang}: \`${translatedGuide}\`,`);
    fs.writeFileSync('src/data/accommodationGuide.ts', guideFile);
    
    // Update src/i18n.ts
    let i18nFile = fs.readFileSync('src/i18n.ts', 'utf8');
    
    // Find the language block start
    const langStart = i18nFile.indexOf(`${lang}: {`);
    if (langStart === -1) {
      console.log(`Could not find block for ${lang}`);
      continue;
    }
    
    // Find visa block within that language block
    const visaMatch = i18nFile.substring(langStart).match(/visa:\s*{[\s\S]*?modalTitle:\s*".*?"\s*}/);
    if (!visaMatch) {
      console.log(`Could not find visa block for ${lang}`);
      continue;
    }
    
    const visaBlock = visaMatch[0];
    const uiStr = `,\n    accommodation: ${JSON.stringify(translatedUI, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'")}`;
    
    // Replace only the first occurrence after langStart
    const beforeVisa = i18nFile.substring(0, langStart + visaMatch.index! + visaBlock.length);
    const afterVisa = i18nFile.substring(langStart + visaMatch.index! + visaBlock.length);
    i18nFile = beforeVisa + uiStr + afterVisa;
    
    fs.writeFileSync('src/i18n.ts', i18nFile);
    
    console.log(`Finished ${lang}.`);
  }
}

translate().catch(err => {
  console.error(err);
  process.exit(1);
});
