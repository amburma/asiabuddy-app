import * as fs from 'fs';

const filePath = 'src/data/vatRefundGuide.ts';

// Template components
const getTemplate = (langName, title, q1, q1_desc, note, note_desc, eligibility, e1, e1_desc, e2, e2_min, e2_desc, e3, e3_desc, steps, s1, s1_desc, s1_form, s2, s2_desc, s2_action, critical, critical_desc, s3, s3_desc, s3_action, tips, t1, t1_desc, t2, t2_desc, t3, t3_desc, checklist, cl1, cl2, cl3, footer) => `  ${langName}: \`# ${title}

---

## ${q1}

${q1_desc}

***${note}***: *${note_desc}*

---

## ${eligibility}

${eligibility_desc || 'Để đủ điều kiện được hoàn thuế VAT, bạn phải đáp ứng các tiêu chuẩn sau:'}

*   **${e1}**: *${e1_desc}*
*   **${e2}**: *${e2_desc}*
*   **${e3}**: *${e3_desc}*

---

## ${steps}

### ${s1}

${s1_desc}

${s1_form}

### ${s2}

${s2_desc}

${s2_action}

***${critical}***: *${critical_desc}*

### ${s3}

${s3_desc}

${s3_action}

---

## ${tips}

*   **${t1}**: *${t1_desc}*
*   **${t2}**: *${t2_desc}*
*   **${t3}**: *${t3_desc}*

---

## ${checklist}

*   **${cl1}**
*   **${cl2}**
*   **${cl3}**

---

*${footer}*\`,\n`;

// I will now collect the existing content for the languages I have.
// To keep it simple, I'll use placeholders for the lost ones and let the AI fill them in.
// Actually, I'll just write the whole file content in the script.

const malay = `  malay: \`# Panduan Bayaran Balik VAT untuk Pelancong

---

## Apakah itu Bayaran Balik VAT?

Kebanyakan negara mengutip cukai terutamanya daripada warganegara mereka. Oleh kerana pelancong asing tidak menetap di negara tersebut, mereka layak mendapat bayaran balik **Cukai Tambah Nilai (VAT)** yang dibayar ke atas barangan yang dibeli.

***Nota Penting***: *Anda tidak boleh menuntut bayaran balik VAT untuk perbelanjaan makan, yuran hotel atau caj perkhidmatan. Bayaran balik hanya terpakai untuk "Barangan Fizikal" yang akan dibawa keluar dari negara tersebut.*

---

## Syarat Kelayakan

Untuk layak mendapat bayaran balik VAT, anda mesti memenuhi kriteria berikut:

*   **Status Warganegara Asing**: *Anda mestilah seorang pemastautin bukan tetap. Anda tidak boleh menjadi orang yang memegang visa pemastautin atau permit kerja di negara tersebut.*
*   **Pembelian Minimum**: *Anda mesti memenuhi syarat perbelanjaan minimum di satu kedai dalam satu hari (cth., 2,000 Baht di Thailand).*
*   **Kedai Sah**: *Pembelian mestilah dibuat dari kedai yang memaparkan tanda "VAT Refund for Tourists".*

---

## Langkah-langkah untuk Menuntut Bayaran Balik VAT Anda

### Langkah 1: Di Kedai (Semasa Pembelian)

Semasa membayar, tunjukkan **Pasport** anda untuk meminta **Borang Bayaran Balik VAT**.

Kedai akan memberikan anda **Borang Permohonan Bayaran Balik VAT** bersama dengan **Invois Cukai**.

### Langkah 2: Di Lapangan Terbang (Sebelum Daftar Masuk)

Sebelum mendaftar masuk bagasi anda, anda mesti melawat **Pejabat Pemeriksaan Kastam (Customs Inspection Office)**.

Tunjukkan **Pasport**, **Borang**, dan **Barangan yang Dibeli** kepada pegawai untuk mendapatkan **Setem Kastam** pada borang anda.

***Keperluan Penting***: *Anda tidak boleh mengeluarkan wang tanpa setem ini. Barangan bernilai tinggi (cth., telefon, jam tangan, barang kemas) selalunya diperiksa secara langsung oleh pegawai.*

### Langkah 3: Di Dalam Lapangan Terbang (Selepas Imigresen)

Selepas melalui Imigresen dan memasuki Lounge Pelepasan, pergi ke **Kaunter Bayaran Balik VAT (VAT Refund Counter)**.

Serahkan **borang yang telah disetem** untuk menerima bayaran balik anda dalam bentuk **Tunai** atau sebagai kredit ke **Kad Kredit** anda.\`,\n`;

