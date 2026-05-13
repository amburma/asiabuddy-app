import fs from "fs";
import path from "path";

const allLanguages = [
  'myanmar', 'english', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

const uiTranslations: Record<string, any> = {
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
    description: "'पर्यटकों के लिए ভ্যাট ফেরত' চিহ্ন খুঁজুন। ন্যূনতম খরচ ২ হাজার থাই বাত।",
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
    description: "חפשו שלטי \"החזר מע\"מ לתיירים\". הוצאה מינימלית 2,000 באט.",
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

const i18nPath = path.join(process.cwd(), "src/i18n.ts");
let content = fs.readFileSync(i18nPath, "utf-8");

for (const lang of allLanguages) {
  const t = uiTranslations[lang] || uiTranslations.english;
  
  if (lang === 'english') {
    // English is usually at the start in ENGLISH_UI
    const englishVatRegex = /vatRefund: \{[^}]+\}/;
    const newEnglishVat = `vatRefund: {\n    title: "${t.title}",\n    description: "${t.description}",\n    link: "${t.link}"\n  }`;
    if (englishVatRegex.test(content)) {
      content = content.replace(englishVatRegex, newEnglishVat);
    } else {
      // Find the end of ENGLISH_UI
      const englishUIEnd = content.indexOf("};", content.indexOf("const ENGLISH_UI"));
      content = content.substring(0, englishUIEnd - 1) + `,\n  vatRefund: {\n    title: "${t.title}",\n    description: "${t.description}",\n    link: "${t.link}"\n  }\n` + content.substring(englishUIEnd);
    }
  } else {
    // Generic approach for UI_TRANSLATIONS
    const langKey = `  ${lang}: {`;
    const langIndex = content.indexOf(langKey);
    if (langIndex === -1) continue;
    
    // Find where the block ends. It's usually   }, at the same indentation level
    // But we can just find the next   }, that follows a block like footer: { ... }
    const footerEndIndex = content.indexOf("    }", content.indexOf("footer: {", langIndex));
    if (footerEndIndex === -1) continue;
    
    // Check if vatRefund already exists for this block
    const blockEndIndex = content.indexOf("\n  },", langIndex);
    const blockPart = content.substring(langIndex, blockEndIndex);
    
    if (blockPart.includes("vatRefund:")) {
      // Replace existing
      const vatStart = content.indexOf("vatRefund: {", langIndex);
      const vatEnd = content.indexOf("}", vatStart);
      const newVat = `vatRefund: {\n      title: "${t.title}",\n      description: "${t.description}",\n      link: "${t.link}"\n    }`;
      content = content.substring(0, vatStart) + newVat + content.substring(vatEnd + 1);
    } else {
      // Insert after footer closing brace
      const insertion = `,\n    vatRefund: {\n      title: "${t.title}",\n      description: "${t.description}",\n      link: "${t.link}"\n    }`;
      content = content.substring(0, footerEndIndex + 5) + insertion + content.substring(footerEndIndex + 5);
    }
  }
}

fs.writeFileSync(i18nPath, content);
console.log("Updated i18n.ts with ALL languages robustly");
