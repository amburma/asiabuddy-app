import { ThaiLanguage } from '../types';

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
  TH: `# คู่มือวีซ่าท่องเที่ยวไทยที่จำเป็น

---

## การเปลี่ยนแปลงกฎวีซ่า (พฤษภาคม 2026)

ไทยได้ยกเลิกการยกเว้นวีซ่า 60 วัน อย่างเป็นทางการ

| | กฎเดิม | กฎใหม่ |
|---|---|---|
| **ระยะเวลาพัก** | 60 วัน | 30 วัน |
| **ประเทศที่มีสิทธิ์** | 93 ประเทศ | 54 ประเทศ |
| **เข้าทางบก** | ไม่จำกัด | 2 ครั้ง/ปี |

---

## การต่ออายุวีซ่า

หากคุณต้องการพำนักนานกว่า 60 วัน คุณสามารถขอต่ออายุได้อีก 30 วัน ณ สำนักงานตรวจคนเข้าเมืองแห่งใดก็ได้ภายในประเทศไทย

***หมายเหตุสำคัญ***: *เมื่อพำนักรวมครบ 90 วันแล้ว คุณต้องเดินทางออกจากประเทศ หากต้องการกลับมา คุณต้องเดินทางเข้าประเทศอีกครั้งภายใต้ใบอนุญาตเข้าเมืองใหม่*

---

## คำแนะนำเฉพาะสำหรับประเทศไทย

สำหรับนักเดินทางภายในประเทศ โปรดทราบกฎระเบียบการเข้าเมืองดังนี้:

*   **การเดินทางทางอากาศ**: ข้อมูลโดยละเอียดเกี่ยวกับประเภทวีซ่าที่ได้รับเมื่อเดินทางมาถึงโดยสายการบิน
*   **พรมแดนทางบก**: รายละเอียดที่ครอบคลุมเกี่ยวกับความแตกต่างของกฎระเบียบเมื่อผ่านด่านตรวจทางบก

---

## ข้อกำหนดในการเข้าเมือง

แม้จะไม่ต้องใช้วีซ่า แต่เจ้าหน้าที่ตรวจคนเข้าเมืองที่สนามบินอาจขอเรียกดูเอกสารดังต่อไปนี้:

*   **หนังสือเดินทาง**: *ต้องมีอายุการใช้งานเหลืออย่างน้อย 6 เดือน*
*   **ตั๋วขากลับ**: *หลักฐานเที่ยวบินขากลับหรือตั๋วไปยังจุดหมายปลายทางถัดไปนอกประเทศไทย*
*   **ที่พัก**: *หลักฐานการจองโรงแรมหรือที่อยู่สำหรับการพำนักที่แจ้งลงทะเบียนไว้*
*   **หลักฐานการเงิน**: *ความสามารถในการแสดงเงินทุนที่เพียงพอสำหรับระยะเวลาการเดินทาง (ประมาณ 10,000 บาทต่อคน หรือ 20,000 บาทต่อครอบครัว)*

---

## คำแนะนำที่สำคัญ

***"ตรวจสอบที่สถานทูตไทยในพื้นที่ของคุณ"***

กฎระเบียบด้านวีซ่าอาจเปลี่ยนแปลงได้ตลอดเวลาตามสถานการณ์ทางการเมืองหรือสาธารณสุข ดังนั้น จึงจำเป็นอย่างยิ่งที่จะต้องตรวจสอบการอัปเดตล่าสุดบนเว็บไซต์ทางการหรือหน้า Facebook ของสถานเอกอัครราชทูตไทยในเมืองท้องถิ่นของคุณก่อนออกเดินทาง

---

## **สรุปรายการตรวจสอบ**

*   **สถานะวีซ่า**: *อนุญาตให้เข้าพำนักได้ 60 วันด้วยหนังสือเดินทางที่ถูกต้อง*
*   **การต่ออายุ**: *สามารถขอเพิ่มได้อีก 30 วันภายในประเทศไทยหากจำเป็น*
*   **การเตรียมตัว**: *เตรียมตั๋วขากลับและการจองที่พักให้พร้อมสำหรับการตรวจสอบ*

---

*การปฏิบัติตามแนวทางเหล่านี้จะช่วยให้คุณมั่นใจได้ว่าการเดินทางเข้าสู่ราชอาณาจักรไทยจะเป็นไปอย่างราบรื่นและถูกต้องตามกฎหมาย!*`,

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
* **၁၅ ရက် ဗီဇာကင်းလွတ်ခွင့်နှင့် ဆိုက်ရောက်ဗီဇာ (VoA)။ ။** ဤကာလတို အမျိုးအစားများသည် အလွန်တင်းကျပ်ပြီး သက်တမ်းတိုးခွင့် ရရှိရန် ခဲယဉ်းလှပါသည်။