const indonesian = `  indonesian: \`# Panduan Pengembalian Dana PPN (VAT Refund) untuk Wisatawan

---

## Apa itu Pengembalian Dana PPN?

Sebagian besar negara memungut pajak terutama dari warga negaranya. Karena wisatawan asing tidak menetap di negara tersebut, mereka berhak mendapatkan pengembalian dana atas **Pajak Pertambahan Nilai (PPN)** yang dibayarkan atas barang yang dibeli.

***Catatan Penting***: *Anda tidak dapat mengklaim pengembalian dana PPN untuk biaya makan, biaya hotel, atau biaya layanan. Pengembalian dana hanya berlaku untuk "Barang Fisik" yang akan dibawa keluar dari negara tersebut.*

---

## Syarat Kelayakan

Untuk memenuhi syarat pengembalian dana PPN, Anda harus memenuhi kriteria berikut:

*   **Status Warga Negara Asing**: *Anda harus merupakan penduduk non-menetap. Anda tidak boleh merupakan orang yang memegang visa penduduk atau izin kerja di negara tersebut.*
*   **Minimal Pembelian**: *Anda harus memenuhi syarat minimal belanja di satu toko dalam satu hari (misalnya, 2.000 Baht di Thailand).*
*   **Toko Berizin**: *Pembelian harus dilakukan di toko yang memasang tanda "VAT Refund for Tourists".*

---

## Langkah-langkah Mengklaim Pengembalian Dana PPN Anda

### Langkah 1: Di Toko (Saat Pembelian)

Saat membayar, tunjukkan **Paspor** Anda untuk meminta **Formulir Pengembalian Dana PPN**.

Toko akan memberi Anda **Formulir Aplikasi Pengembalian Dana PPN** beserta **Faktur Pajak**.

### Langkah 2: Di Bandara (Sebelum Check-in)

Sebelum menitipkan bagasi, Anda harus mengunjungi **Kantor Inspeksi Bea Cukai (Customs Inspection Office)**.

Tunjukkan **Paspor**, **Formulir**, dan **Barang yang Dibeli** kepada petugas untuk mendapatkan **Stempel Bea Cukai** pada formulir Anda.

***Persyaratan Penting***: *Anda tidak dapat menarik uang tanpa stempel ini. Barang-barang bernilai tinggi (misalnya ponsel, jam tangan, perhiasan) sering kali diperiksa langsung oleh petugas.*

### Langkah 3: Di Dalam Bandara (Setelah Imigrasi)

Setelah melewati Imigrasi dan memasuki Ruang Keberangkatan, pergilah ke **Loket Pengembalian Dana PPN (VAT Refund Counter)**.

Serahkan **formulir yang telah distempel** untuk menerima pengembalian dana Anda dalam bentuk **Tunai** atau sebagai kredit ke **Kartu Kredit** Anda.\`,\n`;

