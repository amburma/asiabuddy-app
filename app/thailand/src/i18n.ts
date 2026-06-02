import { SupportedLanguage } from './types';

const ENGLISH_UI = {
  "menu": "Menu",
  "menuCategories": {
    "travel": "Travel Planning",
    "guides": "Essential Guides",
    "transport": "Transport",
    "essentialApps": "Essential Apps",
    "tools": "Travel Tools"
  },
  "start": "Start Journey",
  "explore": "Explore",
  "concierge": "Concierge",
  "hero": "Explore the Magic Now",
  "heroSub": "Explore Asia beside AsiaBuddy.",
  "welcome": "Welcome to Thailand from ThaiGuide",
  "sacredAesthetic": "Sacred Aesthetic",
  "toolbox": "",
  "emergency": "Emergency & Safety Advice",
  "touristPolice": "Tourist Police",
  "assistance": "Call for immediate help (24/7)",
  "contactNow": "Contact Now",
  "tabs": {
    "mustVisit": "Must Visit Places",
    "dining": "Dining & Food Experiences",
    "otherExperiences": "Other Experiences",
    "uniqueActivities": "Unique Activities",
    "hiddenGems": "Hidden Gems",
    "information": "Information"
  },
  "labels": {
    "etiquette": "Etiquette",
    "advisory": "Advisory",
    "vibe": "Vibe",
    "dos": "Key Dos",
    "donts": "Key Don'ts",
    "legalAdvisory": "Legal Advisory",
    "culturalSubtitle": "Cultural Dos & Don'ts • Local Customs",
    "bestTime": "Best Time to Visit",
    "goToLocation": "Go to Location"
  },
  "infoLink": "for more information click here",
  "exploreThailandEssentials": "Explore Thailand Essentials",
  "infoModalTitle": "Thailand Essentials Guide",
  "infoModalSubtitle": "Practical guidance for your stay",
  "booking": {
    "link": "Book car rentals, bus tickets, flight tickets, and entrance fees.",
    "chatTitle": "Booking Support",
    "welcome": "How can I help with your bookings?",
    "initialMessage": "Welcome to booking assistance.",
    "placeholder": "Ask about bookings...",
    "disclaimer": "Estimates only.",
    "estimateNotice": "Service rates subject to change",
    "suggestions": [
      "Car rentals",
      "Bus tickets",
      "Flight tickets"
    ]
  },
  "culturalGuideLink": "Cultural Dos & Don'ts Guide",
  "lawsRegulationsLink": "Key Laws",
  "transport": {
    "title": "Transport",
    "detailsTitle": "Transport in Thailand — For more information",
    "appsGuideLink": "Transport Guide — Essential Apps and Websites for Transport in Thailand. For more information, click here!",
    "transportGuideLink": "Transport Guide",
    "modalTitle": "Thailand Nationwide Transport Guide",
    "modalSubtitle": "Transportation",
    "statusActive": "Transport Concierge Active",
    "destinationLabel": "Destination",
    "suggestions": [
      "BTS/MRT Map",
      "Grab vs Bolt",
      "Airport Link"
    ]
  },
  "vatRefund": {
    "title": "VAT Refund Guide",
    "description": "Min spend 2,000 THB. Look for signs.",
    "link": "VAT Refund"
  },
  "visa": {
    "title": "Visa info",
    "modalTitle": "Thailand Visa Guide",
    "description": "Check your status.",
    "link": "Visa Information"
  },
  "travelTypes": {
    "title": "Travel types",
    "modalTitle": "Travel Styles Guide",
    "modalSubtitle": "Travel Styles & Planner",
    "link": "Travel types"
  },
  "accommodation": {
    "title": "Accommodation",
    "modalTitle": "Thailand Accommodation Guide",
    "chatTitle": "Accommodation Help",
    "detailsTitle": "Accommodation Details",
    "guideLink": "Accommodation Guide Link",
    "suggestions": [
      "Luxury Hotels",
      "Boutique Hostels",
      "Beach Resorts"
    ]
  },
  "tools": {
    "currency": "Currency Converter",
    "phrases": "Essential Phrases",
    "phrasesSubtitle": "Basics, Audio & Pronunciation Guide",
    "politeParticlesTitle": "The Golden Rule: Polite Particles",
    "politeParticlesDesc": "In Thai, politeness is conveyed by adding a particle at the end of almost every sentence.",
    "maleParticle": "Male: Krap",
    "femaleParticle": "Female: Ka",
    "phrasesChatHeading": "Ask any Essential Phrases you want to know.",
    "laws": "Key Laws",
    "etiquette": "Etiquette",
    "weather": "Weather Info",
    "serviceMinded": "Service Minded Help",
    "learnThaiBasics": "Learn Thai Basics",
    "phrasesChat": {
      "placeholder": "Ask any Essential Phrases you want to know...",
      "suggestions": [
        "How much?",
        "Thank you",
        "Restroom?",
        "Allergic to peanuts",
        "Lower price?"
      ]
    }
  },
  "weather": {
    "title": "Weather",
    "modalTitle": "Thailand Weather Guide",
    "timeSuffix": "Local Time",
    "updateFrequency": "Every 15 mins",
    "climate": "Tropical Climate",
    "alertsLabel": "Alerts",
    "alerts": "No active alerts",
    "tipLabel": "Travel Tip",
    "tip": "Always carry water",
    "humidity": "Humidity",
    "uvIndex": "UV Index",
    "high": "High",
    "wind": "Wind"
  },
  "etiquetteSections": [
    {
      "title": "1. The \"Wai\" (The Traditional Greeting)",
      "content": "The Wai is the standard way to greet, thank, or say goodbye. It involves placing your palms together in a prayer-like position at chest level and bowing your head slightly.",
      "points": [
        "Who goes first: Younger people should initiate the Wai to elders."
      ]
    }
  ],
  "quickTips": {
    "dos": [
      "Wai elders",
      "Smile",
      "Respect Buddha"
    ],
    "donts": [
      "Touch heads",
      "Point feet",
      "Shout"
    ]
  },
  "jaiYen": "\"Jai Yen\" — The Cool Heart",
  "jaiYenDesc": "Understanding Thai etiquette is about showing respect and maintaining social harmony.",
  "legalAdvisory": "Legal Advisory",
  "legalDesc": "Thailand has specific laws regarding the monarchy, drugs, and public behavior.",
  "lawsModalSubtitle": "Essential Regulations • Updated for 2026",
  "lawsModalTitle": "Key Laws in Thailand",
  "lawsModalIntro": "Stay safe and respectful by knowing these laws.",
  "lawsProTipTitle": "Pro Tip",
  "lawsDisclaimer": "This is a general guide, not legal advice.",
  "chat": {
    "welcome": "",
    "placeholder": "Ask anything about your trip",
    "title": "Thai Concierge",
    "status": "Service Mind • Professional Guidance",
    "hint": "",
    "advice": "Professional Advice",
    "digitalHelp": "Digital Help",
    "suggestionsLabel": "Common Inquiries",
    "suggestions": [
      "What are the best places to visit?",
      "How to get a VAT refund?",
      "Emergency contact numbers?"
    ],
    "statusActive": "Concierge Active",
    "processing": "ThaiGuide is thinking...",
    "safe": "Safe travels!",
    "bookNow": "Book Now",
    "bookNowSubtitle": "Connect with a Human Operator"
  },
  "footer": {
    "by": "AsiaBuddy Services",
    "tagline": "Explore Asia beside AsiaBuddy.",
    "rights": "© 2026 AsiaBuddy Services. Prototype Version.",
    "privacyPolicy": "Privacy Policy",
    "legalTerms": "Legal Terms",
    "culturalGuide": "Cultural Guide",
    "officialService": "Official Guide",
    "liveEstimates": "Live Estimates",
    "estimatesDisclaimer": "Rates are estimates only",
    "preservance": "Preserving Excellence in Thai Hospitality",
    "shoppingGuide": "Shopping Guide",
    "transportAppsGuide": "Apps Guide"
  },
  "appTagline": "AsiaBuddy Digital Concierge",
  "medical": {
    "title": "Medical",
    "chatTitle": "Medical Concierge",
    "statusActive": "Medical Concierge Active",
    "suggestionsLabel": "Common Medical Inquiries",
    "detailsTitle": "Thailand Medical Guide",
    "guideLink": "The Ultimate Thailand Medical Guide — For more information",
    "modalTitle": "Medical Guide",
    "modalSubtitle": "Healthcare, Checkups & Preparation",
    "suggestions": [
      "Emergency hospitals",
      "Pharmacy guide",
      "Insurance info"
    ]
  },
  "food": {
    "title": "Food",
    "chatTitle": "Food Concierge",
    "statusActive": "Food Concierge Active",
    "suggestionsLabel": "Common Food Inquiries",
    "detailsTitle": "Thailand Food Guide",
    "guideLink": "Thailand Food Guide — For more information",
    "modalTitle": "Food Guide",
    "suggestions": [
      "Street food safety",
      "Best Pad Thai",
      "Vegetarian options"
    ]
  },
  "nightlife": {
    "title": "Nightlife",
    "chatTitle": "Nightlife Concierge",
    "statusActive": "Nightlife Concierge Active",
    "suggestionsLabel": "Nightlife Inquiries",
    "detailsTitle": "Thailand Nightlife Guide",
    "guideLink": "The Ultimate Thailand Nightlife Guide — For more information",
    "modalTitle": "Nightlife Guide",
    "modalSubtitle": "Clubs, Bars & Safety",
    "suggestions": [
      "Rooftop bars",
      "Night markets",
      "Safety tips"
    ]
  },
  "shopping": {
    "title": "Shopping",
    "chatTitle": "Shopping Concierge",
    "statusActive": "Shopping Concierge Active",
    "suggestionsLabel": "Shopping Inquiries",
    "detailsTitle": "Thailand Shopping Guide",
    "guideLink": "Thailand Shopping Guide — For more information",
    "modalTitle": "Shopping Guide",
    "modalSubtitle": "Malls & Local Markets",
    "suggestions": [
      "MBK Center info",
      "Chatuchak opening",
      "VAT refund steps"
    ]
  },
  "checklist": {
    "title": "Trip Plan Checklist",
    "subtitle": "Everything you need for peace of mind.",
    "readyButton": "Travel Ready?",
    "progress": "Progress",
    "addPlaceholder": "Add custom item...",
    "addBtn": "Add",
    "resetBtn": "Reset Checklist",
    "categories": {
      "docs": "Essential Documents",
      "finance": "Finance",
      "electronics": "Electronics & Connectivity",
      "health": "Health & Essentials",
      "safety": "Transportation & Safety",
      "app": "In-App Integration",
      "custom": "Custom Checklist"
    },
    "items": {
      "passport": "Passport & Visa — Check 6 months validity & keep copies",
      "flights": "Flight Tickets — Round-trip or onward confirmations",
      "hotel": "Hotel Booking — Proof of accommodation",
      "insurance": "Travel Insurance — Policy copy (if applicable)",
      "vaccine": "Vaccination Record — Health documentation",
      "backups": "Digital Backups — Save passport/visa photos to cloud",
      "cash": "Cash (THB) — Sufficient Baht for arrival",
      "cards": "International Card — Cards authorized for use",
      "sim": "SIM Card / eSIM — Local SIM or active roaming",
      "power": "Power Bank — Portable charger",
      "adapter": "Universal Adapter — Flat and round pin compatible",
      "maps": "Google Maps — Download offline maps",
      "medicine": "Personal Medicines — Prescribed medications",
      "firstaid": "First-Aid Kit — Basic supplies & painkillers",
      "sunscreen": "Sunscreen — Adequate SPF for Thailand",
      "clothing": "Appropriate Clothing — Modest attire for temples",
      "transport": "Airport Transport — Plan route in advance",
      "address": "Hotel Address in Thai — Save address in Thai script",
      "emergency": "Emergency Contact — Setup on Lock Screen",
      "advisories": "Travel Advisories — Latest news & warnings",
      "numbers": "Emergency Numbers — Review numbers in app",
      "phrases": "Basic Thai Phrases — Study phrases in app",
      "vat": "VAT Refund — Read the guide in app"
    }
  }
};

