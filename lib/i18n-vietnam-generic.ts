import type { SupportedLanguage } from '../types/country';

const EN = {
  aboutGeneric: {
    stat3: "Destinations",
    ctaButton: "Start Exploring"
  },
  flightsGeneric: {
    title: "Flights to Vietnam",
    intro: "Book your flight to Vietnam with ease. Most international flights arrive at Noi Bai Airport (HAN) in Hanoi or Tan Son Nhat Airport (SGN) in Ho Chi Minh City. Book early for the best prices and check visa requirements before you travel.",
    faq: {
      title: "Frequently Asked Questions",
      q1: { question: "How long is a flight to Vietnam?", answer: "Flight time depends on where you start. From nearby Asian cities it is usually a few hours. From Europe or North America you will usually have at least one stopover. Check the search results for exact times." },
      q2: { question: "Which airlines fly to Vietnam?", answer: "Many international airlines fly to Vietnam, and Vietnamese airlines also serve many routes. Budget airlines connect Vietnam with other Asian cities. Compare options in the search box on this page." },
      q3: { question: "Do I need a visa before I fly?", answer: "It depends on your passport. Some travelers can enter without a visa, and others need an e-visa before they travel. Check our Vietnam visa guide and confirm the latest rules on the official Vietnam e-visa website." },
      q4: { question: "Which airport should I fly into?", answer: "Hanoi (HAN) is the main gateway for the north, and Ho Chi Minh City (SGN) is the main gateway for the south. Choose the one closest to where your trip starts. Da Nang and Phu Quoc also have some international flights." },
      q5: { question: "What is the best time to book flights?", answer: "Book early for busy holiday periods. Prices change often, so compare different dates. Flying on weekdays can sometimes cost less." }
    }
  },
  hotelsGeneric: {
    title: "Hotels in Vietnam",
    intro: "Find a place to stay in Vietnam, from budget rooms to beach resorts. Popular areas include the Old Quarter in Hanoi and District 1 in Ho Chi Minh City. Compare prices, and book early for busy holiday periods."
  },
  ticketsGeneric: {
    title: "Tickets & Activities in Vietnam",
    intro: "Book tickets and activities in Vietnam with instant confirmation through Klook. From city tours to day trips, skip the lines and secure your place in advance. Booking ahead helps you plan with confidence.",
    faq: {
      title: "Frequently Asked Questions",
      q1: { question: "Do I need to book tickets in advance?", answer: "For popular attractions and day trips, booking ahead is a good idea, especially in busy holiday periods. This secures your place and can save time at the entrance." },
      q2: { question: "Are e-tickets accepted at attractions?", answer: "Yes, most Klook partners accept mobile e-tickets. Show your QR code at the entrance. Some places may ask for a printed ticket. Check your booking confirmation for instructions." },
      q3: { question: "What if I need to cancel my booking?", answer: "Cancellation rules are different for each activity. Some tickets can be cancelled for free until a set time. Always read the cancellation rules before you book." },
      q4: { question: "Are there combo tickets for more than one attraction?", answer: "For some places, yes. Look for options named 'combo' or 'pass' when you browse. These can offer better value than buying separate tickets." },
      q5: { question: "Is it cheaper to book online or on-site?", answer: "Booking online is often cheaper, and it helps you avoid queues and keep your place. Some attractions also offer online-only deals. Compare the price on the booking page." }
    }
  },
  activitiesGeneric: {
    intro: "Discover tours and experiences in Vietnam with GetYourGuide. Book day trips, city tours and local experiences led by expert guides, and find the right activity for your trip.",
    faq: {
      q1: { question: "What types of activities are available?", answer: "GetYourGuide offers cultural tours, cooking classes, day trips, historical site visits, food tours and more. Options depend on the city and the season." },
      q5: { question: "Should I book activities in advance?", answer: "For popular experiences and small-group tours, booking ahead is a good idea. This helps ensure availability. Last-minute bookings may have fewer choices." }
    }
  }
};

export type VietnamGenericUI = typeof EN;

