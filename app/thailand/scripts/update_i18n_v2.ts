import fs from 'fs';

let content = fs.readFileSync('src/i18n.ts', 'utf-8');

const essentialAppsTranslations: Record<string, string> = {
  spanish: 'Apps esenciales',
  french: 'Apps essentielles',
  portuguese: 'Apps essenciais',
  russian: 'Основные приложения',
  german: 'Essentielle Apps',
  italian: 'App essenziali',
  chinese: '必备应用',
  hindi: 'आवश्यक ऐप्स',
  arabic: 'تطبيقات أساسية',
  japanese: '必須アプリ',
  korean: '필수 앱',
  myanmar: 'မရှိမဖြစ် App များ',
  malay: 'App Penting',
  indonesian: 'Aplikasi Penting',
  vietnamese: 'Ứng dụng thiết yếu',
  hebrew: 'אפליקציות חיוניות',
  bengali: 'প্রয়োজনীয় অ্যাপ',
  polish: 'Niezbędne aplikacje',
  swedish: 'Viktiga appar',
  turkish: 'Temel Uygulamalar'
};

for (const [lang, trans] of Object.entries(essentialAppsTranslations)) {
  const regex = new RegExp(`(${lang}: \\{[^}]*menuCategories: \\{[^}]*transport: '[^']+',)`, 's');
  content = content.replace(regex, `$1\n      essentialApps: '${trans}',`);
}

