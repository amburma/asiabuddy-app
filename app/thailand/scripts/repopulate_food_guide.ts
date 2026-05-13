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

const englishTemplate = `# The Ultimate Thailand Food Guide: From Michelin Stars to Street Eats

Thai cuisine is world-renowned for its masterful balance of four fundamental flavors: **spicy, sour, sweet, and salty**. Whether you are dining at a Michelin-starred establishment or a roadside stall, here is everything you need to know for a seamless culinary journey.

## Must-Try Traditional Thai Dishes

*   **Tom Yum Goong (Spicy Shrimp Soup)**: A bold, spicy soup featuring shrimp and aromatic herbs like lemongrass, galangal, and kaffir lime leaves.
*   **Pad Thai**: Thailand’s national stir-fried noodle dish. It combines rice noodles, eggs, tofu, tamarind pulp, and fish sauce, topped with crushed peanuts.
*   **Som Tum (Spicy Green Papaya Salad)**: A famous dish from the Isan (Northeast) region made by pounding shredded green papaya, chilies, garlic, and lime.
*   **Massaman Curry**: A rich, coconut-milk-based curry that is relatively mild. It typically contains potatoes, peanuts, and meat (beef or chicken).
*   **Mango Sticky Rice (Khao Niew Mamuang)**: The quintessential dessert featuring sweet ripe mango served with glutinous rice and salted coconut cream.

## Categories of Dining Establishments

*   **Street Food**: The lifeblood of Thai food culture. The best stalls are often identified by large local crowds and typically specialize in only one or two signature dishes.
*   **Raat Khao (Rice and Curry)**: Casual shops displaying pre-cooked dishes in trays. You choose 2–3 toppings over jasmine rice. It is fast, affordable, and authentic.
*   **Mookata (Thai BBQ & Hot Pot)**: A social dining experience where you grill meats on a central dome while boiling vegetables in the surrounding soup moat.
*   **Riverside & Rooftop Dining**: Ideal for scenic views in cities like Bangkok or Chiang Mai. These venues often serve refined "Royal Thai Cuisine."

## Michelin Guide & Street Food Highlights

Thailand is one of the few places where street food vendors earn Michelin Stars.

*   **Jay Fai (Bangkok)**: Famous for her Crab Meat Omelet. As a world-renowned Michelin-starred street food spot, advance booking or long wait times are expected due to extreme popularity.
*   **Go-Ang Kaomunkai Pratunam**: A Michelin Bib Gourmand recipient famous for Hainanese Chicken Rice (Khao Mun Gai) served with a signature spicy sauce.
*   **Thipsamai Pad Thai**: Widely considered the best Pad Thai in Bangkok, utilizing shrimp oil for a deep, rich flavor.
*   **Pa Pae Guay Tiew (Chiang Mai)**: An excellent spot to try Khao Soy (Northern Thai Coconut Curry Noodle Soup) in a Michelin-recognized setting.

## Essential Websites & Apps for Travelers

### 1. Discovery & Reviews
*   **Wongnai**: Known as the "Yelp" or "TripAdvisor" of Thailand; it is the most popular app among locals. It features information on over 200,000 establishments, including menus, prices, and authentic user reviews for restaurants, spas, and beauty services.
*   **The MICHELIN Guide (App & Website)**: Provides curated lists from high-end Michelin Star restaurants to budget-friendly "Bib Gourmand" spots. It offers reliable quality assessments and direct table booking features.
*   **Street Food Maps - Bangkok (App)**: Specifically maps out famous street food stalls in Bangkok, including small local gems not found on major delivery apps.
*   **Google Maps**: Essential for navigation, checking real-time opening hours, and viewing user photos.

### 2. Food Delivery
*   **GrabFood**: The most versatile app for travelers, offering car-hailing, food delivery, and courier services. It has excellent English language support and accepts foreign credit cards.
*   **LINE MAN**: Integrated with Wongnai, allowing users to order directly from highly-rated local shops. It is popular for its vast variety of local stalls and frequent promotions.
*   **Foodpanda**: Provides wide coverage across major cities in Thailand with a user-friendly interface.

### 3. Table Reservations & Deals
*   **Eatigo**: A reservation app that offers significant discounts (up to 50%) when booking during off-peak hours.
*   **Chope**: Best for securing reservations at high-end fine-dining and popular upscale restaurants.

## Dietary Choices & Food Safety

### 1. Halal Options
Common in Southern Thailand and specific Bangkok districts (e.g., Sukhumvit Soi 3/1, Ramkhamhaeng). Look for the "Halal" logo (crescent moon and star) on storefronts.
*   **Notable Spots**: Al Hussain or Usman Thai Muslim Food in Bangkok.

### 2. Vegan & Vegetarian (Jay)
*   **"Jay" (Thai: เจ)**: In Thailand, strict vegan/vegetarian food is called "Jay." Look for yellow flags with red text. These dishes exclude all animal products and pungent vegetables like garlic and onions.
*   **Ordering**: Use the phrase "Gin Jay" (I eat vegan) or "Mai Gin Neu-a Sut" (I don't eat meat).
*   **Location Tip**: Chiang Mai is a global vegan hub, home to famous spots like Free Bird Cafe.

### 3. Allergy-Friendly Advice
Thai food frequently uses Peanuts, Shrimp, and Fish Sauce.
*   **Peanut Allergy**: Say "Mai Sai Tua" (No peanuts).
*   **Seafood Allergy**: Say "Mai Sai Goong" (No shrimp) or "Pae Ah-han Ta-lay" (I am allergic to seafood).
*   **Gluten-Free**: While rice noodles are safe, be cautious of Soy Sauce, which may contain wheat.

**Pro-Tip**: Carry an "Allergy Card" written in Thai script or use Google Translate’s instant camera feature to translate menus.

## Michelin Dining: Booking & Service
*   **How to Book**: Use official websites (1–3 months in advance for top spots like Gaggan Anand or Sorn), third-party apps (Chope, Eatigo, TableCheck), or call directly for waiting lists.
*   **Deposits**: Many starred restaurants require a non-refundable credit card deposit for no-shows.
*   **Service Experience**: Expect multi-course tasting menus (7–15 dishes) with storytelling from staff regarding ingredients and history.
*   **Dress Code**: High-end venues usually require Smart Casual (closed shoes, long pants). Avoid flip-flops or singlets.
*   **Punctuality**: Tables are typically held for only 15 minutes.

## Practical Dining Etiquette
*   **Utensils**: Use the spoon and fork. The fork pushes food onto the spoon. Chopsticks are generally reserved for noodle soups.
*   **Spice Levels**: Specify "Mai Phet" (Not spicy) if you cannot handle heat. Note that "a little spicy" in Thailand can still be quite intense.
*   **Water**: Stick to bottled water. While ice in major cities is usually purified, exercise caution in rural areas.
*   **Condiment Tray**: Use the provided sugar, dried chili, fish sauce, and vinegar to adjust the dish's flavor to your personal preference.
`;