export const VIETNAM_GENERIC_UI: Record<SupportedLanguage, VietnamGenericUI> = {
  EN,
  TH: {
    aboutGeneric: {
      stat3: "จุดหมายปลายทาง",
      ctaButton: "เริ่มสำรวจเลย"
    },
    flightsGeneric: {
      title: "เที่ยวบินไปเวียดนาม",
      intro: "จองเที่ยวบินไปเวียดนามได้ง่ายๆ โดยเที่ยวบินระหว่างประเทศส่วนใหญ่จะลงจอดที่สนามบินนานาชาติโหน่ยบ่าย (HAN) ในฮานอย หรือสนามบินนานาชาติเติ้นเซินเญิ้ต (SGN) ในนครโฮจิมินห์ แนะนำให้จองล่วงหน้าเพื่อราคาที่ดีที่สุด และอย่าลืมตรวจสอบเงื่อนไขวีซ่าก่อนออกเดินทาง",
      faq: {
        title: "คำถามที่พบบ่อย",
        q1: {
          question: "บินไปเวียดนามใช้เวลานานเท่าไร?",
          answer: "ระยะเวลาการเดินทางขึ้นอยู่กับจุดเริ่มต้นของคุณ หากเดินทางจากเมืองใกล้เคียงในเอเชียจะใช้เวลาเพียงไม่กี่ชั่วโมง แต่หากเดินทางจากยุโรปหรืออเมริกาเหนือ มักจะต้องแวะพักอย่างน้อยหนึ่งจุด สามารถตรวจสอบเวลาที่แน่นอนได้จากผลการค้นหา"
        },
        q2: {
          question: "มีสายการบินใดบ้างที่บินไปเวียดนาม?",
          answer: "มีสายการบินระหว่างประเทศและสายการบินของเวียดนามให้บริการหลากหลายเส้นทาง นอกจากนี้ยังมีสายการบินราคาประหยัดเชื่อมต่อเวียดนามกับเมืองต่างๆ ในเอเชีย คุณสามารถเปรียบเทียบตัวเลือกได้ที่ช่องค้นหาในหน้านี้"
        },
        q3: {
          question: "ต้องทำวีซ่าก่อนเดินทางหรือไม่?",
          answer: "ขึ้นอยู่กับสัญชาติและหนังสือเดินทางของคุณ นักท่องเที่ยวบางสัญชาติได้รับยกเว้นวีซ่า ในขณะที่บางสัญชาติจำเป็นต้องขอ e-Visa ก่อนเดินทาง สามารถศึกษารายละเอียดได้จากคู่มือวีซ่าเวียดนามของเรา และตรวจสอบข้อมูลล่าสุดได้ที่เว็บไซต์ e-Visa อย่างเป็นทางการของเวียดนาม"
        },
        q4: {
          question: "ควรเลือกบินไปลงที่สนามบินใด?",
          answer: "ฮานอย (HAN) เป็นประตูสู่ภาคเหนือ และนครโฮจิมินห์ (SGN) เป็นประตูสู่ภาคใต้ แนะนำให้เลือกสนามบินที่ใกล้กับจุดเริ่มต้นของแผนการเดินทางของคุณ นอกจากนี้ ดานัง และ เกาะฟูก๊วก ก็มีเที่ยวบินระหว่างประเทศให้บริการด้วยเช่นกัน"
        },
        q5: {
          question: "ควรจองเที่ยวบินช่วงไหนดีที่สุด?",
          answer: "หากเดินทางในช่วงเทศกาลหรือช่วงที่มีผู้เดินทางสูง ควรจองล่วงหน้า เนื่องจากราคาตั๋วมีการเปลี่ยนแปลงบ่อย การเปรียบเทียบราคาในวันต่างๆ หรือเลือกเดินทางในวันธรรมดาอาจช่วยให้ได้ราคาที่คุ้มค่ากว่า"
        }
      }
    },
    hotelsGeneric: {
      title: "โรงแรมในเวียดนาม",
      intro: "ค้นหาที่พักในเวียดนามที่เหมาะกับคุณ มีให้เลือกตั้งแต่ห้องพักราคายกย่องไปจนถึงรีสอร์ทริมหาดสุดหรู ย่านยอดนิยม ได้แก่ ย่านเมืองเก่า (Old Quarter) ในฮานอย และ เขต 1 (District 1) ในนครโฮจิมินห์ แนะนำให้เปรียบเทียบราคาและจองล่วงหน้าสำหรับช่วงท่องเที่ยวฮิต"
    },
    ticketsGeneric: {
      title: "บัตรท่องเที่ยวและกิจกรรมในเวียดนาม",
      intro: "จองบัตรเข้าชมและกิจกรรมในเวียดนามพร้อมรับการยืนยันทันทีผ่าน Klook มีให้เลือกหลากหลายตั้งแต่ทัวร์ชมเมืองไปจนถึงเดย์ทริป ช่วยให้คุณไม่ต้องเสียเวลาต่อคิวและการันตีที่นั่งล่วงหน้า วางแผนเที่ยวได้อย่างมั่นใจ",
      faq: {
        title: "คำถามที่พบบ่อย",
        q1: {
          question: "จำเป็นต้องจองบัตรล่วงหน้าหรือไม่?",
          answer: "สำหรับสถานที่ท่องเที่ยวยอดนิยมและเดย์ทริป แนะนำให้จองล่วงหน้า โดยเฉพาะในช่วงวันหยุดยาวหรือช่วงไฮซีซั่น เพื่อการันตีสิทธิ์ในการเข้าชมและช่วยประหยัดเวลาในการรอคิวหน้างาน"
        },
        q2: {
          question: "สถานที่ท่องเที่ยวรับบัตรอิเล็กทรอนิกส์ (E-Ticket) หรือไม่?",
          answer: "รับแน่นอน พาร์ทเนอร์ส่วนใหญ่ของ Klook รองรับ E-Ticket บนมือถือ เพียงแสดง QR Code ที่ทางเข้า ทั้งนี้ บางสถานที่อาจต้องการบัตรแบบพิมพ์ สามารถตรวจสอบรายละเอียดได้ในเอกสารยืนยันการจอง"
        },
        q3: {
          question: "หากต้องการยกเลิกการจอง ต้องทำอย่างไร?",
          answer: "นโยบายการยกเลิกขึ้นอยู่กับแต่ละกิจกรรม บัตรบางประเภทสามารถยกเลิกได้ฟรีภายในระยะเวลาที่กำหนด ควรตรวจสอบเงื่อนไขการยกเลิกก่อนทำการจองทุกครั้ง"
        },
        q4: {
          question: "มีบัตรแบบแพ็กเกจรวม (Combo) สำหรับหลายสถานที่หรือไม่?",
          answer: "ในบางสถานที่ท่องเที่ยวจะมีตัวเลือกแบบ 'Combo' หรือ 'Pass' ให้เลือก ซึ่งมักจะคุ้มค่ากว่าการซื้อบัตรแยกทีละใบ"
        },
        q5: {
          question: "จองออนไลน์หรือซื้อหน้างาน ถูกกว่ากัน?",
          answer: "การจองออนไลน์มักจะถูกกว่า ช่วยหลีกเลี่ยงการต่อคิว และการันตีที่นั่งของคุณได้ นอกจากนี้บางสถานที่ยังมีโปรโมชั่นพิเศษเฉพาะออนไลน์อีกด้วย คุณสามารถเปรียบเทียบราคาได้ที่หน้าการจอง"
        }
      }
    },
    activitiesGeneric: {
      intro: "ค้นพบทัวร์และกิจกรรมน่าสนใจในเวียดนามกับ GetYourGuide เลือกจองเดย์ทริป ทัวร์ชมเมือง และประสบการณ์ท้องถิ่นโดยไกด์ผู้เชี่ยวชาญ เพื่อเติมเต็มทริปของคุณให้สมบูรณ์แบบ",
      faq: {
        q1: {
          question: "มีกิจกรรมประเภทใดให้เลือกบ้าง?",
          answer: "GetYourGuide มีกิจกรรมหลากหลาย ทั้งทัวร์วัฒนธรรม คลาสเรียนทำอาหาร เดย์ทริป ทัวร์ชมสถานที่ทางประวัติศาสตร์ ทัวร์ชิมอาหาร และอื่นๆ โดยตัวเลือกจะแตกต่างกันไปตามเมืองและฤดูกาล"
        },
        q5: {
          question: "ควรจองกิจกรรมล่วงหน้าหรือไม่?",
          answer: "สำหรับกิจกรรมยอดนิยมและทัวร์กลุ่มเล็ก ขอแนะนำให้จองล่วงหน้าเพื่อการันตีที่นั่ง เนื่องจากหากจองในกระชั้นชิด ตัวเลือกอาจมีจำกัด"
        }
      }
    }
  },
  MM: {
    aboutGeneric: {
      stat3: "ခရီးစဉ်ဒေသများ",
      ctaButton: "စတင်လေ့လာပါ"
    },
    flightsGeneric: {
      title: "ဗီယက်နမ်သို့ လေယာဉ်ခရီးစဉ်များ",
      intro: "ဗီယက်နမ်သို့ သွားရောက်မည့် လေယာဉ်လက်မှတ်များကို လွယ်ကူစွာ ကြိုတင်ဝယ်ယူလိုက်ပါ။ နိုင်ငံတကာ လေယာဉ်အများစုသည် ဟနွိုင်းရှိ နွိုင်ဘိုင် အပြည်ပြည်ဆိုင်ရာလေဆိပ် (HAN) သို့မဟုတ် ဟိုချီမင်းမြို့ရှိ တန်ဆွန်းညက် အပြည်ပြည်ဆိုင်ရာလေဆိပ် (SGN) သို့ ဆိုက်ရောက်ပါသည်။ အသက်သာဆုံး စျေးနှုန်းများရရှိရန် စောစီးစွာ ကြိုတင်ဝယ်ယူပါ၊ ခရီးမထွက်ခွာမီ ဗီဇာလိုအပ်ချက်များကိုလည်း စစ်ဆေးပါ။",
      faq: {
        title: "မကြာခဏမေးလေ့ရှိသော မေးခွန်းများ",
        q1: {
          question: "ဗီယက်နမ်သို့ လေယာဉ်ဖြင့် သွားရောက်ပါက မည်မျှကြာသနည်း။",
          answer: "ပျံသန်းချိန်သည် သင်စတင်ထွက်ခွာသည့် နေရာပေါ်မူတည်ပါသည်။ အိမ်နီးချင်း အာရှမြို့ကြီးများမှဆိုလျှင် နာရီအနည်းငယ်သာ ကြာမြင့်မည်ဖြစ်သည်။ ဥရောပ သို့မဟုတ် မြောက်အမေရိကမှ လာပါက အနည်းဆုံး တစ်ကြိမ် ရပ်နားရမည်ဖြစ်ပါသည်။ အတိအကျ ကြာမြင့်ချိန်များကို သိရှိနိုင်ရန် ရှာဖွေမှုရလဒ်များကို စစ်ဆေးပါ။"
        },
        q2: {
          question: "မည်သည့် လေကြောင်းလိုင်းများက ဗီယက်နမ်သို့ ပျံသန်းပြေးဆွဲပေးသနည်း။",
          answer: "နိုင်ငံတကာ လေကြောင်းလိုင်းများစွာအပြင် ဗီယက်နမ် လေကြောင်းလိုင်းများကပါ လမ်းကြောင်းများစွာကို ပြေးဆွဲပေးလျက်ရှိပါသည်။ တန်ဖိုးနည်း လေကြောင်းလိုင်းများသည်လည်း ဗီယက်နမ်ကို အခြားအာရှမြို့များနှင့် ဆက်သွယ်ပေးထားပါသည်။ ဤစာမျက်နှာရှိ ရှာဖွေရေးအကွက်တွင် ရွေးချယ်စရာများကို နှိုင်းယှဉ်ကြည့်နိုင်ပါသည်။"
        },
        q3: {
          question: "ခရီးမထွက်ခွာမီ ဗီဇာ လိုအပ်ပါသလား။",
          answer: "၎င်းသည် သင်ကိုင်ဆောင်ထားသော နိုင်ငံကူးလက်မှတ်ပေါ် မူတည်ပါသည်။ ခရီးသွားအချို့သည် ဗီဇာမလိုဘဲ ဝင်ရောက်နိုင်ပြီး အချို့မှာမူ မထွက်ခွာမီ အီး-ဗီဇာ (e-Visa) လိုအပ်ပါသည်။ ကျွန်ုပ်တို့၏ ဗီယက်နမ်ဗီဇာ လမ်းညွှန်တွင် လေ့လာနိုင်ပြီး တရားဝင် ဗီယက်နမ် e-Visa ဝဘ်ဆိုက်တွင် နောက်ဆုံးရ စည်းမျဉ်းများကို အတည်ပြုပါ။"
        },
        q4: {
          question: "မည်သည့် လေဆိပ်သို့ ဆိုက်ရောက်မည့် လေယာဉ်ကို ရွေးချယ်သင့်သနည်း။",
          answer: "ဟနွိုင်း (HAN) သည် မြောက်ပိုင်းအတွက် အဓိကဝင်ပေါက်ဖြစ်ပြီး ဟိုချီမင်းမြို့ (SGN) သည် တောင်ပိုင်းအတွက် အဓိကဝင်ပေါက်ဖြစ်ပါသည်။ သင့်ခရီးစဉ် စတင်မည့်နေရာနှင့် အနီးဆုံးလေဆိပ်ကို ရွေးချယ်ပါ။ ဒါနန်း (Da Nang) နှင့် ဖူးကွတ် (Phu Quoc) တို့သို့လည်း နိုင်ငံတကာ လေယာဉ်ခရီးစဉ်အချို့ ရှိပါသည်။"
        },
        q5: {
          question: "လေယာဉ်လက်မှတ်များကို ကြိုတင်ဝယ်ယူရန် အကောင်းဆုံးအချိန်မှာ မည်သည့်အချိန်နည်း။",
          answer: "ခရီးသွားများပြားသည့် ရုံးပိတ်ရက် ပွဲတော်ရာသီများအတွက် စောစီးစွာ ကြိုတင်ဝယ်ယူထားပါ။ စျေးနှုန်းများ ခဏခဏ ပြောင်းလဲနိုင်သောကြောင့် မတူညီသော ရက်စွဲများကို နှိုင်းယှဉ်ကြည့်ပါ။ ရုံးဖွင့်ရက်များတွင် ပျံသန်းခြင်းက တစ်ခါတစ်ရံ စျေးနှုန်းပိုမို သက်သာစေနိုင်ပါသည်။"
        }
      }
    },
    hotelsGeneric: {
      title: "ဗီယက်နမ်ရှိ ဟိုတယ်များ",
      intro: "စျေးနှုန်းသက်သာသော အခန်းများမှသည် ကမ်းခြေအပန်းဖြေ စခန်းများအထိ ဗီယက်နမ်တွင် တည်းခိုရန်နေရာများကို ရှာဖွေလိုက်ပါ။ ဟနွိုင်းရှိ မြို့ဟောင်းဧရိယာ (Old Quarter) နှင့် ဟိုချီမင်းမြို့ရှိ ခရိုင် ၁ (District 1) တို့မှာ လူကြိုက်များသော နေရာများဖြစ်ကြသည်။ စျေးနှုန်းများကို နှိုင်းယှဉ်ပြီး လူစည်ကားသည့် ရာသီများအတွက် စောစီးစွာ ကြိုတင်မှာယူလိုက်ပါ။"
    },
    ticketsGeneric: {
      title: "ဗီယက်နမ်ရှိ ဝင်ကြေးလက်မှတ်များနှင့် လှုပ်ရှားမှုများ",
      intro: "Klook မှတစ်ဆင့် ဗီယက်နမ်ရှိ လက်မှတ်များနှင့် လှုပ်ရှားမှုများကို ချက်ချင်းအတည်ပြုချက်ဖြင့် ကြိုတင်မှာယူလိုက်ပါ။ မြို့တွင်း လှည့်လည်ကြည့်ရှုခြင်းမှသည် တစ်ရက်တာ ခရီးစဉ်များအထိ တန်းစီစောင့်ဆိုင်းစရာမလိုဘဲ သင့်နေရာကို ကြိုတင်ရယူပါ။ ကြိုတင်မှာယူခြင်းဖြင့် သင့်ခရီးစဉ်ကို ယုံကြည်စိတ်ချစွာ စီစဉ်နိုင်မည်ဖြစ်သည်။",
      faq: {
        title: "မကြာခဏမေးလေ့ရှိသော မေးခွန်းများ",
        q1: {
          question: "လက်မှတ်များကို ကြိုတင်မှာယူထားရန် လိုအပ်ပါသလား။",
          answer: "လူကြိုက်များသော လည်ပတ်စရာနေရာများနှင့် တစ်ရက်တာ ခရီးစဉ်များအတွက် အထူးသဖြင့် ခရီးသွားများပြားသည့် ရာသီများတွင် ကြိုတင်မှာယူထားခြင်းက အကောင်းဆုံးဖြစ်ပါသည်။ ၎င်းသည် သင့်အတွက် နေရာသေချာစေရုံမျှမက ဝင်ပေါက်တွင် တန်းစီရသည့် အချိန်ကိုပါ သက်သာစေပါသည်။"
        },
        q2: {
          question: "လည်ပတ်စရာနေရာများတွင် အီး-လက်မှတ် (e-tickets) များကို လက်ခံပါသလား။",
          answer: "လက်ခံပါသည်။ Klook မိတ်ဖက်အများစုသည် ဖုန်းမှတစ်ဆင့် အီး-လက်မှတ်ပြသခြင်းကို လက်ခံပါသည်။ ဝင်ပေါက်တွင် သင့် QR ကုဒ်ကို ပြသပါ။ အချို့နေရာများတွင် ပုံနှိပ်ထားသော လက်မှတ်ကို တောင်းဆိုနိုင်သဖြင့် အသေးစိတ်အတွက် သင့်ဘိုကင်အတည်ပြုချက်ပါ ညွှန်ကြားချက်များကို စစ်ဆေးပါ။"
        },
        q3: {
          question: "ကြိုတင်မှာယူမှုကို ပယ်ဖျက်ရန် လိုအပ်ပါက မည်သို့လုပ်ဆောင်ရမည်နည်း။",
          answer: "ပယ်ဖျက်ခြင်းဆိုင်ရာ စည်းမျဉ်းများသည် လှုပ်ရှားမှုတစ်ခုစီအတွက် ကွဲပြားမှုရှိပါသည်။ အချို့လက်မှတ်များကို သတ်မှတ်ချိန်အထိ အခမဲ့ ပယ်ဖျက်နိုင်ပါသည်။ မမှာယူမီ ပယ်ဖျက်ခြင်း စည်းမျဉ်းများကို အမြဲမပြတ် ဖတ်ရှုပါ။"
        },
        q4: {
          question: "နေရာတစ်ခုထက်ပိုသော 'Combo' လက်မှတ်များ ရှိပါသလား။",
          answer: "အချို့နေရာများအတွက် ရှိပါသည်။ သင် ကြည့်ရှုစဉ် 'Combo' သို့မဟုတ် 'Pass' ဟု အမည်ပေးထားသော ရွေးချယ်မှုများကို ရှာဖွေပါ။ ဤလက်မှတ်များသည် သီးခြားစီ ဝယ်ယူခြင်းထက် ပိုမိုတန်ဖိုးရှိပြီး သက်သာစေနိုင်ပါသည်။"
        },
        q5: {
          question: "အွန်လိုင်းမှ ဝယ်ယူခြင်းနှင့် လူကိုယ်တိုင် သွားရောက်ဝယ်ယူခြင်း မည်သည်က ပိုမိုစျေးသက်သာသနည်း။",
          answer: "အွန်လိုင်းမှ ကြိုတင်မှာယူခြင်းသည် ပိုမိုစျေးသက်သာလေ့ရှိပြီး တန်းစီစောင့်ဆိုင်းရမှုကို ရှောင်ရှားနိုင်ကာ သင့်နေရာကိုလည်း သေချာစေပါသည်။ အချို့နေရာများသည် အွန်လိုင်းသီးသန့် လျှော့စျေးများကိုလည်း ပေးအပ်လေ့ရှိပါသည်။ ကြိုတင်မှာယူသည့် စာမျက်နှာတွင် စျေးနှုန်းများကို နှိုင်းယှဉ်ကြည့်ပါ။"
        }
      }
    },
    activitiesGeneric: {
      intro: "GetYourGuide ဖြင့် ဗီယက်နမ်ရှိ ခရီးစဉ်များနှင့် အတွေ့အကြုံသစ်များကို ရှာဖွေလိုက်ပါ။ တစ်ရက်တာ ခရီးစဉ်များ၊ မြို့တွင်း လည့်လည်ကြည့်ရှုခြင်းများနှင့် ကျွမ်းကျင်လမ်းညွှန်များ ပါဝင်သော ဒေသတွင်း အတွေ့အကြုံများကို ကြိုတင်မှာယူပြီး သင့်ခရီးစဉ်အတွက် အသင့်တော်ဆုံး လှုပ်ရှားမှုကို ရှာဖွေပါ။",
      faq: {
        q1: {
          question: "မည်သည့် လှုပ်ရှားမှု အမျိုးအစားများကို ရရှိနိုင်သနည်း။",
          answer: "GetYourGuide သည် ယဉ်ကျေးမှုဆိုင်ရာ ခရီးစဉ်များ၊ ဟင်းချက်သင်တန်းများ၊ တစ်ရက်တာ ခရီးစဉ်များ၊ သမိုင်းဝင်နေရာများသို့ လည်ပတ်ခြင်းများ၊ အစားအသောက်ဆိုင်ရာ ခရီးစဉ်များနှင့် အခြားအရာများစွာကို ပေးအပ်ထားပါသည်။ ရွေးချယ်စရာများသည် မြို့နှင့် ရာသီအလိုက် ကွဲပြားနိုင်ပါသည်။"
        },
        q5: {
          question: "လှုပ်ရှားမှုများကို ကြိုတင်မှာယူထားသင့်ပါသလား။",
          answer: "လူကြိုက်များသော အတွေ့အကြုံများနှင့် အုပ်စုငယ် ခရီးစဉ်များအတွက် ကြိုတင်မှာယူထားခြင်းသည် အကောင်းဆုံးဖြစ်ပါသည်။ ၎င်းသည် နေရာရရှိနိုင်မှုကို သေချာစေပါသည်။ နောက်ဆုံးမိနစ်မှ ကြိုတင်မှာယူပါက ရွေးချယ်စရာ နည်းပါးသွားနိုင်ပါသည်။"
        }
      }
    }
  },
  ES: {
    aboutGeneric: {
      stat3: "Destinos",
      ctaButton: "Empieza a explorar"
    },
    flightsGeneric: {
      title: "Vuelos a Vietnam",
      intro: "Reserve su vuelo a Vietnam fácilmente. La mayoría de los vuelos internacionales llegan al Aeropuerto Internacional de Noi Bai (HAN) en Hanói o al Aeropuerto Internacional Tan Son Nhat (SGN) en Ciudad Ho Chi Minh. Reserve con antelación para obtener las mejores tarifas y verifique los requisitos de visado antes de viajar.",
      faq: {
        title: "Preguntas frecuentes",
        q1: {
          question: "¿Cuánto dura un vuelo a Vietnam?",
          answer: "La duración del vuelo depende de su lugar de origen. Desde ciudades asiáticas cercanas suele ser de unas pocas horas. Desde Europa o América del Norte, normalmente tendrá al menos una escala. Consulte los resultados de búsqueda para ver los horarios exactos."
        },
        q2: {
          question: "¿Qué aerolíneas vuelan a Vietnam?",
          answer: "Muchas aerolíneas internacionales vuelan a Vietnam, y las aerolíneas locales también cubren numerosas rutas. Además, existen aerolíneas de bajo coste que conectan Vietnam con otras ciudades asiáticas. Compare las opciones disponibles en nuestro buscador."
        },
        q3: {
          question: "¿Necesito visado antes de volar?",
          answer: "Depende de la nacionalidad de su pasaporte. Algunos viajeros pueden ingresar sin visado, mientras que otros requieren un visado electrónico (e-visa) antes de viajar. Consulte nuestra guía de visados para Vietnam y confirme las normativas actualizadas en el sitio web oficial del gobierno."
        },
        q4: {
          question: "¿A qué aeropuerto debo volar?",
          answer: "Hanói (HAN) es la principal puerta de entrada al norte, y Ciudad Ho Chi Minh (SGN) es la principal entrada al sur. Elija el aeropuerto más cercano al inicio de su itinerario. Da Nang y Phu Quoc también cuentan con algunos vuelos internacionales."
        },
        q5: {
          question: "¿Cuál es el mejor momento para reservar vuelos?",
          answer: "Se recomienda reservar con antelación para las temporadas altas o periodos vacacionales. Las tarifas cambian con frecuencia, por lo que conviene comparar distintas fechas. Volar entre semana suele ser más económico."
        }
      }
    },
    hotelsGeneric: {
      title: "Hoteles en Vietnam",
      intro: "Encuentre el alojamiento ideal en Vietnam, desde opciones económicas hasta complejos turísticos frente al mar. Entre las zonas más populares se encuentran el Barrio Antiguo de Hanói y el Distrito 1 de Ciudad Ho Chi Minh. Compare precios y reserve con antelación para la temporada alta."
    },
    ticketsGeneric: {
      title: "Entradas y actividades en Vietnam",
      intro: "Reserve entradas y actividades en Vietnam con confirmación inmediata a través de Klook. Desde visitas guiadas por la ciudad hasta excursiones de un día, evite las colas y asegure su plaza con antelación para planificar su viaje con total tranquilidad.",
      faq: {
        title: "Preguntas frecuentes",
        q1: {
          question: "¿Es necesario reservar entradas con antelación?",
          answer: "Para las atracciones más populares y las excursiones de un día, es aconsejable reservar con antelación, especialmente durante la temporada alta. Esto le garantiza su plaza y le permite ahorrar tiempo en los accesos."
        },
        q2: {
          question: "¿Se aceptan entradas digitales en las atracciones?",
          answer: "Sí, la mayoría de los colaboradores de Klook aceptan entradas digitales en el móvil. Tan solo muestre su código QR en la entrada. No obstante, algunos lugares pueden requerir la entrada impresa; consulte la confirmación de su reserva para obtener las instrucciones exactas."
        },
        q3: {
          question: "¿Qué ocurre si necesito cancelar mi reserva?",
          answer: "Las políticas de cancelación varían según la actividad. Algunas entradas permiten la cancelación gratuita hasta un plazo determinado. Lea detenidamente la política de cancelación antes de completar su reserva."
        },
        q4: {
          question: "¿Existen entradas combinadas para varias atracciones?",
          answer: "Sí, para determinados lugares existen opciones denominadas «combo» o «pass». Estas alternativas suelen ofrecer una mejor relación calidad-precio en comparación con la compra de entradas individuales."
        },
        q5: {
          question: "¿Es más barato reservar en línea o en taquilla?",
          answer: "Reservar en línea suele ser más económico, además de permitirle evitar filas y asegurar su plaza. Algunas atracciones ofrecen incluso promociones exclusivas en línea. Compare las tarifas en la página de reserva."
        }
      }
    },
    activitiesGeneric: {
      intro: "Descubra tours y experiencias únicas en Vietnam con GetYourGuide. Reserve excursiones de un día, visitas guiadas por la ciudad y experiencias locales con guías expertos para encontrar la actividad perfecta para su viaje.",
      faq: {
        q1: {
          question: "¿Qué tipo de actividades hay disponibles?",
          answer: "GetYourGuide ofrece recorridos culturales, clases de cocina, excursiones de un día, visitas a lugares históricos, tours gastronómicos y mucho más. La oferta depende de la ciudad y de la temporada."
        },
        q5: {
          question: "¿Debo reservar las actividades con antelación?",
          answer: "Para garantizar plazas en las experiencias más demandadas o en los tours para grupos reducidos, es muy recomendable reservar con antelación. Las reservas de última hora suelen contar con una disponibilidad más limitada."
        }
      }
    }
  },
  FR: {
    aboutGeneric: {
      stat3: "Destinations",
      ctaButton: "Commencer à explorer"
    },
    flightsGeneric: {
      title: "Vols vers le Vietnam",
      intro: "Réservez votre vol pour le Vietnam en toute simplicité. La plupart des vols internationaux arrivent à l'aéroport international de Noi Bai (HAN) à Hanoï ou à l'aéroport international de Tan Son Nhat (SGN) à Hô Chi Minh-Ville. Réservez à l'avance pour obtenir les meilleurs tarifs et vérifiez les formalités de visa avant votre départ.",
      faq: {
        title: "Foire aux questions",
        q1: {
          question: "Combien de temps dure un vol vers le Vietnam ?",
          answer: "La durée du vol dépend de votre point de départ. Depuis les pays asiatiques voisins, le trajet ne prend que quelques heures. Depuis l'Europe ou l'Amérique du Nord, vous aurez généralement au moins une escale. Consultez les résultats de recherche pour connaître les horaires exacts."
        },
        q2: {
          question: "Quelles compagnies aériennes desservent le Vietnam ?",
          answer: "De nombreuses compagnies aériennes internationales desservent le Vietnam, et les compagnies nationales vietnamiennes proposent également un vaste réseau. Des compagnies à bas prix (low-cost) relient également le Vietnam à d'autres villes asiatiques. Comparez les options directement dans le moteur de recherche."
        },
        q3: {
          question: "Faut-il un visa avant d'embarquer ?",
          answer: "Cela dépend de votre nationalité et de votre passeport. Certains voyageurs bénéficient d'une exemption de visa, tandis que d'autres doivent obtenir un e-visa avant leur départ. Consultez notre guide des visas pour le Vietnam et vérifiez les dernières réglementations sur le site officiel de l'e-visa."
        },
        q4: {
          question: "Dans quel aéroport convient-il d'atterrir ?",
          answer: "Hanoï (HAN) est la principale porte d'entrée pour le nord du pays, tandis que Hô Chi Minh-Ville (SGN) dessert le sud. Choisissez l'aéroport le plus proche du début de votre itinéraire. Da Nang et Phu Quoc accueillent également des vols internationaux."
        },
        q5: {
          question: "Quel est le meilleur moment pour réserver des billets d'avion ?",
          answer: "Il est recommandé de réserver à l'avance pour voyager pendant la haute saison ou les vacances scolaires. Les prix fluctuant régulièrement, n'hésitez pas à comparer différentes dates. Voler en semaine est parfois plus économique."
        }
      }
    },
    hotelsGeneric: {
      title: "Hôtels au Vietnam",
      intro: "Trouvez un hébergement au Vietnam, des options économiques aux complexes hôteliers en bord de mer. Les quartiers les plus prisés incluent le vieux quartier de Hanoï et le district 1 de Hô Chi Minh-Ville. Comparez les prix et réservez à l'avance pour la haute saison."
    },
    ticketsGeneric: {
      title: "Billets et activités au Vietnam",
      intro: "Réservez vos billets et activités au Vietnam avec confirmation instantanée sur Klook. Des visites guidées aux excursions d'une journée, évitez les files d'attente et sécurisez votre place à l'avance pour planifier votre voyage en toute sérénité.",
      faq: {
        title: "Foire aux questions",
        q1: {
          question: "Faut-il réserver ses billets à l'avance ?",
          answer: "Pour les attractions très fréquentées et les excursions d'une journée, il est fortement conseillé de réserver à l'avance, surtout pendant la haute saison. Cela vous garantit une place et vous évite de perdre du temps à l'entrée."
        },
        q2: {
          question: "Les billets électroniques sont-ils acceptés sur place ?",
          answer: "Oui, la majorité des partenaires Klook acceptent les billets électroniques sur smartphone. Il vous suffit de présenter votre code QR à l'entrée. Certains lieux peuvent nécessiter un billet imprimé : consultez la confirmation de votre réservation pour plus de détails."
        },
        q3: {
          question: "Que se passe-t-il en cas d'annulation de ma réservation ?",
          answer: "Les conditions d'annulation varient selon l'activité. Certains billets peuvent être annulés gratuitement jusqu'à une certaine date. Prenez toujours soin de lire la politique d'annulation avant de réserver."
        },
        q4: {
          question: "Existe-t-il des billets combinés pour plusieurs attractions ?",
          answer: "Oui, pour certains sites. Recherchez les options intitulées « combo » ou « pass » lors de votre navigation. Elles offrent souvent un meilleur rapport qualité-prix que l'achat de billets séparés."
        },
        q5: {
          question: "Est-il plus avantageux de réserver en ligne ou sur place ?",
          answer: "Réserver en ligne est souvent plus avantageux : cela vous évite de faire la queue et vous assure d'avoir une place. Certaines attractions proposent également des remises exclusives sur Internet. Comparez les prix directement sur la page de réservation."
        }
      }
    },
    activitiesGeneric: {
      intro: "Découvrez des circuits et des expériences uniques au Vietnam avec GetYourGuide. Réservez des excursions d'une journée, des visites guidées et des activités locales accompagnées par des guides experts.",
      faq: {
        q1: {
          question: "Quels types d'activités sont proposés ?",
          answer: "GetYourGuide propose des visites culturelles, des cours de cuisine, des excursions d'une journée, des découvertes de sites historiques, des tours gastronomiques et bien plus encore. Les offres varient selon la ville et la saison."
        },
        q5: {
          question: "Est-il préférable de réserver les activités à l'avance ?",
          answer: "Pour les activités très demandées et les visites en petit groupe, il est vivement recommandé de réserver à l'avance pour garantir la disponibilité. Les réservations de dernière minute offrent généralement un choix plus restreint."
        }
      }
    }
  },
  DE: {
    aboutGeneric: {
      stat3: "Reiseziele",
      ctaButton: "Jetzt entdecken"
    },
    flightsGeneric: {
      title: "Flüge nach Vietnam",
      intro: "Buchen Sie Ihren Flug nach Vietnam ganz einfach. Die meisten internationalen Flüge landen am Flughafen Hanoi-Noi Bai (HAN) oder am Flughafen Ho-Chi-Minh-Stadt-Tan-Son-Nhat (SGN). Buchen Sie frühzeitig für die besten Preise und prüfen Sie die Visabestimmungen vor Ihrer Reise.",
      faq: {
        title: "Häufig gestellte Fragen",
        q1: {
          question: "Wie lange dauert ein Flug nach Vietnam?",
          answer: "Die Flugdauer hängt von Ihrem Abflugort ab. Von nahegelegenen asiatischen Städten dauert der Flug meist nur wenige Stunden. Bei Flügen aus Europa oder Nordamerika müssen Sie in der Regel mindestens einen Zwischenstopp einplanen. In den Suchergebnissen finden Sie die genauen Flugzeiten."
        },
        q2: {
          question: "Welche Fluggesellschaften fliegen nach Vietnam?",
          answer: "Zahlreiche internationale Fluggesellschaften fliegen nach Vietnam, und auch vietnamesische Airlines bedienen viele Strecken. Zudem verbinden Billigfluglinien Vietnam mit anderen asiatischen Städten. Vergleichen Sie die verfügbaren Optionen direkt in der Suchmaske auf dieser Seite."
        },
        q3: {
          question: "Benötige ich vor dem Flug ein Visum?",
          answer: "Das hängt von Ihrer Staatsangehörigkeit ab. Einige Reisende können visumfrei einreisen, während andere vorab ein E-Visum benötigen. Informieren Sie sich in unserem Vietnam-Visum-Ratgeber und überprüfen Sie die aktuellen Bestimmungen auf der offiziellen Website für E-Visa für Vietnam."
        },
        q4: {
          question: "Welchen Flughafen sollte ich anfliegen?",
          answer: "Hanoi (HAN) ist das wichtigste Drehkreuz für den Norden und Ho-Chi-Minh-Stadt (SGN) für den Süden. Wählen Sie den Flughafen, der am besten zu Ihrem Reiseplan passt. Auch Da Nang und Phu Quoc werden international angeflogen."
        },
        q5: {
          question: "Wann ist die beste Zeit, um Flüge zu buchen?",
          answer: "Für beliebte Reisezeiten empfiehlt sich eine frühzeitige Buchung. Da die Flugpreise schwanken, lohnt es sich, verschiedene Reisedaten zu vergleichen. Flüge an Werktagen sind häufig günstiger."
        }
      }
    },
    hotelsGeneric: {
      title: "Hotels in Vietnam",
      intro: "Finden Sie die passende Unterkunft in Vietnam – von preiswerten Zimmern bis hin zu Strandresorts. Beliebte Gegenden sind das Altstadtviertel in Hanoi und der Bezirk 1 in Ho-Chi-Minh-Stadt. Vergleichen Sie Preise und buchen Sie frühzeitig für die Hauptreisezeit."
    },
    ticketsGeneric: {
      title: "Tickets & Aktivitäten in Vietnam",
      intro: "Buchen Sie Tickets und Aktivitäten in Vietnam mit sofortiger Bestätigung über Klook. Von Stadtführungen bis hin zu Tagesausflügen: Umgehen Sie die Warteschlangen und sichern Sie sich Ihren Platz im Voraus. Eine frühzeitige Buchung sorgt für eine entspannte Reiseplanung.",
      faq: {
        title: "Häufig gestellte Fragen",
        q1: {
          question: "Muss ich Tickets im Voraus buchen?",
          answer: "Für beliebte Attraktionen und Tagesausflüge wird eine Buchung im Voraus empfohlen, besonders während der Hauptreisezeit. So sichern Sie sich Ihren Platz und sparen Zeit am Eingang."
        },
        q2: {
          question: "Werden E-Tickets an den Attraktionen akzeptiert?",
          answer: "Ja, die meisten Klook-Partner akzeptieren digitale Tickets auf dem Smartphone. Zeigen Sie einfach Ihren QR-Code am Eingang vor. An einigen Orten wird möglicherweise ein ausgedrucktes Ticket benötigt – beachten Sie hierzu die Hinweise in Ihrer Buchungsbestätigung."
        },
        q3: {
          question: "Was passiert, wenn ich meine Buchung stornieren muss?",
          answer: "Die Stornierungsbedingungen variieren je nach Aktivität. Manche Tickets können bis zu einer bestimmten Frist kostenlos storniert werden. Bitte lesen Sie vor der Buchung stets die Stornierungsbedingungen."
        },
        q4: {
          question: "Gibt es Kombitickets für mehrere Attraktionen?",
          answer: "Für ausgewählte Attraktionen gibt es Kombi-Angebote oder Pässe („Combo“ oder „Pass“). Diese bieten oft ein besseres Preis-Leistungs-Verhältnis als der Kauf von Einzeltickets."
        },
        q5: {
          question: "Ist die Buchung online günstiger als vor Ort?",
          answer: "Eine Online-Buchung ist meist günstiger, erspart Ihnen Wartezeiten vor Ort und garantiert Ihren Platz. Zudem bieten einige Attraktionen exklusive Online-Rabatte. Vergleichen Sie die Preise auf der Buchungsseite."
        }
      }
    },
    activitiesGeneric: {
      intro: "Entdecken Sie Touren und Erlebnisse in Vietnam mit GetYourGuide. Buchen Sie Tagesausflüge, Stadtführungen und authentische lokale Erlebnisse mit erfahrenen Guide-Partnern.",
      faq: {
        q1: {
          question: "Welche Aktivitäten stehen zur Auswahl?",
          answer: "GetYourGuide bietet Kulturführungen, Kochkurse, Tagesausflüge, Besichtigungen historischer Stätten, kulinarische Touren und vieles mehr. Das Angebot variiert je nach Stadt und Saison."
        },
        q5: {
          question: "Sollte ich Aktivitäten im Voraus buchen?",
          answer: "Für gefragte Erlebnisse und Kleingruppentouren empfiehlt sich eine frühzeitige Buchung, um die Verfügbarkeit zu sichern. Bei Spontanbuchungen kann die Auswahl eingeschränkt sein."
        }
      }
    }
  }
};