const japanese = `  japanese: \`# 旅行者のためのVAT還付ガイド

---

## VAT還付とは何ですか？

ほとんどの国では、主に自国民から税金を徴収しています。外国人観光客はその国に定住しないため、購入した物品に対して支払った**付加価値税（VAT）**の還付を受ける権利があります。

***重要な注意点***：*食事代、宿泊代、サービス料についてはVAT還付を申請できません。還付は国外に持ち出す「物理的な物品」のみに適用されます。*

---

## 受給資格

VAT還付を受けるには、以下の基準を満たす必要があります。

*   **外国人ステータス**：*非居住者である必要があります。その国の居住ビザや労働許可証を所持している方は対象外です。*
*   **最低購入金額**：*1日1店舗あたりの最低購入金額（例：タイでは2,000バーツ）を満たす必要があります。*
*   **認定店舗**：*「VAT Refund for Tourists」の標識が掲示されている店舗で購入する必要があります。*

---

## VAT還付を請求する手順

### ステップ1：店舗にて（購入時）

支払いの際、**パスポート**を提示して**VAT還付請求書**を依頼してください。

店舗から**付加価値税還付申請書**と**税金請求書**が渡されます。

### ステップ2：空港にて（チェックイン前）

荷物を預ける前に、**税関検査室（Customs Inspection Office）**を訪れる必要があります。

係員に**パスポート**、**申請書**、**購入した物品**を提示し、申請書に**税関スタンプ**をもらってください。

***重要な要件***：*このスタンプがないと、還付金を受け取ることはできません。高額商品（携帯電話、時計、宝石など）は、係員によって直接検査されることがよくあります。*

### ステップ3：空港内（出国審査後）

出国審査を通過して出発ラウンジに入ったら、**VAT還付カウンター（VAT Refund Counter）**へ向かってください。

**スタンプ済みの申請書**を提出し、**現金**または**クレジットカード**への返金を受けてください。\`,\n`;

const korean = `  korean: \`# 여행자를 위한 부가세(VAT) 환급 안내

---

## 부가세 환급이란 무엇인가요?

대부분의 국가는 주로 자국민으로부터 세금을 징수합니다. 외국인 관광객은 해당 국가에 거주하지 않으므로, 구매한 물품에 대해 지불한 **부가가치세(VAT)**를 환급받을 권리가 있습니다.

***중요 참고 사항***: *식사 비용, 호텔 숙박비 또는 서비스 요금에 대해서는 부가세 환급을 청구할 수 없습니다. 환급은 해당 국가 밖으로 반출할 "실물 상품"에 대해서만 적용됩니다.*

---

## 자격 요건

부가세 환급을 받으려면 다음 기준을 충족해야 합니다.

*   **외국인 신분**: *비거주자여야 합니다. 해당 국가의 거주 비자나 노동 허가증을 소지한 사람은 대상에서 제외됩니다.*
*   **최소 구매 금액**: *하루 한 매장에서의 최소 구매 금액(예: 태국의 경우 2,000바트)을 충족해야 합니다.*
*   **지정 매장**: *"VAT Refund for Tourists" 표지판이 있는 매장에서 구매해야 합니다.*

---

## 부가세 환급 청구 절차

### 1단계: 매장에서 (구매 시)

결제 시, **여권**을 제시하고 **부가세 환급 양식**을 요청하세요.

매장에서 **세금 계산서**와 함께 **부가세 환급 신청서**를 제공합니다.

### 2단계: 공항에서 (체크인 전)

수하물을 부치기 전에 **세관 검사소(Customs Inspection Office)**를 방문해야 합니다.

**여권**, **환급 양식**, **구매한 물품**을 세관원에게 보여주고 양식에 **세관 확인 도장**을 받으세요.

***중요 사항***: *이 확인 도장이 없으면 환급금을 받을 수 없습니다. 고가 품목(휴대폰, 시계, 보석 등)은 세관원이 직접 확인하는 경우가 많습니다.*

### 3단계: 공항 내부 (출국 심사 후)

출국 심사를 마치고 면세 구역에 들어간 후, **부가세 환급 카운터(VAT Refund Counter)**를 찾으세요.

**도장이 찍힌 양식**을 제출하고 **현금**으로 받거나 **신용카드**로 환급받으세요.\`,\n`;