---

## 💼 တရားဝင် ရေရှည်နေထိုင်ခွင့်နှင့် အခြားဗီဇာအမျိုးအစားများ

ဗီဇာရက် ပြန်လည်စတင်ရန်အတွက် နယ်စပ်ဖြတ်ကျော်၍ ချက်ချင်းပြန်ဝင်သည့် (Border runs) လုပ်ရပ်များကို တက်ကြွစွာ စောင့်ကြည့်ပိတ်ဆို့နေသောကြောင့် ရေရှည်ခရီးသွားများသည် သင့်လျော်သော ဗီဇာအမျိုးအစားများကို အသုံးပြုရမည်။

| **ဗီဇာအမျိုးအစား** | **ရည်ရွယ်သည့် အုပ်စု** | **နေထိုင်ခွင့်ကာလနှင့် စံနှုန်းများ** |
|---|---|---|
| **ကမ္ဘာလှည့်ခရီးသွားဗီဇာ (TR)** | စတင်ကတည်းက ၁ လမှ ၃ လအထိ ခရီးထွက်ရန် စီစဉ်ထားသူများ။ | တစ်ကြိမ်ဝင်လျှင် ရက်ပေါင်း ၆၀ နေထိုင်ခွင့်ပြုသည်။ e-Visa ပေါ်တယ်လ်မှတစ်ဆင့် တစ်ကြိမ်ဝင် (ထိုင်းဘတ် ၁,၀၀၀) သို့မဟုတ် အကြိမ်ကြိမ်ဝင် (ထိုင်းဘတ် ၅,၀၀၀) အဖြစ် ရရှိနိုင်သည်။ ထိုင်းနိုင်ငံအတွင်း၌ ရက် ၃၀ သက်တမ်းတိုးနိုင်သည် (ထိုင်းဘတ် ၁,၉၀၀)။ |
| **Destination Thailand Visa (DTV)** | Digital nomad များ၊ အဝေးရောက်ဝန်ထမ်းများ၊ အလွတ်တန်းသမားများနှင့် ယဉ်ကျေးမှုဆိုင်ရာ တက်ရောက်သူများ (မွေထိုင်း၊ ဟင်းချက်သင်တန်း)။ | သက်တမ်း ၅ နှစ်ဖြစ်ပြီး အကြိမ်ကြိမ် ဝင်ထွက်နိုင်သည်။ တစ်ကြိမ်ဝင်လျှင် ရက်ပေါင်း ၁၈၀ အထိ ခွင့်ပြုသည် (နိုင်ငံအတွင်း ထပ်မံရက် ၁၈၀ သက်တမ်းတိုးနိုင်သည်)။ ပြည်ပလုပ်ငန်းခွင်/စာချုပ် အထောက်အထားနှင့် အနည်းဆုံး ထိုင်းဘတ် ၅၀၀,၀၀၀ ရှိသော စုဆောင်းငွေစာရင်းကို ၃ လမှ ၆ လအထိ ထိန်းသိမ်းထားရန် လိုအပ်သည်။ |
| **ရေရှည် / အငြိမ်းစားဗီဇာ (Non-O, LTR)** | အသက် ၅၀ ကျော် အငြိမ်းစားယူထားသူများ၊ အဓိက ရင်းနှီးမြှုပ်နှံသူများနှင့် ရေရှည်နေထိုင်သူများ။ | ရေရှည်နေထိုင်ခွင့် ပြုသည်။ ဤအမျိုးအစားများသည် ပြောင်းလဲမှုမရှိသော်လည်း အသက်၊ ပိုင်ဆိုင်မှုနှင့် တည်ငြိမ်သော ဝင်ငွေသတ်မှတ်ချက်များကို စဉ်ဆက်မပြတ် လိုက်နာမှုရှိမရှိ တင်းကျပ်စွာ စောင့်ကြည့်စစ်ဆေးခြင်း ခံရမည်ဖြစ်သည်။ |

---

*ဤဝင်ရောက်နိုင်မည့် လမ်းကြောင်းများကို နားလည်သဘောပေါက်ပြီး လိုအပ်သော စာရွက်စာတမ်းများကို ပြင်ဆင်ထားခြင်းဖြင့် ထိုင်းနိုင်ငံ၏ ပြည်ဝင်ခွင့်လိုအပ်ချက်များကို ယုံကြည်စိတ်ချစွာ ကိုင်တွယ်ဖြေရှင်းနိုင်မည်ဖြစ်ပြီး ထိုင်းနိုင်ငံသို့ တရားဝင်ကာ အခက်အခဲမရှိ ချောမွေ့စွာ ရောက်ရှိနိုင်မည် ဖြစ်ပါသည်။*`,

  DE: `# Wesentlicher Leitfaden für thailändische Reisevisa

