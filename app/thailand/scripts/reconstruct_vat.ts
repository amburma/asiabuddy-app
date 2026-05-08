import * as fs from 'fs';

const filePath = 'src/data/vatRefundGuide.ts';
const content = fs.readFileSync(filePath, 'utf8');

// I need to insert the missing languages between thai and romanian.
const thaiEndMarker = '*โดยการปฏิบัติตามขั้นตอนเหล่านี้ คุณสามารถได้รับเงินคืนระหว่าง **5% ถึง 15%** (ขึ้นอยู่กับประเทศ) ของมูลค่าการซื้อของคุณ!*`,';
const romanianStartMarker = '  romanian: `# Ghid de rambursare a TVA pentru călători';

const insertionPoint = content.indexOf(thaiEndMarker) + thaiEndMarker.length;
const romanianIndex = content.indexOf(romanianStartMarker);

if (insertionPoint === -1 || romanianIndex === -1) {
    console.error('Markers not found');
    process.exit(1);
}

const farsi = `
  farsi: \`# راهنمای استرداد مالیات بر ارزش افزوده (VAT Refund) برای مسافران

---

## استرداد مالیات بر ارزش افزوده چیست؟

اکثر کشورها مالیات را عمدتاً از شهروندان خود جمع‌آوری می‌کنند. از آنجایی که گردشگران خارجی در کشور اقامت ندارند، واجد شرایط دریافت استرداد **مالیات بر ارزش افزوده (VAT)** پرداخت شده برای کالاهای خریداری شده هستند.

***نکته مهم***: *شما نمی‌توانید برای هزینه‌های غذا، هزینه‌های هتل یا هزینه‌های خدمات، درخواست استرداد مالیات کنید. استرداد فقط برای «کالاهای فیزیکی» که از کشور خارج می‌شوند اعمال می‌شود.*

---

## شرایط واجد شرایط بودن

برای واجد شرایط شدن برای استرداد مالیات، باید معیارهای زیر را داشته باشید:

*   **وضعیت غیر مقیم**: *شما نباید مقیم کشور باشید. نباید ویزای اقامت یا اجازه کار داشته باشید.*
*   **حداقل خرید**: *باید حداقل مبلغ خرید در یک فروشگاه در یک روز را رعایت کنید (مثلاً ۲۰۰۰ بات در تایلند).*
*   **فروشگاه‌های مجاز**: *خرید باید از فروشگاه‌هایی انجام شود که دارای علامت «VAT Refund for Tourists» هستند.*

---

## مراحل درخواست استرداد مالیات

### مرحله ۱: در فروشگاه (هنگام خرید)

هنگام پرداخت، **پاسپورت** خود را برای درخواست **فرم استرداد مالیات** ارائه دهید.

فروشگاه به شما یک **فرم درخواست استرداد مالیات** همراه با **فاکتور مالیاتی** می‌دهد.

### مرحله ۲: در فرودگاه (قبل از تحویل بار)

قبل از تحویل چمدان‌ها، باید به **دفتر بازرسی گمرک (Customs Inspection Office)** مراجعه کنید.

پاسپورت، فرم‌ها و کالاهای خریداری شده را به افسر نشان دهید تا **مهر گمرک** را روی فرم‌های خود دریافت کنید.

### مرحله ۳: داخل فرودگاه (بعد از کنترل گذرنامه)

پس از عبور از کنترل گذرنامه، به **باجه استرداد مالیات (VAT Refund Counter)** مراجعه کنید.

فرم‌های مهر شده خود را تحویل دهید تا استرداد خود را به صورت **نقدی** یا اعتبار در **کارت اعتباری** دریافت کنید.\`,\n`;

