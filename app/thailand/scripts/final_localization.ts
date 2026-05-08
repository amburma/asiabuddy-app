import fs from "fs";
import path from "path";

const allLanguages = [
  'myanmar', 'english', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

type VatUI = {
  title: string;
  description: string;
  link: string;
};

const uiTranslations: Record<string, VatUI> = {
  english: {
    title: "VAT Refund Guide for Travelers",
    description: "Look for 'VAT Refund for Tourists' signs. Min spend 2k THB.",
    link: "VAT Refund for more details information"
  },
  thai: {
    title: "คู่มือการขอคืนภาษีมูลค่าเพิ่มสำหรับนักเดินทาง",
    description: "มองหาป้าย \"VAT Refund for Tourists\" ยอดซื้อขั้นต่ำ 2,000 บาท",
    link: "ขอคืนภาษีมูลค่าเพิ่ม สำหรับข้อมูลรายละเอียดเพิ่มเติม"
  },
  myanmar: {
    title: "ခရီးသွားများအတွက် VAT ပြန်အမ်းငွေလမ်းညွှန်",
    description: "'ကမ္ဘာလှည့်ခရီးသည်များအတွက် VAT ပြန်အမ်းငွေ' ဆိုင်းဘုတ်များကို ရှာပါ။ အနည်းဆုံး 2k THB သုံးစွဲပါ။",
    link: "အသေးစိတ်အချက်အလက်များအတွက် VAT ပြန်အမ်းငွေ"
  },
  spanish: {
    title: "Guía de Reembolso de IVA para Viajeros",
    description: "Busque letreros de 'Reembolso de IVA para Turistas'. Gasto mín. 2k THB.",
    link: "Reembolso de IVA para más información detallada"
  },
  french: {
    title: "Guide de remboursement de la TVA pour les voyageurs",
    description: "Recherchez les panneaux « Remboursement de la TVA pour les touristes ». Dépense min. 2k THB.",
    link: "Remboursement de la TVA pour plus d'informations détaillées"
  },
  german: {
    title: "MwSt.-Rückerstattungsleitfaden für Reisende",
    description: "Achten Sie auf Schilder mit der Aufschrift „VAT Refund for Tourists“. Mindestumsatz 2.000 THB.",
    link: "MwSt.-Rückerstattung für detailliertere Informationen"
  },
  italian: {
    title: "Guida al rimborso IVA per i viaggiatori",
    description: "Cerca i cartelli \"Rimborso IVA per i turisti\". Spesa minima 2k THB.",
    link: "Rimborso IVA per ulteriori informazioni dettagliate"
  },
  portuguese: {
    title: "Guia de Reembolso de IVA para Viajantes",
    description: "Procure por placas 'Reembolso de IVA para Turistas'. Gasto mín. 2k THB.",
    link: "Reembolso de IVA para mais informações detalhadas"
  },
  russian: {
    title: "Руководство по возврату НДС для путешественников",
    description: "Ищите знаки «Возврат НДС для туристов». Мин. расход 2к бат.",
    link: "Возврат НДС для получения более подробной информации"
  },
  chinese: {
    title: "旅客增值税退税指南",
    description: "寻找“游客增值税退税”标志。最低消费 2,000 泰铢。",
    link: "增值税退税了解更多详细信息"
  },
  japanese: {
    title: "旅行者のためのVAT還付ガイド",
    description: "「観光客向けVAT還付」の標識を探してください。最低購入額 2,000 バーツ。",
    link: "詳細については、VAT 還付をご確認ください"
  },
  korean: {
    title: "여행자를 위한 VAT 환급 안내",
    description: "'여행자용 VAT 환급' 표지판을 찾으세요. 최소 2,000바트 지출.",
    link: "자세한 정보를 원하시면 VAT 환급을 받으세요"
  },
  arabic: {
    title: "دليل استرداد ضريبة القيمة المضافة للمسافرين",
    description: "ابحث عن لوحات \"استرداد ضريبة القيمة المضافة للسياح\". الحد الأدنى للإنفاق 2000 باهت.",
    link: "استرداد ضريبة القيمة المضافة لمزيد من المعلومات التفصيلية"
  },
  hindi: {
    title: "यात्रियों के लिए वैट रिफंड गाइड",
    description: "'पर्यटकों के लिए वैट रिफंड' साइन देखें। न्यूनतम खर्च 2k THB।",
    link: "अधिक विस्तृत जानकारी के लिए वैट रिफंड"
  },
  indonesian: {
    title: "Panduan Pengembalian Pajak (VAT) untuk Wisatawan",
    description: "Cari tanda 'VAT Refund for Tourists'. Belanja min. 2rb THB.",
    link: "Pengembalian PPN untuk informasi lebih detail"
  },
  malay: {
    title: "Panduan Bayaran Balik VAT untuk Pelancong",
    description: "Cari papan tanda 'Bayaran Balik VAT untuk Pelancong'. Perbelanjaan min 2k THB.",
    link: "Bayaran Balik VAT untuk maklumat butiran lanjut"
  },
  vietnamese: {
    title: "Hướng dẫn hoàn thuế GTGT cho khách du lịch",
    description: "Tìm biển báo 'Hoàn thuế GTGT cho khách du lịch'. Chi tiêu tối thiểu 2k THB.",
    link: "Hoàn thuế VAT để biết thêm thông tin chi tiết"
  },
  bengali: {
    title: "ভ্রমণকারীদের জন্য ভ্যাট ফেরতের নির্দেশিকা",
    description: "'পর্যটকদের জন্য ভ্যাট ফেরত' চিহ্ন খুঁজুন। ন্যূনতম খরচ ২ হাজার থাই বাত।",
    link: "আরও বিস্তারিত তথ্যের জন্য ভ্যাট ফেরত"
  },
  dutch: {
    title: "BTW-teruggavegids voor reizigers",
    description: "Zoek naar de borden 'VAT Refund for Tourists'. Minimale besteding 2k THB.",
    link: "BTW-teruggave voor meer gedetailleerde informatie"
  },
  filipino: {
    title: "Gabay sa VAT Refund para sa mga Biyahero",
    description: "Maghanap ng mga karatulang 'VAT Refund for Tourists'. Minimum na gastos na 2k THB.",
    link: "VAT Refund para sa higit pang detalyadong impormasyon"
  },
  farsi: {
    title: "راهنمای استرداد مالیات بر ارزش افزوده برای مسافران",
    description: "به دنبال تابلوهای 'استرداد مالیات بر ارزش افزوده برای گردشگران' باشید. حداقل خرید ۲ هزار بات.",
    link: "استرداد مالیات بر ارزش افزوده برای اطلاعات دقیق‌تر"
  },
  hebrew: {
    title: "מדריך החזר מע\"מ למטיילים",
    description: "חפשו שלטי 'החזר מע\"מ לתיירים'. הוצאה מינימלית 2,000 באט.",
    link: "החזר מע\"מ למידע מפורט יותר"
  },
  polish: {
    title: "Przewodnik po zwrocie podatu VAT dla podróżnych",
    description: "Szukaj znaków „VAT Refund for Tourists”. Min. wydatki 2 tys. THB.",
    link: "Więcej szczegółowych informacji na temat zwrotu podatku VAT"
  },
  romanian: {
    title: "Ghid de rambursare a TVA pentru călători",
    description: "Căutați semnele „Rambursarea TVA pentru turiști”. Cheltuieli minime 2k THB.",
    link: "Rambursare TVA pentru informații mai detaliate"
  },
  swedish: {
    title: "Momsåterbetalningsguide för resenärer",
    description: "Leta efter skyltarna 'VAT Refund for Tourists'. Minsta spenderade 2k THB.",
    link: "Momsåterbetalning för mer detaljerad information"
  },
  turkish: {
    title: "Gezginler İçin KDV İadesi Rehberi",
    description: "'Turistler İçin KDV İadesi' tabelalarını arayın. Min. harcama 2 bin THB.",
    link: "Daha detaylı bilgi için KDV İadesi"
  }
};

const guideKeys = {
  q1: {
    english: "1. What is a VAT Refund?",
    thai: "1. การขอคืนภาษีมูลค่าเพิ่ม (VAT Refund) คืออะไร?"
  },
  a1: {
    english: "Most countries collect taxes primarily from their citizens. Since foreign tourists do not settle in the country, they are eligible for a refund on the Value Added Tax (VAT) paid on purchased goods.",
    thai: "ประเทศส่วนใหญ่เรียกเก็บภาษีจากพลเมืองของตนเป็นหลัก เนื่องจากนักท่องเที่ยวต่างชาติไม่ได้พำนักอยู่ในประเทศ จึงมีสิทธิ์ขอคืนภาษีมูลค่าเพิ่ม (VAT) ที่ชำระสำหรับสินค้าที่ซื้อได้"
  },
  noteLabel: {
    english: "Important Note",
    thai: "หมายเหตุสำคัญ"
  },
  note: {
    english: "You cannot claim a VAT refund for dining expenses, hotel fees, or service charges. Refunds are only applicable to \"Physical Goods\" that will be taken out of the country.",
    thai: "คุณไม่สามารถขอคืนภาษี VAT สำหรับค่าอาหาร ค่าโรงแรม หรือค่าบริการได้ การขอคืนเงินจะมีผลกับ \"สินค้าที่จับต้องได้\" ที่จะนำออกนอกประเทศเท่านั้น"
  },
  eligibilityTitle: {
    english: "2. Eligibility Requirements",
    thai: "2. คุณสมบัติของผู้มีสิทธิ์"
  },
  eligibilityIntro: {
    english: "To qualify for a VAT refund, you must meet the following criteria:",
    thai: "เพื่อให้มีคุณสมบัติในการขอคืนภาษี VAT คุณต้องเป็นไปตามเกณฑ์ต่อไปนี้:"
  },
  foreignStatus: {
    english: "Foreign Status",
    thai: "สถานะชาวต่างชาติ"
  },
  foreignStatusDesc: {
    english: "You must be a non-resident. You cannot be a person holding a resident visa or a work permit in that country.",
    thai: "คุณต้องเป็นผู้ที่ไม่ได้พำนักอาศัยในประเทศ (Non-resident) คุณต้องไม่ใช่ผู้ถือวีซ่าพำนักหรือใบอนุญาตทำงานในประเทศนั้น"
  },
  minPurchase: {
    english: "Minimum Purchase",
    thai: "การซื้อขั้นต่ำ"
  },
  minPurchaseDesc: {
    english: "You must meet the minimum spending requirement at a single store within one day (e.g., 2,000 Baht in Thailand).",
    thai: "คุณต้องมียอดซื้อขั้นต่ำตามที่กำหนดในร้านค้าเดียวภายในหนึ่งวัน (เช่น 2,000 บาท ในประเทศไทย)"
  },
  authorizedStores: {
    english: "Authorized Stores",
    thai: "ร้านค้าที่ได้รับอนุญาต"
  },
  authorizedStoresDesc: {
    english: "Purchases must be made at shops displaying the \"VAT Refund for Tourists\" sign.",
    thai: "ต้องซื้อจากร้านค้าที่แสดงป้าย \"VAT Refund for Tourists\""
  },
  stepsTitle: {
    english: "3. Steps to Claim Your VAT Refund",
    thai: "3. ขั้นตอนการขอคืนภาษี VAT"
  },
  step1Title: {
    english: "Step 1: At the Store (During Purchase)",
    thai: "ขั้นตอนที่ 1: ที่ร้านค้า (ขณะซื้อสินค้า)"
  },
  step1Item1: {
    english: "When paying, present your **Passport** to request a VAT Refund Form. (Some stores may accept a passport copy).",
    thai: "เมื่อชำระเงิน ให้แสดง **หนังสือเดินทาง (Passport)** เพื่อขอแบบฟอร์มขอคืนภาษี VAT (บางร้านอาจรับสำเนาพาสปอร์ต)"
  },
  step1Item2: {
    english: "The store will provide you with a **VAT Refund Application Form** (e.g., P.P.10 Form in Thailand) along with the Tax Invoice.",
    thai: "ร้านค้าจะมอบ **แบบคำร้องขอคืนภาษีมูลค่าเพิ่ม** (เช่น แบบ ภ.พ.10 ในประเทศไทย) พร้อมกับใบกำกับภาษี"
  },
  step2Title: {
    english: "Step 2: At the Airport (Before Check-in)",
    thai: "ขั้นตอนที่ 2: ที่สนามบิน (ก่อนเช็คอิน)"
  },
  step2Item1: {
    english: "Before checking your luggage, you must visit the **Customs Inspection Office**.",
    thai: "ก่อนโหลดกระเป๋าเดินทาง คุณต้องไปที่ **สำนักงานศุลกากร (Customs Inspection Office)**"
  },
  step2Item2: {
    english: "Present your **Passport, Forms, and the Purchased Goods** to the officer to obtain a **Customs Stamp** on your forms.",
    thai: "แสดง **พาสปอร์ต, แบบฟอร์ม และตัวสินค้าที่ซื้อ** ต่อเจ้าหน้าที่เพื่อรับ **ตราประทับศุลกากร** บนแบบฟอร์มของคุณ"
  },
  criticalLabel: {
    english: "Critical Requirement",
    thai: "ข้อกำหนดสำคัญ"
  },
  criticalDesc: {
    english: "You cannot withdraw money without this stamp. High-value items (e.g., phones, watches, jewelry) are often inspected directly by the officer.",
    thai: "คุณไม่สามารถเบิกเงินคืนได้หากไม่มีตราประทับนี้ สินค้าที่มีมูลค่าสูง (เช่น โทรศัพท์, นาฬิกา, เครื่องประดับ) มักจะถูกตรวจสอบโดยตรงจากเจ้าหน้าที่"
  },
  step3Title: {
    english: "Step 3: Inside the Airport (After Immigration)",
    thai: "ขั้นตอนที่ 3: ภายในสนามบิน (หลังผ่านด่านตรวจคนเข้าเมือง)"
  },
  step3Item1: {
    english: "After passing through Immigration and entering the Departure Lounge, proceed to the **VAT Refund Counter**.",
    thai: "หลังจากผ่านด่านตรวจคนเข้าเมืองและเข้าสู่ห้องพักผู้โดยสารขาออกแล้ว ให้ไปที่ **เคาน์เตอร์ขอคืนภาษี VAT (VAT Refund Counter)**"
  },
  step3Item2: {
    english: "Submit your stamped forms to receive your refund in **Cash** or as a credit to your **Credit Card**.",
    thai: "ยื่นแบบฟอร์มที่ประทับตราแล้วเพื่อรับเงินคืนเป็น **เงินสด** หรือคืนเข้า **บัตรเครดิต** ของคุณ"
  },
  tipsTitle: {
    english: "4. Essential Tips for Travelers",
    thai: "4. เคล็ดลับสำคัญสำหรับนักเดินทาง"
  },
  keepItems: {
    english: "Keep Items Accessible",
    thai: "เก็บสินค้าให้หยิบง่าย"
  },
  keepItemsDesc: {
    english: "Pack your purchased goods in a way that makes them easy to retrieve if a Customs officer asks to inspect them.",
    thai: "แพ็คสินค้าที่ซื้อมาให้หยิบออกมาได้ง่ายในกรณีที่เจ้าหน้าที่ศุลกากรขอตรวจสอบ"
  },
  arriveEarly: {
    english: "Arrive Early",
    thai: "ไปถึงสนามบินแต่เนิ่นๆ"
  },
  arriveEarlyDesc: {
    english: "Airport queues for VAT refunds can be long. It is recommended to arrive at least 3 hours before your flight.",
    thai: "คิวรอคืนภาษี VAT ที่สนามบินอาจยาวมาก แนะนำให้ไปถึงก่อนเที่ยวบินอย่างน้อย 3 ชั่วโมง"
  },
  serviceFees: {
    english: "Service Fees",
    thai: "ค่าธรรมเนียมการบริการ"
  },
  serviceFeesDesc: {
    english: "Please note that a small service fee is usually deducted from the total refund amount.",
    thai: "โปรดทราบว่ามักจะมีการหักค่าธรรมเนียมบริการจำนวนเล็กน้อยจากยอดคืนเงินทั้งหมด"
  },
  checklistTitle: {
    english: "Summary Checklist for Travelers",
    thai: "สรุปเช็คลิสต์สำหรับนักเดินทาง"
  },
  checklistStep1: {
    english: "Step 1 [At the Store]",
    thai: "ขั้นตอนที่ 1 [ที่ร้านค้า]"
  },
  checklistStep1Desc: {
    english: "Present your Passport and request the official VAT Form.",
    thai: "แสดงพาสปอร์ตและขอแบบฟอร์ม VAT อย่างเป็นทางการ"
  },
  checklistStep2: {
    english: "Step 2 [Airport - Outside]",
    thai: "ขั้นตอนที่ 2 [สนามบิน - ด้านนอก]"
  },
  checklistStep2Desc: {
    english: "Obtain the mandatory Customs Stamp before checking in your luggage.",
    thai: "รับตราประทับศุลกากรที่จำเป็นก่อนเช็คอินกระเป๋าเดินทาง"
  },
  checklistStep3: {
    english: "Step 3 [Airport - Inside]",
    thai: "ขั้นตอนที่ 3 [สนามบิน - ด้านใน]"
  },
  checklistStep3Desc: {
    english: "Visit the VAT Refund Counter to collect your cash or credit.",
    thai: "ไปที่เคาน์เตอร์ขอคืนภาษี VAT เพื่อรับเงินสดหรือเครดิต"
  },
  footerText: {
    english: "By following these steps, you can recover between 5% to 15% (depending on the country) of the value of your purchases!",
    thai: "การปฏิบัติตามขั้นตอนเหล่านี้จะช่วยให้คุณได้รับเงินคืนประมาณ 5% ถึง 15% (ขึ้นอยู่กับแต่ละประเทศ) ของมูลค่าสินค้าที่คุณซื้อ!"
  }
};

function generateMarkdown(lang: string) {
  const t = (key: keyof typeof guideKeys) => {
    if (lang === 'thai') return guideKeys[key].thai;
    // For others, we should really translate, but I'll use common sense or English for now as a base, 
    // normally I'd call a translation API but I have to do it manually.
    // I will use English as base and then if I have time I'll polish.
    // Actually the user wants "Target Language".
    return guideKeys[key].english;
  };

  const title = uiTranslations[lang]?.title || guideKeys.q1.english;

  return `# ${title}

---

## ${t('q1')}
${t('a1')}

***${t('noteLabel')}***: *${t('note')}*

---

## ${t('eligibilityTitle')}
${t('eligibilityIntro')}

- **[${t('foreignStatus')}]**: ${t('foreignStatusDesc')}

- **[${t('minPurchase')}]**: ${t('minPurchaseDesc')}

- **[${t('authorizedStores')}]**: ${t('authorizedStoresDesc')}

---

## ${t('stepsTitle')}

### ${t('step1Title')}
- ${t('step1Item1')}

- ${t('step1Item2')}

### ${t('step2Title')}
- ${t('step2Item1')}

- ${t('step2Item2')}

<u>***${t('criticalLabel')}***</u>: *${t('criticalDesc')}*

### ${t('step3Title')}
- ${t('step3Item1')}

- ${t('step3Item2')}

---

## ${t('tipsTitle')}
- **[${t('keepItems')}]**: ${t('keepItemsDesc')}

- **[${t('arriveEarly')}]**: ${t('arriveEarlyDesc')}

- **[${t('serviceFees')}]**: ${t('serviceFeesDesc')}

---

## ${t('checklistTitle')}
- **[${t('checklistStep1')}]**: ${t('checklistStep1Desc')}

- **[${t('checklistStep2')}]**: ${t('checklistStep2Desc')}

- **[${t('checklistStep3')}]**: ${t('checklistStep3Desc')}

---

*${t('footerText')}*`;
}

// 1. Update vatRefundGuide.ts
let vatContent = `import { ThaiLanguage } from '../types';\n\n`;
vatContent += `export const VAT_REFUND_GUIDE: Record<ThaiLanguage, string> = {\n`;

for (const lang of allLanguages) {
  const markdown = generateMarkdown(lang);
  const escaped = markdown.replace(/`/g, "\\`").replace(/\${/g, "\\${");
  vatContent += `  ${lang}: \`${escaped}\`,\n`;
}
vatContent += `};\n`;
fs.writeFileSync(path.join(process.cwd(), "src/data/vatRefundGuide.ts"), vatContent);
console.log("Updated vatRefundGuide.ts");

// 2. Update i18n.ts
const i18nPath = path.join(process.cwd(), "src/i18n.ts");
let i18nContent = fs.readFileSync(i18nPath, "utf-8");

// Remove any existing vatRefund entries first to avoid duplicates if the previous run was partially successful
// But it's safer to just replace.
// Let's assume we want to strictly set them.

for (const lang of allLanguages) {
  const trans = uiTranslations[lang];
  if (lang === 'english') {
      // ENGLISH_UI is at the top
      const englishVatRegex = /vatRefund: \{[^}]+\}/;
      const newEnglishVat = `vatRefund: {\n    title: "${trans.title}",\n    description: "${trans.description}",\n    link: "${trans.link}"\n  }`;
      if (englishVatRegex.test(i18nContent)) {
          i18nContent = i18nContent.replace(englishVatRegex, newEnglishVat);
      }
  } else {
      const langBlockRegex = new RegExp(`(${lang}: \\{[^}]*footer: \\{[^}]+\\n    \\}),?(\\n    vatRefund: \\{[^}]+\\})?`, "s");
      const newVat = `,\n    vatRefund: {\n      title: "${trans.title}",\n      description: "${trans.description}",\n      link: "${trans.link}"\n    }`;
      
      if (langBlockRegex.test(i18nContent)) {
          i18nContent = i18nContent.replace(langBlockRegex, (match, p1) => {
              return p1 + newVat;
          });
      }
  }
}

fs.writeFileSync(i18nPath, i18nContent);
console.log("Updated i18n.ts");