---

## Visaregeln geändert (Mai 2026)

Thailand hat die 60-tägige visafreie Einreise offiziell abgeschafft.

| | Alte Regel | Neue Regel |
|---|---|---|
| **Aufenthaltsdauer** | 60 Tage | 30 Tage |
| **Berechtigte Länder** | 93 Länder | 54 Länder |
| **Landeinreisen** | Unbegrenzt | Nur 2 pro Jahr |

---

## Visumverlängerung

Wenn Sie länger als 60 Tage bleiben möchten, können Sie bei jedem Einwanderungsamt (Immigration Office) in Thailand eine zusätzliche Verlängerung um 30 Tage beantragen.

***Wichtiger Hinweis***: *Sobald der gesamte Aufenthalt 90 Tage erreicht, müssen Sie das Land verlassen. Wenn Sie zurückkehren möchten, müssen Sie mit einer neuen Einreiseerlaubnis wieder einreisen.*

---

## Besondere Anweisungen für deutschsprachige Länder

Für Reisende aus deutschsprachigen Ländern beachten Sie bitte die folgenden Einreisebestimmungen:

*   **Flugreisen**: Detaillierte Informationen zu den Visatypen, die bei Ankunft über eine Fluggesellschaft erteilt werden.
*   **Landgrenzen**: Umfassende Details darüber, wie sich die Bestimmungen bei der Einreise über Landgrenzen unterscheiden können.

---

## Einreisebestimmungen

Auch wenn kein Visum erforderlich ist, können Einwanderungsbeamte am Flughafen die folgenden Unterlagen verlangen:

*   **Reisepass**: *Muss eine verbleibende Gültigkeit von mindestens 6 Monaten haben.*
*   **Rückflugticket**: *Nachweis eines Rückflugs oder eines Tickets zu einem nachfolgenden Ziel außerhalb Thailands.*
*   **Unterkunft**: *Nachweis von Hotelbuchungen oder einer registrierten Aufenthaltsadresse.*
*   **Finanznachweis**: *Fähigkeit, ausreichende Mittel für die Dauer der Reise nachzuweisen (ca. 10.000 Baht pro Person oder 20.000 Baht pro Familie).*

---

## Kritische Empfehlung

***"Überprüfen Sie dies bei Ihrer örtlichen thailändischen Botschaft"***

Die Visabestimmungen können sich aufgrund politischer oder gesundheitlicher Situationen jederzeit ändern. Daher ist es wichtig, vor der Abreise die neuesten Updates auf der offiziellen Website oder der Facebook-Seite der thailändischen Botschaft in Ihrer Nähe zu prüfen.

---

## **Zusammenfassende Checkliste**

*   **Visumstatus**: *60 Tage Aufenthalt mit einem gültigen Reisepass erlaubt.*
*   **Verlängerung**: *Zusätzliche 30 Tage können bei Bedarf innerhalb Thailands beantragt werden.*
*   **Vorbereitung**: *Halten Sie Ihre Rückflugtickets und Unterkunftsbucheungen zur Inspektion bereit.*

---

*Indem Sie diese Richtlinien befolgen, können Sie eine reibungslose und legale Einreise in das Königreich Thailand sicherstellen!*`,

  ES: `# Guía Esencial de Visas para Viajar a Tailandia

---

## Cambio en las reglas de visa (Mayo 2026)

Tailandia ha cancelado oficialmente la exención de visa de 60 días.

| | Regla anterior | Nueva regla |
|---|---|---|
| **Duración de estancia** | 60 días | 30 días |
| **Países elegibles** | 93 países | 54 países |
| **Entradas terrestres** | Ilimitadas | Solo 2 por año |

---

## Extensión de Visa

Si desea quedarse más de 60 días, puede solicitar una extensión adicional de 30 días en cualquier Oficina de Inmigración dentro de Tailandia.

***Nota Importante***: *Una vez que la estancia total alcanza los 90 días, debe abandonar el país. Si desea regresar, debe volver a entrar con un nuevo permiso de entrada.*

---

## Instrucciones Específicas para Viajeros

Para los viajeros, tengan en cuenta las siguientes regulaciones de entrada:

*   **Viajes Aéreos**: Información detallada sobre los tipos de visa otorgados al llegar vía aerolínea. La mayoría de las naciones occidentales reciben la exención de 60 días automáticamente.
*   **Fronteras Terrestres**: Las regulaciones pueden diferir al entrar por puntos de control terrestres. Algunas nacionalidades pueden tener límites en el número de entradas terrestres por año.

