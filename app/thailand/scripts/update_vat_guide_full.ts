import fs from "fs";
import path from "path";

const allLanguages = [
  'myanmar', 'english', 'spanish', 'french', 'italian', 'german', 
  'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
  'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
  'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
  'swedish', 'turkish'
];

const guides: Record<string, string> = {
  english: `# VAT Refund Guide for Travelers

---

## 1. What is a VAT Refund?
Most countries collect taxes primarily from their citizens. Since foreign tourists do not settle in the country, they are eligible for a refund on the Value Added Tax (VAT) paid on purchased goods.

***Important Note***: *You cannot claim a VAT refund for dining expenses, hotel fees, or service charges. Refunds are only applicable to "Physical Goods" that will be taken out of the country.*

---

## 2. Eligibility Requirements
- **[Foreign Status]**: You must be a non-resident.
- **[Minimum Purchase]**: Meet requirement (e.g., 2,000 Baht in Thailand).
- **[Authorized Stores]**: Shops with "VAT Refund for Tourists" sign.

---

## 3. Steps to Claim Your VAT Refund
1. **At the Store**: Present **Passport** for VAT Form.
2. **At the Airport (Outside)**: Visit **Customs** for **Stamp** before check-in.
3. **At the Airport (Inside)**: Visit **VAT Refund Counter** for cash/credit.`,

  thai: `# คู่มือการขอคืนภาษีมูลค่าเพิ่ม (VAT Refund) สำหรับนักท่องเที่ยว

---

## 1. การขอคืนภาษีมูลค่าเพิ่มคืออะไร?
นักท่องเที่ยวต่างชาติมีสิทธิ์ขอคืนภาษีมูลค่าเพิ่ม (VAT) สำหรับสินค้าที่ซื้อและนำออกนอกประเทศ

***หมายเหตุสำคัญ***: *ไม่รวมค่าอาหาร โรงแรม หรือบริการ เฉพาะ "สินค้า" เท่านั้น*

---

## 2. คุณสมบัติ
- **[ชาวต่างชาติ]**: ไม่ได้พำนักอาศัยและไม่มีใบอนุญาตทำงาน
- **[ยอดซื้อขั้นต่ำ]**: ตามที่กำหนด (เช่น 2,000 บาท)
- **[ร้านค้าที่ร่วมรายการ]**: มีป้าย "VAT Refund for Tourists"

---

## 3. ขั้นตอน
1. **ที่ร้านค้า**: แสดง **พาสปอร์ต** ขอแบบฟอร์ม (ก.พ.10)
2. **ที่สนามบิน (ด้านนอก)**: ประทับตรา **ศุลกากร** ก่อนเช็คอินกระเป๋า
3. **ที่สนามบิน (ด้านใน)**: รับเงินที่ **เคาน์เตอร์คืนภาษี**`,

  chinese: `# 旅客增值税退税指南

---

## 1. 什么是退税？
外国游客有资格获得购买商品所支付的增值税退税。

***重要提示***：*不可用于餐饮或酒店，仅限带出境的“实物商品”。*

---

## 2. 申请资格
- **[外国公民]**：非居民且无工作许可证。
- **[最低消费]**：单店单日满足金额（如 2,000 泰铢）。
- **[授权商店]**：有“游客增值税退税”标志。

---

## 3. 步骤
1. **在商店**：出示**护照**索取退税单。
2. **机场（室外）**：托运前去**海关**盖章。
3. **机场（室内）**：去**退税柜台**领取现金或退到卡。`,

  japanese: `# 旅行者のためのVAT還付ガイド

---

## 1. VAT還付とは？
外国人観光客は購入した商品の付加価値税（VAT）の還付を受けられます。

***重要***: *飲食・宿泊は対象外。国外へ持ち出す「物品」のみ。*

---

## 2. 要件
- **[非居住者]**: 居住・就労許可のない方。
- **[最低購入額]**: 1日1店舗あたりの規定額（例: 2,000バーツ）。
- **[認定店]**: "VAT Refund for Tourists"の標識がある店。

---

## 3. 手順
1. **店舗**: **パスポート**を提示し申請書を受け取る。
2. **空港（外）**: チェックイン前に**税関**でスタンプ。
3. **空港（内）**: **還付カウンター**で現金または返金。`,

  spanish: `# Guía de reembolso de IVA para viajeros

---

## 1. ¿Qué es el reembolso de IVA?
Los turistas pueden recuperar el IVA de sus compras por no ser residentes.

***Nota***: *Solo para bienes físicos, no para hoteles o comidas.*

---

## 2. Requisitos
- **[No Residente]**: Sin visa de trabajo.
- **[Compra Mínima]**: Montante mínimo diario (ej. 2,000 THB).
- **[Tiendas]**: Logo "VAT Refund for Tourists".

---

## 3. Pasos
1. **Tienda**: Pida el formulario con su **Pasaporte**.
2. **Aeropuerto (Fuera)**: **Sello de Aduana** antes de facturar equipaje.
3. **Aeropuerto (Dentro)**: Cobro en el **Mostrador de IVA**.`,

  french: `# Guide de remboursement TVA

---

## 1. Principe
Les touristes peuvent récupérer la TVA sur les biens emportés.

***Important*** : *Exclut repas et hôtels.*

---

## 2. Conditions
- **[Non-résident]** sans permis de travail.
- **[Achat minimum]** par jour (ex: 2 000 THB).
- **[Magasins]** avec logo "VAT Refund".

---

## 3. Étapes
1. **Magasin** : Formulaire avec **Passeport**.
2. **Aéroport (Extérieur)** : **Tampon douanier** avant l'enregistrement.
3. **Aéroport (Intérieur)** : Récupération au **Guichet**.`,

  russian: `# Руководство по возврату НДС

---

## 1. Что это?
Туристы могут вернуть НДС за покупки, вывезенные из страны.

***Важно***: *Не для еды и отелей. Только для товаров.*

---

## 2. Условия
- **[Нерезидент]** без разрешения на работу.
- **[Мин. покупка]** за день (напр., 2000 бат).
- **[Магазины]** с вывеской "VAT Refund".

---

## 3. Шаги
1. **В магазине**: Форма по **Паспорту**.
2. **В аэропорту (вне)**: **Печать таможни** до регистрации.
3. **В аэропорту (внутри)**: Получение денег в **Окне возврата НДС**.`,

  arabic: `# دليل استرداد ضريبة القيمة المضافة

---

## 1. ما هو الاسترداد؟
يحق للسياح استرداد الضريبة على السلع المشتراة.

***ملاحظة***: *لا يشمل الفنادق أو الوجبات.*

---

## 2. الشروط
- **[غير مقيم]**: لا يملك تصريح عمل.
- **[الحد الأدنى]**: مبلغ محدد يومياً (مثلاً 2000 باهت).
- **[المتاجر]**: التي تحمل شعار "VAT Refund".

---

## 3. الخطوات
1. **المتجر**: اطلب النموذج بـ **الجواز**.
2. **المطار (خارجي)**: **ختم الجمارك** قبل شحن الحقائب.
3. **المطار (داخلي)**: استلام المبلغ من **مكتب الاسترداد**.`,

  korean: `# 여행자 VAT 환급 안내

---

## 1. VAT 환급이란?
외국인 여행자는 구매한 물품의 부가세(VAT)를 환급받을 수 있습니다.

***주의***: *식사, 호텔은 제외. 반출하는 "물품"만 가능.*

---

## 2. 조건
- **[비거주자]**: 취업 허가 없는 외국인.
- **[최소 금액]**: 1일 1매장 최소 금액 (예: 2,000바트).
- **[해당 매장]**: "VAT Refund for Tourists" 표시 매장.

---

## 3. 단계
1. **매장**: **여권** 제시 후 환급 서류 요청.
2. **공항 (외부)**: 체크인 전 **세관 검사 및 도장**.
3. **공항 (내부)**: **환급 창구**에서 현금 또는 카드 환급.`
};

function getMarkdown(lang: string) {
  if (guides[lang]) return guides[lang];
  return guides.english;
}

const outputPath = path.join(process.cwd(), "src/data/vatRefundGuide.ts");
let fileContent = `import { ThaiLanguage } from '../types';\n\n`;
fileContent += `export const VAT_REFUND_GUIDE: Record<ThaiLanguage, string> = {\n`;

for (const lang of allLanguages) {
  const md = getMarkdown(lang);
  const escaped = md.replace(/\`/g, "\\`").replace(/\\${/g, "\\\\${");
  fileContent += `  ${lang}: \`${escaped}\`,\n`;
}

fileContent += `};\n`;

fs.writeFileSync(outputPath, fileContent);
console.log("Updated vatRefundGuide.ts");