const hindi = `  hindi: \`# यात्रियों के लिए वैट रिफंड गाइड

---

## वैट रिफंड क्या है?

अधिकांश देश मुख्य रूप से अपने नागरिकों से कर एकत्र करते हैं। चूंकि विदेशी पर्यटक देश में नहीं बसते हैं, इसलिए वे खरीदे गए सामान पर भुगतान किए गए **मूल्य वर्धित कर (VAT)** पर रिफंड के पात्र हैं।

***महत्वपूर्ण नोट***: *आप भोजन के खर्च, होटल शुल्क या सेवा शुल्क के लिए वैट रिफंड का दावा नहीं कर सकते। रिफंड केवल "भौतिक वस्तुओं" पर लागू होता है जिन्हें देश से बाहर ले जाया जाएगा।*

---

## पात्रता आवश्यकताएँ

वैट रिफंड के लिए अर्हता प्राप्त करने के लिए, आपको निम्नलिखित मानदंडों को पूरा करना होगा:

*   **विदेशी स्थिति**: *आपको एक गैर-निवासी होना चाहिए। आप उस देश में निवासी वीजा या वर्क परमिट रखने वाले व्यक्ति नहीं हो सकते।*
*   **न्यूनतम खरीदारी**: *आपको एक दिन के भीतर एक ही स्टोर में न्यूनतम खर्च की आवश्यकता (जैसे, थाईलैंड में 2,000 baht) को पूरा करना होगा।*
*   **अधिकृत स्टोर**: *खरीदारी उन दुकानों से की जानी चाहिए जिनमें "VAT Refund for Tourists" का साइन लगा हो।*

---

## आपके वैट रिफंड का दावा करने के चरण

### चरण 1: स्टोर पर (खरीदारी के दौरान)

भुगतान करते समय, **वैट रिफंड फॉर्म** के लिए अनुरोध करने के लिए अपना **पासपोर्ट** प्रस्तुत करें।

स्टोर आपको **टैक्स इनवॉइस** के साथ **वैट रिफंड आवेदन फॉर्म** प्रदान करेगा।

### चरण 2: हवाई अड्डे पर (चेक-इन से पहले)

अपना सामान चेक-इन करने से पहले, आपको **सीमा शुल्क निरीक्षण कार्यालय (Customs Inspection Office)** पर जाना होगा।

अपने फॉर्म पर **सीमा शुल्क स्टैम्प** प्राप्त करने के लिए अधिकारी को अपना **पासपोर्ट**, **फॉर्म**, और **खरीदा गया सामान** दिखाएं।

### चरण 3: हवाई अड्डे के अंदर (इमिग्रेशन के बाद)

इमिग्रेशन से गुजरने और डिपार्चर लाउंज में प्रवेश करने के बाद, **वैट रिफंड काउंटर (VAT Refund Counter)** पर जाएं।

अपने रिफंड को **नकद** या अपने **क्रेडिट कार्ड** में प्राप्त करने के लिए अपने **स्टैम्प लगे फॉर्म** जमा करें।\`,\n`;

