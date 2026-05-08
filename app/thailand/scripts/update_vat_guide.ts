import fs from "fs";
import path from "path";

const allLanguages = [
  'myanmar', 'english', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

type GuideContent = {
  title: string;
  q1: string;
  a1: string;
  noteLabel: string;
  note: string;
  eligibilityTitle: string;
  eligibilityIntro: string;
  eligibilityItems: { label: string; desc: string }[];
  stepsTitle: string;
  step1: { title: string; items: string[] };
  step2: { title: string; items: string[]; criticalLabel: string; criticalDesc: string };
  step3: { title: string; items: string[] };
  tipsTitle: string;
  tips: { label: string; desc: string }[];
  checklistTitle: string;
  checklist: { label: string; desc: string }[];
  footer: string;
};

const templates: Record<string, GuideContent> = {
  english: {
    title: "VAT Refund Guide for Travelers",
    q1: "1. What is a VAT Refund?",
    a1: "Most countries collect taxes primarily from their citizens. Since foreign tourists do not settle in the country, they are eligible for a refund on the Value Added Tax (VAT) paid on purchased goods.",
    noteLabel: "Important Note",
    note: "You cannot claim a VAT refund for dining expenses, hotel fees, or service charges. Refunds are only applicable to \"Physical Goods\" that will be taken out of the country.",
    eligibilityTitle: "2. Eligibility Requirements",
    eligibilityIntro: "To qualify for a VAT refund, you must meet the following criteria:",
    eligibilityItems: [
      { label: "Foreign Status", desc: "You must be a non-resident. You cannot be a person holding a resident visa or a work permit in that country." },
      { label: "Minimum Purchase", desc: "You must meet the minimum spending requirement at a single store within one day (e.g., 2,000 Baht in Thailand)." },
      { label: "Authorized Stores", desc: "Purchases must be made at shops displaying the \"VAT Refund for Tourists\" sign." }
    ],
    stepsTitle: "3. Steps to Claim Your VAT Refund",
    step1: {
      title: "Step 1: At the Store (During Purchase)",
      items: [
        "When paying, present your **Passport** to request a VAT Refund Form. (Some stores may accept a passport copy).",
        "The store will provide you with a **VAT Refund Application Form** (e.g., P.P.10 Form in Thailand) along with the Tax Invoice."
      ]
    },
    step2: {
      title: "Step 2: At the Airport (Before Check-in)",
      items: [
        "Before checking your luggage, you must visit the **Customs Inspection Office**.",
        "Present your **Passport, Forms, and the Purchased Goods** to the officer to obtain a **Customs Stamp** on your forms."
      ],
      criticalLabel: "Critical Requirement",
      criticalDesc: "You cannot withdraw money without this stamp. High-value items (e.g., phones, watches, jewelry) are often inspected directly by the officer."
    },
    step3: {
      title: "Step 3: Inside the Airport (After Immigration)",
      items: [
        "After passing through Immigration and entering the Departure Lounge, proceed to the **VAT Refund Counter**.",
        "Submit your stamped forms to receive your refund in **Cash** or as a credit to your **Credit Card**."
      ]
    },
    tipsTitle: "4. Essential Tips for Travelers",
    tips: [
      { label: "Keep Items Accessible", desc: "Pack your purchased goods in a way that makes them easy to retrieve if a Customs officer asks to inspect them." },
      { label: "Arrive Early", desc: "Airport queues for VAT refunds can be long. It is recommended to arrive at least 3 hours before your flight." },
      { label: "Service Fees", desc: "Please note that a small service fee is usually deducted from the total refund amount." }
    ],
    checklistTitle: "Summary Checklist for Travelers",
    checklist: [
      { label: "Step 1 [At the Store]", desc: "Present your Passport and request the official VAT Form." },
      { label: "Step 2 [Airport - Outside]", desc: "Obtain the mandatory Customs Stamp before checking in your luggage." },
      { label: "Step 3 [Airport - Inside]", desc: "Visit the VAT Refund Counter to collect your cash or credit." }
    ],
    footer: "By following these steps, you can recover between 5% to 15% (depending on the country) of the value of your purchases!"
  },
  thai: {
    title: "คู่มือการขอคืนภาษีมูลค่าเพิ่ม (VAT Refund) สำหรับนักท่องเที่ยว",
    q1: "1. การขอคืนภาษีมูลค่าเพิ่ม (VAT Refund) คืออะไร?",
    a1: "ประเทศส่วนใหญ่เรียกเก็บภาษีจากพลเมืองของตนเป็นหลัก เนื่องจากนักท่องเที่ยวต่างชาติไม่ได้พำนักอยู่ในประเทศ จึงมีสิทธิ์ขอคืนภาษีมูลค่าเพิ่ม (VAT) ที่ชำระสำหรับสินค้าที่ซื้อได้",
    noteLabel: "หมายเหตุสำคัญ",
    note: "คุณไม่สามารถขอคืนภาษี VAT สำหรับค่าอาหาร ค่าโรงแรม หรือค่าบริการได้ การขอคืนเงินจะมีผลกับ \"สินค้าที่จับต้องได้\" ที่จะนำออกนอกประเทศเท่านั้น",
    eligibilityTitle: "2. คุณสมบัติของผู้มีสิทธิ์",
    eligibilityIntro: "เพื่อให้มีคุณสมบัติในการขอคืนภาษี VAT คุณต้องเป็นไปตามเกณฑ์ต่อไปนี้:",
    eligibilityItems: [
      { label: "สถานะชาวต่างชาติ", desc: "คุณต้องเป็นผู้ที่ไม่ได้พำนักอาศัยในประเทศ (Non-resident) คุณต้องไม่ใช่ผู้ถือวีซ่าพำนักหรือใบอนุญาตทำงานในประเทศนั้น" },
      { label: "การซื้อขั้นต่ำ", desc: "คุณต้องมียอดซื้อขั้นต่ำตามที่กำหนดในร้านค้าเดียวภายในหนึ่งวัน (เช่น 2,000 บาท ในประเทศไทย)" },
      { label: "ร้านค้าที่ได้รับอนุญาต", desc: "ต้องซื้อจากร้านค้าที่แสดงป้าย \"VAT Refund for Tourists\"" }
    ],
    stepsTitle: "3. ขั้นตอนการขอคืนภาษี VAT",
    step1: {
      title: "ขั้นตอนที่ 1: ที่ร้านค้า (ขณะซื้อสินค้า)",
      items: [
        "เมื่อชำระเงิน ให้แสดง **หนังสือเดินทาง (Passport)** เพื่อขอแบบฟอร์มขอคืนภาษี VAT (บางร้านอาจรับสำเนาพาสปอร์ต)",
        "ร้านค้าจะมอบ **แบบคำร้องขอคืนภาษีมูลค่าเพิ่ม** (เช่น แบบ ภ.พ.10 ในประเทศไทย) พร้อมกับใบกำกับภาษี"
      ]
    },
    step2: {
      title: "ขั้นตอนที่ 2: ที่สนามบิน (ก่อนเช็คอิน)",
      items: [
        "ก่อนโหลดกระเป๋าเดินทาง คุณต้องไปที่ **สำนักงานศุลกากร (Customs Inspection Office)**",
        "แสดง **พาสปอร์ต, แบบฟอร์ม และตัวสินค้าที่ซื้อ** ต่อเจ้าหน้าที่เพื่อรับ **ตราประทับศุลกากร** บนแบบฟอร์มของคุณ"
      ],
      criticalLabel: "ข้อกำหนดสำคัญ",
      criticalDesc: "คุณไม่สามารถเบิกเงินคืนได้หากไม่มีตราประทับนี้ สินค้าที่มีมูลค่าสูง (เช่น โทรศัพท์, นาฬิกา, เครื่องประดับ) มักจะถูกตรวจสอบโดยตรงจากเจ้าหน้าที่"
    },
    step3: {
      title: "ขั้นตอนที่ 3: ภายในสนามบิน (หลังผ่านด่านตรวจคนเข้าเมือง)",
      items: [
        "หลังจากผ่านด่านตรวจคนเข้าเมืองและเข้าสู่ห้องพักผู้โดยสารขาออกแล้ว ให้ไปที่ **เคาน์เตอร์ขอคืนภาษี VAT (VAT Refund Counter)**",
        "ยื่นแบบฟอร์มที่ประทับตราแล้วเพื่อรับเงินคืนเป็น **เงินสด** หรือคืนเข้า **บัตรเครดิต** ของคุณ"
      ]
    },
    tipsTitle: "4. เคล็ดลับสำคัญสำหรับนักเดินทาง",
    tips: [
      { label: "เก็บสินค้าให้หยิบง่าย", desc: "แพ็คสินค้าที่ซื้อมาให้หยิบออกมาได้ง่ายในกรณีที่เจ้าหน้าที่ศุลกากรขอตรวจสอบ" },
      { label: "ไปถึงสนามบินแต่เนิ่นๆ", desc: "คิวรอคืนภาษี VAT ที่สนามบินอาจยาวมาก แนะนำให้ไปถึงก่อนเที่ยวบินอย่างน้อย 3 ชั่วโมง" },
      { label: "ค่าธรรมเนียมการบริการ", desc: "โปรดทราบว่ามักจะมีการหักค่าธรรมเนียมบริการจำนวนเล็กน้อยจากยอดคืนเงินทั้งหมด" }
    ],
    checklistTitle: "สรุปเช็คลิสต์สำหรับนักเดินทาง",
    checklist: [
      { label: "ขั้นตอนที่ 1 [ที่ร้านค้า]", desc: "แสดงพาสปอร์ตและขอแบบฟอร์ม VAT อย่างเป็นทางการ" },
      { label: "ขั้นตอนที่ 2 [สนามบิน - ด้านนอก]", desc: "รับตราประทับศุลกากรที่จำเป็นก่อนเช็คอินกระเป๋าเดินทาง" },
      { label: "ขั้นตอนที่ 3 [สนามบิน - ด้านใน]", desc: "ไปที่เคาน์เตอร์ขอคืนภาษี VAT เพื่อรับเงินสดหรือเครดิต" }
    ],
    footer: "การปฏิบัติตามขั้นตอนเหล่านี้จะช่วยให้คุณได้รับเงินคืนประมาณ 5% ถึง 15% (ขึ้นอยู่กับแต่ละประเทศ) ของมูลค่าสินค้าที่คุณซื้อ!"
  }
};

function generateMarkdown(content: GuideContent) {
  return `# ${content.title}

---

## ${content.q1}
${content.a1}

***${content.noteLabel}***: *${content.note}*

---

## ${content.eligibilityTitle}
${content.eligibilityIntro}

${content.eligibilityItems.map(item => `- **[${item.label}]**: ${item.desc}`).join('\n\n')}

---

## ${content.stepsTitle}

### ${content.step1.title}
${content.step1.items.map(item => `- ${item}`).join('\n\n')}

### ${content.step2.title}
${content.step2.items.map(item => `- ${item}`).join('\n\n')}

<u>***${content.step2.criticalLabel}***</u>: *${content.step2.criticalDesc}*

### ${content.step3.title}
${content.step3.items.map(item => `- ${item}`).join('\n\n')}

---

## ${content.tipsTitle}
${content.tips.map(item => `- **[${item.label}]**: ${item.desc}`).join('\n\n')}

---

## ${content.checklistTitle}
${content.checklist.map(item => `- **[${item.label}]**: ${item.desc}`).join('\n\n')}

---

*${content.footer}*`;
}

let fileContent = `import { ThaiLanguage } from '../types';\n\n`;
fileContent += `export const VAT_REFUND_GUIDE: Record<ThaiLanguage, string> = {\n`;

for (const lang of allLanguages) {
  const content = templates[lang] || templates.english;
  const markdown = generateMarkdown(content);
  const escaped = markdown.replace(/`/g, "\\`").replace(/\${/g, "\\${");
  fileContent += `  ${lang}: \`${escaped}\`,\n`;
}

fileContent += `};\n`;

fs.writeFileSync(path.join(process.cwd(), "src/data/vatRefundGuide.ts"), fileContent);
console.log("Updated vatRefundGuide.ts with formatting");