const polish = `  polish: \`# Przewodnik po zwrocie podatku VAT dla podróżnych

---

## Co to jest zwrot podatku VAT?

Większość krajów pobiera podatki głównie od swoich obywateli. Ponieważ zagraniczni turyści nie osiedlają się w kraju, są oni uprawnieni do zwrotu **podatku od wartości dodanej (VAT)** zapłaconego od zakupionych towarów.

***Ważna uwaga***: *Nie można ubiegać się o zwrot podatku VAT za wydatki na posiłki, opłaty hotelowe lub opłaty serwisowe. Zwroty dotyczą wyłącznie „towarów fizycznych”, które zostaną wywiezione z kraju.*

---

## Wymagania dotyczące kwalifikowalności

Aby zakwalifikować się do zwrotu podatku VAT, należy spełnić następujące kryteria:

*   **Status obcokrajowca**: *Musisz być niemeldowanym gościem. Nie możesz posiadać wizy rezydenta ani pozwolenia na pracę w tym kraju.*
*   **Minimalny zakup**: *Musisz spełnić wymóg minimalnych wydatków w jednym sklepie w ciągu jednego dnia (np. 2000 bahtów w Tajlandii).*
*   **Autoryzowane sklepy**: *Zakupy muszą być dokonywane w sklepach oznaczonych znakiem „VAT Refund for Tourists”.*

---

## Kroki ubiegania się o zwrot podatku VAT

### Krok 1: W sklepie (podczas zakupu)

Podczas płacenia okaż **Paszport**, aby poprosić o **Formularz zwrotu podatku VAT**.

Sklep przekaże Ci **Formularz wniosku o zwrot podatku VAT** wraz z **fakturą podatkową**.

### Krok 2: Na lotnisku (pred odprawą)

Przed nadaniem bagażu należy udać się do **Biura Inspekcji Celnej (Customs Inspection Office)**.

Okaż urzędnikowi paszport, formularze i zakupione towary, aby uzyskać **pieczątkę celną** na formularzach.

### Krok 3: Wewnątrz lotniska (po kontroli paszportowej)

Po przejściu przez kontrolę paszportową udaj się do **punktu zwrotu podatku VAT (VAT Refund Counter)**.

Złóż opieczętowane formularze, aby otrzymać zwrot w **gotówce** lub na **kartę kredytową**.\`,\n`;

const vietnamese = `  vietnamese: \`# Hướng dẫn hoàn thuế VAT cho khách du lịch

---

## Hoàn thuế VAT là gì?

Hầu hết các quốc gia thu thuế chủ yếu từ công dân của họ. Vì khách du lịch nước ngoài không định cư trong nước nên họ đủ điều kiện được hoàn lại **Thuế giá trị gia tăng (VAT)** đã trả cho hàng hóa đã mua.

***Lưu ý quan trọng***: *Bạn không thể yêu cầu hoàn thuế VAT cho chi phí ăn uống, phí khách sạn hoặc phí dịch vụ. Hoàn thuế chỉ áp dụng cho "Hàng hóa vật chất" sẽ được mang ra khỏi đất nước.*

---

## Yêu cầu về điều kiện

Để đủ điều kiện được hoàn thuế VAT, bạn phải đáp ứng các tiêu chí sau:

*   **Tình trạng người nước ngoài**: *Bạn phải là người không cư trú. Bạn không thể là người có thị thực cư trú hoặc giấy phép làm việc tại quốc gia đó.*
*   **Mua tối thiểu**: *Bạn phải đáp ứng yêu cầu chi tiêu tối thiểu tại một cửa hàng trong một ngày (ví dụ: 2.000 Baht ở Thái Lan).*
*   **Cửa hàng được ủy quyền**: *Hàng hóa phải được mua từ các cửa hàng có dán bảng "VAT Refund for Tourists".*

---

## Các bước để nhận hoàn thuế VAT của bạn

### Bước 1: Tại cửa hàng (Khi mua hàng)

Khi thanh toán, hãy xuất trình **Hộ chiếu** của bạn để yêu cầu **Mẫu hoàn thuế VAT**.

Cửa hàng sẽ cung cấp cho bạn **Mẫu đơn đăng ký hoàn thuế VAT** cùng với **Hóa đơn thuế**.

### Bước 2: Tại sân bay (Trước khi làm thủ tục)

Trước khi ký gửi hành lý, bạn phải đến **Văn phòng Kiểm tra Hải quan (Customs Inspection Office)**.

Xuất trình **Hộ chiếu**, **Biểu mẫu** và **Hàng hóa đã mua** cho cán bộ để được đóng **Dấu hải quan** vào biểu mẫu của bạn.

### Bước 3: Bên trong sân bay (Sau khi nhập cảnh)

Sau khi làm thủ tục nhập cảnh và vào Phòng chờ khởi hành, hãy đến **Quầy hoàn thuế VAT (VAT Refund Counter)**.

Nộp các **mẫu đơn đã đóng dấu** để nhận tiền hoàn lại bằng **Tiền mặt** hoặc dưới dạng chuyển khoản vào **Thẻ tín dụng** của bạn.\`,\n`;

