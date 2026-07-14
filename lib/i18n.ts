import { SupportedLanguage } from '@/types/country';

const SUPPORTED_LOCALES: SupportedLanguage[] = ['EN', 'TH', 'MM', 'ES', 'FR', 'DE'];

export function normalizeLocale(locale: string | undefined | null): SupportedLanguage {
  if (!locale) return 'EN';
  
  const upper = locale.toUpperCase();
  if (SUPPORTED_LOCALES.includes(upper as SupportedLanguage)) {
    return upper as SupportedLanguage;
  }
  
  return 'EN';
}

const ENGLISH_UI = {
  "brand": {
    "name": "ThaiGuide",
    "subtitle": "AsiaBuddy Services"
  },
  "home": "Home",
  "tours": "Tours",
  "destinations": "Destinations",
  "tourPackages": "Tour Packages",
  "travelBlog": "Travel Blog",
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
    "title": "TRANSPORT & CAR RENTAL",
    "detailsTitle": "Transportation in Thailand — For more information",
    "modalTitle": "Thailand Nationwide Transport Guide",
    "modalSubtitle": "Transportation",
    "destinationLabel": "Destination",
    "subtitle": "Dynamic Rental Customization",
    "emptyState": "Specify your logistics criteria to receive customized booking routes.",
    "readyToBook": "Ready to secure travel logistics?",
    "bookStayButton": "📅 Book Vehicle Now",
    "noneSelected": "None selected",
    "suggestions": [],
    "survey": {
      "title": "Car Rental Preferences Survey",
      "analyzing": "Analyzing your travel needs to find the optimal fleet option...",
      "buttons": {
        "next": "Next Step",
        "back": "Back",
        "submit": "Submit Request",
        "skip": "Skip"
      },
      "questions": {
        "rental_type": {
          "question": "Which rental option do you prefer?",
          "options": ["Self-Drive", "With Driver"]
        },
        "pickup_city": {
          "question": "Which city would you like to pick up the vehicle?",
          "options": ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Koh Samui"]
        },
        "duration_days": {
          "question": "How many days do you want to rent the car?",
          "placeholder": "Enter number of days (e.g., 5)"
        },
        "passengers_luggage": {
          "question": "How many passengers and large bags are traveling?",
          "options": [
            "1-3 Passengers (Under 2 large bags)",
            "4-5 Passengers (2-3 large bags)",
            "6-9 Passengers (4+ large bags)"
          ]
        },
        "car_class": {
          "question": "What vehicle style fits your journey best?",
          "options": ["Compact Hatchback", "Standard Sedan", "Family SUV", "Luxury Sedan", "VIP Van (9 Seater)"]
        },
        "self_drive_license": {
          "question": "Do you hold a valid International Driving Permit (IDP) or Thai Driving License?",
          "options": ["Yes, I have one", "No, I do not"]
        },
        "self_drive_deposit": {
          "question": "Do you agree to secure the refundable security deposit (typically via credit card hold)?",
          "options": ["Yes, I agree", "No, I do not"]
        },
        "driver_hours": {
          "question": "What daily driving duration do you require?",
          "options": [
            "Half-Day (Up to 5 Hours)",
            "Full-Day (Up to 10-12 Hours)",
            "Airport Point-to-Point Transfer Only"
          ]
        },
        "driver_language": {
          "question": "Which language capability do you prefer for your driver?",
          "options": ["Thai Only", "Basic English & Thai", "Burmese & Thai"]
        },
        "addons": {
          "question": "Select required add-ons (Multiple Choice):",
          "options": ["Child Safety Seat", "GPS Navigation Unit", "Premium Full Coverage Insurance", "Additional Driver Registration"]
        },
        "pickup_date": {
          "question": "Please specify your tentative rental start date or month:",
          "placeholder": "e.g., October 15, or Mid-December"
        }
      }
    }
  },
  "vatRefund": {
    "title": "VAT Refund Guide",
    "description": "Min spend 2,000 THB. Look for signs.",
    "link": "VAT Refund"
  },
  "visa": {
    "title": "Visa info",
    "modalTitle": "Thailand Visa Guide",
    "modalSubtitle": "Visa Information",
    "description": "Check your status.",
    "link": "Visa Information"
  },
  "travelTypes": {
    "title": "Travel types",
    "modalTitle": "Travel Styles Guide",
    "modalSubtitle": "Travel Styles & Planner",
    "link": "Travel types"
  },
  "budget": "Budget Tips",
  "budgetModalTitle": "Thailand Budget Guide",
  "budgetSubtitle": "Smart Travel Tips",
  "learnMore": "Learn more",
  "accommodation": {
    title: "ACCOMMODATION CO-PILOT",
    modalTitle: "Comprehensive Guide to Accommodations in Thailand",
    detailsTitle: "Accommodations",
    subtitle: "Dynamic Stay Customization",
    emptyState: "Answer the questions below to secure personalized recommendations.",
    readyToBook: "Ready to secure arrangements?",
    bookStayButton: "📅 Book Stay Now",
    noneSelected: "None selected",
    suggestions: [],
    survey: {
      title: "Accommodation Preferences Survey",
      analyzing: "Analyzing your preferences to find the perfect stay...",
      buttons: {
        next: "Next Step",
        back: "Back",
        submit: "Submit Survey",
        skip: "Skip"
      },
      questions: {
        city: {
          question: "Which city would you like to stay in?",
          options: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Ayutthaya", "Koh Samui"]
        },
        nights: {
          question: "How many nights do you want to stay?",
          placeholder: "Enter number of nights (e.g., 5)"
        },
        area_general: {
          question: "Which area would you like to stay in?",
          options: ["City Center / Downtown", "Beachfront / Coastal", "Quiet / Nature", "Historic / Cultural"]
        },
        budget: {
          question: "What is your budget per night?",
          options: ["Budget: Under $30", "Mid-range: $30 - $100", "Luxury: $100 - $250", "Ultra Luxury: $250+"]
        },
        type: {
          question: "What type of accommodation do you prefer?",
          options: ["Hotel", "Resort", "Hostel", "Guesthouse", "Villa / Apartment"]
        },
        stars: {
          question: "What star rating do you prefer?",
          options: ["1-2 Stars", "3 Stars", "4 Stars", "5 Stars / Luxury", "No preference"]
        },
        bangkok_vibe: {
          question: "Which area fits your vibe in Bangkok?",
          options: [
            "Sukhumvit (Shopping & Nightlife)",
            "Siam/Pratunam (Family Shopping & Markets)",
            "Silom/Sathorn (Business & Upscale Dining)",
            "Riverside (Luxury & Cultural Sightseeing)"
          ]
        },
        phuket_beach: {
          question: "What kind of beach experience do you prefer in Phuket?",
          options: [
            "Patong (Nightlife & Crowded Beach)",
            "Kata / Karon (Family-friendly & Surfing)",
            "Bangtao / Laguna (Luxury Resorts & Quieter)",
            "Phuket Old Town (Culture & Cafes - No Beach)"
          ]
        },
        transit_proximity: {
          question: "How important is it to be within walking distance to the BTS (Skytrain) or MRT (Subway)?",
          options: [
            "Must be within a 5-minute walk",
            "Nice to have, but not a dealbreaker",
            "Not important (Planning to use private vans/taxis)"
          ]
        },
        beach_proximity: {
          question: "What is your preferred proximity to the beach?",
          options: [
            "Direct Beachfront (No roads to cross)",
            "Walking distance to the beach (under 10 mins)",
            "Don't mind driving/taking a shuttle to the beach"
          ]
        },
        airport_pickup: {
          question: "Would you like us to arrange a private airport pickup to your accommodation?",
          options: [
            "Yes, please quote me for a private car/van.",
            "No, I will manage via taxi/Grab."
          ]
        },
        guests: {
          question: "How many guests are traveling?",
          placeholder: "Enter number of guests (e.g., 2 adults, 1 child)"
        },
        room_type: {
          question: "What room type fits you best?",
          options: ["Standard / Basic Room", "Deluxe / Superior Room", "Suite", "Family Room", "Shared Dormitory Bed"]
        },
        amenities: {
          question: "Select required amenities (Multiple Choice):",
          options: ["Free Wi-Fi", "Swimming Pool", "Gym / Fitness", "Air Conditioning", "Breakfast Included", "Spa & Wellness"]
        },
        checkin_date: {
          question: "Please specify your tentative check-in date or month:",
          placeholder: "e.g., October 15, or Mid-December"
        }
      }
    }
  },
  "carRental": {
    title: "CAR RENTAL ASSISTANT",
    modalTitle: "Comprehensive Guide to Car Rentals in Thailand",
    detailsTitle: "Car Rentals",
    subtitle: "Dynamic Rental Customization",
    emptyState: "Answer the questions below to secure personalized recommendations.",
    readyToBook: "Ready to secure arrangements?",
    bookStayButton: "🚗 Book Rental Now",
    noneSelected: "None selected",
    suggestions: [],
    survey: {
      title: "Car Rental Preferences Survey",
      analyzing: "Analyzing your preferences to find the perfect rental...",
      buttons: {
        next: "Next Step",
        back: "Back",
        submit: "Submit Survey",
        skip: "Skip"
      },
      questions: {
        rental_type: {
          question: "Would you prefer to drive yourself or hire a driver?",
          options: ["Self-Drive (I will drive)", "With Driver (Chauffeur service)"]
        },
        pickup_location: {
          question: "Where would you like to pick up the car?",
          placeholder: "Enter pickup location (e.g., Suvarnabhumi Airport, Bangkok City)"
        },
        dropoff_location: {
          question: "Where would you like to drop off the car?",
          placeholder: "Enter drop-off location (e.g., Phuket Airport, Hotel)"
        },
        rental_dates: {
          question: "What are your rental dates?",
          placeholder: "Enter dates (e.g., Dec 15-20, 2026)"
        },
        vehicle_type: {
          question: "What type of vehicle do you prefer?",
          options: ["Economy Car", "SUV / 4WD", "Luxury Car", "Van / Minibus"]
        },
        driver_age: {
          question: "What is the primary driver's age?",
          placeholder: "Enter driver's age (e.g., 30)"
        },
        driver_license: {
          question: "Do you have a valid international driving permit?",
          options: ["Yes, I have an IDP", "No, I only have a local license", "I need assistance with this"]
        },
        driver_language: {
          question: "What language should the driver speak? (Multiple Choice)",
          options: ["English", "Thai", "Chinese", "Japanese", "Korean"]
        },
        additional_services: {
          question: "Select additional services needed (Multiple Choice):",
          options: ["GPS Navigation", "Child Seat", "Full Insurance Coverage", "Airport Pickup", "24/7 Support"]
        },
        budget: {
          question: "What is your daily budget?",
          options: ["Budget: Under $30/day", "Mid-range: $30 - $80/day", "Luxury: $80 - $150/day", "Premium: $150+/day"]
        },
        special_requests: {
          question: "Any special requests or requirements?",
          placeholder: "Enter any special requests (e.g., vegetarian driver, specific route)"
        }
      }
    }
  },
  "tripPlanner": {
    header: "Automated Trip Planner",
    subHeader: "Let's plan your perfect Thailand trip step-by-step",
    q1: "Which destinations are you interested in? (e.g., Bangkok, Phuket, Chiang Mai)",
    q2: "How long is your trip? (e.g., 5 days 4 nights)",
    q3: "How many people are traveling?",
    adults: "Adults",
    infants: "Infants",
    q4: "What type of accommodation do you prefer?",
    accOptions: ["Hotel", "Guesthouse", "Hostel", "No Preference"],
    q5: "What is your budget level?",
    budgetOptions: ["Budget", "Mid-range", "Luxury"],
    q6: "What is your primary interest?",
    interestOptions: ["Culture/Temples", "Beaches/Islands", "Shopping", "Food", "Adventure"],
    q7: "Any special requirements? (e.g., Halal food, wheelchair access, traveling with pets)",
    next: "Next",
    submit: "Generate Plan",
    restart: "Start Over",
    generating: "Crafting your personalized itinerary..."
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
    "travelerTips": "Traveler Tips",
    "phrasesChatIntro": "Ask anything about Thai phrases and language.",
    "phrasesFooter": "Translations & Phonetics powered by AsiaBuddy AI",
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
    "safe": "Safe travels!",
    "bookNow": "Book Now",
    "bookNowSubtitle": "Connect with a Human Operator",
    "action": "Book Now",
    "aiBusyFallback": "Our AI assistant is temporarily busy. Tap 'Book Now' to chat directly with our team instead.",
    "bookNowCta": "Book Now",
    "surveyProgressLabel": "Survey Progress",
    "resetChatTitle": "Reset Chat",
    "resetButtonLabel": "Reset"
  },
  "destinationTabs": {
    "mustVisit": "Must Visit",
    "dining": "Dining",
    "experiences": "Experiences",
    "activities": "Activities",
    "hiddenGems": "Hidden Gems"
  },
  "essentialGuides": {
    "sectionTitle": "ESSENTIAL GUIDES",
    "learnMore": "Learn more",
    "cards": {
      "generalInfo": "General Info",
      "travelTypes": "Travel Types",
      "visaInfo": "Visa Info",
      "transport": "Transport",
      "accommodation": "Accommodation",
      "foodDining": "Food & Dining",
      "cultureEtiquette": "Culture & Etiquette",
      "budgetTips": "Budget Tips"
    }
  },
  "about": {
    "ourStory": "Our Story",
    "heroTitle1": "Travel Smarter.",
    "heroTitle2": "Explore Deeper.",
    "heroSubtitle": "AsiaBuddy is your intelligent travel companion for Southeast Asia — built for travelers who want to explore confidently, move freely, and experience authentically.",
    "aboutLabel": "About Us",
    "aboutHeading": "We closed the gap between you and Asia.",
    "aboutP1": "We know what it feels like to land in an unfamiliar city without a trusted guide — confused by signage, unsure about transport, overwhelmed by choices. That feeling is exactly what AsiaBuddy was built to eliminate.",
    "aboutP2": "Our platform combines deep local expertise with AI-powered support across culture, transport, dining, accommodation, and budgeting — all in your language, available 24 hours a day.",
    "stat1": "Languages Supported",
    "stat2": "AI Concierge",
    "stat3": "Thai Destinations",
    "stat4": "Free to Use",
    "visionLabel": "Vision & Mission",
    "visionTitle": "Our Vision",
    "visionText": "To become the most trusted travel companion for every traveler arriving in Asia — removing language barriers, simplifying decisions, and turning every journey into a confident, joyful experience.",
    "missionTitle": "Our Mission",
    "missionText": "To deliver free, multilingual, AI-powered travel support that empowers every traveler — regardless of budget or background — to explore Asia safely, intelligently, and unforgettably.",
    "teamLabel": "Our Team",
    "teamText": "We are a passionate team of travelers and technologists based across",
    "teamLocations": "Germany, United Kingdom, Thailand, and Myanmar",
    "teamText2": "— united by one goal: making Asia accessible to everyone.",
    "ctaTitle": "Ready to explore Asia with confidence?",
    "ctaSubtitle": "Join thousands of travelers who trust AsiaBuddy as their companion across Southeast Asia.",
    "ctaButton": "Start Exploring Thailand"
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
    "subtitle": "Thai Culinary Advisor",
    "suggestionsLabel": "Common Food Inquiries",
    "detailsTitle": "Thailand Food Guide",
    "guideLink": "Thailand Food Guide — For more information",
    "modalTitle": "คู่มืออาหารไทย",
    "modalSubtitle": "Local Cuisine & Dining Safety",
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
  },
  "serviceCards": {
    "bookNow": "Book Now",
    "viewFlight": "View Flight",
    "bookTransfer": "Book Transfer",
    "reserveCar": "Reserve Car",
    "getTickets": "Get Tickets",
    "freeCancellation": "Free Cancellation",
    "skipTheLine": "Skip the Line",
    "instantConfirmation": "Instant Confirmation",
    "perNight": "/night",
    "perDay": "/day",
    "perPerson": "/person",
    "priceChecked": "Price checked",
    "minDriverAge": "Minimum driver age"
  },
  "activitiesPage": {
    "breadcrumb": "Home",
    "breadcrumbActivities": "Activities",
    "backTo": "Back to",
    "decorativeLabel": "Experiences",
    "title": "Activities",
    "subtitle": "Discover amazing experiences and book through our trusted partners",
    "statCurated": "✦ Curated Activities",
    "statBestPrices": "✦ Best Prices",
    "statInstantBooking": "✦ Instant Booking",
    "sectionLabel": "Available Experiences",
    "sectionTitle": "Browse Activities",
    "activitiesAvailable": "{count} {count, plural, one {activity} other {activities}} available",
    "emptyStateTitle": "Activities Coming Soon",
    "emptyStateDescription": "We're curating amazing experiences for you. Check back soon!",
    "filterAllCities": "All Cities",
    "filterNoActivities": "No activities found",
    "filterNoActivitiesDescription": "Try selecting a different city or view all activities"
  },
  "servicesStrip": {
    "hotel": "Hotel",
    "flight": "Flight",
    "transfer": "Transfer",
    "tickets": "Tickets",
    "carRental": "Car Rental"
  },
  "servicesPage": {
    "comingSoonTitle": "Coming Soon",
    "comingSoonMessage": "We are working hard to bring you the best travel services.",
    "servicesList": "Hotel • Flight • Tickets • Transfer • Car Rental • Tours",
    "backToHome": "Back to Home",
    "chatNote": "For bookings & inquiries, use our Live Support Chat on the home page."
  },
  "flights": {
    "title": "Flights to Thailand",
    "intro": "Book your flight to Thailand with ease. Most international flights arrive at Suvarnabhumi Airport (BKK) or Don Mueang Airport (DMK) in Bangkok. For the best prices, book 2-3 months in advance and check visa requirements before you travel.",
    "visaLinkText": "Check visa requirements",
    "searchSpecificDates": "Search Specific Dates",
    "flexibleDates": "Flexible Dates — Find Cheapest",
    "continuePlanning": "Continue Planning Your Trip",
    "faq": {
      "title": "Frequently Asked Questions",
      "q1": {
        "question": "How long is a direct flight to Bangkok?",
        "answer": "Direct flights to Bangkok from major Asian hubs typically take 2-4 hours. From Europe, direct flights range from 11-13 hours. From North America, expect 15-20 hours with a stopover."
      },
      "q2": {
        "question": "What airlines fly to Thailand?",
        "answer": "Major international airlines including Thai Airways, Singapore Airlines, Emirates, Qatar Airways, and Cathay Pacific serve Bangkok. Budget carriers like AirAsia and Nok Air also offer regional connections."
      },
      "q3": {
        "question": "Do I need a visa on arrival?",
        "answer": "Visa requirements depend on your nationality. Many countries receive 30-day visa exemption, while others may need to apply in advance. Check our visa guide for the latest requirements."
      },
      "q4": {
        "question": "Which airport should I fly into?",
        "answer": "Suvarnabhumi (BKK) handles most international flights and is connected to the city by Airport Rail Link. Don Mueang (DMK) serves budget airlines and domestic flights, also with good transport connections."
      },
      "q5": {
        "question": "What is the best time to book flights?",
        "answer": "For the best fares, book 2-3 months in advance for peak seasons (December-February). Shoulder seasons (March-May, September-November) often offer better prices and fewer crowds."
      }
    }
  },
  "hotels": {
    "title": "Hotels in Thailand",
    "intro": "Find the perfect place to stay in Thailand. Budget options start around 500-1,000 THB per night for guesthouses, while mid-range hotels range from 1,500-4,000 THB. Popular areas include Sukhumvit in Bangkok for nightlife and shopping, Patong in Phuket for beach access, and the Old City in Chiang Mai for culture. Book in advance during peak season (December-February) for the best rates and availability.",
    "continuePlanning": "Continue Planning Your Trip",
    "faq": {
      "title": "Frequently Asked Questions",
      "q1": {
        "question": "What's the best area to stay in Bangkok?",
        "answer": "Sukhumvit is ideal for nightlife and shopping with easy BTS access. Siam/Pratunam offers family-friendly shopping and markets. Silom/Sathorn is the business district with upscale dining. Riverside provides luxury hotels with cultural sightseeing nearby."
      },
      "q2": {
        "question": "Do I need to book in advance during high season?",
        "answer": "Yes, booking 2-3 months ahead is recommended for peak season (December-February), especially in popular destinations like Phuket, Krabi, and Chiang Mai. Shoulder seasons offer better rates and more availability with shorter booking windows."
      },
      "q3": {
        "question": "Is it safe to book directly vs through an agent?",
        "answer": "Both options are generally safe. Booking directly with hotels can sometimes offer better rates or flexible cancellation. Reputable agents provide bundled deals and local support. Always verify reviews and check cancellation policies regardless of booking method."
      },
      "q4": {
        "question": "What's the typical budget range per night?",
        "answer": "Budget guesthouses and hostels: 500-1,500 THB ($15-45). Mid-range hotels: 1,500-4,000 THB ($45-120). Luxury resorts: 4,000-10,000+ THB ($120-300+). Prices vary significantly by location and season."
      },
      "q5": {
        "question": "Are beachfront hotels worth the extra cost?",
        "answer": "Beachfront properties offer convenience and views but command premium prices. Hotels within walking distance (5-10 minutes) often provide better value. Consider how much time you'll spend at the beach versus exploring other attractions when deciding."
      }
    }
  },
  "tickets": {
    "title": "Tickets & Activities in Thailand",
    "intro": "Book tickets and activities across Thailand with instant confirmation through Klook. From temple tours in Bangkok to island hopping in Phuket, skip the lines and secure your spot in advance. Popular experiences include cultural shows, adventure tours, and attraction passes. Booking ahead guarantees availability and often includes exclusive discounts.",
    "continuePlanning": "Continue Planning Your Trip",
    "faq": {
      "title": "Frequently Asked Questions",
      "q1": {
        "question": "Do I need to book tickets in advance?",
        "answer": "For popular attractions like Grand Palace tours, island hopping trips, and cultural shows, booking 1-2 weeks ahead is recommended, especially during peak season (December-February). This guarantees your spot and often includes skip-the-line access."
      },
      "q2": {
        "question": "Are e-tickets accepted at attractions?",
        "answer": "Yes, most Klook partners accept mobile e-tickets. Simply show your QR code at the entrance. Some attractions may require physical tickets which can be collected at designated counters. Check your booking confirmation for specific instructions."
      },
      "q3": {
        "question": "What if I need to cancel my booking?",
        "answer": "Cancellation policies vary by attraction. Many tickets offer free cancellation up to 24-48 hours before the activity. Always review the cancellation policy before booking. Refunds are typically processed back to your original payment method."
      },
      "q4": {
        "question": "Are there combo tickets for multiple attractions?",
        "answer": "Yes, combo passes are available for popular destinations like Bangkok city tours and island packages. These often provide better value than individual tickets and include transportation between attractions. Look for 'combo' or 'pass' options when browsing."
      },
      "q5": {
        "question": "Is it cheaper to book on-site or online?",
        "answer": "Online booking through Klook is typically 10-30% cheaper than on-site prices. You'll also avoid queues and guarantee availability. Some attractions offer exclusive online discounts and add-ons not available at the gate."
      }
    }
  },
  "activities": {
    "title": "Tours & Activities in Thailand",
    "intro": "Discover curated tours and experiences across Thailand with GetYourGuide. From cooking classes in Chiang Mai to snorkeling adventures in Krabi, explore authentic local activities led by expert guides. Whether you're seeking cultural immersion, outdoor adventures, or hidden gems, find the perfect experience for your journey.",
    "continuePlanning": "Continue Planning Your Trip",
    "faq": {
      "title": "Frequently Asked Questions",
      "q1": {
        "question": "What types of activities are available?",
        "answer": "GetYourGuide offers a wide range including cultural tours, cooking classes, adventure activities like zip-lining and kayaking, day trips to islands, historical site visits, and food tours. Options vary by city and season."
      },
      "q2": {
        "question": "How do I receive my booking confirmation?",
        "answer": "After booking, you'll receive an email confirmation with your voucher. Most activities accept mobile vouchers—simply show your phone at the meeting point. Some tours require printed vouchers, which will be clearly indicated in your confirmation."
      },
      "q3": {
        "question": "What is the cancellation policy?",
        "answer": "Cancellation policies vary by activity. Many tours offer free cancellation up to 24-72 hours before the start time. Always check the specific policy on the activity page before booking. Refunds are processed to your original payment method."
      },
      "q4": {
        "question": "Are tours available in different languages?",
        "answer": "Yes, many tours are offered in multiple languages including English, Chinese, Japanese, Korean, and European languages. Check the activity details for available language options and select your preferred language when booking."
      },
      "q5": {
        "question": "Should I book activities in advance?",
        "answer": "For popular experiences and small-group tours, booking 1-2 weeks ahead is recommended, especially during peak season (November-February). This ensures availability and often includes better pricing. Last-minute bookings may have limited options."
      }
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
  "brand": { "name": "ThaiGuide", "subtitle": "บริการ AsiaBuddy" },
  "home": "หน้าแรก",
  "tours": "ทัวร์",
  "destinations": "สถานที่",
  "tourPackages": "แพ็กเกจทัวร์",
  "travelBlog": "บล็อกการท่องเที่ยว",
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
    "culturalSubtitle": "สิ่งที่ควรทำและไม่ควรทำด้านวัฒนธรรม • ประเพณีท้องถิ่น",
    "bestTime": "Best Time to Visit",
    "goToLocation": "ไปที่ตำแหน่งนี้"
  },
  "infoLink": "สำหรับข้อมูลเพิ่มเติม คลิกที่นี่",
  "exploreThailandEssentials": "สำรวจสิ่งจำเป็นในประเทศไทย",
  "infoModalTitle": "คู่มือสิ่งจำเป็นในประเทศไทย",
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
    "title": "บริการขนส่ง & รถเช่า",
    "detailsTitle": "การเดินทางในประเทศไทย — สำหรับข้อมูลเพิ่มเติม",
    "modalTitle": "คู่มือการเดินทางทั่วประเทศไทย",
    "modalSubtitle": "การเดินทาง",
    "destinationLabel": "จุดหมายปลายทาง",
    "subtitle": "การปรับแต่งการเช่ารถแบบไดนามิก",
    "emptyState": "ระบุเกณฑ์การขนส่งของคุณเพื่อรับเส้นทางการจองที่ปรับแต่งตามความต้องการ",
    "readyToBook": "พร้อมที่จะจัดการการขนส่งหรือยัง?",
    "bookStayButton": "📅 จองยานพาหนะเลย",
    "noneSelected": "ไม่ได้เลือก",
    "suggestions": [],
    "survey": {
      "title": "แบบสอบถามความต้องการเช่ารถ",
      "analyzing": "กำลังวิเคราะห์ความต้องการของคุณเพื่อหาตัวเลือกการเช่ารถที่ดีที่สุด...",
      "buttons": {
        "next": "ขั้นตอนถัดไป",
        "back": "ย้อนกลับ",
        "submit": "ส่งข้อมูล",
        "skip": "ข้าม"
      },
      "questions": {
        "rental_type": {
          "question": "ต้องการบริการเช่ารถประเภทใด?",
          "options": ["ขับเอง (Self-Drive)", "พร้อมคนขับ (With Driver)"]
        },
        "pickup_city": {
          "question": "ต้องการรับรถที่เมืองใด?",
          "options": ["กรุงเทพฯ", "ภูเก็ต", "เชียงใหม่", "พัทยา", "กระบี่", "เกาะสมุย"]
        },
        "duration_days": {
          "question": "ต้องการเช่ารถเป็นเวลาทั้งหมดกี่วัน?",
          "placeholder": "ระบุจำนวนวัน (เช่น 5)"
        },
        "passengers_luggage": {
          "question": "จำนวนผู้โดยสารและกระเป๋าเดินทางทั้งหมด?",
          "options": [
            "ผู้โดยสาร 1-3 ท่าน (กระเป๋าเดินทางขนาดใหญ่ไม่เกิน 2 ใบ)",
            "ผู้โดยสาร 4-5 ท่าน (กระเป๋าเดินทางขนาดใหญ่ 2-3 ใบ)",
            "ผู้โดยสาร 6-9 ท่าน (กระเป๋าเดินทางขนาดใหญ่ 4 ใบขึ้นไป)"
          ]
        },
        "car_class": {
          "question": "รถยนต์ประเภทใดที่เหมาะกับการเดินทางของคุณที่สุด?",
          "options": ["รถเล็กคอมแพ็ค", "รถเก๋งซีดานมาตรฐาน", "รถครอบครัว SUV", "รถเก๋งหรูหรา", "รถตู้ VIP (9 ที่นั่ง)"]
        },
        "self_drive_license": {
          "question": "คุณมีใบอนุญาตขับขี่สากล (IDP) หรือใบขับขี่ไทยที่ยังไม่หมดอายุหรือไม่?",
          "options": ["ใช่ ฉันมี", "ไม่มี"]
        },
        "self_drive_deposit": {
          "question": "คุณยินดีวางเงินมัดจำประกันภัยความเสียหาย (โดยทั่วไปผ่านวงเงินบัตรเครดิต) หรือไม่?",
          "options": ["ใช่ ยินดีมัดจำ", "ไม่สะดวกมัดจำ"]
        },
        "driver_hours": {
          "question": "ระยะเวลาใช้งานคนขับรถต่อวันที่ต้องการคือเท่าใด?",
          "options": [
            "ครึ่งวัน (ไม่เกิน 5 ชั่วโมง)",
            "เต็มวัน (ไม่เกิน 10-12 ชั่วโมง)",
            "เฉพาะบริการรับส่งสนามบิน"
          ]
        },
        "driver_language": {
          "question": "ทักษะภาษาของคนขับรถที่คุณต้องการคือภาษาใด?",
          "options": ["เฉพาะภาษาไทย", "ภาษาอังกฤษขั้นพื้นฐาน & ภาษาไทย", "ภาษาเมียนมา & ภาษาไทย"]
        },
        "addons": {
          "question": "เลือกบริการเสริมเพิ่มเติม (เลือกได้หลายข้อ):",
          "options": ["เบาะนั่งนิรภัยสำหรับเด็ก", "ระบบนำทาง GPS", "ประกันภัยชั้น 1 แบบไม่มีค่าเสียหายส่วนแรก", "ลงทะเบียนคนขับสำรองเพิ่ม"]
        },
        "pickup_date": {
          "question": "โปรดระบุวันที่หรือเดือนที่คุณต้องการรับรถ:",
          "placeholder": "เช่น 15 ตุลาคม หรือ กลางเดือนธันวาคม"
        }
      }
    }
  },
  "vatRefund": {
    "title": "คู่มือการขอคืนภาษี (VAT)",
    "description": "ขั้นต่ำ 2,000 บาท มองหาป้าย คืนภาษี (VAT)",
    "link": "VAT Refund"
  },
  "visa": {
    "title": "Visa info",
    "modalTitle": "คู่มือวีซ่าประเทศไทย",
    "modalSubtitle": "ข้อมูลวีซ่า",
    "description": "Check your status.",
    "link": "ข้อมูลวีซ่า"
  },
  "travelTypes": {
    "title": "Travel types",
    "modalTitle": "คู่มือสไตล์การเดินทาง",
    "modalSubtitle": "สไตล์การเดินทางและเครื่องมือวางแผน",
    "link": "สไตล์การเดินทาง"
  },
  "budget": "เคล็ดลับงบประมาณ",
  "budgetModalTitle": "คู่มืองบประมาณประเทศไทย",
  "budgetSubtitle": "เคล็ดลับการเดินทางที่ชาญฉลาด",
  "learnMore": "เรียนรู้เพิ่มเติม",
  "essentialGuides": {
    "sectionTitle": "คู่มือที่จำเป็น",
    "learnMore": "ดูเพิ่มเติม",
    "cards": {
      "generalInfo": "ข้อมูลทั่วไป",
      "travelTypes": "ประเภทการเดินทาง",
      "visaInfo": "ข้อมูลวีซ่า",
      "transport": "การเดินทาง",
      "accommodation": "ที่พัก",
      "foodDining": "อาหารและการรับประทานอาหาร",
      "cultureEtiquette": "วัฒนธรรมและมารยาท",
      "budgetTips": "เคล็ดลับงบประมาณ"
    }
  },
  "accommodation": {
    title: "ผู้ช่วยจองที่พัก",
    modalTitle: "คู่มือแนะนำที่พักในประเทศไทยอย่างครบถ้วน",
    detailsTitle: "ที่พัก",
    subtitle: "การปรับแต่งการเข้าพักแบบไดนามิก",
    emptyState: "ตอบคำถามด้านล่างเพื่อรับคำแนะนำส่วนบุคคล",
    readyToBook: "พร้อมที่จะจัดการเข้าพักหรือยัง?",
    bookStayButton: "📅 จองที่พักเลย",
    noneSelected: "ไม่ได้เลือก",
    suggestions: [],
    survey: {
      title: "แบบสอบถามความต้องการที่พัก",
      analyzing: "กำลังวิเคราะห์ความต้องการของคุณเพื่อหาที่พักที่สมบูรณ์แบบ...",
      buttons: {
        next: "ขั้นตอนถัดไป",
        back: "ย้อนกลับ",
        submit: "ส่งข้อมูล",
        skip: "ข้าม"
      },
      questions: {
        city: {
          question: "คุณต้องการพักที่เมืองไหน?",
          options: ["กรุงเทพฯ", "ภูเก็ต", "เชียงใหม่", "พัทยา", "กระบี่", "อยุธยา", "เกาะสมุย"]
        },
        nights: {
          question: "คุณต้องการพักทั้งหมดกี่คืน?",
          placeholder: "ระบุจำนวนคืน (เช่น 5)"
        },
        area_general: {
          question: "คุณต้องการพักในพื้นที่แถบไหน?",
          options: ["ใจกลางเมือง / ย่านธุรกิจ", "ริมหาด / ใกล้ทะเล", "เงียบสงบ / ใกล้ชิดธรรมชาติ", "ย่านประวัติศาสตร์ / วัฒนธรรม"]
        },
        budget: {
          question: "งบประมาณต่อคืนของคุณคือเท่าไหร่?",
          options: ["ประหยัด: ต่ำกว่า $30", "ระดับกลาง: $30 - $100", "หรูหรา: $100 - $250", "ระดับซุปเปอร์ลักชัวรี่: $250+"]
        },
        type: {
          question: "คุณชอบที่พักประเภทไหน?",
          options: ["โรงแรม", "รีสอร์ท", "โฮสเทล", "เกสต์เฮ้าส์", "วิลล่า / อพาร์ทเมนท์"]
        },
        stars: {
          question: "คุณต้องการที่พักระดับกี่ดาว?",
          options: ["1-2 ดาว", "3 ดาว", "4 ดาว", "5 ดาว / หรูหรา", "ไม่ระบุเฉพาะเจาะจง"]
        },
        bangkok_vibe: {
          question: "ย่านไหนในกรุงเทพฯ ที่ตรงกับสไตล์ของคุณมากที่สุด?",
          options: [
            "สุขุมวิท (ช้อปปิ้ง & ไนท์ไลฟ์)",
            "สยาม/ประตูน้ำ (ช้อปปิ้งสำหรับครอบครัว & ตลาดนัด)",
            "สีลม/สาทร (ย่านธุรกิจ & ร้านอาหารระดับหรู)",
            "ริมแม่น้ำเจ้าพระยา (หรูหรา & ท่องเที่ยวเชิงวัฒนธรรม)"
          ]
        },
        phuket_beach: {
          question: "คุณชอบประสบการณ์ชายหาดแบบไหนในภูเก็ต?",
          options: [
            "ป่าตอง (ไนท์ไลฟ์ & ชายหาดคึกคัก)",
            "กะตะ / กะรน (เหมาะสำหรับครอบครัว & เล่นเซิร์ฟ)",
            "บางเทา / ลากูน่า (รีสอร์ทหรู & เงียบสงบกว่า)",
            "ตัวเมืองภูเก็ต (วัฒนธรรม & คาเฟ่ - ไม่มีชายหาด)"
          ]
        },
        transit_proximity: {
          question: "การอยู่ใกล้สถานีรถไฟฟ้า BTS หรือ MRT ในระยะเดินได้ มีความสำคัญอย่างไร?",
          options: [
            "ต้องอยู่ในระยะเดินไม่เกิน 5 นาที",
            "มีก็ดี แต่ไม่มีก็ไม่เป็นไร",
            "ไม่สำคัญ (วางแผนใช้รถตู้ส่วนตัวหรือแท็กซี่)"
          ]
        },
        beach_proximity: {
          question: "คุณชอบระยะห่างจากชายหาดแบบไหน?",
          options: [
            "ติดชายหาดโดยตรง (ไม่ต้องข้ามถนน)",
            "ระยะเดินไปชายหาดได้ (ต่ำกว่า 10 นาที)",
            "ไม่ติดเรื่องการขับรถหรือนั่งรถรับส่งไปชายหาด"
          ]
        },
        airport_pickup: {
          question: "ต้องการให้เราจัดเตรียมรถรับส่งส่วนตัวจากสนามบินไปยังที่พักหรือไม่?",
          options: [
            "ใช่ โปรดเสนอราคารถยนต์ส่วนตัว/รถตู้",
            "ไม่ ฉันจะจัดการเดินทางด้วยแท็กซี่/Grab เอง"
          ]
        },
        guests: {
          question: "มีผู้เดินทางทั้งหมดกี่ท่าน?",
          placeholder: "ระบุจำนวนผู้เดินทาง (เช่น ผู้ใหญ่ 2 เด็ก 1)"
        },
        room_type: {
          question: "ห้องพักประเภทไหนที่เหมาะกับคุณที่สุด?",
          options: ["ห้องมาตรฐาน / ทั่วไป", "ห้องดีลักซ์ / ซูพีเรีย", "ห้องสวีท", "ห้องครอบครัว", "เตียงในห้องพักรวม"]
        },
        amenities: {
          question: "เลือกสิ่งอำนวยความสะดวกที่ต้องการ (เลือกได้หลายข้อ):",
          options: ["ฟรี Wi-Fi", "สระว่ายน้ำ", "ฟิตเนส", "เครื่องปรับอากาศ", "รวมอาหารเช้า", "สปาและบริการนวด"]
        },
        checkin_date: {
          question: "โปรดระบุวันที่หรือเดือนที่คุณคาดว่าจะเช็คอิน:",
          placeholder: "เช่น 15 ตุลาคม หรือ กลางเดือนธันวาคม"
        }
      }
    }
  },
  "carRental": {
    title: "ผู้ช่วยเช่ารถ",
    modalTitle: "คู่มือแนะนำการเช่ารถในประเทศไทยอย่างครบถ้วน",
    detailsTitle: "การเช่ารถ",
    subtitle: "การปรับแต่งการเช่ารถแบบไดนามิก",
    emptyState: "ตอบคำถามด้านล่างเพื่อรับคำแนะนำส่วนบุคคล",
    readyToBook: "พร้อมที่จะจัดการเข้าพักหรือยัง?",
    bookStayButton: "🚗 จองรถเช่าเลย",
    noneSelected: "ไม่ได้เลือก",
    suggestions: [],
    survey: {
      title: "แบบสอบถามความต้องการการเช่ารถ",
      analyzing: "กำลังวิเคราะห์ความต้องการของคุณเพื่อหารถเช่าที่เหมาะสม...",
      buttons: {
        next: "ขั้นตอนถัดไป",
        back: "ย้อนกลับ",
        submit: "ส่งข้อมูล",
        skip: "ข้าม"
      },
      questions: {
        rental_type: {
          question: "คุณต้องการขับรถเองหรือจ้างคนขับ?",
          options: ["ขับเอง (Self-Drive)", "มีคนขับ (With Driver)"]
        },
        pickup_location: {
          question: "คุณต้องการรับรถที่ไหน?",
          placeholder: "ระบุสถานที่รับรถ (เช่น สนามบินสุวรรณภูมิ, ใจกลางกรุงเทพฯ)"
        },
        dropoff_location: {
          question: "คุณต้องการคืนรถที่ไหน?",
          placeholder: "ระบุสถานที่คืนรถ (เช่น สนามบินภูเก็ต, โรงแรม)"
        },
        rental_dates: {
          question: "วันที่เช่ารถของคุณคือเมื่อไหร่?",
          placeholder: "ระบุวันที่ (เช่น 15-20 ธันวาคม 2026)"
        },
        vehicle_type: {
          question: "คุณต้องการประเภทรถแบบไหน?",
          options: ["รถเศรษฐกิจ (Economy)", "SUV / 4WD", "รถหรูหรา (Luxury)", "รถตู้ / มินิบัส (Van)"]
        },
        driver_age: {
          question: "อายุของคนขับหลักคือเท่าไหร่?",
          placeholder: "ระบุอายุคนขับ (เช่น 30)"
        },
        driver_license: {
          question: "คุณมีใบอนุญาตขับขี่ระหว่างประเทศหรือไม่?",
          options: ["ใช่ ฉันมี IDP", "ไม่ ฉันมีเพียงใบอนุญาตท้องถิ่น", "ฉันต้องการความช่วยเหลือเรื่องนี้"]
        },
        driver_language: {
          question: "คนขับควรพูดภาษาอะไร? (เลือกได้หลายข้อ)",
          options: ["ภาษาอังกฤษ", "ภาษาไทย", "ภาษาจีน", "ภาษาญี่ปุ่น", "ภาษาเกาหลี"]
        },
        additional_services: {
          question: "เลือกบริการเสริมที่ต้องการ (เลือกได้หลายข้อ):",
          options: ["GPS Navigation", "เบาะนั่งเด็ก", "ประกันครอบคลุมทั้งหมด", "รับส่งสนามบิน", "สนับสนุน 24/7"]
        },
        budget: {
          question: "งบประมาณต่อวันของคุณคือเท่าไหร่?",
          options: ["ประหยัด: ต่ำกว่า $30/วัน", "ระดับกลาง: $30 - $80/วัน", "หรูหรา: $80 - $150/วัน", "พรีเมียม: $150+/วัน"]
        },
        special_requests: {
          question: "มีความต้องการพิเศษอื่นๆ หรือไม่?",
          placeholder: "ระบุความต้องการพิเศษ (เช่น คนขับมังสวิรัติ, เส้นทางเฉพาะ)"
        }
      }
    }
  },
  "tripPlanner": {
    header: "ผู้วางแผนทริปอัตโนมัติ",
    subHeader: "มาวางแผนทริปประเทศไทยที่สมบูรณ์แบบของคุณทีละขั้นตอนกันเถอะ",
    q1: "คุณสนใจจุดหมายปลายทางใดบ้าง? (เช่น กรุงเทพฯ ภูเก็ต เชียงใหม่)",
    q2: "ทริปของคุณจะใช้เวลานานเท่าไหร่? (เช่น 5 วัน 4 คืน)",
    q3: "มีผู้เดินทางกี่คน?",
    adults: "ผู้ใหญ่",
    infants: "เด็กเล็ก",
    q4: "คุณชอบที่พักแบบไหน?",
    accOptions: ["โรงแรม", "เกสต์เฮาส์", "โฮสเทล", "ไม่มีความชอบเฉพาะ"],
    q5: "งบประมาณของคุณอยู่ระดับใด?",
    budgetOptions: ["ประหยัด", "ปานกลาง", "หรูหรา"],
    q6: "ความสนใจหลักของคุณคืออะไร?",
    interestOptions: ["วัฒนธรรม/วัด", "ชายหาด/เกาะ", "ช้อปปิ้ง", "อาหาร", "การผจญภัย"],
    q7: "มีความต้องการพิเศษหรือไม่? (เช่น อาหารฮาลาล การเข้าถึงสำหรับรถเข็น เดินทางพร้อมสัตว์เลี้ยง)",
    next: "ถัดไป",
    submit: "สร้างแผนการเดินทาง",
    restart: "เริ่มใหม่",
    generating: "กำลังสร้างแผนการเดินทางเฉพาะบุคคลของคุณ..."
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
    "travelerTips": "เคล็ดลับการเดินทาง",
    "phrasesChatIntro": "ถามอะไรก็ได้เกี่ยวกับวลีภาษาไทยและภาษา",
    "phrasesFooter": "คำแปลและเสียงอ่านโดย AsiaBuddy AI",
    "laws": "Key Laws",
    "etiquette": "Etiquette",
    "weather": "Weather Info",
    "serviceMinded": "Service Minded Help",
    "learnThaiBasics": "เรียนรู้ภาษาไทยเบื้องต้น",
    "phrasesChat": {
      "placeholder": "ถามวลีภาษาไทยที่คุณต้องการรู้...",
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
    "safe": "Safe travels!",
    "bookNow": "จองเลย",
    "bookNowSubtitle": "เชื่อมต่อกับเจ้าหน้าที่มนุษย์",
    "action": "จองเลย",
    "aiBusyFallback": "ผู้ช่วย AI ของเราชั่วคราวไม่ว่าง แตะ 'จองเลย' เพื่อแชทกับทีมงานของเราโดยตรง",
    "bookNowCta": "จองเลย",
    "surveyProgressLabel": "ความคืบหน้าของแบบสอบถาม",
    "resetChatTitle": "รีเซ็ตแชท",
    "resetButtonLabel": "รีเซ็ต"
  },
  "destinationTabs": {
    "mustVisit": "สถานที่ต้องไป",
    "dining": "ร้านอาหาร",
    "experiences": "ประสบการณ์",
    "activities": "กิจกรรม",
    "hiddenGems": "สถานที่ซ่อนเร้น"
  },
  "about": {
    "ourStory": "เรื่องราวของเรา",
    "heroTitle1": "เดินทางอย่างชาญฉลาดกว่าที่เคย",
    "heroTitle2": "ออกสำรวจให้ลึกซึ้งยิ่งขึ้น",
    "heroSubtitle": "AsiaBuddy คือเพื่อนเดินทางอัจฉริยะในเอเชียตะวันออกเฉียงใต้ของคุณ — สร้างขึ้นสำหรับนักเดินทางที่ต้องการสำรวจอย่างมั่นใจ เคลื่อนที่ได้อย่างอิสระ และสัมผัสประสบการณ์ท้องถิ่นอย่างแท้จริง",
    "aboutLabel": "เกี่ยวกับเรา",
    "aboutHeading": "เราเชื่อมช่องว่างระหว่างคุณกับเอเชียให้ใกล้กันยิ่งขึ้น",
    "aboutP1": "เรารู้ดีว่าความรู้สึกในการไปถึงเมืองที่ไม่คุ้นเคยโดยไม่มีไกด์ที่ไว้วางใจได้นั้นเป็นอย่างไร — ทั้งสับสนกับป้ายบอกทาง ไม่มั่นใจเรื่องการเดินทาง และลายตาความกับตัวเลือกมากมาย ความรู้สึกเหล่านั้นคือสิ่งที่ AsiaBuddy ถูกสร้างขึ้นมาเพื่อขจัดให้หมดไป",
    "aboutP2": "แพลตฟอร์มของเราผสมผสานความเชี่ยวชาญในท้องถิ่นที่ลึกซึ้งเข้ากับระบบช่วยเหลือที่ขับเคลื่อนด้วย AI ครอบคลุมทั้งเรื่องวัฒนธรรม การเดินทาง การรับประทานอาหาร ที่พัก และการบริหารงบประมาณ — ทั้งหมดนี้พร้อมให้บริการในภาษาของคุณ ตลอด 24 ชั่วโมง",
    "stat1": "ภาษาที่รองรับ",
    "stat2": "ผู้ช่วยส่วนตัว AI",
    "stat3": "จุดหมายปลายทางในไทย",
    "stat4": "ใช้งานฟรี",
    "visionLabel": "วิสัยทัศน์และพันธกิจ",
    "visionTitle": "วิสัยทัศน์ของเรา",
    "visionText": "มุ่งสู่การเป็นเพื่อนเดินทางที่ได้รับความไว้วางใจมากที่สุดสำหรับนักเดินทางทุกคนที่มาเยือนเอเชีย — ทลายกำแพงทางภาษา ช่วยให้การตัดสินใจง่ายขึ้น และเปลี่ยนทุกการเดินทางให้เป็นประสบการณ์ที่เต็มไปด้วยความมั่นใจและความสุข",
    "missionTitle": "พันธกิจของเรา",
    "missionText": "ส่งมอบระบบช่วยเหลือการเดินทางด้วย AI หลายภาษาที่ให้บริการฟรี เพื่อช่วยให้เพื่อนร่วมทางทุกคน — ไม่ว่าจะงบประมาณเท่าใดหรือมีภูมิหลังอย่างไร — สามารถออกสำรวจเอเชียได้อย่างปลอดภัย ชาญฉลาด และน่าจดจำ",
    "teamLabel": "ทีมงานของเรา",
    "teamText": "พวกเราคือทีมงานที่เต็มเปี่ยมไปด้วยความหลงใหลในเทคโนโลยีและการเดินทาง ซึ่งประจำการอยู่ทั่ว",
    "teamLocations": "เยอรมนี สหราชอาณาจักร ไทย และเมียนมา",
    "teamText2": "โดยมีเป้าหมายร่วมกันเพียงหนึ่งเดียว คือการทำให้ทุกคนสามารถเข้าถึงเอเชียได้อย่างง่ายดาย",
    "ctaTitle": "พร้อมที่จะออกสำรวจเอเชียด้วยความมั่นใจแล้วหรือยัง?",
    "ctaSubtitle": "ร่วมเป็นส่วนหนึ่งกับนักเดินทางนับพันที่ไว้วางใจให้ AsiaBuddy เป็นเพื่อนคู่ใจทั่วเอเชียตะวันออกเฉียงใต้",
    "ctaButton": "เริ่มสำรวจประเทศไทย"
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
    "subtitle": "ที่ปรึกษาอาหารไทย",
    "suggestionsLabel": "Common Food Inquiries",
    "detailsTitle": "Thailand Food Guide",
    "guideLink": "คู่มืออาหารไทย สำหรับข้อมูลเพิ่มเติม",
    "modalTitle": "Food Guide",
    "modalSubtitle": "อาหารท้องถิ่นและความปลอดภัยด้านอาหาร",
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
  },
  "serviceCards": {
    "bookNow": "จองเลย",
    "viewFlight": "ดูเที่ยวบิน",
    "bookTransfer": "จองการเดินทาง",
    "reserveCar": "จองรถ",
    "getTickets": "รับตั๋ว",
    "freeCancellation": "ยกเลิกฟรี",
    "skipTheLine": "ไม่ต้องต่อคิว",
    "instantConfirmation": "ยืนยันทันที",
    "perNight": "/คืน",
    "perDay": "/วัน",
    "perPerson": "/คน",
    "priceChecked": "ตรวจสอบราคา",
    "minDriverAge": "อายุคนขับขั้นต่ำ"
  },
  "activitiesPage": {
    "breadcrumb": "หน้าแรก",
    "breadcrumbActivities": "กิจกรรม",
    "backTo": "กลับไปยัง",
    "decorativeLabel": "ประสบการณ์",
    "title": "กิจกรรม",
    "subtitle": "ค้นพบประสบการณ์ที่น่าทึ่งและจองผ่านพาร์ทเนอร์ที่เชื่อถือได้ของเรา",
    "statCurated": "✦ กิจกรรมที่คัดสรรมาแล้ว",
    "statBestPrices": "✦ ราคาดีที่สุด",
    "statInstantBooking": "✦ จองทันที",
    "sectionLabel": "ประสบการณ์ที่มีให้",
    "sectionTitle": "เรียกดูกิจกรรม",
    "activitiesAvailable": "{count} กิจกรรมที่มีให้",
    "emptyStateTitle": "กิจกรรมเร็วๆ นี้",
    "emptyStateDescription": "เรากำลังคัดสรรประสบการณ์ที่น่าทึ่งสำหรับคุณ ติดตามข่าวสารเพิ่มเติมเร็วๆ นี้!",
    "filterAllCities": "ทุกเมือง",
    "filterNoActivities": "ไม่พบกิจกรรม",
    "filterNoActivitiesDescription": "ลองเลือกเมืองอื่นหรือดูกิจกรรมทั้งหมด"
  },
  "servicesStrip": {
    "hotel": "โรงแรม",
    "flight": "เที่ยวบิน",
    "transfer": "การเดินทาง",
    "tickets": "ตั๋ว",
    "carRental": "เช่ารถ"
  },
  "servicesPage": {
    "comingSoonTitle": "เร็วๆ นี้",
    "comingSoonMessage": "เรากำลังทำงานอย่างหนักเพื่อนำบริการการเดินทางที่ดีที่สุดมาสู่คุณ",
    "servicesList": "โรงแรม • เที่ยวบิน • ตั๋ว • การเดินทาง • เช่ารถ • ทัวร์",
    "backToHome": "กลับไปหน้าแรก",
    "chatNote": "สำหรับการจองและสอบถาม ให้ใช้แชทสนับสนุนสดของเราบนหน้าแรก"
  },
  "flights": {
    "title": "เที่ยวบินไปประเทศไทย",
    "intro": "จองเที่ยวบินไปประเทศไทยได้อย่างง่ายดาย เที่ยวบินสายการบินระหว่างประเทศส่วนใหญ่มาถึงที่ท่าอากาศยานสุวรรณภูมิ (BKK) หรือท่าอากาศยานดอนเมือง (DMK) ในกรุงเทพฯ สำหรับราคาที่ดีที่สุด ควรจองล่วงหน้า 2-3 เดือน และตรวจสอบข้อกำหนดวีซ่าก่อนเดินทาง",
    "visaLinkText": "ตรวจสอบข้อกำหนดวีซ่า",
    "searchSpecificDates": "ค้นหาวันที่เฉพาะเจาะจง",
    "flexibleDates": "วันที่ยืดหยุ่น — ค้นหาราคาถูกที่สุด",
    "continuePlanning": "วางแผนการเดินทางต่อ",
    "faq": {
      "title": "คำถามที่พบบ่อย",
      "q1": {
        "question": "เที่ยวบินตรงไปกรุงเทพฯ ใช้เวลานานเท่าไหร่?",
        "answer": "เที่ยวบินตรงไปกรุงเทพฯ จากฮับสำคัญในเอเชียใช้เวลาประมาณ 2-4 ชั่วโมง จากยุโรปใช้เวลา 11-13 ชั่วโมง จากอเมริกาเหนือคาดว่าใช้เวลา 15-20 ชั่วโมงพร้อมการแวะพัก"
      },
      "q2": {
        "question": "สายการบินไหนบินไปประเทศไทยบ้าง?",
        "answer": "สายการบินระหว่างประเทศหลักๆ เช่น การบินไทย สิงคโปร์แอร์ไลน์์ เอมิเรตส์ คาตาร์แอร์เวย์ และแคธเปย์แปซิฟิก ให้บริการที่กรุงเทพฯ สายการบินต้นทุนต่ำเช่น แอร์เอเชียและนกแอร์ก็มีเส้นทางภูมิภาค"
      },
      "q3": {
        "question": "ฉันต้องการวีซ่าเมื่อมาถึงหรือไม่?",
        "answer": "ข้อกำหนดวีซ่าขึ้นอยู่กับสัญชาติของคุณ หลายประเทศได้รับการยกเว้นวีซ่า 30 วัน ในขณะที่บางประเทศอาจต้องสมัครล่วงหน้า ตรวจสอบคู่มือวีซ่าของเราสำหรับข้อกำหนดล่าสุด"
      },
      "q4": {
        "question": "ฉันควรบินไปที่สนามบินไหน?",
        "answer": "สุวรรณภูมิ (BKK) รองรับเที่ยวบินระหว่างประเทศส่วนใหญ่และเชื่อมต่อกับเมืองด้วย Airport Rail Link ดอนเมือง (DMK) ให้บริการสายการบินต้นทุนต่ำและเที่ยวบินภายในประเทศ พร้อมการเชื่อมต่อการเดินทางที่ดี"
      },
      "q5": {
        "question": "เวลาไหนที่ดีที่สุดในการจองเที่ยวบิน?",
        "answer": "สำหรับราคาที่ดีที่สุด จองล่วงหน้า 2-3 เดือนสำหรับฤดูกาลหนาแน่น (ธันวาคม-กุมภาพันธ์) ฤดูกาลปานกลาง (มีนาคม-พฤษภาคม, กันยายน-พฤศจิกายน) มักมีราคาที่ดีกว่าและคนน้อยกว่า"
      }
    }
  },
  "hotels": {
    "title": "โรงแรมในประเทศไทย",
    "intro": "ค้นหาที่พักที่เหมาะสมที่สุดในประเทศไทย ตัวเลือกราคาประหยัดเริ่มต้นที่ประมาณ 500-1,000 บาทต่อคืนสำหรับเกสต์เฮาส์ ส่วนโรงแรมระดับกลางอยู่ที่ 1,500-4,000 บาท พื้นที่ยอดนิยมได้แก่ สุขุมวิทในกรุงเทพฯ สำหรับชีวิตกลางคืนและการช้อปปิ้ง ป่าตองในภูเก็ตสำหรับการเข้าถึงชายหาด และเมืองเก่าในเชียงใหม่สำหรับวัฒนธรรม ควรจองล่วงหน้าในฤดูกาลหนาแน่น (ธันวาคม-กุมภาพันธ์) เพื่อรับราคาที่ดีที่สุดและห้องว่าง",
    "continuePlanning": "วางแผนการเดินทางต่อ",
    "faq": {
      "title": "คำถามที่พบบ่อย",
      "q1": {
        "question": "พื้นที่ไหนดีที่สุดสำหรับเข้าพักในกรุงเทพฯ?",
        "answer": "สุขุมวิทเหมาะสำหรับชีวิตกลางคืนและการช้อปปิ้งพร้อมการเข้าถึง BTS ง่าย สยาม/ประตูน้ำเสนอการช้อปปิ้งเป็นครอบครัวและตลาด สีลม/สาทรเป็นย่านธุรกิจที่มีร้านอาหารระดับสูง ริมฝั่งแม่น้ำมีโรงแรมหรูหราพร้อมแหล่งท่องเที่ยวทางวัฒนธรรมใกล้เคียง"
      },
      "q2": {
        "question": "ฉันต้องจองล่วงหน้าในฤดูกาลหนาแน่นหรือไม่?",
        "answer": "ใช่ การจองล่วงหน้า 2-3 เดือนแนะนำสำหรับฤดูกาลหนาแน่น (ธันวาคม-กุมภาพันธ์) โดยเฉพาะในจุดหมายปลายทางยอดนิยมเช่น ภูเก็ต กระบี่ และเชียงใหม่ ฤดูกาลปานกลางมักมีราคาดีกว่าและห้องว่างมากขึ้นพร้อมระยะเวลาจองที่สั้นลง"
      },
      "q3": {
        "question": "การจองโดยตรงกับโรงแรมปลอดภัยหรือไม่เมื่อเทียบกับตัวแทน?",
        "answer": "ทั้งสองตัวเลือกโดยทั่วไปปลอดภัย การจองโดยตรงกับโรงแรมบางครั้งอาจมีราคาดีกว่าหรือการยกเลิกที่ยืดหยุ่น ตัวแทนที่เชื่อถือได้มอบแพ็กเกจและการสนับสนุนในพื้นที่ ตรวจสอบรีวิวและนโยบายการยกเลิกเสมอไม่ว่าจะจองวิธีใด"
      },
      "q4": {
        "question": "งบประมาณต่อคืนโดยทั่วไปอยู่ที่เท่าไหร่?",
        "answer": "เกสต์เฮาส์และโฮสเทลราคาประหยัด: 500-1,500 บาท ($15-45) โรงแรมระดับกลาง: 1,500-4,000 บาท ($45-120) รีสอร์ทหรูหรา: 4,000-10,000+ บาท ($120-300+) ราคาแตกต่างอย่างมากตามสถานที่และฤดูกาล"
      },
      "q5": {
        "question": "โรงแรมริมชายหาดคุ้มค่ากับราคาที่สูงขึ้นหรือไม่?",
        "answer": "ที่พักริมชายหาดเสนอความสะดวกสบายและวิวแต่มีราคาพรีเมียม โรงแรมที่อยู่ในระยะเดินถึง (5-10 นาที) มักให้คุณค่าที่ดีกว่า พิจารณาเวลาที่คุณจะใช้ที่ชายหาดเทียบกับการสำรวจสถานที่ท่องเที่ยวอื่นเมื่อตัดสินใจ"
      }
    }
  },
  "tickets": {
    "title": "ตั๋วและกิจกรรมในประเทศไทย",
    "intro": "จองตั๋วและกิจกรรมทั่วประเทศไทยพร้อมการยืนยันทันทีผ่าน Klook จากทัวร์วัดในกรุงเทพฯ ไปจนถึงการเที่ยวเกาะในภูเก็ต เลี่ยงคิวและจองที่นั่งล่วงหน้า ประสบการณ์ยอดนิยมได้แก่ การแสดงวัฒนธรรม ทัวร์ผจญภัย และบัตรผ่านสถานที่ท่องเที่ยว การจองล่วงหน้ารับประกันห้องว่างและมักมีส่วนลดพิเศษ",
    "continuePlanning": "วางแผนการเดินทางต่อ",
    "faq": {
      "title": "คำถามที่พบบ่อย",
      "q1": {
        "question": "ฉันต้องจองตั๋วล่วงหน้าหรือไม่?",
        "answer": "สำหรับสถานที่ท่องเที่ยวยอดนิยมเช่น ทัวร์วัดพระเก้า ทัวร์เกาะ และการแสดงวัฒนธรรม แนะนำให้จองล่วงหน้า 1-2 สัปดาห์ โดยเฉพาะในฤดูกาลหนาแน่น (ธันวาคม-กุมภาพันธ์) นี่รับประกันที่นั่งของคุณและมักรวมการเข้าแบบไม่ต้องคิว"
      },
      "q2": {
        "question": "อี-ตั๋วได้รับการยอมรับที่สถานที่ท่องเที่ยวหรือไม่?",
        "answer": "ใช่ พาร์ทเนอร์ Klook ส่วนใหญ่ยอมรับอี-ตั๋วมือถือ เพียงแสดง QR code ของคุณที่ทางเข้า สถานที่บางแห่งอาจต้องการตั๋วจริงซึ่งสามารถรับได้ที่เคาน์เตอร์ที่กำหนด ตรวจสอบการยืนยันการจองของคุณสำหรับคำแนะนำเฉพาะ"
      },
      "q3": {
        "question": "ถ้าฉันต้องการยกเลิกการจองของฉันจะทำอย่างไร?",
        "answer": "นโยบายการยกเลิกแตกต่างกันไปตามสถานที่ท่องเที่ยว ตั๋วหลายใบเสนอการยกเลิกฟรีถึง 24-48 ชั่วโมงก่อนกิจกรรม ตรวจสอบนโยบายการยกเลิกเสมอก่อนจอง การคืนเงินมักดำเนินการกลับไปยังวิธีการชำระเงินเดิมของคุณ"
      },
      "q4": {
        "question": "มีตั๋วคอมโบสำหรับสถานที่ท่องเที่ยวหลายแห่งหรือไม่?",
        "answer": "ใช่ บัตรผ่านคอมโบมีให้สำหรับจุดหมายปลายทางยอดนิยมเช่น ทัวร์เมืองกรุงเทพฯ และแพ็กเกจเกาะ เหล่านี้มักให้คุณค่าที่ดีกว่าตั๋วแยกและรวมการเดินทางระหว่างสถานที่ท่องเที่ยว มองหาตัวเลือก 'คอมโบ' หรือ 'ผ่าน' เมื่อเรียกดู"
      },
      "q5": {
        "question": "จองที่สถานที่หรือออนไลน์ถูกกว่ากัน?",
        "answer": "การจองออนไลน์ผ่าน Klook โดยทั่วไปถูกกว่าราคาที่สถานที่ 10-30% คุณจะหลีกเลี่ยงคิวและรับประกันห้องว่าง สถานที่ท่องเที่ยวบางแห่งเสนอส่วนลดออนไลน์พิเศษและสิ่งเพิ่มเติมที่ไม่มีที่ประตู"
      }
    }
  },
  "activities": {
    "title": "ทัวร์และกิจกรรมในประเทศไทย",
    "intro": "ค้นพบทัวร์และประสบการณ์ที่คัดสรรทั่วประเทศไทยกับ GetYourGuide จากคลาสทำอาหารในเชียงใหม่ไปจนถึงการผจญภัยดำน้ำตื้นในกระบี่ สำรวจกิจกรรมท้องถิ่นแท้จริงที่นำโดยไกด์ผู้เชี่ยวชาญ ไม่ว่าคุณกำลังมองหาการดื่มด่ำทางวัฒนธรรม การผจญภัยกลางแจ้ง หรือสถานที่ลับ ค้นหาประสบการณ์ที่เหมาะสมสำหรับการเดินทางของคุณ",
    "continuePlanning": "วางแผนการเดินทางต่อ",
    "faq": {
      "title": "คำถามที่พบบ่อย",
      "q1": {
        "question": "มีกิจกรรมประเภทใดบ้าง?",
        "answer": "GetYourGuide นำเสนอหลากหลายประเภทรวมถึงทัวร์วัฒนธรรม คลาสทำอาหาร กิจกรรมผจญภัยเช่น ไซด์ไลน์และคายัค ทัวร์วันเดินทางไปเกาะ เยี่ยมชมสถานที่ทางมรดก และทัวร์อาหาร ตัวเลือกแตกต่างกันไปตามเมืองและฤดูกาล"
      },
      "q2": {
        "question": "ฉันจะได้รับการยืนยันการจองอย่างไร?",
        "answer": "หลังจากจอง คุณจะได้รับอีเมลยืนยันพร้อมวอชเชอร์ กิจกรรมส่วนใหญ่ยอมรับวอชเชอร์มือถือ เพียงแสดงโทรศัพท์ของคุณที่จุดนัดพบ ทัวร์บางรายการอาจต้องการวอชเชอร์พิมพ์ ซึ่งจะระบุไว้อย่างชัดเจนในการยืนยันของคุณ"
      },
      "q3": {
        "question": "นโยบายการยกเลิกคืออะไร?",
        "answer": "นโยบายการยกเลิกแตกต่างกันไปตามกิจกรรม ทัวร์หลายรายการเสนอการยกเลิกฟรีถึง 24-72 ชั่วโมงก่อนเวลาเริ่ม ตรวจสอบนโยบายเฉพาะในหน้ากิจกรรมเสมอก่อนจอง การคืนเงินจะดำเนินการไปยังวิธีการชำระเงินเดิมของคุณ"
      },
      "q4": {
        "question": "มีทัวร์ในภาษาต่างๆ หรือไม่?",
        "answer": "ใช่ ทัวร์หลายรายการนำเสนอในหลายภาษารวมถึงภาษาอังกฤษ จีน ญี่ปุ่น เกาหลี และภาษายุโรป ตรวจสอบรายละเอียดกิจกรรมสำหรับตัวเลือกภาษาที่มีและเลือกภาษาที่ต้องการเมื่อจอง"
      },
      "q5": {
        "question": "ฉันควรจองกิจกรรมล่วงหน้าหรือไม่?",
        "answer": "สำหรับประสบการณ์ยอดนิยมและทัวร์กลุ่มเล็ก แนะนำให้จองล่วงหน้า 1-2 สัปดาห์ โดยเฉพาะในฤดูกาลหนาแน่น (พฤศจิกายน-กุมภาพันธ์) นี่รับประกันความพร้อมและมักรวมราคาที่ดีกว่า การจองในนาทีสุดท้ายอาจมีตัวเลือกจำกัด"
      }
    }
  }
},
  MM: {
  "brand": { "name": "ThaiGuide", "subtitle": "AsiaBuddy ဝန်ဆောင်မှုများ" },
  "home": "ပင်မ",
  "tours": "ခရီးစဉ်များ",
  "destinations": "တည်နေရာများ",
  "tourPackages": "ခရီးစဉ် ပက်ကေ့ချ်",
  "travelBlog": "ခရီးသွား ဘလော့ဂ်",
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
    "culturalSubtitle": "ယဉ်ကျေးမှု ဆိုင်ရာ လုပ်သင့်တာနှင့် မလုပ်သင့်တာများ • ဒေသခံ ဓလေ့ထုံးစဉ်များ",
    "bestTime": "Best Time to Visit",
    "goToLocation": "တည်နေရာသို့သွားပါ"
  },
  "infoLink": "ပိုမိုသိရှိလိုပါက ဤနေရာကိုနှိပ်ပါ",
  "exploreThailandEssentials": "ထိုင်းနိုင်ငံ၏ အခြေခံလိုအပ်ချက်များကို ရှာဖွေပါ",
  "infoModalTitle": "ထိုင်းနိုင်ငံ အခြေခံလိုအပ်ချက်များ လမ်းညွှန်",
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
    "title": "သယ်ယူပို့ဆောင်ရေးနှင့် ကားအငှား",
    "detailsTitle": "ထိုင်းနိုင်ငံတွင် သယ်ယူပို့ဆောင်ရေး — နောက်ထပ်အချက်အလက်အတွက်",
    "modalTitle": "ထိုင်းနိုင်ငံ တစ်နိုင်ငံလုံး သယ်ယူပို့ဆောင်ရေး လမ်းညွှန်",
    "modalSubtitle": "သယ်ယူပို့ဆောင်ရေး",
    "destinationLabel": "ခရီးစဉ်",
    "subtitle": "ဒိုင်နမစ် ကားငှား စိတ်ကြိုက်ပြုပြင်ခြင်း",
    "emptyState": "စိတ်ကြိုက်အချက်အလက်များရရှိရန် သင့်လိုအပ်သော သယ်ယူရေးစံနှန့်များကို ရေးသားပါ",
    "readyToBook": "သယ်ယူရေး စီစဉ်မှုများ လုပ်ဆောင်ရန် အသင့်ဖြစ်ပြီလား?",
    "bookStayButton": "📅 ယာဉ်ယူရေး ဘွတ်ကင်လုပ်ပါ",
    "noneSelected": "မရွေးချယ်ထားပါ",
    "suggestions": [],
    "survey": {
      "title": "ကားအငှားဆိုင်ရာ လိုလားချက်များစစ်တမ်း",
      "analyzing": "အကောင်းဆုံးသော ကားအငှားအစီအစဉ်များအား ပြင်ဆင်ရန် ဆန်းစစ်နေပါသည်...",
      "buttons": {
        "next": "နောက်တစ်ဆင့်",
        "back": "နောက်ပြန်",
        "submit": "ပေးပို့မည်",
        "skip": "ကျော်မည်"
      },
      "questions": {
        "rental_type": {
          "question": "မည်သည့်အငှားစနစ်ကို အသုံးပြုလိုပါသလဲ။",
          "options": ["ကိုယ်တိုင်မောင်း (Self-Drive)", "ဒရိုင်ဘာနှင့်တကွ (With Driver)"]
        },
        "pickup_city": {
          "question": "မည်သည့်မြို့တွင် ကားစတင်ငှားရမ်းလိုပါသလဲ။",
          "options": ["ဘန်ကောက်", "ဖူးခက်", "ချင်းမိုင်", "ပတ္တရား", "ကရာဘီ", "ကိုစမွေ"]
        },
        "duration_days": {
          "question": "ရက်ပေါင်းမည်မျှ ငှားရမ်းလိုပါသလဲ။",
          "placeholder": "ငှားရမ်းမည့်ရက်ဦးရေ ထည့်ပါ (ဥပမာ- ၅)"
        },
        "passengers_luggage": {
          "question": "ခရီးသည်ဦးရေနှင့် အိတ်အရေအတွက် မည်မျှရှိပါသလဲ။",
          "options": [
            "ခရီးသည် ၁-၃ ဦး (အိတ်အသေး ၂ လုံးအောက်)",
            "ခရီးသည် ၄-၅ ဦး (အိတ်ကြီး ၂-၃ လုံး)",
            "ခရီးသည် ၆-၉ ဦး (အိတ်ကြီး ၄ လုံးနှင့်အထက်)"
          ]
        },
        "car_class": {
          "question": "မည်သည့်ကားအမျိုးအစားကို ပိုနှစ်သက်ပါသလဲ။",
          "options": ["Compact (စီးတီးကားအသေး)", "Sedan (ရိုးရိုးကား)", "Family SUV (မိသားစုစီးကားမြင့်)", "Luxury Sedan (ဇိမ်ခံကား)", "VIP Van (၉ ဦးစီးဗန်ကားကြီး)"]
        },
        "self_drive_license": {
          "question": "နိုင်ငံတကာမောင်းနှင်ခွင့်လိုင်စင် (IDP) သို့မဟုတ် ထိုင်းနိုင်ငံမောင်းနှင်ခွင့်လိုင်စင် ရှိပါသလား။",
          "options": ["ရှိပါသည်။", "မရှိပါ။"]
        },
        "self_drive_deposit": {
          "question": "ကားယူဆောင်ချိန်တွင် ပေးဆောင်ရမည့် ပြန်အမ်းရမည့် စပေါ်ငွေ (Security Deposit Credit Card Hold) ကို သဘောတူပါသလား။",
          "options": ["သဘောတူပါသည်။", "သဘောမတူပါ။"]
        },
        "driver_hours": {
          "question": "တစ်နေ့လျှင် ဒရိုင်ဘာကို မည်မျှကြာမောင်းနှင်စေလိုပါသလဲ။",
          "options": [
            "တစ်ဝက်တစ်ပျက် (၅ နာရီအထိ)",
            "တစ်နေ့တာလုံး (၁၀-၁၂ နာရီအထိ)",
            "လေဆိပ်အကြို/အပို့ သာ"
          ]
        },
        "driver_language": {
          "question": "ဒရိုင်ဘာ မည်သည့်ဘာသာစကားပြောဆိုနိုင်သည်ကို ပိုနှစ်သက်ပါသလဲ။",
          "options": ["ထိုင်းဘာသာစကား သာ", "ထိုင်းနှင့် အခြေခံအင်္ဂလိပ်ဘာသာစကား", "ထိုင်းနှင့် မြန်မာဘာသာစကား"]
        },
        "addons": {
          "question": "လိုအပ်သော အပိုဝန်ဆောင်မှုများကို ရွေးချယ်ပါ (အများအပြားရွေးချယ်နိုင်သည်):",
          "options": ["ကလေးဘေးကင်းရေးထိုင်ခုံ", "GPS လမ်းညွှန်စနစ်", "အပြည့်အဝအာမခံ (No-Excess)", "အပိုဒရိုင်ဘာ စာရင်းသွင်းခြင်း"]
        },
        "pickup_date": {
          "question": "ကားစတင်ရယူမည့် ရက်စွဲ သို့မဟုတ် လ ကို ရိုက်ထည့်ပေးပါ:",
          "placeholder": "ဥပမာ- အေောက်တိုဘာ ၁၅ သို့မဟုတ် ဒီဇင်ဘာလလယ်"
        }
      }
    }
  },
  "vatRefund": {
    "title": "VAT ပြန်အမ်းငွေ လမ်းညွှန်",
    "description": "အနည်းဆုံး ၂,၀၀၀ ဘတ် သုံးစွဲပါ။ ဆိုင်းဘုတ်များကို ရှာပါ။ VAT ပြန်အမ်းငွေ",
    "link": "VAT Refund"
  },
  "visa": {
    "title": "ဗီဇာအချက်အလက်",
    "modalTitle": "ထိုင်းနိုင်ငံ ဗီဇာ လမ်းညွှန်",
    "modalSubtitle": "ဗီဇာ အချက်အလက်",
    "description": "Check your status.",
    "link": "ဗီဇာ ဆိုင်ရာ အချက်အလက်များ"
  },
  "travelTypes": {
    "title": "ခရီးသွားအမျိုးအစားများ",
    "modalTitle": "ခရီးသွားပုံစံများ လမ်းညွှန်",
    "modalSubtitle": "ခရီးသွားပုံစံများနှင့် စီစဉ်သူ",
    "link": "ခရီးသွားပုံစံများ (Travel Styles)"
  },
  "budget": "ဘတ်ဂျက် အကြံပြုချက်များ",
  "budgetModalTitle": "ထိုင်းနိုင်ငံ ဘတ်ဂျက် လမ်းညွှန်",
  "budgetSubtitle": "စမတ်ခရီးသွားအကြံပြုချက်များ",
  "learnMore": "ထပ်မံလေ့လာရန်",
  "accommodation": {
    title: "တည်းခိုနေထိုင်ရေး လမ်းညွှန်",
    modalTitle: "ထိုင်းနိုင်ငံတွင် တည်းခိုနေထိုင်မှုအတွက် ကျယ်ပြန့်သောလမ်းညွှန်",
    detailsTitle: "တည်းခိုနေထိုင်မှုများ",
    subtitle: "တည်းခိုနေထိုင်မှု စိတ်ကြိုက်ပြုပြင်ခြင်း",
    emptyState: "စိတ်ကြိုက်အကြံပြုချက်များရရှိရန် အောက်ပါမေးခွန်းများကို ဖြေပါ",
    readyToBook: "စီစဉ်မှုများ လုပ်ဆောင်ရန် အသင့်ဖြစ်ပြီလား?",
    bookStayButton: "📅 တည်းခိုခန်း ဘွတ်ကင်လုပ်ပါ",
    noneSelected: "မရွေးချယ်ထားပါ",
    suggestions: [],
    survey: {
      title: "တည်းခိုနေထိုင်မှုဆိုင်ရာ လိုလားချက်များစစ်တမ်း",
      analyzing: "အကောင်းဆုံးတည်းခိုရန်နေရာ ရှာဖွေရန် သင်၏အချက်အလက်များကို ဆန်းစစ်နေပါသည်...",
      buttons: {
        next: "နောက်တစ်ဆင့်",
        back: "နောက်ပြန်",
        submit: "ပေးပို့မည်",
        skip: "ကျော်မည်"
      },
      questions: {
        city: {
          question: "မည်သည့်မြို့တွင် တည်းခိုလိုပါသလဲ။",
          options: ["ဘန်ကောက်", "ဖူးခက်", "ချင်းမိုင်", "ပတ္တရား", "ကရာဘီ", "အယုဒ္ဓယ", "ကိုစမွေ"]
        },
        nights: {
          question: "ဘယ်နှစ်ည တည်းခိုရန် စီစဉ်ထားပါသလဲ။",
          placeholder: "တည်းခိုမည့်ညဦးရေ ထည့်ပါ (ဥပမာ- ၅ ည)"
        },
        area_general: {
          question: "မည်သည့်ဧရိယာတွင် တည်းခိုလိုပါသလဲ။",
          options: ["မြို့လယ်ခေါင် / စည်ကားရာနေရာ", "ကမ်းခြေ / ပင်လယ်နား", "တိတ်ဆိတ် / သဘာဝပတ်ဝန်းကျင်", "သမိုင်းဝင် / ယဉ်ကျေးမှုနယ်မြေ"]
        },
        budget: {
          question: "တစ်ညလျှင် ဘတ်ဂျက်မည်မျှ သတ်မှတ်ထားပါသလဲ။",
          options: ["ဘတ်ဂျက်သက်သာ: $30 အောက်", "အလယ်အလတ်: $30 - $100", "ဇိမ်ခံ: $100 - $250", "အဆင့်မြင့်ဇိမ်ခံ: $250+"]
        },
        type: {
          question: "မည်သည့် တည်းခိုနေထိုင်မှုအမျိုးအစားကို ပိုကြိုက်ပါသလဲ။",
          options: ["ဟိုတယ်", "ရီဆော့ထ်", "ဟိုစတယ်လ် (အိပ်ဆောင်)", "တည်းခိုခန်း", "ဗီလာ / အပါတ်မန့်"]
        },
        stars: {
          question: "မည်သည့် ကြယ်ပွင့်အဆင့်အတန်းကို ပိုကြိုက်ပါသလဲ။",
          options: ["၁-၂ ကြယ်ပွင့်", "၃ ကြယ်ပွင့်", "၄ ကြယ်ပွင့်", "၅ ကြယ်ပွင့် / ဇိမ်ခံ", "သတ်မှတ်ချက်မရှိပါ"]
        },
        bangkok_vibe: {
          question: "ဘန်ကောက်မြို့၏ မည်သည့်ပတ်ဝန်းကျင်ဇုန်က သင်နှင့် အကိုက်ညီဆုံး ဖြစ်မလဲ။",
          options: [
            "ဆူခုမ်းဗစ် (စျေးဝယ်ခြင်းနှင့် ညဘက်အပန်းဖြေခြင်း)",
            "စီယမ်/ပရာတူနမ် (မိသားစုစျေးဝယ်ခြင်းနှင့် ဈေးများ)",
            "ဆီလုံ/စားသောက် (စီးပွားရေးနှင့် အဆင့်မြင့်စားသောက်ဆိုင်များ)",
            "မြစ်ဘေးဧရိယာ (ဇိမ်ခံနှင့် ယဉ်ကျေးမှုလည်ပတ်စရာများ)"
          ]
        },
        phuket_beach: {
          question: "မည်သို့သော ကမ်းခြေအမျိုးအစားကို ပိုနှစ်သက်ပါသလဲ။",
          options: [
            "ပတွန်း (ညဘက်အပန်းဖြေခြင်းနှင့် စည်ကားသောကမ်းခြေ)",
            "ကတာ / ကာရွန် (မိသားစုနှင့် အသင့်တော်ဆုံးနှင့် ရေလှိုင်းစီးခြင်း)",
            "ဘန်တောင် / လာဂူနာ (ဇိမ်ခံအပန်းဖြေစခန်းများနှင့် ပိုမိုတိတ်ဆိတ်သောနေရာ)",
            "ဖူးခက်မြို့ဟောင်း (ယဉ်ကျေးမှုနှင့် ကဖေးများ - ကမ်းခြေမရှိပါ)"
          ]
        },
        transit_proximity: {
          question: "BTS (မိုးပျံရထား) သို့မဟုတ် MRT (မြေအောက်ရထား) ဘူတာများနှင့် လမ်းလျှောက်အကွာအဝေးအတွင်း ရှိရန် မည်မျှအရေးကြီးပါသလဲ။",
          options: [
            "၅ မိနစ်အတွင်း လမ်းလျှောက်နိုင်ရမည်",
            "ရှိလျှင်ပိုကောင်းသော်လည်း မရှိလည်းရသည်",
            "အရေးမကြီးပါ (ကိုယ်ပိုင်ကား သို့မဟုတ် တက္ကစီကိုသာ သုံးမည်)"
          ]
        },
        beach_proximity: {
          question: "ကမ်းခြေနှင့် မည်မျှနီးကပ်မှုကို လိုချင်ပါသလဲ။",
          options: [
            "ကမ်းခြေရှေ့တည့်တည့် (လမ်းဖြတ်ကူးစရာမလိုပါ)",
            "ကမ်းခြေသို့ လမ်းလျှောက်အကွာအဝေး (၁၀ မိနစ်အောက်)",
            "ကားမောင်းသွားရခြင်း သို့မဟုတ် ကားကြိုပို့သုံးရခြင်းကို ဂရုမစိုက်ပါ"
          ]
        },
        airport_pickup: {
          question: "တည်းခိုမည့်နေရာသို့ လေဆိပ်မှ ကိုယ်ပိုင်ကားဖြင့် ကြိုဆိုပို့ဆောင်ပေးရန် လိုအပ်ပါသလား။",
          options: [
            "ဟုတ်ကဲ့၊ ကိုယ်ပိုင်ကား သို့မဟုတ် ဗန်ကား ဈေးနှုန်းတွက်ချက်ပေးပါ။",
            "မလိုပါ၊ တက္ကစီ သို့မဟုတ် Grab ဖြင့်သာ ကိုယ်တိုင်သွားပါမည်။"
          ]
        },
        guests: {
          question: "ခရီးသွားမည့် လူဦးရေ မည်မျှရှိပါသလဲ။",
          placeholder: "လူဦးရေထည့်ပါ (ဥပမာ- လူကြီး ၂ ဦး၊ ကလေး ၁ ဦး)"
        },
        room_type: {
          question: "မည်သည့် အခန်းအမျိုးအစားက အသင့်တော်ဆုံး ဖြစ်မလဲ။",
          options: ["ရိုးရိုးခန်း (Standard)", "အဆင့်မြှင့်ခန်း (Deluxe)", "ဆွိခန်း (Suite)", "မိသားစုခန်း", "စုပေါင်းအိပ်ခန်း ကုတင်"]
        },
        amenities: {
          question: "လိုအပ်သော ဝန်ဆောင်မှုများကို ရွေးချယ်ပါ (အများအပြား ရွေးချယ်နိုင်သည်):",
          options: ["အခမဲ့ ဝိုင်ဖိုင်", "ရေကူးကန်", "အားကစားခန်းမ", "လေအေးပေးစက်", "နံနက်စာ ပါဝင်ပြီး", "စပါးနှင့် အနှိပ်ခန်း"]
        },
        checkin_date: {
          question: "တည်းခိုမည့် ရက်စွဲ သို့မဟုတ် လ ကို ရိုက်ထည့်ပေးပါ:",
          placeholder: "ဥပမာ- အောက်တိုဘာ ၁၅ သို့မဟုတ် ဒီဇင်ဘာလလယ်"
        }
      }
    }
  },
  "carRental": {
    title: "ကားအငှား လမ်းညွှန်",
    modalTitle: "ထိုင်းနိုင်ငံတွင် ကားအငှားအတွက် ကျယ်ပြန့်သောလမ်းညွှန်",
    detailsTitle: "ကားအငှားများ",
    subtitle: "ဒိုင်နမစ် ကားငှား စိတ်ကြိုက်ပြုပြင်ခြင်း",
    emptyState: "စိတ်ကြိုက်အကြံပြုချက်များရရှိရန် အောက်ပါမေးခွန်းများကို ဖြေပါ",
    readyToBook: "စီစဉ်မှုများ လုပ်ဆောင်ရန် အသင့်ဖြစ်ပြီလား?",
    bookStayButton: "🚗 ကားငှား ဘွတ်ကင်လုပ်ပါ",
    noneSelected: "မရွေးချယ်ထားပါ",
    suggestions: [],
    survey: {
      title: "ကားအငှား လိုလားချက်များစစ်တမ်း",
      analyzing: "သင့်အတွက် သင့်တော်သော ကားအငှားရှာဖွေရန် ဆန်းစစ်နေပါသည်...",
      buttons: {
        next: "နောက်တစ်ဆင့်",
        back: "နောက်ပြန်",
        submit: "ပေးပို့မည်",
        skip: "ကျော်မည်"
      },
      questions: {
        rental_type: {
          question: "ကိုယ်တိုင် မောင်းမည် သို့မဟုတ် ကားမောင်းသူငှားမည်?",
          options: ["ကိုယ်တိုင်မောင်း (Self-Drive)", "ကားမောင်းသူနှင့်အတူ (With Driver)"]
        },
        pickup_location: {
          question: "ကားကို ဘယ်မှာ ယူမည်နည်း?",
          placeholder: "ကားယူရမည့်နေရာ ထည့်ပါ (ဥပမာ- ဆူဝါနပူမီ လေဆိပ်, ဘန်ကောက်မြို့လယ်)"
        },
        dropoff_location: {
          question: "ကားကို ဘယ်မှာ ပြန်ပေးမည်နည်း?",
          placeholder: "ကားပြန်ပေးရမည့်နေရာ ထည့်ပါ (ဥပမာ- ဖူးခက် လေဆိပ်, ဟိုတယ်)"
        },
        rental_dates: {
          question: "ကားအငှားရက်စွဲများ ဘယ်သားလဲ?",
          placeholder: "ရက်စွဲများ ထည့်ပါ (ဥပမာ- ဒီဇင်ဘာ ၁၅-၂၀, ၂၀၂၆)"
        },
        vehicle_type: {
          question: "မည်သည့် ကားအမျိုးအစား လိုချင်ပါသလဲ?",
          options: ["စီးပွားဖြစ်ကား (Economy)", "SUV / 4WD", "ဇိမ်ခံကား (Luxury)", "ဗန်း / မီနီဘတ်စ် (Van)"]
        },
        driver_age: {
          question: "အဓိက ကားမောင်းသူ၏ အသက်က ဘယ်လောက်လဲ?",
          placeholder: "ကားမောင်းသူ၏ အသက် ထည့်ပါ (ဥပမာ- ၃၀)"
        },
        driver_license: {
          question: "သင့်တွင် နိုင်ငံတကာ မောင်းနှင်ခွန်လက်မှတ် ရှိပါသလား?",
          options: ["ဟုတ်ပါသည်၊ ကျွန်ုပ်တွင် IDP ရှိပါသည်", "မရှိပါ၊ ဒေသခံ လိုင်စင်သာ ရှိပါသည်", "ဤအကြောင်းအတွက် အကူအညီလိုပါသည်"]
        },
        driver_language: {
          question: "ကားမောင်းသူသည် ဘာဘာသာစကား ပြောနိုင်ရမည်နည်း? (တစ်ခုထက်မက ရွေးနိုင်သည်)",
          options: ["အင်္ဂလိပ်", "ထိုင်း", "တရုတ်", "ဂျပန်", "ကိုရီးယား"]
        },
        additional_services: {
          question: "လိုအပ်သော နောက်ထပ်ဝန်ဆောင်မှုများကို ရွေးချယ်ပါ (တစ်ခုထက်မက ရွေးနိုင်သည်):",
          options: ["GPS Navigation", "ကလေးခုံပေါင်", "အပြည့်အဝ အာမခံ", "လေဆိပ်မှ လာရောက်ပို့ဆောင်မှု", "၂၄/၇ အကူအညီ"]
        },
        budget: {
          question: "တစ်ရက်လျှင် သင့်ဘတ်ဂျက်က ဘယ်လောက်လဲ?",
          options: ["စီးပွားဖြစ်: တစ်ရက်လျှင် $30 အောက်", "အလယ်အလတ်: တစ်ရက်လျှင် $30 - $80", "ဇိမ်ခံ: တစ်ရက်လျှင် $80 - $150", "ပရီမီယံ: တစ်ရက်လျှင် $150+"]
        },
        special_requests: {
          question: "အထူးလိုအပ်ချက်များ ရှိပါသလား?",
          placeholder: "အထူးလိုအပ်ချက်များ ထည့်ပါ (ဥပမာ- သက်ကြွားစားသော ကားမောင်းသူ, သတ်မှတ်ထားသော လမ်းကြောင်း)"
        }
      }
    }
  },
  "tripPlanner": {
    header: "ထိုင်းခရီးစဉ် စီစဉ်ပေးသူ",
    subHeader: "သင့်ခရီးစဉ်ကို အဆင့်ဆင့် စီစဉ်ကြပါစို့",
    q1: "ဘယ်မြို့တွေကို သွားရောက်ချင်ပါသလဲ? (ဥပမာ- ဘန်ကောက်၊ ဖူးခက်၊ ချင်းမိုင်)",
    q2: "ခရီးစဉ်က ဘယ်လောက်ကြာမှာလဲ? (ဥပမာ- ၅ ရက် ၄ ည)",
    q3: "လူဦးရေ ဘယ်လောက်ပါမလဲ?",
    adults: "လူကြီး",
    infants: "ကလေးငယ်",
    q4: "ဘယ်လိုတည်းခိုခန်းမျိုးကို နှစ်သက်ပါသလဲ?",
    accOptions: ["ဟိုတယ် (Hotel)", "ဂက်စ်ဟောက်စ် (Guesthouse)", "ဟော်တယ် (Hostel)", "သတ်မှတ်မထားပါ"],
    q5: "ဘတ်ဂျက်က ဘယ်လိုရှိပါသလဲ?",
    budgetOptions: ["အသက်သာဆုံး (Budget)", "အလယ်အလတ် (Mid-range)", "ဇိမ်ခံ (Luxury)"],
    q6: "အဓိက စိတ်ဝင်စားမှုက ဘာဖြစ်မလဲ?",
    interestOptions: ["ယဉ်ကျေးမှု/ဘုရားကျောင်း", "ကမ်းခြေ/ကျွန်း", "ဈေးဝယ်ခြင်း", "အစားအစာ", "စွန့်စားမှု"],
    q7: "အခြား အထူးလိုအပ်ချက်များ ရှိပါသလား? (ဥပမာ- သက်သတ်လွတ်စားသူ၊ ဘီးတပ်ကုလားထိုင် လိုအပ်သူ)",
    next: "နောက်တစ်ခု",
    submit: "အစီအစဉ် ထုတ်ပေးပါ",
    restart: "အစမှ ပြန်စမည်",
    generating: "သင့်အတွက် အကောင်းဆုံး ခရီးစဉ်ကို ရေးဆွဲနေသည်..."
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
    "travelerTips": "ခရီးသည်များအတွက် အကြံပြုချက်များ",
    "phrasesChatIntro": "ထိုင်းစကားစုနှင့် ဘာသာစကားအကြောင်း ဘာမဆိုမေးမြန်းနိုင်ပါသည်။",
    "phrasesFooter": "ဘာသာပြန်နှင့် အသံထွက်လမ်းညွှန်များကို AsiaBuddy AI မှ ပံ့ပိုးပေးထားသည်",
    "laws": "Key Laws",
    "etiquette": "ယဉ်ကျေးမှု နှင့် ကျင့်ဝတ်",
    "weather": "Weather Info",
    "serviceMinded": "Service Minded Help",
    "learnThaiBasics": "ထိုင်းဘာသာစကား အခြေခံများကို လေ့လာပါ",
    "phrasesChat": {
      "placeholder": "သင်သိလိုသော အရေးကြီးသော ထိုင်းစကားစုများကို မေးမြန်းပါ...",
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
    "safe": "Safe travels!",
    "bookNow": "ဘွတ်ကင်လုပ်ပါ",
    "bookNowSubtitle": "လူသားလက်ထောက်နှင့် ချိတ်ဆက်ပါ",
    "action": "ဘွတ်ကင်လုပ်ပါ",
    "aiBusyFallback": "ကျွန်ုပ်တို့၏ AI လက်ထောက်သည် ယာယီအလုပ်များနေပါသည်။ 'ဘွတ်ကင်လုပ်ပါ' ကိုနှိပ်ပြီး ကျွန်ုပ်တို့၏အဖွဲ့နှင့် တိုက်ရိုက်စကားပြောပါ",
    "bookNowCta": "ဘွတ်ကင်လုပ်ပါ",
    "surveyProgressLabel": "စစ်တမ်း အခြေအနေ",
    "resetChatTitle": "စကားပြောပြန် စတင်ပါ",
    "resetButtonLabel": "ပြန်စတင်ပါ"
  },
  "destinationTabs": {
    "mustVisit": "သွားရောက်ရမည့်နေရာများ",
    "dining": "စားသောက်ဆိုင်များ",
    "experiences": "အတွေ့အကြုံများ",
    "activities": "လှုပ်ရှားမှုများ",
    "hiddenGems": "လူသိနည်းသောနေရာများ"
  },
  "essentialGuides": {
    "sectionTitle": "အရေးကြီးသောလမ်းညွှန်များ",
    "learnMore": "ပိုမိုလေ့လာရန်",
    "cards": {
      "generalInfo": "အထွေထွေ အချက်အလက်",
      "travelTypes": "ခရီးသွားအမျိုးအစားများ",
      "visaInfo": "ဗီဇာ အချက်အလက်",
      "transport": "သယ်ယူပို့ဆောင်ရေး",
      "accommodation": "တည်းခိုနေထိုင်ရေး",
      "foodDining": "အစားအစာ",
      "cultureEtiquette": "ယဉ်ကျေးမှုနှင့် အပြုအမှု",
      "budgetTips": "ဘတ်ဂျက် အကြံပြုချက်များ"
    }
  },
  "about": {
    "ourStory": "ကျွန်ုပ်တို့၏ ဖြတ်သန်းမှုပုံရိပ်လွှာ",
    "heroTitle1": "ပိုမိုစမတ်ကျကျ ခရီးသွားပါ။",
    "heroTitle2": "ပိုမိုနက်ရှိုင်းစွာ လေ့လာစူးစမ်းပါ။",
    "heroSubtitle": "AsiaBuddy သည် အရှေ့တောင်အာရှဒေသတွင်း၌ ယုံကြည်မှုအပြည့်ဖြင့် လေ့လာစူးစမ်းရန်၊ လွတ်လပ်စွာ သွားလာလှုပ်ရှားရန်နှင့် စစ်မှန်သော ဒေသန္တရအတွေ့အကြုံများကို ခံစားရရှိလိုသော ခရီးသွားများအတွက် အထူးရည်ရွယ်၍ ဖန်တီးထားသည့် သင်၏ အသိဉာဏ်ရည်ထက်မြက်သော ခရီးသွားဖော် ဖြစ်ပါသည်။",
    "aboutLabel": "ကျွန်ုပ်တို့အကြောင်း",
    "aboutHeading": "သင်နှင့် အာရှတိုက်ကြားက ကွာဟချက်များကို ကျွန်ုပ်တို့ ပေါင်းကူးပေးပါသည်။",
    "aboutP1": "ယုံကြည်စိတ်ချရသော လမ်းညွှန်သူမရှိဘဲ မရင်းနှီးသော မြို့ပြအသစ်တစ်ခုသို့ ရောက်ရှိသွားချိန်တွင် လမ်းညွှန်ဆိုင်းဘုတ်များကြောင့် ဝေခွဲမရဖြစ်ခြင်း၊ သယ်ယူပို့ဆောင်ရေးအတွက် စိုးရိမ်ပူပန်ရခြင်းနှင့် ရွေးချယ်စရာများစွာကြား၌ ဗျာများရခြင်း စသည့် ခံစားချက်မျိုးကို ကျွန်ုပ်တို့ ကောင်းစွာနားလည်ပါသည်။ ထိုကဲ့သို့သော အခက်အခဲများကို လုံးဝပယ်ဖျက်ပေးရန်အတွက် AsiaBuddy ကို တည်ဆောက်ခဲ့ခြင်း ဖြစ်ပါသည်။",
    "aboutP2": "ကျွန်ုပ်တို့၏ ပလက်ဖောင်းသည် နက်ရှိုင်းသော ဒေသတွင်းကျွမ်းကျင်မှုများနှင့်အတူ ယဉ်ကျေးမှု၊ သယ်ယူပို့ဆောင်ရေး၊ စားသောက်ရေး၊ တည်းခိုနေထိုင်ရေးနှင့် ဘတ်ဂျက်တွက်ချက်မှုဆိုင်ရာ ကိစ္စရပ်များအားလုံးအတွက် AI နည်းပညာသုံး ပံ့ပိုးကူညီမှုများကို ပေါင်းစပ်ပေးထားပါသည်။ ဤဝန်ဆောင်မှုများကို မိမိတို့နှစ်သက်ရာ ဘာသာစကားဖြင့် တစ်ရက်လျှင် ၂၄ နာရီပတ်လုံး အသုံးပြုနိုင်ပါသည်။",
    "stat1": "ပံ့ပိုးထားသော ဘာသာစကားများ",
    "stat2": "AI အထူးဝန်ဆောင်မှု",
    "stat3": "ထိုင်းနိုင်ငံတွင်း ခရီးစဉ်ဒေသများ",
    "stat4": "အခမဲ့အသုံးပြုနိုင်မှု",
    "visionLabel": "မျှော်မှန်းချက်နှင့် ရ�်မှန်းချက်",
    "visionTitle": "ကျွန်ုပ်တို့၏ မျှော်မှန်းချက်",
    "visionText": "အာရှတိုက်သို့ ရောက်ရှိလာသော ခရီးသွားတိုင်းအတွက် အယုံကြည်ရဆုံးသော ခရီးသွားဖော် ဖြစ်လာစေရန် ဖြစ်ပါသည်။ ဘာသာစကား အတားအဆီးများကို ဖယ်ရှားပေးခြင်း၊ ဆုံးဖြတ်ချက်များကို လွယ်ကူချောမွေ့စေခြင်းဖြင့် ခရီးစဉ်တိုင်းကို ယုံကြည်မှုရှိပြီး ပျော်ရွှင်စရာကောင်းသော အတွေ့အကြုံများအဖြစ် ပြောင်းလဲပေးသွားမည် ဖြစ်ပါသည်။",
    "missionTitle": "ကျွန်ုပ်တို့၏ ရ�်မှန်းချက်",
    "missionText": "မည်သည့် ဘတ်ဂျက်၊ မည်သည့် နောက်ခံအကြောင်းအရာမျိုးရှိသည့် ခရီးသွားမဆို အာရှတိုက်ကို ဘေးကင်းစိတ်ချစွာ၊ စမတ်ကျကျနှင့် မေ့မရနိုင်ဖွယ်ရာ လေ့လာစူးစမ်းနိုင်စေရန်အတွက် အခမဲ့ဖြစ်ပြီး ဘာသာစကားစုံ ပံ့ပိုးပေးနိုင်သော AI နည်းပညာသုံး ခရီးသွားကူညီမှု ဝန်ဆောင်မှုများကို ပေးအပ်သွားရန် ဖြစ်ပါသည်။",
    "teamLabel": "ကျွန်ုပ်တို့၏ အဖွဲ့အစည်း",
    "teamText": "ကျွန်ုပ်တို့သည် ခရီးသွားခြင်းကို မြတ်နိုးပြီး နည်းပညာကို စိတ်အားထက်သန်ကြသည့် အဖွဲ့ဝင်များဖြစ်ကြပြီး",
    "teamLocations": "ဂျာမနီ၊ ယူနိုက်တက်ကင်းဒမ်း၊ ထိုင်းနှင့် မြန်မာနိုင်ငံ",
    "teamText2": "တို့တွင် အခြေစိုက်ကာ 'အာရှတိုက်သို့ လူတိုင်း လွယ်ကူချောမွေ့စွာ သွားလာနိုင်စေရမည်' ဟူသော ရည်မှန်းချက်တစ်ခုတည်းဖြင့် စုစည်းထားခြင်း ဖြစ်ပါသည်။",
    "ctaTitle": "အာရှတိုက်ကို ယုံကြည်မှုအပြည့်ဖြင့် လေ့လာစူးစမ်းရန် အဆင်သင့်ဖြစ်ပြီလား။",
    "ctaSubtitle": "အရှေ့တောင်အာရှတစ်ခွင်တွင် AsiaBuddy ကို ၎င်းတို့၏ ခရီးသွားဖော်အဖြစ် ယုံကြည်အားကိုးကြသည့် ထောင်ပေါင်းများစွာသော ခရီးသွားများနှင့်အတူ ပူးပေါင်းလိုက်ပါ။",
    "ctaButton": "ထိုင်းနိုင်ငံကို စတင်လေ့လာစူးစမ်းပါ"
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
    "title": "အစားအသောက်",
    "chatTitle": "Food Concierge",
    "statusActive": "Food Concierge Active",
    "subtitle": "ထိုင်းအစားအသောက် အကြံပေးသူ",
    "suggestionsLabel": "Common Food Inquiries",
    "detailsTitle": "Thailand Food Guide",
    "guideLink": "ထိုင်းနိုင်ငံ အစားအသောက် လမ်းညွှန် ပိုမိုသိရှိလိုပါက",
    "modalTitle": "အစားအသောက် လမ်းညွှန်",
    "modalSubtitle": "ဒေသီယ အစားအသောက် နှင့် စားသုံးခြင်း ဘေးကင်းရေး",
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
  },
  "serviceCards": {
    "bookNow": "ဘွတ်ကင်လုပ်ပါ",
    "viewFlight": "လေယာဉ်ကြည့်ပါ",
    "bookTransfer": "သယ်ယူပို့ဆောင်ရေး ဘွတ်ကင်လုပ်ပါ",
    "reserveCar": "ကားအငှား ဘွတ်ကင်လုပ်ပါ",
    "getTickets": "လက်မှတ်ရယူပါ",
    "freeCancellation": "အခမဲ့ ဖျက်သိမ်းနိုင်",
    "skipTheLine": "တန်းစီမနေရ",
    "instantConfirmation": "ချက်ချင်း အတည်ပြု",
    "perNight": "/ည",
    "perDay": "/ရက်",
    "perPerson": "/လူ",
    "priceChecked": "စျေးနှုတ်ထားသည်",
    "minDriverAge": "ကားမောင်း အနိမ့်ဆုံးအသက်"
  },
  "activitiesPage": {
    "breadcrumb": "ပင်မ",
    "breadcrumbActivities": "လှုပ်ရှားမှုများ",
    "backTo": "ပြန်သွားရန်",
    "decorativeLabel": "အတွေ့အကြုံများ",
    "title": "လှုပ်ရှားမှုများ",
    "subtitle": "အံ့ဖွယ်ကောင်းသော အတွေ့အကြုံများကို ရှာဖွေပြီး ကျွန်ုပ်တို့၏ ယုံကြည်ရသော ပါတ်နာများမှ ဘွတ်ကင်လုပ်ပါ",
    "statCurated": "✦ ရွေးချယ်ထားသော လှုပ်ရှားမှုများ",
    "statBestPrices": "✦ အကောင်းဆုံးစျေးနှုန်းများ",
    "statInstantBooking": "✦ ချက်ချင်းဘွတ်ကင်လုပ်နိုင်",
    "sectionLabel": "ရရှိနိုင်သော အတွေ့အကြုံများ",
    "sectionTitle": "လှုပ်ရှားမှုများ ကြည့်ရှုပါ",
    "activitiesAvailable": "{count} လှုပ်ရှားမှုများ ရရှိနိုင်သည်",
    "emptyStateTitle": "လှုပ်ရှားမှုများ မကြာမီ လာမည်",
    "emptyStateDescription": "ကျွန်ုပ်တို့သည် သင့်အတွက် အံ့ဖွယ်ကောင်းသော အတွေ့အကြုံများကို ရွေးချယ်နေသည်။ မကြာမီ ပြန်လာကြည့်ပါ!",
    "filterAllCities": "မြို့အားလုံး",
    "filterNoActivities": "လှုပ်ရှားမှုများ မတွေ့ပါ",
    "filterNoActivitiesDescription": "မြို့တစ်ခုကို ရွေးချယ်ကြည့်ပါ သို့မဟုတ် လှုပ်ရှားမှုအားလုံးကို ကြည့်ပါ"
  },
  "servicesStrip": {
    "hotel": "ဟိုတယ်",
    "flight": "လေယာဉ်",
    "transfer": "သယ်ယူပို့ဆောင်ရေး",
    "tickets": "လက်မှတ်များ",
    "carRental": "ကားအငှား"
  },
  "servicesPage": {
    "comingSoonTitle": "မကြာမီလာမည်",
    "comingSoonMessage": "ကျွန်ုပ်တို့သည် အကောင်းဆုံး ခရီးသွားဝန်ဆောင်မှုများကို သင့်အတွက် ယူဆောင်လာရန် အထမ်းသပ်လုပ်ဆောင်နေပါသည်",
    "servicesList": "ဟိုတယ် • လေယာဉ် • လက်မှတ် • သယ်ယူပို့ဆောင်ရေး • ကားအငှား • ခရီးစဉ်များ",
    "backToHome": "ပင်မစာမျက်နှာသို့ ပြန်သွားပါ",
    "chatNote": "ဘွတ်ကင်နှင့် စုံစမ်းမေးမြန်းရန်အတွက် ပင်မစာမျက်နှာရှိ တိုက်ရိုက်စကားပြောဝန်ဆောင်မှုကို အသုံးပြုပါ"
  },
  "flights": {
    "title": "ထိုင်းနိုင်ငံသို့ လေယာဉ်ခရီးစဉ်များ",
    "intro": "ထိုင်းနိုင်ငံသို့ လေယာဉ်ခရီးစဉ်ကို လွယ်ကူစွာ ဘွတ်ကင်လုပ်ပါ။ နိုင်ငံတကာ လေယာဉ်ခရီးစဉ်အများစုသည် ဘန်ကောက်မြို့ရှိ ဆူဝါန်နဘူမီ လေဆိပ် (BKK) သို့မဟုတ် ဒွန်မောင် လေဆိပ် (DMK) သို့ ဆိုက်ရောက်ကြသည်။ အကောင်းဆုံး စျေးနှုန်းများအတွက် ခရီးစဉ်ထွက်ခွာမည့်ရက် ၂-၃ လ အလိုက် ဘွတ်ကင်လုပ်ပြီး ခရီးစဉ်ထွက်ခွာမည့်အခါ ဗီဇာလိုအပ်ချက်များကို စစ်ဆေးပါ။",
    "visaLinkText": "ဗီဇာလိုအပ်ချက်များ စစ်ဆေးပါ",
    "searchSpecificDates": "သတ်မှတ်ထားသော ရက်စွဲများကို ရှာဖွေပါ",
    "flexibleDates": "ရက်စွဲများ ပြောင်းလဲနိုင် — အပေါ်ဆုံးစျေးကို ရှာဖွေပါ",
    "continuePlanning": "သင့်ခရီးစဉ်ကို ဆက်လက် စီစဉ်ဆောင်ပါ",
    "faq": {
      "title": "မကြာခဏ မေးလေ့ရှိသော မေးခွန်းများ",
      "q1": {
        "question": "ဘန်ကောက်သို့ တိုက်ရိုက် လေယာဉ်ခရီးစဉ်သည် ကြာမြင့်မည့်ကာလ?",
        "answer": "အာရှ၏ အဓိက လေယာဉ်ကွင်းများမှ ဘန်ကောက်သို့ တိုက်ရိုက် လေယာဉ်ခရီးစဉ်များသည် ပျမ်းမျှအားဖြင့် ၂-၄ နာရီ ကြာမြင့်သည်။ ဥရောပမှ တိုက်ရိုက် လေယာဉ်ခရီးစဉ်များသည် ၁၁-၁၃ နာရီ ကြာမြင့်သည်။ မြောက်အမေရိကမှ ဆိုပါက အလယ်ရပ်နားဖြင့် ၁၅-၂၀ နာရီ ကြာမြင့်ပါသည်။"
      },
      "q2": {
        "question": "ထိုင်းနိုင်ငံသို့ လေယာဉ်များ ပြေးဆိုင်သည့် လေကြောင်းလိုင်းများကား ဘာတွေလဲ?",
        "answer": "ထိုင်းအဲယားဝေးစ်၊ စင်္ကာပူရ် လေကြောင်းလိုင်း၊ အီမာရိတ်၊ ကာတာ၊ ကက်သေးပက်စစ် စသော အဓိက နိုင်ငံတကာ လေကြောင်းလိုင်းများသည် ဘန်ကောက်သို့ ဝန်ဆောင်မှုပေးကြသည်။ အဲယားအေးရှားနှင့် နော့ခ် လေကြောင်းလိုင်းကဲ့သို့သော တန်ဖိုးနိမ့် လေကြောင်းလိုင်းများသည်လည်း ဒေသဆိုင်ရာ ခရီးစဉ်များကို ပေးဆောင်ကြသည်။"
      },
      "q3": {
        "question": "ဗီဇာ လိုအပ်ပါသလား?",
        "answer": "ဗီဇာလိုအပ်ချက်များသည် သင့်နိုင်ငံသားအပေါ် မူတည်သည်။ နိုင်ငံအများစုသည် ၃၀ ရက် ဗီဇာကင်းလွတ်ခွင့်ကို ရရှိကြသည်။ အချို့နိုင်ငံများသည် ကြိုတင် လျှောက်ထားရန် လိုအပ်သည်။ နောက်ဆုံး လိုအပ်ချက်များအတွက် ကျွန်ုပ်တို့၏ ဗီဇာလမ်းညွှန်ကို စစ်ဆေးပါ။"
      },
      "q4": {
        "question": "ဘယ်လေဆိပ်သို့ လေယာဉ်ပျံသန်းသင့်လဲ?",
        "answer": "ဆူဝါန်နဘူမီ (BKK) သည် နိုင်ငံတကာ လေယာဉ်ခရီးစဉ်အများစုကို လက်ခံပြီး Airport Rail Link ဖြင့် မြို့နှငင့် ဆက်သွယ်ထားသည်။ ဒွန်မောင် (DMK) သည် တန်ဖိုးနိမ့် လေကြောင်းလိုင်းများနှင့် ပြည်တွင်း လေယာဉ်ခရီးစဉ်များကို ဝန်ဆောင်ပြီး ကောင်းမွန်သော သယ်ယူပို့ဆောင်ရေး ဆက်သွယ်မှုများ ရှိသည်။"
      },
      "q5": {
        "question": "လေယာဉ်ခရီးစဉ်ကို ဘယ်အချိန်မှာ ဘွတ်ကင်လုပ်သင့်လဲ?",
        "answer": "အကောင်းဆုံး စျေးနှုန်းများအတွက် လူဦးရေများပြားသော ရာသီ (ဒီဇင်ဘာ-ဖေဖော်ဝါရီ) အတွက် ခရီးစဉ်ထွက်ခွာမည့်ရက် ၂-၃ လ အလိုက် ဘွတ်ကင်လုပ်ပါ။ အလယ်အလတ် ရာသီများ (မတ်-မေ၊ စက်တင်ဘာ-နိုဝင်ဘာ) တွင် ပိုမိုကောင်းမွန်သော စျေးနှုန်းများနှင့် လူဦးရေ နည်းပါးသော အခွင့်အလမ်းများ ရရှိနိုင်သည်။"
      }
    }
  },
  "hotels": {
    "title": "ထိုင်းနိုင်ငံရှိ ဟိုတယ်များ",
    "intro": "ထိုင်းနိုင်ငံတွင် သင့်အတွက် သင့်တော်ဆုံး နေရာကို ရှာဖွေပါ။ ဘတ်ဂျက်ရွေးချယ်စရာများသည် ဧည့်လမ်းညွှန်များအတွက် တစ်ညလျှင် ခန့်မှန်း ၅၀၀-၁,၀၀၀ ဘတ်မှ စတင်ပြီး အလယ်အလတ် ဟိုတယ်များသည် ၁,၅၀၀-၄,၀၀၀ ဘတ် ရှိသည်။ လူကြိုက်များသော နေရာများတွင် ဘန်ကောက်ရှိ ဆူခုမ်ဗစ် ညဘက်ဘဝနှင့် ဈေးဝယ်ထွက်ရန်အတွက်၊ ဖူးကက်ရှိ ပါတောင် ပင်လယ်ကမ်းခြေသို့ သွားရန်အတွက်နှင့် ချင်းမိုင်ရှိ ရှေးဟောင်းမြို့ ယဉ်ကျေးမှုအတွက် ပါဝင်သည်။ အကောင်းဆုံး နှုန်းနှင့် နေရာရရန် လူဦးရေများသော ရာသီ (ဒီဇင်ဘာ-ဖေဖော်ဝါရီ) တွင် ၂-၃ လ ကြိုတင် ဘွတ်ကင်လုပ်ပါ။",
    "continuePlanning": "သင့်ခရီးစဉ်ကို ဆက်လက် စီစဉ်ဆောင်ပါ",
    "faq": {
      "title": "မကြာခဏ မေးလေ့ရှိသော မေးခွန်းများ",
      "q1": {
        "question": "ဘန်ကောက်တွင် နေရာလိုက်ရန် အကောင်းဆုံး နေရာက ဘာလဲ?",
        "answer": "ဆူခုမ်ဗစ်သည် BTS လွယ်ကူစွာ သွားလာနိုင်သော ညဘက်ဘဝနှင့် ဈေးဝယ်ထွက်ရန်အတွက် အကောင်းဆုံးဖြစ်သည်။ ဆိုင်ယမ်/ပရာတူနမ်သည် မိသားစု ဈေးဝယ်ထွက်ရန်နှင့် ဈေးများကို ပေးသည်။ ဆီလုံ/သာသွန်သည် အဆင့်မြင့် စားေသာက်ရေး စီးပွားရေး ဒေသဖြစ်သည်။ မြစ်ကမ်းနားသည် ယဉ်ကျေးမှု ကြည့်ရှုရန် နီးစပ်သော ဥဿရဓ ဟိုတယ်များရှိသည်။"
      },
      "q2": {
        "question": "လူဦးရေများသော ရာသီတွင် ကြိုတင် ဘွတ်ကင်လုပ်ရန် လိုအပ်ပါသလား?",
        "answer": "ဟုတ်ကြောင်း၊ လူကြိုက်များသော ဖူးကက်၊ ကရာဘီ နှင့် ချင်းမိုင် ကဲ့သို့သော နေရာများတွင် လူဦးရေများသော ရာသီ (ဒီဇင်ဘာ-ဖေဖော်ဝါရီ) အတွက် ၂-၃ လ ကြိုတင် ဘွတ်ကင်လုပ်ရန် အကြံပြုသည်။ အလယ်အလတ် ရာသီများသည် ပိုမိုကောင်းမွန်သော နှုန်းနှင့် ပိုမိုများသော နေရာများကို ပေးသည်။"
      },
      "q3": {
        "question": "တိုက်ရိုက် ဘွတ်ကင်လုပ်ခြင်းနှင့် ကိုယ်စားလှယ်မှ ဘွတ်ကင်လုပ်ခြင်း ဘယ်ဟာက ပိုလုံခြုံသလဲ?",
        "answer": "နှစ်မျိုးလုံးသည် ယေဘုယျအားဖြင့် လုံခြုံသည်။ တိုက်ရိုက် ဘွတ်ကင်လုပ်ခြင်းသည် တစ်ခါတစ်ရံ ပိုကောင်းသော နှုန်းများ သို့မဟုတ် ပြန်ဖျက်နိုင်သော နှုန်းများကို ပေးနိုင်သည်။ ယုံကြည်ရသော ကိုယ်စားလှယ်များသည် ပေါင်းစပ်ထားသော အထူးကမ္ဘာများနှင့် ဒေသဆိုင်ရာ ပံ့ပိုးမှုကို ပေးသည်။ ဘယ်နည်းနှင့် ဘွတ်ကင်လုပ်သည်ဖြစ်စေ သုံးသပ်မှုများနှင့် ပြန်ဖျက်မူဝါဒများကို အမြဲ စစ်ဆေးပါ။"
      },
      "q4": {
        "question": "တစ်ညလျှင် ပုံမှန် ဘတ်ဂျက် အတိုင်းအတာက ဘာလဲ?",
        "answer": "ဘတ်ဂျက် ဧည့်လမ်းညွှန်များနှင့် ဟိုစတယ်များ: ၅၀၀-၁,၅၀၀ ဘတ် ($15-45)။ အလယ်အလတ် ဟိုတယ်များ: ၁,၅၀၀-၄,၀၀၀ ဘတ် ($45-120)။ ဥဿရဓ ရီဆို့များ: ၄,၀၀၀-၁၀,၀၀၀+ ဘတ် ($120-300+)။ နှုန်းများသည် နေရာနှင့် ရာသီအပေါ် မူတည်၍ သိသာထစ်စစ် ကွဲပြားသည်။"
      },
      "q5": {
        "question": "ပင်လယ်ကမ်းခြေ ဟိုတယ်များသည် ဈေးကြီးသည့်အတွက် တန်ဖိုးရှိပါသလား?",
        "answer": "ပင်လယ်ကမ်းခေါင် နေရာများသည် အဆင်ပြေချင်းနှင့် မြင်ကွင်းများကို ပေးသော်လည်း ပရီမီယံ စျေးနှုန်းများရှိသည်။ လမ်းလျှောက်သွားနိုင်သော (၅-၁၀ မိနစ်) ဟိုတယ်များသည် ပိုကောင်းသော တန်ဖိုးကို ပေးတတ်သည်။ ဆုံးဖြတ်ရာတွင် ပင်လယ်ကမ်းခြေတွင် သင်နေရမည့် အချိန်နှင့် အခြား ကြည့်ရှုရန် နေရာများကို စူးစမ်းရာတွင် သုံးသပ်ပါ။"
      }
    }
  },
  "tickets": {
    "title": "ထိုင်းနိုင်ငံရှိ လက်မှတ်များနှင့် လှုပ်ရှားမှုများ",
    "intro": "Klook မှတစ်ဆင့် ထိုင်းနိုင်ငံတစ်ဝှမ်းတွင် လက်မှတ်များနှင့် လှုပ်ရှားမှုများကို ချက်ချင်း အတည်ပြုဖြင့် ဘွတ်ကင်လုပ်ပါ။ ဘန်ကောက်ရှိ ဘုရားကျောင်းခရီးစဉ်များမှ ဖူးကက်ရှိ ကျွန်းခရီးစဉ်များအထိ စားပွဲချင်းမရှောင်ပဲ ကြိုတင် နေရာချထားပါ။ လူကြိုက်များသော အတွေ့အကြုံများတွင် ယဉ်ကျေးမှု ပြပွဲများ၊ စွန့်စားခရီးစဉ်များနှင့် ဆိုင်ရာ နေရာများသို့ ဝင်ရောက်ခွင့် ပါဝင်သည်။ ကြိုတင် ဘွတ်ကင်လုပ်ခြင်းသည် နေရာရရန် အာမခံပြီး မကြာခဏ သီးသန့် လျှော့စျေးများလည်း ပါဝင်သည်။",
    "continuePlanning": "သင့်ခရီးစဉ်ကို ဆက်လက် စီစဉ်ဆောင်ပါ",
    "faq": {
      "title": "မကြာခဏ မေးလေ့ရှိသော မေးခွန်းများ",
      "q1": {
        "question": "လက်မှတ်များကို ကြိုတင် ဘွတ်ကင်လုပ်ရန် လိုအပ်ပါသလား?",
        "answer": "လူကြိုက်များသော နေရာများဖြစ်သည့် ဂရင်းပေါ်လစ် ခရီးစဉ်များ၊ ကျွန်းခရီးစဉ်များနှင့် ယဉ်ကျေးမှု ပြပွဲများအတွက် လူဦးရေများသော ရာသီ (ဒီဇင်ဘာ-ဖေဖော်ဝါရီ) တွင် ၁-၂ ပတ် ကြိုတင် ဘွတ်ကင်လုပ်ရန် အကြံပြုသည်။ ဤသည်သည် သင့်နေရာကို အာမခံပြီး မကြာခဏ စားပွဲချင်းမရှောင်ပဲ ဝင်နိုင်ခွင့်ကို ပါဝင်သည်။"
      },
      "q2": {
        "question": "အီလက်ထရွန်းနစ် လက်မှတ်များကို နေရာများတွင် လက်ခံပါသလား?",
        "answer": "ဟုတ်ကြောင်း၊ Klook ပါတ်နာများ အများစုသည် မိုဘိုင်း အီလက်ထရွန်းနစ် လက်မှတ်များကို လက်ခံသည်။ ဝင်ပေါက်တွင် သင့် QR code ကို ပြရုံဖြင့် လုံလောက်သည်။ နေရာအချို့သည် သတ်မှတ်ထားသော ကောင်တာများတွင် ရရှိနိုင်သော ရုပ်စုံ လက်မှတ်များကို လိုအပ်နိုင်သည်။ သီးသန့် ညွှန်ကြားချက်များအတွက် သင့် ဘွတ်ကင် အတည်ပြုချက်ကို စစ်ဆေးပါ။"
      },
      "q3": {
        "question": "ငါ့ ဘွတ်ကင်ကို ပယ်ဖျက်လိုလျှင် ဘာလုပ်ရမလဲ?",
        "answer": "ပယ်ဖျက်မူဝါဒများသည် နေရာအလိုက် ကွဲပြားသည်။ လက်မှတ်အများစုသည် လှုပ်ရှားမှု မစတင်မီ ၂၄-၄၈ နာရီအထိ အခမဲ့ ပယ်ဖျက်နိုင်သည်။ ဘွတ်ကင်လုပ်မည့်အခါ အမြဲ ပယ်ဖျက်မူဝါဒကို စစ်ဆေးပါ။ ပြန်ပေးချေခြင်းများသည် ယေဘုယျအားဖြင့် သင့် မူရင်း ငွေပေးချေမှု နည်းလမ်းသို့ ပြန်လည် လုပ်ဆောင်သည်။"
      },
      "q4": {
        "question": "နေရာများစွာအတွက် ပေါင်းစပ် လက်မှတ်များ ရှိပါသလား?",
        "answer": "ဟုတ်ကြောင်း၊ ဘန်ကောက် မြို့တော် ခရီးစဉ်များနှင့် ကျွန်း ပက်ကေ့ချ်များကဲ့သို့သော လူကြိုက်များသော နေရာများအတွက် ပေါင်းစပ် ပါ့စ်များ ရရှိနိုင်သည်။ ဤသည်များသည် တစ်ခုချင်း လက်မှတ်များထက် ပိုကောင်းသော တန်ဖိုးကို ပေးတတ်ပြီး နေရာများကြား သယ်ယူပို့ဆောင်ရေနှင့် ပါဝင်သည်။ ကြည့်ရှုသည့်အခါ 'combo' သို့မဟုတ် 'pass' ရွေးချယ်စရာများကို ရှာဖွေပါ။"
      },
      "q5": {
        "question": "နေရာတွင် သို့မဟုတ် အွန်လိုတွင် ဘွတ်ကင်လုပ်ခြင်းသည် ပိုသက်သာပါသလား?",
        "answer": "Klook မှတစ်ဆင့် အွန်လိုင်း ဘွတ်ကင်လုပ်ခြင်းသည် နေရာတွင် စျေးနှုန်းထက် ပျမ်းမျှအားဖြင့် ၁၀-၃၀% ပိုသက်သာသည်။ သင်သည် စားပွဲချင်းမရှောင်ပဲ နေရာရရန် အာမခံနိုင်သည်။ နေရာအချို့သည် တံခါးတွင် မရရှိနိုင်သော သီးသန့် အွန်လိုင်း လျှော့စျေးများနှင့် ထပ်ပေါင်းများကို ပေးသည်။"
      }
    }
  },
  "activities": {
    "title": "ထိုင်းနိုင်ငံရှိ ခရီးစဉ်များနှင့် လှုပ်ရှားမှုများ",
    "intro": "GetYourGuide ဖြင့် ထိုင်းနိုင်ငံတစ်ဝှမ်းရှိ ရွေးချယ်ထားသော ခရီးစဉ်များနှင့် အတွေ့အကြုံများကို ရှာဖွေပါ။ ချီင်းမိုင်ရှိ ဟင်းချက်သင်တန်းများမှ ကရာဘီရှိ ငါးဖမ်းခရီးစဉ်များအထိ ကျွမ်းကျင်သူ လမ်းညွှန်များဖြက် ဦပြည့်သော ဒေသခံ လှုပ်ရှားမှုများကို စူးစမ်းပါ။ ယဉ်ကျေးမှု နက်နဲစွာ နေထိုင်ခြင်း၊ ပွင့်လင်းသော စွန့်စားခရီးစဉ်များ သို့မဟုတ် လျှို့ဝှက်နေရာများကို ရှာဖွေနေပါက သင့်ခရီးစဉ်အတွက် သင့်တော်သော အတွေ့အကြုံကို ရှာဖွေပါ။",
    "continuePlanning": "သင့်ခရီးစဉ်ကို ဆက်လက် စီစဉ်ဆောင်ပါ",
    "faq": {
      "title": "မကြာခဏ မေးလေ့ရှိသော မေးခွန်းများ",
      "q1": {
        "question": "လှုပ်ရှားမှု အမျိုးအစားများ ရှိပါသလား?",
        "answer": "GetYourGuide သည် ယဉ်ကျေးမှု ခရီးစဉ်များ၊ ဟင်းချက်သင်တန်းများ၊ ဇိုင်းလိုင်းနှင့် ကာယာက် စသည့် စွန့်စားလှုပ်ရှားမှုများ၊ ကျွန်းများသို့ တစ်ရက်ခရီးစဉ်များ၊ သမိုင်းဝင်နေရာများသို့ လည်ပတ်ခြင်းနှင့် အစားအသောက် ခရီးစဉ်များ အပါအဝင် ကျယ်ပြန့်သော အမျိုးအစားများကို ပေးသည်။ ရွေးချယ်စရာများသည် မြို့နှင့် ရာသီအလိုက် ကွဲပြားသည်။"
      },
      "q2": {
        "question": "ငါ့ ဘွတ်ကင် အတည်ပြုချက်ကို မည်သို့ ရရှိမည်နည်း?",
        "answer": "ဘွတ်ကင်လုပ်ပြီးနောက် သင်သည် သင့်ဘောက်ချာဖြင့် အီးမေးလ် အတည်ပြုချက်ကို ရရှိမည်ဖြစ်သည်။ လှုပ်ရှားမှုအများစုသည် မိုဘိုင်း ဘောက်ချာများကို လက်ခံသည်—တွေ့ဆုံရာ နေရာတွင် သင့်ဖုန်းကို ပြရုံဖြင့် လုံလောက်သည်။ ခရီးစဉ်အချို့သည် ပုံနှိပ်ထားသော ဘောက်ချာများကို လိုအပ်ပြီး ၎င်းတို့ကို သင့်အတည်ပြုချက်တွင် ရှင်းလင်းဖော်ပြထားလိမ့်မည်။"
      },
      "q3": {
        "question": "ပယ်ဖျက်မူဝါဒမှာ ဘာလဲ?",
        "answer": "ပယ်ဖျက်မူဝါဒများသည် လှုပ်ရှားမှုအလိုက် ကွဲပြားသည်။ ခရီးစဉ်အများစုသည် စတင်မည့်အချိန်မတိုင်မီ ၂၄-၇၂ နာရီအထိ အခမဲ့ ပယ်ဖျက်နိုင်သည်။ ဘွတ်ကင်လုပ်မည့်အခါ အမြဲ လှုပ်ရှားမှု စာမျက်နှာပေါ်ရှိ သီးသန့် မူဝါဒကို စစ်ဆေးပါ။ ပြန်ပေးချေခြင်းများသည် သင့်မူရင်း ငွေပေးချေမှု နည်းလမ်းသို့ လုပ်ဆောင်ပေးလိမ့်မည်။"
      },
      "q4": {
        "question": "ခရီးစဉ်များကို ဘာသာစကားများဖြင့် ရရှိနိုင်ပါသလား?",
        "answer": "ဟုတ်ကြောင်း၊ ခရီးစဉ်အများစုကို အင်္ဂလိပ်၊ တရုတ်၊ ဂျပန်၊ ကိုရီးယား နှင့်ဥရောပ ဘာသာစကားများ အပါအဝင် ဘာသာစကားများစွာဖြင့် ပေးသည်။ ရရှိနိုင်သော ဘာသာစကား ရွေးချယ်စရာများအတွက် လှုပ်ရှားမှု အသေးစိတ်များကို စစ်ဆေးပါ ဘွတ်ကင်လုပ်သည့်အခါ သင်နှစ်သက်သော ဘာသာစကားကို ရွေးချယ်ပါ။"
      },
      "q5": {
        "question": "ငါသည် လှုပ်ရှားမှုများကို ကြိုတင် ဘွတ််ကင်လုပ်သင့်ပါသလား?",
        "answer": "လူကြိုက်များသော အတွေ့အကြုံများနှင့် အုပ်စုသေး ခရီးစဉ်များအတွက် အထူးသဖြင့် လူဦးရေများသော ရာသီ (နိုဝင်ဘာ-ဖေဖော်ဝါရီ) တွင် ၁-၂ ပတ် ကြိုတင် ဘွတ်ကင်လုပ်ရန် အကြံပြုသည်။ ဤသည်သည် ရရန်နိုင်ခြင်းကို အာမခံပြီး မကြာခဏ ပိုကောင်းသော စျေးနှုန်းများကို ပါဝင်သည်။ နောက်ဆုံး မိနစ်ဘွတ်ကင်လုပ်ခြင်းသည် ရွေးချယ်စရာ ကန့်သတ်ချက်ရှိနိုင်သည်။"
      }
    }
  }
},
  ES: {
  "brand": { "name": "ThaiGuide", "subtitle": "Servicios AsiaBuddy" },
  "home": "Inicio",
  "tours": "Tours",
  "destinations": "Destinos",
  "tourPackages": "Paquetes Turísticos",
  "travelBlog": "Blog de Viajes",
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
    "title": "TRANSPORTE Y ALQUILER DE AUTOS",
    "detailsTitle": "Transporte en Tailandia — Para más información",
    "modalTitle": "Guía de Transporte Nacional en Tailandia",
    "modalSubtitle": "Transporte",
    "destinationLabel": "Destino",
    "subtitle": "Personalización Dinámica de Alquiler",
    "emptyState": "Especifique sus criterios de transporte para recibir rutas de reserva personalizadas.",
    "readyToBook": "¿Listo para asegurar los arreglos de transporte?",
    "bookStayButton": "📅 Reservar Vehículo Ahora",
    "noneSelected": "Ninguno seleccionado",
    "suggestions": [],
    "survey": {
      "title": "Encuesta de preferencias de alquiler de autos",
      "analyzing": "Analizando sus requerimientos para encontrar las mejores opciones...",
      "buttons": {
        "next": "Siguiente",
        "back": "Atrás",
        "submit": "Enviar",
        "skip": "Omitir"
      },
      "questions": {
        "rental_type": {
          "question": "¿Qué tipo de alquiler de auto prefiere?",
          "options": ["Sin chofer (Self-Drive)", "Con chofer (Chófer privado)"]
        },
        "pickup_city": {
          "question": "¿En qué ciudad le gustaría recoger el auto?",
          "options": ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Koh Samui"]
        },
        "duration_days": {
          "question": "¿Cuántos días desea alquilar el auto?",
          "placeholder": "Ingrese el número de días (ej. 5)"
        },
        "passengers_luggage": {
          "question": "¿Cuántos pasajeros y equipaje llevan?",
          "options": [
            "1-3 Pasajeros (Menos de 2 maletas grandes)",
            "4-5 Pasajeros (2-3 maletas grandes)",
            "6-9 Pasajeros (4 o más maletas grandes)"
          ]
        },
        "car_class": {
          "question": "¿Qué estilo de vehículo se adapta mejor a su viaje?",
          "options": ["Compacto", "Sedán estándar", "SUV familiar", "Sedán de lujo", "Van VIP (9 asientos)"]
        },
        "self_drive_license": {
          "question": "¿Tiene un Permiso Internacional de Conducir (IDP) o licencia de conducir tailandesa vigente?",
          "options": ["Sí, lo tengo", "No, no lo tengo"]
        },
        "self_drive_deposit": {
          "question": "¿Acepta realizar el depósito de garantía reembolsable (generalmente mediante retención en tarjeta de crédito)?",
          "options": ["Sí, acepto", "No, no acepto"]
        },
        "driver_hours": {
          "question": "¿Qué duración de conducción diaria necesita?",
          "options": [
            "Medio día (Hasta 5 horas)",
            "Día completo (Hasta 10-12 horas)",
            "Solo traslado ida/vuelta al aeropuerto"
          ]
        },
        "driver_language": {
          "question": "¿Qué idioma prefiere que hable el chofer?",
          "options": ["Solo tailandés", "Inglés básico y tailandés", "Birmano y tailandés"]
        },
        "addons": {
          "question": "Seleccione los adicionales requeridos (Selección múltiple):",
          "options": ["Asiento de seguridad infantil", "Navegador GPS", "Seguro premium sin franquicia", "Registro de conductor adicional"]
        },
        "pickup_date": {
          "question": "Especifique la fecha o mes tentativo de inicio del alquiler:",
          "placeholder": "Ej: 15 de octubre, o mediados de diciembre"
        }
      }
    }
  },
  "vatRefund": {
    "title": "Guía de Reembolso de IVA",
    "description": "Gasto mín. 2,000 THB. Busque señales.",
    "link": "Reembolso de IVA"
  },
  "visa": {
    "title": "Info de Visa",
    "modalTitle": "Guía de Visa para Tailandia",
    "modalSubtitle": "Información de visa",
    "description": "Verifique su estado.",
    "link": "Información de Visa"
  },
  "travelTypes": {
    "title": "Tipos de viaje",
    "modalTitle": "Guía de Estilos de Viaje",
    "modalSubtitle": "Estilos de viaje y planificador",
    "link": "Estilos de Viaje"
  },
  "budget": "Consejos de presupuesto",
  "budgetModalTitle": "Guía de Presupuesto de Tailandia",
  "budgetSubtitle": "Consejos inteligentes para viajeros",
  "learnMore": "Más información",
  "accommodation": {
    title: "ASISTENTE DE ALOJAMIENTO",
    modalTitle: "Guía Integral de Alojamientos en Tailandia",
    detailsTitle: "Alojamientos",
    subtitle: "Personalización Dinámica de Estancia",
    emptyState: "Responda las preguntas a continuación para obtener recomendaciones personalizadas.",
    readyToBook: "¿Listo para asegurar los arreglos?",
    bookStayButton: "📅 Reservar Estancia Ahora",
    noneSelected: "Ninguno seleccionado",
    suggestions: [],
    survey: {
      title: "Encuesta de preferencias de alojamiento",
      analyzing: "Analizando sus preferencias para encontrar la estancia perfecta...",
      buttons: {
        next: "Siguiente",
        back: "Atrás",
        submit: "Enviar",
        skip: "Omitir"
      },
      questions: {
        city: {
          question: "¿En qué ciudad le gustaría hospedarse?",
          options: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Ayutthaya", "Koh Samui"]
        },
        nights: {
          question: "¿Cuántas noches planea quedarse?",
          placeholder: "Ingrese el número de noches (ej. 5)"
        },
        area_general: {
          question: "¿En qué tipo de zona le gustaría hospedarse?",
          options: ["Centro de la ciudad / Zona comercial", "Frente al mar / Costero", "Tranquilo / Naturaleza", "Histórico / Cultural"]
        },
        budget: {
          question: "¿Cuál es su presupuesto por noche?",
          options: ["Económico: Menos de $30", "Gama media: $30 - $100", "Lujo: $100 - $250", "Ultra lujo: $250+"]
        },
        type: {
          question: "¿Qué tipo de alojamiento prefiere?",
          options: ["Hotel", "Resort", "Hostal", "Casa de huéspedes", "Villa / Departamento"]
        },
        stars: {
          question: "¿Qué categoría de estrellas prefiere?",
          options: ["1-2 Estrellas", "3 Estrellas", "4 Estrellas", "5 Estrellas / Lujo", "Sin preferencia"]
        },
        bangkok_vibe: {
          question: "¿Qué zona de Bangkok se adapta mejor a su estilo?",
          options: [
            "Sukhumvit (Compras y vida nocturna)",
            "Siam/Pratunam (Compras familiares y mercados)",
            "Silom/Sathorn (Negocios y alta cocina)",
            "Riverside (Lujo y visitas culturales)"
          ]
        },
        phuket_beach: {
          question: "¿Qué tipo de ambiente de playa prefiere en Phuket?",
          options: [
            "Patong (Vida nocturna y playa concurrida)",
            "Kata / Karon (Familiar y surf)",
            "Bangtao / Laguna (Resorts de lujo y tranquilidad)",
            "Phuket Old Town (Cultura y cafés - sin playa)"
          ]
        },
        transit_proximity: {
          question: "¿Qué tan importante es hospedarse a poca distancia del BTS (Skytrain) o del MRT (Metro)?",
          options: [
            "Indispensable (menos de 5 minutos a pie)",
            "Sería bueno, pero no determinante",
            "No es importante (planeo usar minivan privada o taxi)"
          ]
        },
        beach_proximity: {
          question: "¿Cuál es su proximidad preferida a la beach?",
          options: [
            "Primera línea de playa (sin calles que cruzar)",
            "A poca distancia a pie (menos de 10 minutos)",
            "No me importa ir en auto o usar transporte del hotel"
          ]
        },
        airport_pickup: {
          question: "¿Le gustaría que organicemos un traslado privado desde el aeropuerto hasta su alojamiento?",
          options: [
            "Sí, por favor cotícenme un auto/van privado.",
            "No, me trasladaré por mi cuenta en taxi/Grab."
          ]
        },
        guests: {
          question: "¿Cuántos huéspedes viajan?",
          placeholder: "Ingrese el número de huéspedes (ej. 2 adultos, 1 niño)"
        },
        room_type: {
          question: "What room type fits you best?",
          options: ["Habitación estándar / básica", "Habitación Deluxe / Superior", "Suite", "Habitación familiar", "Cama en dormitorio compartido"]
        },
        amenities: {
          question: "Seleccione los servicios requeridos (Selección múltiple):",
          options: ["Wi-Fi gratis", "Piscina", "Gimnasio", "Aire acondicionado", "Desayuno incluido", "Spa y bienestar"]
        },
        checkin_date: {
          question: "Especifique su fecha o mes tentativo de llegada:",
          placeholder: "Ej: 15 de octubre, o mediados de diciembre"
        }
      }
    }
  },
  "carRental": {
    title: "ASISTENTE DE ALQUILER DE COCHES",
    modalTitle: "Guía Integral de Alquiler de Coches en Tailandia",
    detailsTitle: "Alquiler de Coches",
    subtitle: "Personalización Dinámica de Alquiler",
    emptyState: "Responda las preguntas a continuación para obtener recomendaciones personalizadas.",
    readyToBook: "¿Listo para asegurar los arreglos?",
    bookStayButton: "🚗 Reservar Coche Ahora",
    noneSelected: "Ninguno seleccionado",
    suggestions: [],
    survey: {
      title: "Encuesta de preferencias de alquiler de coches",
      analyzing: "Analizando sus preferencias para encontrar el alquiler perfecto...",
      buttons: {
        next: "Siguiente",
        back: "Atrás",
        submit: "Enviar",
        skip: "Omitir"
      },
      questions: {
        rental_type: {
          question: "¿Prefiere conducir usted mismo o contratar un conductor?",
          options: ["Conducir yo mismo (Self-Drive)", "Con conductor (Servicio de chófer)"]
        },
        pickup_location: {
          question: "¿Dónde le gustaría recoger el coche?",
          placeholder: "Ingrese lugar de recogida (ej. Aeropuerto Suvarnabhumi, Centro de Bangkok)"
        },
        dropoff_location: {
          question: "¿Dónde le gustaría devolver el coche?",
          placeholder: "Ingrese lugar de devolución (ej. Aeropuerto de Phuket, Hotel)"
        },
        rental_dates: {
          question: "¿Cuáles son sus fechas de alquiler?",
          placeholder: "Ingrese fechas (ej. 15-20 de diciembre, 2026)"
        },
        vehicle_type: {
          question: "¿Qué tipo de vehículo prefiere?",
          options: ["Coche económico", "SUV / 4WD", "Coche de lujo", "Furgoneta / Minibus"]
        },
        driver_age: {
          question: "¿Cuál es la edad del conductor principal?",
          placeholder: "Ingrese edad del conductor (ej. 30)"
        },
        driver_license: {
          question: "¿Tiene un permiso de conducción internacional válido?",
          options: ["Sí, tengo un IDP", "No, solo tengo un permiso local", "Necesito ayuda con esto"]
        },
        driver_language: {
          question: "¿Qué idioma debería hablar el conductor? (Selección múltiple)",
          options: ["Inglés", "Tailandés", "Chino", "Japonés", "Coreano"]
        },
        additional_services: {
          question: "Seleccione servicios adicionales necesarios (Selección múltiple):",
          options: ["Navegación GPS", "Silla para niños", "Seguro completo", "Recogida en aeropuerto", "Soporte 24/7"]
        },
        budget: {
          question: "¿Cuál es su presupuesto diario?",
          options: ["Económico: Menos de $30/día", "Gama media: $30 - $80/día", "Lujo: $80 - $150/día", "Premium: $150+/día"]
        },
        special_requests: {
          question: "¿Alguna solicitud especial o requisito?",
          placeholder: "Ingrese solicitudes especiales (ej. conductor vegetariano, ruta específica)"
        }
      }
    }
  },
  "tripPlanner": {
    header: "Planificador de viajes automatizado",
    subHeader: "Planifiquemos su viaje perfecto por Tailandia paso a paso",
    q1: "¿Qué destinos le interesan? (p. ej., Bangkok, Phuket, Chiang Mai)",
    q2: "¿Cuánto dura su viaje? (p. ej., 5 días y 4 noches)",
    q3: "¿Cuántas personas viajan?",
    adults: "Adultos",
    infants: "Niños pequeños",
    q4: "¿Qué tipo de alojamiento prefiere?",
    accOptions: ["Hotel", "Casa de huéspedes", "Hostal", "Sin preferencia"],
    q5: "¿Cuál es su nivel de presupuesto?",
    budgetOptions: ["Económico", "Rango medio", "Lujo"],
    q6: "¿Cuál es su interés principal?",
    interestOptions: ["Cultura/Templos", "Playas/Islas", "Compras", "Comida", "Aventura"],
    q7: "¿Tiene algún requisito especial? (p. ej., comida halal, acceso para sillas de ruedas, viajar con mascotas)",
    next: "Siguiente",
    submit: "Generar plan",
    restart: "Empezar de nuevo",
    generating: "Elaborando su itinerario personalizado..."
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
    "travelerTips": "Consejos para Viajeros",
    "phrasesChatIntro": "Pregunta cualquier cosa sobre frases y lenguaje tailandés.",
    "phrasesFooter": "Traducciones y Fonética impulsadas por AsiaBuddy AI",
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
    "safe": "¡Buen viaje!",
    "bookNow": "Reservar Ahora",
    "bookNowSubtitle": "Conectar con un Operador Humano",
    "action": "Reservar Ahora",
    "aiBusyFallback": "Nuestro asistente de IA está temporalmente ocupado. Toque 'Reservar Ahora' para chatear directamente con nuestro equipo.",
    "bookNowCta": "Reservar Ahora",
    "surveyProgressLabel": "Progreso de la encuesta",
    "resetChatTitle": "Restablecer chat",
    "resetButtonLabel": "Restablecer"
  },
  "destinationTabs": {
    "mustVisit": "Lugares imprescindibles",
    "dining": "Restaurantes",
    "experiences": "Experiencias",
    "activities": "Actividades",
    "hiddenGems": "Joyas ocultas"
  },
  "essentialGuides": {
    "sectionTitle": "GUÍAS ESENCIALES",
    "learnMore": "Más información",
    "cards": {
      "generalInfo": "Información general",
      "travelTypes": "Tipos de viaje",
      "visaInfo": "Información de visa",
      "transport": "Transporte",
      "accommodation": "Alojamiento",
      "foodDining": "Comida y cena",
      "cultureEtiquette": "Cultura y etiqueta",
      "budgetTips": "Consejos de presupuesto"
    }
  },
  "about": {
    "ourStory": "Nuestra historia",
    "heroTitle1": "Viaja de forma más inteligente.",
    "heroTitle2": "Explora más a fondo.",
    "heroSubtitle": "AsiaBuddy es tu compañero de viaje inteligente para el Sudeste Asiático — diseñado para viajeros que desean explorar con confianza, moverse libremente y vivir experiencias auténticas.",
    "aboutLabel": "Sobre nosotros",
    "aboutHeading": "Cerramos la brecha entre tú y Asia.",
    "aboutP1": "Sabemos lo que se siente al aterrizar en una ciudad desconocida sin un guía de confianza — confundido por las señales, inseguro sobre el transporte, abrumado por las opciones. Ese sentimiento es exactamente lo que AsiaBuddy fue creado para eliminar.",
    "aboutP2": "Nuestra plataforma combina una profunda experiencia local con asistencia impulsada por IA en temas de cultura, transporte, gastronomía, alojamiento y presupuesto — todo en tu idioma, disponible las 24 horas del día.",
    "stat1": "Idiomas compatibles",
    "stat2": "Conserje de IA",
    "stat3": "Destinos en Tailandia",
    "stat4": "De uso gratuito",
    "visionLabel": "Visión y misión",
    "visionTitle": "Nuestra visión",
    "visionText": "Convertirnos en el compañero de viaje más confiable para cada viajero que llega a Asia — eliminando las barreras del idioma, simplificando las decisiones y transformando cada viaje en una experiencia segura y alegre.",
    "missionTitle": "Nuestra misión",
    "missionText": "Ofrecer asistencia de viaje gratuita, multilingüe e impulsada por IA que empodere a cada viajero — independientemente de su presupuesto o procedencia — a explorar Asia de manera segura, inteligente e inolvidable.",
    "teamLabel": "Nuestro equipo",
    "teamText": "Somos un equipo apasionado de viajeros y tecnólogos establecidos en",
    "teamLocations": "Alemania, el Reino Unido, Tailandia y Myanmar",
    "teamText2": "unidos por un solo objetivo: hacer que Asia sea accesible para todos.",
    "ctaTitle": "¿Listo para explorar Asia con confianza?",
    "ctaSubtitle": "Únete a miles de viajeros que confían en AsiaBuddy como su compañero en todo el Sudeste Asiático.",
    "ctaButton": "Comenzar a explorar Tailandia"
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
    "subtitle": "Asesor Culinario Tailandés",
    "suggestionsLabel": "Consultas de Comida Comunes",
    "detailsTitle": "Guía de Comida de Tailandia",
    "guideLink": "Guía de Comida de Tailandia — Para más información",
    "modalTitle": "Guía de Comida",
    "modalSubtitle": "Cocina Local & Seguridad Gastronómica",
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
  },
  "serviceCards": {
    "bookNow": "Reservar Ahora",
    "viewFlight": "Ver Vuelo",
    "bookTransfer": "Reservar Transfer",
    "reserveCar": "Reservar Coche",
    "getTickets": "Obtener Entradas",
    "freeCancellation": "Cancelación Gratuita",
    "skipTheLine": "Saltar Fila",
    "instantConfirmation": "Confirmación Instantánea",
    "perNight": "/noche",
    "perDay": "/día",
    "perPerson": "/persona",
    "priceChecked": "Precio verificado",
    "minDriverAge": "Edad mínima del conductor"
  },
  "activitiesPage": {
    "breadcrumb": "Inicio",
    "breadcrumbActivities": "Actividades",
    "backTo": "Volver a",
    "decorativeLabel": "Experiencias",
    "title": "Actividades",
    "subtitle": "Descubre experiencias increíbles y reserva a través de nuestros socios de confianza",
    "statCurated": "✦ Actividades Curadas",
    "statBestPrices": "✦ Mejores Precios",
    "statInstantBooking": "✦ Reserva Instantánea",
    "sectionLabel": "Experiencias Disponibles",
    "sectionTitle": "Explorar Actividades",
    "activitiesAvailable": "{count} {count, plural, one {actividad} other {actividades}} disponibles",
    "emptyStateTitle": "Actividades Próximamente",
    "emptyStateDescription": "Estamos curando experiencias increíbles para ti. ¡Vuelve pronto!",
    "filterAllCities": "Todas las Ciudades",
    "filterNoActivities": "No se encontraron actividades",
    "filterNoActivitiesDescription": "Intenta seleccionar otra ciudad o ver todas las actividades"
  },
  "servicesStrip": {
    "hotel": "Hotel",
    "flight": "Vuelo",
    "transfer": "Traslado",
    "tickets": "Entradas",
    "carRental": "Alquiler de Coche"
  },
  "servicesPage": {
    "comingSoonTitle": "Próximamente",
    "comingSoonMessage": "Estamos trabajando duro para brindarte los mejores servicios de viaje.",
    "servicesList": "Hotel • Vuelo • Entradas • Traslado • Alquiler de Coche • Tours",
    "backToHome": "Volver al Inicio",
    "chatNote": "Para reservas y consultas, usa nuestro Chat de Soporte en Vivo en la página de inicio."
  },
  "flights": {
    "title": "Vuelos a Tailandia",
    "intro": "Reserva tu vuelo a Tailandia con facilidad. La mayoría de los vuelos internacionales llegan al Aeropuerto Suvarnabhumi (BKK) o al Aeropuerto Don Mueang (DMK) en Bangkok. Para los mejores precios, reserva con 2-3 meses de anticipación y verifica los requisitos de visa antes de viajar.",
    "visaLinkText": "Ver requisitos de visa",
    "searchSpecificDates": "Buscar Fechas Específicas",
    "flexibleDates": "Fechas Flexibles — Encontrar Más Barato",
    "continuePlanning": "Continúa Planeando Tu Viaje",
    "faq": {
      "title": "Preguntas Frecuentes",
      "q1": {
        "question": "¿Cuánto dura un vuelo directo a Bangkok?",
        "answer": "Los vuelos directos a Bangkok desde principales hubs asiáticos suelen durar 2-4 horas. Desde Europa, los vuelos directos duran 11-13 horas. Desde América del Norte, espera 15-20 horas con escala."
      },
      "q2": {
        "question": "¿Qué aerolíneas vuelan a Tailandia?",
        "answer": "Las principales aerolíneas internacionales como Thai Airways, Singapore Airlines, Emirates, Qatar Airways y Cathay Pacific sirven a Bangkok. Las aerolíneas de bajo costo como AirAsia y Nok Air también ofrecen conexiones regionales."
      },
      "q3": {
        "question": "¿Necesito visa a la llegada?",
        "answer": "Los requisitos de visa dependen de tu nacionalidad. Muchos países reciben exención de visa de 30 días, mientras que otros pueden necesitar solicitarla con anticipación. Consulta nuestra guía de visa para los requisitos más recientes."
      },
      "q4": {
        "question": "¿En qué aeropuerto debería volar?",
        "answer": "Suvarnabhumi (BKK) maneja la mayoría de vuelos internacionales y está conectado a la ciudad por el Airport Rail Link. Don Mueang (DMK) sirve a aerolíneas de bajo costo y vuelos domésticos, también con buenas conexiones de transporte."
      },
      "q5": {
        "question": "¿Cuál es el mejor momento para reservar vuelos?",
        "answer": "Para las mejores tarifas, reserva con 2-3 meses de anticipación para temporadas altas (diciembre-febrero). Las temporadas intermedias (marzo-mayo, septiembre-noviembre) a menudo ofrecen mejores precios y menos multitudes."
      }
    }
  },
  "hotels": {
    "title": "Hoteles en Tailandia",
    "intro": "Encuentra el lugar perfecto para quedarse en Tailandia. Las opciones económicas comienzan alrededor de 500-1,000 THB por noche para guesthouses, mientras que los hoteles de gama media oscilan entre 1,500-4,000 THB. Las áreas populares incluyen Sukhumvit en Bangkok para vida nocturna y compras, Patong en Phuket para acceso a la playa, y la Ciudad Vieja en Chiang Mai para cultura. Reserva con anticipación durante la temporada alta (diciembre-febrero) para las mejores tarifas y disponibilidad.",
    "continuePlanning": "Continúa Planeando Tu Viaje",
    "faq": {
      "title": "Preguntas Frecuentes",
      "q1": {
        "question": "¿Cuál es la mejor área para quedarse en Bangkok?",
        "answer": "Sukhumvit es ideal para vida nocturna y compras con fácil acceso al BTS. Siam/Pratunam ofrece compras familiares y mercados. Silom/Sathorn es el distrito financiero con restaurantes de alta gama. Riverside ofrece hoteles de lujo con sitios culturales cercanos."
      },
      "q2": {
        "question": "¿Necesito reservar con anticipación durante la temporada alta?",
        "answer": "Sí, se recomienda reservar 2-3 meses antes para la temporada alta (diciembre-febrero), especialmente en destinos populares como Phuket, Krabi y Chiang Mai. Las temporadas intermedias ofrecen mejores tarifas y más disponibilidad con ventanas de reserva más cortas."
      },
      "q3": {
        "question": "¿Es seguro reservar directamente vs a través de un agente?",
        "answer": "Ambas opciones son generalmente seguras. Reservar directamente con hoteles a veces puede ofrecer mejores tarifas o cancelación flexible. Los agentes de confianza ofrecen paquetes y soporte local. Siempre verifica reseñas y políticas de cancelación independientemente del método de reserva."
      },
      "q4": {
        "question": "¿Cuál es el rango de presupuesto típico por noche?",
        "answer": "Guesthouses y hostales económicos: 500-1,500 THB ($15-45). Hoteles de gama media: 1,500-4,000 THB ($45-120). Resorts de lujo: 4,000-10,000+ THB ($120-300+). Los precios varían significativamente por ubicación y temporada."
      },
      "q5": {
        "question": "¿Vale la pena el costo extra de los hoteles frente a la playa?",
        "answer": "Las propiedades frente a la playa ofrecen conveniencia y vistas pero tienen precios premium. Los hoteles a distancia caminable (5-10 minutos) a menudo ofrecen mejor valor. Considera cuánto tiempo pasarás en la playa versus explorar otras atracciones al decidir."
      }
    }
  },
  "tickets": {
    "title": "Entradas y Actividades en Tailandia",
    "intro": "Reserva entradas y actividades en toda Tailandia con confirmación instantánea a través de Klook. Desde tours de templos en Bangkok hasta excursiones isleñas en Phuket, evita las filas y asegura tu lugar con anticipación. Las experiencias populares incluyen espectáculos culturales, tours de aventura y pases de atracciones. Reservar con anticipación garantiza disponibilidad y a menudo incluye descuentos exclusivos.",
    "continuePlanning": "Continúa Planeando Tu Viaje",
    "faq": {
      "title": "Preguntas Frecuentes",
      "q1": {
        "question": "¿Necesito reservar entradas con anticipación?",
        "answer": "Para atracciones populares como tours del Gran Palacio, excursiones isleñas y espectáculos culturales, se recomienda reservar 1-2 semanas antes, especialmente durante la temporada alta (diciembre-febrero). Esto garantiza tu lugar y a menudo incluye acceso sin filas."
      },
      "q2": {
        "question": "¿Se aceptan e-tickets en las atracciones?",
        "answer": "Sí, la mayoría de los socios de Klook aceptan e-tickets móviles. Simplemente muestra tu código QR en la entrada. Algunas atracciones pueden requerir tickets físicos que se pueden recoger en mostradores designados. Verifica tu confirmación de reserva para instrucciones específicas."
      },
      "q3": {
        "question": "¿Qué pasa si necesito cancelar mi reserva?",
        "answer": "Las políticas de cancelación varían por atracción. Muchas entradas ofrecen cancelación gratuita hasta 24-48 horas antes de la actividad. Siempre revisa la política de cancelación antes de reservar. Los reembolsos generalmente se procesan de vuelta a tu método de pago original."
      },
      "q4": {
        "question": "¿Hay entradas combinadas para múltiples atracciones?",
        "answer": "Sí, hay pases combinados disponibles para destinos populares como tours de la ciudad de Bangkok y paquetes isleños. Estos a menudo ofrecen mejor valor que las entradas individuales e incluyen transporte entre atracciones. Busca opciones de 'combo' o 'pase' al navegar."
      },
      "q5": {
        "question": "¿Es más barato reservar en el sitio o en línea?",
        "answer": "La reserva en línea a través de Klook es típicamente 10-30% más barata que los precios en el sitio. También evitarás las filas y garantizarás disponibilidad. Algunas atracciones ofrecen descuentos en línea exclusivos y complementos no disponibles en la puerta."
      }
    }
  },
  "activities": {
    "title": "Tours y Actividades en Tailandia",
    "intro": "Descubre tours y experiencias curadas en toda Tailandia con GetYourGuide. Desde clases de cocina en Chiang Mai hasta aventuras de snorkel en Krabi, explora actividades locales auténticas guiadas por expertos. Ya sea que busques inmersión cultural, aventuras al aire libre o joyas ocultas, encuentra la experiencia perfecta para tu viaje.",
    "continuePlanning": "Continúa Planeando Tu Viaje",
    "faq": {
      "title": "Preguntas Frecuentes",
      "q1": {
        "question": "¿Qué tipos de actividades están disponibles?",
        "answer": "GetYourGuide ofrece una amplia gama que incluye tours culturales, clases de cocina, actividades de aventura como tirolina y kayak, excursiones de un día a islas, visitas a sitios históricos y tours gastronómicos. Las opciones varían por ciudad y temporada."
      },
      "q2": {
        "question": "¿Cómo recibo mi confirmación de reserva?",
        "answer": "Después de reservar, recibirás un correo electrónico de confirmación con tu voucher. La mayoría de las actividades aceptan vouchers móviles—simplemente muestra tu teléfono en el punto de encuentro. Algunos tours requieren vouchers impresos, lo que se indicará claramente en tu confirmación."
      },
      "q3": {
        "question": "¿Cuál es la política de cancelación?",
        "answer": "Las políticas de cancelación varían según la actividad. Muchos tours ofrecen cancelación gratuita hasta 24-72 horas antes de la hora de inicio. Siempre verifica la política específica en la página de la actividad antes de reservar. Los reembolsos se procesan a tu método de pago original."
      },
      "q4": {
        "question": "¿Hay tours disponibles en diferentes idiomas?",
        "answer": "Sí, muchos tours se ofrecen en múltiples idiomas incluyendo inglés, chino, japonés, coreano y idiomas europeos. Verifica los detalles de la actividad para las opciones de idioma disponibles y selecciona tu idioma preferido al reservar."
      },
      "q5": {
        "question": "¿Debo reservar actividades con anticipación?",
        "answer": "Para experiencias populares y tours de grupos pequeños, se recomienda reservar 1-2 semanas antes, especialmente durante temporada alta (noviembre-febrero). Esto garantiza disponibilidad y a menudo incluye mejores precios. Las reservas de última hora pueden tener opciones limitadas."
      }
    }
  }
},
  FR: {
  "brand": { "name": "ThaiGuide", "subtitle": "Services AsiaBuddy" },
  "home": "Accueil",
  "tours": "Circuits",
  "destinations": "Destinations",
  "tourPackages": "Forfaits Touristiques",
  "travelBlog": "Blog Voyage",
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
    "title": "TRANSPORT & LOCATION DE VOITURE",
    "detailsTitle": "Transport en Thaïlande — Pour plus d'informations",
    "modalTitle": "Guide national des transports en Thaïlande",
    "modalSubtitle": "Transport",
    "destinationLabel": "Destination",
    "subtitle": "Personnalisation Dynamique de Location",
    "emptyState": "Spécifiez vos critères de transport pour recevoir des itinéraires de réservation personnalisés.",
    "readyToBook": "Prêt à sécuriser les arrangements de transport?",
    "bookStayButton": "📅 Réserver le Véhicule Maintenant",
    "noneSelected": "Aucune sélection",
    "suggestions": [],
    "survey": {
      "title": "Enquête sur les préférences de location de voiture",
      "analyzing": "Analyse de vos besoins pour vous proposer la meilleure offre...",
      "buttons": {
        "next": "Suivant",
        "back": "Retour",
        "submit": "Envoyer la demande",
        "skip": "Passer"
      },
      "questions": {
        "rental_type": {
          "question": "Quelle option de location préférez-vous ?",
          "options": ["Sans chauffeur (Autonomie)", "Avec chauffeur"]
        },
        "pickup_city": {
          "question": "Dans quelle ville souhaitez-vous récupérer la voiture ?",
          "options": ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Koh Samui"]
        },
        "duration_days": {
          "question": "Combien de jours souhaitez-vous louer la voiture ?",
          "placeholder": "Entrez le nombre de jours (ex. : 5)"
        },
        "passengers_luggage": {
          "question": "Combien de passagers et de bagages prévoyez-vous ?",
          "options": [
            "1 à 3 passagers (Moins de 2 grands sacs)",
            "4 à 5 passagers (2 à 3 grands sacs)",
            "6 à 9 passagers (4 grands sacs ou plus)"
          ]
        },
        "car_class": {
          "question": "Quel type de véhicule correspond le mieux à votre voyage ?",
          "options": ["Citadine compacte", "Berline standard", "SUV familial", "Berline de luxe", "Van VIP (9 places)"]
        },
        "self_drive_license": {
          "question": "Détenez-vous un permis de conduire international (PCI) ou un permis thaïlandais ?",
          "options": ["Oui, j'en possède un", "Non, je n'en ai pas"]
        },
        "self_drive_deposit": {
          "question": "Acceptez-vous le dépôt de garantie remboursable (généralement via empreinte de carte de crédit) ?",
          "options": ["Oui, j'accepte", "Non, je refuse"]
        },
        "driver_hours": {
          "question": "De quelle durée de conduite quotidienne avez-vous besoin ?",
          "options": [
            "Demi-journée (Jusqu'à 5 heures)",
            "Journée complète (Jusqu'à 10-12 heures)",
            "Transfert aéroport simple uniquement"
          ]
        },
        "driver_language": {
          "question": "Quelle langue préférez-vous que votre chauffeur parle ?",
          "options": ["Thaïlandais uniquement", "Anglais de base & Thaïlandais", "Birman & Thaïlandais"]
        },
        "addons": {
          "question": "Sélectionnez les options souhaitées (Choix multiples) :",
          "options": ["Siège de sécurité enfant", "GPS de navigation", "Assurance tous risques sans franchise", "Conducteur additionnel"]
        },
        "pickup_date": {
          "question": "Veuillez préciser la date ou le mois de début de la location :",
          "placeholder": "Ex. : 15 octobre, ou mi-décembre"
        }
      }
    }
  },
  "vatRefund": {
    "title": "Guide de Remboursement TVA",
    "description": "Dépense min. 2 000 THB. Cherchez les panneaux.",
    "link": "Remboursement TVA"
  },
  "visa": {
    "title": "Infos Visa",
    "modalTitle": "Guide des Visas pour la Thaïlande",
    "modalSubtitle": "Informations sur le visa",
    "description": "Vérifiez votre statut.",
    "link": "Informations Visa"
  },
  "travelTypes": {
    "title": "Types de voyage",
    "modalTitle": "Guide des Styles de Voyage",
    "modalSubtitle": "Styles de voyage et planificateur",
    "link": "Styles de Voyage"
  },
  "budget": "Conseils budgétaires",
  "budgetModalTitle": "Guide Budget de la Thaïlande",
  "budgetSubtitle": "Conseils de voyage intelligents",
  "learnMore": "En savoir plus",
  "accommodation": {
    title: "ASSISTANT HÉBERGEMENT",
    modalTitle: "Guide Complet des Hébergements en Thaïlande",
    detailsTitle: "Hébergements",
    subtitle: "Personnalisation Dynamique du Séjour",
    emptyState: "Répondez aux questions ci-dessous pour obtenir des recommandations personnalisées.",
    readyToBook: "Prêt à sécuriser les arrangements?",
    bookStayButton: "📅 Réserver le Séjour Maintenant",
    noneSelected: "Aucune sélection",
    suggestions: [],
    survey: {
      title: "Enquête sur les préférences d'hébergement",
      analyzing: "Analyse de vos préférences pour trouver le séjour parfait...",
      buttons: {
        next: "Suivant",
        back: "Retour",
        submit: "Envoyer",
        skip: "Passer"
      },
      questions: {
        city: {
          question: "Dans quelle ville souhaitez-vous séjourner ?",
          options: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Ayutthaya", "Koh Samui"]
        },
        nights: {
          question: "Combien de nuits souhaitez-vous séjourner ?",
          placeholder: "Entrez le nombre de nuits (ex. : 5)"
        },
        area_general: {
          question: "Dans quel type de quartier souhaitez-vous séjourner ?",
          options: ["Centre-ville / Quartier animé", "Bord de mer / Côte", "Calme / Nature", "Historique / Culturel"]
        },
        budget: {
          question: "Quel est votre budget par nuit ?",
          options: ["Économique : Moins de 30 $", "Intermédiaire : 30 $ - 100 $", "Luxe : 100 $ - 250 $", "Très haut de gamme : 250 $ et plus"]
        },
        type: {
          question: "Quel type d'hébergement préférez-vous ?",
          options: ["Hôtel", "Complexe hôtelier (Resort)", "Auberge de jeunesse", "Maison d'hôtes", "Villa / Appartement"]
        },
        stars: {
          question: "Quelle catégorie d'étoiles préférez-vous ?",
          options: ["1-2 Étoiles", "3 Étoiles", "4 Étoiles", "5 Étoiles / Grand luxe", "Pas de préférence"]
        },
        bangkok_vibe: {
          question: "Quel quartier correspond le mieux à vos attentes à Bangkok ?",
          options: [
            "Sukhumvit (Shopping & Vie nocturne)",
            "Siam/Pratunam (Shopping familial & Marchés)",
            "Silom/Sathorn (Affaires & Restaurants gastronomiques)",
            "Riverside (Luxe & Visites culturelles)"
          ]
        },
        phuket_beach: {
          question: "Quel type d'ambiance de plage préférez-vous à Phuket ?",
          options: [
            "Patong (Vie nocturne & Plage animée)",
            "Kata / Karon (Idéal pour les familles & Surf)",
            "Bangtao / Laguna (Complexes de luxe & Plus calme)",
            "Phuket Old Town (Culture & Cafés - Pas de plage)"
          ]
        },
        transit_proximity: {
          question: "Quelle est l'importance de séjourner à distance de marche du BTS (Skytrain) ou du MRT (Métro) ?",
          options: [
            "Indispensable (à moins de 5 minutes à pied)",
            "Appréciable, mais pas indispensable",
            "Pas important (prévision de déplacements en van privé ou taxi)"
          ]
        },
        beach_proximity: {
          question: "Quelle est votre proximité préférée de la plage ?",
          options: [
            "Accès direct à la plage (pas de route à traverser)",
            "À distance de marche (moins de 10 minutes)",
            "Pas de problème pour utiliser une voiture ou une navette"
          ]
        },
        airport_pickup: {
          question: "Souhaitez-vous que nous organisions un transfert privé depuis l'aéroport vers votre hébergement ?",
          options: [
            "Oui, merci de m'envoyer un devis pour une voiture/un van privé.",
            "Non, je me déplacerai par mes propres moyens en taxi/Grab."
          ]
        },
        guests: {
          question: "Combien de personnes voyagent ?",
          placeholder: "Entrez le nombre de voyageurs (ex. : 2 adultes, 1 enfant)"
        },
        room_type: {
          question: "Quel type de chambre vous convient le mieux ?",
          options: ["Chambre standard", "Chambre Deluxe / Supérieure", "Suite", "Chambre familiale", "Lit en dortoir partagé"]
        },
        amenities: {
          question: "Sélectionnez les équipements requis (Choix multiples) :",
          options: ["Wi-Fi gratuit", "Piscine", "Salle de sport", "Climatisation", "Petit-déjeuner inclus", "Spa et massages"]
        },
        checkin_date: {
          question: "Veuillez préciser votre date ou mois d'arrivée provisoire :",
          placeholder: "Ex. : 15 octobre, ou mi-décembre"
        }
      }
    }
  },
  "carRental": {
    title: "ASSISTANT LOCATION DE VOITURE",
    modalTitle: "Guide Complet de Location de Voitures en Thaïlande",
    detailsTitle: "Location de Voitures",
    subtitle: "Personnalisation Dynamique de Location",
    emptyState: "Répondez aux questions ci-dessous pour obtenir des recommandations personnalisées.",
    readyToBook: "Prêt à sécuriser les arrangements?",
    bookStayButton: "🚗 Réserver une Voiture Maintenant",
    noneSelected: "Aucune sélection",
    suggestions: [],
    survey: {
      title: "Enquête sur les préférences de location de voitures",
      analyzing: "Analyse de vos préférences pour trouver la location parfaite...",
      buttons: {
        next: "Suivant",
        back: "Retour",
        submit: "Envoyer",
        skip: "Passer"
      },
      questions: {
        rental_type: {
          question: "Préférez-vous conduire vous-même ou engager un chauffeur ?",
          options: ["Conduire moi-même (Self-Drive)", "Avec chauffeur (Service de chauffeur)"]
        },
        pickup_location: {
          question: "Où souhaitez-vous récupérer le véhicule ?",
          placeholder: "Entrez le lieu de récupération (ex. Aéroport Suvarnabhumi, Centre de Bangkok)"
        },
        dropoff_location: {
          question: "Où souhaitez-vous retourner le véhicule ?",
          placeholder: "Entrez le lieu de retour (ex. Aéroport de Phuket, Hôtel)"
        },
        rental_dates: {
          question: "Quelles sont vos dates de location ?",
          placeholder: "Entrez les dates (ex. 15-20 décembre 2026)"
        },
        vehicle_type: {
          question: "Quel type de véhicule préférez-vous ?",
          options: ["Voiture économique", "SUV / 4WD", "Voiture de luxe", "Fourgonnette / Minibus"]
        },
        driver_age: {
          question: "Quel est l'âge du conducteur principal ?",
          placeholder: "Entrez l'âge du conducteur (ex. 30)"
        },
        driver_license: {
          question: "Avez-vous un permis de conduire international valide ?",
          options: ["Oui, j'ai un IDP", "Non, j'ai seulement un permis local", "J'ai besoin d'aide pour cela"]
        },
        driver_language: {
          question: "Quelle langue le chauffeur doit-il parler ? (Choix multiples)",
          options: ["Anglais", "Thaïlandais", "Chinois", "Japonais", "Coréen"]
        },
        additional_services: {
          question: "Sélectionnez les services supplémentaires nécessaires (Choix multiples) :",
          options: ["Navigation GPS", "Siège enfant", "Assurance complète", "Récupération à l'aéroport", "Support 24/7"]
        },
        budget: {
          question: "Quel est votre budget quotidien ?",
          options: ["Économique : Moins de 30 $/jour", "Intermédiaire : 30 $ - 80 $/jour", "Luxe : 80 $ - 150 $/jour", "Premium : 150 $+/jour"]
        },
        special_requests: {
          question: "Avez-vous des demandes spéciales ou des exigences ?",
          placeholder: "Entrez les demandes spéciales (ex. chauffeur végétarien, itinéraire spécifique)"
        }
      }
    }
  },
  "tripPlanner": {
    header: "Planificateur de voyage automatisé",
    subHeader: "Planifions votre voyage parfait en Thaïlande étape par étape",
    q1: "Quelles destinations vous intéressent ? (ex. Bangkok, Phuket, Chiang Mai)",
    q2: "Combien de temps dure votre voyage ? (ex. 5 jours 4 nuits)",
    q3: "Combien de personnes voyagent ?",
    adults: "Adultes",
    infants: "Enfants en bas âge",
    q4: "Quel type d'hébergement préférez-vous ?",
    accOptions: ["Hôtel", "Maison d'hôtes", "Auberge de jeunesse", "Aucune préférence"],
    q5: "Quel est votre niveau de budget ?",
    budgetOptions: ["Économique", "Intermédiaire", "Luxe"],
    q6: "Quel est votre principal centre d'intérêt ?",
    interestOptions: ["Culture/Temples", "Plages/Îles", "Shopping", "Gastronomie", "Aventure"],
    q7: "Avez-vous des besoins particuliers ? (ex. nourriture halal, accès pour fauteuil roulant, voyage avec des animaux)",
    next: "Suivant",
    submit: "Générer le plan",
    restart: "Recommencer",
    generating: "Élaboration de votre itinéraire personnalisé..."
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
    "travelerTips": "Conseils pour Voyageurs",
    "phrasesChatIntro": "Posez n'importe quelle question sur les phrases et la langue thaïlandaise.",
    "phrasesFooter": "Traductions et Phonétique propulsées par AsiaBuddy AI",
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
    "safe": "Bon voyage !",
    "bookNow": "Réserver Maintenant",
    "bookNowSubtitle": "Connecter avec un Opérateur Humain",
    "action": "Réserver Maintenant",
    "aiBusyFallback": "Notre assistant IA est temporairement occupé. Appuyez sur 'Réserver Maintenant' pour discuter directement avec notre équipe.",
    "bookNowCta": "Réserver Maintenant",
    "surveyProgressLabel": "Progression de l'enquête",
    "resetChatTitle": "Réinitialiser le chat",
    "resetButtonLabel": "Réinitialiser"
  },
  "destinationTabs": {
    "mustVisit": "Incontournables",
    "dining": "Restaurants",
    "experiences": "Expériences",
    "activities": "Activités",
    "hiddenGems": "Trésors Cachés"
  },
  "essentialGuides": {
    "sectionTitle": "GUIDES ESSENTIELS",
    "learnMore": "En savoir plus",
    "cards": {
      "generalInfo": "Informations générales",
      "travelTypes": "Types de voyage",
      "visaInfo": "Informations sur les visas",
      "transport": "Transport",
      "accommodation": "Hébergement",
      "foodDining": "Restauration",
      "cultureEtiquette": "Culture et étiquette",
      "budgetTips": "Conseils budgétaires"
    }
  },
  "about": {
    "ourStory": "Notre histoire",
    "heroTitle1": "Voyagez plus malin.",
    "heroTitle2": "Explorez plus intensément.",
    "heroSubtitle": "AsiaBuddy est votre compagnon de voyage intelligent pour l'Asie du Sud-Est — conçu pour les voyageurs qui souhaitent explorer en toute confiance, se déplacer librement et vivre des expériences authentiques.",
    "aboutLabel": "À propos de nous",
    "aboutHeading": "Nous avons comblé le fossé entre vous et l'Asie.",
    "aboutP1": "Nous savons ce que l'on ressent lorsque l'on débarque dans une ville inconnue sans guide de confiance — confus face à la signalisation, incertain quant aux transports, submergé par les choix. C'est précisément pour éliminer ce sentiment qu'AsiaBuddy a été créé.",
    "aboutP2": "Notre plateforme associe une expertise locale approfondie à une assistance optimisée par l'IA dans les domaines de la culture, des transports, de la restauration, de l'hébergement et du budget — le tout dans votre langue, disponible 24 heures sur 24.",
    "stat1": "Langues prises en charge",
    "stat2": "Concierge IA",
    "stat3": "Destinations en Thaïlande",
    "stat4": "Utilisation gratuite",
    "visionLabel": "Vision & Mission",
    "visionTitle": "Notre vision",
    "visionText": "Devenir le compagnon de voyage le plus fiable pour chaque voyageur arrivant en Asie — en éliminant les barrières linguistiques, en simplifiant les décisions et en transformant chaque voyage en une expérience confiante et joyeuse.",
    "missionTitle": "Notre mission",
    "missionText": "Offrir une assistance de voyage gratuite, multilingue et optimisée par l'IA qui permet à chaque voyageur — quels que soient son budget ou ses origines — d'explorer l'Asie de manière sûre, intelligente et inoubliable.",
    "teamLabel": "Notre équipe",
    "teamText": "Nous sommes une équipe passionnée de voyageurs et de technologues basés en",
    "teamLocations": "Allemagne, au Royaume-Uni, en Thaïlande et au Myanmar",
    "teamText2": "unis par un seul objectif : rendre l'Asie accessible à tous.",
    "ctaTitle": "Prêt à explorer l'Asie en toute confiance ?",
    "ctaSubtitle": "Rejoignez des milliers de voyageurs qui font confiance à AsiaBuddy comme compagnon de route à travers l'Asie du Sud-Est.",
    "ctaButton": "Commencer à explorer la Thaïlande"
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
    "subtitle": "Conseiller Culinaire Thaïlandais",
    "suggestionsLabel": "Demandes Gastronomiques Courantes",
    "detailsTitle": "Guide Gastronomique de la Thaïlande",
    "guideLink": "Guide Gastronomique de la Thaïlande — Pour plus d'informations",
    "modalTitle": "Guide Nourriture",
    "modalSubtitle": "Cuisine Locale & Sécurité Alimentaire",
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
  },
  "serviceCards": {
    "bookNow": "Réserver Maintenant",
    "viewFlight": "Voir Vol",
    "bookTransfer": "Réserver Transfert",
    "reserveCar": "Réserver Voiture",
    "getTickets": "Obtenir Billets",
    "freeCancellation": "Annulation Gratuite",
    "skipTheLine": "Éviter la File",
    "instantConfirmation": "Confirmation Instantanée",
    "perNight": "/nuit",
    "perDay": "/jour",
    "perPerson": "/personne",
    "priceChecked": "Prix vérifié",
    "minDriverAge": "Âge minimum du conducteur"
  },
  "activitiesPage": {
    "breadcrumb": "Accueil",
    "breadcrumbActivities": "Activités",
    "backTo": "Retour à",
    "decorativeLabel": "Expériences",
    "title": "Activités",
    "subtitle": "Découvrez des expériences incroyables et réservez via nos partenaires de confiance",
    "statCurated": "✦ Activités Sélectionnées",
    "statBestPrices": "✦ Meilleurs Prix",
    "statInstantBooking": "✦ Réservation Instantanée",
    "sectionLabel": "Expériences Disponibles",
    "sectionTitle": "Explorer les Activités",
    "activitiesAvailable": "{count} {count, plural, one {activité} other {activités}} disponibles",
    "emptyStateTitle": "Activités à Venir",
    "emptyStateDescription": "Nous sélectionnons des expériences incroyables pour vous. Revenez bientôt !",
    "filterAllCities": "Toutes les Villes",
    "filterNoActivities": "Aucune activité trouvée",
    "filterNoActivitiesDescription": "Essayez de sélectionner une autre ville ou voir toutes les activités"
  },
  "servicesStrip": {
    "hotel": "Hôtel",
    "flight": "Vol",
    "transfer": "Transfert",
    "tickets": "Billets",
    "carRental": "Location de Voiture"
  },
  "servicesPage": {
    "comingSoonTitle": "Bientôt Disponible",
    "comingSoonMessage": "Nous travaillons dur pour vous offrir les meilleurs services de voyage.",
    "servicesList": "Hôtel • Vol • Billets • Transfert • Location de Voiture • Circuits",
    "backToHome": "Retour à l'Accueil",
    "chatNote": "Pour les réservations et les demandes, utilisez notre Chat de Support en Direct sur la page d'accueil."
  },
  "flights": {
    "title": "Vols vers la Thaïlande",
    "intro": "Réservez votre vol vers la Thaïlande facilement. La plupart des vols internationaux arrivent à l'aéroport Suvarnabhumi (BKK) ou à l'aéroport Don Mueang (DMK) à Bangkok. Pour les meilleurs prix, réservez 2-3 mois à l'avance et vérifiez les exigences de visa avant de voyager.",
    "visaLinkText": "Vérifier les exigences de visa",
    "searchSpecificDates": "Rechercher des Dates Spécifiques",
    "flexibleDates": "Dates Flexibles — Trouver le Moins Cher",
    "continuePlanning": "Continuer à Planifier Votre Voyage",
    "faq": {
      "title": "Questions Fréquentes",
      "q1": {
        "question": "Combien de temps dure un vol direct vers Bangkok?",
        "answer": "Les vols directs vers Bangkok depuis les hubs asiatiques majeurs prennent généralement 2-4 heures. Depuis l'Europe, les vols directs durent 11-13 heures. Depuis l'Amérique du Nord, comptez 15-20 heures avec escale."
      },
      "q2": {
        "question": "Quelles compagnies aériennes desservent la Thaïlande?",
        "answer": "Les principales compagnies internationales comme Thai Airways, Singapore Airlines, Emirates, Qatar Airways et Cathay Pacific desservent Bangkok. Les compagnies low-cost comme AirAsia et Nok Air offrent également des connexions régionales."
      },
      "q3": {
        "question": "Ai-je besoin d'un visa à l'arrivée?",
        "answer": "Les exigences de visa dépendent de votre nationalité. De nombreux pays bénéficient d'une exemption de visa de 30 jours, tandis que d'autres peuvent devoir faire une demande à l'avance. Consultez notre guide visa pour les exigences les plus récentes."
      },
      "q4": {
        "question": "Dans quel aéroport devrais-je voler?",
        "answer": "Suvarnabhumi (BKK) gère la plupart des vols internationaux et est connecté à la ville par l'Airport Rail Link. Don Mueang (DMK) dessert les compagnies low-cost et les vols domestiques, également avec de bonnes connexions de transport."
      },
      "q5": {
        "question": "Quel est le meilleur moment pour réserver des vols?",
        "answer": "Pour les meilleurs tarifs, réservez 2-3 mois à l'avance pour les saisons de pointe (décembre-février). Les saisons intermédiaires (mars-mai, septembre-novembre) offrent souvent de meilleurs prix et moins de foule."
      }
    }
  },
  "hotels": {
    "title": "Hôtels en Thaïlande",
    "intro": "Trouvez l'hébergement parfait en Thaïlande. Les options économiques commencent autour de 500-1,000 THB par nuit pour les guesthouses, tandis que les hôtels de gamme moyenne vont de 1,500-4,000 THB. Les zones populaires incluent Sukhumvit à Bangkok pour la vie nocturne et les achats, Patong à Phuket pour l'accès à la plage, et la Vieille Ville à Chiang Mai pour la culture. Réservez à l'avance pendant la haute saison (décembre-février) pour les meilleurs tarifs et disponibilité.",
    "continuePlanning": "Continuer à Planifier Votre Voyage",
    "faq": {
      "title": "Questions Fréquentes",
      "q1": {
        "question": "Quelle est la meilleure zone pour séjourner à Bangkok?",
        "answer": "Sukhumvit est idéal pour la vie nocturne et les achats avec un accès facile au BTS. Siam/Pratunam offre des achats familiaux et des marchés. Silom/Sathorn est le quartier d'affaires avec des restaurants haut de gamme. Riverside offre des hôtels de luxe avec des sites culturels à proximité."
      },
      "q2": {
        "question": "Dois-je réserver à l'avance pendant la haute saison?",
        "answer": "Oui, il est recommandé de réserver 2-3 mois à l'avance pour la haute saison (décembre-février), surtout dans les destinations populaires comme Phuket, Krabi et Chiang Mai. Les saisons intermédiaires offrent de meilleurs tarifs et plus de disponibilité avec des fenêtres de réservation plus courtes."
      },
      "q3": {
        "question": "Est-il sûr de réserver directement vs via une agence?",
        "answer": "Les deux options sont généralement sûres. Réserver directement avec les hôtels peut parfois offrir de meilleurs tarifs ou une annulation flexible. Les agences réputées offrent des forfaits et un support local. Vérifiez toujours les avis et les politiques d'annulation quelle que soit la méthode de réservation."
      },
      "q4": {
        "question": "Quelle est la fourchette de budget typique par nuit?",
        "answer": "Guesthouses et auberges économiques: 500-1,500 THB ($15-45). Hôtels de gamme moyenne: 1,500-4,000 THB ($45-120). Resorts de luxe: 4,000-10,000+ THB ($120-300+). Les prix varient considérablement selon l'emplacement et la saison."
      },
      "q5": {
        "question": "Les hôtels en bord de mer valent-ils le coût supplémentaire?",
        "answer": "Les propriétés en bord de mer offrent commodité et vues mais ont des prix premium. Les hôtels à distance de marche (5-10 minutes) offrent souvent une meilleure valeur. Considérez combien de temps vous passerez à la plage versus explorer d'autres attractions lors de votre décision."
      }
    }
  },
  "tickets": {
    "title": "Billets et Activités en Thaïlande",
    "intro": "Réservez des billets et des activités dans toute la Thaïlande avec confirmation instantanée via Klook. Des visites de temples à Bangkok aux excursions insulaires à Phuket, évitez les files et sécurisez votre place à l'avance. Les expériences populaires incluent des spectacles culturels, des visites d'aventure et des passes d'attractions. Réserver à l'avance garantit la disponibilité et inclut souvent des remises exclusives.",
    "continuePlanning": "Continuer à Planifier Votre Voyage",
    "faq": {
      "title": "Questions Fréquentes",
      "q1": {
        "question": "Dois-je réserver des billets à l'avance?",
        "answer": "Pour les attractions populaires comme les visites du Grand Palais, les excursions insulaires et les spectacles culturels, il est recommandé de réserver 1-2 semaines à l'avance, surtout pendant la haute saison (décembre-février). Cela garantit votre place et inclut souvent l'accès sans file."
      },
      "q2": {
        "question": "Les e-tickets sont-ils acceptés aux attractions?",
        "answer": "Oui, la plupart des partenaires Klook acceptent les e-tickets mobiles. Montrez simplement votre code QR à l'entrée. Certaines attractions peuvent nécessiter des billets physiques qui peuvent être récupérés aux guichets désignés. Vérifiez votre confirmation de réservation pour les instructions spécifiques."
      },
      "q3": {
        "question": "Que se passe-t-il si je dois annuler ma réservation?",
        "answer": "Les politiques d'annulation varient par attraction. De nombreux billets offrent une annulation gratuite jusqu'à 24-48 heures avant l'activité. Vérifiez toujours la politique d'annulation avant de réserver. Les remboursements sont généralement traités vers votre méthode de paiement originale."
      },
      "q4": {
        "question": "Y a-t-il des billets combinés pour plusieurs attractions?",
        "answer": "Oui, des passes combinés sont disponibles pour des destinations populaires comme les visites de ville de Bangkok et les packages insulaires. Ils offrent souvent une meilleure valeur que les billets individuels et incluent le transport entre les attractions. Recherchez les options 'combo' ou 'pass' lors de la navigation."
      },
      "q5": {
        "question": "Est-ce moins cher de réserver sur place ou en ligne?",
        "answer": "La réservation en ligne via Klook est généralement 10-30% moins chère que les prix sur place. Vous éviterez également les files et garantirez la disponibilité. Certaines attractions offrent des remises en ligne exclusives et des extras non disponibles à l'entrée."
      }
    }
  },
  "activities": {
    "title": "Tours et Activités en Thaïlande",
    "intro": "Découvrez des circuits et expériences curés à travers la Thaïlande avec GetYourGuide. Des cours de cuisine à Chiang Mai aux aventures de snorkeling à Krabi, explorez des activités locales authentiques guidées par des experts. Que vous cherchiez une immersion culturelle, des aventures en plein air ou des trésors cachés, trouvez l'expérience parfaite pour votre voyage.",
    "continuePlanning": "Continuer à Planifier Votre Voyage",
    "faq": {
      "title": "Questions Fréquentes",
      "q1": {
        "question": "Quels types d'activités sont disponibles?",
        "answer": "GetYourGuide propose une large gamme incluant des circuits culturels, des cours de cuisine, des activités d'aventure comme la tyrolienne et le kayak, des excursions d'une journée aux îles, des visites de sites historiques et des circuits gastronomiques. Les options varient selon la ville et la saison."
      },
      "q2": {
        "question": "Comment reçois-je ma confirmation de réservation?",
        "answer": "Après avoir réservé, vous recevrez un email de confirmation avec votre voucher. La plupart des activités acceptent les vouchers mobiles—montrez simplement votre téléphone au point de rencontre. Certains circuits nécessitent des vouchers imprimés, ce qui sera clairement indiqué dans votre confirmation."
      },
      "q3": {
        "question": "Quelle est la politique d'annulation?",
        "answer": "Les politiques d'annulation varient selon l'activité. De nombreux circuits offrent une annulation gratuite jusqu'à 24-72 heures avant l'heure de début. Vérifiez toujours la politique spécifique sur la page de l'activité avant de réserver. Les remboursements sont traités vers votre méthode de paiement originale."
      },
      "q4": {
        "question": "Les circuits sont-ils disponibles dans différentes langues?",
        "answer": "Oui, de nombreux circuits sont proposés en plusieurs langues dont l'anglais, le chinois, le japonais, le coréen et les langues européennes. Vérifiez les détails de l'activité pour les options de langue disponibles et sélectionnez votre langue préférée lors de la réservation."
      },
      "q5": {
        "question": "Dois-je réserver des activités à l'avance?",
        "answer": "Pour les expériences populaires et les circuits en petits groupes, il est recommandé de réserver 1-2 semaines à l'avance, surtout en haute saison (novembre-février). Cela garantit la disponibilité et inclut souvent de meilleurs prix. Les réservations de dernière minute peuvent avoir des options limitées."
      }
    }
  }
},
  DE: {
  "brand": { "name": "ThaiGuide", "subtitle": "AsiaBuddy Services" },
  "home": "Startseite",
  "tours": "Touren",
  "destinations": "Ziele",
  "tourPackages": "Reisepakete",
  "travelBlog": "Reiseblog",
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
    "title": "TRANSPORT & MIETWAGEN",
    "detailsTitle": "Transport in Thailand — Für weitere Informationen",
    "modalTitle": "Thailand-weiter Transportführer",
    "modalSubtitle": "Transport",
    "destinationLabel": "Reiseziel",
    "subtitle": "Dynamische Anpassung des Mietwagens",
    "emptyState": "Geben Sie Ihre Transportkriterien an, um personalisierte Buchungsrouten zu erhalten.",
    "readyToBook": "Bereit, die Arrangements zu sichern?",
    "bookStayButton": "📅 Fahrzeug Jetzt Buchen",
    "noneSelected": "Keine Auswahl",
    "suggestions": [],
    "survey": {
      "title": "Mietwagen-Präferenzumfrage",
      "analyzing": "Ihre Anforderungen werden analysiert, um die besten Mietwagenoptionen zu finden...",
      "buttons": {
        "next": "Weiter",
        "back": "Zurück",
        "submit": "Absenden",
        "skip": "Überspringen"
      },
      "questions": {
        "rental_type": {
          "question": "Welche Art von Mietwagenservice bevorzugen Sie?",
          "options": ["Selbstfahrer (Self-Drive)", "Mit Fahrer (Privater Chauffeur)"]
        },
        "pickup_city": {
          "question": "In welcher Stadt möchten Sie das Auto abholen?",
          "options": ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Koh Samui"]
        },
        "duration_days": {
          "question": "Wie viele Tage möchten Sie das Auto mieten?",
          "placeholder": "Anzahl der Tage eingeben (z. B. 5)"
        },
        "passengers_luggage": {
          "question": "Wie viele Passagiere und Gepäckstücke haben Sie?",
          "options": [
            "1-3 Passagiere (Unter 2 große Koffer)",
            "4-5 Passagiere (2-3 große Koffer)",
            "6-9 Passagiere (4+ große Koffer)"
          ]
        },
        "car_class": {
          "question": "Welche Fahrzeugklasse entspricht Ihren Anforderungen?",
          "options": ["Kleinwagen", "Standard-Limousine", "Familien-SUV", "Luxusklasse-Limousine", "VIP-Van (9-Sitzer)"]
        },
        "self_drive_license": {
          "question": "Besitzen Sie einen internationalen Führerschein (IFS) oder thailändischen Führerschein?",
          "options": ["Ja, besitze ich", "Nein, besitze ich nicht"]
        },
        "self_drive_deposit": {
          "question": "Stimmen Sie der Hinterlegung der Kaution zu (idR. per Kreditkarten-Block)?",
          "options": ["Ja, ich stimme zu", "Nein, ich lehne ab"]
        },
        "driver_hours": {
          "question": "Welche tägliche Einsatzdauer des Fahrers benötigen Sie?",
          "options": [
            "Halbtags (Bis zu 5 Stunden)",
            "Ganztags (Bis zu 10-12 Stunden)",
            "Nur Flughafentransfer (A nach B)"
          ]
        },
        "driver_language": {
          "question": "Welche Sprachkenntnisse bevorzugen Sie für Ihren Fahrer?",
          "options": ["Nur Thailändisch", "Englisch & Thailändisch", "Burmesisch & Thailändisch"]
        },
        "addons": {
          "question": "Wählen Sie Extras (Mehrfachauswahl):",
          "options": ["Kindersitz", "GPS-Navigationsgerät", "Vollkasko ohne Selbstbeteiligung", "Zusatzfahrer-Registrierung"]
        },
        "pickup_date": {
          "question": "Bitte geben Sie den voraussichtlichen Mietbeginn oder Monat an:",
          "placeholder": "z. B. 15. Oktober oder Mitte Dezember"
        }
      }
    }
  },
  "vatRefund": {
    "title": "MwSt.-Rückerstattungsleitfaden",
    "description": "Mindestausgabe 2.000 THB. Achten Sie auf Schilder.",
    "link": "MwSt.-Rückerstattung"
  },
  "visa": {
    "title": "Visa-Info",
    "modalTitle": "Thailand Visum-Leitfaden",
    "modalSubtitle": "Visum-Informationen",
    "description": "Überprüfen Sie Ihren Status.",
    "link": "Visum-Informationen"
  },
  "travelTypes": {
    "title": "Reisearten",
    "modalTitle": "Reisestile-Leitfaden",
    "modalSubtitle": "Reisestile & Planer",
    "link": "Reisestile"
  },
  "budget": "Budget-Tipps",
  "budgetModalTitle": "Thailand Budget-Leitfaden",
  "budgetSubtitle": "Intelligente Reisetipps",
  "learnMore": "Mehr erfahren",
  "accommodation": {
    title: "UNTERKUNFT-COPILOT",
    modalTitle: "Umfassender Leitfaden für Unterkünfte in Thailand",
    detailsTitle: "Unterkünfte",
    subtitle: "Dynamische Anpassung des Aufenthalts",
    emptyState: "Beantworten Sie die Fragen unten, um personalisierte Empfehlungen zu erhalten.",
    readyToBook: "Bereit, die Arrangements zu sichern?",
    bookStayButton: "📅 Unterkunft Jetzt Buchen",
    noneSelected: "Keine Auswahl",
    suggestions: [],
    survey: {
      title: "Befragung zu Unterkunftspräferenzen",
      analyzing: "Wir analysieren Ihre Präferenzen für den perfekten Aufenthalt...",
      buttons: {
        next: "Weiter",
        back: "Zurück",
        submit: "Absenden",
        skip: "Überspringen"
      },
      questions: {
        city: {
          question: "In welcher Stadt möchten Sie übernachten?",
          options: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Ayutthaya", "Koh Samui"]
        },
        nights: {
          question: "Wie viele Nächte möchten Sie bleiben?",
          placeholder: "Anzahl der Nächte eingeben (z. B. 5)"
        },
        area_general: {
          question: "In welcher Gegend möchten Sie übernachten?",
          options: ["Stadtzentrum / Innenstadt", "Am Strand / Küste", "Ruhig / Natur", "Historisch / Kulturell"]
        },
        budget: {
          question: "Wie hoch ist Ihr Budget pro Nacht?",
          options: ["Günstig: Unter $30", "Mittelklasse: $30 - $100", "Luxus: $100 - $250", "Premium-Luxus: $250+"]
        },
        type: {
          question: "Welche Unterkunftsart bevorzugen Sie?",
          options: ["Hotel", "Resort", "Hostel", "Guesthouse", "Villa / Apartment"]
        },
        stars: {
          question: "Welche Sternebewertung bevorzugen Sie?",
          options: ["1-2 Sterne", "3 Sterne", "4 Sterne", "5 Sterne / Luxus", "Keine Präferenz"]
        },
        bangkok_vibe: {
          question: "Welche Gegend in Bangkok passt am besten zu Ihrer Stimmung?",
          options: [
            "Sukhumvit (Shopping & Nachtleben)",
            "Siam/Pratunam (Familienshopping & Märkte)",
            "Silom/Sathorn (Business & gehobene Gastronomie)",
            "Riverside (Luxus & kulturelle Sehenswürdigkeiten)"
          ]
        },
        phuket_beach: {
          question: "Welche Art von Stranderlebnis bevorzugen Sie in Phuket?",
          options: [
            "Patong (Nachtleben & belebter Strand)",
            "Kata / Karon (Familienfreundlich & Surfen)",
            "Bangtao / Laguna (Luxusresorts & ruhiger)",
            "Phuket Old Town (Kultur & Cafés - kein Strand)"
          ]
        },
        transit_proximity: {
          question: "Wie wichtig ist es Ihnen, in Gehweite zur BTS (Skytrain) oder MRT (U-Bahn) zu sein?",
          options: [
            "Muss innerhalb von 5 Minuten zu Fuß erreichbar sein",
            "Schön zu haben, aber kein K.-o.-Kriterium",
            "Nicht wichtig (plane, private Vans/Taxis zu nutzen)"
          ]
        },
        beach_proximity: {
          question: "Wie nah möchten Sie am Strand sein?",
          options: [
            "Direkt am Strand (keine Straßen zu überqueren)",
            "Gehweite zum Strand (unter 10 Min.)",
            "Fahrt oder Shuttle zum Strand ist in Ordnung"
          ]
        },
        airport_pickup: {
          question: "Möchten Sie, dass wir einen privaten Flughafentransfer zu Ihrer Unterkunft arrangieren?",
          options: [
            "Ja, bitte Angebot für ein privates Auto/einen Van zusenden.",
            "Nein, ich kümmere mich selbst per Taxi/Grab darum."
          ]
        },
        guests: {
          question: "Wie viele Gäste reisen mit?",
          placeholder: "Anzahl der Gäste eingeben (z. B. 2 Erwachsene, 1 Kind)"
        },
        room_type: {
          question: "Welcher Zimmertyp passt am besten?",
          options: ["Standard-Zimmer", "Deluxe- / Superior-Zimmer", "Suite", "Familienzimmer", "Bett im Schlafsaal"]
        },
        amenities: {
          question: "Wählen Sie die gewünschte Ausstattung (Mehrfachauswahl):",
          options: ["Kostenloses WLAN", "Pool", "Fitnessstudio", "Klimaanlage", "Inklusive Frühstück", "Wellness & Spa"]
        },
        checkin_date: {
          question: "Bitte geben Sie Ihr voraussichtliches Anreisedatum oder den Monat ein:",
          placeholder: "z. B. 15. Oktober oder Mitte Dezember"
        }
      }
    }
  },
  "carRental": {
    title: "MIETWAGEN-ASSISTENT",
    modalTitle: "Umfassender Leitfaden für Mietwagen in Thailand",
    detailsTitle: "Mietwagen",
    subtitle: "Dynamische Anpassung des Mietwagens",
    emptyState: "Beantworten Sie die Fragen unten, um personalisierte Empfehlungen zu erhalten.",
    readyToBook: "Bereit, die Arrangements zu sichern?",
    bookStayButton: "🚗 Mietwagen Jetzt Buchen",
    noneSelected: "Keine Auswahl",
    suggestions: [],
    survey: {
      title: "Befragung zu Mietwagenpräferenzen",
      analyzing: "Wir analysieren Ihre Präferenzen für den perfekten Mietwagen...",
      buttons: {
        next: "Weiter",
        back: "Zurück",
        submit: "Absenden",
        skip: "Überspringen"
      },
      questions: {
        rental_type: {
          question: "Möchten Sie selbst fahren oder einen Chauffeur engagieren?",
          options: ["Selbst fahren (Self-Drive)", "Mit Chauffeur (Chauffeurservice)"]
        },
        pickup_location: {
          question: "Wo möchten Sie das Auto abholen?",
          placeholder: "Abholort eingeben (z. B. Flughafen Suvarnabhumi, Bangkok Zentrum)"
        },
        dropoff_location: {
          question: "Wo möchten Sie das Auto zurückgeben?",
          placeholder: "Rückgabeort eingeben (z. B. Flughafen Phuket, Hotel)"
        },
        rental_dates: {
          question: "Wann sind Ihre Mietdaten?",
          placeholder: "Daten eingeben (z. B. 15.-20. Dezember 2026)"
        },
        vehicle_type: {
          question: "Welche Fahrzeugart bevorzugen Sie?",
          options: ["Wirtschaftswagen", "SUV / 4WD", "Luxuswagen", "Kleinbus / Minibus"]
        },
        driver_age: {
          question: "Wie alt ist der Hauptfahrer?",
          placeholder: "Alter des Fahrers eingeben (z. B. 30)"
        },
        driver_license: {
          question: "Haben Sie einen gültigen internationalen Führerschein?",
          options: ["Ja, ich habe einen IDP", "Nein, ich habe nur einen lokalen Führerschein", "Ich brauche Hilfe dabei"]
        },
        driver_language: {
          question: "Welche Sprache soll der Chauffeur sprechen? (Mehrfachauswahl)",
          options: ["Englisch", "Thailändisch", "Chinesisch", "Japanisch", "Koreanisch"]
        },
        additional_services: {
          question: "Wählen Sie zusätzliche benötigte Services (Mehrfachauswahl):",
          options: ["GPS-Navigation", "Kindersitz", "Vollkaskoversicherung", "Flughafentransfer", "24/7-Support"]
        },
        budget: {
          question: "Was ist Ihr Tagesbudget?",
          options: ["Günstig: Unter $30/Tag", "Mittelklasse: $30 - $80/Tag", "Luxus: $80 - $150/Tag", "Premium: $150+/Tag"]
        },
        special_requests: {
          question: "Haben Sie besondere Wünsche oder Anforderungen?",
          placeholder: "Besondere Wünsche eingeben (z. B. vegetarischer Chauffeur, bestimmte Route)"
        }
      }
    }
  },
  "tripPlanner": {
    header: "Automatischer Reiseplaner",
    subHeader: "Lassen Sie uns Ihre perfekte Thailand-Reise Schritt für Schritt planen",
    q1: "An welchen Reisezielen sind Sie interessiert? (z. B. Bangkok, Phuket, Chiang Mai)",
    q2: "Wie lange dauert Ihre Reise? (z. B. 5 Tage 4 Nächte)",
    q3: "Wie viele Personen reisen mit?",
    adults: "Erwachsene",
    infants: "Kleinkinder",
    q4: "Welche Art von Unterkunft bevorzugen Sie?",
    accOptions: ["Hotel", "Gästehaus", "Hostel", "Keine Präferenz"],
    q5: "Wie hoch ist Ihr Budget?",
    budgetOptions: ["Günstig", "Mittelklasse", "Luxus"],
    q6: "Was ist Ihr Hauptinteresse?",
    interestOptions: ["Kultur/Tempel", "Strände/Inseln", "Shopping", "Essen", "Abenteuer"],
    q7: "Gibt es besondere Anforderungen? (z. B. Halal-Speisen, Rollstuhlzugang, Reisen mit Haustieren)",
    next: "Weiter",
    submit: "Plan erstellen",
    restart: "Neu starten",
    generating: "Ihre persönliche Reiseroute wird erstellt..."
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
    "travelerTips": "Reisetipps",
    "phrasesChatIntro": "Fragen Sie alles über thailändische Redewendungen und Sprache.",
    "phrasesFooter": "Übersetzungen und Phonetik powered by AsiaBuddy AI",
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
    "safe": "Gute Reise!",
    "bookNow": "Jetzt Buchen",
    "bookNowSubtitle": "Mit einem menschlichen Mitarbeiter verbinden",
    "action": "Jetzt Buchen",
    "aiBusyFallback": "Unser KI-Assistent ist vorübergehend beschäftigt. Tippen Sie auf 'Jetzt Buchen', um direkt mit unserem Team zu chatten.",
    "bookNowCta": "Jetzt Buchen",
    "surveyProgressLabel": "Fortschritt der Umfrage",
    "resetChatTitle": "Chat zurücksetzen",
    "resetButtonLabel": "Zurücksetzen"
  },
  "destinationTabs": {
    "mustVisit": "Sehenswürdigkeiten",
    "dining": "Restaurants",
    "experiences": "Erlebnisse",
    "activities": "Aktivitäten",
    "hiddenGems": "Geheimtipps"
  },
  "essentialGuides": {
    "sectionTitle": "WESENTLICHE LEITFÄDEN",
    "learnMore": "Mehr erfahren",
    "cards": {
      "generalInfo": "Allgemeine Informationen",
      "travelTypes": "Reisearten",
      "visaInfo": "Visa-Informationen",
      "transport": "Transport",
      "accommodation": "Unterkunft",
      "foodDining": "Essen & Gastronomie",
      "cultureEtiquette": "Kultur & Etikette",
      "budgetTips": "Budgettipps"
    }
  },
  "about": {
    "ourStory": "Unsere Geschichte",
    "heroTitle1": "Intelligenter reisen.",
    "heroTitle2": "Tiefer eintauchen.",
    "heroSubtitle": "AsiaBuddy ist Ihr intelligenter Reisebegleiter für Südostasien — entwickelt für Reisende, die selbstbewusst erkunden, sich frei bewegen und authentische Erfahrungen machen möchten.",
    "aboutLabel": "Über uns",
    "aboutHeading": "Wir haben die Lücke zwischen Ihnen und Asien geschlossen.",
    "aboutP1": "Wir wissen, wie es sich anfühlt, ohne einen vertrauenswürdigen Reiseführer in einer fremden Stadt zu landen — verwirrt von der Beschilderung, unsicher beim Transport, überwältigt von der Auswahl. Genau dieses Gefühl soll AsiaBuddy beseitigen.",
    "aboutP2": "Unsere Plattform kombiniert fundiertes lokales Expertenwissen mit KI-gestützter Unterstützung in den Bereichen Kultur, Transport, Gastronomie, Unterkunft und Budgetierung — alles in Ihrer Sprache und 24 Stunden am Tag verfügbar.",
    "stat1": "Unterstützte Sprachen",
    "stat2": "KI-Concierge",
    "stat3": "Thailändische Reiseziele",
    "stat4": "Kostenlos nutzbar",
    "visionLabel": "Vision & Mission",
    "visionTitle": "Unsere Vision",
    "visionText": "Der vertrauenswürdigste Reisebegleiter für jeden Reisenden zu werden, der in Asien ankommt — Sprachbarrieren abbauen, Entscheidungen vereinfachen und jede Reise in ein selbstbewusstes, freudiges Erlebnis verwandeln.",
    "missionTitle": "Unsere Mission",
    "missionText": "Kostenlose, mehrsprachige und KI-gestützte Reiseunterstützung zu bieten, die es jedem Reisenden — unabhängig von Budget oder Hintergrund — ermöglicht, Asien sicher, intelligent und unvergesslich zu erkunden.",
    "teamLabel": "Unser Team",
    "teamText": "Wir sind ein leidenschaftliches Team aus Reisenden und Technologen mit Sitz in",
    "teamLocations": "Deutschland, dem Vereinigten Königreich, Thailand und Myanmar",
    "teamText2": "vereint durch ein gemeinsames Ziel: Asien für jeden zugänglich zu machen.",
    "ctaTitle": "Bereit, Asien mit Zuversicht zu erkunden?",
    "ctaSubtitle": "Schließen Sie sich Tausenden von Reisenden an, die AsiaBuddy als ihren Begleiter in ganz Südostasien vertrauen.",
    "ctaButton": "Jetzt Thailand erkunden"
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
    "subtitle": "Thailändischer Kulinarberater",
    "suggestionsLabel": "Häufige Essensanfragen",
    "detailsTitle": "Thailand Essen-Leitfaden",
    "guideLink": "Thailand Essen-Leitfaden — Für weitere Informationen",
    "modalTitle": "Essen-Leitfaden",
    "modalSubtitle": "Lokale Küche & Essenssicherheit",
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
  },
  "serviceCards": {
    "bookNow": "Jetzt Buchen",
    "viewFlight": "Flug Ansehen",
    "bookTransfer": "Transfer Buchen",
    "reserveCar": "Auto Reservieren",
    "getTickets": "Tickets Holen",
    "freeCancellation": "Kostenlose Stornierung",
    "skipTheLine": "Schlange Überspringen",
    "instantConfirmation": "Sofortige Bestätigung",
    "perNight": "/Nacht",
    "perDay": "/Tag",
    "perPerson": "/Person",
    "priceChecked": "Preis geprüft",
    "minDriverAge": "Mindestalter des Fahrers"
  },
  "activitiesPage": {
    "breadcrumb": "Startseite",
    "breadcrumbActivities": "Aktivitäten",
    "backTo": "Zurück zu",
    "decorativeLabel": "Erlebnisse",
    "title": "Aktivitäten",
    "subtitle": "Entdecken Sie tolle Erlebnisse und buchen Sie über unsere vertrauenswürdigen Partner",
    "statCurated": "✦ Kuratierte Aktivitäten",
    "statBestPrices": "✦ Beste Preise",
    "statInstantBooking": "✦ Sofortige Buchung",
    "sectionLabel": "Verfügbare Erlebnisse",
    "sectionTitle": "Aktivitäten Durchsuchen",
    "activitiesAvailable": "{count} {count, plural, one {Aktivität} other {Aktivitäten}} verfügbar",
    "emptyStateTitle": "Aktivitäten Bald Verfügbar",
    "emptyStateDescription": "Wir kuratieren tolle Erlebnisse für Sie. Schauen Sie bald wieder vorbei!",
    "filterAllCities": "Alle Städte",
    "filterNoActivities": "Keine Aktivitäten gefunden",
    "filterNoActivitiesDescription": "Versuchen Sie, eine andere Stadt auszuwählen oder alle Aktivitäten anzuzeigen"
  },
  "servicesStrip": {
    "hotel": "Hotel",
    "flight": "Flug",
    "transfer": "Transfer",
    "tickets": "Tickets",
    "carRental": "Autovermietung"
  },
  "servicesPage": {
    "comingSoonTitle": "Bald Verfügbar",
    "comingSoonMessage": "Wir arbeiten hart, um Ihnen die besten Reiseservices zu bieten.",
    "servicesList": "Hotel • Flug • Tickets • Transfer • Autovermietung • Touren",
    "backToHome": "Zurück zur Startseite",
    "chatNote": "Für Buchungen und Anfragen nutzen Sie unseren Live-Support-Chat auf der Startseite."
  },
  "flights": {
    "title": "Flüge nach Thailand",
    "intro": "Buchen Sie Ihren Flug nach Thailand ganz einfach. Die meisten internationalen Flüge landen am Flughafen Suvarnabhumi (BKK) oder am Flughafen Don Mueang (DMK) in Bangkok. Für die besten Preise buchen Sie 2-3 Monate im Voraus und prüfen Sie die Visumanforderungen vor der Reise.",
    "visaLinkText": "Visumanforderungen prüfen",
    "searchSpecificDates": "Bestimmte Daten Suchen",
    "flexibleDates": "Flexible Daten — Günstigsten Finden",
    "continuePlanning": "Reise Weiter Planen",
    "faq": {
      "title": "Häufig Gestellte Fragen",
      "q1": {
        "question": "Wie lange dauert ein Direktflug nach Bangkok?",
        "answer": "Direktflüge nach Bangkok von großen asiatischen Hubs dauern typischerweise 2-4 Stunden. Aus Europa dauern Direktflüge 11-13 Stunden. Aus Nordamerika rechnen Sie mit 15-20 Stunden mit Zwischenstopp."
      },
      "q2": {
        "question": "Welche Fluggesellschaften fliegen nach Thailand?",
        "answer": "Große internationale Fluggesellschaften wie Thai Airways, Singapore Airlines, Emirates, Qatar Airways und Cathay Pacific bedienen Bangkok. Billigfluggesellschaften wie AirAsia und Nok Air bieten ebenfalls regionale Verbindungen an."
      },
      "q3": {
        "question": "Benötige ich ein Visum bei Ankunft?",
        "answer": "Die Visumanforderungen hängen von Ihrer Staatsangehörigkeit ab. Viele Länder erhalten eine 30-tägige Visumbefreiung, während andere im Voraus beantragen müssen. Überprüfen Sie unseren Visaleitfaden für die aktuellen Anforderungen."
      },
      "q4": {
        "question": "Auf welchen Flughafen sollte ich fliegen?",
        "answer": "Suvarnabhumi (BKK) bedient die meisten internationalen Flüge und ist mit der Stadt durch den Airport Rail Link verbunden. Don Mueang (DMK) bedient Billigfluggesellschaften und Inlandsflüge, ebenfalls mit guten Transportverbindungen."
      },
      "q5": {
        "question": "Wann ist der beste Zeitpunkt für Flugbuchungen?",
        "answer": "Für die besten Tarife buchen Sie 2-3 Monate im Voraus für Hauptsaisons (Dezember-Februar). Nebensaisons (März-Mai, September-November) bieten oft bessere Preise und weniger Menschenmengen."
      }
    }
  },
  "hotels": {
    "title": "Hotels in Thailand",
    "intro": "Finden Sie die perfekte Unterkunft in Thailand. Budgetoptionen beginnen bei etwa 500-1,000 THB pro Nacht für Guesthouses, während Mittelklassehotels zwischen 1,500-4,000 THB liegen. Beliebte Gebiete sind Sukhumvit in Bangkok für Nachtleben und Einkaufen, Patong in Phuket für Strandzugang und die Altstadt in Chiang Mai für Kultur. Buchen Sie im Voraus während der Hauptsaison (Dezember-Februar) für die besten Preise und Verfügbarkeit.",
    "continuePlanning": "Reise Weiter Planen",
    "faq": {
      "title": "Häufig Gestellte Fragen",
      "q1": {
        "question": "Welcher Bereich ist am besten für einen Aufenthalt in Bangkok?",
        "answer": "Sukhumvit ist ideal für Nachtleben und Einkaufen mit einfachem BTS-Zugang. Siam/Pratunam bietet familienfreundliches Einkaufen und Märkte. Silom/Sathorn ist das Geschäftsviertel mit gehobenen Restaurants. Riverside bietet Luxushotels mit kulturellen Sehenswürdigkeiten in der Nähe."
      },
      "q2": {
        "question": "Muss ich während der Hauptsaison im Voraus buchen?",
        "answer": "Ja, eine Buchung 2-3 Monate im Voraus wird für die Hauptsaison (Dezember-Februar) empfohlen, besonders in beliebten Zielen wie Phuket, Krabi und Chiang Mai. Nebensaisons bieten bessere Preise und mehr Verfügbarkeit mit kürzeren Buchungszeiträumen."
      },
      "q3": {
        "question": "Ist es sicher, direkt vs über einen Agenten zu buchen?",
        "answer": "Beide Optionen sind im Allgemeinen sicher. Direktes Buchen bei Hotels kann manchmal bessere Preise oder flexible Stornierung bieten. Seriöse Agenten bieten Pakete und lokale Unterstützung. Überprüfen Sie immer Bewertungen und Stornierungsrichtlinien unabhängig von der Buchungsmethode."
      },
      "q4": {
        "question": "Was ist der typische Budgetbereich pro Nacht?",
        "answer": "Budget-Guesthouses und Hostels: 500-1,500 THB ($15-45). Mittelklassehotels: 1,500-4,000 THB ($45-120). Luxusresorts: 4,000-10,000+ THB ($120-300+). Preise variieren je nach Standort und Saison erheblich."
      },
      "q5": {
        "question": "Lohnen sich Strandhotels den Aufpreis?",
        "answer": "Strandfront-Eigenschaften bieten Komfort und Aussicht, haben aber Premium-Preise. Hotels in Gehweite (5-10 Minuten) bieten oft besseren Wert. Berücksichtigen Sie, wie viel Zeit Sie am Strand verbringen im Vergleich zum Erkunden anderer Attraktionen bei Ihrer Entscheidung."
      }
    }
  },
  "tickets": {
    "title": "Tickets und Aktivitäten in Thailand",
    "intro": "Buchen Sie Tickets und Aktivitäten in ganz Thailand mit sofortiger Bestätigung über Klook. Von Tempeltouren in Bangkok bis zu Inselhüpftouren in Phuket, vermeiden Sie Warteschlangen und sichern Sie Ihren Platz im Voraus. Beliebte Erlebnisse umfassen kulturelle Shows, Abenteuertouren und Attraktionspässe. Vorab-Buchen garantiert Verfügbarkeit und beinhaltet oft exklusive Rabatte.",
    "continuePlanning": "Reise Weiter Planen",
    "faq": {
      "title": "Häufig Gestellte Fragen",
      "q1": {
        "question": "Muss ich Tickets im Voraus buchen?",
        "answer": "Für beliebte Attraktionen wie Grand-Palast-Touren, Inselhüpftouren und kulturelle Shows wird empfohlen, 1-2 Wochen im Voraus zu buchen, besonders während der Hauptsaison (Dezember-Februar). Dies garantiert Ihren Platz und beinhaltet oft Skip-the-Line-Zugang."
      },
      "q2": {
        "question": "Werden E-Tickets an Attraktionen akzeptiert?",
        "answer": "Ja, die meisten Klook-Partner akzeptieren mobile E-Tickets. Zeigen Sie einfach Ihren QR-Code am Eingang. Einige Attraktionen erfordern möglicherweise physische Tickets, die an bezeichneten Schaltern abgeholt werden können. Überprüfen Sie Ihre Buchungsbestätigung für spezifische Anweisungen."
      },
      "q3": {
        "question": "Was passiert, wenn ich meine Buchung stornieren muss?",
        "answer": "Stornierungsrichtlinien variieren je nach Attraktion. Viele Tickets bieten kostenlose Stornierung bis zu 24-48 Stunden vor der Aktivität. Überprüfen Sie immer die Stornierungsrichtlinie vor der Buchung. Erstattungen werden typischerweise auf Ihre ursprüngliche Zahlungsmethode verarbeitet."
      },
      "q4": {
        "question": "Gibt es Kombitickets für mehrere Attraktionen?",
        "answer": "Ja, Kombipässe sind für beliebte Ziele wie Bangkok-Stadttouren und Insel-Pakete verfügbar. Diese bieten oft besseren Wert als einzelne Tickets und beinhalten Transport zwischen Attraktionen. Suchen Sie nach 'Combo'- oder 'Pass'-Optionen beim Stöbern."
      },
      "q5": {
        "question": "Ist es günstiger, vor Ort oder online zu buchen?",
        "answer": "Online-Buchen über Klook ist typischerweise 10-30% günstiger als Vor-Ort-Preise. Sie vermeiden auch Warteschlangen und garantieren Verfügbarkeit. Einige Attraktionen bieten exklusive Online-Rabatte und Extras, die nicht am Eingang erhältlich sind."
      }
    }
  },
  "activities": {
    "title": "Touren und Aktivitäten in Thailand",
    "intro": "Entdecken Sie kuratierte Touren und Erlebnisse in ganz Thailand mit GetYourGuide. Von Kochkursen in Chiang Mai bis hin zu Schnorchelabenteuern in Krabi, erkunden Sie authentische lokale Aktivitäten unter Leitung von Experten. Ob kulturelle Immersion, Outdoor-Abenteuer oder versteckte Perlen—finden Sie das perfekte Erlebnis für Ihre Reise.",
    "continuePlanning": "Reise Weiter Planen",
    "faq": {
      "title": "Häufig Gestellte Fragen",
      "q1": {
        "question": "Welche Arten von Aktivitäten sind verfügbar?",
        "answer": "GetYourGuide bietet eine breite Palette inklusive kultureller Touren, Kochkursen, Abenteueraktivitäten wie Ziplining und Kajak, Tagesausflügen zu Inseln, Besuchen historischer Stätten und Food-Touren. Die Optionen variieren je nach Stadt und Saison."
      },
      "q2": {
        "question": "Wie erhalte ich meine Buchungsbestätigung?",
        "answer": "Nach der Buchung erhalten Sie eine E-Mail-Bestätigung mit Ihrem Gutschein. Die meisten Aktivitäten akzeptieren mobile Gutscheine—zeigen Sie einfach Ihr Telefon am Treffpunkt. Einige Touren erfordern gedruckte Gutscheine, was in Ihrer Bestätigung klar angegeben wird."
      },
      "q3": {
        "question": "Was ist die Stornierungsrichtlinie?",
        "answer": "Stornierungsrichtlinien variieren je nach Aktivität. Viele Touren bieten kostenlose Stornierung bis zu 24-72 Stunden vor Startzeit. Überprüfen Sie immer die spezifische Richtlinie auf der Aktivitätsseite vor der Buchung. Erstattungen werden an Ihre ursprüngliche Zahlungsmethode verarbeitet."
      },
      "q4": {
        "question": "Sind Touren in verschiedenen Sprachen verfügbar?",
        "answer": "Ja, viele Touren werden in mehreren Sprachen angeboten einschließlich Englisch, Chinesisch, Japanisch, Koreanisch und europäischen Sprachen. Überprüfen Sie die Aktivitätsdetails für verfügbare Sprachoptionen und wählen Sie Ihre bevorzugte Sprache bei der Buchung."
      },
      "q5": {
        "question": "Sollte ich Aktivitäten im Voraus buchen?",
        "answer": "Für beliebte Erlebnisse und Kleingruppen-Touren wird empfohlen, 1-2 Wochen im Voraus zu buchen, besonders in der Hauptsaison (November-Februar). Dies garantiert Verfügbarkeit und beinhaltet oft bessere Preise. Last-Minute-Buchungen können begrenzte Optionen haben."
      }
    }
  }
},
};