*(Por favor, consulte la sección específica de la Embajada de Tailandia local de su país para obtener todos los detalles).*

---

## Requisitos de Entrada

Aunque no se requiere visa, los oficiales de inmigración en el aeropuerto pueden solicitar la siguiente documentación:

*   **Pasaporte**: *Debe tener al menos 6 meses de validez restante.*
*   **Boleto de Regreso**: *Prueba de un vuelo de regreso o un boleto a un destino posterior fuera de Tailandia.*
*   **Alojamiento**: *Evidencia de reservas de hotel o una dirección de estancia registrada.*
*   **Prueba de Fondos**: *Capacidad para mostrar fondos suficientes para la duración del viaje (aproximadamente 10,000 Baht por persona o 20,000 Baht por familia).*

---

## Recomendación Crítica

***"Verifique en su Embajada de Tailandia local"***

Las regulaciones de visa están sujetas a cambios en cualquier momento según las situaciones políticas o de salud. Por lo tanto, es esencial verificar las últimas actualizaciones en el sitio web oficial o la página de Facebook de la Embajada Real de Tailandia en su ciudad local antes de la partida.

---

## **Lista de Verificación de Resumen**

*   **Estado de la Visa**: *60 días de estancia permitidos solo con un Pasaporte válido.*
*   **Extensión**: *Se pueden solicitar 30 días adicionales dentro de Tailandia si es necesario.*
*   **Preparación**: *Mantenga sus boletos de regreso y reservas de alojamiento listos para inspección.*

---

*¡Siguiendo estas pautas, puede asegurar una entrada fluida y legal al Reino de Tailandia!*`,
  FR: `# Guide Essentiel des Visas de Voyage pour la Thaïlande

---

## Changement des règles de visa (Mai 2026)

La Thaïlande a officiellement annulé l'exemption de visa de 60 jours.

| | Ancienne règle | Nouvelle règle |
|---|---|---|
| **Durée de séjour** | 60 jours | 30 jours |
| **Pays éligibles** | 93 pays | 54 pays |
| **Entrées terrestres** | Illimitées | 2 par an |

---

## Extension de Visa

Si vous souhaitez rester plus de 60 jours, vous pouvez demander une extension supplémentaire de 30 jours dans n'importe quel bureau de l'immigration en Thaïlande.

***Note Importante*** : *Une fois que le séjour total atteint 90 jours, vous devez quitter le pays. Si vous souhaitez revenir, vous devez rentrer sous un nouveau permis d'entrée.*

---

## Instructions Spécifiques pour les Voyageurs

Pour les voyageurs, veuillez noter les réglementations d'entrée suivantes :

*   **Voyage Aérien** : Informations détaillées sur les types de visas accordés à l'arrivée par voie aérienne. La plupart des nations occidentales bénéficient automatiquement de l'exemption de 60 jours.
*   **Frontières Terrestres** : Les réglementations peuvent différer lors de l'entrée par des points de contrôle terrestres. Certaines nationalités peuvent avoir des limites sur le nombre d'entrées terrestres par an.

*(Veuillez vous référer à la section spécifique de l'ambassade de Thaïlande locale de votre pays pour plus de détails).*

---

## Conditions d'Entrée

Même si un visa n'est pas requis, les agents de l'immigration à l'aéroport peuvent demander la documentation suivante :

*   **Passeport** : *Doit avoir au moins 6 mois de validité restante.*
*   **Billet de Retour** : *Preuve d'un vol de retour ou d'un billet vers une destination ultérieure hors de Thaïlande.*
*   **Hébergement** : *Preuve de réservations d'hôtel ou une adresse de séjour enregistrée.*
*   **Preuve de Ressources** : *Capacité à démontrer des fonds suffisants pour la durée du voyage (environ 10 000 Baht par personne ou 20 000 Baht par famille).*

---

## Recommandation Critique

***"Vérifiez auprès de votre ambassade de Thaïlande locale"***

Les réglementations en matière de visas sont susceptibles d'être modifiées à tout moment en fonction de la situation politique ou sanitaire. Par conséquent, il est essentiel de consulter les dernières mises à jour sur le site officiel ou la page Facebook de l'ambassade royale de Thaïlande dans votre ville locale avant le départ.

---

## **Liste de Contrôle Récapitulative**

*   **Statut du Visa** : *60 jours de séjour autorisés avec un passeport valide uniquement.*
*   **Prolongation** : *30 jours supplémentaires peuvent être demandés en Thaïlande si nécessaire.*
*   **Préparation** : *Gardez vos billets de retour et vos réservations d'hébergement prêts pour l'inspection.*

---

*En suivant ces directives, vous pouvez garantir une entrée fluide et légale dans le Royaume de Thaïlande !*`,
};
