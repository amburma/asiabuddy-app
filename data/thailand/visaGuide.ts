import { ThaiLanguage } from '@/types/country';

const ENGLISH_GUIDE = `# Thailand Immigration Framework & Entry Guide (2026 Update)

---

Thailand's immigration framework operates under a strict **"one country, one visa privilege"** policy. The temporary 60-day blanket visa-free scheme introduced in 2024 has been dissolved. Under the updated framework approved by the Thai Cabinet, entry pathways are strictly determined by nationality.

<u>**Implementation Note**: These updated rules take effect 15 days after formal publication in the Royal Gazette. If you entered Thailand before the active enforcement date, your original 60-day entry stamp remains fully valid until its original expiration.</u>

---

## 🛂 Allowed Stays by Nationality

Every nation is now mapped to exactly one specific entry pathway.

### 30-Day Tourist Visa Exemption (54 Countries/Territories)

Standard mainstream tourism is limited to **30 days per entry**. Eligible regions include:

* **Europe**: United Kingdom, Germany, France, Italy, Spain, Netherlands, Austria, Belgium, Switzerland, Sweden, Norway, Denmark, Finland, Ireland, Czechia, Estonia, Greece, Hungary, Iceland, Latvia, Liechtenstein, Lithuania, Luxembourg, Poland, Portugal, Romania, Slovakia, Slovenia, Turkey, Ukraine.
* **North America & Oceania**: United States, Canada, Australia, New Zealand, Fiji.
* **Asia & Middle East**: Japan, Singapore, Malaysia, Indonesia, Philippines, Brunei Darussalam, Taiwan, Bhutan, Georgia, Kyrgyzstan, UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain, Israel, Jordan.
* **Africa**: South Africa.

### 15-Day Tourist Visa Exemption

A category reserved strictly for **shorter stays**, limited exclusively to passport holders from:

* **Maldives, Mauritius, and Seychelles**.

### Visa on Arrival (VoA) – Reduced to 4 Countries

Only **4 nations** can now obtain a **15-day visa** directly at a Thai port of entry:

* **India, Serbia, Azerbaijan, and Belarus**.
* **Note**: *If your nationality was removed from the prior VoA list, you must secure an e-Visa or consular visa before booking travel.*

### Existing Bilateral Agreements (Unchanged)

Long-standing reciprocal treaties remain unaffected by the new framework:

* **90 Days**: Argentina, Brazil, Chile, Peru, and South Korea.
* **30 Days**: China, Russia, Laos, Kazakhstan, Hong Kong, Macau, Mongolia, Timor-Leste, and Vietnam.
* **14 Days**: Cambodia and Myanmar (valid only for international airport arrivals).

---

## 📋 Mandatory Entry & Border Requirements

Visa-exempt status does **not** guarantee automatic entry. Immigration officers actively verify the following documentation at the border:

* **Passport Validity**: *Minimum of 6 months remaining from the date of entry.*
* **Thailand Digital Arrival Card (TDAC)**: <u>Paper TM6 forms are fully phased out.</u> You must complete and submit the **TDAC online** via the official portal within **24 to 72 hours before landing** to receive a mandatory QR code.
* **Confirmed Onward/Return Ticket**: *Proof of a paid outbound flight departing within your legal stay window.*
* **Proof of Accommodation**: *Verifiable hotel reservation or residential address covering your itinerary.*
* **Proof of Funds**: *Officers may randomly check for cash reserves (or foreign currency equivalents) of 10,000 THB per person or 20,000 THB per family.*
* **Land Border Limit**: <u>If arriving via land checkpoints under the visa exemption scheme, you are strictly limited to a maximum of two land entries per calendar year.</u>

---

## 📅 Visa Extensions Within Thailand

If you wish to extend your stay while in the country, conditions depend heavily on how you entered:

* **30-Day Exemption Entries**: *Eligible to apply for a single 30-day extension at a local Thai Immigration Bureau office for a 1,900 THB processing fee. Approval is discretionary and requires a valid tourism-related reason.*
* **15-Day Exemption & Visa on Arrival**: *These short-stay categories are exceptionally rigid and rarely approved for extensions.*

---

## 💼 Legal Long-Stay & Alternative Visas

Because back-to-back "border runs" to reset tourist stamps are actively flagged and blocked, long-term travelers must use appropriate visa streams.

| **Visa Type** | **Target Audience** | **Permitted Stay & Criteria** |
|---|---|---|
| **Tourist Visa (TR)** | Vacationers planning a 1 to 3-month trip from the outset. | Grants a **60-day stay** per entry. Available via the e-Visa portal as single (1,000 THB) or multiple-entry (5,000 THB). Can be extended inside Thailand for +30 days (1,900 THB). |
| **Destination Thailand Visa (DTV)** | Digital nomads, remote workers, freelancers, and cultural participants (Muay Thai, cooking courses). | Valid for **5 years** with multiple entries. Permits up to **180 days per entry** (extendable in-country for an additional 180 days). Requires proof of overseas employment/contracts and a maintained savings balance of at least **500,000 THB** for 3 to 6 months. |
| **Long-Term / Retirement (Non-O, LTR)** | Retirees (aged 50+), major investors, and long-term residents. | Allows **extended residency**. These categories remain intact but face strict monitoring to ensure continuous compliance with age, asset, and stable income thresholds. |

---

*By understanding these pathways and preparing the required documentation, you can navigate Thailand's entry requirements with confidence and ensure a legal, hassle-free arrival into the Kingdom.*`;