export const UI_TRANSLATIONS: Record<SupportedLanguage, typeof ENGLISH_UI> = {
  EN: {
    ...ENGLISH_UI,
    "footer": {
      ...ENGLISH_UI.footer,
      "by": "Thai Cultural Excellence • AsiaBuddy Services"
    }
  },
  TH: {
  "menu": "Menu",
  "menuCategories": {
    "travel": "Travel Planning",
    "guides": "คู่มือที่จำเป็น",
    "transport": "Transport",
    "essentialApps": "Essential Apps",
    "tools": "Travel Tools"
  },
  "start": "Start Journey",
  "explore": "Explore",
  "concierge": "Concierge",
  "hero": "Explore the Magic Now",
  "heroSub": "สำรวจเอเชียไปพร้อมกับเอเชียบัดดี้",
  "welcome": "Welcome to Thailand from ThaiGuide",
  "sacredAesthetic": "Sacred Aesthetic",
  "toolbox": "",
  "emergency": "Emergency & Safety Advice",
  "touristPolice": "Tourist Police",
  "assistance": "Call for immediate help (24/7)",
  "contactNow": "Contact Now",
  "tabs": {
    "mustVisit": "สถานที่ต้องไปเยือน",
    "dining": "ประสบการณ์รับประทานอาหาร",
    "otherExperiences": "ประสบการณ์อื่นๆ",
    "uniqueActivities": "กิจกรรมที่น่าสนใจ",
    "hiddenGems": "เพชรเม็ดงามที่ซ่อนอยู่",
    "information": "ข้อมูล"
  },
  "labels": {
    "etiquette": "Etiquette",
    "advisory": "Advisory",
    "vibe": "Vibe",
    "dos": "Key Dos",
    "donts": "Key Don'ts",
    "legalAdvisory": "Legal Advisory",
    "culturalSubtitle": "Cultural Dos & Don'ts • Local Customs",
    "bestTime": "Best Time to Visit",
    "goToLocation": "ไปที่ตำแหน่งนี้"
  },
  "infoLink": "สำหรับข้อมูลเพิ่มเติม คลิกที่นี่",
  "exploreThailandEssentials": "สำรวจสิ่งจำเป็นในประเทศไทย",
  "infoModalTitle": "Thailand Essentials Guide",
  "infoModalSubtitle": "คำแนะนำที่ใช้ได้จริงสำหรับการเข้าพักของคุณ",
  "booking": {
    "link": "จองรถเช่า ตั๋วรถโดยสาร ตั๋วเครื่องบิน และค่าเข้าชมสถานที่",
    "chatTitle": "ฝ่ายสนับสนุนการจอง",
    "welcome": "ฉันจะช่วยเรื่องการจองของคุณได้อย่างไร?",
    "initialMessage": "ยินดีต้อนรับสู่ความช่วยเหลือด้านการจอง",
    "placeholder": "ถามเกี่ยวกับการจอง...",
    "disclaimer": "Estimates only.",
    "estimateNotice": "Service rates subject to change",
    "suggestions": [
      "เช่ารถ",
      "ตั๋วรถโดยสาร",
      "ตั๋วเครื่องบิน"
    ]
  },
  "culturalGuideLink": "คู่มือมารยาทและวัฒนธรรม (Dos & Don'ts)",
  "lawsRegulationsLink": "ระเบียบข้อบังคับที่สำคัญสำหรับปี 2026",
  "transport": {
    "title": "Transport",
    "detailsTitle": "การเดินทางในประเทศไทย — สำหรับข้อมูลเพิ่มเติม",
    "appsGuideLink": "แอปและเว็บไซต์ที่จำเป็นสำหรับการเดินทางในประเทศไทย คลิกที่นี่เพื่อข้อมูลเพิ่มเติม!",
    "transportGuideLink": "คู่มือการเดินทาง",
    "modalTitle": "Thailand Nationwide Transport Guide",
    "modalSubtitle": "การเดินทาง",
    "statusActive": "Transport Concierge Active",
    "destinationLabel": "Destination",
    "suggestions": [
      "แผนที่ BTS/MRT",
      "Grab vs Bolt",
      "Airport Link"
    ]
  },
  "vatRefund": {
    "title": "คู่มือการขอคืนภาษี (VAT)",
    "description": "ขั้นต่ำ 2,000 บาท มองหาป้าย คืนภาษี (VAT)",
    "link": "VAT Refund"
  },
  "visa": {
    "title": "Visa info",
    "modalTitle": "Thailand Visa Guide",
    "description": "Check your status.",
    "link": "ข้อมูลวีซ่า"
  },
  "travelTypes": {
    "title": "Travel types",
    "modalTitle": "Travel Styles Guide",
    "modalSubtitle": "สไตล์การเดินทางและเครื่องมือวางแผน",
    "link": "สไตล์การเดินทาง"
  },
  "accommodation": {
    "title": "Accommodation",
    "modalTitle": "Thailand Accommodation Guide",
    "chatTitle": "ความช่วยเหลือด้านที่พัก",
    "detailsTitle": "รายละเอียดที่พัก",
    "guideLink": "ลิงก์คู่มือที่พัก",
    "suggestions": [
      "โรงแรมหรู",
      "โฮสเทลบูติก",
      "รีสอร์ทติดชายหาด"
    ]
  },
  "tools": {
    "currency": "Currency Converter",
    "phrases": "Essential Phrases",
    "phrasesSubtitle": "พื้นฐาน เสียง และคู่มือการออกเสียง",
    "politeParticlesTitle": "กฎทอง: คำลงท้ายที่สุภาพ",
    "politeParticlesDesc": "ในภาษาไทย ความสุภาพแสดงออกได้โดยการเติมคำลงท้ายในเกือบทุกประโยค",
    "maleParticle": "ผู้ชาย: ครับ",
    "femaleParticle": "ผู้หญิง: ค่ะ",
    "phrasesChatHeading": "ถามวลีที่จำเป็นที่คุณต้องการรู้",
    "laws": "Key Laws",
    "etiquette": "Etiquette",
    "weather": "Weather Info",
    "serviceMinded": "Service Minded Help",
    "learnThaiBasics": "เรียนรู้ภาษาไทยเบื้องต้น",
    "phrasesChat": {
      "placeholder": "Ask any Essential Phrases you want to know...",
      "suggestions": [
        "มีห้องว่างไหมครับ/คะ?",
        "ราคาคืนละเท่าไหร่ครับ/คะ?",
        "ขอดูห้องก่อนได้ไหมครับ/คะ?",
        "รวมอาหารเช้าไหมครับ/คะ?",
        "ฝากกระเป๋าได้ที่ไหนครับ/คะ?"
      ]
    }
  },
  "weather": {
    "title": "Weather",
    "modalTitle": "Thailand Weather Guide",
    "timeSuffix": "Local Time",
    "updateFrequency": "Every 15 mins",
    "climate": "Tropical Climate",
    "alertsLabel": "Alerts",
    "alerts": "No active alerts",
    "tipLabel": "Travel Tip",
    "tip": "Always carry water",
    "humidity": "Humidity",
    "uvIndex": "UV Index",
    "high": "High",
    "wind": "Wind"
  },
  "etiquetteSections": [
    {
      "title": "1. การไหว้ (การทักทายแบบดั้งเดิม)",
      "content": "การไหว้เป็นวิธีมาตรฐานในการทักทาย ขอบคุณ หรือบอกลา โดยการพนมมือเข้าด้วยกันที่ระดับหน้าอกแล้วก้มศีรษะลงเล็กน้อย",
      "points": [
        "ใครควรไหว้ก่อน: ผู้ที่อายุน้อยกว่าควรเริ่มไหว้ผู้ใหญ่ก่อน"
      ]
    }
  ],
  "quickTips": {
    "dos": [
      "ไหว้ผู้ใหญ่",
      "ยิ้มแย้ม",
      "เคารพพระพุทธรูป"
    ],
    "donts": [
      "สัมผัสศีรษะ",
      "ชี้ด้วยเท้า",
      "ตะโกน"
    ]
  },
  "jaiYen": "\"ใจเย็น\" — หัวใจที่สงบ",
  "jaiYenDesc": "การทำความเข้าใจมารยาทไทยคือการแสดงความเคารพและรักษาความกลมเกลียวในสังคม",
  "legalAdvisory": "ข้อแนะนำทางกฎหมาย",
  "legalDesc": "ประเทศไทยมีกฎหมายเฉพาะเกี่ยวกับสถาบันพระมหากษัตริย์ ยาเสพติด และพฤติกรรมในที่สาธารณะ",
  "lawsModalSubtitle": "กฎระเบียบที่จำเป็น • อัปเดตสำหรับปี 2569",
  "lawsModalTitle": "กฎหมายสำคัญในประเทศไทย",
  "lawsModalIntro": "ปลอดภัยและเคารพกฎกติกาด้วยการรู้กฎหมายเหล่านี้",
  "lawsProTipTitle": "Pro Tip",
  "lawsDisclaimer": "นี่คือคู่มือทั่วไป ไม่ใช่คำแนะนำทางกฎหมาย",
    "chat": {
    "welcome": "",
    "placeholder": "ถามอะไรก็ได้เกี่ยวกับการเดินทางของคุณ",
    "title": "Thai Concierge",
    "status": "Service Mind • Professional Guidance",
    "hint": "",
    "advice": "คำแนะนำจากมืออาชีพ",
    "digitalHelp": "ความช่วยเหลือดิจิทัล",
    "suggestionsLabel": "คำถามที่พบบ่อย",
    "suggestions": [
      "สถานที่ท่องเที่ยวที่ดีที่สุดคือที่ไหน?",
      "ขอคืนภาษี (VAT) อย่างไร?",
      "เบอร์ติดต่อฉุกเฉินมีอะไรบ้าง?"
    ],
    "statusActive": "คอนเซียร์จทำงานอยู่",
    "processing": "ThaiGuide กำลังคิด...",
    "safe": "Safe travels!",
    "bookNow": "จองเลย",
    "bookNowSubtitle": "เชื่อมต่อกับเจ้าหน้าที่มนุษย์"
  },
  "footer": {
    "by": "ความเป็นเลิศทางวัฒนธรรมไทย • บริการ AsiaBuddy",
    "tagline": "สำรวจเอเชียไปพร้อมกับเอเชียบัดดี้",
    "rights": "© 2026 AsiaBuddy Services. Prototype Version.",
    "privacyPolicy": "Privacy Policy",
    "legalTerms": "Legal Terms",
    "culturalGuide": "Cultural Guide",
    "officialService": "Official Guide",
    "liveEstimates": "Live Estimates",
    "estimatesDisclaimer": "Rates are estimates only",
    "preservance": "Preserving Excellence in Thai Hospitality",
    "shoppingGuide": "Shopping Guide",
    "transportAppsGuide": "Apps Guide"
  },
  "appTagline": "เอเชียบัดดี้ ดิจิทัล คอนเซียร์จ",
  "medical": {
    "title": "Medical",
    "chatTitle": "Medical Concierge",
    "statusActive": "Medical Concierge Active",
    "suggestionsLabel": "Common Medical Inquiries",
    "detailsTitle": "Thailand Medical Guide",
    "guideLink": "คู่มือการแพทย์ในไทยที่ดีที่สุด สำหรับข้อมูลเพิ่มเติม",
    "modalTitle": "Medical Guide",
    "modalSubtitle": "การดูแลสุขภาพ ตรวจร่างกาย และการเตรียมตัว",
    "suggestions": [
      "โรงพยาบาลฉุกเฉิน",
      "คู่มือร้านขายยา",
      "ข้อมูลประกันภัย"
    ]
  },
  "food": {
    "title": "Food",
    "chatTitle": "Food Concierge",
    "statusActive": "Food Concierge Active",
    "suggestionsLabel": "Common Food Inquiries",
    "detailsTitle": "Thailand Food Guide",
    "guideLink": "คู่มืออาหารไทย สำหรับข้อมูลเพิ่มเติม",
    "modalTitle": "Food Guide",
    "suggestions": [
      "ความปลอดภัยของสตรีทฟู้ด",
      "ผัดไทยเจ้าดัง",
      "ตัวเลือกมังสวิรัติ"
    ]
  },
  "nightlife": {
    "title": "Nightlife",
    "chatTitle": "Nightlife Concierge",
    "statusActive": "Nightlife Concierge Active",
    "suggestionsLabel": "Nightlife Inquiries",
    "detailsTitle": "Thailand Nightlife Guide",
    "guideLink": "The Ultimate Thailand Nightlife Guide — For more information",
    "modalTitle": "Nightlife Guide",
    "modalSubtitle": "บาร์รูฟท็อป และความปลอดภัย",
    "suggestions": [
      "บาร์รูฟท็อป",
      "ตลาดกลางคืน",
      "เคล็ดลับความปลอดภัย"
    ]
  },
  "shopping": {
    "title": "Shopping",
    "chatTitle": "Shopping Concierge",
    "statusActive": "Shopping Concierge Active",
    "suggestionsLabel": "Shopping Inquiries",
    "detailsTitle": "Thailand Shopping Guide",
    "guideLink": "คู่มือการช้อปปิ้งในไทย สำหรับข้อมูลเพิ่มเติม",
    "modalTitle": "Shopping Guide",
    "modalSubtitle": "ห้างสรรพสินค้าและตลาดนัด",
    "suggestions": [
      "ข้อมูลห้าง MBK",
      "เวลาเปิดจตุจักร",
      "ขั้นตอนคืนภาษี VAT"
    ]
  },
  "checklist": {
    "title": "รายการตรวจสอบแผนการเดินทาง",
    "subtitle": "ทุกสิ่งที่คุณต้องการเพื่อความอุ่นใจ",
    "readyButton": "เตรียมตัวพร้อมหรือยัง?",
    "progress": "ความคืบหน้า",
    "addPlaceholder": "เพิ่มรายการของคุณเอง...",
    "addBtn": "เพิ่ม",
    "resetBtn": "รีเซ็ตรายการ",
    "categories": {
      "docs": "เอกสารที่จำเป็น",
      "finance": "การเงิน",
      "electronics": "อิเล็กทรอนิกส์และการเชื่อมต่อ",
      "health": "สุขภาพและของใช้ส่วนตัว",
      "safety": "การเดินทางและความปลอดภัย",
      "app": "เตรียมพร้อมในแอป",
      "custom": "รายการเพิ่มเติม"
    },
    "items": {
      "passport": "หนังสือเดินทางและวีซ่า — ตรวจสอบอายุ 6 เดือนและเก็บสำเนา",
      "flights": "ตั๋วเครื่องบิน — การยืนยันตั๋วไป-กลับหรือขาออก",
      "hotel": "การจองโรงแรม — หลักฐานการจองที่พัก",
      "insurance": "ประกันการเดินทาง — สำเนากรมธรรม์ (ถ้ามี)",
      "vaccine": "บันทึกการฉีดวัคซีน — เอกสารรับรองสุขภาพ",
      "backups": "ข้อมูลสำรองดิจิทัล — บันทึกรูปถ่ายพาสปอร์ตลงคลาวด์",
      "cash": "เงินสด (บาท) — เตรียมเงินบาทให้เพียงพอเมื่อมาถึง",
      "cards": "บัตรระหว่างประเทศ — ตั้งค่าบัตรเพื่อใช้ในต่างประเทศ",
      "sim": "ซิมการ์ด / eSIM — ซิมท้องถิ่นหรือโรมมิ่งที่เปิดใช้งาน",
      "power": "พาวเวอร์แบงค์ — เครื่องชาร์จแบบพกพา",
      "adapter": "อะแดปเตอร์สากล — รองรับขากลมและขาแบน",
      "maps": "Google Maps — ดาวน์โหลดแผนที่ออฟไลน์",
      "medicine": "ยาส่วนตัว — เตรียมยาประจำตัวให้พร้อม",
      "firstaid": "ชุดปฐมพยาบาล — อุปกรณ์ทำแผลและยาแก้ปวดพื้นฐาน",
      "sunscreen": "ครีมกันแดด — SPF ที่เพียงพอสำหรับแดดเมืองไทย",
      "clothing": "เสื้อผ้าที่เหมาะสม — ชุดสุภาพสำหรับเข้าวัดและสถานที่ศักดิ์สิทธิ์",
      "transport": "การเดินทางจากสนามบิน — วางแผนเส้นทางเข้าเมืองล่วงหน้า",
      "address": "ที่อยู่โรงแรมเป็นภาษาไทย — บันทึกที่อยู่เป็นภาษาไทยไว้ในเครื่อง",
      "emergency": "ติดต่อฉุกเฉิน — ตั้งค่าข้อมูลในหน้าจอล็อค",
      "advisories": "ข่าวสารการเดินทาง — ตรวจสอบข่าวและคำเตือนล่าสุด",
      "numbers": "เบอร์ฉุกเฉิน — ทำความคุ้นเคยกับเบอร์ช่วยเหลือก่อนเดินทาง",
      "phrases": "วลีภาษาไทยพื้นฐาน — ศึกษาวลีพื้นฐานที่ใช้บ่อย",
      "vat": "ข้อมูลคืนภาษี — อ่านขั้นตอนการขอคืนภาษี (VAT)"
    }
  }
},
  MM: {
  "menu": "Menu",
  "menuCategories": {
    "travel": "Travel Planning",
    "guides": "အဓိကလမ်းညွှန်များ",
    "transport": "Transport",
    "essentialApps": "Essential Apps",
    "tools": "Travel Tools"
  },
  "start": "Start Journey",
  "explore": "Explore",
  "concierge": "Concierge",
  "hero": "Explore the Magic Now",
  "heroSub": "AsiaBuddy နှင့်အတူ အာရှကို ရှာဖွေပါ",
  "welcome": "Welcome to Thailand from ThaiGuide",
  "sacredAesthetic": "Sacred Aesthetic",
  "toolbox": "",
  "emergency": "Emergency & Safety Advice",
  "touristPolice": "Tourist Police",
  "assistance": "Call for immediate help (24/7)",
  "contactNow": "Contact Now",
  "tabs": {
    "mustVisit": "သွားရောက်လည်ပတ်သင့်သောနေရာများ",
    "dining": "အစားအသောက်အတွေ့အကြုံများ",
    "otherExperiences": "အခြားအတွေ့အကြုံများ",
    "uniqueActivities": "ထူးခြားသောလုပ်ဆောင်ချက်များ",
    "hiddenGems": "ဝှက်ထားသောရတနာများ",
    "information": "အချက်အလက်"
  },
  "labels": {
    "etiquette": "Etiquette",
    "advisory": "Advisory",
    "vibe": "Vibe",
    "dos": "Key Dos",
    "donts": "Key Don'ts",
    "legalAdvisory": "Legal Advisory",
    "culturalSubtitle": "Cultural Dos & Don'ts • Local Customs",
    "bestTime": "Best Time to Visit",
    "goToLocation": "တည်နေရာသို့သွားပါ"
  },
  "infoLink": "ပိုမိုသိရှိလိုပါက ဤနေရာကိုနှိပ်ပါ",
  "exploreThailandEssentials": "ထိုင်းနိုင်ငံ၏ အခြေခံလိုအပ်ချက်များကို ရှာဖွေပါ",
  "infoModalTitle": "Thailand Essentials Guide",
  "infoModalSubtitle": "သင်၏နေထိုင်မှုအတွက် လက်တွေ့ကျသော လမ်းညွှန်ချက်များ",
  "booking": {
    "link": "ကားအငှားများ၊ ဘတ်စ်ကားလက်မှတ်များ၊ လေယာဉ်လက်မှတ်များနှင့် ဝင်ကြေးများကို ဘွတ်ကင်လုပ်ပါ။",
    "chatTitle": "ဘွတ်ကင်ဆိုင်ရာ အကူအညီ",
    "welcome": "ဘွတ်ကင်လုပ်ရန် မည်သို့ကူညီပေးရမလဲ?",
    "initialMessage": "ဘွတ်ကင်ဆိုင်ရာ အကူအညီမှ ကြိုဆိုပါသည်။",
    "placeholder": "ဘွတ်ကင်များအကြောင်း မေးမြန်းပါ...",
    "disclaimer": "Estimates only.",
    "estimateNotice": "Service rates subject to change",
    "suggestions": [
      "ကားအငှားများ",
      "ဘတ်စ်ကားလက်မှတ်များ",
      "လေယာဉ်လက်မှတ်များ"
    ]
  },
  "culturalGuideLink": "ယဉ်ကျေးမှုဆိုင်ရာ Dos & Don'ts လမ်းညွှန်",
  "lawsRegulationsLink": "၂၀၂၆ ခုနှစ်အတွက် အရေးကြီးသော စည်းမျဉ်းများ",
  "transport": {
    "title": "Transport",
    "detailsTitle": "ထိုင်းနိုင်ငံအတွင်း သယ်ယူပို့ဆောင်ရေး — ပိုမိုသိရှိလိုပါက",
    "appsGuideLink": "ထိုင်းနိုင်ငံ သယ်ယူပို့ဆောင်ရေးအတွက် အဓိက အက်ပ်များနှင့် ဝဘ်ဆိုဒ်များ။ ပိုမိုသိရှိလိုပါက ဤနေရာကိုနှိပ်ပါ!",
    "transportGuideLink": "သယ်ယူပို့ဆောင်ရေး လမ်းညွှန်",
    "modalTitle": "Thailand Nationwide Transport Guide",
    "modalSubtitle": "သယ်ယူပို့ဆောင်ရေး",
    "statusActive": "Transport Concierge Active",
    "destinationLabel": "Destination",
    "suggestions": [
      "BTS/MRT မြေပုံ",
      "Grab နှင့် Bolt နှိုင်းယှဉ်ချက်",
      "လေယာဉ်ကွင်းရထား (Airport Link)"
    ]
  },
  "vatRefund": {
    "title": "VAT ပြန်အမ်းငွေ လမ်းညွှန်",
    "description": "အနည်းဆုံး ၂,၀၀၀ ဘတ် သုံးစွဲပါ။ ဆိုင်းဘုတ်များကို ရှာပါ။ VAT ပြန်အမ်းငွေ",
    "link": "VAT Refund"
  },
  "visa": {
    "title": "Visa info",
    "modalTitle": "Thailand Visa Guide",
    "description": "Check your status.",
    "link": "ဗီဇာ ဆိုင်ရာ အချက်အလက်များ"
  },
  "travelTypes": {
    "title": "Travel types",
    "modalTitle": "Travel Styles Guide",
    "modalSubtitle": "ခရီးသွားပုံစံများနှင့် စီစဉ်သူ",
    "link": "ခရီးသွားပုံစံများ (Travel Styles)"
  },
  "accommodation": {
    "title": "Accommodation",
    "modalTitle": "Thailand Accommodation Guide",
    "chatTitle": "တည်းခိုနေထိုင်မှု အကူအညီ",
    "detailsTitle": "တည်းခိုနေထိုင်မှု အသေးစိတ်",
    "guideLink": "တည်းခိုနေထိုင်မှု ลမ်းညွှန် လင့်ခ်",
    "suggestions": [
      "ဇိမ်ခံဟိုတယ်များ",
      "ဘူးတစ်ဟိုတယ်များ",
      "ကမ်းခြေအပန်းဖြေစခန်းများ"
    ]
  },
  "tools": {
    "currency": "Currency Converter",
    "phrases": "Essential Phrases",
    "phrasesSubtitle": "အခြေခံများ၊ အသံနှင့် အသံထွက်လမ်းညွှန်",
    "politeParticlesTitle": "ရွှေစည်းမျဉ်း- ယဉ်ကျေးသော နောက်ဆက်စကားလုံးများ",
    "politeParticlesDesc": "ထိုင်းဘာသာစကားတွင် ဝါကျတိုင်းနီးပါး၏ အဆုံးတွင် နောက်ဆက်စကားလုံးများကို ထည့်သွင်းခြင်းဖြင့် ယဉ်ကျေးမှုကို ဖော်ပြသည်။",
    "maleParticle": "အမျိုးသား- Krap",
    "femaleParticle": "အမျိုးသမီး- Ka",
    "phrasesChatHeading": "သင်သိလိုသော အရေးကြီးသော ထိုင်းစကားစုများကို မေးမြန်းပါ။",
    "laws": "Key Laws",
    "etiquette": "Etiquette",
    "weather": "Weather Info",
    "serviceMinded": "Service Minded Help",
    "learnThaiBasics": "ထိုင်းဘာသာစကား အခြေခံများကို လေ့လာပါ",
    "phrasesChat": {
      "placeholder": "Ask any Essential Phrases you want to know...",
      "suggestions": [
        "အခန်းအားသေးလား?",
        "တစ်ညဘယ်လောက်လဲ?",
        "အခန်းအရင်ကြည့်လို့ရမလား?",
        "မနက်စာပါလား?",
        "အိတ်ဘယ်မှာထားခဲ့လို့ရမလဲ?"
      ]
    }
  },
  "weather": {
    "title": "Weather",
    "modalTitle": "Thailand Weather Guide",
    "timeSuffix": "Local Time",
    "updateFrequency": "Every 15 mins",
    "climate": "Tropical Climate",
    "alertsLabel": "Alerts",
    "alerts": "No active alerts",
    "tipLabel": "Travel Tip",
    "tip": "Always carry water",
    "humidity": "Humidity",
    "uvIndex": "UV Index",
    "high": "High",
    "wind": "Wind"
  },
  "etiquetteSections": [
    {
      "title": "၁။ ဝေ (The \"Wai\" - ရိုးရာနှုတ်ဆက်ခြင်း)",
      "content": "ဝေ (Wai) သည် နှုတ်ဆက်ခြင်း၊ ကျေးဇူးတင်ခြင်း သို့မဟုတ် နှုတ်ဆက်ခွဲခွာခြင်းအတွက် စံနှုန်းဖြစ်သည်။ ရင်ဘတ်အဆင့်တွင် လက်အုပ်ချီပြီး ခေါင်းကို အနည်းငယ် ညွှတ်ရပါမည်။",
      "points": [
        "ဘယ်သူက အရင်စရမလဲ- ငယ်ရွယ်သူများက လူကြီးများကို အရင်ဆုံး ဝေ (Wai) လုပ်၍ နှုတ်ဆက်ရပါမည်။"
      ]
    }
  ],
  "quickTips": {
    "dos": [
      "လူကြီးများကို အရိုအသေပေးပါ",
      "ပြုံးပြပါ",
      "မြတ်စွာဘုရားကို ကြည်ညိုလေးစားပါ"
    ],
    "donts": [
      "ခေါင်းကို မထိပါနှင့်",
      "ခြေထောက်ဖြင့် မညွှန်ပါနှင့်",
      "အော်ဟစ်ခြင်း မပြုပါနှင့်"
    ]
  },
  "jaiYen": "\"စိတ်အေးအေးထားပါ\" (Jai Yen) — အေးချမ်းသောနှလုံးသား",
  "jaiYenDesc": "ထိုင်းယဉ်ကျေးမှုကို နားလည်ခြင်းသည် လေးစားမှုရှိခြင်းနှင့် လူမှုဆက်ဆံရေး ပြေပြစ်စေခြင်းပင် ဖြစ်သည်။",
  "legalAdvisory": "ဥပဒေဆိုင်ရာ အကြံပြုချက်",
  "legalDesc": "ထိုင်းနိုင်ငံတွင် ဘုရင်စနစ်၊ မူးယစ်ဆေးဝါးနှင့် အများပြည်သူဆိုင်ရာ အပြုအမူများနှင့် ပတ်သက်၍ သီးခြားဥပဒေများ ရှိသည်။",
  "lawsModalSubtitle": "၂၀၂၆ ခုနှစ်အတွက် အရေးကြီးသော စည်းမျဉ်းများ",
  "lawsModalTitle": "ထိုင်းနိုင်ငံရှိ အဓိကဥပဒေများ",
  "lawsModalIntro": "ဤဥပဒေများကို သိရှိခြင်းဖြင့် လုံခြုံစွာနှင့် လေးစားမှုရှိစွာ နေထိုင်ပါ။",
  "lawsProTipTitle": "Pro Tip",
  "lawsDisclaimer": "ဤသည်မှာ အထွေထွေလမ်းညွှန်သာဖြစ်ပြီး ဥပဒေရေးရာ အကြံပေးချက်မဟုတ်ပါ။",
  "chat": {
    "welcome": "",
    "placeholder": "သင့်ခရီးစဉ်အကြောင်း ဘာမဆိုမေးမြန်းနိုင်ပါသည်",
    "title": "Thai Concierge",
    "status": "Service Mind • Professional Guidance",
    "hint": "",
    "advice": "ကျွမ်းကျင်သောအကြံပြုချက်",
    "digitalHelp": "ဒစ်ဂျစ်တယ်အကူအညီ",
    "suggestionsLabel": "အမေးများသော မေးခွန်းများ",
    "suggestions": [
      "အကောင်းဆုံး လည်ပတ်စရာနေရာများက ဘယ်မှာလဲ?",
      "VAT ပြန်အမ်းငွေ ဘယ်လိုလျှောက်ရမလဲ?",
      "အရေးပေါ် ဆက်သွယ်ရန် နံပါတ်များက ဘာတွေလဲ?"
    ],
    "statusActive": "ဝန်ဆောင်မှုပေးရန် အဆင်သင့်ရှိသည်",
    "processing": "ThaiGuide စဉ်းစားနေသည်...",
    "safe": "Safe travels!",
    "bookNow": "ဘွတ်ကင်လုပ်ပါ",
    "bookNowSubtitle": "လူသားလက်ထောက်နှင့် ချိတ်ဆက်ပါ"
  },
  "footer": {
    "by": "ထိုင်းယဉ်ကျေးမှု ထူးချွန်မှု • AsiaBuddy ဝန်ဆောင်မှုများ",
    "tagline": "AsiaBuddy နှင့်အတူ အာရှကို ရှာဖွေပါ",
    "rights": "© 2026 AsiaBuddy Services. Prototype Version.",
    "privacyPolicy": "Privacy Policy",
    "legalTerms": "Legal Terms",
    "culturalGuide": "Cultural Guide",
    "officialService": "Official Guide",
    "liveEstimates": "Live Estimates",
    "estimatesDisclaimer": "Rates are estimates only",
    "preservance": "Preserving Excellence in Thai Hospitality",
    "shoppingGuide": "Shopping Guide",
    "transportAppsGuide": "Apps Guide"
  },
  "appTagline": "AsiaBuddy ဒစ်ဂျစ်တယ် ကွန်စီယာ့ဂ်ျ (Digital Concierge)",
  "medical": {
    "title": "Medical",
    "chatTitle": "Medical Concierge",
    "statusActive": "Medical Concierge Active",
    "suggestionsLabel": "Common Medical Inquiries",
    "detailsTitle": "Thailand Medical Guide",
    "guideLink": "ထိုင်းနိုင်ငံ အကောင်းဆုံး ဆေးဘက်ဆိုင်ရာ လမ်းညွှန် — ပိုမိုသိရှိလိုပါက",
    "modalTitle": "Medical Guide",
    "modalSubtitle": "ကျန်းမာရေးစောင့်ရှောက်မှု၊ စစ်ဆေးမှုနှင့် ပြင်ဆင်မှု",
    "suggestions": [
      "အရေးပေါ်ဆေးရုံများ",
      "ဆေးဆိုင်လမ်းညွှန်",
      "အာမခံအချက်အလက်များ"
    ]
  },
  "food": {
    "title": "Food",
    "chatTitle": "Food Concierge",
    "statusActive": "Food Concierge Active",
    "suggestionsLabel": "Common Food Inquiries",
    "detailsTitle": "Thailand Food Guide",
    "guideLink": "ထိုင်းနိုင်ငံ အစားအသောက် လမ်းညွှန် ပိုမိုသိရှိလိုပါက",
    "modalTitle": "Food Guide",
    "suggestions": [
      "လမ်းဘေးစာ ဘေးကင်းရေး",
      "အကောင်းဆုံး ပတ်ထိုင်း",
      "သက်သတ်လွတ်ရွေးချယ်စရာများ"
    ]
  },
  "nightlife": {
    "title": "Nightlife",
    "chatTitle": "Nightlife Concierge",
    "statusActive": "Nightlife Concierge Active",
    "suggestionsLabel": "Nightlife Inquiries",
    "detailsTitle": "Thailand Nightlife Guide",
    "guideLink": "The Ultimate Thailand Nightlife Guide — For more information",
    "modalTitle": "Nightlife Guide",
    "modalSubtitle": "ကလပ်များ၊ ဘားများနှင့် ဘေးကင်းရေး",
    "suggestions": [
      "ခေါင်မိုးပေါ်ဘားများ",
      "ညဈေးများ",
      "ဘေးကင်းရေးအကြံပြုချက်များ"
    ]
  },
  "shopping": {
    "title": "Shopping",
    "chatTitle": "Shopping Concierge",
    "statusActive": "Shopping Concierge Active",
    "suggestionsLabel": "Shopping Inquiries",
    "detailsTitle": "Thailand Shopping Guide",
    "guideLink": "ထိုင်းနိုင်ငံ ဈေးဝယ်ထွက်ခြင်း လမ်းညွှန် — ပိုမိုသိရှိလိုပါက",
    "modalTitle": "Shopping Guide",
    "modalSubtitle": "မောလ်များနှင့် ဒေသတွင်းဈေးများ",
    "suggestions": [
      "MBK Center အချက်အလက်များ",
      "ချတူချက်ဈေးဖွင့်ချိန်",
      "VAT ပြန်အမ်းငွေအဆင့်ဆင့်"
    ]
  },
  "checklist": {
    "title": "ခရီးစဉ် စစ်ဆေးရန် စာရင်း",
    "subtitle": "စိတ်အေးချမ်းသာစွာ ခရီးသွားနိုင်ရန် လိုအပ်သည်များ",
    "readyButton": "ခရီးသွားဖို့ အဆင်သင့်ဖြစ်ပြီလား?",
    "progress": "ပြီးစီးမှု",
    "addPlaceholder": "ကိုယ်ပိုင်အကြောင်းအရာ ထည့်ရန်...",
    "addBtn": "ထည့်ပါ",
    "resetBtn": "အားလုံး ပြန်စရန်",
    "categories": {
      "docs": "အရေးကြီး စာရွက်စာတမ်းများ",
      "finance": "ငွေကြေး",
      "electronics": "လျှပ်စစ်ပစ္စည်းနှင့် ဆက်သွယ်ရေး",
      "health": "ကျန်းမာရေးနှင့် တစ်ကိုယ်ရေသုံးပစ္စည်းများ",
      "safety": "သယ်ယူပို့ဆောင်ရေးနှင့် ဘေးကင်းရေး",
      "app": "အက်ပ်အတွင်း ကြိုတင်ပြင်ဆင်မှုများ",
      "custom": "ကိုယ်ပိုင်စာရင်း"
    },
    "items": {
      "passport": "ပတ်စပို့နှင့် ဗီဇာ — (၆) လ သက်တမ်းရှိမရှိ စစ်ဆေးပြီး မိတ္တူယူထားပါ",
      "flights": "လေယာဉ်လက်မှတ် — အသွားအပြန် သို့မဟုတ် အထွက်လက်မှတ်များ",
      "hotel": "ဟိုတယ်ဘွတ်ကင် — တည်းခိုမည့် အထောက်အထားများ",
      "insurance": "ခရီးသွားအာမခံ — အာမခံမိတ္တူ (ရှိပါက)",
      "vaccine": "ကာကွယ်ဆေးထိုးမှတ်တမ်း — ကျန်းမာရေးဆိုင်ရာ စာရွက်စာတမ်းများ",
      "backups": "ဒစ်ဂျစ်တယ် အရန်မှတ်တမ်း — ပတ်စပို့/ဗီဇာ ဓာတ်ပုံများကို cloud တွင် သိမ်းထားပါ",
      "cash": "ထိုင်းဘတ်ငွေ — ရောက်ရှိချိန်အတွက် လုံလောက်သော ငွေသား",
      "cards": "နိုင်ငံတကာသုံးကတ် — နိုင်ငံတကာသုံးရန် ခွင့်ပြုထားသော ကတ်များ",
      "sim": "SIM ကတ် / eSIM — ဒေသတွင်းသုံး SIM သို့မဟုတ် roaming ဖွင့်ထားပါ",
      "power": "Power Bank — အိတ်ဆောင် အားသွင်းကိရိယာ",
      "adapter": "Universal Adapter — ထိုင်းလျှပ်စစ်ခေါင်းနှင့် ကိုက်ညီသော ပလက်ခေါင်း",
      "maps": "Google Maps — အော့ဖ်လိုင်းမြေပုံများ ဒေါင်းလုဒ်လုပ်ထားပါ",
      "medicine": "ကိုယ်ပိုင်ဆေးဝါး — ပုံမှန်သောက်ရသော ဆေးဝါးများ",
      "firstaid": "ရှေးဦးသူနာပြုစုကိရိယာ — ပတ်တီးနှင့် အကိုက်အခဲပျောက်ဆေးများ",
      "sunscreen": "နေလောင်ကာခရင်မ် — ထိုင်းနေရောင်အတွက် SPF လုံလောက်သော ခရင်မ်",
      "clothing": "သင့်တော်သောအဝတ်အစား — ဘုရားကျောင်းများအတွက် ယဉ်ကျေးသောအဝတ်အစား",
      "transport": "လေဆိပ်သယ်ယူပို့ဆောင်ရေး — လမ်းကြောင်းကို ကြိုတင်စီစဉ်ပါ",
      "address": "ဟိုတယ်လိပ်စာ (ထိုင်းဘာသာ) — ထိုင်းဘာသာဖြင့် ရေးထားသော လိပ်စာကို သိမ်းထားပါ",
      "emergency": "အရေးပေါ်ဆက်သွယ်ရန် — Lock Screen တွင် ဖုန်းနံပါတ် တင်ထားပါ",
      "advisories": "ခရီးသွားသတိပေးချက် — နောက်ဆုံးရ သတင်းနှင့် သတိပေးချက်များ",
      "numbers": "အရေးပေါ်ဖုန်းနံပါတ် — အက်ပ်အတွင်းရှိ နံပါတ်များကို ကြည့်ထားပါ",
      "phrases": "အခြေခံထိုင်းစကားပြော — အက်ပ်အတွင်းရှိ စကားစုများကို လေ့လာပါ",
      "vat": "VAT ပြန်အမ်းငွေ — အက်ပ်အတွင်းရှိ လမ်းညွှန်ချက်ကို ဖတ်ထားပါ"
    }
  }
},
  ES: {
  "menu": "Menú",
  "menuCategories": {
    "travel": "Planificación de Viajes",
    "guides": "Guías esenciales",
    "transport": "Transporte",
    "essentialApps": "Aplicaciones Esenciales",
    "tools": "Herramientas de Viaje"
  },
  "start": "Comenzar Viaje",
  "explore": "Explorar",
  "concierge": "Conserje",
  "hero": "Explora la Magia Ahora",
  "heroSub": "Explore Asia junto a AsiaBuddy.",
  "welcome": "Bienvenido a Tailandia de parte de ThaiGuide",
  "sacredAesthetic": "Estética Sagrada",
  "toolbox": "",
  "emergency": "Consejos de Emergencia y Seguridad",
  "touristPolice": "Policía Turística",
  "assistance": "Llame para ayuda inmediata (24/7)",
  "contactNow": "Contactar Ahora",
  "tabs": {
    "mustVisit": "Lugares Imperdibles",
    "dining": "Experiencias Gastronómicas",
    "otherExperiences": "Otras Experiencias",
    "uniqueActivities": "Actividades Únicas",
    "hiddenGems": "Joyas Ocultas",
    "information": "Información"
  },
  "labels": {
    "etiquette": "Etiqueta",
    "advisory": "Avisos",
    "vibe": "Ambiente",
    "dos": "Qué Hacer",
    "donts": "Qué No Hacer",
    "legalAdvisory": "Aviso Legal",
    "culturalSubtitle": "Qué Hacer y Qué No Hacer • Costumbres Locales",
    "bestTime": "Mejor Época para Visitar",
    "goToLocation": "Ir a la ubicación"
  },
  "infoLink": "para más información haga clic aquí",
  "exploreThailandEssentials": "Explore los elementos esenciales de Tailandia",
  "infoModalTitle": "Guía de Elementos Esenciales de Tailandia",
  "infoModalSubtitle": "Guía práctica para su estancia",
  "booking": {
    "link": "Reserve alquiler de autos, boletos de autobús, boletos de avión y entradas.",
    "chatTitle": "Soporte de Reservas",
    "welcome": "¿Cómo puedo ayudarle con sus reservas?",
    "initialMessage": "Bienvenido a la asistencia de reservas.",
    "placeholder": "Pregunte sobre reservas...",
    "disclaimer": "Solo estimaciones.",
    "estimateNotice": "Las tarifas del servicio están sujetas a cambios",
    "suggestions": [
      "Alquiler de autos",
      "Boletos de autobús",
      "Boletos de avión"
    ]
  },
  "culturalGuideLink": "Guía de Qué Hacer y Qué No Hacer en Cultura",
  "lawsRegulationsLink": "Regulaciones cruciales para 2026",
  "transport": {
    "title": "Transporte",
    "detailsTitle": "Transporte en Tailandia — Para más información",
    "appsGuideLink": "Aplicaciones y sitios web esenciales para el transporte en Tailandia. ¡Haga clic aquí para más información!",
    "transportGuideLink": "Guía de Transporte",
    "modalTitle": "Guía de Transporte Nacional en Tailandia",
    "modalSubtitle": "Transporte",
    "statusActive": "Conserje de Transporte Activo",
    "destinationLabel": "Destino",
    "suggestions": [
      "Mapa BTS/MRT",
      "Grab vs Bolt",
      "Airport Link"
    ]
  },
  "vatRefund": {
    "title": "Guía de Reembolso de IVA",
    "description": "Gasto mín. 2,000 THB. Busque señales.",
    "link": "Reembolso de IVA"
  },
  "visa": {
    "title": "Info de Visa",
    "modalTitle": "Guía de Visa para Tailandia",
    "description": "Verifique su estado.",
    "link": "Información de Visa"
  },
  "travelTypes": {
    "title": "Tipos de viaje",
    "modalTitle": "Guía de Estilos de Viaje",
    "modalSubtitle": "Estilos de viaje y planificador",
    "link": "Estilos de Viaje"
  },
  "accommodation": {
    "title": "Alojamiento",
    "modalTitle": "Guía de Alojamiento en Tailandia",
    "chatTitle": "Ayuda con Alojamiento",
    "detailsTitle": "Detalles del Alojamiento",
    "guideLink": "Enlace a la Guía de Alojamiento",
    "suggestions": [
      "Hoteles de Lujo",
      "Hostales Boutique",
      "Resorts de Playa"
    ]
  },
  "tools": {
    "currency": "Conversor de Moneda",
    "phrases": "Frases Esenciales",
    "phrasesSubtitle": "Conceptos básicos, guía de audio y pronunciación",
    "politeParticlesTitle": "La regla de oro: Partículas de cortesía",
    "politeParticlesDesc": "En tailandés, la cortesía se transmite añadiendo una partícula al final de casi cada frase.",
    "maleParticle": "Masculino: Krap",
    "femaleParticle": "Femenino: Ka",
    "phrasesChatHeading": "Pregunta cualquier frase esencial que quieras saber.",
    "laws": "Leyes Clave",
    "etiquette": "Etiqueta",
    "weather": "Info del Clima",
    "serviceMinded": "Ayuda con Mentalidad de Servicio",
    "learnThaiBasics": "Aprenda lo básico del tailandés",
    "phrasesChat": {
      "placeholder": "Pregunta cualquier frase esencial que quieras saber.",
      "suggestions": [
        "¿Tiene habitaciones disponibles?",
        "¿Cuánto cuesta por noche?",
        "¿Puedo ver la habitación primero?",
        "¿Está incluido el desayuno?",
        "¿Dónde puedo dejar mi equipaje?"
      ]
    }
  },
  "weather": {
    "title": "Clima",
    "modalTitle": "Guía del Clima en Tailandia",
    "timeSuffix": "Hora Local",
    "updateFrequency": "Cada 15 min",
    "climate": "Clima Tropical",
    "alertsLabel": "Alertas",
    "alerts": "Sin alertas activas",
    "tipLabel": "Consejo de Viaje",
    "tip": "Siempre lleve agua",
    "humidity": "Humedad",
    "uvIndex": "Índice UV",
    "high": "Alto",
    "wind": "Viento"
  },
  "etiquetteSections": [
    {
      "title": "1. El \"Wai\" (El saludo tradicional)",
      "content": "El Wai es la forma estándar de saludar, agradecer o despedirse. Consiste en colocar las palmas de las manos juntas en posición de oración a la altura del pecho e inclinar ligeramente la cabeza.",
      "points": [
        "Quién va primero: Los jóvenes deben iniciar el Wai ante los mayores."
      ]
    }
  ],
  "quickTips": {
    "dos": [
      "Saludar (Wai) a mayores",
      "Sonreír",
      "Respetar a Buda"
    ],
    "donts": [
      "Tocar cabezas",
      "Apuntar con los pies",
      "Gritar"
    ]
  },
  "jaiYen": "\"Jai Yen\" — El corazón tranquilo",
  "jaiYenDesc": "Entender la etiqueta tailandesa consiste en mostrar respeto y mantener la armonía social.",
  "legalAdvisory": "Aviso Legal",
  "legalDesc": "Tailandia tiene leyes específicas sobre la monarquía, las drogas y el comportamiento público.",
  "lawsModalSubtitle": "Regulaciones esenciales • Actualizadas para 2026",
  "lawsModalTitle": "Leyes Clave en Tailandia",
  "lawsModalIntro": "Manténgase seguro y respetuoso conociendo estas leyes.",
  "lawsProTipTitle": "Consejo Profesional",
  "lawsDisclaimer": "Esta es una guía general, no asesoramiento legal.",
  "chat": {
    "welcome": "",
    "placeholder": "Pregunte cualquier cosa sobre su viaje",
    "title": "Conserje Tailandés",
    "status": "Mente de Servicio • Guía Profesional",
    "hint": "",
    "advice": "Consejo Profesional",
    "digitalHelp": "Ayuda Digital",
    "suggestionsLabel": "Consultas Comunes",
    "suggestions": [
      "¿Cuáles son los mejores lugares para visitar?",
      "¿Cómo obtener un reembolso de IVA?",
      "¿Cuáles son los números de emergencia?"
    ],
    "statusActive": "Conserje Activo",
    "processing": "ThaiGuide está pensando...",
    "safe": "¡Buen viaje!",
    "bookNow": "Reservar Ahora",
    "bookNowSubtitle": "Conectar con un Operador Humano"
  },
  "footer": {
    "by": "Excelencia Cultural Tailandesa • Servicios AsiaBuddy",
    "tagline": "Explore Asia junto a AsiaBuddy.",
    "rights": "© 2026 AsiaBuddy Services. Prototyp-Version.",
    "privacyPolicy": "Política de Privacidad",
    "legalTerms": "Términos Legales",
    "culturalGuide": "Guía Cultural",
    "officialService": "Guía Oficial",
    "liveEstimates": "Estimaciones en Vivo",
    "estimatesDisclaimer": "Las tarifas son solo estimaciones",
    "preservance": "Preserving la Excelencia en la Hospitalidad Tailandesa",
    "shoppingGuide": "Guía de Compras",
    "transportAppsGuide": "Guía de Aplicaciones"
  },
  "appTagline": "Conserje Digital AsiaBuddy",
  "medical": {
    "title": "Médico",
    "chatTitle": "Conserje Médico",
    "statusActive": "Conserje Médico Activo",
    "suggestionsLabel": "Consultas Médicas Comunes",
    "detailsTitle": "Guía Médica de Tailandia",
    "guideLink": "La Guía Médica Definitiva de Tailandia — Para más información",
    "modalTitle": "Guía Médica",
    "modalSubtitle": "Atención médica, chequeos y preparación",
    "suggestions": [
      "Hospitales de emergencia",
      "Guía de farmacias",
      "Información de seguros"
    ]
  },
  "food": {
    "title": "Comida",
    "chatTitle": "Conserje de Comida",
    "statusActive": "Conserje de Comida Activo",
    "suggestionsLabel": "Consultas de Comida Comunes",
    "detailsTitle": "Guía de Comida de Tailandia",
    "guideLink": "Guía de Comida de Tailandia — Para más información",
    "modalTitle": "Guía de Comida",
    "suggestions": [
      "Seguridad de comida callejera",
      "Mejor Pad Thai",
      "Opciones vegetarianas"
    ]
  },
  "nightlife": {
    "title": "Vida Nocturna",
    "chatTitle": "Conserje de Vida Nocturna",
    "statusActive": "Conserje de Vida Nocturna Activo",
    "suggestionsLabel": "Consultas de Vida Nocturna",
    "detailsTitle": "Guía de Vida Nocturna de Tailandia",
    "guideLink": "La Guía Nocturna Definitiva de Tailandia — Para más información",
    "modalTitle": "Guía de Vida Nocturna",
    "modalSubtitle": "Clubes, bares y seguridad",
    "suggestions": [
      "Bares en azoteas",
      "Mercados nocturnos",
      "Consejos de seguridad"
    ]
  },
  "shopping": {
    "title": "Shopping",
    "chatTitle": "Conserje de Compras",
    "statusActive": "Conserje de Compras Activo",
    "suggestionsLabel": "Consultas de Compras",
    "detailsTitle": "Guía de Compras de Tailandia",
    "guideLink": "Guía de Compras de Tailandia Para más información",
    "modalTitle": "Guía de Compras",
    "modalSubtitle": "Centros comerciales y mercados locales",
    "suggestions": [
      "Info de MBK Center",
      "Apertura de Chatuchak",
      "Pasos de reembolso de IVA"
    ]
  },
  "checklist": {
    "title": "Lista de verificación de viaje",
    "subtitle": "Todo lo que necesitas para tu tranquilidad.",
    "readyButton": "¿Listo para viajar?",
    "progress": "Progreso",
    "addPlaceholder": "Añadir artículo...",
    "addBtn": "Añadir",
    "resetBtn": "Reiniciar lista",
    "categories": {
      "docs": "Documentos esenciales",
      "finance": "Finanzas",
      "electronics": "Electrónica y conectividad",
      "health": "Salud y artículos personales",
      "safety": "Transporte y seguridad",
      "app": "Integración en la aplicación",
      "custom": "Lista personalizada"
    },
    "items": {
      "passport": "Pasaporte y visa: vigencia de 6 meses y copias",
      "flights": "Billetes de avión: confirmaciones",
      "hotel": "Reserva de hotel: comprobante de estancia",
      "insurance": "Seguro de viaje: copia de póliza",
      "vaccine": "Registro de vacunación: documentos de salud",
      "backups": "Copias digitales: fotos de pasaporte/visa en la nube",
      "cash": "Efectivo (THB): Baht suficiente al llegar",
      "cards": "Tarjeta internacional: tarjetas autorizadas",
      "sim": "Tarjeta SIM / eSIM: SIM local o roaming activo",
      "power": "Batería externa: cargador portátil",
      "adapter": "Adaptador universal: compatible con pines planos y redondos",
      "maps": "Google Maps: mapas sin conexión",
      "medicine": "Medicinas personales: medicamentos recetados",
      "firstaid": "Botiquín: suministros básicos y analgésicos",
      "sunscreen": "Protector solar: SPF adecuado para Tailandia",
      "clothing": "Ropa adecuada: atuendo modesto para templos",
      "transport": "Transporte al aeropuerto: planificar ruta por adelantado",
      "address": "Dirección del hotel en tailandés: guardar dirección",
      "emergency": "Contacto de emergencia: configurar en pantalla de bloqueo",
      "advisories": "Avisos de viaje: últimas noticias y advertencias",
      "numbers": "Números de emergencia: revisar números en la aplicación",
      "phrases": "Frases básicas en tailandés: estudiar frases en la aplicación",
      "vat": "Reembolso de IVA: leer guía en la aplicación"
    }
  }
},
  FR: {
  "menu": "Menu",
  "menuCategories": {
    "travel": "Planification de Voyage",
    "guides": "Guides Essentiels",
    "transport": "Transport",
    "essentialApps": "Applications Essentielles",
    "tools": "Outils de Voyage"
  },
  "start": "Commencer le Voyage",
  "explore": "Explorer",
  "concierge": "Concierge",
  "hero": "Explorez la Magie Maintenant",
  "heroSub": "Explorez l'Asie aux côtés d'AsiaBuddy.",
  "welcome": "Bienvenue en Thaïlande de la part de ThaiGuide",
  "sacredAesthetic": "Esthétique Sacrée",
  "toolbox": "",
  "emergency": "Conseils d'Urgence et de Sécurité",
  "touristPolice": "Police Touristique",
  "assistance": "Appelez pour une aide immédiate (24/7)",
  "contactNow": "Contactez Maintenant",
  "tabs": {
    "mustVisit": "Lieux Incontournables",
    "dining": "Expériences Culinaires",
    "otherExperiences": "Autres Expériences",
    "uniqueActivities": "Activités Uniques",
    "hiddenGems": "Trésors Cachés",
    "information": "Information"
  },
  "labels": {
    "etiquette": "Étiquette",
    "advisory": "Avis",
    "vibe": "Ambiance",
    "dos": "À Faire",
    "donts": "À Ne Pas Faire",
    "legalAdvisory": "Conseil Juridique",
    "culturalSubtitle": "À Faire et À Ne Pas Faire • Coutumes Locales",
    "bestTime": "Meilleur Moment pour Visiter",
    "goToLocation": "Aller à l'emplacement"
  },
  "infoLink": "pour plus d'informations cliquez ici",
  "exploreThailandEssentials": "Explorez les essentiels de la Thaïlande",
  "infoModalTitle": "Guide des Essentiels de la Thaïlande",
  "infoModalSubtitle": "Conseils pratiques pour votre séjour",
  "booking": {
    "link": "Réservez des locations de voitures, des billets de bus, des billets d'avion et des entrées.",
    "chatTitle": "Support Réservation",
    "welcome": "Comment puis-je vous aider pour vos réservations ?",
    "initialMessage": "Bienvenue à l'assistance à la réservation.",
    "placeholder": "Posez des questions sur les réservations...",
    "disclaimer": "Estimations seulement.",
    "estimateNotice": "Les tarifs de service sont sujets à changement",
    "suggestions": [
      "Locations de voitures",
      "Billets de bus",
      "Billets d'avion"
    ]
  },
  "culturalGuideLink": "Guide de l'étiquette culturelle À faire et à ne pas faire",
  "lawsRegulationsLink": "Réglementations cruciales pour 2026",
  "transport": {
    "title": "Transport",
    "detailsTitle": "Transport en Thaïlande — Pour plus d'informations",
    "appsGuideLink": "Applications et sites web essentiels pour le transport en Thaïlande. Cliquez ici pour plus d'informations !",
    "transportGuideLink": "Guide de Transport",
    "modalTitle": "Guide des Transports Nationaux en Thaïlande",
    "modalSubtitle": "Transport",
    "statusActive": "Concierge de Transport Actif",
    "destinationLabel": "Destination",
    "suggestions": [
      "Carte BTS/MRT",
      "Grab vs Bolt",
      "Ligne Aéroportuaire"
    ]
  },
  "vatRefund": {
    "title": "Guide de Remboursement TVA",
    "description": "Dépense min. 2 000 THB. Cherchez les panneaux.",
    "link": "Remboursement TVA"
  },
  "visa": {
    "title": "Infos Visa",
    "modalTitle": "Guide des Visas pour la Thaïlande",
    "description": "Vérifiez votre statut.",
    "link": "Informations Visa"
  },
  "travelTypes": {
    "title": "Types de voyage",
    "modalTitle": "Guide des Styles de Voyage",
    "modalSubtitle": "Styles de voyage et planificateur",
    "link": "Styles de Voyage"
  },
  "accommodation": {
    "title": "Hébergement",
    "modalTitle": "Guide de l'Hébergement en Thaïlande",
    "chatTitle": "Aide à l'Hébergement",
    "detailsTitle": "Détails de l'Hébergement",
    "guideLink": "Lien vers le Guide de l'Hébergement",
    "suggestions": [
      "Hôtels de Luxe",
      "Auberges de Charme",
      "Complexes Balnéaires"
    ]
  },
  "tools": {
    "currency": "Convertisseur de Devises",
    "phrases": "Phrases Essentielles",
    "phrasesSubtitle": "Bases, guide audio et prononciation",
    "politeParticlesTitle": "La règle d'or : Les particules de politesse",
    "politeParticlesDesc": "En thaïlandais, la politesse est transmise en ajoutant une particule à la fin de presque chaque phrase.",
    "maleParticle": "Homme : Krap",
    "femaleParticle": "Femme : Ka",
    "phrasesChatHeading": "Posez toutes les phrases essentielles que vous voulez savoir.",
    "laws": "Lois Clés",
    "etiquette": "Étiquette",
    "weather": "Météo",
    "serviceMinded": "Aide à l'Esprit de Service",
    "learnThaiBasics": "Apprendre les bases du thaï",
    "phrasesChat": {
      "placeholder": "Posez toutes les phrases essentielles que vous voulez savoir.",
      "suggestions": [
        "Avez-vous des chambres disponibles ?",
        "Quel est le prix par nuit ?",
        "Puis-je voir la chambre d'abord ?",
        "Le petit-déjeuner est-il inclus ?",
        "Où puis-je laisser mes bagages ?"
      ]
    }
  },
  "weather": {
    "title": "Météo",
    "modalTitle": "Guide Météo de la Thaïlande",
    "timeSuffix": "Heure Locale",
    "updateFrequency": "Toutes les 15 min",
    "climate": "Climat Tropical",
    "alertsLabel": "Alertes",
    "alerts": "Aucune alerte active",
    "tipLabel": "Conseil de Voyage",
    "tip": "Portez toujours de l'eau",
    "humidity": "Humidité",
    "uvIndex": "Indice UV",
    "high": "Élevé",
    "wind": "Vent"
  },
  "etiquetteSections": [
    {
      "title": "1. Le \"Wai\" (Le salut traditionnel)",
      "content": "Le Wai est la manière standard de saluer, de remercier ou de dire au revoir. Il consiste à placer les paumes de vos mains l'une contre l'autre en position de prière au niveau de la poitrine et à incliner légèrement la tête.",
      "points": [
        "Qui commence : Les jeunes doivent initier le Wai envers les aînés."
      ]
    }
  ],
  "quickTips": {
    "dos": [
      "Saluer (Wai) les aînés",
      "Sourire",
      "Respecter Bouddha"
    ],
    "donts": [
      "Toucher les têtes",
      "Pointer les pieds",
      "Crier"
    ]
  },
  "jaiYen": "\"Jai Yen\" — Le cœur serein",
  "jaiYenDesc": "Comprendre l'étiquette thaïlandaise, c'est faire preuve de respect et maintenir l'harmonie sociale.",
  "legalAdvisory": "Conseil Juridique",
  "legalDesc": "La Thaïlande a des lois spécifiques concernant la monarchie, des drogues et le comportement public.",
  "lawsModalSubtitle": "Réglementations essentielles • Mises à jour pour 2026",
  "lawsModalTitle": "Lois Clés en Thaïlande",
  "lawsModalIntro": "Restez en sécurité et respectueux en connaissant ces lois.",
  "lawsProTipTitle": "Conseil de Pro",
  "lawsDisclaimer": "Ceci est un guide général, pas un conseil juridique.",
  "chat": {
    "welcome": "",
    "placeholder": "Posez n'importe quelle question sur votre voyage",
    "title": "Concierge Thaïlandais",
    "status": "Esprit de Service • Guidage Professionnel",
    "hint": "",
    "advice": "Conseil Professionnel",
    "digitalHelp": "Aide Numérique",
    "suggestionsLabel": "Demandes Courantes",
    "suggestions": [
      "Quels sont les meilleurs endroits à visiter ?",
      "Comment obtenir un remboursement de TVA ?",
      "Quels sont les numéros d'urgence ?"
    ],
    "statusActive": "Concierge Activo",
    "processing": "ThaiGuide réfléchit...",
    "safe": "Bon voyage !",
    "bookNow": "Réserver Maintenant",
    "bookNowSubtitle": "Connecter avec un Opérateur Humain"
  },
  "footer": {
    "by": "Excellence Culturelle Thaïlandaise • Services AsiaBuddy",
    "tagline": "Explorez l'Asie aux côtés d'AsiaBuddy.",
    "rights": "© 2026 Services AsiaBuddy. Version Prototype.",
    "privacyPolicy": "Politique de Confidentialité",
    "legalTerms": "Termes Légaux",
    "culturalGuide": "Guide Culturel",
    "officialService": "Guide Officiel",
    "liveEstimates": "Estimations en Temps Réel",
    "estimatesDisclaimer": "Les tarifs sont des estimations seulement",
    "preservance": "Préserver l'Excellence de l'Hospitalité Thaïlandaise",
    "shoppingGuide": "Guide de Shopping",
    "transportAppsGuide": "Guide d'Applications"
  },
  "appTagline": "Concierge Numérique AsiaBuddy",
  "medical": {
    "title": "Médical",
    "chatTitle": "Concierge Médical",
    "statusActive": "Concierge Médical Actif",
    "suggestionsLabel": "Demandes Médicales Courantes",
    "detailsTitle": "Guide Médical de la Thaïlande",
    "guideLink": "Le Guide Médical Ultime de la Thaïlande — Pour plus d'informations",
    "modalTitle": "Guide Médical",
    "modalSubtitle": "Soins de santé, bilans et préparation",
    "suggestions": [
      "Hôpitaux d'urgence",
      "Guide des pharmacies",
      "Infos assurances"
    ]
  },
  "food": {
    "title": "Nourriture",
    "chatTitle": "Concierge Gastronomique",
    "statusActive": "Concierge Gastronomique Actif",
    "suggestionsLabel": "Demandes Gastronomiques Courantes",
    "detailsTitle": "Guide Gastronomique de la Thaïlande",
    "guideLink": "Guide Gastronomique de la Thaïlande — Pour plus d'informations",
    "modalTitle": "Guide Nourriture",
    "suggestions": [
      "Sécurité de la street food",
      "Meilleur Pad Thai",
      "Options végétariennes"
    ]
  },
  "nightlife": {
    "title": "Vie Nocturne",
    "chatTitle": "Concierge Vie Nocturne",
    "statusActive": "Concierge Vie Nocturne Actif",
    "suggestionsLabel": "Demandes Vie Nocturne",
    "detailsTitle": "Guide Vie Nocturne de la Thaïlande",
    "guideLink": "Le Guide de la Vie Nocturne Ultime en Thaïlande — Pour plus d'informations",
    "modalTitle": "Guide Vie Nocturne",
    "modalSubtitle": "Clubs, bars et sécurité",
    "suggestions": [
      "Rooftop bars",
      "Marchés nocturnes",
      "Conseils de sécurité"
    ]
  },
  "shopping": {
    "title": "Shopping",
    "chatTitle": "Concierge Shopping",
    "statusActive": "Concierge Shopping Actif",
    "suggestionsLabel": "Demandes Shopping",
    "detailsTitle": "Guide du Shopping en Thaïlande",
    "guideLink": "Guide du Shopping en Thaïlande Pour plus d'informations",
    "modalTitle": "Guide Shopping",
    "modalSubtitle": "Centres commerciaux et marchés locaux",
    "suggestions": [
      "Info MBK Center",
      "Ouverture Chatuchak",
      "Étapes remboursement TVA"
    ]
  },
  "checklist": {
    "title": "Liste de préparation de voyage",
    "subtitle": "Tout ce dont vous avez besoin pour avoir l'esprit tranquille.",
    "readyButton": "Prêt pour le voyage ?",
    "progress": "Progression",
    "addPlaceholder": "Ajouter un élément...",
    "addBtn": "Ajouter",
    "resetBtn": "Réinitialiser la liste",
    "categories": {
      "docs": "Documents essentiels",
      "finance": "Finances",
      "electronics": "Électronique et connectivité",
      "health": "Santé et effets personnels",
      "safety": "Transport et sécurité",
      "app": "Intégration dans l'application",
      "custom": "Liste personnalisée"
    },
    "items": {
      "passport": "Passeport et visa : validité de 6 mois et copies",
      "flights": "Billets d'avion : confirmations",
      "hotel": "Réservation d'hôtel : preuve d'hébergement",
      "insurance": "Assurance voyage : copie de la police",
      "vaccine": "Carnet de vaccination : documents de santé",
      "backups": "Sauvegardes numériques : photos passeport/visa sur le cloud",
      "cash": "Espèces (THB) : Baht suffisant à l'arrivée",
      "cards": "Carte internationale : cartes autorisées",
      "sim": "Carte SIM / eSIM : SIM locale ou itinérance active",
      "power": "Batterie externe : chargeur portable",
      "adapter": "Adaptateur universel : compatible broches plates et rondes",
      "maps": "Google Maps : cartes hors ligne",
      "medicine": "Médicaments personnels : médicaments prescrits",
      "firstaid": "Trousse de premiers secours : fournitures de base",
      "sunscreen": "Crème solaire : SPF adéquat pour la Thaïlande",
      "clothing": "Vêtements appropriés : tenue décente pour les temples",
      "transport": "Transport aéroport : planifier l'itinéraire à l'avance",
      "address": "Adresse de l'hôtel en thaï : enregistrer l'adresse",
      "emergency": "Contact d'urgence : configurer sur l'écran de verrouillage",
      "advisories": "Avis aux voyageurs : dernières nouvelles",
      "numbers": "Numéros d'urgence : consulter les numéros dans l'app",
      "phrases": "Phrases de base en thaï : étudier les phrases dans l'app",
      "vat": "Remboursement TVA : lire le guide dans l'app"
    }
  }
},
  DE: {
  "menu": "Menü",
  "menuCategories": {
    "travel": "Reiseplanung",
    "guides": "Wichtige Leitfäden",
    "transport": "Transport",
    "essentialApps": "Wichtige Apps",
    "tools": "Reisetools"
  },
  "start": "Reise Starten",
  "explore": "Erkunden",
  "concierge": "Concierge",
  "hero": "Entdecken Sie jetzt die Magie",
  "heroSub": "Entdecke Asien an der Seite von AsiaBuddy.",
  "welcome": "Willkommen in Thailand von ThaiGuide",
  "sacredAesthetic": "Heilige Ästhetik",
  "toolbox": "",
  "emergency": "Notfall- und Sicherheitshinweise",
  "touristPolice": "Touristenpolizei",
  "assistance": "Rufen Sie für sofortige Hilfe an (24/7)",
  "contactNow": "Jetzt Kontaktieren",
  "tabs": {
    "mustVisit": "Sehenswürdigkeiten",
    "dining": "Essen & Gastronomie",
    "otherExperiences": "Andere Erlebnisse",
    "uniqueActivities": "Einzigartige Aktivitäten",
    "hiddenGems": "Geheimtipps",
    "information": "Informationen"
  },
  "labels": {
    "etiquette": "Etikette",
    "advisory": "Hinweise",
    "vibe": "Vibe",
    "dos": "Was man tun sollte",
    "donts": "Was man lassen sollte",
    "legalAdvisory": "Rechtliche Hinweise",
    "culturalSubtitle": "Kulturelle Do's & Don'ts • Lokale Bräuche",
    "bestTime": "Beste Reisezeit",
    "goToLocation": "Zum Standort gehen"
  },
  "infoLink": "für weitere Informationen hier klicken",
  "exploreThailandEssentials": "Erkunden Sie Thailand Essentials",
  "infoModalTitle": "Thailand Essentials Leitfaden",
  "infoModalSubtitle": "Praktische Anleitung für Ihren Aufenthalt",
  "booking": {
    "link": "Buchen Sie Mietwagen, Bustickets, Flugtickets und Eintrittsgelder.",
    "chatTitle": "Buchungsassistent",
    "welcome": "Wie kann ich Ihnen bei Ihren Buchungen helfen?",
    "initialMessage": "Willkommen beim Buchungsassistenten.",
    "placeholder": "Fragen Sie nach Buchungen...",
    "disclaimer": "Nur Schätzungen.",
    "estimateNotice": "Servicegebühren können sich ändern",
    "suggestions": [
      "Mietwagen",
      "Bustickets",
      "Flugtickets"
      ]
  },
  "culturalGuideLink": "Kulturelle Do's & Don'ts Leitfaden",
  "lawsRegulationsLink": "Wichtige Vorschriften für 2026",
  "transport": {
    "title": "Transport",
    "detailsTitle": "Transport in Thailand — Für weitere Informationen",
    "appsGuideLink": "Wichtige Apps und Websites für den Transport in Thailand. Klicken Sie hier für weitere Informationen!",
    "transportGuideLink": "Transportleitfaden",
    "modalTitle": "Thailands landesweiter Transportleitfaden",
    "modalSubtitle": "Transport",
    "statusActive": "Transport-Concierge Aktiv",
    "destinationLabel": "Zielort",
    "suggestions": [
      "BTS/MRT Karte",
      "Grab vs Bolt",
      "Flughafenzug"
    ]
  },
  "vatRefund": {
    "title": "MwSt.-Rückerstattungsleitfaden",
    "description": "Mindestausgabe 2.000 THB. Achten Sie auf Schilder.",
    "link": "MwSt.-Rückerstattung"
  },
  "visa": {
    "title": "Visa-Info",
    "modalTitle": "Thailand Visum-Leitfaden",
    "description": "Überprüfen Sie Ihren Status.",
    "link": "Visum-Informationen"
  },
  "travelTypes": {
    "title": "Reisearten",
    "modalTitle": "Reisestile-Leitfaden",
    "modalSubtitle": "Reisestile & Planer",
    "link": "Reisestile"
  },
  "accommodation": {
    "title": "Unterkunft",
    "modalTitle": "Thailand Unterkunftsleitfaden",
    "chatTitle": "Unterkunftshilfe",
    "detailsTitle": "Unterkunftsdetails",
    "guideLink": "Link zum Unterkunftsleitfaden",
    "suggestions": [
      "Luxushotels",
      "Boutique-Hostels",
      "Strandresorts"
    ]
  },
  "tools": {
    "currency": "Währungsrechner",
    "phrases": "Wichtige Sätze",
    "phrasesSubtitle": "Grundlagen, Audio- & Ausspracheführer",
    "politeParticlesTitle": "Die goldene Regel: Höflichkeitspartikel",
    "politeParticlesDesc": "Im Thailändischen wird Höflichkeit durch das Hinzufügen einer Partikel am Ende fast jedes Satzes ausgedrückt.",
    "maleParticle": "Männlich: Krap",
    "femaleParticle": "Weiblich: Ka",
    "phrasesChatHeading": "Fragen Sie nach allen wichtigen Redewendungen, die Sie wissen möchten.",
    "laws": "Wichtige Gesetze",
    "etiquette": "Etikette",
    "weather": "Wetterinfo",
    "serviceMinded": "Service Minded Hilfe",
    "learnThaiBasics": "Thai-Grundlagen lernen",
    "phrasesChat": {
      "placeholder": "Fragen Sie nach wichtigen Sätzen, die Sie wissen möchten...",
      "suggestions": [
        "Haben Sie noch Zimmer frei?",
        "Wie viel kostet es pro Nacht?",
        "Kann ich das Zimmer zuerst sehen?",
        "Ist das Frühstück inbegriffen?",
        "Wo kann ich mein Gepäck lassen?"
      ]
    }
  },
  "weather": {
    "title": "Wetter",
    "modalTitle": "Thailand Wetterleitfaden",
    "timeSuffix": "Ortszeit",
    "updateFrequency": "Alle 15 Min.",
    "climate": "Tropisches Klima",
    "alertsLabel": "Warnungen",
    "alerts": "Keine aktiven Warnungen",
    "tipLabel": "Reisetipp",
    "tip": "Immer Wasser dabei haben",
    "humidity": "Luftfeuchtigkeit",
    "uvIndex": "UV-Index",
    "high": "Hoch",
    "wind": "Wind"
  },
  "etiquetteSections": [
    {
      "title": "1. Das \"Wai\" (Die traditionelle Begrüßung)",
      "content": "Das Wai ist die Standardmethode zum Grüßen, Danken oder Verabschieden. Dabei werden die Handflächen in einer gebetsähnlichen Position auf Brusthöhe zusammengelegt und der Kopf leicht gebeugt.",
      "points": [
        "Wer fängt an: Jüngere Personen sollten das Wai gegenüber Älteren einleiten."
      ]
    }
  ],
  "quickTips": {
    "dos": [
      "Ältere grüßen (Wai)",
      "Lächeln",
      "Buddha respektieren"
    ],
    "donts": [
      "Köpfe berühren",
      "Mit Füßen zeigen",
      "Schreien"
    ]
  },
  "jaiYen": "\"Jai Yen\" — Das kühle Herz",
  "jaiYenDesc": "Das Verständnis der thailändischen Etikette bedeutet, Respekt zu zeigen und die soziale Harmonie zu wahren.",
  "legalAdvisory": "Rechtliche Hinweise",
  "legalDesc": "Thailand hat spezifische Gesetze in Bezug auf die Monarchie, Drogen und öffentliches Verhalten.",
  "lawsModalSubtitle": "Wichtige Vorschriften • Aktualisiert für 2026",
  "lawsModalTitle": "Wichtige Gesetze in Thailand",
  "lawsModalIntro": "Bleiben Sie sicher und respektvoll, indem Sie diese Gesetze kennen.",
  "lawsProTipTitle": "Pro-Tipp",
  "lawsDisclaimer": "Dies ist ein allgemeiner Leitfaden, keine Rechtsberatung.",
  "chat": {
    "welcome": "",
    "placeholder": "Fragen Sie alles über Ihre Reise",
    "title": "Thai Concierge",
    "status": "Service Mind • Professionelle Beratung",
    "hint": "",
    "advice": "Professionelle Beratung",
    "digitalHelp": "Digitale Hilfe",
    "suggestionsLabel": "Häufige Anfragen",
    "suggestions": [
      "Was sind die besten Orte zum Besuchen?",
      "Wie erhalte ich eine MwSt.-Rückerstattung?",
      "Notfall-Kontaktnummern?"
    ],
    "statusActive": "Concierge Aktiv",
    "processing": "ThaiGuide überlegt...",
    "safe": "Gute Reise!",
    "bookNow": "Jetzt Buchen",
    "bookNowSubtitle": "Mit einem menschlichen Mitarbeiter verbinden"
  },
  "footer": {
    "by": "Thailändische kulturelle Exzellenz • AsiaBuddy Services",
    "tagline": "Entdecke Asien an der Seite von AsiaBuddy.",
    "rights": "© 2026 AsiaBuddy Services. Prototyp-Version.",
    "privacyPolicy": "Datenschutzrichtlinie",
    "legalTerms": "Rechtliche Bedingungen",
    "culturalGuide": "Cultural Guide",
    "officialService": "Official Guide",
    "liveEstimates": "Live-Schätzungen",
    "estimatesDisclaimer": "Preise sind nur Schätzungen",
    "preservance": "Exzellenz in thailändischer Gastfreundschaft bewahren",
    "shoppingGuide": "Shopping-Guide",
    "transportAppsGuide": "Apps-Guide"
  },
  "appTagline": "AsiaBuddy Digital Concierge",
  "medical": {
    "title": "Medizin",
    "chatTitle": "Medizinischer Concierge",
    "statusActive": "Medizinischer Concierge Aktiv",
    "suggestionsLabel": "Häufige medizinische Anfragen",
    "detailsTitle": "Thailand Medizin-Leitfaden",
    "guideLink": "Der ultimative Thailand Medizin-Leitfaden — Für weitere Informationen",
    "modalTitle": "Medizinischer Leitfaden",
    "modalSubtitle": "Gesundheitsfürsorge, Untersuchungen & Vorbereitung",
    "suggestions": [
      "Notfallkrankenhäuser",
      "Apothekenführer",
      "Versicherungsinfos"
    ]
  },
  "food": {
    "title": "Essen",
    "chatTitle": "Essen-Concierge",
    "statusActive": "Essen-Concierge Aktiv",
    "suggestionsLabel": "Häufige Essensanfragen",
    "detailsTitle": "Thailand Essen-Leitfaden",
    "guideLink": "Thailand Essen-Leitfaden — Für weitere Informationen",
    "modalTitle": "Essen-Leitfaden",
    "suggestions": [
      "Straßenküche Sicherheit",
      "Bester Pad Thai",
      "Vegetarische Optionen"
    ]
  },
  "nightlife": {
    "title": "Nachtleben",
    "chatTitle": "Nachtleben-Concierge",
    "statusActive": "Nachtleben-Concierge Aktiv",
    "suggestionsLabel": "Nachtleben-Anfragen",
    "detailsTitle": "Thailand Nachtleben-Leitfaden",
    "guideLink": "Der ultimative Thailand Nachtleben-Leitfaden — Für weitere Informationen",
    "modalTitle": "Nachtleben-Leitfaden",
    "modalSubtitle": "Clubs, Bars & Sicherheit",
    "suggestions": [
      "Rooftop-Bars",
      "Nachtmärkte",
      "Sicherheitstipps"
    ]
  },
  "shopping": {
    "title": "Shopping",
    "chatTitle": "Shopping-Concierge",
    "statusActive": "Shopping-Concierge Aktiv",
    "suggestionsLabel": "Shopping-Anfragen",
    "detailsTitle": "Thailand Shopping-Leitfaden",
    "guideLink": "Thailand Shopping-Leitfaden — Für weitere Informationen",
    "modalTitle": "Shopping-Leitfaden",
    "modalSubtitle": "Einkaufszentren & lokale Märkte",
    "suggestions": [
      "MBK Center Info",
      "Chatuchak Öffnungszeiten",
      "MwSt.-Rückerstattungsschritte"
    ]
  },
  "checklist": {
    "title": "Reise-Checkliste",
    "subtitle": "Alles, was Sie für eine entspannte Reise brauchen.",
    "readyButton": "Bereit für die Reise?",
    "progress": "Fortschritt",
    "addPlaceholder": "Eintrag hinzufügen...",
    "addBtn": "Hinzufügen",
    "resetBtn": "Liste zurücksetzen",
    "categories": {
      "docs": "Wichtige Dokumente",
      "finance": "Finanzen",
      "electronics": "Elektronik & Konnektivität",
      "health": "Gesundheit & Essentials",
      "safety": "Transport & Sicherheit",
      "app": "App-Integration",
      "custom": "Eigene Liste"
    },
    "items": {
      "passport": "Reisepass & Visum: 6 Monate Gültigkeit & Kopien",
      "flights": "Flugtickets: Buchungsbestätigungen",
      "hotel": "Hotelbuchung: Unterkunftsnachweis",
      "insurance": "Reiseversicherung: Kopie der Police",
      "vaccine": "Impfpass: Gesundheitsdokumente",
      "backups": "Digitale Backups: Pass-/Visumfotos in der Cloud",
      "cash": "Bargeld (THB): Genug Baht bei Ankunft",
      "cards": "Internationale Karte: Freigeschaltete Karten",
      "sim": "SIM-Karte / eSIM: Lokale SIM oder Roaming",
      "power": "Powerbank: Tragbares Ladegerät",
      "adapter": "Universaladapter: Flach- und Rundstecker-kompatibel",
      "maps": "Google Maps: Offline-Karten herunterladen",
      "medicine": "Persönliche Medikamente: Verschriebene Medis",
      "firstaid": "Erste-Hilfe-Set: Basisversorgung & Schmerzmittel",
      "sunscreen": "Sonnencreme: Passender SPF für Thailand",
      "clothing": "Passende Kleidung: Angemessen für Tempel",
      "transport": "Flughafentransfer: Route im Voraus planen",
      "address": "Hoteladresse auf Thai: Adresse speichern",
      "emergency": "Notfallkontakt: Sperrbildschirm-Setup",
      "advisories": "Reisehinweise: Aktuelle Nachrichten & Warnungen",
      "numbers": "Notrufnummern: Nummern in der App prüfen",
      "phrases": "Thai-Grundlagen: Sätze in der App lernen",
      "vat": "MwSt.-Rückerstattung: Leitfaden in der App lesen"
    }
  }
}
};
