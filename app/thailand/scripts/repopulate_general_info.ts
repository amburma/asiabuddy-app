import fs from "fs";
import path from "path";

const translations: Record<string, string> = {
  english: `# Thailand General Information

## 1. Basics & Cultural Etiquette

*   **[The Greeting (Wai)]:** *Thais greet others by pressing their palms together in a prayer-like gesture and bowing slightly.*
*   **[Men]:** Say "Sawasdee Krub"
*   **[Women]:** Say "Sawasdee Ka"
*   **[Dress Code]:** __<u>Modest attire is mandatory</u>__ at the Grand Palace and all Temples (Wats). Shoulders and knees must be covered; sleeveless tops, ripped jeans, and short skirts are strictly prohibited.
*   **[Tipping Etiquette]:** *Not mandatory but appreciated.* Large restaurants usually add a 10% service charge. For small vendors or taxis, rounding up the change is a common local practice.

## 2. Logistics & Connectivity

*   **[Transport Apps]:** Download **Grab** or **Bolt** for reliable rides and transparent pricing. Use **Google Maps** for real-time bus and train schedules.
*   **[Public Transit]:** Utilize the **BTS (Skytrain)** and **MRT (Subway)** to bypass Bangkok’s famous traffic jams.
*   **[Connectivity]:** Purchase a **Tourist SIM Card** (AIS, TrueMove, or DTAC) at the airport upon arrival for instant 5G access.
*   **[The "7-Eleven" Rule]:** These stores are open __<u>24/7</u>__ and are your best resource for snacks, emergency supplies, and bill payments.

## 3. Safety & Health

*   **[Emergency Numbers]:**
    -   **[Tourist Police]:** **1155** (English speaking)
    -   **[Ambulance]:** **1669**
*   **[Scam Alert]:** *If a driver tells you a major landmark is "closed for a holiday" or "closed today," politely decline.* It is almost always a scam to take you to a high-commission jewelry or tailor shop.
*   **[Medical]:** **Bumrungrad** and **Bangkok Hospital** provide world-class international care. **Boots/Watsons** pharmacies are available in every mall.

## 4. Money Matters

*   **[Currency]:** **Thai Baht (THB)**.
*   **[Best Exchange]:** Look for **SuperRich** (Orange or Green) for the highest rates compared to banks.
*   **[Payment]:** __<u>Cash is King</u>__ at street markets and food stalls. Use Credit Cards for malls, hotels, and fine dining.
*   **[ATM Usage]:** Expect a **220 Baht fee** per withdrawal for international cards. Withdraw larger amounts to minimize fees.

## 5. Food, Sightseeing & Climate

*   **[Must-Eat]:** **Tom Yum Goong**, **Pad Thai**, and **Mango Sticky Rice**.
*   **[Top Landmarks]:** **Grand Palace**, **Wat Arun**, and **Wat Pho**.
*   **[Best Shopping]:** **Siam Paragon** (Luxury) and **Iconsiam** (Riverfront).
*   **[Weather]:** *Hot and humid (28°C - 35°C).* The rainy season is June to October. Always carry a lightweight poncho.

---

## Do’s and Don’ts in Thailand

### __<u>Monarchy</u>__
*   **[Do]:** **Show Deep Respect**—*Treat all images of the King with reverence.*
*   **[Don't]:** **Never Deface Currency**—*Stepping on a coin or bill is a crime as it bears the King's image.*

### __<u>Social</u>__
*   **[Do]:** **The "Smile"**—*Use a smile to resolve minor conflicts or confusion.*
*   **[Don't]:** **No Touching Heads**—*The head is sacred. Never touch anyone (including children) on the head.*

### __<u>Etiquette</u>__
*   **[Do]:** **Remove Shoes**—*Take off footwear before entering homes or temple interiors.*
*   **[Don't]:** **No Feet Pointing**—*Never point your feet at people, monks, or Buddha statues.*

### __<u>Transport</u>__
*   **[Do]:** **Ask for the Meter**—*Ensure the "Meter" is on before the taxi starts moving.*
*   **[Don't]:** **No Public Anger**—*Avoid shouting or losing your temper (this causes "loss of face").*

### __<u>Safety</u>__
*   **[Do]:** **Drink Bottled Water**—*Only drink sealed, bottled, or filtered water.*
*   **[Don't]:** **Respect Buddha**—*Do not climb on statues or use Buddha images as fashion/tattoos.*`,

  thai: `# ข้อมูลทั่วไปเกี่ยวกับประเทศไทย

## 1. พื้นฐานและมารยาททางวัฒนธรรม

*   **[การทักทาย (ไหว้)]:** *คนไทยทักทายผู้อื่นโดยการพนมมือเข้าด้วยกันเหมือนการอธิษฐานและก้มศีรษะลงเล็กน้อย*
*   **[ผู้ชาย]:** พูดว่า "สวัสดีครับ"
*   **[ผู้หญิง]:** พูดว่า "สวัสดีค่ะ"
*   **[การแต่งกาย]:** __<u>ต้องแต่งกายสุภาพ</u>__ เมื่อเข้าชมพระบรมมหาราชวังและวัดต่างๆ ต้องปิดไหล่และเข่า ห้ามสวมเสื้อแขนกุด กางเกงยีนส์ขาด และกระโปรงสั้นโดยเด็ดขาด
*   **[มารยาทการให้ทิป]:** *ไม่บังคับแต่เป็นที่ชื่นชม* ร้านอาหารขนาดใหญ่มักเพิ่มค่าบริการ 10% สำหรับร้านค้าย่อยหรือแท็กซี่ การปัดเศษเงินทอนเป็นแนวทางปฏิบัติทั่วไปของท้องถิ่น

## 2. โลจิสติกส์และการเชื่อมต่อ

*   **[แอปการเดินทาง]:** ดาวน์โหลด **Grab** หรือ **Bolt** เพื่อการเดินทางที่เชื่อถือได้และราคาที่โปร่งใส ใช้ **Google Maps** สำหรับตารางเวลารถประจำทางและรถไฟแบบเรียลไทม์
*   **[การขนส่งสาธารณะ]:** ใช้ **BTS (รถไฟฟ้า)** และ **MRT (รถไฟใต้ดิน)** เพื่อเลี่ยงการจราจรที่ติดขัดของกรุงเทพฯ
*   **[การเชื่อมต่อ]:** ซื้อ **ซิมการ์ดนักท่องเที่ยว** (AIS, TrueMove หรือ DTAC) ที่สนามบินเมื่อเดินทางมาถึงเพื่อเข้าถึง 5G ได้ทันที
*   **[กฎ "7-Eleven"]:** ร้านค้าเหล่านี้เปิด __<u>24 ชั่วโมงตลอด 7 วัน</u>__ และเป็นแหล่งข้อมูลที่ดีที่สุดสำหรับของว่าง อุปกรณ์ฉุกเฉิน และการชำระบิล

## 3. ความปลอดภัยและสุขภาพ

*   **[เบอร์ฉุกเฉิน]:**
    -   **[ตำรวจท่องเที่ยว]:** **1155** (พูดภาษาอังกฤษได้)
    -   **[รถพยาบาล]:** **1669**
*   **[การแจ้งเตือนการฉ้อโกง]:** *หากคนขับบอกคุณว่าสถานที่สำคัญ "ปิดในวันหยุด" หรือ "ปิดวันนี้" ให้ปฏิเสธอย่างสุภาพ* มันเกือบจะเป็นกลโกงเพื่อพาคุณไปยังร้านจิวเวลรี่หรือร้านตัดสูทที่มีค่าคอมมิชชั่นสูงเสมอ
*   **[การแพทย์]:** **โรงพยาบาลบำรุงราษฎร์** และ **โรงพยาบาลกรุงเทพ** ให้การดูแลระดับนานาชาติระดับโลก ร้านขายยา **Boots/Watsons** มีให้บริการในทุกห้างสรรพสินค้า

## 4. เรื่องการเงิน

*   **[สกุลเงิน]:** **บาทไทย (THB)**
*   **[การแลกเงินที่ดีที่สุด]:** มองหา **SuperRich** (สีส้มหรือสีเขียว) เพื่อรับอัตราแลกเปลี่ยนสูงสุดเมื่อเทียบกับธนาคาร
*   **[การชำระเงิน]:** __<u>เงินสดคือพระเจ้า</u>__ ที่ตลาดนัดและแผงลอยอาหาร ใช้บัตรเครดิตสำหรับห้างสรรพสินค้า โรงแรม และร้านอาหารหรู
*   **[การใช้ ATM]:** คาดว่าจะมี **ค่าธรรมเนียม 220 บาท** ต่อการถอนสำหรับบัตรต่างประเทศ ควรถอนเงินจำนวนมากเพื่อลดค่าธรรมเนียม

## 5. อาหาร สถานที่ท่องเที่ยว และภูมิอากาศ

*   **[เมนูที่ต้องลอง]:** **ต้มยำกุ้ง**, **ผัดไทย** และ **ข้าวเหนียวมะม่วง**
*   **[สถานที่สำคัญ]:** **พระบรมมหาราชวัง**, **วัดอรุณ** และ **วัดโพธิ์**
*   **[แหล่งช้อปปิ้งที่ดีที่สุด]:** **สยามพารากอน** (หรูหรา) และ **ไอคอนสยาม** (ริมน้ำ)
*   **[สภาพอากาศ]:** *ร้อนและชื้น (28°C - 35°C)* ฤดูฝนคือเดือนมิถุนายนถึงตุลาคม ควรพกเสื้อกันฝนน้ำหนักเบาเสมอ

---

## สิ่งที่ควรทำและไม่ควรทำในประเทศไทย

### __<u>สถาบันกษัตริย์</u>__
*   **[ควรทำ]:** **แสดงความเคารพอย่างสูง**—*ปฏิบัติต่อพระบรมฉายาลักษณ์ของกษัตริย์ด้วยความเคารพ*
*   **[ไม่ควรทำ]:** **ห้ามทำให้เงินตราเสียหาย**—*การเหยียบเหรียญหรือธนบัตรถือเป็นความผิดเนื่องจากมีพระบรมฉายาลักษณ์ของกษัตริย์*

### __<u>สังคม</u>__
*   **[ควรทำ]:** **"รอยยิ้ม"**—*ใช้รอยยิ้มเพื่อแก้ไขความขัดแย้งเล็กน้อยหรือความสับสน*
*   **[ไม่ควรทำ]:** **ห้ามสัมผัสศีรษะ**—*ศีรษะเป็นของสูงและศักดิ์สิทธิ์ ห้ามสัมผัสศีรษะใคร (รวมถึงเด็ก)*

### __<u>มารยาท</u>__
*   **[ควรทำ]:** **ถอดรองเท้า**—*ถอดรองเท้าก่อนเข้าบ้านหรือภายในพระอุโบสถ*
*   **[ไม่ควรทำ]:** **ห้ามชี้เท้า**—*ห้ามชี้เท้าไปที่บุคคล พระสงฆ์ หรือพระพุทธรูป*

### __<u>การขนส่ง</u>__
*   **[ควรทำ]:** **ถามเรื่องมิเตอร์**—*ตรวจสอบให้แน่ใจว่า "มิเตอร์" เปิดอยู่ก่อนที่แท็กซี่จะเริ่มเคลื่อนที่*
*   **[ไม่ควรทำ]:** **ห้ามแสดงความโกรธในที่สาธารณะ**—*หลีกเลี่ยงการตะโกนหรือเสียสมาธิ (สิ่งนี้ทำให้ "เสียหน้า")*

### __<u>ความปลอดภัย</u>__
*   **[ควรทำ]:** **ดื่มน้ำบรรจุขวด**—*ดื่มเฉพาะน้ำที่ปิดสนิท บรรจุขวด หรือกรองแล้วเท่านั้น*
*   **[ไม่ควรทำ]:** **เคารพพระพุทธรูป**—*อย่าปีนขึ้นไปบนรูปปั้นหรือใช้รูปพระพุทธรูปเป็นแฟชั่น/รอยสัก*`,

  myanmar: `# ထိုင်းနိုင်ငံ အထွေထွေဗဟုသုတ လမ်းညွှန်

## ၁။ အခြေခံနှင့် ယဉ်ကျေးမှုဆိုင်ရာ ကျင့်ဝတ်များ

*   **[နှုတ်ဆက်ခြင်း (Wai)]:** *ထိုင်းလူမျိုးများသည် လက်ဖဝါးနှစ်ဖက်ကို ဆုတောင်းသကဲ့သို့ ယှက်ပြီး အနည်းငယ် ဦးညွှတ်၍ နှုတ်ဆက်ကြသည်။*
*   **[အမျိုးသား]:** "Sawasdee Krub" ဟုပြောပါ။
*   **[အမျိုးသမီး]:** "Sawasdee Ka" ဟုပြောပါ။
*   **[ဝတ်စားဆင်ယင်မှု]:** __<u>ယဉ်ကျေးစွာ ဝတ်ဆင်ရန် လိုအပ်သည်</u>__ Grand Palace နှင့် ဘုရားကျောင်းများ (Wats) အားလုံးတွင် ဖြစ်သည်။ ပုခုံးနှင့် ဒူးများကို ဖုံးအုပ်ထားရမည်ဖြစ်ပြီး လက်ပြတ်အင်္ကျီများ၊ စုတ်ပြဲနေသော ဂျင်းဘောင်းဘီများနှင့် စကတ်တိုများကို တင်းကြပ်စွာ တားမြစ်ထားသည်။
*   **[မုန့်ဖိုး (Tipping)]:** *မဖြစ်မနေ မဟုတ်သော်လည်း ပေးလျှင် ဝမ်းသာကြသည်။* စားသောက်ဆိုင်ကြီးများတွင် များသောအားဖြင့် ဝန်ဆောင်ခ ၁၀% ပေါင်းထည့်လေ့ရှိသည်။ ဆိုင်ငယ်များ သို့မဟုတ် တက္ကစီများအတွက် အကြွေစေ့များကို ပြန်မအမ်းဘဲ ထားခဲ့ခြင်းသည် ထုံးစံတစ်ခုဖြစ်သည်။

## ၂။ သယ်ယူပို့ဆောင်ရေးနှင့် ဆက်သွယ်ရေး

*   **[သယ်ယူပို့ဆောင်ရေး အက်ပ်များ]:** စိတ်ချရသော ခရီးစဉ်များနှင့် ပွင့်လင်းမြင်သာသော စျေးနှုန်းများအတွက် **Grab** သို့မဟုတ် **Bolt** ကို ဒေါင်းလုဒ်လုပ်ပါ။ ဘတ်စ်ကားနှင့် ရထား အချိန်ဇယားများအတွက် **Google Maps** ကို အသုံးပြုပါ။
*   **[အများသုံး သယ်ယူပို့ဆောင်ရေး]:** ဘန်ကောက်၏ နာမည်ကြီး ယာဉ်ကြောပိတ်ဆို့မှုများကို ရှောင်ရှားရန် **BTS (Skytrain)** နှင့် **MRT (Subway)** ကို အသုံးပြုပါ။
*   **[ဆက်သွယ်ရေး]:** ရောက်ရှိလာချိန်တွင် 5G အသုံးပြုနိုင်ရန် လေဆိပ်တွင် **Tourist SIM Card** (AIS, TrueMove သို့မဟုတ် DTAC) ကို ဝယ်ယူပါ။
*   **[၇-အလဲဗင်း (7-Eleven) စည်းမျဉ်း]:** ဤဆိုင်များသည် __<u>၂၄ နာရီပတ်လုံး</u>__ ဖွင့်လှစ်ထားပြီး မုန့်မျိုးစုံ၊ အရေးပေါ် လိုအပ်ချက်များနှင့် ဘေလ်ပေးဆောင်ရန် အကောင်းဆုံးနေရာ ဖြစ်သည်။

## ၃။ ဘေးကင်းလုံခြုံရေးနှင့် ကျန်းမာရေး

*   **[အရေးပေါ် ဖုန်းနံပါတ်များ]:**
    -   **[ကမ္ဘာလှည့်ခရီးသည် ရဲတပ်ဖွဲ့]:** **၁၁၅၅** (အင်္ဂလိပ်ဘာသာ စကားပြောဆိုနိုင်သည်)
    -   **[လူနာတင်ယာဉ်]:** **၁၆၆၉**
*   **[လိမ်လည်မှု သတိပေးချက်]:** *အကယ်၍ ယာဉ်မောင်းတစ်ဦးက အဓိကနေရာတစ်ခုသည် "ပိတ်ရက်ဖြစ်၍ ပိတ်ထားသည်" သို့မဟုတ် "ယနေ့ ပိတ်သည်" ဟု ပြောပါက ယဉ်ကျေးစွာ ငြင်းပယ်ပါ။* ၎င်းသည် များသောအားဖြင့် ကော်မရှင်နှုန်း မြင့်မားသော ကျောက်မျက်ဆိုင် သို့မဟုတ် အပ်ချုပ်ဆိုင်သို့ ခေါ်ဆောင်ရန် လိမ်လည်ခြင်းသာ ဖြစ်သည်။
*   **[ဆေးဘက်ဆိုင်ရာ]:** **Bumrungrad** နှင့် **Bangkok Hospital** တို့သည် ကမ္ဘာ့အဆင့်မီ နိုင်ငံတကာ ကျန်းမာရေးစောင့်ရှောက်မှုကို ပေးဆောင်သည်။ **Boots/Watsons** ဆေးဆိုင်များကို စျေးဝယ်စင်တာ တိုင်းတွင် တွေ့နိုင်သည်။

## ၄။ ငွေကြေးဆိုင်ရာ ကိစ္စရပ်များ

*   **[ငွေကြေး]:** **ထိုင်းဘတ် (THB)**။
*   **[အကောင်းဆုံး လဲလှယ်နှုန်း]:** ဘဏ်များထက် မြင့်မားသော လဲလှယ်နှုန်းအတွက် **SuperRich** (လိမ္မော်ရောင် သို့မဟုတ် အစိမ်းရောင်) ကို ရှာဖွေပါ။
*   **[ငွေပေးချေမှု]:** __<u>ငွေသားသည် အဓิကဖြစ်သည်</u>__ လမ်းဘေးစျေးများနှင့် အစားအစာဆိုင်များတွင် ဖြစ်သည်။ စျေးဝယ်စင်တာများ၊ ဟိုတယ်များနှင့် အဆင့်မြင့် စားသောက်ဆိုင်များအတွက် ခရက်ဒစ်ကတ်ကို အသုံးပြုပါ။
*   **[ATM အသုံးပြုခြင်း]:** နိုင်ငံတကာကတ်များအတွက် ငွေထုတ်ယူမှု တစ်ကြိမ်လျှင် **၂၂၀ ဘတ် အခကြေးငွေ** ပေးရမည် ဖြစ်သည်။ အခကြေးငွေ သက်သာစေရန် တစ်ကြိမ်လျှင် ပမာဏများများ ထုတ်ယူပါ။

## ၅။ အစားအစာ၊ လည်ပတ်စရာနေရာများနှင့် ရာသီဥတု

*   **[မဖြစ်မနေ မြည်းစမ်းကြည့်သင့်သည့် အစားအစာ]:** **တုံယမ်းဟင်းချို**၊ **ဖတ်ထိုင်း** နှင့် **သရက်သီး ကောက်ညှင်း**။
*   **[ထင်ရှားသော နေရာများ]:** **Grand Palace**၊ **Wat Arun** และ **Wat Pho**။
*   **[အကောင်းဆုံး စျေးဝယ်ထွက်ရန် နေရာ]:** **Siam Paragon** (ဇိမ်ခံပစ္စည်း) နှင့် **Iconsiam** (မြစ်ကမ်းနား)။
*   **[ရာသီဥတု]:** *ပူပြင်းစိုစွတ်သည် (၂၈ ဒီဂရီစင်တီဂရိတ် - ၃၅ ဒီဂရီစင်တီဂရိတ်)။* မိုးရာသီသည် ဇွန်လမှ အောက်တိုဘာလအထိ ဖြစ်သည်။ ပေါ့ပါးသော မိုးကာအင်္ကျီကို အမြဲဆောင်ထားပါ။

---

## ထိုင်းနိုင်ငံတွင် လုပ်ဆောင်ရန်နှင့် ရှောင်ကြဉ်ရန် အချက်များ

### __<u>ဘုရင်စနစ်</u>__
*   **[လုပ်ဆောင်ရန်]:** **လေးစားသမှု အပြည့်ပြသပါ**—*ဘုရင်မင်းမြတ်၏ ပုံတော်များအားလုံးကို ရိုသေလေးစားစွာ ဆက်ဆံပါ။*
*   **[ရှောင်ကြဉ်ရန်]:** **ငွေကြေးကို ဘယ်တော့မှ มဖျက်ဆီးပါနှင့်**—*ဒင်္ဂါး သို့မဟုတ် ငွေစက္ကူကို นင်းခြင်းသည် ဘုရင်မင်းမြတ်၏ ပုံတော်ပါရှိသဖြင့် ပြစ်မှုဖြစ်သည်။*

### __<u>လူမှုရေး</u>__
*   **[လုပ်ဆောင်ရန်]:** **"အပြုံး"**—*အသေးအဖွဲ ပဋိပက္ခများ သို့မဟုတ် ဝေခွဲမရဖြစ်မှုများကို ဖြေရှင်းရန် အပြုံးကို အသုံးပြုပါ။*
*   **[ရှောင်ကြဉ်ရန်]:** **ဦးခေါင်းကို မကိုင်ပါနှင့်**—*ဦးခေါင်းသည် မြင့်မြတ်သော နေရာဖြစ်သည်။ မည်သူ့ကိုမျှ (ကလေးများအပါအဝင်) ဦးခေါင်းကို မကိုင်ပါနှင့်။*

### __<u>ကျင့်ဝတ်</u>__
*   **[လုပ်ဆောင်ရန်]:** **ဖိနပ်ချွတ်ပါ**—*အိမ်များ သို့မဟုတ် ဘုရားကျောင်းများအတွင်းသို့ မဝင်မီ ဖိနပ်ချွတ်ပါ။*
*   **[ရှောင်ကြဉ်ရန်]:** **ခြေထောက်ဖြင့် မညွှန်ပါနှင့်**—*လူများ၊ ရဟန်းသံဃာများ သို့မဟုတ် ဗုဒ္ဓရုပ်ပွားတော်များထံသို့ ခြေထောက်ဖြင့် ဘယ်တော့မှ မညွှန်ပါနှင့်။*

### __<u>သယ်ယူပို့ဆောင်ရေး</u>__
*   **[လုပ်ဆောင်ရန်]:** **မီတာဖွင့်ရန် ပြောပါ**—*တက္ကစီ မထွက်ခွာမီ "Meter" ဖွင့်ထားကြောင်း သေချาပါစေ။*
*   **[ရှောင်ကြဉ်ရန်]:** **လူရှေ့တွင် စိတ်မဆိုးပါနှင့်**—*အော်ဟစ်ခြင်း သို့မဟုတ် ဒေါသထွက်ခြင်းကို ရှောင်ကြဉ်ပါ။ (၎င်းသည် "မျက်နှาပျက်စရာ" ဖြစ်စေသည်)*

### __<u>ဘေးကင်းရေး</u>__
*   **[လုပ်ဆောင်ရန်]:** **ရေသန့်ဗူးကိုသာ သောက်ပါ**—*ပိတ်ထားသော ရေသန့်ဗူး သို့မဟုတ် စစ်ထုတ်ထားသော ရေကိုသာ သောက်ပါ။*
*   **[ရှောင်ကြဉ်ရန်]:** **ဗုဒ္ဓမြတ်စွာဘုရားကို ရိုသေပါ**—*ရုပ်ပွားတော်များပေါ်သို့ မတက်ပါနှင့်၊ ဗုဒ္ဓပုံတော်များကို ဖက်ရှင် သို့မဟုတ် တက်တူးအဖြစ် မသုံးပါနှင့်။*`,

  spanish: `# Información General de Tailandia

## 1. Conceptos Básicos y Etiqueta Cultural

*   **[El Saludo (Wai)]:** *Los tailandeses saludan juntando las palmas de las manos en un gesto de oración e inclinándose ligeramente.*
*   **[Hombres]:** Digan "Sawasdee Krub"
*   **[Mujeres]:** Digan "Sawasdee Ka"
*   **[Código de Vestimenta]:** __<u>La vestimenta modesta es obligatoria</u>__ en el Gran Palacio y en todos los Templos (Wats). Los hombros y las rodillas deben estar cubiertos; las prendas sin mangas, vaqueros rotos y faldas cortas están estrictamente prohibidos.
*   **[Etiqueta de Propinas]:** *No es obligatorio pero se agradece.* Los restaurantes grandes suelen añadir un cargo por servicio del 10%. Para pequeños vendedores o taxis, redondear el cambio es común.

## 2. Logística y Conectividad

*   **[Apps de Transporte]:** Descarga **Grab** o **Bolt** para viajes fiables y precios transparentes. Usa **Google Maps** para horarios de bus y tren en tiempo real.
*   **[Transporte Público]:** Utiliza el **BTS (Skytrain)** y el **MRT (Metro)** para evitar los famosos atascos de Bangkok.
*   **[Conectividad]:** Compra una **Tarjeta SIM Turística** (AIS, TrueMove o DTAC) en el aeropuerto para acceso 5G instantáneo.
*   **[La Regla del "7-Eleven"]:** Estas tiendas abren __<u>24/7</u>__ y son el mejor recurso para snacks, suministros de emergencia y pago de facturas.

## 3. Seguridad y Salud

*   **[Números de Emergencia]:**
    -   **[Policía Turística]:** **1155** (hablan inglés)
    -   **[Ambulancia]:** **1669**
*   **[Alerta de Estafas]:** *Si un conductor dice que un monumento está "cerrado por vacaciones" o "cerrado hoy", declina educadamente.* Suele ser una estafa para llevarte a tiendas con altas comisiones.
*   **[Médico]:** **Bumrungrad** y **Bangkok Hospital** ofrecen atención internacional de clase mundial. Farmacias **Boots/Watsons** en cada centro comercial.

## 4. Dinero

*   **[Moneda]:** **Baht tailandés (THB)**.
*   **[Mejor Cambio]:** Busca **SuperRich** (Naranja o Verde) para las mejores tasas.
*   **[Pago]:** __<u>El efectivo es el rey</u>__ en mercados y puestos de comida. Usa tarjetas en centros comerciales y hoteles.
*   **[Cajeros (ATM)]:** Comisión de **220 Baht** por retiro para tarjetas internacionales. Retira cantidades grandes.

## 5. Comida, Turismo y Clima

*   **[Imprescindible]:** **Tom Yum Goong**, **Pad Thai** y **Mango Sticky Rice**.
*   **[Monumentos]:** **Gran Palacio**, **Wat Arun** y **Wat Pho**.
*   **[Compras]:** **Siam Paragon** (Lujo) e **Iconsiam** (Riverfront).
*   **[Clima]:** *Caluroso y húmedo (28°C - 35°C).* Temporada de lluvias: de junio a octubre. Lleva siempre poncho.

---

## Lo que se debe y no se debe hacer en Tailandia

### __<u>Monarquía</u>__
*   **[Sí]:** **Mostrar Respeto Profundo**—*Trata todas las imágenes del Rey con reverencia.*
*   **[No]:** **Nunca Dañar la Moneda**—*Pisar una moneda o billete es un delito.*

### __<u>Social</u>__
*   **[Sí]:** **La "Sonrisa"**—*Úsala para resolver conflictos menores o confusión.*
*   **[No]:** **No Tocar Cabezas**—*La cabeza es sagrada. Nunca la toques (incluidos niños).*

### __<u>Etiqueta</u>__
*   **[Sí]:** **Quitarse los Zapatos**—*Hazlo antes de entrar en casas o interiores de templos.*
*   **[No]:** **No Apuntar con los Pies**—*Nunca apuntes a personas, monjes o estatuas.*

### __<u>Transporte</u>__
*   **[Sí]:** **Pedir el Taxímetro**—*Asegúrate de que esté encendido antes de arrancar.*
*   **[No]:** **No Ira Pública**—*Evita gritar o perder los estribos (causa "pérdida de cara").*

### __<u>Seguridad</u>__
*   **[Sí]:** **Beber Agua Embotellada**—*Solo agua sellada o filtrada.*
*   **[No]:** **Respetar a Buda**—*No subas a estatuas ni uses imágenes como moda/tatuajes.*`,

  french: `# Informations Générales sur la Thaïlande

## 1. Bases et Étiquette Culturelle

*   **[Le Salut (Wai)] :** *Les Thaïlandais saluent en joignant les paumes des mains dans un geste de prière et en s'inclinant légèrement.*
*   **[Hommes] :** Dites "Sawasdee Krub"
*   **[Femmes] :** Dites "Sawasdee Ka"
*   **[Code Vestimentaire] :** __<u>Une tenue modeste est obligatoire</u>__ au Grand Palais et dans tous les temples (Wats). Les épaules et les genoux doivent être couverts ; les hauts sans manches, les jeans déchirés et les jupes courtes sont strictement interdits.
*   **[Pourboires] :** *Pas obligatoire mais apprécié.* Les grands restaurants ajoutent souvent 10 % de frais de service. Pour les petits vendeurs ou les taxis, arrondir la monnaie est une pratique courante.

## 2. Logistique et Connectivité

*   **[Apps de Transport] :** Téléchargez **Grab** ou **Bolt** pour des trajets fiables et des prix transparents. Utilisez **Google Maps** pour les horaires de bus et de train en temps réel.
*   **[Transports Publics] :** Utilisez le **BTS (Skytrain)** et le **MRT (Métro)** pour contourner les célèbres embouteillages de Bangkok.
*   **[Connectivité] :** Achetez une **Carte SIM Touristique** (AIS, TrueMove ou DTAC) à l'aéroport dès votre arrivée pour un accès 5G instantané.
*   **[La règle du "7-Eleven"] :** Ces magasins sont ouverts __<u>24h/24 et 7j/7</u>__ et constituent votre meilleure ressource pour les collations, les fournitures d'urgence et les paiements de factures.

## 3. Sécurité et Santé

*   **[Numéros d'Urgence] :**
    -   **[Police Touristique] :** **1155** (parle anglais)
    -   **[Ambulance] :** **1669**
*   **[Alerte aux Arnaques] :** *Si un chauffeur vous dit qu'un monument majeur est "fermé pour un jour férié" ou "fermé aujourd'hui", déclinez poliment.* C'est presque toujours une arnaque.
*   **[Médical] :** **Bumrungrad** et **Bangkok Hospital** offrent des soins internationaux de classe mondiale. Les pharmacies **Boots/Watsons** sont disponibles dans chaque centre commercial.

## 4. Questions d'Argent

*   **[Devise] :** **Baht Thaïlandais (THB)**.
*   **[Meilleur Change] :** Cherchez **SuperRich** (Orange ou Vert) pour les meilleurs taux.
*   **[Paiement] :** __<u>L'argent liquide est roi</u>__ sur les marchés de rue et les stands de nourriture. Utilisez des cartes de crédit pour les centres commerciaux et les hôtels.
*   **[Utilisation des ATM] :** Attendez-vous à des frais de **220 Bahts** par retrait pour les cartes internationales. Retirez des montants plus importants.

## 5. Nourriture, Tourisme et Climat

*   **[À Gouter] :** **Tom Yum Goong**, **Pad Thai** et **Mango Sticky Rice**.
*   **[Monuments Top] :** **Grand Palais**, **Wat Arun** et **Wat Pho**.
*   **[Shopping] :** **Siam Paragon** (Luxe) et **Iconsiam** (Bord de rivière).
*   **[Météo] :** *Chaud et humide (28°C - 35°C).* La saison des pluies va de juin à octobre. Portez toujours un poncho léger.

---

## À faire et à ne pas faire en Thaïlande

### __<u>Monarchie</u>__
*   **[À faire] :** **Montrer un Grand Respect**—*Traitez toutes les images du Roi avec révérence.*
*   **[À ne pas faire] :** **Ne jamais dégrader la monnaie**—*Marcher sur une pièce ou un billet est un crime.*

### __<u>Social</u>__
*   **[À faire] :** **Le "Sourire"**—*Utilisez le sourire pour résoudre les conflits mineurs.*
*   **[À ne pas faire] :** **Ne pas toucher les têtes**—*La tête est sacrée. Ne touchez jamais la tête de personne.*

### __<u>Etiquette</u>__
*   **[À faire] :** **Retirer les Chaussures**—*Enlevez vos chaussures avant d'entrer dans les maisons ou les temples.*
*   **[À ne pas faire] :** **Pas de pieds pointés**—*Ne pointez jamais vos pieds vers des gens, des moines ou des statues de Bouddha.*

### __<u>Transport</u>__
*   **[À faire] :** **Demander le Compteur**—*Assurez-vous que le "Meter" est allumé avant que le taxi ne démarre.*
*   **[À ne pas faire] :** **Pas de colère publique**—*Évitez de crier ou de perdre votre calme.*

### __<u>Sécurité</u>__
*   **[À faire] :** **Boire de l'eau en bouteille**—*Ne buvez que de l'eau scellée ou filtrée.*
*   **[À ne pas faire] :** **Respecter Bouddha**—*Ne montez pas sur les statues.*`,

  chinese: `# 泰国旅游概况指南

## 1. 基本常识与文化礼仪

*   **[问候礼 (Wai)]：** *泰国人通过双手合十并行微礼来互致问候。*
*   **[男性]：** 请说 "Sawasdee Krub"
*   **[女性]：** 请说 "Sawasdee Ka"
*   **[着装规范]：** __<u>大皇宫及所有寺庙必须着装端庄</u>__。必须遮盖肩膀和膝盖；严禁穿无袖上衣、破洞牛仔裤和短裙。
*   **[小费礼仪]：** *非强制性，但深受欢迎。* 大型餐厅通常会加收 10% 的服务费。对于小贩或出租车，找零结余是常见的做法。

## 2. 后勤与通讯

*   **[交通 App]：** 下载 **Grab** 或 **Bolt** 以获得可靠的行程和透明的价格。使用 **Google Maps** 查看实时的巴士和火车时刻表。
*   **[公共交通]：** 利用 **BTS (轻轨)** 和 **MRT (地铁)** 避开曼谷著名的交通拥堵。
*   **[通讯连接]：** 抵达机场后购买 **游客 SIM 卡** (AIS, TrueMove 或 DTAC) 即可即时接入 5G 網絡。
*   **[“7-Eleven”法则]：** 这些商店 __<u>24/7 全天候营业</u>__，是您购买零食、紧急用品和缴纳费用的最佳资源。

## 3. 安全与健康

*   **[紧急电话]：**
    -   **[旅游警察]：** **1155** (说英语)
    -   **[救护车]：** **1669**
*   **[骗局警示]：** *如果司机告诉你某个主要地标“因节假日关闭”或“今天关闭”，请礼貌拒绝。* 这通常是为了带你去高回佣商店的骗局。
*   **[医疗]：** **康民医院 (Bumrungrad)** 和 **曼谷医院 (Bangkok Hospital)** 提供世界一流的国际医疗服务。**Boots/Watsons** 药妆店遍布各大商场。

## 4. 财务事项

*   **[货币]：** **泰铢 (THB)**。
*   **[最佳兑换]：** 寻找 **SuperRich** (橙色或绿色) 以获得比银行更高的汇率。
*   **[支付]：** __<u>现金为王</u>__，特别是在露天市场和食品摊位。商场、酒店和高级餐厅可使用信用卡。
*   **[ATM 使用]：** 国际卡每次提款预计需支付 **220 泰铢费用**。建议单次提取较大金额以减少手续费。

## 5. 美食、观光与气候

*   **[必吃美食]：** **冬阴功 (Tom Yum Goong)**、**泰式炒河粉 (Pad Thai)** 和 **芒果糯米饭**。
*   **[顶级地标]：** **大皇宫**、**郑王庙 (Wat Arun)** 和 **卧佛寺 (Wat Pho)**。
*   **[最佳购物]：** **暹罗百丽宫 (Siam Paragon)** (奢华) 和 **暹罗天地 (Iconsiam)** (河畔)。
*   **[气候]：** *炎热潮湿 (28°C - 35°C)。* 雨季为 6 月至 10 月。请随身携带一件轻便雨衣。

---

## 泰国旅游避雷与行为指南

### __<u>王室相关</u>__
*   **[宜]：** **展示深切尊重**—*恭敬对待所有国王的画像。*
*   **[忌]：** **严禁污损货币**—*踩踏硬币或纸币是一项罪行，因为上面印有国王的头像。*

### __<u>社交礼仪</u>__
*   **[宜]：** **“微笑”**—*用微笑来化解小的冲突或困惑。*
*   **[忌]：** **严禁触摸头部**—*头部是神圣的。切勿触摸任何人的头部 (包括儿童)。*

### __<u>常规礼节</u>__
*   **[宜]：** **脱鞋**—*进入民宅或寺庙内部前请先脱鞋。*
*   **[忌]：** **忌用脚指物**—*切勿用脚指向人、僧侣或佛像。*

### __<u>交通出行</u>__
*   **[宜]：** **要求打表**—*确保在出租车起步前已开启“Meter (计价器)”。*
*   **[忌]：** **忌当众发怒**—*避免大声喧哗或发脾气 (这会导致“丢脸”)。*

### __<u>安全卫生</u>__
*   **[宜]：** **饮用瓶装水**—*只饮用密封、瓶装或过滤水。*
*   **[忌]：** **尊重佛像**：不要攀爬雕像，也不要将佛像图案用于时尚或纹身。*`,

  japanese: `# タイ一般情報ガイド

## 1. 基本と文化的なエチケット

*   **[挨拶 (ワイ)]：** *タイ人は両手を合わせて祈るような仕草をし、軽くお辞儀をして挨拶をします。*
*   **[男性]：** "サワディー・クラップ" と言います。
*   **[女性]：** "サワディー・カー" と言います。
*   **[ドレスコード]：** __<u>控えめな服装が義務付けられています</u>__（王宮や全ての寺院）。肩と膝を隠す必要があります。ノースリーブ、ダメージジーンズ、短すぎるスカートは厳禁です。
*   **[チップのエチケット]：** *義務ではありませんが、感謝されます。* 大きなレストランでは通常10%のサービス料が加算されます。

## 2. ロジスティクスと通信

*   **[交通アプリ]：** 信頼できる乗車と透明な価格設定のために **Grab** または **Bolt** をダウンロードしてください。リアルタイムの時刻表には **Google Maps** を使用します。
*   **[公共交通機関]：** 渋滞を避けるために **BTS (スカイトレイン)** と **MRT (地下鉄)** を活用しましょう。
*   **[通信環境]：** 到着時に空港で **ツーリストSIMカード** (AIS, TrueMove, または DTAC) を購入すると、すぐに5Gを利用できます。
*   **[「セブン-イレブン」の法則]：** これらの店舗は __<u>24時間年中無休</u>__ で、軽食や緊急用品?購入、支払いに最適です。

## 3. 安全と健康

*   **[緊急連絡先]：**
    -   **[ツーリスト警察]：** **1155** (英語対応)
    -   **[救急車]：** **1669**
*   **[詐欺への注意]：** *運転手が「今日は祝日で閉まっている」と言っても、丁寧に断りましょう。* ほとんどの場合、高額な店に連れて行くための詐欺です。
*   **[医療]：** **バムルンラード** や **バンコク病院** は国際的なケアを提供しています。**Boots/Watsons** は主要なモールにあります。

## 4. お金の話

*   **[通貨]：** **タイバーツ (THB)**。
*   **[両替]：** 銀行よりもレートが良い **SuperRich** (オレンジまたは緑) を探しましょう。
*   **[支払い]：** 市場では __<u>現金が主流</u>__ です。モールやホテルではクレジットカードを使用できます。
*   **[ATM]：** 国際カードでの引き出しには1回につき **220バーツの手数料** がかかります。

## 5. 食事・観光・気候

*   **[必食メニュー]：** **トムヤムクン**、**パッタイ**、**マンゴー・スティッキーライス**。
*   **[トップランドマーク]：** **王宮 (Grand Palace)**、**ワット・アルン**、**ワット・ポー**。
*   **[ショッピング]：** **サイアム・パラゴン** (高級) や **アイコンサイアム** (リバーフロント)。
*   **[天気]：** *高温多湿 (28°C - 35°C)。* 雨季は6月から10月です。常に軽いポンチョを持ち歩きましょう。

---

## タイでの「するべきこと」と「してはいけないこと」

### __<u>王室について</u>__
*   **[するべき]：** **深い敬意を払う**—*国王の肖像画はすべて敬意を持って扱ってください。*
*   **[してはいけない]：** **通貨を汚さない**—*国王の肖像が描かれているため、コインや紙幣を踏むことは罪になります。*

### __<u>社会生活</u>__
*   **[するべき]：** **「笑顔」**—*ちょっとした紛争や混乱を解決するために笑顔を使いましょう。*
*   **[してはいけない]：** **頭に触れない**—*頭は神聖な場所です。子供を含め、他人の頭には絶対に触れないでください。*

### __<u>エチケット</u>__
*   **[するべき]：** **靴を脱ぐ**：家の中や寺院の内部に入る前には靴を脱いでください。
*   **[してはいけない]：** **足を向けない**—*人、僧侶、または仏像に足を向けないでください。*

### __<u>交通機関</u>__
*   **[するべき]：** **メーターを頼む**—*タクシーが動き出す前に「メーター」が入っているか確認しましょう。*
*   **[してはいけない]：** **人前で怒らない**—*大声を上げたり、冷静さを失ったりしないでください（「メンツを失う」ことになります）。*

### __<u>安全面</u>__
*   **[するべき]：** **ボトル入りの水を飲む**—*密閉された水か、ろ過された水だけを飲んでください。*
*   **[してはいけない]：** **仏様を尊重する**—*仏像に登ったり、仏像をファッションやタトゥーに使わないでください。*`,

  korean: `# 태국 일반 정보 가이드

## 1. 기본 사항 및 문화적 에티켓

*   **[인사 (Wai)]：** *태국인들은 두 손을 모아 기도하듯 모으고 고개를 약간 숙여 인사합니다.*
*   **[남성]：** "Sawasdee Krub" (사왓디 크랍)이라고 말하세요.
*   **[여성]：** "Sawasdee Ka" (사왓디 카)라고 말하세요.
*   **[복장 규정]：** __<u>단정한 복장은 필수입니다</u>__ (왕궁 및 모든 사원). 어깨와 무릎을 가려야 하며, 민소매, 찢어진 청바지, 짧은 치마는 엄격히 금지됩니다.
*   **[팁 에티켓]：** *의무는 아니지만 권장됩니다.* 대형 식당은 보통 10%의 서비스 요금을 추가합니다.

## 2. 물류 및 연결성

*   **[교통 앱]：** 신뢰할 수 있는 운행과 투명한 가격을 위해 **Grab** 또는 **Bolt**를 다운로드하세요. 실시간 일정 확인에는 **Google Maps**를 사용하세요.
*   **[대중 교통]：** 방콕의 교통 체증을 피하려면 **BTS (지상철)** 및 **MRT (지하철)**를 이용하세요.
*   **[연결성]：** 도착 시 공항에서 **여행자 SIM 카드** (AIS, TrueMove 또는 DTAC)를 구입하여 즉시 5G를 이용하세요.
*   **[「7-Eleven」의 법칙]：** 이 상점들은 __<u>24시간 연중무휴</u>__로 운영되며 간식, 비상용품 구입 및 요금 납부에 가장 좋습니다.

## 3. 안전 및 건강

*   **[비상 연락처]：**
    -   **[관광 경찰]：** **1155** (영어 대응 가능)
    -   **[구급차]：** **1669**
*   **[사기 주의]：** *운전사가 주요 랜드마크가 "휴일이라 닫았다"거나 "오늘 닫았다"고 말하면 정중히 거절하세요.* 거의 항상 사기입니다.
*   **[의료]：** **Bumrungrad** 및 **Bangkok Hospital**은 세계적인 수준의 진료를 제공합니다. **Boots/Watsons** 약국은 모든 쇼핑몰에 있습니다.

## 4. 금전 사항

*   **[통화]：** **태국 바트 (THB)**.
*   **[최고의 환전]：** 은행보다 환율이 좋은 **SuperRich** (오렌지 또는 그린색)를 찾으세요.
*   **[결제]：** 시장에서는 __<u>현금이 최고</u>__입니다. 쇼핑몰, 호텔, 고급 식당에서는 신용카드를 사용하세요.
*   **[ATM 이용]：** 국제 카드의 경우 인출당 **220바트의 수수료**가 발생할 수 있습니다.

## 5. 음식, 관광 및 기후

*   **[필수 음식]：** **똠양꿍**, **팟타이**, **망고 스티키 라이스**.
*   **[주요 랜드마크]：** **왕궁 (Grand Palace)**, **왓 아룬**, **왓 포**.
*   **[최고의 쇼핑]：** **Siam Paragon** (럭셔리) 및 **Iconsiam** (리버프런트).
*   **[날씨]：** *덥고 습함 (28°C - 35°C).* 우기는 6월부터 10월까지입니다. 항상 가벼운 판초를 휴대하세요.

---

## 태국에서의 에티켓 (Do’s and Don’ts)

### __<u>왕실</u>__
*   **[Do]：** **깊은 존경심을 표하세요**—*왕의 모든 이미지를 경건하게 대하십시오.*
*   **[Don't]：** **통화를 훼손하지 마세요**—*동전이나 지폐를 밟는 것은 왕의 초상이 그려져 있어 범죄가 됩니다.*

### __<u>사회적 관계</u>__
*   **[Do]：** **「미소」**—*작은 갈등이나 혼란을 해결할 때 미소를 활용하세요.*
*   **[Don't]：** **머리를 만지지 마세요**—*머리는 신성한 곳입니다. 어린이를 포함하여 누구의 머리도 만지지 마십시오.*

### __<u>에티켓</u>__
*   **[Do]：** **신발 벗기**—*가정집이나 사원 내부로 들어가기 전에 신발을 벗으세요.*
*   **[Don't]：** **발로 가리키지 마세요**—*사람, 승려 또는 불상을 발로 가리키지 마십시오.*

### __<u>교통</u>__
*   **[Do]：** **미터기 요청하기**—*택시가 움직이기 전에 "미터기"가 켜져 있는지 확인하세요.*
*   **[Don't]：** **공공장소에서 화내지 마세요**—*소리를 지르거나 화를 내지 마십시오 (이는 "체면을 잃는" 일입니다).*

### __<u>안전</u>__
*   **[Do]：** **병에 든 생수 마시기**—*밀봉된 생수나 여과된 물만 마시십시오.*
*   **[Don't]：** **부처님을 존중하세요**—*불상에 올라가거나 불상 이미지를 타투 등으로 사용하지 마십시오.*`,
};

function repopulate() {
  const filePath = path.join(process.cwd(), "src/data/generalInformation.ts");
  
  const allLanguages = [
    'myanmar', 'english', 'spanish', 'french', 'italian', 'german', 
    'portuguese', 'russian', 'hebrew', 'chinese', 'hindi', 'japanese', 
    'korean', 'thai', 'malay', 'indonesian', 'vietnamese', 'arabic',
    'bengali', 'dutch', 'filipino', 'farsi', 'polish', 'romanian', 
    'swedish', 'turkish'
  ];

  let outputContent = "import { ThaiLanguage } from '../types';\n\n";
  outputContent += "export const GENERAL_INFORMATION: Record<ThaiLanguage, string> = {\n";
  
  for (const lang of allLanguages) {
    const text = translations[lang] || translations.english;
    const escapedContent = text.replace(/`/g, "\\`").replace(/\${/g, "\\${");
    outputContent += `  ${lang}: \`${escapedContent}\`,\n`;
  }
  
  outputContent += "};\n";

  fs.writeFileSync(filePath, outputContent);
  console.log("File repopulated.");
}

repopulate();