export const VISA_GUIDE: Record<ThaiLanguage, string> = {
  EN: ENGLISH_GUIDE,
  TH: `**กรอบการทำงานด้านตรวจคนเข้าเมืองและคู่มือการเดินทางเข้าประเทศไทย (อัปเดต 2026)**

กรอบการทำงานด้านตรวจคนเข้าเมืองของประเทศไทยดำเนินงานภายใต้นโยบาย "หนึ่งประเทศ หนึ่งสิทธิ์วีซ่า" อย่างเคร่งครัด ทั้งนี้ มาตรการยกเว้นการตรวจลงตรา (วีซ่า) เป็นกรณีพิเศษ 60 วันเป็นการชั่วคราวที่เคยนำมาใช้ในปี 2024 ได้ถูกยกเลิกแล้ว ภายใต้กรอบการทำงานฉบับอัปเดตที่ผ่านการอนุมัติโดยคณะรัฐมนตรีไทย ช่องทางการเดินทางเข้าประเทศจะถูกกำหนดตามสัญชาติอย่างเข้มงวด

**หมายเหตุการบังคับใช้:** กฎระเบียบฉบับอัปเดตนี้จะมีผลบังคับใช้ 15 วันหลังจากประกาศอย่างเป็นทางการในราชกิจจานุเบกษา หากท่านเดินทางเข้าประเทศไทยก่อนวันที่มีผลบังคับใช้ ตราประทับการเข้าเมือง 60 วันเดิมของท่านจะยังคงสามารถใช้ได้โดยสมบูรณ์จนกว่าจะหมดอายุตามกำหนดเดิม

---

### 🛂 ระยะเวลาพำนักที่อนุญาตตามสัญชาติ

ทุกประเทศในปัจจุบันจะถูกจัดวางระบบให้อยู่ภายใต้ช่องทางการเข้าประเทศที่เฉพาะเจาะจงเพียงช่องทางเดียวเท่านั้น

#### การยกเว้นการตรวจลงตราเพื่อการท่องเที่ยว 30 วัน (54 ประเทศ/ดินแดน)

การท่องเที่ยวรูปแบบกระแสหลักมาตรฐานจำกัดระยะเวลาพำนักไม่เกิน 30 วันต่อการเข้าประเทศหนึ่งครั้ง ภูมิภาคที่ได้รับสิทธิ์ประกอบด้วย:

* **ยุโรป:** สหราชอาณาจักร, เยอรมนี, ฝรั่งเศส, อิตาลี, สเปน, เนเธอร์แลนด์, ออสเตรีย, เบลเยียม, สวิตเซอร์แลนด์, สวีเดน, นอร์เวย์, เดนมาร์ก, ฟินแลนด์, ไอร์แลนด์, สาธารณรัฐเช็ก, เอสโตเนีย, กรีซ, ฮังการี, ไอซ์แลนด์, ลัตเวีย, ลิกเตนสไตน์, ลิทัวเนีย, ลักเซมเบิร์ก, โปแลนด์, โปรตุเกส, โรมาเนีย, สโลวาเกีย, สโลวีเนีย, ตุรกี, ยูเครน
* **อเมริกาเหนือและโอเชียเนีย:** สหรัฐอเมริกา, แคนาดา, ออสเตรเลีย, นิวซีแลนด์, ฟิจิ
* **เอเชียและตะวันออกกลาง:** ญี่ปุ่น, สิงคโปร์, มาเลเซีย, อินโดนีเซีย, ฟิลิปปินส์, บรูไนดารุสซาลาม, ไต้หวัน, ภูฏาน, จอร์เจีย, คีร์กีซสถาน, สหรัฐอาหรับเอมิเรตส์, ซาอุดีอาระเบีย, กาตาร์, โอมาน, คูเวต, บาห์เรน, อิสราเอล, จอร์แดน
* **แอฟริกา:** แอฟริกาใต้

#### การยกเว้นการตรวจลงตราเพื่อการท่องเที่ยว 15 วัน

ประเภทนี้สงวนไว้สำหรับการพำนักในระยะสั้นเท่านั้น และจำกัดเฉพาะผู้ถือหนังสือเดินทางจากประเทศต่อไปนี้:

* มัลดีฟส์, มอริเชียส และเซเชลส์

#### วีซ่า ณ ช่องทางอนุญาตของด่านตรวจคนเข้าเมือง (Visa on Arrival - VoA) – ลดเหลือ 4 ประเทศ

ปัจจุบันมีเพียง 4 ประเทศเท่านั้นที่สามารถขอวีซ่าประเภท 15 วันได้โดยตรง ณ ช่องทางอนุญาตของด่านตรวจคนเข้าเมืองไทย:

* อินเดีย, เซอร์เบีย, อาเซอร์ไบจาน และเบลารุส
* *หมายเหตุ:* หากสัญชาติของท่านถูกถอดถอนออกจากรายชื่อ VoA ก่อนหน้านี้ ท่านต้องดำเนินการขอ e-Visa หรือวีซ่าจากสถานกงสุลให้เรียบร้อยก่อนทำการจองการเดินทาง

#### ข้อตกลงทวิภาคีที่มีอยู่เดิม (ไม่มีการเปลี่ยนแปลง)

สนธิสัญญาต่างตอบแทนที่มีผลบังคับใช้มาอย่างยาวนานจะไม่ได้รับผลกระทบจากกรอบการทำงานใหม่นี้:

* **90 วัน:** อาร์เจนตินา, บราซิล, ชิลี, เปรู และเกาหลีใต้
* **30 วัน:** จีน, รัสเซีย, ลาว, คาซัคสถาน, ฮ่องกง, มาเก๊า, มองโกเลีย, ติมอร์-เลสเต และเวียดนาม
* **14 วัน:** กัมพูชา และเมียนมา (มีผลบังคับใช้เฉพาะการเดินทางมาถึงผ่านท่าอากาศยานนานาชาติเท่านั้น)

---

### 📋 ข้อกำหนดที่จำเป็นในการเดินทางเข้าประเทศและด่านชายแดน

การได้รับสิทธิ์ยกเว้นวีซ่าไม่ได้เป็นการรับประกันการเข้าประเทศโดยอัตโนมัติ เจ้าหน้าที่ตรวจคนเข้าเมืองจะทำการตรวจสอบเอกสารดังต่อไปนี้อย่างจริงจัง ณ บริเวณด่านตรวจ:

* **อายุการใช้งานของหนังสือเดินทาง:** ต้องมีอายุการใช้งานเหลือไม่น้อยกว่า 6 เดือนนับจากวันที่เดินทางเข้าประเทศ
* **บัตรขาเข้าประเทศไทยในรูปแบบดิจิทัล (TDAC):** แบบฟอร์ม ตม.6 ในรูปแบบกระดาษได้ถูกยกเลิกการใช้งานอย่างถาวรแล้ว ท่านต้องกรอกและยื่นข้อมูล TDAC ทางออนไลน์ผ่านพอร์ทัลอย่างเป็นทางการภายใน 24 ถึง 72 ชั่วโมงก่อนเครื่องลงจอด เพื่อรับรหัส QR Code ที่จำเป็นต้องใช้
* **ตั๋วโดยสารยืนยันการเดินทางต่อ/ตั๋วขากลับ:** หลักฐานการชำระเงินค่าบัตรโดยสารเครื่องบินขาออกที่ระบุวันเดินทางภายในระยะเวลาที่ได้รับอนุญาตให้อยู่ในประเทศตามกฎหมาย
* **หลักฐานการจองที่พัก:** เอกสารยืนยันการจองโรงแรมที่สามารถตรวจสอบได้ หรือที่อยู่ของที่พักอาศัยที่ครอบคลุมตลอดกำหนดการเดินทางของท่าน
* **หลักฐานแสดงเงินทุน:** เจ้าหน้าที่อาจทำการสุ่มตรวจเงินสดสำรอง (หรือสกุลเงินต่างประเทศที่มีมูลค่าเทียบเท่า) จำนวน 10,000 บาทต่อคน หรือ 20,000 บาทต่อครอบครัว
* **ข้อจำกัดบริเวณด่านพรมแดนทางบก:** หากเดินทางเข้าประเทศผ่านด่านตรวจทางบกภายใต้หลักเกณฑ์การยกเว้นวีซ่า ท่านจะถูกจำกัดสิทธิ์ให้เดินทางเข้าประเทศได้สูงสุดไม่เกินสองครั้งต่อปีปฏิทิน

---

### 📅 การขอขยายเวลาพำนัก (ต่อวีซ่า) ภายในประเทศไทย

หากท่านประสงค์จะขยายเวลาการพำนักในขณะที่อยู่ในประเทศ เงื่อนไขจะขึ้นอยู่กับรูปแบบที่ท่านใช้ในการเดินทางเข้าประเทศเป็นสำคัญ:

* **การเข้าประเทศช่องทางยกเว้นวีซ่า 30 วัน:** มีสิทธิ์ยื่นคำขอขยายเวลาพำนักได้อีก 1 ครั้งเป็นเวลา 30 วัน ณ สำนักงานตรวจคนเข้าเมืองในพื้นที่ โดยมีค่าธรรมเนียมการดำเนินการ 1,900 บาท ทั้งนี้ การอนุมัติจะขึ้นอยู่กับดุลยพินิจของเจ้าหน้าที่และต้องมีเหตุผลอันสมควรที่เกี่ยวข้องกับการท่องเที่ยว
* **ช่องทางยกเว้นวีซ่า 15 วัน & วีซ่า ณ ช่องทางอนุญาตของด่านตรวจคนเข้าเมือง (VoA):** ประเภทการพำนักระยะสั้นเหล่านี้มีกฎระเบียบที่เข้มงวดเป็นพิเศษ และแทบจะไม่ได้รับการอนุมัติให้ขยายเวลาพำนัก

---

### 💼 วีซ่าพำนักระยะยาวที่ถูกกฎหมายและทางเลือกอื่น ๆ

เนื่องจากมาตรการเดินทางเข้าออกประเทศติดต่อกันเพื่อรีเซ็ตตราประทับท่องเที่ยว (Border Runs) จะถูกระบบตั้งค่าแจ้งเตือนและระงับการเข้าเมืองอย่างจริงจัง ผู้ที่ต้องการเดินทางระยะยาวจึงต้องเลือกใช้ช่องทางวีซ่าที่เหมาะสม

| ประเภทวีซ่า | กลุ่มเป้าหมาย | ระยะเวลาพำนักที่อนุญาต & เกณฑ์การพิจารณา |
| --- | --- | --- |
| **วีซ่าท่องเที่ยว (TR)** | ผู้พักผ่อนหย่อนใจที่วางแผนเดินทางท่องเที่ยวระยะเวลา 1 ถึง 3 เดือนตั้งแต่เริ่มต้น | อนุญาตให้พำนักได้ 60 วันต่อการเข้าประเทศ สามารถยื่นขอผ่านพอร์ทัล e-Visa ได้ทั้งแบบเดินทางเข้าครั้งเดียว (Single-entry 1,000 บาท) หรือหลายครั้ง (Multiple-entry 5,000 บาท) สามารถขยายเวลาพำนักภายในประเทศไทยได้อีก 30 วัน (ค่าธรรมเนียม 1,900 บาท) |
| **วีซ่า Destination Thailand (DTV)** | กลุ่ม Digital Nomad, ผู้ทำงานทางไกล, ฟรีแลนซ์ และผู้เข้าร่วมกิจกรรมทางวัฒนธรรม (มวยไทย, หลักสูตรทำอาหาร) | มีอายุการใช้งาน 5 ปี สามารถเดินทางเข้าออกได้ไม่จำกัดจำนวนครั้ง อนุญาตให้พำนักได้สูงสุด 180 วันต่อการเข้าประเทศหนึ่งครั้ง (สามารถขยายเวลาภายในประเทศได้อีก 180 วัน) ต้องแสดงหลักฐานการจ้างงาน/สัญญากับต่างประเทศ และต้องมีเงินฝากคงเหลือในบัญชีอย่างน้อย 500,000 บาท ย้อนหลังเป็นเวลา 3 ถึง 6 เดือน |
| **วีซ่าระยะยาว / วีซ่าเกษียณอายุ (Non-O, LTR)** | ผู้เกษียณอายุ (อายุ 50 ปีขึ้นไป), นักลงทุนรายใหญ่ และผู้พำนักระยะยาว | อนุญาตให้พำนักอาศัยในระยะยาว วีซ่าประเภทเหล่านี้ยังคงมีอยู่ตามเดิม แต่จะเผชิญกับการตรวจสอบที่เข้มงวดขึ้น เพื่อให้มั่นใจว่าเป็นไปตามเกณฑ์อายุ สินทรัพย์ และเกณฑ์รายได้ที่มั่นคงอย่างต่อเนื่อง |

---`,

  MM: `# ထိုင်းနိုင်ငံ လူဝင်မှုကြီးကြပ်ရေး လုပ်ထုံးလုပ်နည်းဆိုင်ရာ မူဘောင်နှင့် ပြည်ဝင်ခွင့်လမ်းညွှန် (၂၀၂၆ ခုနှစ် နောက်ဆုံးရအခြေအနေ)

---

ထိုင်းနိုင်ငံ၏ လူဝင်မှုကြီးကြပ်ရေး လုပ်ထုံးလုပ်နည်းမူဘောင်သည် "တစ်နိုင်ငံလျှင် ပြည်ဝင်ခွင့်အခွင့်အရေး တစ်မျိုးသာ" (one country, one visa privilege) မူဝါဒကို တင်းကျပ်စွာ ကျင့်သုံးလျက်ရှိပါသည်။ ၂၀၂၄ ခုနှစ်က ယာယီစတင်ခဲ့သည့် မည်သည့်နိုင်ငံမဆို ရက်ပေါင်း ၆၀ ဗီဇာကင်းလွတ်ခွင့် ပေးခဲ့သော အစီအစဉ်ကို ဖျက်သိမ်းလိုက်ပြီ ဖြစ်သည်။ ထိုင်းနိုင်ငံအဖွဲ့ချုပ်က အတည်ပြုလိုက်သည့် နောက်ဆုံးရ မူဘောင်အသစ်အရ ပြည်ဝင်ခွင့်လမ်းကြောင်းများကို သက်ဆိုင်ရာ နိုင်ငံသားအလိုက် တိကျစွာ ခွဲခြားသတ်မှတ်ထားပါသည်။

<u>**အကောင်အထည်ဖော်မှုဆိုင်ရာ မှတ်ချက်။ ။** ဤမွမ်းမံထားသော စည်းမျဉ်းများသည် တော်ဝင်ပြန်တမ်း (Royal Gazette) တွင် တရားဝင်ထုတ်ပြန်ပြီး ၁၅ ရက်အကြာတွင် စတင်အာဏာတည်မည် ဖြစ်သည်။ အကယ်၍ သင်သည် အဆိုပါစည်းမျဉ်း စတင်သက်ရောက်ခြင်းမရှိမီ ထိုင်းနိုင်ငံအတွင်းသို့ ဝင်ရောက်ခဲ့ပါက သင်၏ မူလရက်ပေါင်း ၆၀ ပြည်ဝင်ခွင့်တံဆိပ်တုံးသည် သက်တမ်းကုန်ဆုံးမည့်ရက်အထိ အပြည့်အဝ အကျုံးဝင်မည် ဖြစ်သည်။</u>

---

## 🛂 နိုင်ငံသားအလိုက် ခွင့်ပြုထားသော နေထိုင်ခွင့်ကာလများ

ယခုအခါ နိုင်ငံတိုင်းကို သတ်မှတ်ထားသော ပြည်ဝင်ခွင့်လမ်းကြောင်း တစ်ခုစီသို့ တိကျစွာ ခွဲေဝချိတ်ဆက်ထားပြီး ဖြစ်သည်။

### ရက် ၃၀ ကမ္ဘာလှည့်ခရီးသွား ဗီဇာကင်းလွတ်ခွင့် (၅၄ နိုင်ငံ/နယ်မြေ)

သာမန် ကမ္ဘာလှည့်ခရီးသွားလုပ်ငန်းအတွက် တစ်ကြိမ်ဝင်ရောက်လျှင် ရက်ပေါင်း ၃၀ သာ ကန့်သတ်ထားသည်။ အကျုံးဝင်သော ဒေသများမှာ -

* **ဥရောပ။ ။** ဗြိတိန်၊ ဂျာမနီ၊ ပြင်သစ်၊ အီတလီ၊ စပိန်၊ နယ်သာလန်၊ ဩစတြီးယား၊ ဘယ်လ်ဂျီယမ်၊ ဆွစ်ဇာလန်၊ ဆွီဒင်၊ နော်ဝေ၊ ဒိန်းမတ်၊ ဖင်လန်၊ အိုင်ယာလန်၊ ချက်သမ္မတနိုင်ငံ၊ အက်စတိုးနီးယား၊ ဂရိ၊ ဟန်ဂေရီ၊ အိုက်စလန်၊ လတ်ဗီးယား၊ လီချင်စတိန်း၊ လစ်သူယေးနီးယား၊ လူဇင်ဘတ်၊ ပိုလန်၊ ပေါ်တူဂီ၊ ရိုမေးနီးယား၊ စလိုဗက်ကီးယား၊ စလိုဗေးနီးယား၊ တူရကီ၊ ယူကရိန်း။
* **မြောက်အမေရိကနှင့် အိုရှန်းနီးယား။ ။** အမေရိကန်ပြည်ထောင်စု၊ ကနေဒါ၊ ဩစတြေးလျ၊ နယူးဇီလန်၊ ဖီဂျီ။
* **အာရှနှင့် အရှေ့အလယ်ပိုင်း။ ။** ဂျပန်၊ စင်ကာပူ၊ မလေးရှား၊ အင်ဒိုနီးရှား၊ ဖိလစ်ပိုင်၊ ဘရူနိုင်း၊ ထိုင်ဝမ်၊ ဘူတန်၊ ဂျော်ဂျီယာ၊ ကာဂျစ်စတန်၊ ယူအေအီး၊ ဆော်ဒီအာရေးဗီးယား၊ ကာတာ၊ အိုမန်၊ ကူဝိတ်၊ ဘာရိန်း၊ အစ္စရေး၊ ဂျော်ဒန်။
* **အာဖရိက။ ။** တောင်အာဖရိက။

### ၁၅ ရက် ကမ္ဘာလှည့်ခရီးသွား ဗီဇာကင်းလွတ်ခွင့်

ဤအမျိုးအစားသည် ကာလတို နေထိုင်မှုများအတွက်သာ သီးသန့်သတ်မှတ်ထားပြီး အောက်ပါပတ်စ်ပို့ကိုင်ဆောင်သူများသာ ခွင့်ပြုပါသည် -

* **မော်လ်ဒိုက်၊ မောရစ်ရှပ်စ် နှင့် ဆေးရှဲလ်။**

### ဆိုက်ရောက်ဗီဇာ (Visa on Arrival - VoA) - ၄ နိုင်ငံအထိ လျှော့ချခြင်း

ယခုအခါ အောက်ပါ ၄ နိုင်ငံသာ ထိုင်းနိုင်ငံ ပြည်ဝင်ပေါက်များတွင် ရက် ၁၅ ရက် ဆိုက်ရောက်ဗီဇာကို တိုက်ရိုက်ရယူနိုင်ပါတော့သည် -

* **အိန္ဒိယ၊ ဆားဘီးယား၊ အဇာဘိုင်ဂျန် နှင့် ဘီလာရုဇ်။**
* **မှတ်ချက်။ ။** အကယ်၍ သင့်နိုင်ငံသည် ယခင်ဆိုက်ရောက်ဗီဇာ (VoA) စာရင်းမှ ပယ်ဖျက်ခံရပါက ခရီးစဉ်မစတင်မီ e-Visa သို့မဟုတ် သံရုံးဗီဇာကို ကြိုတင်လျှောက်ထားရယူရပါမည်။

### တည်ဆဲ နှစ်နိုင်ငံသဘောတူညီချက်များ (ပြောင်းလဲမှုမရှိ)

ရေရှည်တည်တံ့ခိုင်မြဲသော အပြန်အလှန်စာချုပ်များသည် ဤမူဘောင်အသစ်ကြောင့် သက်ရောက်မှုမရှိဘဲ အပြောင်းအလဲမရှိ ဆက်လက်တည်ရှိနေပါသည် -

* **ရက် ၉၀။ ။** အာဂျင်တီးနား၊ ဘရာဇီး၊ ချီလီ၊ ပီရူး နှင့် တောင်ကိုရီးယား။
* **ရက် ၃၀။ ။** တရုတ်၊ ရုရှား၊ လာအို၊ ကာဇက်စတန်၊ ဟောင်ကောင်၊ မကာအို၊ မွန်ဂိုလီးယား၊ အရှေ့တီမော နှင့် ဗီယက်နမ်။
* **၁၄ ရက်။ ။** ကမ္ဘောဒီးယား နှင့် မြန်မာ (အပြည်ပြည်ဆိုင်ရာ လေဆိပ်များမှ ဝင်ရောက်ခြင်းအတွက်သာ အကျုံးဝင်သည်)။

---

## 📋 မဖြစ်မနေ လိုအပ်သော ပြည်ဝင်ခွင့်နှင့် နယ်စပ်လိုအပ်ချက်များ

ဗီဇာကင်းလွတ်ခွင့် အဆင့်အတန်းရှိခြင်းသည် ထိုင်းနိုင်ငံအတွင်းသို့ အလိုအလျောက် ဝင်ရောက်နိုင်ကြောင်း အာမမခံပါ။ လူဝင်မှုကြီးကြပ်ရေးအရာရှိများသည် နယ်စပ်တွင် အောက်ပါစာရွက်စာတမ်းများကို တက်ကြွစွာ စစ်ဆေးအတည်ပြုမည် ဖြစ်သည် -

* **ပတ်စ်ပို့သက်တမ်း။ ။** ဝင်ရောက်သည့်နေ့မှစ၍ အနည်းဆုံး သက်တမ်း ၆ လ ကျန်ရှိရမည်။
* **ထိုင်းနိုင်ငံ ဒီဂျစ်တယ် ဆိုက်ရောက်ကတ် (TDAC)။ ။** စာရွက်ဖြင့် ဖြည့်စွက်ရသော TM6 ပုံစံများကို လုံးဝဖျက်သိမ်းလိုက်ပြီ ဖြစ်သည်။ မဖြစ်မနေ လိုအပ်သော QR ကုဒ်ကို ရရှိရန်အတွက် လေယာဉ်မဆင်းမီ ၂၄ နာရီမှ ၇၂ နာရီအတွင်း တရားဝင်အွန်လိုင်းပေါ်တယ်လ်မှတစ်ဆင့် TDAC ကို ဖြည့်စွက်ပေးပို့ရပါမည်။
* **အသွားအပြန် လေယာဉ်လက်မှတ်။ ။** တရားဝင်နေထိုင်ခွင့် ကာလအတွင်း ပြန်လည်ထွက်ခွာမည့် ငွေပေးချေပြီးသား လေယာဉ်လက်မှတ် အထောက်အထား။
* **တည်းခိုမည့်နေရာ အထောက်အထား။ ။** သင့်ခရီးစဉ်အတွင်း တည်းခိုမည့် စစ်ဆေးအတည်ပြုနိုင်သော ဟိုတယ်ဘွတ်ကင် သို့မဟုတ် နေအိမ်လိပ်စာ။
* **ငွေကြေးအထောက်အထား။ ။** လူဝင်မှုကြီးကြပ်ရေးအရာရှိများသည် တစ်ဦးလျှင် ထိုင်းဘတ် ၁၀,၀၀၀ သို့မဟုတ် မိသားစုလိုက်ဆိုပါက ထိုင်းဘတ် ၂၀,၀၀၀ (သို့မဟုတ် ၎င်းနှင့်ညီမျှသော နိုင်ငံခြားငွေ) အနည်းဆုံး လက်ဝယ်ရှိမရှိကို ကျပန်းစစ်ဆေးနိုင်ပါသည်။
* **ကုန်းလမ်းနယ်စပ် ကန့်သတ်ချက်။ ။** အကယ်၍ ဗီဇာကင်းလွတ်ခွင့်အစီအစဉ်ဖြင့် ကုန်းလမ်းနယ်စပ်ဂိတ်များမှ ဝင်ရောက်ပါက တစ်ပြက္ခဒိန်နှစ်လျှင် အများဆုံး နှစ်ကြိမ်သာ ဝင်ရောက်ခွင့် ကန့်သတ်ထားသည်။

---

## 📅 ထိုင်းနိုင်ငံအတွင်း ဗီဇာသက်တမ်းတိုးခြင်း

ထိုင်းနိုင်ငံအတွင်း ရောက်ရှိနေစဉ် သက်တမ်းတိုးလိုပါက သင်မည်သို့ဝင်ရောက်ခဲ့သည်ဆိုသည့် အချက်အပေါ်တွင် များစွာမူတည်ပါသည် -

* **ရက် ၃၀ ဗီဇာကင်းလွတ်ခွင့်ဖြင့် ဝင်ရောက်သူများ။ ။** ထိုင်းနိုင်ငံ ဒေသခံ လူဝင်မှုကြီးကြပ်ရေးရုံးတွင် ဝန်ဆောင်ခ ထိုင်းဘတ် ၁,၉၀၀ ပေးသွင်း၍ ရက်ပေါင်း ၃၀ သက်တမ်းတိုးခြင်းကို တစ်ကြိမ် လျှောက်ထားနိုင်ပါသည်။ ခွင့်ပြုချက်ပေးရန်မှာ အရာရှိများ၏ ဆုံးဖြတ်ချက်အပေါ် မူတည်ပြီး ခရီးသွားလုပ်ငန်းနှင့် သက်ဆိုင်သော တရားဝင်အကြောင်းပြချက် လိုအပ်ပါသည်။
* **၁၅ ရက် ဗီဇာကင်းလွတ်ခွင့်နှင့် ဆိုက်ရောက်ဗီဇา (VoA)။ ။** ဤကာလတို အမျိုးအစားများသည် အလွန်တင်းကျပ်ပြီး သက်တမ်းတိုးခွင့် ရရှိရန် ခဲယဉ်းလှပါသည်။

---

## 💼 တရားဝင် ရေရှည်နေထိုင်ခွင့်နှင့် အခြားဗီဇာအမျိုးအစားများ

ဗီဇာရက် ပြန်လည်စတင်ရန်အတွက် နယ်စပ်ဖြတ်ကျော်၍ ချက်ချင်းပြန်ဝင်သည့် (Border runs) လုပ်ရပ်များကို တက်ကြွစွာ စောင့်ကြည့်ပိတ်ဆို့နေသောကြောင့် ရေရှည်ခရီးသွားများသည် သင့်လျော်သော ဗီဇာအမျိုးအစားများကို အသုံးပြုရမည်။

| **ဗီဇာအမျိုးအစား** | **ရည်ရွယ်သည့် အုပ်စု** | **နေထိုင်ခွင့်ကာလနှင့် စံနှုန်းများ** |
|---|---|---|
| **ကမ္ဘာလှည့်ခရီးသွားဗီဇာ (TR)** | စတင်ကတည်းက ၁ လမှ ၃ လအပြီး ခရီးထွက်ရန် စီစဉ်ထားသူများ။ | တစ်ကြိမ်ဝင်လျှင် ရက်ပေါင်း ၆၀ နေထိုင်ခွင့်ပြုသည်။ e-Visa ပေါ်တယ်လ်မှတစ်ဆင့် တစ်ကြိမ်ဝင် (ထိုင်းဘတ် ၁,၀၀၀) သို့မဟုတ် အကြိမ်ကြိမ်ဝင် (ထိုင်းဘတ် ၅,၀၀၀) အဖြစ် ရရှိနိုင်သည်။ ထိုင်းနိုင်ငံအတွင်း၌ ရက် ၃၀ သက်တမ်းတိုးနိုင်သည် (ထိုင်းဘတ် ၁,၉၀၀)။ |
| **Destination Thailand Visa (DTV)** | Digital nomad များ၊ အဝေးရောက်ဝန်ထမ်းများ၊ အလွတ်တန်းသမားများနှင့် ယဉ်ကျေးမှုဆိုင်ရာ တက်ရောက်သူများ (မွေထိုင်း၊ ဟင်းချက်သင်တန်း)။ | သက်တမ်း ၅ နှစ်ဖြစ်ပြီး အကြိမ်ကြိမ် ဝင်ထွက်နိုင်သည်။ တစ်ကြိမ်ဝင်လျှင် ရက်ပေါင်း ၁၈၀ အပြီး ခွင့်ပြုသည် (နိုင်ငံအတွင်း ထပ်မံရက် ၁၈၀ သက်တမ်းတိုးနိုင်သည်)။ ပြည်ပလုပ်ငန်းခွင်/စာချုပ် အထောက်အထားနှင့် အနည်းဆုံး ထိုင်းဘတ် ၅၀၀,၀၀၀ ရှိသော စုဆောင်းငွေစာရင်းကို ၃ လမှ ၆ လအထိ ထိန်းသိမ်းထားရန် လိုအပ်သည်။ |
| **ရေရှည် / အငြိမ်းစားဗီဇာ (Non-O, LTR)** | အသက် ၅၀ ကျော် အငြိမ်းစားယူထားသူများ၊ အဓိက ရင်းနှီးမြှုပ်နှံသူများနှင့် ရေရှည်နေထိုင်သူများ။ | ရေရှည်နေထိုင်ခွင့် ပြုသည်။ ဤအမျိုးအစားများသည် ပြောင်းလဲမှုမရှိသော်လည်း အသက်၊ ပိုင်ဆိုင်မှုနှင့် တည်ငြိမ်သော ဝင်ငွေသတ်မှတ်ချက်များကို စဉ်ဆက်မပြတ် လိုက်နာမှုရှိမရှိ တင်းကျပ်စွာ စောင့်ကြည့်စစ်ဆေးခြင်း ခံရမည်ဖြစ်သည်။ |

---

*ဤဝင်ရောက်နိုင်မည့် လမ်းကြောင်းများကို နားလည်သဘောပေါက်ပြီး လိုအပ်သော စာရွက်စာတမ်းများကို ပြင်ဆင်ထားခြင်းဖြင့် ထိုင်းနိုင်ငံ၏ ပြည်ဝင်ခွင့်လိုအပ်ချက်များကို ယုံကြည်စိတ်ချစွာ ကိုင်တွယ်ဖြေရှင်းနိုင်မည်ဖြစ်ပြီး ထိုင်းနိုင်ငံသို့ တရားဝင်ကာ အခက်အခဲမရှိ ချောမွေ့စွာ ရောက်ရှိနိုင်မည် ဖြစ်ပါသည်။*`,

  DE: `Thailändische Einwanderungsbestimmungen & Einreiseleitfaden (Update 2026)

Thailands Einwanderungssystem basiert auf einer strikten „Ein Land, ein Visumprivileg“-Politik. Das im Jahr 2024 vorübergehend eingeführte, pauschale 60-tägige visumfreie System wurde aufgelöst. Gemäß den vom thailändischen Kabinett genehmigten aktualisierten Richtlinien werden die Einreiseverfahren nun streng nach der Staatsangehörigkeit bestimmt.

Hinweis zur Umsetzung: Diese aktualisierten Regeln treten 15 Tage nach der formellen Veröffentlichung in der Royal Gazette in Kraft. Wenn Sie vor dem Datum des Inkrafttretens nach Thailand eingereist sind, bleibt Ihr ursprünglicher 60-Tage-Einreisestempel bis zu seinem Ablaufdatum voll gültig.

### 🛂 Erlaubte Aufenthaltsdauer nach Staatsangehörigkeit

Jedes Land ist nun genau einem spezifischen Einreiseverfahren zugeordnet.

#### 30-tägige Befreiung vom Touristenvisum (54 Länder/Gebiete)

Der reguläre Tourismus ist auf 30 Tage pro Einreise beschränkt. Zu den berechtigten Regionen gehören:

* **Europa:** Deutschland, Österreich, Schweiz, Vereinigtes Königreich, Frankreich, Italien, Spanien, Niederlande, Belgien, Schweden, Norwegen, Dänemark, Finland, Irland, Tschechien, Estland, Griechenland, Ungarn, Island, Lettland, Liechtenstein, Litauen, Luxemburg, Polen, Portugal, Rumänien, Slowakei, Slowenien, Türkei, Ukraine.
* **Nordamerika & Ozeanien:** Vereinigte Staaten, Kanada, Australien, Neuseeland, Fidschi.
* **Asien & Naher Osten:** Japan, Singapur, Malaysia, Indonesien, Philippinen, Brunei Darussalam, Taiwan, Bhutan, Georgien, Kirgisistan, Vereinigte Arabische Emirate, Saudi-Arabien, Katar, Oman, Kuwait, Bahrain, Israel, Jordanien.
* **Afrika:** Südafrika.

#### 15-tägige Befreiung vom Touristenvisum

Diese Kategorie ist ausschließlich für kürzere Aufenthalte reserviert und beschränkt sich auf Passinhaber aus:

* Malediven, Mauritius und Seychellen.

#### Visum bei Ankunft (Visa on Arrival - VoA) – Reduziert auf 4 Länder

Nur noch vier Nationen können ein 15-tägiges Visum direkt an einer thailändischen Grenzübergangsstelle erhalten:

* Indien, Serbien, Aserbaidschan und Belarus.
* *Hinweis:* Falls Ihre Staatsangehörigkeit von der bisherigen VoA-Liste gestrichen wurde, müssen Sie vor der Reisebuchung ein E-Visum oder ein konsularisches Visum beantragen.

#### Bestehende bilaterale Abkommen (Unverändert)

Langjährige gegenseitige Abkommen bleiben von den neuen Regelungen unberührt:

* **90 Tage:** Argentinien, Brasilien, Chile, Peru und Südkorea.
* **30 Tage:** China, Russland, Laos, Kasachstan, Hongkong, Macau, Mongolei, Osttimor und Vietnam.
* **14 Tage:** Kambodscha und Myanmar (nur gültig bei Einreise über internationale Flughäfen).

### 📋 Obligatorische Einreise- & Grenzbestimmungen

Der Status der Visumbefreiung garantiert keine automatische Einreise. Die Einwanderungsbehörden überprüfen an der Grenze routinemäßig die folgenden Dokumente:

* **Gültigkeit des Reisepasses:** Mindestens 6 Monate Restgültigkeit ab dem Tag der Einreise.
* **Thailand Digital Arrival Card (TDAC):** Die papierbasierten TM6-Formulare sind vollständig abgeschafft. Sie müssen die TDAC innerhalb von 24 bis 72 Stunden vor der Landung online über das offizielle Portal ausfüllen, um den obligatorischen QR-Code zu erhalten.
* **Bestätigtes Weiter-/Rückflugticket:** Nachweis über einen bezahlten Rück- oder Weiterflug innerhalb des zulässigen Aufenthaltszeitraums.
* **Unterkunftsnachweis:** Eine nachweisbare Hotelreservierung oder Wohnadresse für den gesamten Zeitraum.
* **Finanzieller Nachweis:** Beamte können stichprobenartig Bargeldbestände (oder entsprechende Fremdwährungen) in Höhe von 10.000 THB pro Person oder 20,000 THB pro Familie verlangen.
* **Beschränkung für den Landweg:** Bei der Einreise über Landgrenzübergänge im Rahmen der Visumbefreiung sind maximal zwei Einreisen pro Kalenderjahr zulässig.

### 📅 Visumverlängerungen innerhalb Thailands

Wenn Sie Ihren Aufenthalt im Land verlängern möchten, hängen die Bedingungen stark von der Art Ihrer Einreise ab:

* **Einreisen mit 30-tägiger Befreiung:** Berechtigt zur Beantragung einer einmaligen Verlängerung um 30 Tage bei einer lokalen thailändischen Einwanderungsbehörde (Immigration Bureau) gegen eine Gebühr von 1.900 THB. Die Genehmigung liegt im Ermessen der Behörde und erfordert einen triftigen touristischen Grund.
* **15-tägige Befreiung & Visum bei Ankunft:** Diese Kategorien für Kurzaufenthalte sind äußerst restriktiv; Verlängerungen werden hierbei selten genehmigt.

### 💼 Legale Langzeitaufenthalte & Alternative Visa

Da aufeinanderfolgende Grenzgänge („Border Runs“) zur Erneuerung von Touristenstempeln systematisch erfasst und blockiert werden, müssen Langzeitreisende entsprechende Visakategorien nutzen.

| Visumtyp | Zielgruppe | Erlaubter Aufenthalt & Kriterien |
| --- | --- | --- |
| **Touristenvisum (TR)** | Urlauber, die von vornherein eine Reise von 1 bis 3 Monaten planen. | Gewährt einen Aufenthalt von 60 Tagen pro Einreise. Verfügbar über das E-Visum-Portal für die einmalige (1.000 THB) oder mehrfache Einreise (5.000 THB). Kann im Land um +30 Tage verlängert werden (1.900 THB). |
| **Destination Thailand Visa (DTV)** | Digitale Nomaden, Remote-Worker, Freelancer und Teilnehmer an Kulturprogrammen (Muay Thai, Kochkurse). | Gültig für 5 Jahre mit mehrfacher Einreise. Erlaubt bis zu 180 Tage pro Einreise (im Inland um weitere 180 Tage verlängerbar). Erfordert den Nachweis einer Beschäftigung/Verträgen im Ausland sowie ein Sparguthaben von mindestens 500.000 THB über 3 bis 6 Monate. |
| **Langzeit- / Ruhestands-visum (Non-O, LTR)** | Rentner (ab 50 Jahren), Großinvestoren und langfristige Einwohner. | Ermöglicht einen dauerhaften Aufenthalt. Diese Kategorien bleiben bestehen, unterliegen jedoch einer strengen Überwachung hinsichtlich der kontinuierlichen Einhaltung von Alters-, Vermögens- und Einkommensgrenzen. |

Indem Sie sich im Vorfeld mit diesen Verfahren vertraut machen und die erforderlichen Unterlagen bereithalten, stellen Sie eine legale und reibungslose Einreise in das Königreich Thailand sicher.`,

  ES: `Marco de Inmigración de Tailandia y Guía de Entrada (Actualización 2026)

El marco migratorio de Tailandia opera bajo una estricta política de "un país, un privilegio de visado". El plan temporal de exención de visado generalizado de 60 días introducido en 2024 ha sido disuelto. Bajo el marco actualizado y aprobado por el Gabinete tailandés, las vías de entrada se determinan estrictamente por la nacionalidad.

Nota de implementación: Estas normas actualizadas entrarán en vigor 15 días después de su publicación formal en la Gaceta Real. Si ingresó a Tailandia antes de la fecha de aplicación activa, su sello de entrada original de 60 días seguirá siendo totalmente válido hasta su expiración inicial.

🛂 Estancias Permitidas por Nacionalidad
Cada nación está ahora vinculada exactamente a una vía de entrada específica.

Exención de Visado de Turista por 30 Días (54 Países/Territorios)
El turismo convencional estándar está limitado a 30 días por entrada. Las regiones elegibles incluyen:

• Europa: Reino Unido, Alemania, Francia, Italia, España, Países Bajos, Austria, Bélgica, Suiza, Suecia, Noruega, Dinamarca, Finlandia, Irlanda, Chequia, Estonia, Grecia, Hungría, Islandia, Letonia, Liechtenstein, Lituania, Luxemburgo, Polonia, Portugal, Rumania, Eslovaquia, Eslovenia, Turquía, Ucrania.
• América del Norte y Oceanía: Estados Unidos, Canadá, Australia, Nueva Zelanda, Fiyi.
• Asia y Medio Oriente: Japón, Singapur, Malasia, Indonesia, Filipinas, Brunéi Darussalam, Taiwán, Bután, Georgia, Kirguistán, Emiratos Árabes Unidos, Arabia Saudita, Qatar, Omán, Kuwait, Baréin, Israel, Jordania.
• África: Sudáfrica.

Exención de Visado de Turista por 15 Días
Una categoría reservada estrictamente para estancias más cortas, limitada exclusivamente a los titulares de pasaportes de:

• Maldivas, Mauricio y Seychelles.

Visado a la Llegada (VoA) – Reducido a 4 Países
Solo 4 naciones pueden obtener ahora un visado de 15 días directamente en un puerto de entrada tailandés:

• India, Serbia, Azerbaiyán y Bielorrusia.
• Nota: Si su nacionalidad fue eliminada de la lista anterior de VoA, deberá tramitar un visado electrónico (e-Visa) o un visado consular antes de reservar su viaje.

Acuerdos Bilaterales Existentes (Sin Cambios)
Los tratados recíprocos de larga data no se ven afectados por el nuevo marco:

• 90 Días: Argentina, Brasil, Chile, Perú y Corea del Sur.
• 30 Days: China, Rusia, Laos, Kazajistán, Hong Kong, Macao, Mongolia, Timor Oriental y Vietnam.
• 14 Days: Camboya y Myanmar (válido únicamente para llegadas a aeropuertos internacionales).

📋 Requisitos Obligatorios de Entrada y Frontera
El estatus de exención de visado no garantiza la entrada automática. Los oficiales de inmigración verifican activamente la siguiente documentación en la frontera:

• Validez del Pasaporte: Mínimo de 6 meses de vigencia restantes a partir de la fecha de entrada.
• Tarjeta de Llegada Digital de Tailandia (TDAC): Los formularios físicos TM6 se han eliminado por completo. Debe completar y enviar la TDAC en línea a través del portal oficial entre 24 y 72 horas antes del aterrizaje para recibir un código QR obligatorio.
• Billete de Continuación/Regreso Confirmado: Comprobante de un vuelo de salida pagado que salga dentro del periodo legal de su estancia.
• Comprobante de Alojamiento: Reserva de hotel verificable o dirección residencial que cubra su itinerario.
• Comprobante de Fondos: Los oficiales pueden verificar aleatoriamente reservas de efectivo (o equivalentes en moneda extranjera) de 10,000 THB por persona o 20,000 THB por familia.
• Límite en Fronteras Terrestres: Si llega a través de puestos de control terrestres bajo el esquema de exención de visado, está estrictamente limitado a un máximo de dos entradas terrestres por año natural.

📅 Prórrogas de Visado Dentro de Tailandia
Si desea extender su estancia mientras se encuentra en el país, las condiciones dependen en gran medida de su forma de entrada:

• Entradas con Exención de 30 Días: Elegibles para solicitar una única prórroga de 30 días en una oficina local de la Oficina de Inmigración de Tailandia por una tasa de tramitación de 1,900 THB. La aprobación es discrecional y requiere un motivo válido relacionado con el turismo.
• Exención de 15 Días y Visado a la Llegada: Estas categorías de estancia corta son excepcionalmente rígidas y rara vez se aprueban para prórrogas.

💼 Visados Legales de Larga Duración y Alternativos
Debido a que los viajes fronterizos continuos ("border runs") para restablecer los sellos turísticos son activamente detectados y bloqueados, los viajeros de larga duración deben utilizar las vías de visado adecuadas.

| Tipo de Visado | Público Objetivo | Estancia Permitida y Criterios |
| --- | --- | --- |
| **Visado de Turista (TR)** | Viajeros que planean un viaje de 1 a 3 meses desde el principio. | Concede una estancia de 60 días por entrada. Disponible a través del portal de e-Visa como entrada única (1,000 THB) o múltiple (5,000 THB). Puede prorrogarse dentro de Tailandia por +30 días (1,900 THB). |
| **Visado Destination Thailand (DTV)** | Nómadas digitales, trabajadores remotos, autónomos y participantes culturales (Muay Thai, cursos de cocina). | Válido por 5 años con múltiples entradas. Permite hasta 180 días por entrada (prorrogable en el país por 180 días adicionales). Requiere prueba de empleo/contratos en el extranjero y un saldo de ahorros mantenido de al menos 500,000 THB durante 3 a 6 meses. |
| **Larga Duración / Jubilación (Non-O, LTR)** | Jubilados (mayores de 50 años), grandes inversores y residentes de larga duración. | Permite la residencia prolongada. Estas categorías permanecen intactas pero se enfrentan a un estricto seguimiento para garantizar el cumplimiento continuo de los umbrales de edad, patrimonio e ingresos estables. |

Al comprender estas vías y preparar la documentación requerida, podrá navegar por los requisitos de entrada de Tailandia con confianza y garantizar una llegada legal y sin contratiempos al Reino.`,

  FR: `Cadre de l'immigration en Thaïlande et Guide d'entrée (Mise à jour 2026)

Le cadre de l'immigration en Thaïlande fonctionne selon une politique stricte : « un pays, un privilège de visa ». Le programme d'exemption temporaire de visa de 60 jours introduit en 2024 a été dissous. En vertu du cadre mis à jour et approuvé par le Cabinet thaïlandais, les modalités d'entrée sont rigoureusement déterminées par la nationalité.

Note de mise en œuvre : Ces règles actualisées entrent en vigueur 15 jours après leur publication officielle dans la Gazette Royale. Si vous êtes entré en Thaïlande avant la date d'application effective, votre tampon d'entrée initial de 60 jours reste pleinement valide jusqu'à sa date d'expiration d'origine.

### 🛂 Séjours autorisés par nationalité

Chaque pays est désormais rattaché à une seule et unique modalité d'entrée spécifique.

#### Exemption de visa touristique de 30 jours (54 pays/territoires)

Le tourisme de masse standard est limité à 30 jours par entrée. Les régions éligibles comprennent :

* **Europe :** France, Allemagne, Italie, Espagne, Pays-Bas, Royaume-Uni, Autriche, Belgique, Suisse, Suède, Norvège, Danemark, Finlande, Irlande, République tchèque, Estonie, Grèce, Hongrie, Islande, Lettonie, Liechtenstein, Lituanie, Luxembourg, Pologne, Portugal, Roumanie, Slovaquie, Slovénie, Turquie, Ukraine.
* **Amérique du Nord & Océanie :** États-Unis, Canada, Australie, Nouvelle-Zélande, Fidji.
* **Asie & Moyen-Orient :** Japon, Singapour, Malaisie, Indonésie, Philippines, Brunei Darussalam, Taïwan, Bhoutan, Géorgie, Kirghizistan, Émirats arabes unis, Arabie saoudite, Qatar, Oman, Koweït, Bahreïn, Israël, Jordanie.
* **Afrique :** Afrique du Sud.

#### Exemption de visa touristique de 15 jours

Une catégorie réservée strictement aux séjours plus courts, limitée exclusivement aux titulaires de passeports des pays suivants :

* Maldives, Maurice et Seychelles.

#### Visa à l'arrivée (Visa on Arrival - VoA) – Réduit à 4 pays

Seules 4 nations peuvent désormais obtenir un visa de 15 jours directement à un point d'entrée thaïlandais :

* Inde, Serbie, Azerbaïdjan et Biélorussie.
* *Note :* Si votre nationalité a été retirée de la liste précédente du VoA, vous devez obtenir un e-Visa ou un visa consulaire avant de réserver votre voyage.

#### Accords bilatéraux existants (Inchangés)

Les traités réciproques de longue date ne sont pas affectés par le nouveau cadre :

* **90 jours :** Argentine, Brésil, Chili, Pérou et Corée du Sud.
* **30 jours :** Chine, Russie, Laos, Kazakhstan, Hong Kong, Macao, Mongolie, Timor oriental et Vietnam.
* **14 jours :** Cambodge et Myanmar (valable uniquement pour les arrivées dans les aéroports internationaux).

### 📋 Exigences obligatoires d'entrée et de contrôle aux frontières

Le statut d'exemption de visa ne garantit pas une entrée automatique. Les agents de l'immigration vérifient activement les documents suivants à la frontière :

* **Validité du passeport :** Un minimum de 6 mois de validité restante à compter de la date d'entrée.
* **Carte d'arrivée numérique de la Thaïlande (TDAC) :** Les formulaires papier TM6 sont totalement abandonnés. Vous devez remplir et soumettre la TDAC en ligne via le portail officiel entre 24 et 72 heures avant l'atterrissage afin de recevoir un code QR obligatoire.
* **Billet de continuation/retour confirmé :** Preuve d'un vol de départ payé et prévu dans la limite légale de votre séjour.
* **Preuve d'hébergement :** Une réservation d'hôtel vérifiable ou une adresse résidentielle couvrant votre itinéraire.
* **Preuve de fonds :** Les agents peuvent vérifier de manière aléatoire la possession de réserves de liquidités (ou équivalents en devises étrangères) à hauteur de 10 000 THB par personne ou 20 000 THB par famille.
* **Limite des frontières terrestres :** En cas d'arrivée par des points de passage terrestres sous le régime de l'exemption de visa, vous êtes strictement limité à un maximum de deux entrées terrestres par année civile.

### 📅 Prolongations de visa en Thaïlande

Si vous souhaitez prolonger votre séjour pendant que vous êtes dans le pays, les conditions dépendent fortement de votre mode d'entrée :

* **Entrées avec exemption de 30 jours :** Admissible pour demander une prolongation unique de 30 jours auprès d'un bureau local du Bureau de l'Immigration thaïlandais pour des frais de traitement de 1 900 THB. L'approbation est discrétionnaire et nécessite un motif valable lié au tourisme.
* **Exemption de 15 jours & Visa à l'arrivée :** Ces catégories de court séjour sont exceptionnellement rigides et les prolongations sont rarement accordées.

### 💼 Séjours de longue durée légaux & Visas alternatifs

Étant donné que les aller-retours successifs à la frontière (« border runs ») visant à réinitialiser les tampons touristiques sont activement signalés et bloqués, les voyageurs de longue durée doivent utiliser les filières de visa appropriées.

| Type de visa | Public cible | Séjour autorisé & Critères |
| --- | --- | --- |
| **Visa Touristique (TR)** | Les vacanciers prévoyant un voyage de 1 à 3 mois dès le départ. | Accorde un séjour de 60 jours par entrée. Disponible via le portail e-Visa en entrée simple (1 000 THB) ou entrées multiples (5 000 THB). Peut être prolongé à l'intérieur de la Thaïlande pour +30 jours (1 900 THB). |
| **Destination Thailand Visa (DTV)** | Nomades numériques, travailleurs à distance, indépendants et participants culturels (Muay Thaï, cours de cuisine). | Valable pendant 5 ans avec entrées multiples. Permet jusqu'à 180 jours par entrée (prolongeable dans le pays pour 180 jours supplémentaires). Nécessite une preuve d'emploi/contrats à l'étranger et un solde d'épargne maintenu d'au moins 500 000 THB pendant 3 à 6 mois. |
| **Long séjour / Retraite (Non-O, LTR)** | Retraités (âgés de 50 ans et plus), grands investisseurs et résidents de longue durée. | Permet une résidence prolongée. Ces catégories restent intactes mais font l'objet d'un suivi strict pour garantir le respect continu des seuils d'âge, d'actifs et de revenus stables. |

En comprenant ces parcours et en préparant la documentation requise, vous pourrez appréhender les conditions d'entrée en Thaïlande en toute confiance et vous assurer une arrivée légale et sans encombre dans le Royaume.`,
};