const arabic = `  arabic: \`# دليل استرداد ضريبة القيمة المضافة للمسافرين

---

## ما هو استرداد ضريبة القيمة المضافة؟

تقوم معظم الدول بجمع الضرائب بشكل أساسي من مواطنيها. وبما أن السياح الأجانب لا يستقرون في البلاد، فهم مؤهلون لاسترداد **ضريبة القيمة المضافة (VAT)** المدفوعة على السلع المشتراة.

***ملاحظة مهمة***: *لا يمكنك المطالبة باسترداد ضريبة القيمة المضافة لنفقات الطعام أو رسوم الفنادق أو رسوم الخدمة. ينطبق الاسترداد فقط على "السلع المادية" التي سيتم إخراجها من البلاد.*

---

## شروط الاستحقاق

لكي تكون مؤهلاً لاسترداد ضريبة القيمة المضافة، يجب عليك استيفاء المعايير التالية:

*   **الحالة الأجنبية**: *يجب أن تكون غير مقيم. لا يمكنك أن تكون شخصاً يحمل تأشيرة إقامة أو تصريح عمل في ذلك البلد.*
*   **الحد الأدنى للشراء**: *يجب عليك استيفاء الحد الأدنى للإنفاق في متجر واحد خلال يوم واحد (على سبيل المثال، 2,000 باهت في تايلاند).*
*   **المتاجر المعتمدة**: *يجب إجراء المشتريات من المتاجر التي تعرض علامة "VAT Refund for Tourists".*

---

## خطوات المطالبة باسترداد ضريبة القيمة المضافة

### الخطوة 1: في المتجر (أثناء الشراء)

عند الدفع، قدم **جواز سفرك** لطلب **نموذج استرداد ضريبة القيمة المضافة**.

سيزودك المتجر بـ **نموذج طلب استرداد ضريبة القيمة المضافة** مع **الفاتورة الضريبية**.

### الخطوة 2: في المطار (قبل تسجيل الوصول)

قبل تسجيل أمتعتك، يجب عليك زيارة **مكتب تفتيش الجمارك (Customs Inspection Office)**.

أظهر **جواز سفرك** و**النماذج** و**البضائع المشتراة** للموظف للحصول على **ختم الجمارك** على نماذجك.

### الخطوة 3: داخل المطار (بعد الجوازات)

بعد المرور عبر قسم الجوازات ودخول صالة المغادرة، توجه إلى **كاونتر استرداد ضريبة القيمة المضافة (VAT Refund Counter)**.

قم بتسليم **النماذج المختومة** لاستلام مبلغ الاسترداد **نقداً** أو كائتمان في **بطاقتك الائتمانية**.\`,\n`;