// Fix Hebrew Block - Full Translation
const hebrewFull = `  hebrew: {
    menu: 'תפריט',
    menuCategories: {
      travel: 'תכנון טיול',
      guides: 'מדריכים חיוניים',
      transport: 'תחבורה',
      essentialApps: 'אפליקציות חיוניות',
      tools: 'כלי נסיעה'
    },
    start: 'התחל מסע',
    explore: 'לחקור',
    concierge: 'קונסיירז\\'',
    hero: 'חקרו את הקסם עכשיו',
    heroSub: 'הכנסת אורחים נצחית, המדריך התאילנדי הדיגיטלי שלך.',
    sacredAesthetic: 'אסתטיקה מקודשת',
    toolbox: 'ארגז כלים חיוני',
    emergency: 'חירום וביטחון',
    touristPolice: 'משטרת תיירות',
    assistance: 'חייגו לעזרה מיידית (24/7)',
    contactNow: 'צור קשר עכשיו',
    tabs: {
      mustVisit: 'מקומות חובה לבקר',
      dining: 'חוויות אוכל וקולינריה',
      otherExperiences: 'חוויות נוספות',
      uniqueActivities: 'פעילויות ייחודיות',
      hiddenGems: 'פנינים נסתרות',
      information: 'מידע עסקי'
    },
    labels: {
      etiquette: 'כללי התנהגות',
      advisory: 'המלצה',
      vibe: 'אווירה'
    },
    infoLink: 'למידע נוסף לחץ כאן',
    infoModalTitle: 'מדריך חיוני לתאילנד',
    transport: {
      title: 'שאל כל מידע על תחבורה בתאילנד שתרצה לדעת.',
      detailsTitle: 'תחבורה',
      transportGuideLink: 'תחבורה בתאילנד למידע נוסף',
      appsGuideLink: 'אפליקציות ואתרי אינטרנט חיוניים לתחבורה בתאילנד. למידע נוסף, לחצו כאן!',
      modalTitle: 'מדריך תחבורה ארצי לתאילנד',
      suggestions: [
        'איך משתמשים ב-Grab בתאילנד?',
        'האם ה-BTS קל להתמצאות?',
        'כמה עולה נסיעה בטוק-טוק?',
        'איזו אפליקציה עדיפה: Bolt או Grab?'
      ]
    },
    tools: {
      currency: 'מטבע (THB)',
      phrases: 'ביטויים חיוניים',
      etiquette: 'נימוס תאילנדי',
      laws: 'חוקים מרכזיים',
      amount: 'סכום',
      currencyLabel: 'מטבע'
    },
    welcome: 'ברוכים הבאים מתאילנד. בשילוב של חוכמה מקומית וטכנולוגיה, נספק את ההכוונה הטובה ביותר, מהציוני דרך האייקוניים של תאילנד ועד ליופי הנסתר שלה.',
    chat: {
      title: 'קונסיירז\\' תאילנדי',
      status: 'שירות מכל הלב • הכוונה מקצועית',
      welcome: '"סוואדי קראפ. איך אוכל לעזור למסע התאילנדי שלך היום?"',
      placeholder: 'שאל כל דבר על תאילנד...',
      hint: 'שאל על מקדשים, אוכל או לוגיסטיקה',
      processing: 'מעבד...',
      safe: 'ממשק קונסיירז\\' מאובטח ותואם לחוק',
      advice: 'ייעוץ מקצועי 24/7'
    },
    footer: {
      by: 'על ידי שירותי AsiaBuddy',
      tagline: 'מוקדש לשימור המורשת התאילנדית תוך מתן חוויות מבקרים ברמה עולמית.',
      officialHelp: 'עזרה רשמית',
      rights: '© 2024 AsiaBuddy travel services. כל הזכויות שמורות.',
      explore: 'לחקור',
      services: 'שירותים',
      bangkokGuide: 'מדריך בנגקוק',
      phuketBeaches: 'חופי פוקט',
      chiangMaiTemples: 'מקדשי צ\\'יאנג מאי',
      emergencyContacts: 'אנשי קשר לשעת חירום',
      digitalConcierge: 'קונסיירז\\' דיגיטלי',
      languagePhrases: 'ביטויי שפה',
      scamAlerts: 'התראות מפני הונאות',
      privacyPolicy: 'מדיניות פרטיות',
      legalTerms: 'תנאים משפטיים',
      culturalGuide: 'מדריך תרבותי'
    },
    vatRefund: {
      title: "מדריך החזר מע\\"מ למטיילים",
      description: "חפשו שלטי 'VAT Refund for Tourists'. מינימום קנייה 2,000 באט.",
      link: "למידע מפורט יותר על החזר מע\\"מ"
    },
    visa: {
      title: "חוקי ויזה",
      link: "למידע נוסף על הוויזה",
      modalTitle: "מדריך חיוני לוויזה לנסיעה לתאילנד"
    },
    medical: {
      title: "מדריך תיירות מרפא",
      chatTitle: "שאל כל מידע על מדריך תיירות מרפא בתאילנד.",
      detailsTitle: "מדריך רפואי לתאילנד",
      guideLink: "למידע נוסף קראו את המדריך הרפואי האולטימטיבי",
      modalTitle: "המדריך הרפואי האולטימטיבי לתאילנד: שירותי בריאות, בדיקות והכנה",
      suggestions: [
        'מהבית החולים הכי טוב לבדיקה כללית?',
        'איך מגישים בקשה לוויזה לטיפול רפואי (Non-O MT)?',
        'האם צריך לצום לפני בדיקה רפואית?',
        'האם יש מתורגמנים לעברית בבמרונגראד או סמיטיבג\\'?',
        'מה עלי להביא ביום הביקור הראשון בבית החולים?'
      ]
    },
    nightlife: {
      title: "מדריך חיי לילה",
      chatTitle: "שאל כל דבר על חיי הלילה, מועדונים וברים בתאילנד.",
      detailsTitle: "מדריך חיי הלילה של תאילנד",
      guideLink: "למידע נוסף קראו את מדריך חיי הלילה האולטימטיבי",
      modalTitle: "מדריך חיי הלילה האולטימטיבי של תאילנד: מועדונים, ברים ובטיחות",
      suggestions: [
        'מהם ברי הגג (rooftop bars) הטובים ביותר בבנגקוק?',
        'מהו קוד הלבוש במועדוני Onyx או Route 66?',
        'מהו גיל המינימום לכניסה למועדונים בתאילנד?',
        'איפה המקום הכי טוב לחיי לילה בפוקט?',
        'האם בטוח לבקר ברחוב קאו-סאן בלילה?'
      ]
    },
    travelTypes: {
      title: "סוגי טיול בתאילנד",
      link: "מדריך מקיף לנסיעה לתאילנד",
      modalTitle: "מדריך מקיף לנסיעה לתאילנד"
    },
    accommodation: {
      title: 'שאל כל מידע על לינה בתאילנד שתרצה לדעת.',
      detailsTitle: 'לינה',
      guideLink: 'מדריך לינה בתאילנד למידע נוסף',
      modalTitle: 'מדריך לינה בתאילנד',
      suggestions: [
        'מה הדירוג המקובל של בתי מלון בתאילנד?',
        'האם אגודה (Agoda) היא האפליקציה הטובה ביותר להזמנת מלונות?',
        'מהו "Joiner Fee" במלונות בתאילנד?',
        'האם כדאי להזמין גסטהאוס או הוסטל לחוויה מקומית?'
      ]
    },
    shopping: {
       title: 'שאל כל מידע על קניות בתאילנד שתרצה לדעת.',
       detailsTitle: 'מדריך קניות בתאילנד',
       guideLink: 'מדריך קניות בתאילנד למידע נוסף',
       modalTitle: 'מדריך קניות מקיף לתאילנד'
    },
    weather: {
      title: "מזג אוויר: תאילנד",
      updateFrequency: "🔄 מתעדכן כל 5 שעות",
      climate: "טרופי: חם ולח",
      alerts: "גשמי מונסון עונתיים",
      tip: "קחו תמיד מטרייה קטנה",
      timeSuffix: "ICT",
      alertsLabel: "התראות",
      tipLabel: "טיפ",
      humidity: "לחות",
      uvIndex: "מדד UV",
      high: "גבוה",
      wind: "רוח"
    },
    booking: {
      link: 'הזמן השכרת רכב, כרטיסי אוטובוס, כרטיסי טיסה ודמי כניסה.',
      chatTitle: 'בקש מידע נוסף להזמנת רכב, אוטובוס, טיסה ודמי כניסה.',
      welcome: 'בקש מידע נוסף להזמנת רכב, אוטובוס, טיסה ודמי כניסה.',
      initialMessage: 'בקש מידע נוסף להזמנת רכב, אוטובוס, טיסה ודמי כניסה.',
      placeholder: 'שאל על השכרת רכב, כרטיסי אוטובוס/טיסה או דמי כניסה...',
      disclaimer: 'דמי השירות ומחירי הכרטיסים עשויים להשתנות מעת לעת.',
      estimateNotice: 'שימו לב - כל המחירים המצוינים הם הערכות בלבד.',
      suggestions: [
        'כמה עולה להשכיר רכב ליום?',
        'הזמנת כרטיס אוטובוס לצ\\'יאנג מאי',
        'כרטיס טיסה מבנגקוק לפוקט',
        'דמי כניסה לארמון המלך (Grand Palace)'
      ]
    }
  },`;

const hebrewBlockRegex = /hebrew: \{[^}]*\.\.\.ENGLISH_UI,[^}]*\},/s;
content = content.replace(hebrewBlockRegex, hebrewFull);

fs.writeFileSync('src/i18n.ts', content);