async function translateAll() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return;
  }

  const ai = new GoogleGenAI({ apiKey });

  const translations: Record<string, string> = { english: englishTemplate };

  for (const lang of languages) {
    if (lang === 'english') continue;

    console.log(`Translating food guide to ${lang}...`);
    const prompt = `Translate the following Markdown text about "The Ultimate Thailand Food Guide" into ${lang}. 
Keep the Markdown structure exactly same, including headers (##, ###), bold (**), italics (*), and bullet points (*). 
Translate the content but keep specific names like "Tom Yum Goong", "Pad Thai", "Som Tum", "Massaman Curry", "Mango Sticky Rice (Khao Niew Mamuang)", "Mookata", "Jay Fai", "Go-Ang Kaomunkai Pratunam", "Thipsamai Pad Thai", "Pa Pae Guay Tiew", "Wongnai", "MICHELIN Guide", "GrabFood", "LINE MAN", "Foodpanda", "Eatigo", "Chope", "Gaggan Anand", "Sorn" in their original form or their common local transliteration if applicable, but prefer keeping them recognizable.
Translate phrases like "[Do]", "[Don't]" if they appear. 
Ensure the title is translated poetically in ${lang}.

Text:
${englishTemplate}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      const translatedText = response.text.trim().replace(/^```markdown\n/, '').replace(/\n```$/, '');
      translations[lang] = translatedText;
    } catch (error) {
      console.error(`Failed to translate food guide to ${lang}:`, error);
      translations[lang] = `Error translating to ${lang}`;
    }
  }

  const outputFilePath = path.join(process.cwd(), "src/data/foodGuide.ts");
  
  let outputContent = "import { ThaiLanguage } from '../types';\n\n";
  outputContent += "export const FOOD_GUIDE_MARKDOWN: Record<ThaiLanguage, string> = {\n";
  
  for (const lang of languages) {
    const escapedContent = translations[lang].replace(/`/g, "\\`").replace(/\${/g, "\\${");
    outputContent += `  ${lang}: \`${escapedContent}\`,\n`;
  }
  
  outputContent += "};\n";

  fs.writeFileSync(outputFilePath, outputContent);
  console.log("Food Guide translation complete and file updated.");
}

translateAll();