const bengali = `  bengali: \`# ভ্রমণকারীদের জন্য ভ্যাট (VAT) রিফান্ড গাইড

---

## ভ্যাট (VAT) রিফান্ড কী?

অধিকাংশ দেশ মূলত তাদের নাগরিকদের কাছ থেকে কর সংগ্রহ করে। যেহেতু বিদেশী পর্যটকরা দেশে স্থায়ীভাবে বসবাস করেন না, তাই তারা কেনা পণ্যের ওপর পরিশোধিত **মূল্য সংযোজন কর (VAT)** রিফান্ড পাওয়ার যোগ্য।

***গুরুত্বপূর্ণ নোট***: *আপনি খাবার খরচ, হোটেল ফি বা সার্ভিস চার্জের জন্য ভ্যাট রিফান্ড দাবি করতে পারবেন না। রিফান্ড কেবল সেই "ভৌত পণ্যগুলোর" জন্য প্রযোজ্য যা দেশের বাইরে নিয়ে যাওয়া হবে।*

---

## যোগ্যতার প্রয়োজনীয়তা

ভ্যাট রিফান্ডের যোগ্য হতে আপনাকে নিম্নলিখিত শর্তগুলো পূরণ করতে হবে:

*   **বিদেশী স্ট্যাটাস**: *আপনাকে একজন অনাবাসী (Non-resident) হতে হবে। আপনি সেই দেশে রেসিডেন্ট ভিসা বা ওয়ার্ক পারমিটধারী হতে পারবেন না।*
*   **ন্যূনতম কেনাকাটা**: *আপনাকে একদিনে একটি নির্দিষ্ট দোকানে ন্যূনতম কেনাকাটার পরিমাণ (যেমন থাইল্যান্ডে ২,০০০ বাত) পূরণ করতে হবে।*
*   **অনুমোদিত দোকান**: *কেনাকাটা অবশ্যই সেইসব দোকান থেকে করতে হবে যেখানে "VAT Refund for Tourists" সাইনটি প্রদর্শিত আছে।*

---

## আপনার ভ্যাট রিফান্ড দাবি করার ধাপসমূহ

### ধাপ ১: দোকানে (কেনাকাটার সময়)

পেমেন্ট করার সময়, **ভ্যাট রিফান্ড ফর্ম** অনুরোধ করতে আপনার **পাসপোর্ট** দেখান।

দোকান আপনাকে **ট্যাক্স ইনভয়েস** সহ একটি **ভ্যাট রিফান্ড আবেদন ফর্ম** প্রদান করবে।

### ধাপ ২: বিমানবন্দরে (চেক-ইন করার আগে)

আপনার লাগেজ চেক-ইন করার আগে, আপনাকে **কাস্টমস ইন্সপেকশন অফিসে (Customs Inspection Office)** যেতে হবে।

আপনার ফর্মে **কাস্টমস স্ট্যাম্প** পেতে কর্মকর্তাকে আপনার **পাসপোর্ট**, **ফর্ম** এবং **কেনা পণ্যগুলো** দেখান।

### ধাপ ৩: বিমানবন্দরের ভেতরে (ইমিগ্রেশনের পরে)

ইমিগ্রেশন পার হয়ে ডিপারচার লাউঞ্জে প্রবেশ করার পর, **ভ্যাট রিفান্ড কাউন্টারে (VAT Refund Counter)** যান।

আপনার রিফান্ড **নগদ** বা আপনার **ক্রেডিট কার্ডে** পেতে আপনার **স্ট্যাম্পযুক্ত ফর্মগুলো** জমা দিন।\`,\n`;

