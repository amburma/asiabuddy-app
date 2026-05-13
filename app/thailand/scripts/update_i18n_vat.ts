import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/i18n.ts");
let content = fs.readFileSync(filePath, "utf-8");

const vatTranslations: Record<string, any> = {
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
  myanmar: {
    title: "ခရီးသွားများအတွက် VAT ပြန်အမ်းငွေလမ်းညွှန်",
    description: "'ကမ္ဘာလှည့်ခရီးသည်များအတွက် VAT ပြန်အမ်းငွေ' ဆိုင်းဘုတ်များကို ရှာပါ။ အနည်းဆုံး 2k THB သုံးစွဲပါ။",
    link: "အသေးစိတ်အချက်အလက်များအတွက် VAT ပြန်အမ်းငွေ"
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
  }
};

// Fill others with English fallback
const allLanguages = [
  'myanmar', 'english', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

for (const lang of allLanguages) {
  if (!vatTranslations[lang]) {
    vatTranslations[lang] = vatTranslations.english;
  }
}

// Inject into content
// Add to ENGLISH_UI
content = content.replace(/(  footer: \{[^}]+\n  \})/s, `$1,\n  vatRefund: {\n    title: "VAT Refund Guide for Travelers",\n    description: "Look for 'VAT Refund for Tourists' signs. Min spend 2k THB.",\n    link: "VAT Refund for more details information"\n  }`);

// Add to other languages in UI_TRANSLATIONS
for (const lang of allLanguages) {
  if (lang === 'english') continue;
  
  const trans = vatTranslations[lang];
  const langBlockRegex = new RegExp(`(${lang}: \\{[^}]*footer: \\{[^}]+\\n    \\})`, "s");
  if (langBlockRegex.test(content)) {
    content = content.replace(langBlockRegex, `$1,\n    vatRefund: {\n      title: "${trans.title}",\n      description: "${trans.description}",\n      link: "${trans.link}"\n    }`);
  }
}

fs.writeFileSync(filePath, content);
console.log("Updated i18n.ts with vatRefund translations");