const thai = `  thai: \`# คู่มือการขอคืนภาษีมูลค่าเพิ่ม (VAT Refund) สำหรับนักท่องเที่ยว

---

## การขอคืนภาษีมูลค่าเพิ่มคืออะไร?

ประเทศส่วนใหญ่จัดเก็บภาษีจากพลเมืองของตนเป็นหลัก เนื่องจากนักท่องเที่ยวต่างชาติไม่ได้พำนักอาศัยอยู่ในประเทศ จึงมีสิทธิ์ได้รับคืน **ภาษีมูลค่าเพิ่ม (VAT)** ที่ชำระแล้วสำหรับสินค้าที่ซื้อ

***หมายเหตุสำคัญ***: *คุณไม่สามารถขอคืนภาษี VAT สำหรับค่าอาหาร ค่าโรงแรม หรือค่าบริการได้ การคืนภาษีมีผลเฉพาะกับ "สินค้าที่เป็นวัตถุ" ที่จะนำออกนอกประเทศเท่านั้น*

---

## คุณสมบัติผู้มีสิทธิ์ขอคืนภาษี

เพื่อให้มีคุณสมบัติในการขอคืนภาษี คุณต้องเป็นไปตามเกณฑ์ดังต่อไปนี้:

*   **สถานะชาวต่างชาติ**: *คุณต้องเป็นผู้ที่ไม่พำนักอาศัยในประเทศ (Non-resident) คุณต้องไม่เป็นผู้ถือวีซ่าพำนักอาศัยหรือใบอนุญาตทำงานในประเทศนั้น*
*   **ยอดซื้อขั้นต่ำ**: *คุณต้องมียอดซื้อขั้นต่ำตามที่กำหนด ณ ร้านค้าเพียงแห่งเดียวภายในหนึ่งวัน (เช่น 2,000 บาท ในประเทศไทย)*
*   **ร้านค้าที่ได้รับอนุญาต**: *สินค้าต้องซื้อจากร้านค้าที่มีป้ายแสดง "VAT Refund for Tourists"*

---

## ขั้นตอนการขอคืนภาษีมูลค่าเพิ่มของคุณ

### ขั้นตอนที่ 1: ที่ร้านค้า (ขณะซื้อสินค้า)

ขณะชำระเงิน ให้แสดง **พาสปอร์ต** ของคุณเพื่อขอ **แบบฟอร์มขอคืนภาษี**

ทางร้านจะให้ **แบบคำร้องขอคืนภาษีมูลค่าเพิ่ม** พร้อมกับ **ใบกำกับภาษี**

### ขั้นตอนที่ 2: ที่สนามบิน (ก่อนเช็คอิน)

ก่อนเช็คอินกระเป๋าเดินทาง คุณต้องไปที่ **สำนักงานตรวจศุลกากร (Customs Inspection Office)**

แสดง **พาสปอร์ต**, **แบบฟอร์ม**, และ **สินค้าที่ซื้อ** ต่อเจ้าหน้าที่เพื่อรับ **ตราประทับศุลกากร** ลงในแบบฟอร์มของคุณ

### ขั้นตอนที่ 3: ภายในสนามบิน (หลังผ่านด่านตรวจคนเข้าเมือง)

หลังจากผ่านด่านตรวจคนเข้าเมืองและเข้าสู่ห้องรับรองผู้โดยสารขาออกแล้ว ให้ไปที่ **เคาน์เตอร์คืนภาษีมูลค่าเพิ่ม (VAT Refund Counter)**

ยื่น **แบบฟอร์มที่มีตราประทับ** เพื่อรับเงินคืนเป็น **เงินสด** หรือคืนเข้า **บัตรเครดิต** ของคุณ\`,\n`;

// Get current content and re-insert everything in correct order
const current = fs.readFileSync(filePath, 'utf8');
const header = current.substring(0, current.indexOf('chinese:') + current.indexOf('\`# 旅客增值税退税指南')) ; // Approximate
// This is fragile. I'll just find the exact line indices.

const chineseEndMarker = '*如果您按照这些步骤操作，您可以追回购买价值的 **5% 到 15%**（取决于国家/地区）！*`,\n';
const chineseEndIndex = current.indexOf(chineseEndMarker) + chineseEndMarker.length;
const farsiStartIndex = current.indexOf('  farsi:');

const pre = current.substring(0, chineseEndIndex);
const post = current.substring(farsiStartIndex);

const middle = malay + indonesian + hindi + japanese + korean + thai;

fs.writeFileSync(filePath, pre + middle + post);
console.log('Final reconstruction complete.');