export function mergeVietnamGeneric<T extends object>(base: T, generic: object | undefined): T {
  if (!generic) return base;
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(generic as Record<string, unknown>)) {
    const current = result[key];
    if (typeof value === 'string') {
      if (value.trim() !== '') result[key] = value;
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = mergeVietnamGeneric(
        (current && typeof current === 'object' ? current : {}) as object,
        value as object
      );
    }
  }
  return result as T;
}

export const VIETNAM_MODAL_TITLES: Record<string, { visa: string; budget: string; generalInfo: string }> = {
  EN: { visa: 'Vietnam Visa Guide', budget: 'Vietnam Budget Guide', generalInfo: 'General Info' },
  MM: { visa: 'ဗီယက်နမ် ဗီဇာ လမ်းညွှန်', budget: 'ဗီယက်နမ် ဘတ်ဂျက် လမ်းညွှန်', generalInfo: 'ယေဘုယျ အချက်အလက်' },
  TH: { visa: 'คู่มือวีซ่าเวียดนาม', budget: 'คู่มืองบประมาณเวียดนาม', generalInfo: 'ข้อมูลทั่วไป' },
  DE: { visa: 'Vietnam-Visum-Leitfaden', budget: 'Vietnam-Budget-Leitfaden', generalInfo: 'Allgemeine Infos' },
  FR: { visa: 'Guide des visas pour le Vietnam', budget: 'Guide du budget pour le Vietnam', generalInfo: 'Infos générales' },
  ES: { visa: 'Guía de visados de Vietnam', budget: 'Guía de presupuestos de Vietnam', generalInfo: 'Información general' },
};

export const VIETNAM_BRAND = 'VietnamGuide';
export const VIETNAM_WELCOME = 'Welcome to Vietnam from VietnamGuide';
export const VIETNAM_GREETING = 'Xin chào';