const dutch = `  dutch: \`# Btw-teruggavegids voor reizigers

---

## Wat is een btw-teruggave?

De meeste landen innen voornamelijk belastingen van hun eigen burgers. Aangezien buitenlandse toeristen zich niet in het land vestigen, komen zij in aanmerking voor een teruggave van de **belasting over de toegevoegde waarde (btw)** die is betaald over gekochte goederen.

***Belangrijke opmerking***: *U kunt geen btw-teruggave claimen voor dinerkosten, hotelkosten of servicekosten. Teruggaven zijn alleen van toepassing op "fysieke goederen" die het land worden uitgevoerd.*

---

## Toelatingsvoorwaarden

Om in aanmerking te komen voor een btw-teruggave, moet u aan de volgende criteria voldoen:

*   **Buitenlandse status**: *U moet een niet-ingezetene zijn. U mag geen persoon zijn met een verblijfsvisum of een werkvergunning in dat land.*
*   **Minimale aankoop**: *U moet voldoen aan de minimale bestedingsvereiste bij een enkele winkel binnen één dag (bijv. 2.000 Baht in Thailand).*
*   **Geautoriseerde winkels**: *Aankopen moeten worden gedaan bij winkels die het bord "VAT Refund for Tourists" tonen.*

---

## Stappen om uw btw-teruggave te claimen

### Stap 1: In de winkel (tijdens de aankoop)

Toon bij het betalen uw **paspoort** om een **btw-teruggaveformulier** aan te vragen.

De winkel verstrekt u een **aanvraagformulier voor btw-teruggave** samen met de **belastingfactuur**.

### Stap 2: Op de luchthaven (vóór het inchecken)

Voordat u uw bagage incheckt, moet u naar het **douane-inspectiekantoor (Customs Inspection Office)** gaan.

Toon uw **paspoort**, **formulieren** en **gekochte goederen** aan de ambtenaar om een **douanestempel** op uw formulieren te krijgen.

### Stap 3: Binnen de luchthaven (na de immigratie)

Nadat u de immigratie bent gepasseerd en de vertrekhal bent binnengegaan, gaat u naar de **btw-teruggavebalie (VAT Refund Counter)**.

Lever uw **gestempelde formulieren** in om uw teruggave in **contanten** of als tegoed op uw **creditcard** te ontvangen.\`,\n`;

const filipino = `  filipino: \`# VAT Refund Guide for Travelers

---

## Ano ang VAT Refund?

Karamihan sa mga bansa ay nangongolekta ng buwis pangunahin mula sa kanilang mga mamamayan. Dahil ang mga dayuhang turista ay hindi naninirahan sa bansa, sila ay karapat-dapat para sa refund sa **Value Added Tax (VAT)** na binayaran sa mga biniling produkto.

***Mahalagang Paalala***: *Hindi ka maaaring mag-claim ng VAT refund para sa mga gastos sa pagkain, bayad sa hotel, o service charges. Ang mga refund ay nalalapat lamang sa "Physical Goods" na ilalabas ng bansa.*

---

## Mga Kinakailangan sa Pagiging Karapat-dapat

Upang maging kwalipikado para sa isang VAT refund, dapat mong matugunan ang mga sumusunod na kriteria:

*   **Dayuhang Katayuan**: *Dapat kang isang non-resident. Hindi ka maaaring maging isang tao na may resident visa o work permit sa bansang iyon.*
*   **Minimum na Pagbili**: *Dapat mong matugunan ang minimum spend requirement sa isang tindahan sa loob ng isang araw (halimbawa, 2,000 Baht sa Thailand).*
*   **Mga Awtorisadong Tindahan**: *Ang mga pagbili ay dapat gawin mula sa mga tindahan na nagpapakita ng "VAT Refund for Tourists" sign.*

---

## Mga Hakbang sa Pag-claim ng Iyong VAT Refund

### Hakbang 1: Sa Tindahan (Habang Namimili)

Kapag nagbabayad, ipakita ang iyong **Passport** upang humiling ng **VAT Refund Form**.

Bibigyan ka ng tindahan ng **VAT Refund Application Form** kasama ang **Tax Invoice**.

### Hakbang 2: Sa Paliparan (Bago ang Check-in)

Bago i-check-in ang iyong bagahe, dapat mong bisitahin ang **Customs Inspection Office**.

Ipakita ang iyong **Passport**, **Forms**, at **Biniling Produkto** sa opisyal upang makakuha ng **Customs Stamp** sa iyong mga form.

### Hakbang 3: Sa Loob ng Paliparan (Pagkatapos ng Immigration)

Pagkatapos dumaan sa Immigration at pumasok sa Departure Lounge, pumunta sa **VAT Refund Counter**.

Isumite ang iyong mga **stamped forms** upang matanggap ang iyong refund sa **Cash** o bilang credit sa iyong **Credit Card**.\`,\n`;

const reconstructed = content.slice(0, insertionPoint) + farsi + polish + vietnamese + arabic + bengali + dutch + filipino + content.slice(romanianIndex);

fs.writeFileSync(filePath, reconstructed);
console.log('Reconstruction successful');
