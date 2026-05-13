import fs from 'fs';

let content = fs.readFileSync('src/data/destinations.ts', 'utf-8');

const hebrewDestinations = `  hebrew: [
  {
    id: 'bangkok',
    name: 'בנגקוק',
    thaiName: 'กรุงเทพมหานคร',
    overview: 'עיר המלאכים, שבה מקדשים עתיקים פוגשים מודרניות אולטרה-חדשנית בנוף חושי תוסס.',
    pillars: {
      mustVisit: [
        {
          title: 'הארמון הגדול (Grand Palace)',
          badge: 'ציוני דרך',
          description: 'ביתם הטקסי המרהיב של מלכי תאילנד ומקדש בודהה האזמרגד.',
          etiquette: 'קפדני: כתפיים וברכיים חייבות להיות מכוסות. אין סנדלים ללא רצועות.',
          imageLabel: 'grand_palace_bangkok'
        },
        {
          title: 'המוזיאון הלאומי בנגקוק',
          badge: 'מוזיאונים',
          description: 'המוזיאון הגדול ביותר בדרום מזרח אסיה, המציג אמנות והיסטוריה תאילנדית.',
          imageLabel: 'national_museum_bangkok'
        }
      ],
      dining: [
        {
          title: 'ג\\'יי פאי (Jay Fai)',
          badge: 'אוכל רחוב',
          description: 'אומלט בשר סרטנים מפורסם בעולם עם כוכב מישלן המבושל על פחמים.',
          dietary: ['דגש על מאכלי ים'],
          imageLabel: 'jay_fai'
        }
      ],
      otherExperiences: [
        {
          title: 'ג\\'וד פיירס (Jodd Fairs)',
          badge: 'שוק לילה',
          description: 'שוק לילה טרנדי הפופולרי בזכות אוכל רחוב ואופנת וינטג\\'.',
          imageLabel: 'jodd_fairs'
        }
      ],
      uniqueActivities: [
        {
          title: 'בית הספר לבישול Blue Elephant',
          badge: 'שיעור בישול',
          description: 'למדו את סודות המטבח התאילנדי המלכותי בסביבה היסטורית.',
          imageLabel: 'blue_elephant_cooking'
        }
      ],
      hiddenGems: [
        {
          title: 'ואט סם פראן (Wat Sam Phran)',
          badge: 'פנינה נסתרת',
          description: 'מגדל ורוד בן 17 קומות עם דרקון ענק המסתחרר סביבו.',
          etiquette: 'מתבקש שקט והתבוננות.',
          imageLabel: 'wat_sam_phran'
        }
      ]
    }
  }
],`;

content = content.replace(/hebrew: \[\],/, hebrewDestinations);

fs.writeFileSync('src/data/destinations.ts', content);
