export interface TransportSection {
  title: string;
  items: string[];
}

export interface TransportDetailsData {
  serviceName: string;
  grabBolt: TransportSection;
  btsMrt: {
    title: string;
    schedule: string;
    tips: string[];
  };
  intercity: {
    trains: TransportSection;
    buses: TransportSection;
    flights: TransportSection;
  };
  dosAndDonts: {
    dos: TransportSection;
    donts: TransportSection;
  };
  fullGuideMarkdown?: string;
  appsGuideMarkdown?: string;
}

export const TRANSPORT_DETAILS: Record<string, TransportDetailsData> = {
  myanmar: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# ထိုင်းနိုင်ငံ ခရီးသွားလာရေး လမ်းညွှန်
---
## သယ်ယူပို့ဆောင်ရေး
### ပြည်တွင်း ခရီးသွားလာခြင်း (မြို့အချင်းချင်း)
- **ပြည်တွင်း လေကြောင်းလိုင်းများ**: ဝေးလံသော ဒေသများအကြား (ဥပမာ- ဘန်ကောက်မှ ချင်းမိုင် သို့မဟုတ် ဖူးခက်သို့) သွားလာရန် အမြန်ဆုံးနည်းလမ်းဖြစ်သည်။
- **အဓိက ဗဟိုချက်များ**: ဘန်ကောက်ရှိ သုဝဏ္ဏဘူမိလေဆိပ် (BKK) နှင့် ဒုံးမောင်းလေဆိပ် (DMK)။
- **လေကြောင်းလိုင်းများ**: ဝန်ဆောင်မှုအပြည့်အစုံ (*Thai Airways, Bangkok Airways*); ဈေးနှုန်းချိုသာသောလိုင်းများ (*Thai AirAsia, Nok Air, Thai Lion Air*)။
- **အကြံပြုချက်**: ပိုမိုသက်သာသော ဈေးနှုန်းများအတွက် ၂-၄ ပတ် ကြိုတင်ဘိုကင်လုပ်ပါ။ လေကြောင်းလိုင်းများ၏ အိတ်အလေးချိန် ကန့်သတ်ချက်များကို စစ်ဆေးပါ။

- **ရထား (State Railway of Thailand - SRT)**: မြောက်ပိုင်းမှ တောင်ပိုင်းအထိ မြို့ကြီးများကို ဆက်သွယ်ပေးသော ဈေးသက်သာပြီး ရှုခင်းလှပသော နည်းလမ်းဖြစ်သည်။
- **ပထမတန်း**: သီးသန့် အအေးခန်း အိပ်စင်များ (ရထားนอน)။
- **ဒုတိယတန်း**: ထိုင်ခုံ သို့မဟုတ် အိပ်စင်များ (အအေးခန်း သို့မဟုတ် ပန်ကာ); ခရီးဝေးအတွက် အထူးအကြံပြုပါသည်။
- **တတ္တမတန်း**: သစ်သား သို့မဟုတ် အပျော့စား ထိုင်ခုံများ။ အလွန်ဈေးသက်သာသော်လည်း ခရီးတိုအတွက်သာ အကောင်းဆုံးဖြစ်သည်။
- **ဘိုကင်လုပ်ခြင်း**: **"D-Ticket"** အွန်လိုင်းစနစ်ကို သုံးပါ သို့မဟုတ် Krung Thep Aphiwat Central Terminal တွင် ဝယ်ယူပါ။

- **ဘတ်စ်ကားနှင့် မီနီဗန်များ**: ရထားမရောက်နိုင်သော နေရာများသို့ သွားနိုင်သည်။
- **ခရီးဝေး**: VIP/အစိုးရ ဘတ်စ်ကားများသည် နောက်မှီချ၍ရသော ထိုင်ခုံများနှင့် အိမ်သာများ ပါဝင်သည်။ အိတ်စ်ပရက်စ် ဘတ်စ်ကားများသည် ပိုမိုဈေးသက်သာပြီး ရပ်နားမှု ပိုများသည်။
- **မီနီဗန်များ**: ခရီးတို လမ်းကြောင်းများအတွက် (ဥပမာ- ဘန်ကောက်မှ ပတ္တရားသို့) ပိုမိုမြန်ဆန်သော်လည်း ကျဉ်းကျပ်နိုင်သည်။
- **ဘန်ကောက် ဘတ်စ်ကားဂိတ်များ**: Mo Chit (မြောက်ပိုင်း/အရှေ့မြောက်ပိုင်း), Sai Tai Mai (တောင်ပိုင်း) နှင့် Ekkamai (အရှေ့ပိုင်း)။

- **လှေနှင့် ဖယ်ရီများ**: ကျွန်းများသို့ သွားလာရန် မရှိမဖြစ်လိုအပ်သည်။
- **ဖယ်ရီများ**: အဓိက လမ်းကြောင်းများအတွက် လှေကြီးများ (ဥပမာ- ကိုစမွေ, ဖီဖီ)။
- **စပိဘုတ်များ**: ကျွန်းငယ်များအတွက် ပိုမိုမြန်ဆန်သော ရွေးချယ်မှုများ။
- **အမြီးရှည်လှေများ**: ကမ်းရိုးတန်း တက္ကစီ ဝန်ဆောင်မှု သို့မဟုတ် ကျွန်းများသို့ ကူးရန် အသုံးဝင်သော ထိုင်းရိုးရာ သစ်သားလှေများ။

---
### ဘန်ကောက် မြို့တွင်း သွားလာရေး
- **လူထုရထားလိုင်းများ (Sky Train & Subway)**: ဘန်ကောက်၏ နာမည်ကြီး ယာဉ်ကြောပိတ်ဆို့မှုများကို ရှောင်ရှားရန် အကောင်းဆုံးနည်းလမ်းဖြစ်သည်။
- **BTS (Skytrain)**: Sukhumvit, Silom နှင့် Siam ကဲ့သို့သော အဓိက ဧရိယာများကို ဝန်ဆောင်မှုပေးသော အထက်လမ်း ရထားလိုင်းများ။
- **MRT (Subway)**: Blue Line သည် ကမ္ဘာလှည့်ခရီးသည်များအတွက် အသုံးဝင်ဆုံးဖြစ်သည် (နန်းတော်, ဝပ်ဖို နှင့် တရုတ်တန်း တို့သို့ ဆက်သွယ်ပေးသည်)။
- **Airport Rail Link (ARL)**: သုဝဏ္ဏဘူမိလေဆိပ်မှ မြို့ထဲသို့ တိုက်ရိုက်ဆက်သွယ်ပေးခြင်း။
- **မှတ်ချက်**: BTS နှင့် MRT သည် လက်မှတ်သီးသန့်စီ ဝယ်ယူရန် လိုအပ်သည်။ BTS အတွက် Rabbit Card သို့မဟုတ် အချို့လိုင်းများအတွက် Contactless Credit Card ကို အသုံးပြုနိုင်သည်။

- **တက္ကစီနှင့် အငှားယာဉ် အက်ပ်များ**:
- **အများပြည်သူ တက္ကစီ**: "Taxi Meter" ဆိုင်းဘုတ်ကို ရှာပါ။ မီတာဖွင့်သုံးရန် အမြဲတမ်း တောင်းဆိုပါ။
- **အက်ပ်များ (Grab / Bolt / Maxim)**: ဈေးနှုန်းရှင်းလင်းပြီး ဘေးကင်းသည်။ Bolt သည် ပိုမိုဈေးသက်သာလေ့ရှိပြီး Grab တွင် ကားပိုများသည်။
- **မော်တော်ဆိုင်ကယ် တက္ကစီ (Win)**: လိမ္မော်ရောင်/အနီရောင် အင်္ကျီများ ဝတ်ဆင်ထားသည်။ လူရှုပ်ချိန်တွင် ခရီးတိုများအတွက် အမြန်ဆုံးဖြစ်သော်လည်း ခရီးရှည်အတွက် မစီစဉ်ပါနှင့်။

- **ရေကြောင်း သွားလာရေး**:
- **ကျောက်ဖယား အမြန်လှေ**: ရောင်စုံအလံများကို အသုံးပြုသည်။ အပြာရောင်အလံ (Tourist Boat) သည် မြစ်ဘေးရှိ အဓိက ဘုရားကျောင်းများတွင် ရပ်နားသည်။
- **ခလုံဆမ်ဆပ် လှေ**: မြို့ခံများသုံးသော တူးမြောင်းလှေများဖြစ်ပြီး မြို့ကို ဖြတ်ကျော်သွားလာရန် အလွန်ဈေးသက်သာပြီး မြန်ဆန်သည်။
- **မြစ်ကူးဖယ်ရီ**: မြစ်တဖက်တချက်သို့ ကူးပေးသော လှေငယ်များ (ဥပမာ- ဝပ်ဖိုမှ ဝပ်အရွန်သို့) ၅ ဘတ်ခန့်သာ ကျသင့်သည်။

- **တုတ်တုတ်နှင့် ဆောင်းသောင်း**:
- **တုတ်တုတ်**: ထိုင်းနိုင်ငံ၏ သင်္ကေတဖြစ်သည်။ မီတာမရှိသဖြင့် မစီးမီ ဈေးနှုန်းကို ညှိနှိုင်းပါ။ ခရီးတို အတွေ့အကြုံအတွက် အကောင်းဆုံးဖြစ်သည်။ "ဈေးဝယ်ထွက်ရန်" ကမ်းလှမ်းသော ဒရိုင်ဘာများကို ရှောင်ပါ။
- **ဆောင်းသောင်း**: ထိုင်ခုံပါသော ပစ်ကပ်ကားများ။ ချင်းမိုင်/ပတ္တရားတွင် အသုံးများသော်လည်း ဘန်ကောက် ဆင်ခြေဖုံးရှိ ဒေသတွင်း လမ်းကြောင်းများတွင်လည်း ရှိသည်။

---
### ခရီးသွားများအတွက် အရေးကြီးသော အကြံပြုချက်များ
- **ယာဉ်ကြောပိတ်ဆို့ချိန်**: ၀၇:၀၀ – ၀၉:၃၀ နှင့် ၁၆:၃၀ – ၀၉:၃၀ အတွင်း လမ်းပေါ်ထွက်ခြင်းကို ရှောင်ပါ။ ထိုအချိန်များတွင် BTS/MRT ကို အသုံးပြုပါ။
- **လမ်းကြောင်းရှာဖွေရေး**: တိကျသော လမ်းကြောင်းများအတွက် Google Maps နှင့် ဒေသတွင်း ဘတ်စ်ကားများကို အချိန်နှင့်တပြေးညီ ကြည့်ရန် ViaBus App ကို အသုံးပြုပါ။
- **ငွေပေးချေမှု**: ဘတ်စ်ကားခနှင့် ရထားလက်မှတ် စက်များအတွက် ငွေအကြွေများကို အဆင်သင့်ထားပါ။
- **ပူးတွဲလက်မှတ်များ**: ကျွန်းများသို့ သွားရန်အတွက် အပြောင်းအရွှေ့ လွယ်ကူစေရန် 12Go Asia ကဲ့သို့သော အက်ပ်များမှတစ်ဆင့် "Joint Tickets" (Bus + Ferry) ကို ရှာဖွေဝယ်ယူပါ။`,
    appsGuideMarkdown: `# ထိုင်းနိုင်ငံရှိ သယ်ယူပို့ဆောင်ရေးအတွက် မရှိမဖြစ်လိုအပ်သော အက်ပ်များနှင့် ဝဘ်ဆိုဒ်များ
---
ထိုင်းနိုင်ငံအတွင်း အဆင်ပြေချောမွေ့စွာ သွားလာနိုင်ရန် အောက်ပါအက်ပ်များနှင့် ဝဘ်ဆိုဒ်များသည် မရှိမဖြစ်လိုအပ်ပါသည်။ ၎င်းတို့၏ ဝန်ဆောင်မှုများနှင့် ငွေပေးချေမှုပုံစံများကို အောက်တွင် အသေးစိတ် ဖော်ပြထားပါသည်။

## ၁။ အငှားယာဉ်အက်ပ်များ (ကားနှင့် မော်တော်ဆိုင်ကယ်)
### Grab
- **ဝန်ဆောင်မှု**: ကား၊ မော်တော်ဆိုင်ကယ်၊ အစားအစာနှင့် ပါဆယ်ပို့ဆောင်ရေးတို့အတွက် စိတ်ချရဆုံးဖြစ်ပါသည်။
- **ငွေပေးချေမှု**: ငွေသား၊ ခရက်ဒစ်/ဒက်ဘစ်ကတ် နှင့် GrabPay ပိုက်ဆံအိတ်။
### Bolt
- **ဝန်ဆောင်မှု**: Grab နှင့် ဆင်တူသော်လည်း ဈေးနှုန်းပိုမိုသက်သာသောကြောင့် လူကြိုက်များပါသည်။
- **ငွေပေးချေမှု**: အဓိကအားဖြင့် ငွေသားဖြစ်သော်လည်း ခရက်ဒစ်/ဒက်ဘစ်ကတ်များလည်း လက်ခံပါသည်။
### Maxim
- **ဝန်ဆောင်မှု**: အငှားယာဉ်များထဲတွင် ဈေးအသက်သာဆုံးဟု ယူဆရသော်လည်း ကားဟောင်းများ ဖြစ်နိုင်ပါသည်။
- **ငွေပေးချေမှု**: ငွေသားသာ။
### Line Man
- **ဝန်ဆောင်မှု**: အစားအစာပို့ဆောင်ရေးကို အဓိကထားသော်လည်း "Taxi" ခေါ်ဆိုသည့် ဝန်ဆောင်မှုလည်း ရှိပါသည်။
- **ငွေပေးချေမှု**: ငွေသား သို့မဟုတ် Rabbit Line Pay။

---
## ၂။ ဘိုကင်အက်ပ်များနှင့် ဝဘ်ဆိုဒ်များ (မြို့အချင်းချင်း ခရီးသွားလာရေး)
### 12Go Asia
- **ဝန်ဆောင်မှု**: ထိုင်းနိုင်ငံတစ်ဝန်းရှိ ရထား၊ ဘတ်စ်ကား၊ ဖယ်ရီနှင့် ကိုယ်ပိုင်အငှားယာဉ်များကို ဘိုကင်တင်ရန် အကောင်းဆုံး ပလက်ဖောင်းဖြစ်သည်။
- **ငွေပေးချေမှု**: ခရက်ဒစ်/ဒက်ဘစ်ကတ်၊ PayPal နှင့် ထိုင်း QR ငွေပေးချေမှု။
### D-Ticket (ထိုင်းနိုင်ငံပိုင် ရထားလုပ်ငန်း)
- **ဝန်ဆောင်မှု**: ထိုင်းနိုင်ငံပိုင် ရထားလုပ်ငန်းနှင့် တိုက်ရိုက် ခရီးဝေးရထားလက်မှတ်များ ဘိုကင်တင်ရန် တရားဝင်အက်ပ်။
- **ငွေပေးချေမှု**: ခရက်ဒစ်/ဒက်ဘစ်ကတ် နှင့် ထိုင်း QR ငွေပေးချေမှု။

---
## ၃။ လမ်းညွှန်နှင့် လူထုသယ်ယူပို့ဆောင်ရေး ကိရိယာများ
### Google Maps
- **အရေးကြီးပုံ**: အချိန်နှင့်တပြေးညီ ယာဉ်ကြောအခြေအနေ၊ လမ်းလျှောက်လမ်းညွှန်နှင့် ဘန်ကောက်ရှိ ဘတ်စ်ကားလိုင်းများကို စစ်ဆေးရန်။
### ViaBus
- **ဝန်ဆောင်မှု**: ဘန်ကောက်နှင့် အခြားခရိုင်အချို့ရှိ ဘတ်စ်ကားများကို အချိန်နှင့်တပြေးညီ ခြေရာခံနိုင်သောအက်ပ်။ ဘတ်စ်ကား ဘယ်နေရာရောက်နေသည်ကို မြေပုံပေါ်တွင် ပြသပေးသည်။

---
## ၄။ လေကြောင်းလိုင်း အက်ပ်များ (ပြည်တွင်းခရီးစဉ်များ)
- **AirAsia**, **Nok Air**, **Thai Lion Air**
- **အကြံပြုချက်**: လွယ်ကူစွာ Check-in လုပ်ရန်နှင့် ဒစ်ဂျစ်တယ် Boarding Pass များအတွက် ၎င်းတို့၏အက်ပ်များကို ဒေါင်းလုဒ်လုပ်ထားပါ။

---
## ၅။ ထိုင်းနိုင်ငံရှိ ငွေပေးချေမှုစနစ်များ အကျဉ်းချုပ်
- **ငွေသား**: လမ်းဘေးအစားအစာ၊ ဈေးများနှင့် သယ်ယူပို့ဆောင်ရေးငယ်များအတွက် အမြဲလိုအပ်ပါသည်။
- **QR ငွေပေးချေမှု (PromptPay)**: ဒေသခံများ အသုံးများသည်။ *မှတ်ချက်- နိုင်ငံတကာ ဘဏ်အက်ပ်အများစုမှာ စကန်ဖတ်၍ မရသေးပါ။*
- **EMV (Contactless)**: နိုင်ငံတကာ ခရက်ဒစ်/ဒက်ဘစ်ကတ်များကို MRT နှင့် ဘန်ကောက်ရှိ အချို့ဘတ်စ်ကားများတွင် တိုက်ရိုက် အသုံးပြုနိုင်ပါသည်။

---
## ၆။ ခရီးသွားများအတွက် လိုအပ်သော ကိရိယာများ
၁။ **Google Maps** (လမ်းညွှန်)
၂။ **Grab/Bolt** (အငှားယာဉ်)
၃။ **12Go Asia** (ခရီးစဉ်ဘိုကင်)
၄။ **Google Translate** (ဆက်သွယ်ရေး)
၅။ **လက်ရှိ မိုးလေဝသ: ထိုင်းနိုင်ငံ**
၆။ **ငွေကြေး (THB)**

---

## ထိုင်းနိုင်ငံတည်းခိုနေထိုင်ရေးအတွက် အကြံပြုထားသော အက်ပ်များနှင့် ဝဘ်ဆိုဒ်များ
ထိုင်းနိုင်ငံတွင် သင်၏လိုအပ်ချက်များနှင့် ကိုက်ညီမည့် အကောင်းဆုံးတည်းခိုနေထိုင်စရာများကို ရှာဖွေနိုင်ရန် အောက်ပါအက်ပ်များနှင့် ဝဘ်ဆိုဒ်များကို အထူးအကြံပြုအပ်ပါသည်။ ၎င်းတို့၏ ဝန်ဆောင်မှုများနှင့် ငွေပေးချေမှုပုံစံများကို အောက်တွင် အသေးစိတ်ဖော်ပြထားပါသည်။

### ၁။ အဓိက တည်းခိုခန်းဘိုကင်အက်ပ်များနှင့် ဝဘ်ဆိုဒ်များ
**Agoda (အက်ပ်/ဝဘ်ဆိုဒ်)**
- **ဝန်ဆောင်မှု**: ထိုင်းနိုင်ငံအခြေစိုက် ကုမ္ပဏီဖြစ်သောကြောင့် တစ်နိုင်ငံလုံးရှိ ဟိုတယ်များ၊ ကွန်ဒိုများနှင့် ဗီလာများအတွက် အစုံလင်ဆုံးနှင့် အသက်သာဆုံးသော ဈေးနှုန်းများကို ပေးဆောင်ပါသည်။
- **ထူးခြားချက်**: "Agoda Homes" မှတစ်ဆင့် ကွန်ဒိုများနှင့် ကိုယ်ပိုင်အိမ်များကို ငှားရမ်းနိုင်ပြီး VIP အဖွဲ့ဝင်များအတွက် အထူးလျှော့ဈေးများ ရရှိနိုင်ပါသည်။
- **ငွေပေးချေမှု**: ခရက်ဒစ်/ဒက်ဘစ်ကတ်၊ PayPal နှင့် Google Pay တို့ကို လက်ခံပါသည်။ အချို့ဟိုတယ်များတွင် "ယခုဘိုကင်တင်၍ နောက်မှပေးချေရန်" သို့မဟုတ် "ဟိုတယ်ရောက်မှပေးချေရန်" ရွေးချယ်ခွင့်များ ရှိပါသည်။

**Booking.com (အက်ပ်/ဝဘ်ဆိုဒ်)**
- **ဝန်ဆောင်မှု**: တစ်ကမ္ဘာလုံးတွင် အသုံးများပြီး ထိုင်းနိုင်ငံတစ်ဝန်းရှိ အဆင့်မြင့်ဟိုတယ်များမှ သာမန်ဟိုတယ်များအထိ အစုံအလင်ရှိပါသည်။
- **ထူးခြားချက်**: အခန်းအမျိုးအစားအများစုမှာ အခမဲ့ပယ်ဖျက်ခွင့် (Free Cancellation) ပေးထားသောကြောင့် ကြိုတင်ငွေမပေးဘဲ ဘိုကင်တင်ထားနိုင်ပါသည်။
- **ငွေပေးချေမှု**: ခရက်ဒစ်/ဒက်ဘစ်ကတ်ကို အာမခံအဖြစ် လိုအပ်လေ့ရှိသော်လည်း၊ အခန်းအများစုမှာ ဟိုတယ်ရောက်မှ ကိုယ်တိုင်ငွေချေရန် (ငွေသား သို့မဟုတ် ကတ်) ခွင့်ပြုပါသည်။

**Airbnb (အက်ပ်/ဝဘ်ဆိုဒ်)**
- **ဝန်ဆောင်မှု**: ဒေသခံကွန်ဒိုအခန်းများ၊ ကိုယ်ပိုင်အိမ်များနှင့် ထူးခြားသောဘိုတစ် (boutique) တည်းခိုခန်းများအတွက် အကောင်းဆုံးဖြစ်သည်။
- **ထူးခြားချက်**: မီးဖိုချောင်နှင့် ဧည့်ခန်းပါဝင်သော အခန်းများကို နှစ်သက်သည့် မိသားစုများ သို့မဟုတ် အဖွဲ့များအတွက် အထူးသင့်လျော်ပါသည်။
- **ငွေပေးချေမှု**: ခရက်ဒစ်/ဒက်ဘစ်ကတ်၊ Google Pay သို့မဟုတ် PayPal တို့ဖြင့် ကြိုတင်ငွေပေးချေရန် လိုအပ်ပါသည်။ (မှတ်ချက် - ဟိုတယ်ရောက်မှ ပေးချေ၍မရပါ၊ ငွေပေးချေမှုအားလုံးကို အက်ပ်မှတစ်ဆင့်သာ ပြုလုပ်ရပါမည်)။

### ၂။ ဈေးနှုန်းနှိုင်းယှဉ်ချက်နှင့် ဒေသတွင်းအက်ပ်များ
**Trip.com**
- **ဝန်ဆောင်မှု**: တရုတ်နိုင်ငံအခြေစိုက် ကုမ္ပဏီဖြစ်သော်လည်း ထိုင်းနိုင်ငံရှိ ဟိုတယ်များအတွက် အထူးလျှော့ဈေးများနှင့် ပရိုမိုးရှင်းများကို မကြာခဏ ပေးလေ့ရှိပါသည်။
- **ငွေပေးချေမှု**: ခရက်ဒစ်/ဒက်ဘစ်ကတ်နှင့် နိုင်ငံတကာ ငွေပေးချေမှုစနစ်အမျိုးမျိုးကို လက်ခံပါသည်။

**Traveloka**
- **ဝန်ဆောင်မှု**: အရှေ့တောင်အာရှတွင် လူကြိုက်များပြီး ဟိုတယ်ဘိုကင်တင်ခြင်းနှင့် လေယာဉ်လက်မှတ်ဝယ်ယူခြင်းကို ပေါင်းစည်းပြုလုပ်နိုင်ပါသည်။
- **ငွေပေးချေမှု**: ခရက်ဒစ်/ဒက်ဘစ်ကတ်များအပြင် ထိုင်းနိုင်ငံရှိ 7-Eleven ကောင်တာများတွင် ငွေသားဖြင့် ပေးချေနိုင်သော ထူးခြားသောဝန်ဆောင်မှု ရှိပါသည်။

### ၃။ ရရှိနိုင်သော ဝန်ဆောင်မှုများ အနှစ်ချုပ်
- **ဟိုတယ်ဘိုကင်**: ၁-စတားမှ ၅-စတားအထိ ဟိုတယ်များကို စစ်ဆေး၍ ရွေးချယ်နိုင်ပါသည်။
- **ဝန်ဆောင်မှုပေးသော အပါတ်မန့်များ (Service Apartments)**: ရေရှည်တည်းခိုရန်အတွက် အိမ်နှင့်တူသော အခန်းများကို ရရှိနိုင်ပါသည်။
- **ဟော်စတယ်လ် (Hostel)**: တစ်ကိုယ်တော် သို့မဟုတ် ဘတ်ဂျက်ချွေတာလိုသော ခရီးသွားများအတွက် ဈေးနှုန်းသက်သာသော အိပ်ရာငှားရမ်းနိုင်ပါသည်။
- **အချိန်နှင့်တပြေးညီ ကြည့်ရှုနိုင်ခြင်း**: အခန်းလွတ်ရှိမရှိ ချက်ချင်းစစ်ဆေးနိုင်ပြီး လက်တွေ့သုံးစွဲသူများ၏ ပြန်လည်သုံးသပ်ချက်များကို ဖတ်ရှုနိုင်ပါသည်။

### ၄။ ငွေပေးချေမှုနှင့်ပတ်သက်သော အသေးစိတ်အချက်အလက်များ
ထိုင်းနိုင်ငံတွင် တည်းခိုခန်းများအတွက် ငွေပေးချေရာတွင် အောက်ပါတို့ကို သတိပြုပါ-
- **ခရက်ဒစ်/ဒက်ဘစ်ကတ်**: နိုင်ငံတကာသုံး Visa သို့မဟုတ် Mastercard ရှိခြင်းသည် ဘိုကင်အက်ပ်များသုံးရန် အဆင်ပြေဆုံးနည်းလမ်းဖြစ်သည်။
- **ကောင်တာဝန်ဆောင်မှု**: သင့်တွင် ခရက်ဒစ်ကတ်မရှိပါက Traveloka ကဲ့သို့သော အက်ပ်များမှတစ်ဆင့် အွန်လိုင်းမှ ဘိုကင်တင်ပြီး 7-Eleven ကောင်တာများတွင် ငွေသားဖြင့် ပေးချေနိုင်ပါသည်။
- **အာမခံငွေ (Security Deposit)**: ဟိုတယ်သို့ရောက်ရှိချိန်တွင် အခန်းသော့ရယူရန်အတွက် အာမခံငွေ (ပုံမှန်အားဖြင့် ၁၀၀၀ မှ ၃၀၀၀ ဘတ်ခန့်) ကို ငွေသားဖြင့် ပေးဆောင်ရန် ပြင်ဆင်ထားပါ။ ၎င်းကို ပြန်လည်ထွက်ခွာချိန် (Check-out) တွင် ပြန်အမ်းပါမည်။
- **အက်ပ်၏ ငွေကြေးပုံစံ**: အက်ပ်ကို အသုံးပြုရာတွင် ဈေးနှုန်းများကို ပိုမိုတိကျစွာသိရှိနိုင်ရန် မြန်မာကျပ်ငွေ သို့မဟုတ် အမေရိကန်ဒေါ်လာအစား ထိုင်းဘတ်ငွေ (THB) ကို ရွေးချယ်ထားပါ။

### ခရီးသွားများအတွက် နောက်ဆုံးအနှစ်ချုပ်
ထိုင်းနိုင်ငံတွင် တည်းခိုရန်အတွက် အတိကျဆုံးနှင့် အစုံလင်ဆုံး ဝန်ဆောင်မှုရရန် **Agoda** ကို ဘိုကင်အတွက် အသုံးပြုပြီး **Google Maps** ကို ဟိုတယ်တည်နေရာ စစ်ဆေးရန် အသုံးပြုရန် အကြံပြုအပ်ပါသည်။ ဤကိရိယာနှစ်ခုစလုံးသည် တစ်နိုင်ငံလုံးရှိ ခရီးသွားများအတွက် အကောင်းဆုံးဝန်ဆောင်မှုများ ပေးဆောင်ပါသည်။`

  },
  english: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Thailand Transportation Guide
---
## Transportation
### Domestic Travel (Inter-city)
- **Domestic Flights**: The fastest way to travel between distant regions (e.g., Bangkok to Chiang Mai or Phuket).
- **Main Hubs**: Suvarnabhumi Airport (BKK) and Don Mueang Airport (DMK) in Bangkok.
- **Airlines**: Full Service (*Thai Airways, Bangkok Airways*); Low-Cost (*Thai AirAsia, Nok Air, Thai Lion Air*).
- **Tip**: Book 2–4 weeks in advance for better rates; check baggage limits for budget airlines.

- **Trains (State Railway of Thailand - SRT)**: An affordable and scenic way to connect major cities from North to South.
- **1st Class**: Private AC cabins (sleeper trains).
- **2nd Class**: Available as seats or sleeper berths (AC or Fan); highly recommended for long hauls.
- **3rd Class**: Wooden/padded benches; very cheap but best for short trips.
- **Booking**: Use the **"D-Ticket"** online system or buy at Krung Thep Aphiwat Central Terminal.

- **Buses and Minivans**: Reaches destinations that trains cannot.
- **Long-Distance**: VIP/Government buses offer reclining seats and toilets. Express buses are cheaper with more stops.
- **Minivans**: Faster for shorter routes (e.g., Bangkok to Pattaya) but can be cramped.
- **Bangkok Terminals**: Mo Chit (North/Northeast), Sai Tai Mai (South), and Ekkamai (East).

- **Boats and Ferries**: Essential for island travel.
- **Ferries**: Large boats for main routes (e.g., Koh Samui, Phi Phi).
- **Speedboats**: Faster options for smaller islands.
- **Long-tail Boats**: Iconic wooden boats for coastal taxi service or island hopping.

---
### Bangkok City Transportation
- **Rail Systems (Sky Train & Subway)**: The best way to avoid Bangkok’s famous traffic jams.
- **BTS (Skytrain)**: Elevated lines covering major areas like Sukhumvit, Silom, and Siam.
- **MRT (Subway)**: The Blue Line is most useful for tourists (connects to Grand Palace, Wat Pho, and Chinatown).
- **Airport Rail Link (ARL)**: Direct connection from Suvarnabhumi Airport to the city center.
- **Note**: BTS and MRT require separate tickets. You can use a Rabbit Card for BTS or contactless credit cards for some lines.

- **Taxis and Ride-Hailing**:
- **Public Taxis**: Look for the "Taxi Meter" sign. Always insist on using the meter.
- **Apps (Grab / Bolt / Maxim)**: Very safe with transparent pricing. Bolt is often cheaper, while Grab has more available drivers.
- **Motorbike Taxis (Win)**: Drivers in orange/red vests. Fastest for short distances during rush hour but not for long trips.

- **Water Transport**:
- **Chao Phraya Express Boat**: Uses colored flags. The Blue Flag (Tourist Boat) stops at major riverside temples.
- **Khlong Saen Saep Boat**: Canal boats used by locals; very cheap and fast for cross-city travel.
- **River Crossing Ferry**: Small boats that shuttle you across the river (e.g., Wat Pho to Wat Arun) for approximately 5 Baht.

- **Tuk-Tuks and Songthaews**:
- **Tuk-Tuk**: A Thailand symbol. No meters, so negotiate the price before getting in. Best for short novelty rides. Avoid drivers offering "shopping tours."
- **Songthaew**: Shared pickup trucks with benches. While common in Chiang Mai/Pattaya, they also serve specific local routes in Bangkok suburbs.

---
### Essential Travel Tips
- **Rush Hour**: Avoid the roads from 07:00 – 09:30 and 16:30 – 19:30. Use BTS/MRT during these times.
- **Navigation**: Use Google Maps for accurate routes and the ViaBus App to track local buses in real-time.
- **Payment**: Keep small change/coins ready for bus fares and train ticket machines.
- **Joint Tickets**: For islands, look for "Joint Tickets" (Bus + Ferry) via agencies or apps like 12Go Asia to simplify transfers.`,
    appsGuideMarkdown: `# Essential Apps and Websites for Transportation in Thailand
---
To ensure seamless travel within Thailand, the following apps and websites are indispensable. Below is a detailed breakdown of their services and payment methods.

## 1. Ride-Hailing Apps (Cars and Motorbikes)
### Grab
- **Services**: Offers the most reliable range of cars, motorbikes, food delivery, and parcel delivery.
- **Payment**: Cash, Credit/Debit Card, and GrabPay Wallet.
### Bolt
- **Services**: Provides services similar to Grab but is often preferred for its lower, budget-friendly prices.
- **Payment**: Primarily Cash, though Credit/Debit Cards are also accepted.
### Maxim
- **Services**: Generally considered the cheapest option for car hailing, though the vehicles used may be older models.
- **Payment**: Cash only.
### Line Man
- **Services**: While focused primarily on food delivery, it also offers a "Taxi" service (calling standard metered taxis).
- **Payment**: Cash or Rabbit Line Pay.

---
## 2. Booking Apps and Websites (Inter-city Travel)
### 12Go Asia
- **Services**: The premier platform for booking trains, buses, ferries, and even some private transfers across Thailand.
- **Payment**: Credit/Debit Cards, PayPal, and Thai QR Payment.
### D-Ticket (State Railway of Thailand)
- **Services**: The official app for booking long-distance train tickets directly with the State Railway of Thailand.
- **Payment**: Credit/Debit Cards and Thai QR Payment.

---
## 3. Navigation and Public Transit Tools
### Google Maps
- **Essential for**: Real-time traffic updates, walking directions, and checking public bus schedules/routes in Bangkok.
### ViaBus
- **Services**: A real-time bus tracking app for Bangkok and several other provinces. It shows where the bus is on the map and which route it takes.

---
## 4. Airline Applications (Domestic Flights)
- **AirAsia**, **Nok Air**, **Thai Lion Air**
- **Tip**: Download their apps for easy check-in and digital boarding passes.

---
## 5. Summary of Payment Methods in Thailand
- **Cash**: Always essential for street food, local markets, and smaller transport options.
- **QR Payment (PromptPay)**: Used widely by locals.
- **EMV (Contactless)**: You can tap international Credit/Debit cards directly on MRT and some buses in Bangkok.

---
## 6. Essential Toolkit for Travelers
1. **Google Maps** (Navigation)
2. **Grab/Bolt** (Ride-hailing)
3. **12Go Asia** (Transport Booking)
4. **Google Translate** (Communication)
5. **Current Weather: Thailand**
6. **Currency (THB)**

---

## Recommended Apps and Websites for Thailand Accommodations
To find the perfect accommodation that suits your needs in Thailand, the following apps and websites are highly recommended. Below is a detailed breakdown of their services and payment systems.

### 1. Primary Booking Apps and Websites
**Agoda (App/Website)**
- **Service**: As a company based in Thailand, it offers the most comprehensive selection and competitive prices for hotels, condos, and villas across the country.
- **Key Feature**: Through "Agoda Homes," users can rent condos and private houses; exclusive discounts are often available for VIP members.
- **Payment**: Supports Credit/Debit Card, PayPal, and Google Pay. Some hotels offer "Book Now, Pay Later" or "Pay at Hotel" options.

**Booking.com (App/Website)**
- **Service**: Widely used worldwide, it features all levels of hotels throughout Thailand.
- **Key Feature**: Many room types offer Free Cancellation, allowing users to book without immediate upfront payment.
- **Payment**: While a Credit/Debit Card is usually required as a guarantee, many listings allow actual payment to be made in person (Cash or Card) upon arrival at the hotel.

**Airbnb (App/Website)**
- **Service**: Ideal for renting local condo units, private houses, and unique boutique stays.
- **Key Feature**: Perfect for families or groups who prefer rooms equipped with kitchens and living areas.
- **Payment**: Requires upfront payment via Credit/Debit Card, Google Pay, or PayPal. (Note: There is no "pay at property" option; all transactions are handled through the app).

### 2. Price Comparison and Regional Apps
**Trip.com**
- **Service**: While based in China, it offers frequent and significant promotions for hotels within Thailand.
- **Payment**: Supports Credit/Debit Card and various international payment systems.

**Traveloka**
- **Service**: Popular across Southeast Asia, it allows users to bundle hotel bookings with flight tickets.
- **Payment**: Supports Credit/Debit Cards and offers a unique option to pay via Cash at 7-Eleven Counter Services in Thailand.

### 3. Summary of Services Provided
- **Hotel Booking**: Check and filter hotels ranging from 1-star to 5-star ratings.
- **Service Apartments**: Access home-like rooms designed for long-term stays.
- **Hostel/Dormitory**: Secure affordable bed rentals for solo or budget travelers.
- **Real-time Availability**: Instantly check room availability and read verified user reviews.

### 4. Detailed Payment Information
When paying for accommodations in Thailand, please keep the following in mind:
- **Credit/Debit Card**: Having an international Visa or Mastercard is the most convenient method for using booking apps.
- **Counter Service**: If you do not have a credit card, apps like Traveloka allow you to book online and pay in cash at any 7-Eleven counter.
- **Security Deposit**: Be prepared to pay a security deposit in Cash (usually between 1,000 to 3,000 Baht) upon arrival to receive your room keys. This is refunded at check-out.
- **App Currency**: When browsing apps, set the display currency to Thai Baht (THB) rather than Myanmar Kyat or US Dollars to see the most accurate local pricing.

### Final Summary for Travelers
For the most accurate and comprehensive service in Thailand, it is recommended to prioritize **Agoda** for booking and **Google Maps** to verify hotel locations. Together, these tools provide the best coverage for travelers nationwide.`
  },
  spanish: {
    serviceName: 'Detalles de Transporte en Tailandia',
    grabBolt: {
      title: 'Grab & Bolt (Transporte Privado)',
      items: [
        'Grab: La aplicación más fiable y usada en Tailandia. Ofrece coches, taxis y motos.',
        'Bolt: A menudo más barata que Grab, muy popular en Bangkok, Phuket y Chiang Mai.',
        'Pago: Ambas aceptan efectivo o tarjeta de crédito (vía aplicación).',
        'Consejo: Verifica siempre el punto de recogida en el mapa para asegurar la precisión.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) y MRT (Metro)',
      schedule: 'Horario: 06:00 - 24:00 todos los días.',
      tips: [
        'Horas Punta: 07:30-09:30 y 16:30-19:30 (Los trenes pueden estar muy concurridos).',
        'Tickets: Hay fichas o tarjetas de un solo viaje en las estaciones. Se recomiendan las tarjetas Rabbit (BTS) y MRT para uso frecuente.',
        'Trasbordo: BTS y MRT son sistemas separados; hay que salir de uno para entrar en el otro.'
      ]
    },
    intercity: {
      trains: {
        title: 'Trenes Nacionales',
        items: [
          'State Railway of Thailand (SRT): Conecta Bangkok con el Norte, Noreste y Sur.',
          'Clases: 1.ª (Coche-cama), 2.ª (Coche-cama/Asiento) y 3.ª (Bancos de madera - económico).',
          'Reserva: Se recomienda reservar mediante la web D-Ticket para rutas de larga distancia.'
        ]
      },
      buses: {
        title: 'Autobuses Expresos',
        items: [
          'Transport Co. (BKS): El servicio oficial de autobuses del gobierno.',
          'Terminales: Mo Chit (Norte), Ekkamai (Este), Terminal Sur (Sai Tai Mai).',
          'Autobuses VIP: Muy recomendados para viajes largos (más espacio y aperitivos).'
        ]
      },
      flights: {
        title: 'Información de Vuelos',
        items: [
          'Suvarnabhumi (BKK): Centro internacional principal y vuelos nacionales de servicio completo.',
          'Don Mueang (DMK): Centro principal de aerolíneas de bajo coste (AirAsia, Nok Air).',
          'Traslado: Hay un autobús gratuito entre BKK y DMK para pasajeros con billete válido.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Qué hacer',
        items: [
          'Usa mascarilla en transporte público concurrido (se agradece mucho).',
          'Cede el asiento a monjes, ancianos, embarazadas y niños.',
          'Lleva siempre billetes pequeños o monedas para el transporte local.'
        ]
      },
      donts: {
        title: 'Qué no hacer',
        items: [
          'No comas ni bebas en el BTS o MRT.',
          'No te apoyes en las puertas cuando se estén cerrando.',
          'No negocies precios con taxis con taxímetro (asegúrate de que lo activen).'
        ]
      }
    },
    fullGuideMarkdown: `# Guía de Transporte en Tailandia
---
## 1. Viajes Nacionales (Interurbanos)

### Vuelos Nacionales
- **La forma más rápida** de viajar entre regiones distantes (por ejemplo, de Bangkok a Chiang Mai o Phuket).
- **Centros Principales**: Aeropuerto de Suvarnabhumi (BKK) y Aeropuerto de Don Mueang (DMK) en Bangkok.
- **Aerolíneas**: Servicio Completo (*Thai Airways, Bangkok Airways*); Bajo Coste (*Thai AirAsia, Nok Air, Thai Lion Air*).
- **Consejo**: Reserva con 2–4 semanas de antelación para mejores tarifas; revisa los límites de equipaje en las de bajo coste.

### Trenes (State Railway of Thailand - SRT)
- Una forma económica y pintoresca de conectar las principales ciudades de Norte a Sur.
- **1.ª Clase**: Cabinas privadas con Aire Acondicionado (trenes cama).
- **2.ª Clase**: Disponible en asientos o literas (AC o Ventilador); muy recomendada para trayectos largos.
- **3.ª Clase**: Bancos de madera o acolchados; muy barato pero mejor para viajes cortos.
- **Reserva**: Usa el sistema en línea **"D-Ticket"** o compra en la Terminal Central Krung Thep Aphiwat.

### Autobuses Expresos de Carretera (BKS)
- La columna vertebral de los viajes interurbanos en Tailandia, llegando a casi todas las provincias.
- **Autobuses VIP (24/32 plazas)**: Ofrecen espacio extra para las piernas, asientos reclinables y aperitivos. Lo más cómodo para viajes nocturnos.
- **Terminales Públicas**: Bangkok tiene tres: *Chatuchak (Norte/Noreste), Ekkamai (Este) y Sai Tai Mai (Sur).*

---
## 2. Transporte Público y Local

### Metro de Bangkok (BTS y MRT)
- **BTS Skytrain**: Cubre las zonas de Sukhumvit, Silom y Siam.
- **MRT Subway**: Línea azul (circular) y línea púrpura.
- **Consejo**: Consigue una **Tarjeta Rabbit** (BTS) o usa una **Tarjeta de Crédito Contactless** (MRT) para evitar las colas en las máquinas.

### Aplicaciones de Transporte
- **Grab y Bolt**: *Muy recomendadas.* Evitan cobros excesivos. **Grab** es más fiable; **Bolt** suele ser más barato.
- **Nota**: Ambas aplicaciones permiten elegir entre coches y motos.

### Taxis y Tuk-Tuks
- **Taxis con Taxímetro**: Asegúrate de que el taxímetro se encienda en cuanto subas.
- **Tuk-Tuks**: Sin taxímetro. *Negocia siempre el precio* antes de comenzar el viaje. Ideales para trayectos cortos y divertidos.

---
## 3. Transporte Acuático

### Barco Expreso Chao Phraya (Bangkok)
- Una forma eficiente de llegar a las atracciones junto al río como el Gran Palacio o el Wat Arun. 
- *Busca el Barco Turístico de "Bandera Azul" para obtener indicaciones fáciles en inglés.*

### Ferries y Lanchas Rápidas (Islas)
- Esencial para ir de isla en isla (por ejemplo, de Surat Thani a Koh Samui; de Phuket a Phi Phi).
- **Consejo de Seguridad**: Usa siempre los chalecos salvavidas proporcionados durante los cruces marítimos.

---
## 4. Consejos Clave para el Viajero
- **Pasaporte**: Lleva tu pasaporte original (o una foto o copia clara) para el registro en trenes y vuelos.
- **"Meter Please"**: Si un taxista se niega a usar el taxímetro, simplemente bájate y busca otro.
- **Conectividad**: Usa **Google Maps**; es muy preciso para las rutas de autobús y tren en Bangkok.`,
    appsGuideMarkdown: `# Aplicaciones y Sitios Web Esenciales para el Transporte en Tailandia
---
Para garantizar un viaje sin contratiempos por Tailandia, las siguientes aplicaciones y sitios web son indispensables. A continuación, se detallan sus servicios y métodos de pago.

## 1. Aplicaciones de Transporte (Autos y Motos)
### Grab
- **Servicios**: Ofrece la gama más confiable de autos, motos, entrega de comida y mensajería.
- **Pago**: Efectivo, Tarjeta de Crédito/Debito y Billetera GrabPay.
### Bolt
- **Servicios**: Ofrece servicios similares a Grab, pero suele ser preferido por sus precios más bajos y económicos.
- **Pago**: Principalmente efectivo, aunque también se aceptan tarjetas de crédito/débito.
### Maxim
- **Servicios**: Generalmente considerada la opción más barata, aunque los vehículos pueden ser modelos más antiguos.
- **Pago**: Solo efectivo.
### Line Man
- **Servicios**: Enfocado en entrega de comida, pero también ofrece servicio de "Taxi" (taxis con taxímetro estándar).
- **Pago**: Efectivo o Rabbit Line Pay.

---
## 2. Aplicaciones y Sitios de Reserva (Viajes Interurbanos)
### 12Go Asia
- **Servicios**: La plataforma principal para reservar trenes, autobuses, ferries e incluso traslados privados en toda Tailandia.
- **Pago**: Tarjetas de Crédito/Débito, PayPal y pago por QR tailandés.
### D-Ticket (Ferrocarriles Estatales de Tailandia)
- **Servicios**: La aplicación oficial para reservar boletos de tren de larga distancia directamente.
- **Pago**: Tarjetas de Crédito/Débito y pago por QR tailandés.

---
## 3. Navegación y Transporte Público
### Google Maps
- **Esencial para**: Actualizaciones de tráfico en tiempo real, direcciones a pie y consulta de rutas de autobuses en Bangkok.
### ViaBus
- **Servicios**: Aplicación de seguimiento de autobuses en tiempo real para Bangkok y otras provincias. Muestra la ubicación del bus en el mapa.

---
## 4. Aerolíneas (Vuelos Nacionales)
- **AirAsia**, **Nok Air**, **Thai Lion Air**
- **Consejo**: Descargue sus aplicaciones para el check-in fácil y pases de abordar digitales.

---
## 5. Resumen de Métodos de Pago en Tailandia
- **Efectivo**: Siempre esencial para comida callejera, mercados locales y transporte pequeño.
- **Pago QR (PromptPay)**: Muy utilizado por los locales. *Nota: La mayoría de las apps bancarias internacionales no pueden escanearlos aún.*
- **EMV (Contactless)**: Puede usar su tarjeta internacional directamente en el MRT (Metro) y algunos autobuses de Bangkok.

---
## 6. Kit de Herramientas Esencial
1. **Google Maps** (Navegación)
2. **Grab/Bolt** (Transporte)
3. **12Go Asia** (Reservas)
4. **Google Translate** (Comunicación)
5. **Clima: Tailandia**
6. **Moneda (THB)**

---

## Aplicaciones y Sitios Web Recomendados para Alojamiento en Tailandia
Para encontrar el alojamiento perfecto que se adapte a sus necesidades en Tailandia, se recomienda encarecidamente utilizar las siguientes aplicaciones y sitios web. A continuación, se detallan sus servicios y sistemas de pago.

### 1. Aplicaciones y Sitios Web de Reserva Principales
**Agoda (App/Sitio Web)**
- **Servicio**: Como empresa con sede en Tailandia, ofrece la selección más completa y precios competitivos para hoteles, condominios y villas en todo el país.
- **Característica clave**: A través de "Agoda Homes", los usuarios pueden alquilar condominios y casas privadas; a menudo hay descuentos exclusivos disponibles para miembros VIP.
- **Pago**: Admite tarjetas de crédito/débito, PayPal y Google Pay. Algunos hoteles ofrecen opciones de "Reserve ahora, pague después" o "Pago en el hotel".

**Booking.com (App/Sitio Web)**
- **Servicio**: Ampliamente utilizado en todo el mundo, cuenta con hoteles de todos los niveles en toda Tailandia.
- **Característica clave**: Muchos tipos de habitaciones ofrecen cancelación gratuita, lo que permite a los usuarios reservar sin realizar un pago inmediato.
- **Pago**: Aunque generalmente se requiere una tarjeta de crédito/débito como garantía, muchos listados permiten que el pago real se realice en persona (efectivo o tarjeta) al llegar al hotel.

**Airbnb (App/Sitio Web)**
- **Servicio**: Ideal para alquilar unidades de condominios locales, casas privadas y estancias boutique únicas.
- **Característica clave**: Perfecto para familias o grupos que prefieren habitaciones equipadas con cocina y sala de estar.
- **Pago**: Requiere pago por adelantado mediante tarjeta de crédito/débito, Google Pay o PayPal. (Nota: No hay opción de pago en la propiedad; todas las transacciones se gestionan a través de la aplicación).

### 2. Comparación de Precios y Aplicaciones Regionales
**Trip.com**
- **Servicio**: Aunque tiene su sede en China, ofrece promociones frecuentes y significativas para hoteles dentro de Tailandia.
- **Pago**: Admite tarjetas de crédito/débito y varios sistemas de pago internacionales.

**Traveloka**
- **Servicio**: Popular en todo el sudeste asiático, permite a los usuarios combinar reservas de hotel con billetes de avión.
- **Pago**: Admite tarjetas de crédito/débito y ofrece una opción única para pagar en efectivo en los servicios de mostrador de 7-Eleven en Tailandia.

### 3. Resumen de Servicios Prestados
- **Reserva de Hoteles**: Consulte y filtre hoteles con calificaciones de 1 a 5 estrellas.
- **Apartamentos con Servicio**: Acceda a habitaciones tipo hogar diseñadas para estancias de larga duración.
- **Hostal/Dormitorio**: Asegure alquileres de camas asequibles para viajeros solos o con presupuesto limitado.
- **Disponibilidad en tiempo real**: Verifique instantáneamente la disponibilidad de las habitaciones y lea reseñas de usuarios verificados.

### 4. Información Detallada sobre Pagos
Al pagar alojamiento en Tailandia, tenga en cuenta lo siguiente:
- **Tarjeta de Crédito/Débito**: Tener una Visa o Mastercard internacional es el método más conveniente para usar aplicaciones de reserva.
- **Servicio de Mostrador**: Si no tiene una tarjeta de crédito, aplicaciones como Traveloka le permiten reservar en línea y pagar en efectivo en cualquier mostrador de 7-Eleven.
- **Depósito de Seguridad**: Prepárese para pagar un depósito de seguridad en efectivo (generalmente entre 1.000 y 3.000 Baht) al llegar para recibir las llaves de su habitación. Esto se reembolsa al realizar el check-out.
- **Moneda de la Aplicación**: Al navegar por las aplicaciones, configure la moneda de visualización en Baht tailandés (THB) para ver los precios locales más precisos.

### Resumen Final para Viajeros
Para obtener el servicio más preciso y completo en Tailandia, se recomienda priorizar **Agoda** para las reservas y **Google Maps** para verificar la ubicación de los hoteles. Junto con Google Maps, estas herramientas proporcionan la mejor cobertura para los viajeros en todo el país.`

  },
  french: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Guide des transports en Thaïlande
---
## Transports
### Voyages nationaux (Inter-city)
- **Vols domestiques** : Le moyen le plus rapide de voyager entre des régions éloignées (ex. de Bangkok à Chiang Mai ou Phuket).
- **Plateformes principales** : Aéroport de Suvarnabhumi (BKK) et Aéroport de Don Mueang (DMK) à Bangkok.
- **Compagnies aériennes** : Service complet (*Thai Airways, Bangkok Airways*) ; Low-Cost (*Thai AirAsia, Nok Air, Thai Lion Air*).
- **Conseil** : Réservez 2 à 4 semaines à l'avance pour de meilleurs tarifs ; vérifiez les limites de bagages pour les compagnies à bas prix.

- **Trains (State Railway of Thailand - SRT)** : Un moyen abordable et pittoresque de relier les grandes villes du Nord au Sud.
- **1ère Classe** : Cabines privées climatisées (trains couchettes).
- **2ème Classe** : Disponible en sièges ou en couchettes (climatisation ou ventilateur) ; fortement recommandé pour les longs trajets.
- **3ème Classe** : Bancs en bois ou rembourrés ; très bon marché mais idéal pour les courts trajets.
- **Réservation** : Utilisez le système en ligne **"D-Ticket"** ou achetez sur place au Krung Thep Aphiwat Central Terminal.

- **Bus et Minivans** : Atteignent des destinations que les trains ne peuvent pas desservir.
- **Longue distance** : Les bus VIP/Gouvernementaux offrent des sièges inclinables et des toilettes. Les bus Express sont moins chers avec plus d'arrêts.
- **Minivans** : Plus rapides pour les trajets courts (ex. Bangkok vers Pattaya) mais peuvent être étroits.
- **Terminaux à Bangkok** : Mo Chit (Nord/Nord-Est), Sai Tai Mai (Sud) et Ekkamai (Est).

- **Bateaux et Ferries** : Essentiels pour les voyages vers les îles.
- **Ferries** : Grands bateaux pour les routes principales (ex. Koh Samui, Phi Phi).
- **Speedboats** : Options plus rapides pour les petites îles.
- **Long-tail Boats** : Bateaux en bois emblématiques pour le service de taxi côtier ou les sauts d'île en île.

---
### Transports à Bangkok
- **Réseaux ferrés (Sky Train & Métro)** : Le meilleur moyen d'éviter les célèbres embouteillages de Bangkok.
- **BTS (Skytrain)** : Lignes aériennes couvrant les zones majeures comme Sukhumvit, Silom et Siam.
- **MRT (Métro)** : La ligne bleue est la plus utile pour les touristes (dessert le Grand Palais, le Wat Pho et Chinatown).
- **Airport Rail Link (ARL)** : Connexion directe de l'aéroport de Suvarnabhumi au centre-ville.
- **Note** : Le BTS et le MRT nécessitent des billets séparés. Vous pouvez utiliser une Rabbit Card pour le BTS ou des cartes bancaires sans contact pour certaines lignes.

- **Taxis et VTC** :
- **Taxis publics** : Recherchez le panneau "Taxi Meter". Insistez toujours pour utiliser le compteur.
- **Applications (Grab / Bolt / Maxim)** : Très sûr avec des prix transparents. Bolt est souvent moins cher, tandis que Grab a plus de chauffeurs disponibles.
- **Taxis motos (Win)** : Chauffeurs en gilets orange/rouge. Le plus rapide pour les courtes distances aux heures de pointe, mais pas pour les longs trajets.

- **Transports fluviaux** :
- **Chao Phraya Express Boat** : Utilise des drapeaux de couleur. Le drapeau bleu (bateau touristique) s'arrête aux principaux temples au bord de la rivière.
- **Khlong Saen Saep Boat** : Bateaux-bus sur canaux utilisés par les locaux ; très bon marché et rapide pour traverser la ville.
- **Navette traversée de rivière** : Petits bateaux qui vous font traverser la rivière (ex. du Wat Pho au Wat Arun) pour environ 5 Bahts.

- **Tuk-Tuks et Songthaews** :
- **Tuk-Tuk** : Un symbole de la Thaïlande. Pas de compteurs, négociez donc le prix avant de monter. Idéal pour de courts trajets pittoresques. Évitez les chauffeurs proposant des "shopping tours".
- **Songthaew** : Camionnettes partagées avec des bancs. Bien que courants à Chiang Mai/Pattaya, ils desservent également des itinéraires locaux spécifiques en banlieue de Bangkok.

---
### Conseils de voyage essentiels
- **Heures de pointe** : Évitez la route de 07h00 à 09h30 et de 16h30 à 19h30. Utilisez le BTS/MRT pendant ces créneaux.
- **Navigation** : Utilisez Google Maps pour des itinéraires précis et l'application ViaBus pour suivre les bus locaux en temps réel.
- **Paiement** : Gardez de la monnaie (pièces) prête pour les trajets en bus et les distributeurs de tickets de train.
- **Billets combinés** : Pour les îles, recherchez des "Joint Tickets" (Bus + Ferry) via des agences ou des applications comme 12Go Asia pour simplifier les transferts.`,
    appsGuideMarkdown: `# Applications et Sites Web Essentiels pour le Transport en Thaïlande
---
Pour garantir un voyage sans encombre en Thaïlande, les applications et sites web suivants sont indispensables. Voici un aperçu détaillé de leurs services et modes de paiement.

## 1. Applications de VTC (Voitures et Motos)
### Grab
- **Services** : Offre la gamme la plus fiable de voitures, motos, livraison de repas et colis.
- **Paiement** : Espèces, Carte de Crédit/Débit et Portefeuille GrabPay.
### Bolt
- **Services** : Propose des services similaires à Grab mais est souvent préféré pour ses prix plus bas et économiques.
- **Paiement** : Principalement en espèces, bien que les cartes de crédit/débit soient acceptées.
### Maxim
- **Services** : Généralement considéré comme l'option la moins chère, bien que les véhicules puissent être plus anciens.
- **Paiement** : Espèces uniquement.
### Line Man
- **Services** : Principalement axé sur la livraison de nourriture, mais propose également un service de "Taxi".
- **Paiement** : Espèces ou Rabbit Line Pay.

---
## 2. Applications et Sites de Réservation (Voyages Interurbains)
### 12Go Asia
- **Services** : La plateforme incontournable pour réserver trains, bus, ferries et transferts privés à travers la Thaïlande.
- **Paiement** : Cartes de Crédit/Débit, PayPal et paiement par QR thaïlandais.
### D-Ticket (Chemins de fer de l'État de Thaïlande)
- **Services** : L'application officielle pour réserver des billets de train longue distance directement.
- **Paiement** : Cartes de Crédit/Débit et paiement par QR thaïlandais.

---
## 3. Outils de Navigation et Transports Publics
### Google Maps
- **Essentiel pour** : Trafic en temps réel, directions à pied et horaires de bus à Bangkok.
### ViaBus
- **Services** : Application de suivi de bus en temps réel pour Bangkok et d'autres provinces.

---
## 4. Compagnies Aériennes (Vols Intérieurs)
- **AirAsia**, **Nok Air**, **Thai Lion Air**

---
## 5. Résumé des Modes de Paiement en Thaïlande
- **Espèces** : Toujours essentielles pour la street food et les marchés locaux.
- **Paiement QR (PromptPay)** : Très utilisé par los locaux.
- **EMV (Sans contact)** : Vous pouvez utiliser votre carte internationale directement dans le MRT (Métro) et certains bus de Bangkok.

---
## 6. Boîte à Outils du Voyageur
1. **Google Maps** (Navigation)
2. **Grab/Bolt** (VTC)
3. **12Go Asia** (Réservations)
4. **Google Translate** (Communication)
5. **Météo : Thaïlande**
6. **Devise (THB)**

---

## Applications et Sites Web Recommandés pour l'Hébergement en Thaïlande
Pour trouver l'hébergement idéal qui répond à vos besoins en Thaïlande, les applications et sites Web suivants sont vivement recommandés. Vous trouverez ci-dessous un aperçu détaillé de leurs services et systèmes de paiement.

### 1. Principales Applications et Sites Web de Réservation
**Agoda (Application/Site Web)**
- **Service** : En tant que société basée en Thaïlande, elle propose la sélection la plus complète et les prix les plus compétitifs pour les hôtels, condos et villas dans tout le pays.
- **Caractéristique clé** : Grâce à « Agoda Homes », les utilisateurs peuvent louer des condos et des maisons privées ; des remises exclusives sont souvent disponibles pour les membres VIP.
- **Paiement** : Prend en charge les cartes de crédit/débit, PayPal et Google Pay. Certains hôtels proposent les options « Réserver maintenant, payer plus tard » ou « Payer à l'hôtel ».

**Booking.com (Application/Site Web)**
- **Service** : Largement utilisé dans le monde entier, il propose tous les niveaux d'hôtels à travers la Thaïlande.
- **Caractéristique clé** : De nombreux types de chambres offrent l'annulation gratuite, ce qui permet aux utilisateurs de réserver sans paiement immédiat.
- **Paiement** : Bien qu'une carte de crédit/débit soit généralement requise comme garantie, de nombreuses annonces permettent d'effectuer le paiement réel en personne (espèces ou carte) à l'arrivée.

**Airbnb (Application/Site Web)**
- **Service** : Idéal pour louer des condos locaux, des maisons privées et des séjours de charme uniques.
- **Caractéristique clé** : Parfait pour les familles ou les groupes qui préfèrent des chambres équipées d'une cuisine et d'un salon.
- **Paiement** : Nécessite un paiement initial via carte de crédit/débit, Google Pay ou PayPal. (Remarque : il n'y a pas d'option de paiement sur place ; toutes les transactions se font via l'application).

### 2. Comparaison de Prix et Applications Régionales
**Trip.com**
- **Service** : Bien que basé en Chine, il propose des promotions fréquentes et importantes pour les hôtels en Thaïlande.
- **Paiement** : Prend en charge les cartes de crédit/débit et divers systèmes de paiement internationaux.

**Traveloka**
- **Service** : Populaire en Asie du Sud-Est, il permet de combiner réservations d'hôtel et billets d'avion.
- **Paiement** : Prend en charge les cartes de crédit/débit et offre une option unique de paiement en espèces dans les 7-Eleven en Thaïlande.

### 3. Résumé des Services Fournis
- **Réservation d'Hôtel** : Consultez et filtrez les hôtels de 1 à 5 étoiles.
- **Appartements avec Services** : Accédez à des chambres de type familial conçues pour les séjours de longue durée.
- **Auberge de Jeunesse/Dortoir** : Réservez des lits abordables pour les voyageurs en solo ou à petit budget.
- **Disponibilité en Temps Réel** : Vérifiez instantanément la disponibilité des chambres et lisez les avis vérifiés.

### 4. Informations Détaillées sur le Paiement
Lors du paiement d'un hébergement en Thaïlande, n'oubliez pas les points suivants :
- **Carte de Crédit/Débit** : Avoir une carte Visa ou Mastercard internationale est la méthode la plus pratique.
- **Service au Comptoir** : Si vous n'avez pas de carte de crédit, des applications comme Traveloka vous permettent de réserver en ligne et de payer en espèces dans n'importe quel 7-Eleven.
- **Dépôt de Garantie** : Prévoyez un dépôt de garantie en espèces (généralement entre 1 000 et 3 000 Bahts) à l'arrivée. Il est remboursé au départ.
- **Devise de l'Application** : Réglez la devise au Baht Thaïlandais (THB) pour voir les prix locaux les plus précis.

### Résumé Final pour les Voyageurs
Pour le service le plus précis et le plus complet en Thaïlande, il est recommandé de privilégier **Agoda** pour la réservation et **Google Maps** pour vérifier l'emplacement des hôtels. Ensemble, ces outils offrent la meilleure couverture pour les voyageurs à travers le pays.`

  },
  italian: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Guida ai trasporti in Thailandia
---
## Trasporti
### Viaggi nazionali (Inter-city)
- **Voli nazionali**: Il modo più veloce per viaggiare tra regioni distanti (es. da Bangkok a Chiang Mai o Phuket).
- **Hub principali**: Aeroporto di Suvarnabhumi (BKK) e Aeroporto di Don Mueang (DMK) a Bangkok.
- **Compagnie aeree**: Servizio completo (*Thai Airways, Bangkok Airways*); Low-Cost (*Thai AirAsia, Nok Air, Thai Lion Air*).
- **Suggerimento**: Prenota con 2–4 settimane di anticipo per tariffe migliori; controlla i limiti del bagaglio per le compagnie low-cost.

- **Treni (State Railway of Thailand - SRT)**: Un modo economico e panoramico per collegare le principali città da Nord a Sud.
- **1a Classe**: Cabine private con aria condizionata (treni letto).
- **2a Classe**: Disponibile con posti a sedere o cuccette (aria condizionata o ventilatore); vivamente consigliata per i lunghi tragitti.
- **3a Classe**: Panche in legno o imbottite; molto economica ma ideale per brevi viaggi.
- **Prenotazione**: Usa il sistema online **"D-Ticket"** o acquista presso il Krung Thep Aphiwat Central Terminal.

- **Autobus e Minivan**: Raggiungono destinazioni che i treni non possono servire.
- **Lunga distanza**: Gli autobus VIP/governativi offrono sedili reclinabili e servizi igienici. Gli autobus Express sono più economici con più fermate.
- **Minivan**: Più veloci per tratte brevi (es. da Bangkok a Pattaya) ma possono essere angusti.
- **Terminal di Bangkok**: Mo Chit (Nord/Nord-Est), Sai Tai Mai (Sud) ed Ekkamai (Est).

- **Barche e Traghetti**: Essenziali per i viaggi verso le isole.
- **Traghetti**: Grandi imbarcazioni per le rotte principali (es. Koh Samui, Phi Phi).
- **Moscafi (Speedboats)**: Opzioni più veloci per le isole minori.
- **Long-tail Boats**: Iconiche barche in legno per il servizio taxi costiero o per spostarsi tra le isole.

---
### Trasporti a Bangkok
- **Sistemi su rotaia (Sky Train & Metropolitana)**: Il modo migliore per evitare i famosi ingorghi di Bangkok.
- **BTS (Skytrain)**: Linee sopraelevate che coprono aree principali come Sukhumvit, Silom e Siam.
- **MRT (Metropolitana)**: La Blue Line è la più utile per i turisti (collega il Gran Palazzo, il Wat Pho e Chinatown).
- **Airport Rail Link (ARL)**: Collegamento diretto dall'aeroporto di Suvarnabhumi al centro città.
- **Nota**: BTS e MRT richiedono biglietti separati. Puoi usare una Rabbit Card per il BTS o carte di credito contactless per alcune linee.

- **Taxi e Ride-Hailing**:
- **Taxi pubblici**: Cerca l'insegna "Taxi Meter". Insisti sempre per usare il tassametro.
- **App (Grab / Bolt / Maxim)**: Molto sicure con prezzi trasparenti. Bolt è spesso più economico, mentre Grab ha più conducenti disponibili.
- **Moto Taxi (Win)**: Conducenti con gilet arancioni/rossi. Il modo più veloce per brevi distanze nelle ore di punta, ma non per lunghi viaggi.

- **Trasporti fluviali**:
- **Chao Phraya Express Boat**: Usa bandiere colorate. La Blue Flag (Tourist Boat) si ferma ai principali templi lungo il fiume.
- **Khlong Saen Saep Boat**: Barche che percorrono i canali usate dai locali; molto economiche e veloci per attraversare la città.
- **Traghetto per l'attraversamento del fiume**: Piccole barche che fanno la spola da una sponda all'altra (es. dal Wat Pho al Wat Arun) per circa 5 Baht.

- **Tuk-Tuk e Songthaew**:
- **Tuk-Tuk**: Un simbolo della Thailandia. Niente tassametro, quindi negozia il prezzo prima di salire. Ideale per brevi tragitti pittoreschi. Evita i conducenti che offrono "shopping tour".
- **Songthaew**: Camioncini condivisi con panche. Sebbene comuni a Chiang Mai/Pattaya, servono anche percorsi locali specifici nelle periferie di Bangkok.

---
### Consigli di viaggio essenziali
- **Ora di punta**: Evita le strade dalle 07:00 alle 09:30 e dalle 16:30 alle 19:30. Usa BTS/MRT in questi orari.
- **Navigazione**: Usa Google Maps per percorsi precisi e l'App ViaBus per monitorare gli autobus locali in tempo reale.
- **Pagamento**: Tieni a portata di mano spiccioli/monete per i biglietti dell'autobus e per le emettitrici dei treni.
- **Biglietti integrati**: Per le isole, cerca "Joint Tickets" (Autobus + Traghetto) tramite agenzie o app come 12Go Asia per semplificare i trasferimenti.`,
    appsGuideMarkdown: `# App e Siti Web Essenziali per il Trasporto in Thailandia
---
Per garantire un viaggio senza intoppi in Thailandia, le seguenti app e siti web sono indispensabili. Di seguito una panoramica dettagliata dei loro servizi e metodi di pagamento.

## 1. App di Trasporto (Auto e Moto)
### Grab
- **Servizi**: Offre la gamma più affidabile di auto, moto, consegna di cibo e pacchi.
- **Pagamento**: Contanti, Carta di Credito/Debito e GrabPay Wallet.
### Bolt
- **Servizi**: Fornisce servizi simili a Grab ma è spesso preferito per i suoi prezzi più bassi ed economici.
- **Pagamento**: Principalmente contanti, anche se sono accettate carte di credito/debito.
### Line Man
- **Servizi**: Focalizzato sulla consegna di cibo, ma offre anche un servizio "Taxi".

---
## 2. App e Siti di Prenotazione (Viaggi Interurbains)
### 12Go Asia
- **Servizi**: La piattaforma principale per prenotare treni, autobus, traghetti in tutta la Thailandia.
### D-Ticket
- **Servizi**: App ufficiale delle ferrovie tailandesi (SRT).

---
## 3. Navigazione
### Google Maps
- **Essenziale per**: Traffico in tempo reale e percorsi dei bus a Bangkok.
### ViaBus
- **Servizi**: Tracciamento dei bus in tempo reale per Bangkok.

---
## 4. Compagnie Aeree
- **AirAsia**, **Nok Air**, **Thai Lion Air**

---
## 5. Metodi di Pagamento
- **Contanti**: Essenziali per mercati e street food.
- **QR Payment (PromptPay)**: Molto diffuso.

---
## 6. Kit Essenziale
1. **Google Maps** (Navigazione)
2. **Grab/Bolt** (Trasporto)
3. **12Go Asia** (Prenotazioni)
4. **Google Translate** (Comunicazione)
5. **Meteo: Thailandia**
6. **Valuta (THB)**

---

## App e siti web consigliati per l'alloggio in Thailandia
Per trovare la sistemazione perfetta che soddisfi le tue esigenze in Thailandia, le seguenti app e siti web sono altamente raccomandati. Di seguito una panoramica dettagliata dei loro servizi e sistemi di pagamento.

### 1. Principali app e siti web di prenotazione
**Agoda (App/Sito web)**
- **Servizio**: In quanto società con sede in Thailandia, offre la selezione più completa e i prezzi più competitivi per hotel, condomini e ville in tutto il paese.
- **Caratteristica chiave**: Attraverso "Agoda Homes", gli utenti possono affittare condomini e case private; spesso sono disponibili sconti esclusivi per i membri VIP.
- **Pagamento**: Supporta carte di credito/debito, PayPal e Google Pay. Alcuni hotel offrono le opzioni "Prenota ora, paga dopo" o "Paga in hotel".

**Booking.com (App/Sito web)**
- **Servizio**: ampiamente utilizzato in tutto il mondo, offre hotel di ogni livello in tutta la Thailandia.
- **Caratteristica chiave**: Molti tipi di camere offrono la cancellazione gratuita, consentendo agli utenti di prenotare senza pagamento immediato.
- **Pagamento**: Sebbene sia solitamente richiesta una carta di credito/debito come garanzia, molti annunci consentono di effettuare il pagamento effettivo di persona (contanti o carta) all'arrivo in hotel.

**Airbnb (App/Sito web)**
- **Servizio**: Ideale per affittare condomini locali, case private e soggiorni boutique unici.
- **Caratteristica chiave**: Perfetto per famiglie o gruppi che preferiscono camere dotate di cucina e zona giorno.
- **Pagamento**: Richiede il pagamento anticipato tramite carta di credito/debito, Google Pay o PayPal. (Nota: non esiste un'opzione di pagamento in loco; tutte le transazioni sono gestite tramite l'app).

### 2. Confronto prezzi e app regionali
**Trip.com**
- **Servizio**: Sebbene abbia sede in Cina, offre promozioni frequenti e significative per gli hotel in Thailandia.
- **Pagamento**: Supporta carte di credito/debito e vari sistemi di pagamento internazionali.

**Traveloka**
- **Servizio**: Popolare in tutto il sud-est asiatico, consente agli utenti di combinare prenotazioni di hotel e voli.
- **Pagamento**: Supporta carte di credito/debito e offre l'opzione unica di pagare in contanti presso i servizi di sportello 7-Eleven in Thailandia.

### 3. Riepilogo dei servizi forniti
- **Prenotazione hotel**: filtra hotel da 1 a 5 stelle.
- **Appartamenti serviti**: Camere simili a case progettate per soggiorni a lungo termine.
- **Ostello/Dormitorio**: Prenota posti letto convenienti per viaggiatori solitari o con budget limitato.
- **Disponibilità in tempo reale**: controlla istantaneamente la disponibilità delle camere e leggi le recensioni verificate degli utenti.

### 4. Informazioni dettagliate sul pagamento
Quando paghi per l'alloggio in Thailandia, tieni presente quanto segue:
- **Carta di credito/debito**: avere una Visa o Mastercard internazionale è il metodo più comodo per utilizzare le app di prenotazione.
- **Servizio allo sportello**: se non hai una carta di credito, app come Traveloka ti consentono di prenotare online e pagare in contanti in qualsiasi sportello 7-Eleven.
- **Deposito cauzionale**: preparati a pagare un deposito cauzionale in contanti (di solito tra 1.000 e 3.000 Baht) all'arrivo per ricevere le chiavi della camera. Viene rimborsato al check-out.
- **Valuta dell'app**: quando navighi nelle app, imposta la valuta di visualizzazione in Baht thailandesi (THB) anziché in Kyat del Myanmar o Dollari USA per vedere i prezzi locali corretti.

### Riepilogo finale per i viaggiatori
Per il servizio più accurato e completo in Thailandia, si consiglia di dare priorità ad **Agoda** per la prenotazione e a **Google Maps** per verificare la posizione degli hotel. Insieme a Google Maps, questi strumenti forniscono la migliore copertura per i viaggiatori in tutto il paese.`

  },
  german: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Transportführer für Thailand
---
## Transportmittel
### Inlandsreisen (Zwischen Städten)
- **Inlandsflüge**: Der schnellste Weg, um zwischen weit entfernten Regionen zu reisen (z. B. Bangkok nach Chiang Mai oder Phuket).
- **Hauptdrehkreuze**: Flughafen Suvarnabhumi (BKK) und Flughafen Don Mueang (DMK) in Bangkok.
- **Fluggesellschaften**: Full Service (*Thai Airways, Bangkok Airways*); Low-Cost (*Thai AirAsia, Nok Air, Thai Lion Air*).
- **Tipp**: Buchen Sie 2–4 Wochen im Voraus für bessere Preise; prüfen Sie die Gepäcklimits bei Billigfliegern.

- **Züge (State Railway of Thailand - SRT)**: Eine erschwingliche und malerische Art, die wichtigsten Städte von Nord nach Süd zu verbinden.
- **1. Klasse**: Private klimatisierte Kabinen (Schlafwagen).
- **2. Klasse**: Als Sitzplätze oder Schlafplätze verfügbar (A/C oder Ventilator); sehr empfehlenswert für lange Strecken.
- **3. Klasse**: Holz- oder Polsterbänke; sehr günstig, aber am besten für kurze Fahrten.
- **Buchung**: Nutzen Sie das Online-System **"D-Ticket"** oder kaufen Sie am Krung Thep Aphiwat Central Terminal.

- **Busse und Minivans**: Erreichen Ziele, die Züge nicht anfahren können.
- **Langstrecken**: VIP-/Regierungsbusse bieten verstellbare Sitze und Toiletten. Expressbusse sind günstiger, halten aber öfter.
- **Minivans**: Schneller auf kürzeren Strecken (z. B. Bangkok nach Pattaya), können aber eng sein.
- **Busbahnhöfe in Bangkok**: Mo Chit (Norden/Nordosten), Sai Tai Mai (Süden) und Ekkamai (Osten).

- **Boote und Fähren**: Unverzichtbar für Reisen zu den Inseln.
- **Fähren**: Große Boote für Hauptverbindungen (z. B. Koh Samui, Phi Phi).
- **Schnellboote (Speedboats)**: Schnellere Optionen für kleinere Inseln.
- **Longtail-Boote**: Kultige Holzboote für Küstentaxi-Dienste oder Inselhüpfen.

---
### Stadtverkehr in Bangkok
- **Schienensysteme (Skytrain & U-Bahn)**: Der beste Weg, um Bangkoks berühmte Staus zu umgehen.
- **BTS (Skytrain)**: Hochbahnen, die wichtige Gebiete wie Sukhumvit, Silom und Siam abdecken.
- **MRT (U-Bahn)**: Die Blue Line ist für Touristen am nützlichsten (verbindet den Großen Palast, Wat Pho und Chinatown).
- **Airport Rail Link (ARL)**: Direkte Verbindung vom Flughafen Suvarnabhumi ins Stadtzentrum.
- **Hinweis**: BTS und MRT benötigen separate Tickets. Sie können eine Rabbit-Card für die BTS oder kontaktlose Kreditkarten für einige Linien verwenden.

- **Taxis und Fahrdienste**:
- **Öffentliche Taxis**: Achten Sie auf das "Taxi Meter"-Schild. Bestehen Sie immer auf die Nutzung des Taxameters.
- **Apps (Grab / Bolt / Maxim)**: Sehr sicher mit transparenten Preisen. Bolt ist oft günstiger, während Grab mehr verfügbare Fahrer hat.
- **Motorrad-Taxis (Win)**: Fahrer mit orangefarbenen/roten Westen. Am schnellsten für kurze Strecken in der Hauptverkehrszeit, aber nicht für lange Fahrten.

- **Wassertransport**:
- **Chao Phraya Express Boat**: Verwendet farbige Flaggen. Die Blue Flag (Tourist Boat) hält an den wichtigsten Tempeln am Fluss.
- **Khlong Saen Saep Boat**: Kanalboote, die von Einheimischen genutzt werden; sehr günstig und schnell für Fahrten durch die Stadt.
- **Flussfähren**: Kleine Boote, die Sie für ca. 5 Baht über den Fluss setzen (z. B. Wat Pho nach Wat Arun).

- **Tuk-Tuks und Songthaews**:
- **Tuk-Tuk**: Ein Symbol Thailands. Keine Taxameter, verhandeln Sie also den Preis vor der Fahrt. Am besten für kurze Erlebnisfahrten. Meiden Sie Fahrer, die "Shopping-Touren" anbieten.
- **Songthaew**: Geteilte Pick-ups mit Sitzbänken. In Chiang Mai/Pattaya verbreitet, bedienen sie auch spezifische lokale Routen in Bangkoks Vororten.

---
### Wichtige Reisetipps
- **Berufsverkehr**: Meiden Sie die Straßen von 07:00 – 09:30 Uhr und 16:30 – 19:30 Uhr. Nutzen Sie in dieser Zeit BTS/MRT.
- **Navigation**: Nutzen Sie Google Maps für genaue Routen und die ViaBus App, um lokale Busse in Echtzeit zu verfolgen.
- **Bezahlung**: Halten Sie Kleingeld/Münzen für Busfahrpreise und Fahrkartenautomaten bereit.
- **Kombitickets**: Suchen Sie für Inseln nach "Joint Tickets" (Bus + Fähre) über Agenturen oder Apps wie 12Go Asia, um den Transfer zu vereinfachen.`,
    appsGuideMarkdown: `# Wichtige Apps und Webseiten für Transport in Thailand
---
Für eine reibungslose Reise in Thailand sind die folgenden Apps und Webseiten unverzichtbar. Hier ist eine detaillierte Übersicht über ihre Dienste und Zahlungsmethoden.

## 1. Fahrservice-Apps (Autos und Motorräder)
### Grab
- **Dienste**: Zuverlässigstes Angebot an Autos, Motorrädern, Essenslieferungen und Paketen.
- **Zahlung**: Bargeld, Kredit-/Debitkarte und GrabPay Wallet.
### Bolt
- **Dienste**: Ähnlich wie Grab, wird aber oft wegen günstigerer Preise bevorzugt.
- **Zahlung**: Hauptsächlich Bargeld, wobei auch Karten akzeptiert werden.

---
## 2. Buchungs-Apps (Überlandreisen)
### 12Go Asia
- **Dienste**: Die führende Plattform für Züge, Busse und Fähren in Thailand.
### D-Ticket
- **Dienste**: Offizielle App der Thailändischen Staatsbahn (SRT).

---
## 3. Navigation
### Google Maps
- **Unverzichtbar für**: Echtzeit-Verkehr, Fußwege und Busfahrpläne in Bangkok.
### ViaBus
- **Dienste**: Echtzeit-Bus-Tracking für Bangkok.

---
## 4. Fluggesellschaften
- **AirAsia**, **Nok Air**, **Thai Lion Air**

---
## 5. Zahlungsmethoden
- **Bargeld**: Unverzichtbar für Street Food und Märkte.
- **Kontaktloses Bezahlen (EMV)**: Direkt an MRT-Schranken in Bangkok nutzbar.

---
## 6. Essential Toolkit
1. **Google Maps**
2. **Grab/Bolt**
3. **12Go Asia**
4. **Google Translate**
5. **Wetter: Thailand**
6. **Währung (THB)**

---

## Empfohlene Apps und Websites für Unterkünfte in Thailand
Um die perfekte Unterkunft für Ihre Bedürfnisse in Thailand zu finden, werden die folgenden Apps und Websites dringend empfohlen. Unten finden Sie eine detaillierte Aufschlüsselung ihrer Dienstleistungen und Zahlungssysteme.

### 1. Primäre Buchungs-Apps und Websites
**Agoda (App/Website)**
- **Dienstleistung**: Als Unternehmen mit Sitz in Thailand bietet es die umfassendste Auswahl und die wettbewerbsfähigsten Preise für Hotels, Eigentumswohnungen und Villen im ganzen Land.
- **Hauptmerkmal**: Über „Agoda Homes“ können Nutzer Eigentumswohnungen und Privathäuser mieten; für VIP-Mitglieder gibt es oft exklusive Rabatte.
- **Zahlung**: Unterstützt Kredit-/Debitkarte, PayPal und Google Pay. Einige Hotels bieten Optionen wie „Jetzt buchen, später bezahlen“ oder „Im Hotel bezahlen“.

**Booking.com (App/Website)**
- **Dienstleistung**: Weltweit verbreitet, bietet es Hotels aller Kategorien in ganz Thailand an.
- **Hauptmerkmal**: Viele Zimmertypen bieten eine kostenlose Stornierung, sodass Nutzer buchen können, ohne sofort bezahlen zu müssen.
- **Zahlung**: Obwohl meist eine Kredit-/Debitkarte als Garantie benötigt wird, erlauben viele Angebote die tatsächliche Zahlung vor Ort (bar oder Karte) bei der Ankunft im Hotel.

**Airbnb (App/Website)**
- **Dienstleistung**: Ideal für die Vermietung lokaler Eigentumswohnungen, Privathäuser und einzigartiger Boutique-Unterkünfte.
- **Hauptmerkmal**: Perfekt für Familien oder Gruppen, die Zimmer mit Küche und Wohnbereich bevorzugen.
- **Zahlung**: Erfordert eine Vorauszahlung per Kredit-/Debitkarte, Google Pay oder PayPal. (Hinweis: Es gibt keine Option zur Zahlung vor Ort; alles wird über die App abgewickelt).

### 2. Preisvergleich und regionale Apps
**Trip.com**
- **Dienstleistung**: Obwohl das Unternehmen in China ansässig ist, bietet es häufig erhebliche Werbeaktionen für Hotels in Thailand an.
- **Zahlung**: Unterstützt Kredit-/Debitkarten und verschiedene internationale Zahlungssysteme.

**Traveloka**
- **Dienstleistung**: Beliebt in ganz Südostasien; ermöglicht es Nutzern, Hotelbuchungen mit Flugtickets zu verbinden.
- **Zahlung**: Unterstützt Kredit-/Debitkarten und bietet eine einzigartige Option zur Barzahlung in 7-Eleven-Filialen in Thailand.

### 3. Zusammenfassung der angebotenen Dienstleistungen
- **Hotelbuchung**: Hotels von 1 bis 5 Sternen filtern.
- **Service-Apartments**: Wohnungsähnliche Zimmer für Langzeitaufenthalte.
- **Hostels/Schlafsäle**: Günstige Betten für Alleinreisende oder preisbewusste Urlauber.
- **Echtzeit-Verfügbarkeit**: Sofort Zimmerverfügbarkeit prüfen und verifizierte Bewertungen lesen.

### 4. Detaillierte Zahlungsinformationen
Beachten Sie bei der Bezahlung von Unterkünften in Thailand Folgendes:
- **Kredit-/Debitkarte**: Eine internationale Visa oder Mastercard ist die bequemste Methode zur Nutzung von Buchungs-Apps.
- **Counter-Service**: Wenn Sie keine Kreditkarte haben, können Sie bei Apps like Traveloka online buchen und bar an jedem 7-Eleven-Schalter bezahlen.
- **Kaution**: Stellen Sie sich darauf ein, bei der Ankunft eine Kaution in bar (meist 1.000 bis 3.000 Baht) zu hinterlegen. Diese wird beim Check-out erstattet.
- **Währung in der App**: Stellen Sie die Währung auf Thailändische Baht (THB) ein, um die genauesten Preise zu sehen.

### Fazit für Reisende
Für den besten Service in Thailand empfehlen wir **Agoda** für Buchungen und **Google Maps** zur Überprüfung der Standorte. Zusammen mit Google Maps bieten diese Tools die beste Abdeckung für Reisende im ganzen Land.`

  },
  portuguese: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Guia de Transporte na Tailândia
---
## Transporte
### Viagens Nacionais (Interurbanas)
- **Voos Domésticos**: A forma mais rápida de viajar entre regiões distantes (ex: de Banguecoque para Chiang Mai ou Phuket).
- **Centros Principais**: Aeroporto de Suvarnabhumi (BKK) e Aeroporto de Don Mueang (DMK) em Banguecoque.
- **Companhias Aéreas**: Serviço Completo (*Thai Airways, Bangkok Airways*); Low-Cost (*Thai AirAsia, Nok Air, Thai Lion Air*).
- **Dica**: Reserve com 2 a 4 semanas de antecedência para melhores tarifas; verifique os limites de bagagem nas companhias de baixo custo.

- **Comboios (State Railway of Thailand - SRT)**: Uma forma acessível e cénica de ligar as principais cidades de Norte a Sul.
- **1ª Classe**: Cabines privadas com ar condicionado (comboios-cama).
- **2ª Classe**: Disponível em assentos ou beliches (AC ou Ventoinha); altamente recomendado para viagens longas.
- **3ª Classe**: Bancos de madeira ou estofados; muito barato, mas melhor para viagens curtas.
- **Reserva**: Utilize o sistema online **"D-Ticket"** ou compre no Krung Thep Aphiwat Central Terminal.

- **Autocarros e Carrinhas (Minivans)**: Chegam a destinos onde os comboios não chegam.
- **Longa Distância**: Autocarros VIP/Governamentais oferecem assentos reclináveis e casas de banho. Os autocarros Express são mais baratos, com mais paragens.
- **Minivans**: Mais rápidas para rotas curtas (ex: Banguecoque para Pattaya), mas podem ser apertadas.
- **Terminais em Banguecoque**: Mo Chit (Norte/Nordeste), Sai Tai Mai (Sul) e Ekkamai (Este).

- **Barcos e Ferries**: Essenciais para viajar para as ilhas.
- **Ferries**: Barcos grandes para as rotas principais (ex: Koh Samui, Phi Phi).
- **Lanchas Rápidas (Speedboats)**: Opções mais rápidas para ilhas menores.
- **Long-tail Boats**: Barcos de madeira icónicos para serviço de táxi costeiro ou passeios entre ilhas.

---
### Transporte na Cidade de Banguecoque
- **Sistemas Ferroviários (Sky Train e Metro)**: A melhor forma de evitar os famosos engarrafamentos de Banguecoque.
- **BTS (Skytrain)**: Linhas elevadas que cobrem áreas principais como Sukhumvit, Silom e Siam.
- **MRT (Metro)**: A Linha Azul é a mais útil para turistas (liga ao Grande Palácio, Wat Pho e Chinatown).
- **Airport Rail Link (ARL)**: Ligação direta do Aeroporto de Suvarnabhumi ao centro da cidade.
- **Nota**: O BTS e o MRT requerem bilhetes separados. Pode usar um Rabbit Card para o BTS ou cartões de crédito contactless para algumas lines.

- **Táxis e Aplicações de Transporte**:
- **Táxis Públicos**: Procure o sinal "Taxi Meter". Insista sempre em usar o taxímetro.
- **Aplicações (Grab / Bolt / Maxim)**: Muito seguras com preços transparentes. O Bolt é frequentemente mais barato, enquanto o Grab tem mais condutores disponíveis.
- **Moto-Táxis (Win)**: Condutores com coletes cor-de-laranja/vermelhos. O mais rápido para distâncias curtas durante a hora de ponta, mas não para viagens longas.

- **Transporte Fluvial**:
- **Chao Phraya Express Boat**: Utiliza bandeiras coloridas. A Bandeira Azul (Barco Turístico) pára nos principais templos à beira-rio.
- **Barco do Canal Khlong Saen Saep**: Barcos de canal usados pelos habitantes locais; muito baratos e rápidos para atravessar a cidade.
- **Ferry de Travessia do Rio**: Barcos pequenos que fazem a travessia (ex: de Wat Pho para Wat Arun) por aproximadamente 5 Baht.

- **Tuk-Tuks e Songthaews**:
- **Tuk-Tuk**: Um símbolo da Tailândia. Não têm taxímetro, por isso negocie o preço antes de entrar. Ideal para viagens curtas e pitorescas. Evite condutores que ofereçam "shopping tours".
- **Songthaew**: Pick-ups partilhadas com bancos. Embora comuns em Chiang Mai/Pattaya, também servem rotas locais específicas nos subúrbios de Banguecoque.

---
### Dicas de Viagem Essenciais
- **Hora de Ponta**: Evite as estradas das 07:00 às 09:30 e das 16:30 às 19:30. Utilize o BTS/MRT durante estes períodos.
- **Navegação**: Utilize o Google Maps para rotas precisas e a Aplicação ViaBus para seguir os autocarros locais em tempo real.
- **Pagamento**: Tenha trocos/moedas à mão para as tarifas de autocarro e máquinas de bilhetes de comboio.
- **Bilhetes Conjuntos**: Para as ilhas, procure por "Joint Tickets" (Autocarro + Ferry) através de agências ou aplicações como 12Go Asia para simplificar as transferências.
---
## Aplicações e Sites Recomendados para Alojamento na Tailândia
---
Para encontrar o alojamento perfeito que se adapte às suas necessidades na Tailândia, as seguintes aplicações e sites são altamente recomendados. Abaixo está uma análise detalhada dos seus serviços e sistemas de pagamento.

### 1. Principais Aplicações e Sites de Reserva
**Agoda (Aplicação/Site)**
- **Serviço**: Como empresa sediada na Tailândia, oferece a seleção mais completa e os preços mais competitivos para hotéis, condomínios e moradias em todo o país.
- **Característica Principal**: Através do "Agoda Homes", os utilizadores podem alugar condomínios e casas particulares; descontos exclusivos estão frequentemente disponíveis para membros VIP.
- **Pagamento**: Suporta Cartão de Crédito/Débito, PayPal e Google Pay. Alguns hotéis oferecem opções "Reserve Agora, Pague Depois" ou "Pague no Hotel".

**Booking.com (Aplicação/Site)**
- **Serviço**: Amplamente utilizado em todo o mundo, apresenta todos os níveis de hotéis em toda a Tailândia.
- **Característica Principal**: Muitos tipos de quartos oferecem Cancelamento Gratuito, permitindo aos utilizadores reservar sem pagamento antecipado imediato.
- **Pagamento**: Embora normalmente seja necessário um Cartão de Crédito/Débito como garantia, muitos alojamentos permitem que o pagamento real seja feito pessoalmente (Dinheiro ou Cartão) à chegada ao hotel.

**Airbnb (Aplicação/Site)**
- **Serviço**: Ideal para alugar unidades de condomínio locais, casas particulares e estadias boutique exclusivas.
- **Característica Principal**: Perfeito para famílias ou grupos que prefererem quartos equipados com cozinhas e áreas de estar.
- **Pagamento**: Requer pagamento antecipado via Cartão de Crédito/Débito, Google Pay ou PayPal. (Nota: Não há opção de pagamento no local; todas as transações são geridas através da aplicação).

### 2. Comparação de Preços e Aplicações Regionais
**Trip.com**
- **Serviço**: Embora sediada na China, oferece promoções frequentes e significativas para hotéis na Tailândia.
- **Pagamento**: Suporta Cartões de Crédito/Débito e vários sistemas de pagamento internacionais.

**Traveloka**
- **Serviço**: Popular em todo o Sudeste Asiático, permite aos utilizadores combinar reservas de hotéis com bilhetes de avião.
- **Pagamento**: Suporta Cartões de Crédito/Débito e oferece uma opção única de pagamento em dinheiro nos serviços de balcão da 7-Eleven na Tailândia.

### 3. Resumo dos Serviços Prestados
- **Reserva de Hotéis**: Verifique e filtre hotéis de 1 estrela a 5 estrelas.
- **Apartamentos Turísticos**: Aceda a quartos semelhantes a casas concebidos para estadias de longa duração.
- **Hostel/Dormitório**: Garanta o aluguer de camas acessíveis para viajantes individuais ou com orçamento limitado.
- **Disponibilidade em Tempo Real**: Verifique instantaneamente a disponibilidade dos quartos e leia as avaliações verificadas dos utilizadores.

### 4. Informações Detalhadas de Pagamento
Ao pagar alojamento na Tailândia, tenha em conta o seguinte:
- **Cartão de Crédito/Débito**: Ter um Visa ou Mastercard internacional é o método mais conveniente.
- **Serviço de Balcão**: Se não tiver um cartão de crédito, aplicações como a Traveloka permitem-lhe reservar online e pagar em dinheiro em qualquer balcão da 7-Eleven.
- **Depósito de Segurança**: Esteja preparado para pagar um depósito de segurança em Dinheiro (normalmente entre 1.000 e 3.000 Baht) à chegada para receber as chaves do quarto. Este será reembolsado no check-out.
- **Moeda da Aplicação**: Ao navegar nas aplicações, defina a moeda de visualização para Baht Tailandês (THB) para ver o preço local mais preciso.

### Resumo Final para Viajantes
Para o serviço mais preciso e abrangente na Tailândia, recomenda-se dar prioridade à **Agoda** para reservas e ao **Google Maps** para verificar as localizações dos hotéis. Juntas, estas ferramentas fornecem a melhor cobertura para viajantes em todo o país.`
  },
  russian: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Путеводитель по транспорту Таиланда
---
## Транспорт
### Междугородние поездки (Inter-city)
- **Внутренние авиарейсы**: Самый быстрый способ перемещения между удаленными регионами (например, из Бангкока в Чиангмай или на Пхукет).
- **Основные хабы**: Аэропорт Суварнабхуми (BKK) и аэропорт Дон Муанг (DMK) в Бангкоке.
- **Авиакомпании**: Полный сервис (*Thai Airways, Bangkok Airways*); Лоукостеры (*Thai AirAsia, Nok Air, Thai Lion Air*).
- **Совет**: Бронируйте за 2–4 недели до поездки для получения лучших тарифов; проверяйте нормы провоза багажа у бюджетных авиакомпаний.

- **Поезда (Государственные железные дороги Таиланда - SRT)**: Доступный и живописный способ сообщения между крупными городами с Севера на Юг.
- **1-й класс**: Отдельные купе с кондиционером (спальные поезда).
- **2-й класс**: Сидячие или спальные места (с кондиционером или вентилятором); настоятельно рекомендуется для поездок на дальние расстояния.
- **3-й класс**: Деревянные или мягкие скамьи; очень дешево, но лучше всего подходит для коротких поездок.
- **Бронирование**: Используйте онлайн-систему **"D-Ticket"** или покупайте на центральном вокзале Крунг-Тхеп-Апиват.

- **Автобусы и минивэны**: Позволяют добраться туда, куда не ходят поезда.
- **Дальние расстояния**: VIP и правительственные автобусы предлагают откидные кресла и туалеты. Экспресс-автобусы дешевле, но делают больше остановок.
- **Минивэны**: Быстрее на коротких маршрутах (например, из Бангкока в Паттайю), но в них может быть тесно.
- **Терминалы в Бангкоке**: Мо Чит (север/северо-восток), Сай Тай Май (юг) и Эккамай (восток).

- **Лодки и паромы**: Необходимы для поездок на острова.
- **Паромы**: Большие суда для основных маршрутов (например, Самуи, Пхи-Пхи).
- **Скоростные катера (Speedboats)**: Более быстрый вариант для небольших островов.
- **Длиннохвостые лодки (Long-tail Boats)**: Культовые деревянные лодки для прибрежного такси или прогулок по островам.

---
### Городской транспорт Бангкока
- **Рельсовый транспорт (Скайтрейн и Метро)**: Лучший способ избежать знаменитых пробок Бангкока.
- **BTS (Skytrain)**: Надземные линии, охватывающие основные районы, такие как Сукхумвит, Силом и Сиам.
- **MRT (Subway)**: Синяя линия наиболее полезна для туристов (соединяет Большой дворец, Ват Пхо и Китайский квартал).
- **Airport Rail Link (ARL)**: Прямое сообщение из аэропорта Суварнабхуми в центр города.
- **Примечание**: Для BTS и MRT требуются разные билеты. Вы можете использовать карту Rabbit Card для BTS или бесконтактные кредитные карты для некоторых линий.

- **Такси и заказ поездок**:
- **Городское такси**: Ищите табличку "Taxi Meter". Всегда настаивайте на включении счетчика.
- **Приложения (Grab / Bolt / Maxim)**: Очень безопасно, прозрачное ценообразование. Bolt часто дешевле, а у Grab больше доступных водителей.
- **Мототакси (Win)**: Водители в оранжевых/красных жилетах. Самый быстрый способ передвижения на короткие расстояния в часы пик, но не для долгих поездок.

- **Водный транспорт**:
- **Речной экспресс Чао Прайя**: Использует цветные флаги. Синий флаг (туристическая лодка) останавливается у основных храмов на берегу реки.
- **Лодки по каналу Клонг Сэн Сэб**: Канальные лодки, которыми пользуются местные жители; очень дешево и быстро для поездок через весь город.
- **Паром через реку**: Небольшие лодки, курсирующие между берегами (например, от Ват Пхо к Ват Арун) примерно за 5 бат.

- **Тук-туки и сонгтео**:
- **Тук-тук**: Символ Таиланда. Счетчиков нет, поэтому договаривайтесь о цене перед тем, как сесть. Лучше всего подходит для коротких развлекательных поездок. Избегайте водителей, предлагающих "шопинг-туры".
- **Сонгтео**: Общие пикапы со скамейками. Хотя они обычны в Чиангмае и Паттайе, они также обслуживают определенные местные маршруты в пригородах Бангкока.

---
### Важные советы путешественникам
- **Час пик**: Избегайте дорог с 07:00 до 09:30 и с 16:30 до 19:30. В это время используйте BTS/MRT.
- **Навигация**: Используйте Google Maps для точных маршрутов и приложение ViaBus для отслеживания местных автобусов в реальном времени.
- **Оплата**: Держите наготове мелкие деньги/монеты для оплаты проезда в автобусе и билетных автоматов в поездах.
- **Комбинированные билеты**: Для поездок на острова ищите "Joint Tickets" (автобус + паром) через агентства или приложения, такие как 12Go Asia, чтобы упростить пересадки.
---
## Рекомендуемые приложения и веб-сайты для проживания в Таиланде
---
Чтобы найти идеальный вариант проживания, соответствующий вашим потребностям в Таиланде, мы настоятельно рекомендуем следующие приложения и веб-сайты. Ниже представлен подробный обзор их услуг и систем оплаты.

### 1. Основные приложения и сайты для бронирования
**Agoda (приложение/сайт)**
- **Сервис**: Будучи компанией, базирующейся в Таиланде, она предлагает самый полный выбор и конкурентоспособные цены на отели, кондоминиумы и виллы по всей стране.
- **Ключевая особенность**: Через «Agoda Homes» пользователи могут арендовать кондоминиумы и частные дома; VIP-клиентам часто доступны эксклюзивные скидки.
- **Оплата**: Поддерживает кредитные/дебетовые карты, PayPal и Google Pay. Некоторые отели предлагают варианты «Забронируйте сейчас, оплатите позже» или «Оплата в отеле».

**Booking.com (приложение/сайт)**
- **Сервис**: Широко используется во всем мире, представляет отели всех уровней по всему Таиланду.
- **Ключевая особенность**: Многие типы номеров предлагают бесплатную отмену бронирования, что позволяет пользователям бронировать без немедленной предоплаты.
- **Оплата**: Хотя обычно для гарантии требуется кредитная/дебетовая карта, многие объекты позволяют произвести фактическую оплату лично (наличными или картой) по прибытии в отель.

**Airbnb (приложение/сайт)**
- **Сервис**: Идеально подходит для аренды местных квартир в кондоминиумах, частных домов и уникальных бутик-отелей.
- **Ключевая особенность**: Отлично подходит для семей или групп, предпочитающих номера с кухней и гостиной зоной.
- **Оплата**: Требуется предоплата кредитной/дебетовой картой, через Google Pay или PayPal. (Примечание: возможность оплаты на месте отсутствует; все транзакции обрабатываются через приложение).

### 2. Сравнение цен и региональные приложения
**Trip.com**
- **Сервис**: Хотя компания базируется в Китае, она часто предлагает значительные акции на отели в Таиланде.
- **Оплата**: Поддерживает кредитные/дебетовые карты и различные международные платежные системы.

**Traveloka**
- **Сервис**: Популярен во всей Юго-Восточной Азии, позволяет пользователям бронировать отели вместе с авиабилетами в пакете.
- **Оплата**: Поддерживает кредитные/дебетовые карты и предлагает уникальную возможность оплаты наличными через кассы 7-Eleven в Таиланде.

### 3. Краткое описание предоставляемых услуг
- **Бронирование отелей**: Проверка и фильтрация отелей от 1 до 5 звезд.
- **Сервисные апартаменты**: Доступ к номерам квартирного типа, предназначенным для длительного проживания.
- **Хостелы/общие номера**: Бронирование недорогих спальных мест для индивидуальных путешественников или при ограниченном бюджете.
- **Доступность в реальном времени**: Мгновенная проверка наличия свободных номеров и чтение проверенных отзывов пользователей.

### 4. Подробная информация об оплате
При оплате проживания в Таиланде имейте в виду следующее:
- **Кредитные/дебетовые карты**: Наличие международной карты Visa или Mastercard — самый удобный способ.
- **Оплата через кассу (Counter Service)**: Если у вас нет кредитной карты, приложения вроде Traveloka позволяют забронировать жилье онлайн и оплатить его наличными в любой кассе 7-Eleven.
- **Страховой депозит**: Будьте готовы внести страховой депозит наличными (обычно от 1000 до 3000 бат) при заезде для получения ключей. Он возвращается при выезде (check-out).
- **Валюта в приложении**: При просмотре приложений установите валюту отображения на тайские баты (THB) чтобы видеть наиболее точные местные цены.

### Заключение для путешественников
Для получения наиболее точного и качественного сервиса в Таиланде рекомендуется отдавать приоритет **Agoda** для бронирования и **Google Maps** для проверки местоположения отелей. Вместе эти инструменты обеспечивают наилучшее покрытие для путешественников по всей стране.`
  },
  hebrew: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# מדריך התחבורה בתאילנד
---
## תחבורה
### נסיעות בינלאומיות (בין-עירוניות)
- **טיסות פנים**: הדרך המהירה ביותר לעבור בין אזורים מרוחקים (למשל, מבנגקוק לצ'יאנג מאי או פוקט).
- **צמתים מרכזיים**: נמל התעופה סוברנבומי (BKK) ונמל התעופה דון מואנג (DMK) בבנגקוק.
- **חברות תעופה**: שירות מלא (*Thai Airways, Bangkok Airways*); לואו-קוסט (*Thai AirAsia, Nok Air, Thai Lion Air*).
- **טיפ**: הזמינו 2–4 שבועות מראש למחירים טובים יותר; בדקו את מגבלות הכבודה בחברות הלואו-קוסט.

- **רכבות (SRT - רכבת תאילנד הממשלתית)**: דרך זולה ונופית לחבר בין ערים מרכזיות מצפון לדרום.
- **מחלקה ראשונה**: תאים פרטיים ממוזגים (רכבות שינה).
- **מחלקה שנייה**: זמינה כמושבים או כדרגשי שינה (מזגן או מאוורר); מומלצת מאוד לנסיעות ארוכות.
- **מחלקה שלישית**: ספסלי עץ או ריפוד; זולה מאוד אך מתאימה בעיקר לנסיעות קצרות.
- **הזמנה**: השתמשו במערכת המקוונת **"D-Ticket"** או קנו בתחנת המרכז העירונית "קרונג טפ אפיוואט".

- **אוטובוסים ומיניבוסים**: מגיעים ליעדים שרכבות לא מגיעות אליהם.
- **נסיעות ארוכות**: אוטובוסים של VIP/הממשלה מציעים מושבים נשענים ושירותים. אוטובוסים "אקספרס" זולים יותר עם יותר עצירות.
- **מיניבוסים**: מהירים יותר למסלולים קצרים (למשל, מבנגקוק לפטאיה) אך יכולים להיות צפופים.
- **מסופי בנגקוק**: מו צ'יט (צפון/צפון-מזרח), סאי טאי מאי (דרום) ואקמאי (מזרח).

- **סירות ומעבורות**: חיוניות לנסיעות לאיים.
- **מעבורות**: סירות גדולות למסלולים ראשיים (למשל, קו סמוי, פי פי).
- **סירות מהירות (Speedboats)**: אופציות מהירות יותר לאיים קטנים יותר.
- **סירות ארוכות זנב (Long-tail Boats)**: סירות עץ אייקוניות לשירות מונית חופי או לדילוג בין איים.

---
### תחבורה בתוך בנגקוק
- **מערכות רכבת (רכבת עילית ורכבת תחתית)**: הדרך הטובה ביותר להימנע מפקקי התנועה המפורסמים של בנגקוק.
- **BTS (רכבת עילית)**: קווים מוגבהים המכסים אזורים מרכזיים כמו סוקומוויט, סילום וסיאם.
- **MRT (רכבת תחתית)**: הקו הכחול არის השימושי ביותר לתיירים (מחבר לארמון המלך, וואט פו וצ'יינה טאון).
- **Airport Rail Link (ARL)**: חיבור ישיר מנמל התעופה סוברנבומי למרכז העיר.
- **הערה**: BTS ו-MRT דורשים כרטיסים נפרדים. ניתן להשתמש בכרטיס Rabbit עבור ה-BTS או בכרטיסי אשראי ללא מגע עבור חלק מהקווים.

- **מוניות ואפליקציות נסיעה**:
- **מוניות ציבוריות**: חפשו את השלט "Taxi Meter". התעקשו תמיד להשתמש במונה.
- **אפליקציות (Grab / Bolt / Maxim)**: בטוחות מאוד עם תמחור שקוף. Bolt בדרך כלל זולה יותר, בעוד ל-Grab יש יותר נהגים זמינים.
- **מוניות אופנוע (Win)**: נהגים בווסטים כתומים/אדומים. הדרך המהירה ביותר למרחקים קצרים בשעות העומס אך לא לנסיעות ארוכות.

- **תחבורה במים**:
- **סירת אקספרס צ'או פראיה**: משתמשת בדגלים צבעוניים. הדגל הכחול (סירת תיירים) עוצר במקדשים העיקריים שעל שפת הנהר.
- **סירת תעלת קלונג סאן סאפ**: סירות תעלות המשמשות את המקומיים; זולות ומהירות מאוד לחציית העיר.
- **מעבורת חציית נהר**: סירות קטנות המסיעות אתכם מצד לצד של הנהר (למשל, מוואט פו לוואט ארון) תמורת כ-5 באט.

- **טוק-טוק וסונגתאו**:
- **טוק-טוק**: סמל תאילנדי. אין מונים, לכן נהלו משא ומתן על המחיר לפני העלייה. הכי טוב לנסיעות חווייתיות קצרות. הימנעו מנהגים המציעים "סיורי קניות".
- **סונגתאו**: טנדרים משותפים עם ספסלים. למרות שהם נפוצים בצ'יאנג מאי/פטאיה, הם משרתים גם מסלולים מקומיים ספציפיים בפרברי בנגקוק.

---
### טיפים חיוניים למטיילים
- **שעות העומס**: הימנעו מהדרכים בין 07:00 – 09:30 ובין 16:30 – 19:30. השתמשו ב-BTS/MRT בשעות אלו.
- **ניווט**: השתמשו ב-Google Maps למסלולים מדויקים ובאפליקציית ViaBus למעקב אחר אוטובוסים מקומיים בזמן אמת.
- **תשלום**: שמרו כסף קטן/מטבעות זמינים עבור דמי הנסיעה באוטובוס ומכונות כרטיסי הרכבת.
- **כרטיסים משולבים**: לאיים, חפשו "Joint Tickets" (אוטובוס + מעבורת) דרך סוכנויות או אפליקציות כמו 12Go Asia כדי לפשט את המעברים.
---
## אפליקציות ואתרי אינטרנט מומלצים ללינה בתאילנד
---
כדי למצוא את הלינה המושלמת שמתאימה לצרכים שלך בתאילנד, מומלץ מאוד להשתמש באפליקציות ובאתרי האינטרנט הבאים. להלן פירוט של השירותים ומערכות התשלום שלהם.

### 1. אפליקציות ואתרי הזמנות עיקריים
**Agoda (אפליקציה/אתר)**
- **שירות**: כחברה שבסיסה בתאילנד, היא מציעה את המבחר המקיף ביותר ואת המחירים התחרותיים ביותר למלונות, קונדו ווילות ברחבי המדינה.
- **תכונה מרכזית**: באמצעות "Agoda Homes", משתמשים יכולים לשכור קונדו ובתים פרטיים; הנחות בלעדיות זמינות לעיתים קרובות לחברי VIP.
- **תשלום**: תומך בכרטיסי אשראי/דביט, PayPal ו-Google Pay. חלק מהמלונות מציעים אפשרויות של "הזמן עכשיו, שלם מאוחר יותר" או "תשלום במלון".

**Booking.com (אפליקציה/אתר)**
- **שירות**: בשימוש נרחב בכל העולם, מציע מלונות מכל הרמות ברחבי תאילנד.
- **תכונה מרכזית**: סוגי חדרים רבים מציעים ביטול חינם, המאפשר למשתמשים להזמין ללא תשלום מראש מיידי.
- **תשלום**: בעוד שבדרך כלל נדרש כרטיס אשראי/דביט כערבון, רישומים רבים מאפשרים לבצע את התשלום בפועל באופן אישי (במזומן או בכרטיס) עם ההגעה למלון.

**Airbnb (אפליקציה/אתר)**
- **שירות**: אידיאלי להשכרת יחידות קונדו מקומיות, בתים פרטיים ושהיות בוטיק ייחודיות.
- **תכונה מרכזית**: מושלם למשפחות או לקבוצות המעדיפות חדרים המצוידים במטבחים ואזורי מגורים.
- **תשלום**: דורש תשלום מראש באמצעות כרטיסי אשראי/דביט, Google Pay או PayPal. (הערה: אין אפשרות לתשלום במקום; כל העסקאות מנוהלות דרך האפליקציה).

### 2. השוואת מחירים ואפליקציות אזוריות
**Trip.com**
- **שירות**: למרות שהיא מבוססת בסין, היא מציעה מבצעים תכופים ומשמעותיים למלונות בתאילנד.
- **תשלום**: תומך בכרטיסי אשראי/דביט ובמערכות תשלום בינלאומיות שונות.

**Traveloka**
- **שירות**: פופולרי בכל דרום מזרח אסיה, מאפשר למשתמשים לשלב הזמנות מלונות עם כרטיסי טיסה.
- **תשלום**: תומך בכרטיסי אשראי/דביט ומציע אפשרות ייחודית לתשלום במזומן בשירותי הדלפק של 7-Eleven בתאילנד.

### 3. סיכום השירותים הניתנים
- **הזמנת מלונות**: בדיקה וסינון מלונות בדירוג של כוכב 1 עד 5 כוכבים.
- **דירות שירות**: גישה לחדרים דמויי בית המיועדים לשהות ארוכת טווח.
- **הוסטל/מעונות**: הבטחת השכרת מיטות משתלמת למטיילים בודדים או בתקציב נמוך.
- **זמינות בזמן אמת**: בדיקה מיידית של זמינות חדרים וקריאת ביקורות משתמשים מאומתות.

### 4. מידע פפורט על תשלום
בעת תשלום עבור לינה בתאילנד, אנא זכור את הדברים הבאים:
- **כרטיס אשראי/דביט**: החזקת כרטיס Visa או Mastercard בינלאומי היא השיטה הנוחה ביותר.
- **שירות דלפק**: אם אין לך כרטיס אשראי, אפליקציות כמו Traveloka מאפשרות לך להזמין באינטרנט ולשלם במזומן בכל דלפק 7-Eleven.
- **פיקדון ביטחון**: היה מוכן לשלם פיקדון ביטחון במזומן (בדרך כלל בין 1,000 ל-3,000 באט) עם ההגעה כדי לקבל את מפתחות החדר. זה מוחזר בעת הצ'ק-אאוט.
- **מטבע האפליקציה**: בעת הגלישה באפליקציות, הגדר את מטבע התצוגה לבאט תאילנדי (THB) כדי לראות את התמחור המקומי המדויק ביותר.

### סיכום סופי למטיילים
לקבלת השירות המדויק והמקיף ביותר בתאילנד, מומלץ לתת עדיפות ל-**Agoda** להזמנה ול-**Google Maps** לאימות מיקומי המלונות. יחד, כלים אלה מספקים את הכיסוי הטוב ביותר למטיילים ברחבי המדינה.`
  },
  chinese: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# 泰国交通指南
---
## 交通出行
### 国内旅行（城际交通）
- **国内航班**：远程地区（如从曼谷到清迈或普吉岛）之间最快的旅行方式。
- **主要枢纽**：曼谷的素万那普机场 (BKK) 和廊曼机场 (DMK)。
- **航空公司**：全服务航司（*泰国航空、曼谷航空*）；廉价航司（*泰亚航、皇雀航空、泰狮航*）。
- **小贴士**：提前 2-4 周预订可获得更优惠的价格；检查廉价航空的行李额度。

- **火车 (State Railway of Thailand - SRT)**：连接南北主要城市的一种经济且风景优美的方式。
- **一等座**：私人空调包厢（卧铺火车）。
- **二等座**：提供座位或卧铺（空调或风扇）；长途旅行强烈推荐。
- **三等座**：长木凳或软垫长椅；价格非常便宜，但最适合短途旅行。
- **预订**：使用 **"D-Ticket"** 在线系统或在阿皮瓦中央车站 (Krung Thep Aphiwat Central Terminal) 购买。

- **巴士和面包车 (Minivans)**：可到达火车无法到达的目的地。
- **长途巴士**：VIP/政府巴士提供可调节靠背的座椅和洗手间。长途客车 (Express) 价格更便宜，停靠站更多。
- **面包车 (Minivans)**：在短途路线（如曼谷到芭堤雅）上速度更快，但空间可能比较拥挤。
- **曼谷终端站**：蒙奇站 Mo Chit（北部/东北部）、赛代迈站 Sai Tai Mai（南部）和亿甲迈站 Ekkamai（东部）。

- **船只和渡轮**：海岛旅行必不可少。
- **渡轮**：连接主要路线的大型船只（如苏梅岛、皮皮岛）。
- **快艇 (Speedboats)**：前往较小岛屿的更快选择。
- **长尾船 (Long-tail Boats)**：泰国标志性的木船，用于沿岸出租车服务或跳岛游。

---
### 曼谷市内交通
- **轨道交通（轻轨和地铁）**：避开曼谷著名交通拥堵的最佳方式。
- **BTS (Skytrain)**：高架线路，覆盖素坤逸 (Sukhumvit)、是隆 (Silom) 和暹罗 (Siam) 等主要区域。
- **MRT (Subway)**：蓝线对游客最有用（连接大皇宫、卧佛寺和唐人街）。
- **机场快线 (ARL)**：从素万那普机场直达市中心。
- **注意**：BTS 和 MRT 需要分开购票。您可以使用 Rabbit 卡乘坐 BTS，或在某些线路上使用感应式信用卡。

- **出租车和网约车**：
- **公共出租车**：寻找 "Taxi Meter" 标志。始终坚持打表。
- **应用程序 (Grab / Bolt / Maxim)**：非常安全，价格透明。Bolt 通常更便宜，而 Grab 的可用司机更多。
- **摩托车出租车 (Win)**：穿着橙色/红色马甲的司机。在高峰时段短距离行驶最快，但不适合长途。

- **水路运输**：
- **湄南河快船 (Chao Phraya Express Boat)**：通过不同颜色的旗帜区分。蓝旗（旅游船）停靠在主要的河边寺庙。
- **空盛桑运河快船 (Khlong Saen Saep Boat)**：当地人使用的运河船；横穿城市非常便宜且快速。
- **过河渡轮**：穿梭于河流两岸的小船（如从卧佛寺到黎明寺），票价约 5 泰铢。

- **嘟嘟车 (Tuk-Tuk) 和双条车 (Songthaew)**：
- **嘟嘟车**：泰国的象征。不打表，请在乘车前商定价格。最适合短途新奇体验。避开提供“购物游”的司机。
- **双条车**：带长凳的改装皮卡车。在清迈/芭堤雅很常见，也在曼谷郊区提供特定的当地路线。

---
### 基本旅行贴士
- **避开高峰期**：尽量避开 07:00 – 09:30 和 16:30 – 19:30 的道路交通。这些时段请使用 BTS/MRT。
- **导航工具**：使用 Google Maps 获取准确路线，使用 ViaBus App 实时追踪当地巴士。
- **准备零钱**：随身携带零钱/硬币，用于支付巴士费和火车票自动售票机。
- **联程票**：前往海岛时，可通过旅行社或 12Go Asia 等应用程序寻找“联程票”（巴士+渡轮）以简化转乘。
---
## 泰国住宿推荐应用程序和网站
为了在泰国找到最适合您需求的住宿，强烈推荐以下应用程序和网站。以下是其服务和支付系统的详细分类。

### 1. 主要预订应用程序和网站
**Agoda (应用程序/网站)**
- **服务**：作为一家总部位于泰国的公司，它提供全国范围内最齐全的酒店、公寓和别墅选择，且价格极具竞争力。
- **主要特点**：通过“Agoda Homes”，用户可以租用公寓和私人住宅；VIP会员通常可享受独家折扣。
- **支付**：支持信用卡/借记卡、PayPal 和 Google Pay。部分酒店提供“先预订后付款”或“在酒店付款”选项。

**Booking.com (应用程序/网站)**
- **服务**：全球广泛使用，涵盖泰国各级别的酒店。
- **主要特点**：许多房型提供免费取消，允许用户在不立即预付款的情况下进行预订。
- **支付**：虽然通常需要信用卡/借记卡作为担保，但许多房源允许在抵达酒店时亲自支付（现金或刷卡）。

**Airbnb (应用程序/网站)**
- **服务**：租用当地公寓单位、私人住宅和独特精品住宿的理想选择。
- **主要特点**：非常适合喜欢配备厨房和生活区域的房间的家庭或团体。
- **支付**：需要通过信用卡/借记卡、Google Pay 或 PayPal 预付。（注意：没有“在酒店支付”选项；所有交易均通过应用程序处理）。

### 2. 价格比较和地区性应用程序
**Trip.com (携程)**
- **服务**：虽然总部位于中国，但它经常为泰国境内的酒店提供大幅度促销。
- **支付**：支持信用卡/借记卡和各种国际支付系统。

**Traveloka**
- **服务**：在东南亚非常流行，允许用户将酒店预订与机票捆绑。
- **支付**：支持信用卡/借记卡，并提供通过泰国的 7-Eleven 柜台服务支付现金的独特选项。

### 3. 服务摘要
- **酒店预订**：查看和筛选从 1 星到 5 星级的酒店。
- **服务式公寓**：获取专为长期住宿设计的像家一样的房间。
- **旅馆/宿舍**：为独行或预算有限的旅行者锁定实惠的床位。
- **实时房况**：即时查看房间可用性并阅读经过验证的用户评价。

### 4. 详细支付信息
在泰国支付住宿费用时，请记住以下几点：
- **信用卡/借记卡**：持有国际 Visa 或 Mastercard 是使用预订应用程序最方便的方法。
- **柜台服务**：如果您没有信用卡，Traveloka 等应用程序允许您在线预订并在任何 7-Eleven 柜台支付现金。
- **押金**：抵达时请准备好以现金支付押金（通常在 1,000 至 3,000 泰铢之间）以获取房间钥匙。押金将在退房时退还。
- **应用程序货币**：浏览应用程序时，将显示货币设置为泰铢 (THB) 而非人民币或美元，以查看最准确的本地定价。

### 旅行者最终总结
为了在泰国获得最准确和全面的服务，建议优先使用 **Agoda** 进行预订，并使用 **Google 地图** 验证酒店位置。这些工具共同为全国旅行者提供最佳覆盖。`
  },
  hindi: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# थाईलैंड परिवहन गाइड
---
## यातायात
### घरेलू यात्रा (शहरों के बीच)
- **घरेलू उड़ानें**: दूर के क्षेत्रों (जैसे बैंकॉक से चियांग माई या फुकेत) के बीच यात्रा करने का सबसे तेज़ तरीका।
- **मुख्य केंद्र**: बैंकॉक में सुवर्णभूमि हवाई अड्डा (BKK) और डॉन मुआंग हवाई अड्डा (DMK)।
- **एयरलाइंस**: फुल सर्विस (*थाई एयरवेज, बैंकॉक एयरवेज*); कम लागत (*थाई एयरएशिया, नोक एयर, थाई लायन एयर*)।
- **टिप**: बेहतर दरों के लिए 2-4 सप्ताह पहले बुक करें; बजट एयरलाइंस के लिए सामान की सीमा की जांच करें।

- **ट्रेनें (स्टेट रेलवे ऑफ थाईलैंड - SRT)**: उत्तर से दक्षिण तक प्रमुख शहरों को जोड़ने का एक किफायती और सुंदर तरीका।
- **प्रथम श्रेणी**: निजी एसी केबिन (स्लीपर ट्रेनें)।
- **द्वितीय श्रेणी**: सीटों या स्लीपर बर्थ (एसी या पंखा) के रूप में उपलब्ध; लंबी यात्राओं के लिए अत्यधिक अनुशंसित।
- **तृतीय श्रेणी**: लकड़ी या गद्देदार बेंच; बहुत सस्ता लेकिन छोटी यात्राओं के लिए सबसे अच्छा।
- **बुकिंग**: **"D-Ticket"** ऑनलाइन सिस्टम का उपयोग करें या क्रुंग थेप अपिवाट सेंट्रल टर्मिनल पर खरीदें।

- **बसें और मिनीवैन**: उन गंतव्यों तक पहुँचते हैं जहाँ ट्रेनें नहीं जा सकतीं।
- **लंबी दूरी**: वीआईपी/सरकारी बसें झुकने वाली सीटें और शौचालय प्रदान करती हैं। एक्सप्रेस बसें अधिक स्टॉप के साथ सस्ती होती हैं।
- **मिनीवैन**: छोटे मार्गों (जैसे बैंकॉक से पटाया) के लिए तेज़ लेकिन तंग हो सकती हैं।
- **बैंकॉक टर्मिनल**: मो चिट (उत्तर/पूर्वोत्तर), साई ताई माई (दक्षिण), और एक्कामाई (पूर्व)।

- **नावें और फेरी**: द्वीपों की यात्रा के लिए आवश्यक।
- **फेरी**: मुख्य मार्गों (जैसे कोह सामुई, पी पी) के लिए बड़ी नावें।
- **स्पीडबोट**: छोटे द्वीपों के लिए तेज़ विकल्प।
- **लॉन्ग-टेल बोट्स**: तटीय टैक्सी सेवा या द्वीप भ्रमण के लिए प्रतिष्ठित लकड़ी की नावें।

---
### बैंकॉक शहर परिवहन
- **रेल प्रणाली (स्काई ट्रेन और सबवे)**: बैंकॉक के प्रसिद्ध ट्रैफिक जाम से बचने का सबसे अच्छा तरीका।
- **BTS (स्काईट्रेन)**: सुखुमवित, सिलोम और सियाम जैसे प्रमुख क्षेत्रों को कवर करने वाली एलिवेटेड लाइनें।
- **MRT (सबवे)**: ब्लू लाइन पर्यटकों के लिए सबसे उपयोगी है (ग्रैंड पैलेस, वाट फो और चाइनाटाउन को जोड़ती है)।
- **एयरपोर्ट रेल लिंक (ARL)**: सुवर्णभूमि हवाई अड्डे से शहर के केंद्र तक सीधा कनेक्शन।
- **नोट**: BTS और MRT के लिए अलग टिकटों की आवश्यकता होती है। आप BTS के लिए रैबिट कार्ड या कुछ लाइनों के लिए कॉन्टैक्टलेस क्रेडिट कार्ड का उपयोग कर सकते हैं।

- **टैक्सी और राइड-हेलिंग**:
- **सार्वजनिक टैक्सी**: "टैक्सी मीटर" का साइन देखें। हमेशा मीटर का उपयोग करने पर जोर दें।
- **ऐप्स (Grab / Bolt / Maxim)**: पारदर्शी मूल्य निर्धारण के साथ बहुत सुरक्षित। बोल्ट अक्सर सस्ता होता है, जबकि ग्रैब के पास अधिक ड्राइवर उपलब्ध होते हैं।
- **मोटरबाइक टैक्सी (Win)**: नारंगी/लाल बनियान पहने ड्राइवर। रश ऑवर के दौरान कम दूरी के लिए सबसे तेज़ लेकिन लंबी यात्राओं के लिए नहीं।

- **जल परिवहन**:
- **चाओ फ्या एक्सप्रेस बोट**: रंगीन झंडों का उपयोग करती है। ब्लू फ्लैग (टूरिस्ट बोट) नदी के किनारे के प्रमुख मंदिरों में रुकती है।
- **खलोंг सेन सैप बोट**: स्थानीय लोगों द्वारा उपयोग की जाने वाली नहर की नावें; शहर के आर-पार यात्रा के लिए बहुत सस्ती और तेज़।
- **नदी पार करने वाली फेरी**: छोटी नावें जो आपको लगभग 5 बाट में नदी के दूसरी पार ले जाती हैं (जैसे वाट फो से वाट अरुण)।

- **टुक-टुक और सोंगथैव**:
- **टुक-टुक**: थाईलैंड का प्रतीक। कोई मीटर नहीं, इसलिए बैठने से पहले कीमत तय करें। छोटी रोमांचक सवारी के लिए सबसे अच्छा। "शॉपिंग टूर" की पेशकश करने वाले ड्राइवरों से बचें।
- **सोंगथैव**: बेंचों वाली साझा पिकअप ट्रक। हालांकि चियांग माई/पटाया में आम है, वे बैंकॉक उपनगरों में विशिष्ट स्थानीय मार्गों पर भी चलते हैं।

---
### आवश्यक यात्रा सुझाव
- **भीड़भाड़ का समय**: 07:00 – 09:30 और 16:30 – 19:30 तक सड़कों से बचें। इस दौरान BTS/MRT का उपयोग करें।
- **नेविगेशन**: सटीक मार्गों के लिए Google Maps का उपयोग करें और वास्तविक समय में स्थानीय बसों को ट्रैक करने के लिए ViaBus ऐप का उपयोग करें।
- **भुगतान**: बस किराए और ट्रेन टिकट मशीनों के लिए छोटे बदलाव/सिक्के तैयार रखें।
- **संयुक्त टिकट**: द्वीपों के लिए, स्थानान्तरण को आसान बनाने के लिए एजेंसियों या 12Go Asia जैसे ऐप के माध्यम से "जॉइंट टिकट" (बस + फेरी) देखें।
---
## थाईलैंड में आवास के लिए अनुशंसित ऐप्स और वेबसाइटें
---
थाईलैंड में अपनी ज़रूरतों के अनुसार सटीक आवास खोजने के लिए, निम्नलिखित ऐप्स और वेबसाइटों की अत्यधिक अनुशंसा की जाती है। नीचे उनकी सेवाओं और भुगतान प्रणालियों का विस्तृत विवरण दिया गया है।

### 1. मुख्य बुकिंग ऐप्स और वेबसाइटें
**Agoda (ऐप/वेबसाइट)**
- **सेवा**: थाईलैंड में स्थित कंपनी होने के नाते, यह पूरे देश में होटलों, कोंडो और विला के लिए सबसे व्यापक चयन और प्रतिस्पर्धी कीमतें प्रदान करता है।
- **मुख्य विशेषता**: "Agoda Homes" के माध्यम से, उपयोगकर्ता कोंडो और निजी घर किराए पर ले सकते हैं; वीआईपी सदस्यों के लिए अक्सर विशेष छूट उपलब्ध होती है।
- **भुगतान**: क्रेडिट/डेबिट कार्ड, पेपाल और गूगल पे का समर्थन करता है। कुछ होटल "अभी बुक करें, बाद में भुगतान करें" या "होटल में भुगतान करें" विकल्प प्रदान करते हैं।

**Booking.com (ऐप/वेबसाइट)**
- **सेवा**: दुनिया भर में व्यापक रूप से उपयोग किया जाता है, इसमें पूरे थाईलैंड में सभी स्तरों के होटल शामिल हैं।
- **मुख्य विशेषता**: कई प्रकार के कमरे मुफ्त रद्दीकरण की पेशकश करते हैं, जिससे उपयोगकर्ता बिना किसी तत्काल अग्रिम भुगतान के बुक कर सकते हैं।
- **भुगतान**: हालांकि आमतौर पर गारंटी के रूप में क्रेडिट/डेबिट कार्ड की आवश्यकता होती है, कई लिस्टिंग होटल पहुंचने पर व्यक्तिगत रूप से (नकद या कार्ड) भुगतान करने की अनुमति देती हैं।

**Airbnb (ऐप/वेबसाइट)**
- **सेवा**: स्थानीय कोंडो इकाइयों, निजी घरों और विशिष्ट बुटीक स्टे को किराए पर लेने के लिए आदर्श।
- **मुख्य विशेषता**: उन परिवारों या समूहों के लिए बिल्कुल सही जो रसोई और रहने वाले क्षेत्रों से सुसज्जित कमरों को पसंद करते हैं।
- **भुगतान**: क्रेडिट/डेबिट कार्ड, गूगल पे या पेपाल के माध्यम से अग्रिम भुगतान की आवश्यकता होती है। (नोट: संपत्ति पर भुगतान का कोई विकल्प नहीं है; सभी लेनदेन ऐप के माध्यम से संभाले जाते हैं)।

### 2. मूल्य तुलना और क्षेत्रीय ऐप्स
**Trip.com**
- **सेवा**: हालांकि यह चीन में स्थित है, लेकिन यह थाईलैंड के होटलों के लिए अक्सर महत्वपूर्ण प्रचार प्रदान करता है।
- **भुगतान**: क्रेडिट/डेबिट कार्ड और विभिन्न अंतर्राष्ट्रीय भुगतान प्रणालियों का समर्थन करता है।

**Traveloka**
- **सेवा**: पूरे दक्षिण पूर्व एशिया में लोकप्रिय, यह उपयोगकर्ताओं को हवाई टिकटों के साथ होटल बुकिंग को बंडल करने की अनुमति देता है।
- **भुगतान**: क्रेडिट/डेबिट कार्ड का समर्थन करता है और थाईलैंड में 7-Eleven काउंटर सेवाओं पर नकद भुगतान करने का एक अनूठा विकल्प प्रदान करता है।

### 3. प्रदान की गई सेवाओं का सारांश
- **होटल बुकिंग**: 1-स्टार से 5-स्टार रेटिंग वाले होटलों की जाँच करें और फ़िल्टर करें।
- **सर्विस्ड अपार्टमेंट**: लंबी अवधि के प्रवास के लिए डिज़ाइन किए गए घर जैसे कमरों तक पहुँचें।
- **होस्टल/डॉरमेट्री**: अकेले या बजट यात्रियों के लिए किफायती बिस्तर किराए पर लें।
- **वास्तविक समय उपलब्धता**: तुरंत कमरे की उपलब्धता की जांच करें और सत्यापित उपयोगकर्ता समीक्षाएं पढ़ें।

### 4. विस्तृत भुगतान विवरण
थाईलैंड में आवास के लिए भुगतान करते समय, कृपया निम्नलिखित बातें याद रखें:
- **क्रेडिट/डेबिट कार्ड**: अंतर्राष्ट्रीय वीज़ा या मास्टरकार्ड होना बुकिंग ऐप्स का उपयोग करने का सबसे सुविधाजनक तरीका है।
- **काउंटر सेवा**: यदि आपके पास क्रेडिट कार्ड नहीं है, तो Traveloka जैसे ऐप्स आपको ऑनलाइन बुक करने और किसी भी 7-Eleven काउंटर पर नकद भुगतान करने की अनुमति देते हैं।
- **सुरक्षा जमा (Security Deposit)**: कमरे की चाबियाँ प्राप्त करने के लिए आगमन पर नकद में सुरक्षा जमा (आमतौर पर 1,000 से 3,000 बाट के बीच) का भुगतान करने के लिए तैयार रहें। यह चेक-आउट के समय वापस कर दिया जाता है।
- **ऐप मुद्रा**: ऐप्स ब्राउज़ करते समय, सबसे सटीक स्थानीय मूल्य निर्धारण देखने के लिए प्रदर्शन मुद्रा को अन्य मुद्राओं के बजाय थाई बाट (THB) पर सेट करें।

### यात्रियों के लिए अंतिम सारांश
थाईलैंड में सबसे सटीक और व्यापक सेवा के लिए, बुकिंग के लिए **Agoda** और होटल स्थानों के सत्यापन के लिए **Google Maps** को प्राथमिकता देने की सिफारिश की जाती है। साथ में, ये उपकरण देश भर के यात्रियों के लिए सर्वोत्तम कवरेज प्रदान करते हैं।`
  },
  japanese: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# タイ交通ガイド
---
## 交通手段
### 国内移動（都市間交通）
- **国内線航空便**: 遠隔地間（例：バンコクからチェンマイやプーケット）を移動する最速の方法です。
- **主要ハブ**: バンコクのスワンナプーム空港 (BKK) とドンムアン空港 (DMK)。
- **航空会社**: フルサービス (*タイ国際航空、バンコク・エアウェイズ*); LCC (*タイ・エアアジア、ノックエア、タイ・ライオン・エア*)。
- **ヒント**: 2〜4週間前に予約するとお得です。LCCの場合は手荷物制限を確認してください。

- **鉄道 (タイ国鉄 - SRT)**: 北から南まで主要都市を結ぶ、手頃で景色の良い移動手段です。
- **1等**: 個室エアコン付きキャビン（寝台列車）。
- **2等**: 座席または寝台（エアコン付きまたは扇風機）から選べます。長距離移動に強くおすすめします。
- **3等**: 木製またはクッション付きのベンチ。非常に安いですが、短距離の移動に最適です。
- **予約**: オンラインシステム **「D-Ticket」** を利用するか、クルンテープ・アピワット中央駅で購入できます。

- **バス・ミニバン**: 鉄道が通っていない目的地へ行くことができます。
- **長距離**: VIP・政府バスはリクライニングシートとトイレを完備しています。エクスプレスバスは安価ですが、停車駅が多いです。
- **ミニバン**: 短距離ルート（例：バンコクからパタヤ）では速いですが、車内が狭い場合があります。
- **バンコクのターミナル**: モーチット（北・北東方面）、サイタイマイ（南方面）、エカマイ（東方面）。

- **ボート・フェリー**: 島へ渡るために不可欠です。
- **フェリー**: 主要ルート（例：サムイ島、ピピ島）を結ぶ大型船。
- **スピードボート**: 小さな島へ行くためのより速い選択肢。
- **ロングテールボート**: 海岸沿いのタクシーやアイランドホッピングに利用される象徴的な木製ボート。

---
### バンコク市内の交通
- **鉄道システム（高架鉄道・地下鉄）**: バンコク名物の渋滞を避けるための最良の方法です。
- **BTS (スカイトレイン)**: スクンビット、シーロム、サイアムなどの主要エリアを網羅する高架鉄道。
- **MRT (地下鉄)**: ブルーラインが観光客に最も便利です（王宮、ワット・ポー、チャイナタウンへ接続）。
- **エアポート・レール・リンク (ARL)**: スワンナプーム空港から市内中心部へ直行。
- **注意**: BTSとMRTは別々のチケットが必要です。BTSではラビットカード、一部の路線ではタッチ決済対応のクレジットカードが利用可能です。

- **タクシー・配車アプリ**:
- **公共タクシー**: 「Taxi Meter」の表示を探してください。必ずメーターを使うよう主張しましょう。
- **アプリ (Grab / Bolt / Maxim)**: 明確な料金設定で非常に安全です。Boltの方が安いことが多いですが、Grabの方が車両数が多いです。
- **バイクタクシー (Win)**: オレンジや赤のベストを着たドライバーです。ラッシュ時の短距離移動には最速ですが、長距離には向きません。

- **水上交通**:
- **チャオプラヤー・エクスプレス・ボート**: 旗の色で識別します。青旗（観光船）は川沿いの主要な寺院に停車します。
- **センセープ運河ボート**: 地元の人が利用する運河用ボート。非常に安く、東西の移動に速いです。
- **渡し船**: 川の対岸へ渡るための小さな船（例：ワット・ポーからワット・アルン）で、料金は約5バーツです。

- **トゥクトゥク・ソンテウ**:
- **トゥクトゥク**: タイの象徴。メーターはありません。乗る前に必ず料金を交渉してください。観光気分での短距離移動に最適です。「ショッピングツアー」の勧誘には注意しましょう。
- **ソンテウ**: 荷台を改造した乗合ピックアップトラック。チェンマイやパタヤで一般的ですが、バンコク郊外の特定ルートでも運行されています。

---
### 旅に役立つヒント
- **ラッシュアワー**: 07:00〜09:30と16:30〜19:30の時間帯は道路を避け、BTSやMRTを利用しましょう。
- **ナビゲーション**: 正確なルート検索にはGoogleマップ、路線バスのリアルタイム追跡にはViaBusアプリを活用してください。
- **支払い**: バスや鉄道の券売機のために、少額の紙幣や硬貨を常に用意しておきましょう。
- **ジョイントチケット**: 島へ行く際は、代理店や12Go Asiaなどのアプリで「ジョイントチケット（バス＋フェリー）」を探すと乗り継ぎがスムーズです。
---
## タイの宿泊施設におすすめのアプリとウェブサイト
---
タイであなたのニーズにぴったりの宿泊施設を見つけるために、以下のアプリとウェブサイトを強くおすすめします。それぞれのサービス内容と支払いシステムについて詳しく説明します。

### 1. 主要な予約アプリとウェブサイト
**Agoda (アプリ/ウェブサイト)**
- **サービス**: タイに拠点を置く企業であり、タイ全土のホテル、コンドミニアム、ヴィラの品揃えが最も豊富で、非常に競争力のある価格を提供しています。
- **主な特徴**: 「Agoda Homes」を通じてコンドミニアムや一軒家を借りることができます。VIP会員には限定割引が適用されることが多いです。
- **支払い**: クレジット/デビットカード、PayPal、Google Payに対応しています。一部のホテルでは「今すぐ予約、後で支払い」や「現地払い」のオプションがあります。

**Booking.com (アプリ/ウェブサイト)**
- **サービス**: 世界中で広く利用されており、タイ全土のあらゆるレベルのホテルを網羅しています。
- **主な特徴**: 多くの部屋タイプで無料キャンセルが可能で、事前の支払いなしで予約できるものが多いです。
- **支払い**: 通常、保証としてクレジット/デビットカードが必要ですが、到着時にホテルで直接（現金またはカードで）支払える物件も多数あります。

**Airbnb (アプリ/ウェブサイト)**
- **サービス**: 地元のコンドミニアム、一軒家、ユニークなブティックステイのレンタルに最適です。
- **主な特徴**: キッチンやリビング付きの部屋を好む家族やグループに最適です。
- **支払い**: クレジット/デビットカード、Google Pay、またはPayPalによる事前支払いが必要です（注：現地払いのオプションはなく、すべての取引はアプリを通じて行われます）。

### 2. 価格比較および地域限定アプリ
**Trip.com**
- **サービス**: 中国に拠点を置いていますが、タイ国内のホテルに対して頻繁に大幅なプロモーションを行っています。
- **支払い**: クレジット/デビットカードおよび様々な国際決済システムに対応しています。

**Traveloka**
- **サービス**: 東南アジア全域で人気があり、ホテルの予約と航空券をセットで予約できます。
- **支払い**: クレジット/デビットカードに対応しており、タイ国内のセブンイレブンのカウンターサービスで現金で支払えるユニークなオプションもあります。

### 3. 提供サービスのまとめ
- **ホテル予約**: 1つ星から5つ星までのホテルを検索・絞り込み。
- **サービスアパートメント**: 長期滞在向けのアパートのような部屋を利用可能。
- **ホステル/ドミトリー**: 一人旅や低予算旅行者向けの安価なベッドを予約。
- **リアルタイムの空室照会**: 即座に空室を確認し、認証済みユーザーのレビューを確認可能。

### 4. 支払いの詳細情報
タイで宿泊料金を支払う際は、以下の点に注意してください。
- **クレジット/デビットカード**: 国際的なVisaやMastercardを持っているのが、予約アプリを利用する上で最も便利です。
- **カウンターサービス**: クレジットカードを持っていない場合、Travelokaなどのアプリではオンラインで予約し、セブンイレブンのカウンターで現金で支払うことができます。
- **保証金（デポジット）**: チェックイン時に、部屋の鍵を受け取るための保証金（通常1,000〜3,000バーツ程度）を現金で用意しておいてください。これはチェックアウト時に返金されます。
- **アプリの通貨設定**: アプリを閲覧する際は、表示通貨を他の通貨ではなくタイバーツ（THB）に設定すると、最も正確な現地価格が表示されます。

### 旅行者へのまとめ
タイで最も正確かつ包括的なサービスを利用するには、宿泊予約には **Agoda** を、ホテルの場所の確認には **Googleマップ** を優先的に使用することをおすすめします。これらを組み合わせることで、タイ全土をカバーする最高の旅行ツールとなります。`
  },
  korean: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# 태국 교통 가이드
---
## 교통수단
### 국내 여행 (도시 간 이동)
- **국내선 항공**: 먼 지역 간(예: 방콕~치앙마이 또는 푸켓)을 이동하는 가장 빠른 방법입니다.
- **주요 허브**: 방콕의 수완나품 공항(BKK) 및 돈므앙 공항(DMK).
- **국내 항공사**: 풀 서비스(*타이항공, 방콕에어웨이즈*); 저비용 항공사(*타이 에어아시아, 녹에어, 타이 라이온 에어*).
- **팁**: 더 저렴한 요금을 위해 2~4주 전에 예약하세요. 저가 항공사의 수하물 규정을 확인하세요.

- **기차 (태국 국영 철도 - SRT)**: 북쪽에서 남쪽까지 주요 도시를 연결하는 저렴하고 경치가 좋은 이동 수단입니다.
- **1등석**: 개인 에어컨 객실(침대 열차).
- **2등석**: 좌석 또는 침대 칸(에어컨 또는 선풍기)으로 이용 가능하며, 장거리 여행 시 강력 추천합니다.
- **3등석**: 나무 또는 쿠션 벤치 좌석입니다. 매우 저렴하지만 단거리 여행에 가장 적합합니다.
- **예약**: **"D-Ticket"** 온라인 시스템을 이용하거나 끄룽텝 아피왓 중앙역에서 구매하세요.

- **버스 및 미니밴**: 기차가 닿지 않는 목적지까지 운행합니다.
- **장거리**: VIP/정부 버스는 등받이 조절 좌석과 화장실을 갖추고 있습니다. 익스프레스 버스는 더 저렴하지만 정차역이 많습니다.
- **미니밴**: 단거리 노선(예: 방콕~파타야)에서 더 빠르지만 내부가 좁을 수 있습니다.
- **방콕 터미널**: 모칫(북부/북동부), 사이타이마이(남부), 에카마이(동부).

- **보트 및 페리**: 섬 여행 시 필수적입니다.
- **페리**: 주요 노선(예: 코사무이, 피피섬)을 연결하는 대형 선박입니다.
- **스피드보트**: 작은 섬으로 가는 더 빠른 옵션입니다.
- **롱테일 보트**: 해안 택시 서비스나 아일랜드 호핑에 사용되는 태국의 상징적인 나무 보트입니다.

---
### 방콕 시내 교통
- **철도 시스템(지상철 및 지하철)**: 방콕의 악명 높은 교통 체증을 피하는 가장 좋은 방법입니다.
- **BTS (지상철)**: 수쿰윗, 실롬, 시암 등 주요 지역을 통과하는 고가 철도입니다.
- **MRT (지하철)**: 블루 라인이 관광객에게 가장 유용합니다(왕궁, 왓 포, 차이나타운 연결).
- **공항철도 (ARL)**: 수완나품 공항에서 시내 중심가까지 직통으로 연결됩니다.
- **참고**: BTS와 MRT는 별도의 티켓이 필요합니다. BTS는 래빗 카드를, 일부 노선은 비접촉식 신용카드를 사용할 수 있습니다.

- **택시 및 호출 앱**:
- **공공 택시**: "Taxi Meter" 표시를 확인하세요. 항상 미터기 사용을 요청하세요.
- **앱 (Grab / Bolt / Maxim)**: 투명한 가격 정책으로 매우 안전합니다. 볼트(Bolt)가 더 저렴한 경우가 많고, 그랩(Grab)은 배차 가능한 차량이 더 많습니다.
- **오토바이 택시 (Win)**: 주황색/빨간색 조끼를 입은 운전사입니다. 출퇴근 시간 단거리 이동에 가장 빠르지만 장거리에는 적합하지 않습니다.

- **수상 교통**:
- **짜오프라야 익스프레스 보트**: 깃발 색상으로 구분합니다. 파란색 깃발(관광 보트)은 강변의 주요 사원에 정차합니다.
- **클롱 샌셉 운하 보트**: 현지인들이 이용하는 운하 보트로, 도시를 가로지르는 데 매우 저렴하고 빠릅니다.
- **강 횡단 페리**: 약 5바트 정도에 강 건너편(예: 왓 포에서 왓 아룬)으로 데려다주는 작은 배입니다.

- **뚝뚝 및 썽태우**:
- **뚝뚝**: 태국의 상징입니다. 미터기가 없으므로 탑승 전 가격을 협상하세요. 짧은 거리의 이색 체험에 좋습니다. "쇼핑 투어"를 제안하는 운전사는 피하세요.
- **썽태우**: 벤치가 있는 공유 픽업트럭입니다. 치앙마이나 파타야에서 흔히 볼 수 있으며, 방콕 외곽의 특정 현지 노선도 운행합니다.

---
### 필수 여행 팁
- **러시아워**: 07:00 – 09:30 및 16:30 – 19:30 시간대에는 도로 주행을 피하고 BTS/MRT를 이용하세요.
- **네비게이션**: 정확한 경로를 위해 Google 지도를 이용하고, 현지 버스의 실시간 위치 확인을 위해 ViaBus 앱을 사용하세요.
- **결제**: 버스 요금 및 기차표 자동판매기를 위해 소액권과 동전을 준비해 두세요.
- **조인트 티켓**: 섬으로 갈 때는 12Go Asia와 같은 앱이나 여행사를 통해 "조인트 티켓(버스 + 페리)"을 구매하면 환승이 편리합니다.
---
## 태국 숙소 예약을 위한 추천 앱 및 웹사이트
---
태국에서 귀하의 필요에 맞는 완벽한 숙소를 찾기 위해 다음 앱과 웹사이트를 강력히 추천합니다. 각 서비스와 결제 시스템에 대한 상세 공유입니다.

### 1. 주요 예약 앱 및 웹사이트
**Agoda (앱/웹사이트)**
- **서비스**: 태국에 기반을 둔 회사로, 태국 전역의 호텔, 콘도, 빌라에 대해 가장 광범위한 선택지와 경쟁력 있는 가격을 제공합니다.
- **주요 특징**: "Agoda Homes"를 통해 콘도 및 개인 주택을 렌트할 수 있으며, VIP 회원에게는 독점 할인이 제공되는 경우가 많습니다.
- **결제**: 신용/체크카드, PayPal, Google Pay를 지원합니다. 일부 호텔은 "지금 예약, 나중 결제" 또는 "숙소에서 결제" 옵션을 제공합니다.

**Booking.com (앱/웹사이트)**
- **서비스**: 전 세계적으로 널리 사용되며, 태국 전역의 모든 등급의 호텔을 갖추고 있습니다.
- **주요 특징**: 많은 객실 유형이 무료 취소를 제공하므로 즉각적인 선결제 없이 예약할 수 있습니다.
- **결제**: 일반적으로 보증을 위해 신용/체크카드가 필요하지만, 많은 숙소에서 도착 시 현장에서 직접(현금 또는 카드) 결제할 수 있도록 허용합니다.

**Airbnb (앱/웹사이트)**
- **서비스**: 현지 콘도 유닛, 개인 주택 및 독특한 부티크 숙소를 렌트하는 데 이상적입니다.
- **주요 특징**: 주방과 거실 공간이 갖춰진 객실을 선호하는 가족이나 단체에 적합합니다.
- **결제**: 신용/체크카드, Google Pay 또는 PayPal을 통한 선결제가 필요합니다. (참고: 현장 결제 옵션은 없으며 모든 거래는 앱을 통해 처리됩니다).

### 2. 가격 비교 및 지역 앱
**Trip.com**
- **서비스**: 중국에 본사를 두고 있지만, 태국 내 호텔에 대해 빈번하고 큰 프로모션을 제공합니다.
- **결제**: 신용/체크카드 및 다양한 국제 결제 시스템을 지원합니다.

**Traveloka**
- **서비스**: 동남아시아 전역에서 인기가 있으며, 호텔 예약과 항공권을 묶어서 예약할 수 있습니다.
- **결제**: 신용/체크카드를 지원하며, 태국의 세븐일레븐 카운터 서비스에서 현금으로 결제할 수 있는 독특한 옵션을 제공합니다.

### 3. 제공 서비스 요약
- **호텔 예약**: 1성급부터 5성급까지 호텔 확인 및 필터링.
- **서비스 아파트**: 장기 체류를 위해 설계된 집 같은 객실 이용.
- **호스텔/도미토리**: 나홀로 여행객이나 예산 여행객을 위한 저렴한 침대 렌트 확보.
- **실시간 예약 가능 여부**: 즉시 객실 가용성을 확인하고 인증된 사용자 리뷰를 읽을 수 있습니다.

### 4. 상세 결제 정보
태국에서 숙박 시설 요금을 결제할 때 다음 사항을 유의하세요.
- **신용/체크카드**: 국제 Visa 또는 Mastercard를 소지하는 것이 예약 앱을 사용하는 가장 편리한 방법입니다.
- **카운터 서비스**: 신용카드가 없는 경우, Traveloka와 같은 앱을 통해 온라인으로 예약하고 태국 내 모든 세븐일레븐 카운터에서 현금으로 결제할 수 있습니다.
- **보증금 (Deposit)**: 체크인 시 객실 열쇠를 받기 위해 현금으로 보증금(보통 1,000~3,000바트 사이)을 지불할 준비를 하세요. 이는 체크아웃 시 환불됩니다.
- **앱 통화**: 앱을 둘러볼 때 가장 정확한 현지 가격을 확인하려면 표시 통화를 다른 통화가 아닌 태국 바트(THB)로 설정하세요.

### 여행자를 위한 최종 요약
태국에서 가장 정확하고 포괄적인 서비스를 받으려면 예약 시 **Agoda**를, 호텔 위치 확인 시 **Google 지도**를 우선적으로 사용하는 것이 좋습니다. 이 도구들을 함께 사용하면 태국 전역의 여행자들에게 최고의 커버리지는 제공합니다.`
  },
  thai: {
    serviceName: 'รายละเอียดการเดินทางในประเทศไทย',
    grabBolt: {
      title: 'Grab & Bolt (แอปเรียกรถ)',
      items: [
        'Grab: แอปที่น่าเชื่อถือและใช้กันแพร่หลายที่สุดในไทย มีทั้งรถยนต์ แท็กซี่ และมอเตอร์ไซค์',
        'Bolt: มักจะราคาถูกว่า Grab ยอดนิยมมากในกรุงเทพฯ ภูเก็ต และเชียงใหม่',
        'การชำระเงิน: ทั้งสองแอปมักรับเงินสดหรือบัตรเครดิต',
        'เคล็ดลับ: ตรวจสอบจุดรับบนแผนที่เสมอเพื่อให้แน่ใจว่าถูกต้อง'
      ]
    },
    btsMrt: {
      title: 'BTS (รถไฟฟ้า) & MRT (รถไฟใต้ดิน)',
      schedule: 'เวลาทำการ: 06:00 - 24:00 น. ทุกวัน',
      tips: [
        'ชั่วโมงเร่งด่วน: 07:30-09:30 และ 16:30-19:30 (รถไฟอาจหนาแน่นมาก)',
        'ตั๋ว: มีจำหน่ายแบบเที่ยวเดียว แนะนำบัตร Rabbit (BTS) และบัตร MRT สำหรับการใช้งานบ่อย',
        'การเปลี่ยนสาย: BTS และ MRT เป็นคนละระบบกัน คุณต้องออกจากระบบหนึ่งเพื่อเข้าอีกระบบหนึ่ง'
      ]
    },
    intercity: {
      trains: {
        title: 'รถไฟระหว่างเมือง',
        items: [
          'การรถไฟแห่งประเทศไทย (SRT): เชื่อมต่อกรุงเทพฯ ไปยังภาคเหนือ อีสาน และใต้',
          'ชั้นที่นั่ง: ชั้น 1 (ตู้นอน), ชั้น 2 (ตู้นอน/ที่นั่ง), และชั้น 3 (พัดลม/ไม้ - เหมาะสำหรับงบประหยัด)',
          'การจอง: แนะนำให้จองผ่านเว็บไซต์ D-Ticket สำหรับเส้นทางระยะไกล'
        ]
      },
      buses: {
        title: 'รถทัวร์ระหว่างจังหวัด',
        items: [
          'บริษัท ขนส่ง จำกัด (บขส.): บริการรถโดยสารสาธารณะของรัฐ',
          'สถานีขนส่ง: หมอชิต (เหนือ/อีสาน), เอกมัย (ตะวันออก), สายใต้ใหม่ (ใต้)',
          'รถ VIP: แนะนำเป็นอย่างยิ่งสำหรับการเดินทางไกล (มีพื้นที่วางขาและอาหารว่าง)'
        ]
      },
      flights: {
        title: 'ข้อมูลเที่ยวบิน',
        items: [
          'สุวรรณภูมิ (BKK): ศูนย์กลางระหว่างประเทศและเที่ยวบินในประเทศ (การบินไทย, บางกอกแอร์เวย์ส)',
          'ดอนเมือง (DMK): ศูนย์กลางสายการบินราคาประหยัด (แอร์เอเชีย, นกแอร์, ไทยไลอ้อนแอร์)',
          'การเชื่อมต่อ: มีรถบัสรับส่งฟรีระหว่าง BKK และ DMK สำหรับผู้โดยสารที่มีตั๋ว'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'สิ่งที่ควรทำ',
        items: [
          'สวมหน้ากากอนามัยในขนส่งสาธารณะที่หนาแน่น (เป็นที่ชื่นชมมาก)',
          'สละที่นั่งให้พระสงฆ์ คนชรา หญิงมีครรภ์ และเด็ก',
          'พกธนบัตรย่อย/เหรียญไว้เสมอสำหรับขนส่งท้องถิ่น'
        ]
      },
      donts: {
        title: 'สิ่งที่ไม่ควรทำ',
        items: [
          'ห้ามรับประทานอาหารหรือดื่มน้ำบน BTS/MRT',
          'อย่าเหยียบประตูเมื่อประตูกำลังปิด',
          'อย่าต่อรองราคากับแท็กซี่มิเตอร์ (ให้แน่ใจว่าเปิดมิเตอร์เสมอ)'
        ]
      }
    },
    fullGuideMarkdown: `# คู่มือการเดินทางในประเทศไทย
---
## การคมนาคม
### การเดินทางภายในประเทศ (ระหว่างเมือง)
- **เที่ยวบินภายในประเทศ**: วิธีที่เร็วที่สุดในการเดินทางระหว่างภูมิภาคที่ห่างไกล (เช่น กรุงเทพฯ ไปเชียงใหม่ หรือภูเก็ต)
- **ศูนย์กลางหลัก**: สนามบินสุวรรณภูมิ (BKK) และสนามบินดอนเมือง (DMK) ในกรุงเทพฯ
- **สายการบิน**: Full Service (*การบินไทย, บางกอกแอร์เวย์ส*); Low-Cost (*ไทยแอร์เอเชีย, นกแอร์, ไทยไลอ้อนแอร์*)
- **เคล็ดลับ**: จองล่วงหน้า 2–4 สัปดาห์เพื่อให้ได้ราคาที่ดีกว่า ตรวจสอบน้ำหนักกระเป๋าสำหรับสายการบินราคาประหยัด

- **รถไฟ (การรถไฟแห่งประเทศไทย - รฟท.)**: วิธีที่ประหยัดและได้ชมทัศนียภาพเพื่อเชื่อมต่อเมืองหลักจากเหนือจรดใต้
- **ชั้น 1**: ตู้นอนปรับอากาศส่วนตัว (รถด่วนพิเศษ)
- **ชั้น 2**: มีทั้งแบบนั่งและแบบนอน (ปรับอากาศหรือพัดลม) แนะนำอย่างยิ่งสำหรับการเดินทางไกล
- **ชั้น 3**: รถนั่งพัดลม (เบาะไม้หรือเบาะนวม) ราคาถูกมาก เหมาะสำหรับการเดินทางระยะสั้น
- **การจอง**: ใช้ระบบออนไลน์ **"D-Ticket"** หรือซื้อที่สถานีกลางกรุงเทพอภิวัฒน์

- **รถทัวร์และรถตู้**: เข้าถึงจุดหมายปลายทางที่รถไฟไปไม่ถึง
- **รถทางไกล**: รถ VIP/บขส. มีเบาะเอนนอนและห้องน้ำในตัว รถ Express ราคาถูกกว่าแต่จอดบ่อยกว่า
- **รถตู้**: เร็วกว่าสำหรับเส้นทางระยะสั้น (เช่น กรุงเทพฯ ไปพัทยา) แต่อาจจะคับแคบ
- **สถานีขนส่งในกรุงเทพฯ**: หมอชิต (เหนือ/อีสาน), สายใต้ใหม่ (ใต้) และเอกมัย (ตะวันออก)

- **เรือและเรือเฟอร์รี่**: สิ่งจำเป็นสำหรับการเดินทางไปเกาะ
- **เรือเฟอร์รี่**: เรือลำใหญ่สำหรับเส้นทางหลัก (เช่น เกาะสมุย, เกาะพีพี)
- **เรือสปีดโบ๊ท**: ทางเลือกที่เร็วกว่าสำหรับเกาะขนาดเล็ก
- **เรือหางยาว**: เรือไม้ที่เป็นเอกลักษณ์สำหรับการรับส่งเลียบชายฝั่งหรือเที่ยวรอบเกาะ

---
### การเดินทางในกรุงเทพฯ
- **ระบบรถไฟฟ้า (รถไฟฟ้าบนดินและใต้ดิน)**: วิธีที่ดีที่สุดในการหลีกเลี่ยงรถติดที่มีชื่อเสียงของกรุงเทพฯ
- **BTS (รถไฟฟ้า)**: สายรถไฟฟ้าบนดินครอบคลุมพื้นที่สำคัญ เช่น สุขุมวิท, สีลม และสยาม
- **MRT (รถไฟใต้ดิน)**: สายสีน้ำเงินมีประโยชน์มากที่สุดสำหรับนักท่องเที่ยว (เชื่อมต่อไปยังพระบรมมหาราชวัง, วัดโพธิ์ และเยาวราช)
- **Airport Rail Link (ARL)**: เชื่อมต่อโดยตรงจากสนามบินสุวรรณภูมิเข้าสู่ใจกลางเมือง
- **หมายเหตุ**: BTS และ MRT ใช้ตั๋วแยกกัน คุณสามารถใช้บัตร Rabbit สำหรับ BTS หรือบัตรเครดิต Contactless สำหรับบางสายได้

- **รถแท็กซี่และแอปเรียกรถ**:
- **รถแท็กซี่สาธารณะ**: สังเกตป้าย "Taxi Meter" และควรยืนยันให้คนขับเปิดมิเตอร์ทุกครั้ง
- **แอปพลิเคชัน (Grab / Bolt / Maxim)**: ปลอดภัยมากพร้อมราคาที่โปร่งใส Bolt มักจะถูกกว่า ในขณะที่ Grab มีคนขับให้บริการมากกว่า
- **รถมอเตอร์ไซค์รับจ้าง (วิน)**: สังเกตเสื้อกั๊กสีส้ม/แดง เร็วที่สุดสำหรับการเดินทางระยะสั้นในช่วงเวลาเร่งด่วน แต่ไม่เหมาะกับการเดินทางไกล

- **การคมนาคมทางน้ำ**:
- **เรือด่วนเจ้าพระยา**: สังเกตจากสีธง ธงสีฟ้า (เรือท่องเที่ยว) จะจอดตามวัดสำคัญริมน้ำ
- **เรือคลองแสนแสบ**: เรือคลองที่คนในพื้นที่ใช้ ราคาถูกและเร็วมากสำหรับการเดินทางข้ามเมือง
- **เรือข้ามฟาก**: เรือลำเล็กที่รับส่งข้ามฝั่งแม่น้ำ (เช่น วัดโพธิ์ ไป วัดอรุณ) ราคาประมาณ 5 บาท

- **ตุ๊กตุ๊กและรถสองแถว**:
- **ตุ๊กตุ๊ก**: สัญลักษณ์ของประเทศไทย ไม่มีมิเตอร์ ดังนั้นควรตกลงราคาก่อนขึ้น เหมาะสำหรับการนั่งชมวิวระยะสั้น หลีกเลี่ยงคนขับที่เสนอ "ช้อปปิ้งทัวร์"
- **รถสองแถว**: รถกระบะดัดแปลงที่มีที่นั่งสองแถว พบได้ทั่วไปในเชียงใหม่/พัทยา และยังมีให้บริการในเส้นทางท้องถิ่นในย่านชานเมืองกรุงเทพฯ

---
### เคล็ดลับการเดินทางที่สำคัญ
- **ชั่วโมงเร่งด่วน**: หลีกเลี่ยงการเดินทางบนถนนในช่วงเวลา 07:00 – 09:30 และ 16:30 – 19:30 ให้ใช้ BTS/MRT แทน
- **การนำทาง**: ใช้ Google Maps สำหรับเส้นทางที่แม่นยำ และแอป ViaBus เพื่อติดตามรถเมล์ท้องถิ่นแบบเรียลไทม์
- **การชำระเงิน**: เตรียมเงินย่อย/เหรียญให้พร้อมสำหรับค่ารถเมล์และตู้ขายตั๋วรถไฟ
- **ตั๋วร่วม**: สำหรับการไปเกาะ ให้มองหา "Joint Tickets" (รถบัส + เรือ) ผ่านเอเจนซี่หรือแอปเช่น 12Go Asia เพื่อความสะดวกในการต่อรถ`,
    appsGuideMarkdown: `# แอปพลิเคชันและเว็บไซต์ที่จำเป็นสำหรับการเดินทางในประเทศไทย
---
เพื่อให้การเดินทางในประเทศไทยเป็นไปอย่างราบรื่น แอปพลิเคชันและเว็บไซต์ต่อไปนี้เป็นสิ่งจำเป็น ด้านล่างนี้คือรายละเอียดของบริการและช่องทางการชำระเงิน

## 1. แอปเรียกรถ (รถยนต์และรถจักรยานยนต์)
### Grab
- **บริการ**: มีความน่าเชื่อถือที่สุด ครอบคลุมทั้งรถยนต์ รถจักรยานยนต์ ส่งอาหาร และส่งพัสดุ
- **การชำระเงิน**: เงินสด, บัตรเครดิต/เดบิต และ GrabPay Wallet
### Bolt
- **บริการ**: ให้บริการคล้ายกับ Grab แต่มักเป็นที่นิยมเนื่องจากราคาที่ประหยัดกว่า
- **การชำระเงิน**: ส่วนใหญ่เป็นเงินสด แต่รองรับบัตรเครดิต/เดบิตในบางกรณี
### Maxim
- **บริการ**: มักจะเป็นตัวเลือกที่ถูกที่สุดสำหรับการเรียกรถ แต่อาจเป็นรถรุ่นเก่า
- **การชำระเงิน**: เงินสดเท่านั้น
### Line Man
- **บริการ**: เน้นการส่งอาหารเป็นหลัก แต่ก็มีบริการ "Taxi" (เรียกแท็กซี่มิเตอร์ทั่วไป)
- **การชำระเงิน**: เงินสด หรือ Rabbit Line Pay

---
## 2. แอปและเว็บไซต์จองการเดินทาง (ระหว่างจังหวัด)
### 12Go Asia
- **บริการ**: แพลตฟอร์มหลักสำหรับการจองรถไฟ รถบัส เรือเฟอร์รี่ และรถรับส่งส่วนตัวทั่วไทย
- **การชำระเงิน**: บัตรเครดิต/เดบิต, PayPal และ Thai QR Payment
### D-Ticket (การรถไฟแห่งประเทศไทย)
- **บริการ**: แอปอย่างเป็นทางการสำหรับจองตั๋วรถไฟทางไกลโดยตรงกับการรถไฟแห่งประเทศไทย
- **การชำระเงิน**: บัตรเครดิต/เดบิต และ Thai QR Payment

---
## 3. เครื่องมือนำทางและขนส่งสาธารณะ
### Google Maps
- **จำเป็นสำหรับ**: อัปเดตจราจรแบบเรียลไทม์, เส้นทางเดินเท้า และตรวจสอบสายรถเมล์ในกรุงเทพฯ
### ViaBus
- **บริการ**: แอปติดตามรถเมล์แบบเรียลไทม์สำหรับกรุงเทพฯ และหลายจังหวัด แสดงตำแหน่งรถบนแผนที่

---
## 4. แอปพลิเคชันสายการบิน (เที่ยวบินในประเทศ)
- **AirAsia**, **Nok Air**, **Thai Lion Air**
- **คำแนะนำ**: ดาวน์โหลดแอปไว้เพื่อเช็คอินออนไลน์และใช้ Boarding Pass ดิจิทัล

---
## 5. สรุปวิธีการชำระเงินในประเทศไทย
- **เงินสด**: จำเป็นเสมอสำหรับสตรีทฟู้ด ตลาดนัด และขนส่งท้องถิ่นขนาดเล็ก
- **QR Payment (PromptPay)**: คนไทยใช้กันอย่างแพร่หลาย *หมายเหตุ: แอปธนาคารต่างชาติส่วนใหญ่ยังสแกนไม่ได้*
- **EMV (Contactless)**: สามารถแตะบัตรเครดิต/เดบิตต่างชาติบนเครื่องกั้น MRT และรถเมล์สีแดงบางสายในกรุงเทพฯ ได้โดยตรง

---
 ---
 
 ## แอปพลิเคชันและเว็บไซต์ที่แนะนำสำหรับที่พักในประเทศไทย
เพื่อค้นหาที่พักที่ตรงกับความต้องการของคุณในประเทศไทย ขอแนะนำแอปพลิเคชันและเว็บไซต์ต่อไปนี้ พร้อมรายละเอียดการบริการและระบบการชำระเงิน

### 1. แอปพลิเคชันและเว็บไซต์จองที่พักหลัก
**Agoda (แอป/เว็บไซต์)**
- **บริการ**: ในฐานะบริษัทที่มีฐานอยู่ในประเทศไทย มีตัวเลือกที่ครอบคลุมที่สุดและราคาที่คุ้มค่าที่สุดสำหรับโรงแรม คอนโด และวิลล่าทั่วประเทศ
- **คุณสมบัติเด่น**: ผ่าน "Agoda Homes" ผู้ใช้สามารถเช่าคอนโดและบ้านส่วนตัวได้ โดยมักจะมีส่วนลดพิเศษสำหรับสมาชิก VIP
- **การชำระเงิน**: รองรับบัตรเครดิต/เดบิต, PayPal และ Google Pay โรงแรมบางแห่งมีตัวเลือก "จองตอนนี้ จ่ายทีหลัง" หรือ "จ่ายที่โรงแรม"

**Booking.com (แอป/เว็บไซต์)**
- **บริการ**: มีการใช้งานอย่างแพร่หลายทั่วโลก ครอบคลุมโรงแรมทุกระดับทั่วประเทศไทย
- **คุณสมบัติเด่น**: ห้องพักหลายประเภทมีตัวเลือกยกเลิกฟรี ช่วยให้จองได้โดยไม่ต้องชำระเงินล่วงหน้าทันที
- **การชำระเงิน**: แม้ว่ามักจะต้องใช้บัตรเครดิต/เดบิตเพื่อค้ำประกัน แต่หลายแห่งอนุญาตให้ชำระเงินจริงได้ด้วยตนเอง (เงินสดหรือบัตร) เมื่อเช็คอิน

**Airbnb (แอป/เว็บไซต์)**
- **บริการ**: เหมาะสำหรับการเช่าคอนโด บ้านส่วนตัว และที่พักสไตล์บูติกที่มีเอกลักษณ์
- **คุณสมบัติเด่น**: เหมาะสำหรับครอบครัวหรือกลุ่มที่ชอบห้องพักที่มีห้องครัวและห้องนั่งเล่น
- **การชำระเงิน**: ต้องชำระเงินล่วงหน้าผ่านบัตรเครดิต/เดบิต, Google Pay หรือ PayPal (หมายเหตุ: ไม่มีตัวเลือกจ่ายที่พัก ธุรกรรมทั้งหมดทำผ่านแอป)

### 2. แอปเปรียบเทียบราคาและแอปในภูมิภาค
**Trip.com**
- **บริการ**: แม้จะมีฐานในจีน แต่มีโปรโมชั่นพิเศษและบ่อยครั้งสำหรับโรงแรมในไทย
- **การชำระเงิน**: รองรับบัตรเครดิต/เดบิตและระบบการชำระเงินระหว่างประเทศต่างๆ

**Traveloka**
- **บริการ**: ยอดนิยมในเอเชียตะวันออกเฉียงใต้ ช่วยให้ผู้ใช้จองโรงแรมพร้อมตั๋วเครื่องบินได้แบบแพ็กเกจ
- **การชำระเงิน**: รองรับบัตรเครดิต/เดบิต และมีตัวเลือกพิเศษในการชำระเงินด้วยเงินสดที่เคาน์เตอร์เซอร์วิสใน 7-Eleven ในไทย

### 3. สรุปบริการที่มีให้
- **การจองโรงแรม**: ตรวจสอบและคัดกรองโรงแรมตั้งแต่ 1 ดาว ถึง 5 ดาว
- **เซอร์วิสอพาร์ตเมนต์**: เข้าถึงห้องพักที่เหมือนบ้านสำหรับการพักระยะยาว
- **โฮสเทล/หอพัก**: จองเตียงราคาประหยัดสำหรับนักเดินทางคนเดียวหรือผู้มีงบจำกัด
- **สถานะว่างแบบเรียลไทม์**: ตรวจสอบห้องว่างได้ทันทีและอ่านรีวิวจากผู้ใช้จริง

### 4. รายละเอียดการชำระเงิน
เมื่อชำระค่าที่พักในประเทศไทย โปรดคำนึงถึงสิ่งต่อไปนี้:
- **บัตรเครดิต/เดบิต**: การมีบัตร Visa หรือ Mastercard ต่างประเทศเป็นวิธีที่สะดวกที่สุดในการใช้แอปจอง
- **เคาน์เตอร์เซอร์วิส**: หากคุณไม่มีบัตรเครดิต แอปอย่าง Traveloka ให้คุณจองออนไลน์และจ่ายเงินสดได้ที่เคาน์เตอร์ 7-Eleven ทุกสาขา
- **เงินประกัน**: เตรียมเงินสดสำหรับค่าประกัน (ปกติ 1,000 ถึง 3,000 บาท) เมื่อเช็คอิน ซึ่งจะได้รับคืนเมื่อเช็คเอาท์
- **สกุลเงินในแอป**: เมื่อใช้งานแอป ให้ตั้งค่าสกุลเงินเป็นบาท (THB) เพื่อดูราคาที่แม่นยำที่สุด

### สรุปสำหรับนักเดินทาง
เพื่อบริการที่แม่นยำและครอบคลุมที่สุดในไทย ขอแนะนำให้ใช้ **Agoda** สำหรับการจอง และ **Google Maps** เพื่อตรวจสอบตำแหน่งที่ตั้งโรงแรม

---
## 6. อุปกรณ์จำเป็นสำหรับนักเดินทาง
1. **Google Maps** (นำทาง)
2. **Grab/Bolt** (เรียกรถ)
3. **12Go Asia** (จองการเดินทาง)
4. **Google Translate** (การสื่อสาร)
5. **สภาพอากาศ: ประเทศไทย**
6. **สกุลเงิน (THB)**`

  },
  malay: {
    serviceName: 'Butiran Pengangkutan di Thailand',
    grabBolt: {
      title: 'Perkhidmatan E-Hailing Grab & Bolt',
      items: [
        'Grab: Aplikasi paling dipercayai dan banyak digunakan di Thailand. Menawarkan kereta, teksi, dan motosikal.',
        'Bolt: Selalunya lebih murah daripada Grab, sangat popular di Bangkok, Phuket, dan Chiang Mai.',
        'Pembayaran: Kedua-duanya menyokong tunai atau kad kredit (melalui aplikasi).',
        'Petua: Sentiasa semak tempat pengambilan pada peta untuk memastikan ketepatan.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Bawah Tanah)',
      schedule: 'Waktu Operasi: 06:00 - 24:00 setiap hari.',
      tips: [
        'Waktu Puncak: 07:30-09:30 dan 16:30-19:30 (Kereta api boleh menjadi sangat sesak).',
        'Tiket: Token/kad perjalanan tunggal tersedia di stesen. Kad Rabbit (BTS) dan Kad MRT disyorkan untuk penggunaan kerap.',
        'Pertukaran: BTS dan MRT adalah sistem berasingan; anda mesti keluar dari satu untuk memasuki yang lain.'
      ]
    },
    intercity: {
      trains: {
        title: 'Kereta Api Domestik',
        items: [
          'Kereta Api Negeri Thailand (SRT): Menghubungkan Bangkok ke Utara, Timur Laut, dan Selatan.',
          'Kelas: ke-1 (Tidur), ke-2 (Tidur/Duduk), dan ke-3 (Bangku kayu - bajet).',
          'Tempahan: Disyorkan untuk menempah melalui laman web D-Ticket untuk laluan jarak jauh.'
        ]
      },
      buses: {
        title: 'Bas Ekspres Lebuhraya',
        items: [
          'Transport Co. (BKS): Perkhidmatan bas rasmi kerajaan.',
          'Terminal: Mo Chit (Utara), Ekkamai (Timur), Terminal Bas Selatan (Sai Tai Mai).',
          'Bas VIP: Sangat disyorkan untuk perjalanan jauh (ruang kaki tambahan dan snek).'
        ]
      },
      flights: {
        title: 'Maklumat Penerbangan',
        items: [
          'Suvarnabhumi (BKK): Hab antarabangsa utama dan penerbangan domestik perkhidmatan penuh (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Hab syarikat penerbangan kos rendah utama (AirAsia, Nok Air, Thai Lion Air).',
          'Pertukaran: Bas ulang-alik percuma beroperasi antara BKK dan DMK untuk penumpang dengan tiket yang sah.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Perkara Perlu Dilakukan',
        items: [
          'Pakai pelitup muka dalam pengangkutan awam yang sesak (sangat dihargai).',
          'Berikan tempat duduk anda kepada sami, warga emas, wanita hamil, dan kanak-kanak.',
          'Sentiasa bawa wang kertas kecil/syiling untuk pengangkutan tempatan.'
        ]
      },
      donts: {
        title: 'Perkara Dielakkan',
        items: [
          'Jangan makan atau minum di dalam BTS/MRT.',
          'Jangan memijak pintu semasa ia sedang ditutup.',
          'Jangan merunding harga dengan teksi bermeter (pastikan mereka menghidupkan meter).'
        ]
      }
    },
    fullGuideMarkdown: `# Panduan Komprehensif Pengangkutan di Thailand
---
## 1. Pilihan Pengangkutan & Infrastruktur

### Transit Massa Bangkok (Dalam bandar)
Untuk mengelakkan kesesakan lalu lintas Bangkok yang terkenal, gunakan sistem rel:
- **BTS Skytrain**: *Sesuai untuk sampai ke pusat bandar dan pusat beli-belah utama. Gunakan **Rabbit Card** untuk kemudahan.*
- **MRT Subway**: *Menghubungkan ke kawasan yang berbeza daripada BTS. Anda boleh membayar terus menggunakan **Kad Kredit/Debit Tanpa Sentuh (sistem EMV)**.*
- **Airport Rail Link (ARL)**: *Laluan terpantas dari Lapangan Terbang Suvarnabhumi (BKK) ke dalam bandar.*

### E-Hailing & Teksi
- **Aplikasi (Grab / Bolt / Maxim)**: *Sangat disyorkan* kerana harga adalah telus dan ditentukan terlebih dahulu. **Grab** adalah yang paling banyak digunakan, manakala **Bolt** sering menawarkan kadar yang lebih rendah.
- **Teksi Bermeter**: Tersedia untuk ditahan di jalan. **Sentiasa bertegas untuk "Meter Please."** Berhati-hati pada waktu malam atau semasa hujan.

### Pengangkutan Tradisional & Tempatan
- **Tuk-Tuk**: *Pengalaman ikonik Thailand.* **Runding harga sebelum menaiki**, kerana ia boleh menjadi lebih mahal daripada teksi.
- **Teksi Motosikal (Win)**: Dikenali melalui vest oren. *Terpantas untuk mengelakkan kesesakan lalu lintas*, tetapi utamakan keselamatan.

---

## 2. Panduan Tempahan: Cara Membeli Tiket

### Platform Dalam Talian Sehenti
- **12Go.asia**: *Platform paling popular di Thailand* untuk membandingkan harga dan tempoh untuk kereta api, bas, dan feri.
- **Klook / Baolau**: Cemerlang untuk menempah tiket dan pemindahan lapangan terbang.

### Kaedah Tempahan Khusus
- **Kereta api**: Tempah melalui **laman web/aplikasi D-Ticket** (sehingga 90 hari lebih awal) atau di kaunter stesen. *Passport diperlukan.*
- **Bas**: Beli di kaunter terminal, **laman web Transport Co., Ltd**, atau melalui **Perkhidmatan Kaunter 7-Eleven**.

---

## 3. Perkara Perlu Dilakukan dan Dielakkan oleh Pengembara

### Yang Perlu Dilakukan
- **Sahkan Meter**: Sentiasa periksa jika meter teksi dihidupkan.
- **Runding Dahulu**: Untuk Tuk-Tuk atau Motosikal, *setuju pada harga* sebelum bergerak.
- **Gunakan Teknologi**: Bergantung pada **Google Maps** untuk nombor bas yang tepat.

### Yang Perlu Dielakkan
- **Jangan Runding Melampau**: Walaupun berunding adalah perkara biasa, *elakkan tawar-menawar yang agresif*.
- **Hormati Sami**: Jangan duduk di **"Tempat Duduk Sami"** yang dikhaskan di dalam bas atau kereta api.
- **Jaga Kaki Anda**: *Jangan sesekali meletakkan kaki anda di atas tempat duduk* atau menggunakannya untuk menunjuk objek.

---

## 4. Persediaan & Keselamatan
- **Cuaca**: Thailand panas. Bawa air dan pelindung matahari.
- **Nombor Kecemasan**: Dail **1155** untuk *Polis Pelancong*.
- **Keselamatan Bagasi**: Simpan barang berharga dalam beg bawaan tangan dalam perjalanan semalam.
---
## Aplikasi dan Laman Web Penginapan yang Disyorkan untuk Thailand
---
Untuk mencari penginapan sempurna yang sesuai dengan keperluan anda di Thailand, aplikasi dan laman web berikut amat disyorkan. Di bawah adalah perincian terperinci tentang perkhidmatan dan sistem pembayaran mereka.

### 1. Aplikasi dan Laman Web Tempahan Utama
**Agoda (Aplikasi/Laman Web)**
- **Perkhidmatan**: Sebagai syarikat yang berpangkalan di Thailand, ia menawarkan pilihan yang paling komprehensif dan harga yang kompetitif untuk hotel, kondo, dan vila di seluruh negara.
- **Ciri Utama**: Melalui "Agoda Homes," pengguna boleh menyewa kondo dan rumah persendirian; diskaun eksklusif sering tersedia untuk ahli VIP.
- **Pembayaran**: Menyokong Kad Kredit/Debit, PayPal, dan Google Pay. Sesetengah hotel menawarkan pilihan "Tempah Sekarang, Bayar Kemudian" atau "Pay at Hotel".

**Booking.com (Aplikasi/Laman Web)**
- **Perkhidmatan**: Digunakan secara meluas di seluruh dunia, ia menampilkan semua peringkat hotel di seluruh Thailand.
- **Ciri Utama**: Banyak jenis bilik menawarkan Pembatalan Percuma, membolehkan pengguna membuat tempahan tanpa bayaran pendahuluan segera.
- **Pembayaran**: Walaupun Kad Kredit/Debit biasanya diperlukan sebagai jaminan, banyak senarai membolehkan pembayaran sebenar dibuat secara peribadi (Tunai atau Kad) semasa ketibaan di hotel.

**Airbnb (Aplikasi/Laman Web)**
- **Perkhidmatan**: Sesuai untuk menyewa unit kondo tempatan, rumah persendirian, dan penginapan butik yang unik.
- **Ciri Utama**: Sesuai untuk keluarga atau kumpulan yang lebih suka bilik yang dilengkapi dengan dapur dan ruang tamu.
- **Pembayaran**: Memerlukan bayaran pendahuluan melalui Kad Kredit/Debit, Google Pay, atau PayPal. (Nota: Tiada pilihan "Pay at property"; semua transaksi diuruskan melalui aplikasi).

### 2. Perbandingan Harga dan Aplikasi Serantau
**Trip.com**
- **Perkhidmatan**: Walaupun berpangkalan di China, ia sering menawarkan promosi yang ketara untuk hotel di Thailand.
- **Pembayaran**: Menyokong Kad Kredit/Debit dan pelbagai sistem pembayaran antarabangsa.

**Traveloka**
- **Perkhidmatan**: Popular di seluruh Asia Tenggara, ia membolehkan pengguna menggabungkan tempahan hotel dengan tiket penerbangan.
- **Pembayaran**: Menyokong Kad Kredit/Debit dan menawarkan pilihan unik untuk membayar tunai di perkhidmatan kaunter 7-Eleven di Thailand.

### 3. Ringkasan Perkhidmatan yang Disediakan
- **Tempahan Hotel**: Semak dan tapis hotel dari penarafan 1 bintang hingga 5 bintang.
- **Servis Apartmen**: Akses bilik seperti rumah yang direka untuk penginapan jangka panjang.
- **Hostel/Asrama**: Tempah katil mampu milik untuk pengembara solo atau bajet.
- **Ketersediaan Masa Nyata**: Semak ketersediaan bilik serta-merta dan baca ulasan pengguna yang terverifikasi.

### 4. Maklumat Pembayaran Terperinci
Apabila membayar untuk penginapan di Thailand, sila ingat perkara berikut:
- **Kad Kredit/Debit**: Mempunyai Visa atau Mastercard antarabangsa adalah kaedah yang paling mudah.
- **Perkhidmatan Kaunter**: Jika anda tidak mempunyai kad kredit, aplikasi seperti Traveloka membolehkan anda membuat tempahan dalam talian dan membayar tunai di mana-mana kaunter 7-Eleven.
- **Deposit Keselamatan**: Bersedia untuk membayar deposit keselamatan secara Tunai (biasanya antara 1,000 hingga 3,000 Baht) semasa ketibaan untuk menerima kunci bilik. Ini akan dikembalikan semasa daftar keluar.
- **Mata Wang Aplikasi**: Semasa melayari aplikasi, tetapkan mata wang paparan kepada Baht Thailand (THB) untuk melihat harga tempatan yang paling tepat.

### Ringkasan Akhir untuk Pengembara
Untuk perkhidmatan yang paling tepat dan komprehensif di Thailand, disyorkan untuk mengutamakan **Agoda** untuk tempahan dan **Google Maps** untuk mengesahkan lokasi hotel. Bersama-sama, alatan ini menyediakan perlindungan terbaik untuk pengembara di seluruh negara.`,
    appsGuideMarkdown: `# Aplikasi & Alat Penting untuk Thailand
---
Untuk pengembaraan yang lancar di Thailand, aplikasi dan laman web berikut adalah penting. Berikut adalah perincian perkhidmatan dan sistem pembayaran mereka.

## 1. Aplikasi E-Hailing (Kereta & Motosikal)
### Grab
- **Perkhidmatan**: Paling dipercayai untuk kereta, motosikal, penghantaran makanan dan bungkusan.
- **Pembayaran**: Tunai, Kad Kredit/Debit dan dompet GrabPay.
### Bolt
- **Perkhidmatan**: Serupa dengan Grab tetapi sering digemari kerana kadar yang lebih rendah.
- **Pembayaran**: Terutamanya tunai, walaupun kad juga diterima.

---
## 2. Aplikasi Tempahan (Perjalanan Antara Bandar)
### 12Go Asia
- **Perkhidmatan**: Platform utama untuk menempah kereta api, bas, dan feri di seluruh Thailand.
### D-Ticket (State Railway of Thailand)
- **Perkhidmatan**: Aplikasi rasmi untuk menempah tiket kereta api jarak jauh secara terus dengan keretapi kebangsaan.

---
## 3. Alat Navigasi & Transit Awam
### Google Maps
- **Penting Untuk**: Trafik masa nyata, navigasi berjalan kaki, dan menyemak nombor bas di Bangkok.
### ViaBus
- **Perkhidmatan**: Penjejakan bas masa nyata untuk Bangkok dan kawasan lain.

---
## 4. Aplikasi Syarikat Penerbangan (Laluan Domestik)
- **AirAsia**, **Nok Air**, **Thai Lion Air**

---
## 5. Ringkasan Sistem Pembayaran di Thailand
- **Tunai**: Sentiasa diperlukan untuk makanan jalanan, pasar, dan pengangkutan kecil.
- **PromptPay (QR)**: Digunakan secara meluas oleh penduduk tempatan.
- **EMV (Contactless)**: Kad antarabangsa boleh digunakan terus di MRT dan beberapa bas Bangkok.

---
## 6. Toolkit Penting Pengembara
1. **Google Maps** (Navigasi)
2. **Grab/Bolt** (E-Hailing)
3. **12Go Asia** (Tempahan Perjalanan)
4. **Google Translate** (Komunikasi)

---
## Aplikasi dan Laman Web Penginapan yang Disyorkan untuk Thailand
---
Untuk mencari penginapan sempurna yang sesuai dengan keperluan anda di Thailand, aplikasi dan laman web berikut amat disyorkan. Di bawah adalah perincian terperinci tentang perkhidmatan dan sistem pembayaran mereka.

### 1. Aplikasi dan Laman Web Tempahan Utama
**Agoda (Aplikasi/Laman Web)**
- **Perkhidmatan**: Sebagai syarikat yang berpangkalan di Thailand, ia menawarkan pilihan yang paling komprehensif dan harga yang kompetitif untuk hotel, kondo, dan vila di seluruh negara.
- **Pembayaran**: Kad Kredit/Debit, PayPal, dan Google Pay.

**Booking.com (Aplikasi/Laman Web)**
- **Perkhidmatan**: Hotel di seluruh dunia dan Thailand.
- **Pembayaran**: Kad Kredit/Debit (biasanya untuk jaminan), bayar di premis.

**Airbnb (Aplikasi/Laman Web)**
- **Perkhidmatan**: Kondominium dan rumah persendirian.
- **Pembayaran**: Bayaran pendahuluan melalui aplikasi.

### 2. Perbandingan Harga dan Aplikasi Regionally
**Trip.com**
- **Perkhidmatan**: Promosi hebat untuk hotel di Thailand.

**Traveloka**
- **Perkhidmatan**: Tiket penerbangan + hotel, bayar tunai di 7-Eleven Thailand.
`
  },
  indonesian: {
    serviceName: 'Rincian Transportasi di Thailand',
    grabBolt: {
      title: 'Grab & Bolt (Aplikasi Transportasi Online)',
      items: [
        'Grab: Aplikasi paling andalan dan banyak digunakan di Thailand. Menyediakan mobil, taksi, dan motor.',
        'Bolt: Seringkali lebih murah daripada Grab, sangat populer di Bangkok, Phuket, dan Chiang Mai.',
        'Pembayaran: Keduanya mendukung tunai atau kartu kredit (melalui aplikasi).',
        'Tips: Selalu cek titik jemput di peta untuk memastikan keakuratan.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Subway)',
      schedule: 'Jam Operasional: 06:00 - 24:00 setiap hari.',
      tips: [
        'Jam Sibuk: 07:30-09:30 dan 16:30-19:30 (Kereta bisa sangat ramai).',
        'Tiket: Token/kartu perjalanan tunggal tersedia di stasiun. Kartu Rabbit (BTS) dan Kartu MRT direkomendasikan untuk penggunaan sering.',
        'Transfer: BTS dan MRT adalah sistem yang berbeda; Anda harus keluar dari satu sistem untuk masuk ke sistem lainnya.'
      ]
    },
    intercity: {
      trains: {
        title: 'Kereta Api Domestik',
        items: [
          'State Railway of Thailand (SRT): Menghubungkan Bangkok ke Utara, Timur Laut, dan Selatan.',
          'Kelas: Kelas 1 (Tidur), Kelas 2 (Tidur/Duduk), dan Kelas 3 (Bangku kayu - hemat).',
          'Pemesanan: Direkomendasikan pesan melalui situs D-Ticket untuk rute jarak jauh.'
        ]
      },
      buses: {
        title: 'Bus Ekspres Jalan Raya',
        items: [
          'Transport Co. (BKS): Layanan bus resmi pemerintah.',
          'Terminal: Mo Chit (Utara), Ekkamai (Timur), Terminal Bus Selatan (Sai Tai Mai).',
          'Bus VIP: Sangat direkomendasikan untuk perjalanan jauh (ruang kaki ekstra dan camilan).'
        ]
      },
      flights: {
        title: 'Informasi Penerbangan',
        items: [
          'Suvarnabhumi (BKK): Hub internasional utama dan penerbangan domestik layanan lengkap (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Hub utama maskapai bertarif rendah (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: Bus jemputan gratis beroperasi antara BKK dan DMK untuk penumpang dengan tiket yang valid.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Hal yang Harus Dilakukan',
        items: [
          'Gunakan masker di transportasi umum yang ramai (sangat dihargai).',
          'Berikan kursi Anda kepada biksu, lansia, wanita hamil, dan anak-anak.',
          'Selalu siapkan uang kecil/koin untuk transportasi lokal.'
        ]
      },
      donts: {
        title: 'Hal yang Tidak Boleh Dilakukan',
        items: [
          'Dilarang makan atau minum di BTS/MRT.',
          'Jangan mengganjal pintu saat sedang menutup.',
          'Jangan bernegosiasi harga dengan taksi argo (pastikan mereka menyalakan argo).'
        ]
      }
    },
    fullGuideMarkdown: `# Panduan Transportasi di Thailand
---
## Transportasi
### Perjalanan Domestik (Antar Kota)
- **Penerbangan Domestik**: Cara tercepat untuk bepergian antar wilayah yang jauh (misalnya, dari Bangkok ke Chiang Mai atau Phuket).
- **Hub Utama**: Bandara Suvarnabhumi (BKK) dan Bandara Don Mueang (DMK) di Bangkok.
- **Maskapai**: Layanan Lengkap (*Thai Airways, Bangkok Airways*); Berbiaya Rendah (*Thai AirAsia, Nok Air, Thai Lion Air*).
- **Tips**: Pesan 2–4 minggu sebelumnya untuk harga yang lebih baik; periksa batas bagasi untuk maskapai bertarif rendah.

- **Kereta Api (State Railway of Thailand - SRT)**: Cara yang terjangkau dan indah untuk menghubungkan kota-kota besar dari Utara ke Selatan.
- **Kelas 1**: Kabin AC pribadi (kereta tidur).
- **Kelas 2**: Tersedia sebagai kursi atau tempat tidur (AC atau Kipas); sangat direkomendasikan untuk perjalanan jauh.
- **Kelas 3**: Bangku kayu atau empuk; sangat murah tetapi terbaik untuk perjalanan jarak pendek.
- **Pemesanan**: Gunakan sistem online **"D-Ticket"** atau beli di Terminal Pusat Krung Thep Aphiwat.

- **Bus & Minivan**: Menjangkau destinasi yang tidak dilalui kereta api.
- **Jarak Jauh**: Bus VIP/Pemerintah menawarkan kursi sandar dan toilet. Bus "Express" lebih murah dengan lebih banyak pemberhentian.
- **Minivan**: Lebih cepat untuk rute pendek (misalnya, Bangkok ke Pattaya) tetapi bisa terasa sempit.
- **Terminal Bangkok**: Mo Chit (Utara/Timur Laut), Sai Tai Mai (Selatan), dan Ekkamai (Timur).

- **Kapal & Feri**: Penting untuk perjalanan ke pulau.
- **Feri**: Kapal besar untuk rute utama (misalnya, Koh Samui, Phi Phi).
- **Speedboat**: Opsi yang lebih cepat untuk pulau-pulau yang lebih kecil.
- **Perahu Ekor Panjang (Long-tail Boats)**: Perahu kayu ikonik untuk layanan taksi pantai atau antar pulau.

---
### Transportasi Kota Bangkok
- **Sistem Kereta (Skytrain & Subway)**: Cara terbaik untuk menghindari kemacetan lalu lintas Bangkok yang terkenal.
- **BTS (Skytrain)**: Jalur layang yang mencakup area utama seperti Sukhumvit, Silom, dan Siam.
- **MRT (Subway)**: Jalur Biru adalah yang paling berguna bagi wisatawan (terhubung ke Grand Palace, Wat Pho, dan Chinatown).
- **Airport Rail Link (ARL)**: Koneksi langsung dari Bandara Suvarnabhumi ke pusat kota.
- **Catatan**: BTS dan MRT memerlukan tiket yang berbeda. Anda dapat menggunakan Kartu Rabbit untuk BTS atau kartu kredit contactless untuk beberapa jalur.

- **Taksi & Aplikasi Transportasi Online**:
- **Taksi Publik**: Cari tanda "Taxi Meter". Selalu tegaskan untuk menggunakan meteran.
- **Aplikasi (Grab / Bolt / Maxim)**: Sangat aman dengan harga yang transparan. Bolt biasanya lebih murah, sementara Grab memiliki lebih banyak pengemudi yang tersedia.
- **Taksi Motor (Win)**: Pengemudi dengan rompi oranye/merah. Tercepat untuk jarak pendek selama jam sibuk tetapi bukan untuk perjalanan jauh.

- **Transportasi Air**:
- **Perahu Ekspres Chao Phraya**: Menggunakan bendera berwarna. Bendera Biru (Situs Wisata) berhenti di kuil-kuil utama di tepi sungai.
- **Perahu Kanal Khlong Saen Saep**: Perahu kanal yang digunakan oleh penduduk lokal; sangat murah dan cepat untuk melintasi kota.
- **Feri Penyeberangan Sungai**: Perahu kecil yang membawa Anda menyeberang sungai (misalnya, dari Wat Pho ke Wat Arun) dengan biaya sekitar 5 Baht.

- **Tuk-Tuk & Songthaew**:
- **Tuk-Tuk**: Ikon Thailand. Tidak ada meteran, jadi negosiasikan harga sebelum naik. Terbaik untuk perjalanan singkat yang menyenangkan. Hindari pengemudi yang menawarkan "tur belanja".
- **Songthaew**: Truk pikap bersama dengan bangku. Meskipun umum di Chiang Mai/Pattaya, mereka juga melayani rute lokal tertentu di pinggiran kota Bangkok.

---
### Tips Perjalanan Penting
- **Jam Sibuk**: Hindari jalan raya antara pukul 07:00 – 09:30 dan 16:30 – 19:30. Gunakan BTS/MRT pada jam-jam tersebut.
- **Navigasi**: Gunakan Google Maps untuk rute yang akurat dan Aplikasi ViaBus untuk melacak bus lokal secara real-time.
- **Pembayaran**: Siapkan uang kecil/koin untuk tarif bus dan mesin tiket kereta api.
- **Tiket Terusan**: Untuk ke pulau, cari "Joint Tickets" (Bus + Feri) melalui agen atau aplikasi seperti 12Go Asia untuk memudahkan transfer.
---
## Aplikasi dan Situs Web Penginapan yang Direkomendasikan di Thailand
---
Untuk menemukan penginapan sempurna yang sesuai dengan kebutuhan Anda di Thailand, aplikasi dan situs web berikut sangat direkomendasikan. Berikut adalah rincian detail mengenai layanan dan sistem pembayaran mereka.

### 1. Aplikasi dan Situs Web Pemesanan Utama
**Agoda (Aplikasi/Situs Web)**
- **Layanan**: Sebagai perusahaan yang berbasis di Thailand, Agoda menawarkan pilihan terlengkap dan harga yang kompetitif untuk hotel, kondominium, dan vila di seluruh negeri.
- **Fitur Utama**: Melalui "Agoda Homes", pengguna dapat menyewa kondominium dan rumah pribadi; diskon eksklusif sering kali tersedia untuk anggota VIP.
- **Pembayaran**: Mendukung Kartu Kredit/Debit, PayPal, dan Google Pay. Beberapa hotel menawarkan pilihan "Pesan Sekarang, Bayar Nanti" atau "Bayar di Hotel".

**Booking.com (Aplikasi/Situs Web)**
- **Layanan**: Digunakan secara luas di seluruh dunia, mencakup semua level hotel di seluruh Thailand.
- **Fitur Utama**: Banyak tipe kamar menawarkan Pembatalan Gratis, memungkinkan pengguna untuk memesan tanpa pembayaran di muka segera.
- **Pembayaran**: Meskipun biasanya memerlukan Kartu Kredit/Debit sebagai jaminan, banyak daftar properti memungkinkan pembayaran dilakukan secara langsung (Tunai atau Kartu) saat tiba di hotel.

**Airbnb (Aplikasi/Situs Web)**
- **Layanan**: Ideal untuk menyewa unit kondominium lokal, rumah pribadi, dan penginapan butik yang unik.
- **Fitur Utama**: Sangat cocok bagi keluarga atau grup yang lebih menyukai kamar yang dilengkapi dengan dapur dan ruang tamu.
- **Pembayaran**: Memerlukan pembayaran di muka melalui Kartu Kredit/Debit, Google Pay, atau PayPal. (Catatan: Tidak ada pilihan bayar di tempat; semua transaksi ditangani melalui aplikasi).

### 2. Perbandingan Harga dan Aplikasi Regional
**Trip.com**
- **Layanan**: Meskipun berbasis di Tiongkok, Trip.com sering menawarkan promosi besar-besaran untuk hotel-hotel di Thailand.
- **Pembayaran**: Mendukung Kartu Kredit/Debit dan berbagai sistem pembayaran internasional lainnya.

**Traveloka**
- **Layanan**: Populer di seluruh Asia Tenggara, memungkinkan pengguna untuk paket pemesanan hotel dengan tiket pesawat.
- **Pembayaran**: Mendukung Kartu Kredit/Debit dan menawarkan opsi unik untuk membayar secara tunai di layanan konter 7-Eleven di Thailand.

### 3. Ringkasan Layanan yang Disediakan
- **Pemesanan Hotel**: Cek dan filter hotel mulai dari bintang 1 hingga bintang 5.
- **Serviced Apartments**: Akses ke kamar seperti rumah yang dirancang untuk masa inap jangka panjang.
- **Hostel/Asrama**: Amankan sewa tempat tidur yang terjangkau bagi pelancong solo atau dengan anggaran terbatas.
- **Ketersediaan Real-Time**: Cek ketersediaan kamar secara instan dan baca ulasan pengguna yang terverifikasi.

### 4. Informasi Detail Pembayaran
Saat membayar akomodasi di Thailand, harap ingat poin-poin berikut:
- **Kartu Kredit/Debit**: Memiliki Visa atau Mastercard internasional adalah metode yang paling nyaman.
- **Counter Service**: Jika Anda tidak memiliki kartu kredit, aplikasi seperti Traveloka memungkinkan Anda memesan secara online dan membayar tunai di konter 7-Eleven mana pun.
- **Uang Jaminan**: Bersiaplah untuk membayar uang jaminan dalam bentuk tunai (biasanya antara 1.000 hingga 3.000 Baht) saat tiba untuk menerima kunci kamar. Uang ini akan dikembalikan saat Anda check-out.
- **Mata Uang Aplikasi**: Saat mencari di aplikasi, atur mata uang tampilan ke Baht Thailand (THB) untuk melihat harga lokal yang paling akurat.

### Ringkasan Akhir untuk Wisatawan
Untuk layanan yang paling akurat dan komprehensif di Thailand, disarankan untuk memprioritaskan **Agoda** untuk pemesanan dan **Google Maps** untuk memverifikasi lokasi hotel. Bersama-sama, alat-alat ini memberikan cakupan terbaik bagi wisatawan di seluruh Thailand.`
  },
  vietnamese: {
    serviceName: 'Chi tiết Giao thông tại Thái Lan',
    grabBolt: {
      title: 'Dịch vụ Đặt xe Grab & Bolt',
      items: [
        'Grab: Ứng dụng đáng tin cậy và được sử dụng rộng rãi nhất ở Thái Lan. Cung cấp xe hơi, taxi và xe máy.',
        'Bolt: Thường rẻ hơn Grab, rất phổ biến ở Bangkok, Phuket và Chiang Mai.',
        'Thanh toán: Cả hai đều hỗ trợ tiền mặt hoặc thẻ tín dụng (qua ứng dụng).',
        'Mẹo: Luôn kiểm tra điểm đón trên bản đồ để đảm bảo độ chính xác.'
      ]
    },
    btsMrt: {
      title: 'BTS (Tàu điện trên cao) & MRT (Tàu điện ngầm)',
      schedule: 'Giờ hoạt động: 06:00 - 24:00 hàng ngày.',
      tips: [
        'Giờ cao điểm: 07:30-09:30 và 16:30-19:30 (Tàu có thể rất đông đúc).',
        'Vé: Thẻ/xu chuyến đơn có sẵn tại các ga. Thẻ Rabbit (BTS) và Thẻ MRT được khuyên dùng cho nhu cầu đi lại thường xuyên.',
        'Chuyển tuyến: BTS và MRT là hai hệ thống riêng biệt; bạn phải ra khỏi hệ thống này để vào hệ thống kia.'
      ]
    },
    intercity: {
      trains: {
        title: 'Tàu hỏa Nội địa',
        items: [
          'Đường sắt Quốc gia Thái Lan (SRT): Kết nối Bangkok với miền Bắc, miền Đông Bắc và miền Nam.',
          'Các hạng: Hạng 1 (Giường nằm), Hạng 2 (Giường nằm/Ghế ngồi) và Hạng 3 (Ghế gỗ - giá rẻ).',
          'Đặt vé: Khuyên dùng đặt qua trang web D-Ticket cho các tuyến đường dài.'
        ]
      },
      buses: {
        title: 'Xe khách Đường dài',
        items: [
          'Transport Co. (BKS): Dịch vụ xe khách chính thức của chính phủ.',
          'Bến xe: Mo Chit (miền Bắc), Ekkamai (miền Đông), Southern Bus Terminal (Sai Tai Mai - miền Nam).',
          'Xe VIP: Rất khuyên dùng cho các hành trình dài (chỗ để chân rộng rãi và đồ ăn nhẹ).'
        ]
      },
      flights: {
        title: 'Thông tin Chuyến bay',
        items: [
          'Suvarnabhumi (BKK): Trung tâm quốc tế chính và các chuyến bay nội địa đầy đủ dịch vụ (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Trung tâm chính của các hãng hàng không giá rẻ (AirAsia, Nok Air, Thai Lion Air).',
          'Chuyển tuyến: Có xe buýt đưa đón miễn phí hoạt động giữa BKK và DMK cho hành khách có vé hợp lệ.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Nên làm',
        items: [
          'Đeo khẩu trang trên phương tiện giao thông công cộng đông người (rất được trân trọng).',
          'Nhường chỗ cho nhà sư, người già, phụ nữ mang thai và trẻ em.',
          'Luôn mang theo tiền lẻ/tiền xu cho giao thông địa phương.'
        ]
      },
      donts: {
        title: 'Không nên làm',
        items: [
          'Không ăn uống trên tàu BTS/MRT.',
          'Không bước lên cửa khi cửa đang đóng.',
          'Không mặc cả giá với taxi chạy mét (đảm bảo họ đã bật mét).'
        ]
      }
    },
    fullGuideMarkdown: `# Hướng dẫn Toàn diện về Giao thông tại Thái Lan
---
## 1. Các Tùy chọn Giao thông & Cơ sở hạ tầng

### Giao thông Công cộng Bangkok (Nội đô)
Để tránh tình trạng tắc đường khét tiếng của Bangkok, hãy sử dụng hệ thống đường sắt:
- **BTS Skytrain**: *Lý tưởng để đến trung tâm thành phố và các trung tâm mua sắm lớn. Sử dụng **Thẻ Rabbit** để thuận tiện hơn.*
- **MRT Subway**: *Kết nối đến các khu vực khác với BTS. Bạn có thể thanh toán trực tiếp bằng **Thẻ Tín dụng/Ghi nợ Không tiếp xúc (hệ thống EMV)**.*
- **Airport Rail Link (ARL)**: *Tuyến đường nhanh nhất từ Sân bay Suvarnabhumi (BKK) vào thành phố.*

### Gọi xe công nghệ & Taxi
- **Ứng dụng (Grab / Bolt / Maxim)**: *Rất được khuyên dùng* vì giá cả minh bạch và được xác định trước. **Grab** được sử dụng rộng rãi nhất, trong khi **Bolt** thường có mức giá thấp hơn.
- **Taxi có mét (Metered Taxi)**: Có sẵn trên đường. **Luôn yêu cầu "Meter Please" (Làm ơn bật mét).** Hãy cẩn trọng vào ban đêm hoặc khi trời mưa.

### Giao thông Truyền thống & Địa phương
- **Xe Tuk-Tuk**: *Một trải nghiệm đặc trưng của Thái Lan.* **Thương lượng giá trước khi lên xe**, vì chúng có thể đắt hơn taxi.
- **Taxi Xe máy (Win)**: Nhận biết qua áo khoác màu cam. *Nhanh nhất để vượt qua tắc đường*, nhưng hãy ưu tiên an toàn.

---

## 2. Hướng dẫn Đặt chỗ: Cách Mua Vé

### Nền tảng Trực tuyến Tất cả trong một
- **12Go.asia**: *Nền tảng phổ biến nhất tại Thái Lan* để so sánh giá cả và thời gian di chuyển của tàu hỏa, xe khách và phà.
- **Klook / Baolau**: Tuyệt vời để đặt vé và đưa đón sân bay.

### Phương thức Đặt chỗ Cụ thể
- **Tàu hỏa**: Đặt qua **trang web/ứng dụng D-Ticket** (trước tối đa 90 ngày) hoặc tại quầy bán vé ở ga. *Cần có hộ chiếu.*
- **Xe khách**: Mua tại quầy ở bến xe, **trang web của Transport Co., Ltd**, hoặc qua **Dịch vụ quầy (Counter Service) tại 7-Eleven**.

---

## 3. Những Điều Nên làm và Không nên làm cho Khách du lịch

### Những điều Nên làm
- **Xác nhận Mét**: Luôn kiểm tra xem mét taxi đã được bật chưa.
- **Thương lượng trước**: Đối với xe Tuk-Tuk hoặc Xe máy, *đồng ý về giá* trước khi di chuyển.
- **Sử dụng Công nghệ**: Dựa vào **Google Maps** để biết chính xác số xe buýt.

### Những điều Không nên làm
- **Đừng mặc cả quá mức**: Mặc dù mặc cả là bình thường, nhưng *tránh kỳ kèo quá gay gắt*.
- **Tôn trọng Nhà sư**: Không ngồi vào **"Ghế dành cho Nhà sư"** trên xe buýt hoặc tàu hỏa.
- **Chú ý đôi chân**: *Không bao giờ gác chân lên ghế* atau dùng chân để chỉ vào các vật thể.

---

## 4. Chuẩn bị & An toàn
- **Thời tiết**: Thái Lan rất nóng. Hãy mang theo nước và kem chống nắng.
- **Số Khẩn cấp**: Gọi **1155** cho *Cảnh sát Du lịch*.
- **An toàn Hành lý**: Giữ các đồ vật có giá trị trong túi xách tay trên các chuyến đi qua đêm.
---
## Ứng dụng và Trang web Đặt phòng Khách sạn Khuyên dùng tại Thái Lan
Để tìm được chỗ ở hoàn hảo phù hợp với nhu cầu của bạn tại Thái Lan, các ứng dụng và trang web sau đây rất được khuyên dùng. Dưới đây là phân tích chi tiết về dịch vụ và hệ thống thanh toán của họ.

### 1. Ứng dụng và Trang web Đặt phòng Chính
**Agoda (Ứng dụng/Trang web)**
- **Dịch vụ**: Là một công ty có trụ sở tại Thái Lan, Agoda cung cấp nhiều lựa chọn toàn diện nhất và giá cả cạnh tranh nhất cho các khách sạn, căn hộ chung cư và biệt thự trên khắp cả nước.
- **Tính năng chính**: Thông qua "Agoda Homes", người dùng có thể thuê căn hộ chung cư và nhà riêng; các ưu đãi giảm giá độc quyền thường dành cho các thành viên VIP.
- **Thanh toán**: Hỗ trợ Thẻ Tín dụng/Ghi nợ, PayPal và Google Pay. Một số khách sạn cung cấp tùy chọn "Đặt trước, Trả sau" hoặc "Thanh toán tại Khách sạn".

**Booking.com (Ứng dụng/Trang web)**
- **Dịch vụ**: Được sử dụng rộng rãi trên toàn thế giới, Booking.com cung cấp tất cả các cấp độ khách sạn trên khắp Thái Lan.
- **Tính năng chính**: Nhiều loại phòng có chính sách Hủy Miễn phí, cho phép người dùng đặt phòng mà không cần thanh toán ngay lập tức.
- **Thanh toán**: Mặc dù thường yêu cầu Thẻ Tín dụng/Ghi nợ để đảm bảo, nhiều chỗ nghỉ cho phép thực hiện thanh toán thực tế trực tiếp (Tiền mặt hoặc Thẻ) khi đến khách sạn.

**Airbnb (Ứng dụng/Trang web)**
- **Dịch vụ**: Lý tưởng để thuê các căn hộ chung cư địa phương, nhà riêng và các điểm lưu trú boutique độc đáo.
- **Tính năng chính**: Hoàn hảo cho các gia đình hoặc nhóm thích các phòng có trang bị bếp và khu vực sinh hoạt.
- **Thanh toán**: Yêu cầu thanh toán trước qua Thẻ Tín dụng/Ghi nợ, Google Pay hoặc PayPal. (Lưu ý: Không có tùy chọn thanh toán tại chỗ; mọi giao dịch đều được xử lý qua ứng dụng).

### 2. So sánh Giá và Ứng dụng Khu vực
**Trip.com**
- **Dịch vụ**: Mặc dù có trụ sở tại Trung Quốc, Trip.com thường xuyên có các chương trình khuyến mãi lớn cho các khách sạn tại Thái Lan.
- **Thanh toán**: Hỗ trợ Thẻ Tín dụng/Ghi nợ và nhiều hệ thống thanh toán quốc tế khác nhau.

**Traveloka**
- **Dịch vụ**: Phổ biến trên khắp Đông Nam Á, cho phép người dùng đặt phòng khách sạn kèm với vé máy bay theo combo.
- **Thanh toán**: Hỗ trợ Thẻ Tín dụng/Ghi nợ và cung cấp tùy chọn thanh toán bằng tiền mặt độc đáo tại các dịch vụ quầy của 7-Eleven ở Thái Lan.

### 3. Tóm tắt các Dịch vụ Cung cấp
- **Đặt phòng khách sạn**: Kiểm tra và lọc các khách sạn từ hạng 1 sao đến 5 sao.
- **Căn hộ dịch vụ**: Tiếp cận các phòng dạng căn hộ gia đình được thiết kế cho các kỳ lưu trú dài ngày.
- **Hostel/Phòng tập thể**: Đảm bảo thuê được giường giá rẻ cho những người du lịch một mình hoặc tiết kiệm ngân sách.
- **Tình trạng phòng thực tế**: Kiểm tra ngay lập tức tình trạng còn phòng và đọc các đánh giá đã được xác thực từ người dùng.

### 4. Thông tin Thanh toán Chi tiết
Khi thanh toán tiền phòng tại Thái Lan, vui lòng lưu ý các điểm sau:
- **Thẻ Tín dụng/Ghi nợ**: Sở hữu thẻ Visa quốc tế là phương thức thuận tiện nhất.
- **Dịch vụ tại quầy (Counter Service)**: Nếu bạn không có thẻ tín dụng, các ứng dụng như Traveloka cho phép bạn đặt trực tuyến và thanh toán bằng tiền mặt tại bất kỳ quầy 7-Eleven nào.
- **Tiền đặt cọc**: Hãy chuẩn bị thanh toán tiền đặt cọc bằng Tiền mặt (thường từ 1.000 đến 3.000 Baht) khi đến nhận chìa khóa phòng. Số tiền này sẽ được hoàn trả khi bạn trả phòng (check-out).
- **Đơn vị tiền tệ trên ứng dụng**: Khi duyệt các ứng dụng, hãy đặt đơn vị tiền tệ hiển thị thành Baht Thái (THB) để xem giá địa phương chính xác nhất.

### Tóm tắt Cuối cùng cho Khách du lịch
Để có dịch vụ chính xác và toàn diện nhất tại Thái Lan, bạn nên ưu tiên sử dụng **Agoda** để đặt phòng và **Google Maps** để xác minh vị trí khách sạn. Kết hợp lại, các công cụ này sẽ cung cấp sự hỗ trợ tốt nhất cho khách du lịch trên toàn quốc.`,
    appsGuideMarkdown: `# Ứng dụng & Công cụ Thiết yếu cho Thái Lan
---
Để có một chuyến hành trình suôn sẻ tại Thái Lan, các ứng dụng và trang web sau đây là không thể thiếu. Dưới đây là chi tiết về dịch vụ và hệ thống thanh toán của họ.

## 1. Ứng dụng Gọi xe (Ô tô & Xe máy)
### Grab
- **Dịch vụ**: Đáng tin cậy nhất cho ô tô, xe máy, giao đồ ăn và bưu phẩm.
- **Thanh toán**: Tiền mặt, Thẻ Tín dụng/Ghi nợ và ví GrabPay.
### Bolt
- **Dịch vụ**: Tương tự như Grab nhưng thường được ưa chuộng hơn vì giá thấp hơn.
- **Thanh toán**: Chủ yếu là tiền mặt, mặc dù cũng chấp nhận thẻ.

---
## 2. Ứng dụng Đặt chỗ (Di chuyển Liên tỉnh)
### 12Go Asia
- **Dịch vụ**: Nền tảng chính để đặt tàu hỏa, xe khách và phà trên khắp Thái Lan.
### D-Ticket (Đường sắt Quốc gia Thái Lan)
- **Dịch vụ**: Ứng dụng chính thức để đặt vé tàu hỏa đường dài trực tiếp với hãng đường sắt quốc gia.

---
## 3. Công cụ Điều hướng & Giao thông Công cộng
### Google Maps
- **Cần thiết cho**: Giao thông thực tế, chỉ đường đi bộ và kiểm tra số xe buýt ở Bangkok.
### ViaBus
- **Dịch vụ**: Theo dõi xe buýt theo thời gian thực cho Bangkok và các khu vực khác.

---
## 4. Ứng dụng Hãng hàng không (Tuyến Nội địa)
- **AirAsia**, **Nok Air**, **Thai Lion Air**

---
## 5. Tóm tắt Hệ thống Thanh toán tại Thái Lan
- **Tiền mặt**: Luôn cần thiết cho đồ ăn đường phố, chợ và giao thông quy mô nhỏ.
- **PromptPay (QR)**: Được người dân địa phương sử dụng rộng rãi.
- **EMV (Liên lạc không tiếp xúc)**: Các thẻ quốc tế có thể được sử dụng trực tiếp tại MRT và một số xe buýt ở Bangkok.

---
## 6. Bộ Công cụ Thiết yếu của Khách du lịch
1. **Google Maps** (Điều hướng)
2. **Grab/Bolt** (Gọi xe)
3. **12Go Asia** (Đặt chỗ di chuyển)
4. **Google Translate** (Giao tiếp)

---
## Ứng dụng và Trang web Đặt phòng Khách sạn Khuyên dùng tại Thái Lan
---
Để tìm được chỗ ở hoàn hảo phù hợp với nhu cầu của bạn tại Thái Lan, các ứng dụng và trang web sau đây rất được khuyên dùng. Dưới đây là phân tích chi tiết về dịch vụ và hệ thống thanh toán của họ.

### 1. Ứng dụng và Trang web Đặt phòng Chính
**Agoda (Ứng dụng/Trang web)**
- **Dịch vụ**: Là một công ty có trụ sở tại Thái Lan, Agoda cung cấp nhiều lựa chọn toàn diện nhất và giá cả cạnh tranh nhất cho các khách sạn, căn hộ chung cư và biệt thự trên khắp cả nước.
- **Thanh toán**: Thẻ Tín dụng/Ghi nợ, PayPal, và Google Pay.

**Booking.com (Ứng dụng/Trang web)**
- **Dịch vụ**: Các khách sạn trên toàn thế giới và Thái Lan.
- **Thanh toán**: Thẻ Tín dụng/Ghi nợ (thường để đảm bảo), thanh toán tại chỗ.

**Airbnb (Ứng dụng/Trang web)**
- **Dịch vụ**: Căn hộ chung cư và nhà riêng.
- **Thanh toán**: Trả trước qua ứng dụng.

### 2. So sánh Giá và Ứng dụng Khu vực
**Trip.com**
- **Dịch vụ**: Khuyến mãi lớn cho các khách sạn tại Thái Lan.

**Traveloka**
- **Dịch vụ**: Vé máy bay + khách sạn, thanh toán tiền mặt tại 7-Eleven Thái Lan.
`
  },
  arabic: {
    serviceName: 'تفاصيل النقل في تايلاند',
    grabBolt: {
      title: 'تطبيقات النقل Grab & Bolt',
      items: [
        'Grab: التطبيق الأكثر موثوقية واستخداماً في تايلاند. يوفر السيارات وسيارات الأجرة والدراجات النارية.',
        'Bolt: غالباً ما يكون أرخص من Grab، ويحظى بشعبية كبيرة في بانكوك وبوكيت وتشيانغ ماي.',
        'الدفع: كلاهما يدعم الدفع النقدي أو بالبطاقة الائتمانية (عبر التطبيق).',
        'نصيحة: تحقق دائماً من نقطة الالتقاء على الخريطة لضمان الدقة.'
      ]
    },
    btsMrt: {
      title: 'BTS (القطار العلوي) & MRT (مترو الأنفاق)',
      schedule: 'ساعات العمل: 06:00 - 24:00 يومياً.',
      tips: [
        'ساعات الذروة: 07:30-09:30 و 16:30-19:30 (يمكن أن تكون القطارات مزدحمة جداً).',
        'التذاكر: تتوفر الرموز/البطاقات للرحلة الواحدة في المحطات. يوصى باستخدام بطاقات Rabbit (لـ BTS) وبطاقات MRT للمستخدمين بكثرة.',
        'التحويل: BTS و MRT نظامان منفصلان؛ يجب عليك الخروج من أحدهما لدخول الآخر.'
      ]
    },
    intercity: {
      trains: {
        title: 'القطارات المحلية',
        items: [
          'سكك حديد تايلاند الحكومية (SRT): تربط بانكوك بالشمال والشمال الشرقي والجنوب.',
          'الدرجات: الأولى (مقصورة نوم)، الثانية (نوم/جلوس)، والثالثة (مقاعد خشبية - اقتصادية).',
          'الحجز: يوصى بالحجز عبر موقع D-Ticket للخطوط الطويلة.'
        ]
      },
      buses: {
        title: 'حافلات الطرق السريعة',
        items: [
          'شركة النقل (BKS): خدمة الحافلات الرسمية الحكومية.',
          'المحطات: مو شيت (الشمال)، إيكاماي (الشرق)، محطة الحافلات الجنوبية (ساي تاي ماي).',
          'حافلات VIP: موصى بها بشدة للرحلات الطويلة (مساحة إضافية للأرجل ووجبات خفيفة).'
        ]
      },
      flights: {
        title: 'معلومات الرحلات الجوية',
        items: [
          'سوفارنابومي (BKK): المركز الدولي الرئيسي والرحلات الداخلية كاملة الخدمات (الخطوط التايلاندية، بانكوك إيرويز).',
          'دون ميوينغ (DMK): المركز الرئيسي لشركات الطيران منخفضة التكلفة (إير آسيا، نوك إير، لايون إير التايلاندية).',
          'التحويل: تعمل حافلة مكوكية مجانية بين BKK و DMK للمسافرين الذين يحملون تذكرة صالحة.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'افعل',
        items: [
          'ارتدِ قناع الوجه في وسائل النقل العام المزدحمة (محل تقدير كبير).',
          'اترك مقعدك للرهبان وكبار السن والحوامل والأطفال.',
          'احرص دائماً على وجود فئات نقدية صغيرة/عملات معدنية للنقل المحلي.'
        ]
      },
      donts: {
        title: 'لا تفعل',
        items: [
          'لا تأكل أو تشرب في BTS/MRT.',
          'لا تضع قدميك على الأبواب عندما تنغلق.',
          'لا تتفاوض على الأسعار مع سيارات الأجرة التي تعمل بالعداد (تأكد من تشغيل العداد).'
        ]
      }
    },
    fullGuideMarkdown: `# دليل شامل للنقل في تايلاند
---
## 1. خيارات النقل والبنية التحتية

### النقل الجماعي في بانكوك (داخل المدينة)
لتجنب حركة المرور السيئة في بانكوك، استخدم أنظمة القطارات:
- **BTS Skytrain**: *مثالي للوصول إلى وسط المدينة ومراكز التسوق الكبرى. استخدم **بطاقة Rabbit** للراحة.*
- **MRT Subway**: *يربط بمناطق مختلفة عن BST. يمكنك الدفع مباشرة باستخدام **بطاقات الائتمان/الخصم اللاتلامسية (نظام EMV)**.*
- **Airport Rail Link (ARL)**: *أسرع طريق من مطار سوفارنابومي (BKK) إلى داخل المدينة.*

### تطبيقات النقل وسيارات الأجرة
- **التطبيقات (Grab / Bolt / Maxim)**: *موصى بها بشدة* لأن الأسعار شفافة ومحددة مسبقاً. **Grab** هو الأكثر استخداماً، بينما يقدم **Bolt** غالباً أسعاراً أقل.
- **سيارات الأجرة بالعداد**: متوفرة في الشوارع. **أصر دائماً على تشغيل العداد.** كن حذراً في الليل أو أثناء المطر.

### النقل التقليدي والمحلي
- **التوك توك (Tuk-Tuk)**: *تجربة تايلاندية بامتياز.* **تفاوض على السعر قبل الركوب**، لأنها قد تكون أغلى من سيارات الأجرة.
- **تاكسي الدراجة النارية (Win)**: يُعرفون بالسترات البرتقالية. *الأسرع لتجاوز حركة المرور*، ولكن اجعل السلامة أولويتك.

---

## 2. دليل الحجز: كيف تشتري التذاكر

### منصات إلكترونية شاملة
- **12Go.asia**: *المنصة الأكثر شعبية في تايلاند* لمقارنة الأسعار والمدد للقطارات والحافلات والعبارات.
- **Klook / Baolau**: ممتازة لحجز التذاكر وانتقالات المطار.

### طرق الحجز الخاصة
- **القطارات**: احجز عبر **موقع/تطبيق D-Ticket** (حتى 90 يوماً مقدماً) أو في مكاتب المحطة. *جواز السفر مطلوب.*
- **الحافلات**: اشترِ من مكاتب المحطة، أو **موقع شركة النقل المحدودة**، أو عبر **خدمة كاونتر 7-Eleven**.

---

## 3. ما يجب فعله وما لا يجب فعله للمسافرين

### ما يجب فعله
- **تأكد من العداد**: تحقق دائماً مما إذا كان عداد التاكسي يعمل.
- **التفاوض أولاً**: بالنسبة لتوك توك أو الدراجات النارية، *اتفق على السعر* قبل التحرك.
- **استخدم التكنولوجيا**: اعتمد على **خرائط جوجل** لمعرفة أرقام الحافلات الدقيقة.

### ما لا يجب فعله
- **لا تبالغ في المساومة**: رغم أن التفاوض أمر طبيعي، *تجنب المساومة القوية*.
- **احترم الرهبان**: لا تجلس في **"مقاعد الرهبان"** المخصصة في الحافلات أو القطارات.
- **انتبه لقدميك**: *لا تضع قدميك أبداً على المقاعد* ولا تستخدمها للإشارة إلى الأشياء.

---

## 4. التحضير والسلامة
- **الطقس**: الجو حار في تايلاند. احمل معك الماء وواقي الشمس.
- **رقم الطوارئ**: اتصل بـ **1155** لـ *شرطة السياحة*.
- **سلامة الأمتعة**: احتفظ بالأشياء الثمينة في حقيبة يدوية في الرحلات الليلية.
---
## تطبيقات ومواقع الإقامة الموصى بها في تايلاند
---
للعثور على الإقامة المثالية التي تناسب احتياجاتك في تايلاند، يوصى بشدة باستخدام التطبيقات والمواقع التالية. فيما يلي تفصيل لخدماتهم وأنظمة الدفع الخاصة بهم.

### 1. تطبيقات ومواقع الحجز الرئيسية
**Agoda (تطبيق/موقع)**
- **الخدمة**: كشركة مقرها في تايلاند، تقدم أغودا الخيارات الأكثر شمولاً وأسعارًا تنافسية للفنادق والشقق والفيلات في جميع أنحاء البلاد.
- **الميزة الرئيسية**: من خلال "Agoda Homes"، يمكن للمستخدمين استئجار شقق ومنازل خاصة؛ تتوفر خصومات حصرية غالبًا لأعضاء VIP.
- **الدفع**: يدعم بطاقات الائتمان/الخصم، PayPal، وGoogle Pay. توفر بعض الفنادق خيارات "احجز الآن وادفع لاحقًا" أو "الدفع في الفندق".

**Booking.com (تطبيق/موقع)**
- **الخدمة**: يستخدم على نطاق واسع في جميع أنحاء العالم، ويضم جميع مستويات الفنادق في جميع أنحاء تايلاند.
- **الميزة الرئيسية**: توفر العديد من أنواع الغرف خاصية الإلغاء المجاني، مما يسمح للمستخدمين بالحجز دون دفع مقدم فوري.
- **الدفع**: بينما تتطلب عادةً بطاقة ائتمان/خصم كضمان، تسمح العديد من القوائم بإجراء الدفع الفعلي شخصيًا (نقدًا أو بالبطاقة) عند الوصول إلى الفندق.

**Airbnb (تطبيق/موقع)**
- **الخدمة**: مثالي لاستئجار وحدات سكنية محلية ومنازل خاصة وأماكن إقامة متميزة وفريدة من نوعها.
- **الميزة الرئيسية**: مثالي للعائلات أو المجموعات التي تفضل الغرف المجهزة بمطابخ ومناطق معيشة.
- **الدفع**: يتطلب دفعًا مقدمًا عبر بطاقة الائتمان/الخصم أو Google Pay أو PayPal. (ملاحظة: لا يوجد خيار للدفع في الموقع؛ تتم جميع المعاملات من خلال التطبيق).

### 2. مقارنة الأسعار والتطبيقات الإقليمية
**Trip.com**
- **الخدمة**: على الرغم من أن مقرها في الصين، إلا أنها تقدم عروضًا ترويجية متكررة وكبيرة للفنادق داخل تايلاند.
- **الدفع**: يدعم بطاقات الائتمان/الخصم وأنظمة الدفع الدولية المختلفة.

**Traveloka**
- **الخدمة**: يحظى بشعبية كبيرة في جميع أنحاء جنوب شرق آسيا، ويسمح للمستخدمين بدمج حجوزات الفنادق مع تذاكر الطيران.
- **الدفع**: يدعم بطاقات الائتمان/الخصم ويوفر خيارًا فريدًا للدفع نقدًا في خدمات كاونتر 7-Eleven في تايلاند.

### 3. ملخص الخدمات المقدمة
- **حجز الفنادق**: التحقق من وتصفية الفنادق من فئة النجمة الواحدة إلى 5 نجوم.
- **شقق فندقية**: الوصول إلى غرف تشبه المنازل مصممة للإقامات الطويلة.
- **بيوت الشباب/النزل**: تأمين حجز أسرة بأسعار معقولة للمسافرين المنفردين أو ذوي الميزانية المحدودة.
- **التوفر في الوقت الفعلي**: تحقق من توفر الغرف فورًا واقرأ مراجعات المستخدمين الموثقة.

### 4. معلومات الدفع التفصيلية
عند الدفع مقابل السكن في تايلاند، يرجى مراعاة ما يلي:
- **بطاقة الائتمان/الخصم**: امتلاك بطاقة فيزا أو ماستركارد دولية هو الطريقة الأكثر ملاءمة.
- **خدمة الكاونتر (Counter Service)**: إذا لم تكن تمتلك بطاقة ائتمان، تتيح لك تطبيقات مثل Traveloka الحجز عبر الإنترنت والدفع نقدًا في أي كاونتر 7-Eleven.
- **تأمين نقدي**: استعد لدفع مبلغ تأمين نقدًا (عادة ما بين 1000 إلى 3000 باهت) عند الوصول لاستلام مفاتيح الغرفة. يتم استرداد هذا المبلغ عند تسجيل المغادرة.
- **عملة التطبيق**: عند تصفح التطبيقات، اضبط عملة العرض على الباهت التايلاندي (THB) لرؤية أدق الأسعار المحلية.

### ملخص نهائي للمسافرين
للحصول على الخدمة الأكثر دقة وشمولاً في تايلاند، يوصى بإعطاء الأولوية لـ **Agoda** للحجز ولـ **Google Maps** للتحقق من مواقع الفنادق. توفر هذه الأدوات معًا أفضل تغطية للمسافرين في جميع أنحاء البلاد.`,
    appsGuideMarkdown: `# تطبيقات وأدوات أساسية لتايلاند
---
لرحلة سلسة في تايلاند، تعتبر التطبيقات والمواقع التالية ضرورية. فيما يلي تفاصيل خدماتها وأنظمة الدفع الخاصة بها.

## 1. تطبيقات النقل (سيارات ودراجات نارية)
### Grab
- **الخدمة**: الأكثر موثوقية للسيارات والدراجات النارية وتوصيل الطعام والطرود.
- **الدفع**: نقداً، بطاقة ائتمان/خصم، ومحفظة GrabPay.
### Bolt
- **الخدمة**: مشابه لـ Grab ولكن غالباً ما يفضل بسبب الأسعار الأقل.
- **الدفع**: نقداً بشكل أساسي، رغم قبول البطاقات أيضاً.

---
## 2. تطبيقات الحجز (السفر بين المدن)
### 12Go Asia
- **الخدمة**: المنصة الرئيسية لحجز القطارات والحافلات والعبارات في جميع أنحاء تايلاند.
### D-Ticket (سكك حديد تايلاند الحكومية)
- **الخدمة**: التطبيق الرسمي لحجز تذاكر القطارات طويلة المدى مباشرة مع السكك الحديدية الوطنية.

---
## 3. أدوات الملاحة والنقل العام
### Google Maps
- **ضروري لـ**: حركة المرور في الوقت الفعلي، ملاحة المشي، والتحقق من أرقام الحافلات في بانكوك.
### ViaBus
- **الخدمة**: تتبع الحافلات في الوقت الفعلي لبانكوك ومناطق أخرى.

---
## 4. تطبيقات شركات الطيران (الخطوط الداخلية)
- **AirAsia**, **Nok Air**, **Thai Lion Air**

---
## 5. ملخص أنظمة الدفع في تايلاند
- **النقد**: مطلوب دائماً للأكل الشعبي والأسواق ووسائل النقل الصغيرة.
- **PromptPay (QR)**: يستخدم على نطاق واسع من قبل السكان المحليين.
- **EMV (بدون تلامس)**: يمكن استخدام البطاقات الدولية مباشرة في MRT وبعض حافلات بانكوك.

---
## 6. مجموعة الأدوات الأساسية للمسافر
1. **Google Maps** (الملاحة)
2. **Grab/Bolt** (النقل)
3. **12Go Asia** (حجز السفر)
4. **Google Translate** (التواصل)
5. **الطقس الحالي: تايلاند**
6. **العملة (THB)**

---
## تطبيقات ومواقع الإقامة الموصى بها في تايلاند
---
للعثور على الإقامة المثالية التي تناسب احتياجاتك في تايلاند، يوصى بشدة باستخدام التطبيقات والمواقع التالية. فيما يلي تفصيل لخدماتهم وأنظمة الدفع الخاصة بهم.

### 1. تطبيقات ومواقع الحجز الرئيسية
**Agoda (تطبيق/موقع)**
- **الخدمة**: كشركة مقرها في تايلاند، تقدم أغودا الخيارات الأكثر شمولاً وأسعارًا تنافسية للفنادق والشقق والفيلات في جميع أنحاء البلاد.
- **الدفع**: بطاقات الائتمان/الخصم، PayPal، وGoogle Pay.

**Booking.com (تطبيق/موقع)**
- **الخدمة**: فنادق حول العالم وفي تايلاند.
- **الدفع**: بطاقة الائتمان/الخصم (للضمان عادة)، والدفع في الفندق.

**Airbnb (تطبيق/موقع)**
- **الخدمة**: شقق سكنية ومنازل خاصة.
- **الدفع**: دفع مسبق عبر التطبيق.

### 2. مقارنة الأسعار والتطبيقات الإقليمية
**Trip.com**
- **الخدمة**: عروض ترويجية كبيرة للفنادق في تايلاند.

**Traveloka**
- **الخدمة**: تذاكر طيران + فنادق، ودفع نقدي في 7-Eleven في تايلاند.
`
  },
  bengali: {
    serviceName: 'থাইল্যান্ডে যাতায়াতের বিস্তারিত তথ্য',
    grabBolt: {
      title: 'গ্র্যাব (Grab) এবং বোল্ট (Bolt) ই-হেলিং',
      items: [
        'গ্র্যাব: থাইল্যান্ডের সবচেয়ে নির্ভরযোগ্য এবং বহুল ব্যবহৃত অ্যাপ। গাড়ি, ট্যাক্সি এবং মোটরসাইকেল অফার করে।',
        'বোল্ট: প্রায়ই গ্র্যাবের চেয়ে সাশ্রয়ী, ব্যাংকক, ফুকেত এবং চিয়াং মাইতে বেশ জনপ্রিয়।',
        'পেমেন্ট: উভয় অ্যাপই নগদ বা ক্রেডিট কার্ড (অ্যাপের মাধ্যমে) সমর্থন করে।',
        'পরামর্শ: সঠিকতা নিশ্চিত করতে সবসময় ম্যাপে পিক-আপ পয়েন্টটি পরীক্ষা করে নিন।'
      ]
    },
    btsMrt: {
      title: 'বিটিএস (স্কাইট্রেন) এবং এমআরটি (আন্ডারগ্রাউন্ড)',
      schedule: 'পরিচালনার সময়: প্রতিদিন সকাল ০৬:০০ – রাত ২৪:০০।',
      tips: [
        'ব্যস্ত সময়: সকাল ০৭:৩০-০৯:৩০ এবং বিকাল ১৬:৩০-১৯:৩০ (ট্রেনগুলোতে খুব ভিড় হতে পারে)।',
        'টিকিট: স্টেশনগুলোতে সিঙ্গেল জার্নি টোকেন/কার্ড পাওয়া যায়। ঘন ঘন ব্যবহারের জন্য র‍্যাবিট কার্ড (BTS) এবং এমআরটি কার্ড নেওয়ার পরামর্শ দেওয়া হয়।',
        'বদল: বিটিএস এবং এমআরটি আলাদা সিস্টেম; এক লাইন থেকে অন্য লাইনে যেতে আপনাকে স্টেশন থেকে বের হতে হবে।'
      ]
    },
    intercity: {
      trains: {
        title: 'দেশের ভেতরের ট্রেন',
        items: [
          'স্টেট রেলওয়ে অফ থাইল্যান্ড (SRT): ব্যাংকককে উত্তর, উত্তর-পূর্ব এবং দক্ষিণের সাথে সংযুক্ত করে।',
          'শ্রেণী: ১ম (স্লিপার), ২য় (স্লিপার/সিটেড), এবং ৩য় (কাঠের বেঞ্চ - বাজেট)।',
          'বুকিং: দূরপাল্লার রুটের জন্য ডি-টিকিট (D-Ticket) ওয়েবসাইটের মাধ্যমে বুক করার পরামর্শ দেওয়া হয়।'
        ]
      },
      buses: {
        title: 'হাইওয়ে এক্সপ্রেস বাস',
        items: [
          'ট্রান্সপোর্ট কোং (BKS): সরকারি অফিসিয়াল বাস সার্ভিস।',
          'টার্মিনাল: মো চিট (উত্তর), এক্কামাই (পূর্ব), সাউদার্ন বাস টার্মিনাল (সাই তাই মাই)।',
          'ভিআইপি বাস: দীর্ঘ ভ্রমণের জন্য অত্যন্ত সুপারিশ করা হয় (অতিরিক্ত লেগ-স্পেস এবং স্ন্যাকস দেওয়া হয়)।'
        ]
      },
      flights: {
        title: 'ফ্লাইটের তথ্য',
        items: [
          'সুবর্ণভূমি (BKK): প্রধান আন্তর্জাতিক হাব এবং ফুল-সার্ভিস অভ্যন্তরীণ ফ্লাইট (Thai Airways, Bangkok Airways)।',
          'ডন মুয়াং (DMK): প্রধান বাজেট এয়ারলাইন হাব (AirAsia, Nok Air, Thai Lion Air)।',
          'স্থানান্তর: বৈধ টিকিটধারী যাত্রীদের জন্য BKK এবং DMK-এর মধ্যে একটি ফ্রি শাটল বাস চলে।'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'করণীয়',
        items: [
          'জনাকীর্ণ পাবলিক ট্রান্সপোর্টে ফেস মাস্ক পরুন (এটি প্রশংসিত)।',
          'সন্ন্যাসী, বৃদ্ধ, গর্ভবতী মহিলা এবং শিশুদের জন্য আপনার আসনটি ছেড়ে দিন।',
          'স্থানীয় যাতায়াতের জন্য সব সময় ছোট নোট বা কয়েন সাথে রাখুন।'
        ]
      },
      donts: {
        title: 'বর্জনীয়',
        items: [
          'বিটিএস/এমআরটি-তে খাবার বা পানীয় খাবেন না।',
          'দরজা বন্ধ হওয়ার সময় দরজায় পা দেবেন না।',
          'মিটার-ট্যাক্সির সাথে দামাদামি করবেন না (নিশ্চিত করুন যে তারা মিটার চালু করেছে)।'
        ]
      }
    },
    fullGuideMarkdown: `# থাইল্যান্ড যাতায়াত নির্দেশিকা
---
## যাতায়াত ব্যবস্থা
### অভ্যন্তরীণ ভ্রমণ (এক শহর থেকে অন্য শহরে)
- **অভ্যন্তরীণ ফ্লাইট**: দূরবর্তী অঞ্চলগুলোর মধ্যে ভ্রমণের দ্রুততম উপায় (যেমন ব্যাংকক থেকে চিয়াং মাই বা ফুকেত)।
- **প্রধান কেন্দ্র**: ব্যাংককের সুবর্ণভূমি বিমানবন্দর (BKK) এবং ডন মুয়াং বিমানবন্দর (DMK)।
- **এয়ারলাইনস**: ফুল সার্ভিস (*Thai Airways, Bangkok Airways*); বাজেট এয়ারলাইনস (*Thai AirAsia, Nok Air, Thai Lion Air*)।
- **পরামর্শ**: ভালো ভাড়ার জন্য ২-৪ সপ্তাহ আগে বুক করুন; বাজেট এয়ারলাইনগুলোর ব্যাগেজ সীমা চেক করে নিন।

- **ট্রেন (SRT)**: উত্তর থেকে দক্ষিণে বড় শহরগুলোকে সংযুক্ত করার একটি সাশ্রয়ী এবং মনোরম উপায়।
- **১ম শ্রেণী**: প্রাইভেট এসি কেবিন (স্লিপার ট্রেন)।
- **২য় শ্রেণী**: সিট বা স্লিপার বার্থ (এসি বা ফ্যান) উভয়ই পাওয়া যায়; দীর্ঘ ভ্রমণের জন্য অত্যন্ত সুপারিশকৃত।
- **৩য় শ্রেণী**: কাঠের বা প্যাডযুক্ত বেঞ্চ; খুব সস্তা কিন্তু ছোট ভ্রমণের জন্য ভালো।
- **বুকিং**: **"D-Ticket"** অনলাইন সিস্টেম ব্যবহার করুন বা ক্রুং থেপ অ্যাফিয়াত সেন্ট্রাল টার্মিনাল থেকে কিনুন।

- **বাস এবং মিনিভ্যান**: ট্রেনের নাগালের বাইরের গন্তব্যগুলোতে পৌঁছাতে সাহায্য করে।
- **দূরপাল্লা**: ভিআইপি/সরকারি বাসগুলোতে হেলান দেওয়া সিট এবং টয়লেট থাকে। এক্সপ্রেস বাস সস্তা কিন্তু বেশি স্টপেজ থাকে।
- **মিনিভ্যান**: ছোট রুটের জন্য দ্রুত (যেমন ব্যাংকক থেকে পাতায়া) কিন্তু সিটগুলো কিছুটা ছোট হতে পারে।
- **ব্যাংকক টার্মিনাল**: মো চিট (উত্তর/উত্তর-পূর্ব), সাই তাই মাই (দক্ষিণ), এবং এক্কামাই (পূর্ব)।

- **নৌকা এবং ফেরি**: দ্বীপে ভ্রমণের জন্য অপরিহার্য।
- **ফেরি**: প্রধান রুটের জন্য বড় নৌকা (যেমন কো সামুই, ফি ফি)।
- **স্পিডবোট**: ছোট দ্বীপগুলোর জন্য দ্রুত ব্যবস্থা।
- **লং-টেইল বোট**: উপকূলীয় ট্যাক্সি সার্ভিস বা দ্বীপ ভ্রমণের জন্য বিখ্যাত ঐতিহ্যবাহী থাই নৌকা।

---
### ব্যাংকক শহর যাতায়াত
- **রেল ব্যবস্থা (স্কাই ট্রেন এবং সাবওয়ে)**: ব্যাংককের বিখ্যাত যানজট এড়ানোর সেরা উপায়।
- **BTS (Skytrain)**: সুকুমভিত, সিলম এবং সিয়াম-এর মতো প্রধান এলাকাগুলোকে সংযুক্তকারী উন্নত রেলপথ।
- **MRT (Subway)**: পর্যটকদের জন্য ব্লু লাইন সবচেয়ে কার্যকর (গ্র্যান্ড প্যালেস, ওয়াট ফো এবং চায়নাটাউনের সাথে সংযুক্ত)।
- **Airport Rail Link (ARL)**: সুবর্ণভূমি বিমানবন্দর থেকে সরাসরি শহরের কেন্দ্রে যাওয়ার পথ।
- **দ্রষ্টব্য**: বিটিএস এবং এমআরটি-র জন্য আলাদা টিকিট প্রয়োজন। আপনি বিটিএস-এর জন্য র‍্যাবিট কার্ড (Rabbit Card) বা কিছু লাইনের জন্য কন্টাক্টলেস ক্রেডিট কার্ড ব্যবহার করতে পারেন।

- **ট্যাক্সি এবং রাইড-হেলিং**:
- **পাবলিক ট্যাক্সি**: "Taxi Meter" চিহ্নটি খুঁজুন। সর্বদা মিটার ব্যবহারের জন্য জোর দিন।
- **অ্যাপস (Grab / Bolt / Maxim)**: স্বচ্ছ মূল্যের কারণে খুব নিরাপদ। বোল্ট প্রায়ই সস্তা হয়, অন্যদিকে গ্র্যাব-এ চালক বেশি পাওয়া যায়।
- **মোটরসাইকেল ট্যাক্সি (Win)**: কমলা/লাল ভেস্ট পরা চালক। ব্যস্ত সময়ে কম দূরত্বের জন্য দ্রুততম কিন্তু দীর্ঘ ভ্রমণের জন্য নয়।

- **জলপথ যাতায়াত**:
- **চাও প্রয়াহ এক্সপ্রেস বোট**: রঙিন পতাকা ব্যবহার করে। নীল পতাকা (ট্যুরিস্ট বোট) প্রধান নদী তীরের মন্দিরগুলোতে থামে।
- **খলং সায়েন সায়েব বোট**: স্থানীয়দের ব্যবহৃত খালের নৌকা; শহর পার হওয়ার জন্য খুব সস্তা এবং দ্রুত।
- **নদী পারাপার ফেরি**: ছোট নৌকা যা আপনাকে নদী পার করে দেয় (যেমন ওয়াট ফো থেকে ওয়াট অরুণ) প্রায় ৫ বাতের বিনিময়ে।

- **টুক-টুক এবং সংথিউ**:
- **টুক-টুক**: থাইল্যান্ডের একটি প্রতীক। কোনো মিটার নেই, তাই ওঠার আগে দাম ঠিক করে নিন। শপিং করার অফার দেওয়া চালকদের এড়িয়ে চলাই ভালো।
- **সংথিউ**: বেঞ্চ সহ শেয়ার্ড পিকআপ ট্রাক। চিয়াং মাই/পাতায়ায় দেখা যায়, তবে ব্যাংককের শহরতলিতেও নির্দিষ্ট স্থানীয় রুটে চলে।

---
### প্রয়োজনীয় ভ্রমণ টিপস
- **ব্যস্ত সময়**: সকাল ০৭:০০ – ০৯:৩০ এবং বিকাল ১৬:৩০ – ১৯:৩০ পর্যন্ত রাস্তা এড়িয়ে চলুন। এই সময়ে বিটিএস/এমআরটি ব্যবহার করুন।
- **নেভিগেশন**: সঠিক রুটের জন্য গুগল ম্যাপ ব্যবহার করুন এবং রিয়েল-টাইমে বাস ট্র্যাক করতে ViaBus অ্যাপ ব্যবহার করুন।
- **পেমেন্ট**: বাসের ভাড়া এবং ট্রেনের টিকিট মেশিনের জন্য ছোট নোট/কয়েন সাথে রাখুন।
- **জয়েন্ট টিকিট**: দ্বীপগুলোর জন্য এজেন্সির মাধ্যমে "জয়েন্ট টিকিট" (বাস + ফেরি) সন্ধান করুন যা আপনার ভ্রমণ সহজ করবে।`,
    appsGuideMarkdown: `# থাইল্যান্ডে যাতায়াতের জন্য প্রয়োজনীয় অ্যাপ এবং ওয়েবসাইট
---
থাইল্যান্ডের ভিতরে নির্বিঘ্নে যাতায়াত নিশ্চিত করতে নিম্নলিখিত অ্যাপ এবং ওয়েবসাইটগুলো অপরিহার্য। নিচে তাদের সেবা এবং পেমেন্ট পদ্ধতির বিস্তারিত বিবরণ দেওয়া হলো।

## ১. রাইড-হেলিং অ্যাপ (গাড়ি এবং মোটরসাইকেল)
### গ্র্যাব (Grab)
- **সেবা**: গাড়ি, মোটরসাইকেল, খাবার এবং পার্সেল ডেলিভারির সবচেয়ে নির্ভরযোগ্য অ্যাপ।
- **পেমেন্ট**: নগদ, ক্রেডিট/ডেবিট কার্ড এবং গ্র্যাবপে (GrabPay) ওয়ালেট।
### বোল্ট (Bolt)
- **সেবা**: গ্র্যাবের মতোই পরিষেবা দেয় কিন্তু প্রায়ই সস্তা এবং বাজেটের জন্য সুবিধাজনক।
- **পেমেন্ট**: মূলত নগদ, তবে ক্রেডিট/ডেবিট কার্ডও গ্রহণ করা হয়।
### ম্যাক্সিম (Maxim)
- **সেবা**: গাড়ি ভাড়ার জন্য সাধারণত সবচেয়ে সস্তা বিকল্প হিসেবে বিবেচিত হয়, যদিও গাড়িগুলো কিছুটা পুরনো হতে পারে।
- **পেমেন্ট**: শুধুমাত্র নগদ।
### লাইন ম্যান (Line Man)
- **সেবা**: মূলত খাবার ডেলিভারির অ্যাপ হলেও এদের "ট্যাক্সি" সার্ভিস আছে।
- **পেমেন্ট**: নগদ অথবা র‍্যাবিট লাইন পে (Rabbit Line Pay)।

---
## ২. বুকিং অ্যাপ এবং ওয়েবসাইট (আন্তঃশহর ভ্রমণ)
### 12Go Asia
- **সেবা**: থাইল্যান্ড জুড়ে ট্রেন, বাস, ফেরি এবং এমনকি প্রাইভেট ট্রান্সফার বুক করার প্রধান প্ল্যাটফর্ম।
- **পেমেন্ট**: ক্রেডিট/ডেবিট কার্ড, পেপ্যাল এবং থাই কিউআর (QR) পেমেন্ট।
### D-Ticket (স্টেট রেলওয়ে অফ থাইল্যান্ড)
- **সেবা**: সরাসরি রেলওয়ের সাথে দূরপাল্লার ট্রেনের টিকিট বুক করার জন্য অফিসিয়াল অ্যাপ।
- **পেমেন্ট**: ক্রেডিট/ডেবিট কার্ড এবং থাই কিউআর পেমেন্ট।

---
## ৩. নেভিগেশন এবং পাবলিক ট্রানজিট সরঞ্জাম
### গুগল ম্যাপস (Google Maps)
- **ব্যবহার**: রিয়েল-টাইম ট্রাফিক আপডেট, হাঁটার দিকনির্দেশ এবং ব্যাংককের বাস রুট চেক করার জন্য অপরিহার্য।
### ভায়া-বাস (ViaBus)
- **সেবা**: ব্যাংকক এবং অন্যান্য প্রদেশের জন্য একটি রিয়েল-টাইম বাস ট্র্যাকিং অ্যাপ। এটি বাসের অবস্থান ম্যাপে দেখায়।

---
## ৪. এয়ারলাইন অ্যাপস (অভ্যন্তরীণ ফ্লাইট)
- **AirAsia**, **Nok Air**, **Thai Lion Air**
- **পরামর্শ**: সহজ চেক-ইন এবং ডিজিটাল বোর্ডিং পাস পেতে এদের অ্যাপ ডাউনলোড করে রাখুন।

---
## ৫. থাইল্যান্ডে পেমেন্ট পদ্ধতির সংক্ষিপ্ত বিবরণ
- **নগদ টাকা**: রাস্তার খাবার, স্থানীয় বাজার এবং ছোট পরিবহনের জন্য সর্বদা প্রয়োজন।
- **কিউআর পেমেন্ট (PromptPay)**: স্থানীয়দের দ্বারা ব্যাপকভাবে ব্যবহৃত হয়।
- **ইএমভি (কন্টাক্টলেস)**: ব্যাংককের এমআরটি এবং কিছু বাসে সরাসরি আন্তর্জাতিক ক্রেডিট/ডেবিট কার্ড ব্যবহার করা যায়।

---
## ৬. ভ্রমণকারীদের জন্য প্রয়োজনীয় টুলকিট
১. **গুগল ম্যাপস** (নেভিগেশন)
২. **গ্র্যাব/বোল্ট** (রাইড-হেলিং)
৩. **12Go Asia** (পরিবহন বুকিং)
৪. **গুগল ট্রান্সলেট** (যোগাযোগ)
৫. **আবহাওয়া: থাইল্যান্ড**
৬. **মুদ্রা (THB)**

---

## থাইল্যান্ডে বাসস্থানের জন্য প্রস্তাবিত অ্যাপ এবং ওয়েবসাইট
থাইল্যান্ডে আপনার প্রয়োজন অনুযায়ী উপযুক্ত বাসস্থান খুঁজে পেতে নিম্নলিখিত অ্যাপ এবং ওয়েবসাইটগুলো বিশেষভাবে সুপারিশ করা হয়। নিচে তাদের সেবা এবং পেমেন্ট পদ্ধতির বিস্তারিত বিবরণ দেওয়া হলো।

### ১. প্রাথমিক বুকিং অ্যাপ এবং ওয়েবসাইট
**Agoda (অ্যাপ/ওয়েবসাইট)**
- **সেবা**: থাইল্যান্ড ভিত্তিক কোম্পানি হওয়ায় এটি সারা দেশে হোটেল, কন্ডো এবং ভিলার সবচেয়ে ব্যাপক সংগ্রহ এবং প্রতিযোগিতামূলক মূল্য অফার করে।
- **মূল বৈশিষ্ট্য**: "Agoda Homes"-এর মাধ্যমে ব্যবহারকারীরা কন্ডো এবং ব্যক্তিগত বাড়ি ভাড়া নিতে পারেন; ভিআইপি মেম্বারদের জন্য প্রায়ই বিশেষ ডিসকাউন্ট থাকে।
- **পেমেন্ট**: ক্রেডিট/ডেবিট কার্ড, পেপ্যাল (PayPal) এবং গুগল পে (Google Pay) সমর্থন করে। কিছু হোটেল "বুক নাও, পে লেটার" (Book Now, Pay Later) বা হোটেলে পেমেন্ট করার অপশন দেয়।

**Booking.com (অ্যাপ/ওয়েবসাইট)**
- **সেবা**: বিশ্বজুড়ে ব্যাপকভাবে ব্যবহৃত, এটি থাইল্যান্ড জুড়ে সব স্তরের হোটেলের সুবিধা প্রদান করে।
- **মূল বৈশিষ্ট্য**: অনেক রুম টাইপ ফ্রি ক্যান্সেলেশন (Free Cancellation) অফার করে, যা ব্যবহারকারীদের তাৎক্ষণিক পেমেন্ট ছাড়াই বুকিং করার সুযোগ দেয়।
- **পেমেন্ট**: গ্যারান্টি হিসেবে সাধারণত ক্রেডিট/ডেবিট কার্ডের প্রয়োজন হলেও, অনেক ক্ষেত্রে হোটেলে পৌঁছানোর পর সরাসরি (নগদ বা কার্ডের মাধ্যমে) পেমেন্ট করার অনুমতি থাকে।

**Airbnb (অ্যাপ/ওয়েবসাইট)**
- **সেবা**: স্থানীয় কন্ডো ইউনিট, ব্যক্তিগত বাড়ি এবং অনন্য বুটিক স্টে (boutique stays) ভাড়া নেওয়ার জন্য আদর্শ।
- **মূল বৈশিষ্ট্য**: পরিবার বা বন্ধুদের গ্রুপের জন্য উপযুক্ত যারা রান্নাঘর এবং লিভিং এরিয়া সহ রুম পছন্দ করেন।
- **পেমেন্ট**: ক্রেডিট/ডেবিট কার্ড, গুগল পে বা পেপ্যালের মাধ্যমে অগ্রিম পেমেন্ট প্রয়োজন। (দ্রষ্টব্য: প্রপার্টিতে পেমেন্ট করার কোনো অপশন নেই; সব লেনদেন অ্যাপের মাধ্যমে সম্পন্ন হয়)।

### ২. মূল্য তুলনা এবং আঞ্চলিক অ্যাপ
**Trip.com**
- **সেবা**: এটি চীনে অবস্থিত হলেও থাইল্যান্ডের হোটেলের জন্য ঘনঘন এবং উল্লেখযোগ্য প্রমোশন অফার করে।
- **পেমেন্ট**: ক্রেডিট/ডেবিট কার্ড এবং বিভিন্ন আন্তর্জাতিক পেমেন্ট সিস্টেম সমর্থন করে।

**Traveloka**
- **সেবা**: দক্ষিণ-পূর্ব এশিয়া জুড়ে জনপ্রিয়, এটি ব্যবহারকারীদের ফ্লাইটের সাথে হোটেলের কম্বো বুকিং করার সুবিধা দেয়।
- **পেমেন্ট**: ক্রেডিট/ডেবিট কার্ড সমর্থন করে এবং থাইল্যান্ডের ৭-ইলেভেন (7-Eleven) কাউন্টার সার্ভিসে নগদে পেমেন্ট করার অনন্য সুযোগ দেয়।

### ৩. প্রদত্ত সেবাসমূহের সারসংক্ষেপ
- **হোটেল বুকিং**: ১-স্টার থেকে ৫-স্টার রেটিং পর্যন্ত হোটেল চেক এবং ফিল্টার করুন।
- **সার্ভিসড অ্যাপার্টমেন্ট**: দীর্ঘমেয়াদী অবস্থানের জন্য বাড়ির মতো কক্ষগুলো পান।
- **হোস্টেল/ডরমিটরি**: একা বা বাজেট ট্রাভেলারদের জন্য সাশ্রয়ী মূল্যে বেড ভাড়া নিন।
- **রিয়েল-টাইম প্রাপ্যতা**: তাৎক্ষণিকভাবে রুমের প্রাপ্যতা পরীক্ষা করুন এবং যাচাইকৃত ব্যবহারকারী রিভিউ পড়ুন।

### ৪. বিস্তারিত পেমেন্ট তথ্য
থাইল্যান্ডে বাসস্থানের জন্য পেমেন্ট করার সময় নিম্নলিখিত বিষয়গুলো মাথায় রাখুন:
- **ক্রেডিট/ডেবিট কার্ড**: বুকিং অ্যাপ ব্যবহারের জন্য একটি আন্তর্জাতিক ভিসা (Visa) বা মাস্টারকার্ড (Mastercard) থাকা সবচেয়ে সুবিধাজনক পদ্ধতি।
- **কাউন্টার সার্ভিস**: আপনার যদি ক্রেডিট কার্ড না থাকে, তবে ট্রাভেলোকা (Traveloka)-র মতো অ্যাপগুলো আপনাকে অনলাইনে বুকিং করে যেকোনো ৭-ইলেভেন কাউন্টারে নগদে পেমেন্ট করার সুযোগ দেয়।
- **সিকিউরিটি ডিপোজিট**: হোটেলে পৌঁছানোর পর রুমের চাবি পেতে নগদ টাকায় সিকিউরিটি ডিপোজিট (সাধারণত ১০০০ থেকে ৩০০০ বাত) দেওয়ার জন্য প্রস্তুত থাকুন। চেক-আউটের সময় এটি ফেরত দেওয়া হয়।
- **অ্যাপের কারেন্সি**: অ্যাপ ব্যবহার করার সময় সঠিক স্থানীয় মূল্য দেখার জন্য কারেন্সি সেটিংসে মায়ানমার কিয়াট বা ইউএস ডলারের পরিবর্তে থাই বাত (THB) নির্বাচন করুন।

### ভ্রমণকারীদের জন্য চূড়ান্ত সারসংক্ষেপ
থাইল্যান্ডে সবচেয়ে নির্ভুল এবং ব্যাপক সেবার জন্য বুকিংয়ের জন্য **Agoda** এবং হোটেলের অবস্থান যাচাইয়ের জন্য **Google Maps** ব্যবহার করার পরামর্শ দেওয়া হচ্ছে। একসাথে এই সরঞ্জামগুলো সারা দেশে ভ্রমণকারীদের জন্য সেরা কভারেজ প্রদান করে।`
  },
  dutch: {
    serviceName: 'Vervoersdetails in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: De meest betrouwbare en meest gebruikte app in Thailand. Biedt auto\'s, taxi\'s en motorfietsen.',
        'Bolt: Vaak goedkoper dan Grab, zeer populair in Bangkok, Phuket en Chiang Mai.',
        'Betaling: Beide ondersteunen contant geld of creditcard (via app).',
        'Tip: Controleer altijd het ophaalpunt op de kaart om nauwkeurigheid te garanderen.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Metro)',
      schedule: 'Openingstijden: 06:00 - 24:00 dagelijks.',
      tips: [
        'Spitsuren: 07:30-09:30 en 16:30-19:30 (Treinen kunnen erg druk zijn).',
        'Ticketing: Enkele reis fiches/kaarten zijn verkrijgbaar bij de stations. Rabbit Cards (BTS) en MRT Cards worden aanbevolen voor frequent gebruik.',
        'Overstappen: BTS en MRT zijn gescheiden systemen; u moet het ene verlaten om het andere te betreden.'
      ]
    },
    intercity: {
      trains: {
        title: 'Binnenlandse Treinen',
        items: [
          'State Railway of Thailand (SRT): Verbindt Bangkok met het noorden, noordoosten en zuiden.',
          'Klassen: 1e (Slaapwagen), 2e (Slaapwagen/Zitplaatsen) en 3e (Houten banken - budget).',
          'Boeken: Aanbevolen om te boeken via de D-Ticket website voor langeafstandsroutes.'
        ]
      },
      buses: {
        title: 'Langeafstandsbussen',
        items: [
          'Transport Co. (BKS): De officiële overheidsbusdienst.',
          'Terminals: Mo Chit (Noord), Ekkamai (Oost), Southern Bus Terminal (Sai Tai Mai).',
          'VIP-bussen: Zeer aanbevolen voor lange reizen (extra beenruimte en snacks).'
        ]
      },
      flights: {
        title: 'Vluchtinformatie',
        items: [
          'Suvarnabhumi (BKK): Belangrijkste internationale hub en binnenlandse vluchten met volledige service (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Belangrijkste hub voor prijsvechters (AirAsia, Nok Air, Thai Lion Air).',
          'Overstappen: Er rijdt een gratis pendelbus tussen BKK and DMK voor passagiers met een geldig ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do\'s',
        items: [
          'Draag een mondkapje in druk openbaar vervoer (wordt zeer gewaardeerd).',
          'Geef uw zitplaats af aan monniken, ouderen, zwangere vrouwen en kinderen.',
          'Zorg altijd voor kleine bankbiljetten/munten voor lokaal vervoer.'
        ]
      },
      donts: {
        title: 'Don\'ts',
        items: [
          'Eet of drink niet op de BTS/MRT.',
          'Stap niet op de deuren wanneer deze sluiten.',
          'Onderhandel niet over prijzen met meter-taxi\'s (zorg ervoor dat ze de meter aanzetten).'
        ]
      }
    },
    fullGuideMarkdown: `# Uitgebreide Gids voor Vervoer in Thailand
---
## 1. Vervoersopties & Infrastructuur

### Bangkok Mass Transit (Binnen de stad)
Gebruik de spoorwegsystemen om de beruchte verkeersdrukte van Bangkok te vermijden:
- **BTS Skytrain**: *Ideaal om het stadscentrum en grote winkelcentra te bereiken. Gebruik voor het gemak een **Rabbit Card**.*
- **MRT Subway**: *Verbindt met andere gebieden dan de BTS. U kunt rechtstreeks betalen met **Contactless Credit/Debit cards (EMV-systeem)**.*
- **Airport Rail Link (ARL)**: *De snelste route van Suvarnabhumi Airport (BKK) naar de stad.*

### Taxi-apps & Taxi's
- **Apps (Grab / Bolt / Maxim)**: *Ten zeerste aanbevolen* omdat prijzen transparant en vooraf bepaald zijn. **Grab** wordt het meest gebruikt, terwijl **Bolt** vaak lagere tarieven biedt.
- **Meter-taxi's**: Beschikbaar om op straat aan te houden. **Sta altijd op "Meter Please."** Wees voorzichtig 's nachts of tijdens regen.

### Traditioneel & Lokaal Vervoer
- **Tuk-Tuk**: *Een typisch Thaise ervaring.* **Onderhandel over de prijs voordat u instapt**, want ze kunnen duurder zijn dan taxi's.
- **Motorfietstaxi (Win)**: Herkenbaar aan oranje vesten. *Snelst om verkeersdrukte te omzeilen*, maar geef prioriteit aan veiligheid.

---

## 2. Boekingsgids: Hoe Tickets te Kopen

### One-Stop Online Platforms
- **12Go.asia**: *Het populairste platform in Thailand* om prijzen en reistijden te vergelijken voor treinen, bussen en veerboten.
- **Klook / Baolau**: Uitstekend voor het boeken van tickets en luchthaventransfers.

### Specifieke Boekingsmethoden
- **Treinen**: Boek via de **D-Ticket website/app** (tot 90 dagen van tevoren) of bij loketten op het station. *Paspoort is vereist.*
- **Bussen**: Koop bij loketten op de terminal, de **Transport Co., Ltd website**, of via **7-Eleven Counter Service**.

---

## 3. Do's en Don'ts voor Reizigers

### De Do's
- **Controleer de Meter**: Controleer altijd of de taximeter aan staat.
- **Eerst Onderhandelen**: Voor Tuk-Tuk's of motoren, *spreek een prijs af* voordat u vertrekt.
- **Gebruik Technologie**: Vertrouw op **Google Maps** voor nauwkeurige busnummers.

### De Don'ts
- **Onderhandel niet te hard**: Hoewel onderhandelen normaal is, *vermijd agressief afdingen*.
- **Respecteer Monniken**: Zit niet op de aangewezen **"Priest Seats"** in bussen of treinen.
- **Let op uw voeten**: *Laat uw voeten nooit op stoelen rusten* en gebruik ze niet om naar objecten te wijzen.

---

## 4. Voorbereiding & Veiligheid
- **Weer**: Thailand is heet. Draag water en zonbescherming bij u.
- **Alarmnummer**: Bel **1155** voor de *Toeristenpolitie*.
- **Bagageveiligheid**: Bewaar waardevolle spullen in een handbagage tijdens nachtreizen.
---
## Aanbevolen Apps en Websites voor Accommodatie in Thailand
---
Om de perfecte accommodatie te vinden die aan uw behoeften voldoet in Thailand, worden de volgende apps en websites ten zeerste aanbevolen. Hieronder vindt u een gedetailleerd overzicht van hun diensten en betalingssystemen.

### 1. Primaire Boekingsapps en Websites
**Agoda (App/Website)**
- **Service**: Als bedrijf gevestigd in Thailand biedt het de meest uitgebreide selectie en concurrerende prijzen voor hotels, appartementen en villa's in het hele land.
- **Belangrijkste kenmerk**: Via "Agoda Homes" kunnen gebruikers condo's en privéhuizen huren; exclusieve kortingen zijn vaak beschikbaar voor VIP-leden.
- **Betaling**: Ondersteunt Credit/Debit Card, PayPal en Google Pay. Sommige hotels bieden de opties "Nu boeken, later betalen" of "Betalen bij het hotel".

**Booking.com (App/Website)**
- **Service**: Wereldwijd veel gebruikt, met hotels van alle niveaus in heel Thailand.
- **Belangrijkste kenmerk**: Veel kamertypes bieden gratis annuleren, waardoor gebruikers kunnen boeken zonder onmiddellijke vooruitbetaling.
- **Betaling**: Hoewel meestal een creditcard of betaalpas vereist is als garantie, bieden veel accommodaties de mogelijkheid om de daadwerkelijke betaling persoonlijk (contant of met kaart) te doen bij aankomst in het hotel.

**Airbnb (App/Website)**
- **Service**: Ideaal voor het huren van lokale appartementen, privéhuizen en unieke boutique verblijven.
- **Belangrijkste kenmerk**: Perfect voor gezinnen of groepen die de voorkeur geven aan kamers met keuken en zithoek.
- **Betaling**: Vereist vooruitbetaling via Credit/Debit Card, Google Pay of PayPal. (Let op: Er is geen optie om ter plaatse te betalen; alle transacties worden afgehandeld via de app).

### 2. Prijsvergelijking en Regionale Apps
**Trip.com**
- **Service**: Hoewel gevestigd in China, biedt het vaak aanzienlijke promoties voor hotels in Thailand.
- **Betaling**: Ondersteunt Credit/Debit Cards en diverse internationale betalingssystemen.

**Traveloka**
- **Service**: Populair in heel Zuidoost-Azië, stelt gebruikers in staat om hotelboekingen te combineren met vliegtickets.
- **Betaling**: Ondersteunt Credit/Debit Cards en biedt een unieke optie om contant te betalen bij 7-Eleven Counter Services in Thailand.

### 3. Overzicht van Geleverde Diensten
- **Hotelboekingen**: Bekijk en filter hotels met een beoordeling van 1 tot 5 sterren.
- **Serviced Apartments**: Toegang tot huiselijke kamers ontworpen voor verblijven voor langere tijd.
- **Hostel/Slaapzaal**: Boek betaalbare bedden voor solo- of budgetreizigers.
- **Realtime Beschikbaarheid**: Controleer direct de beschikbaarheid van kamers en lees geverifieerde gebruikersbeoordelingen.

### 4. Gedetailleerde Betalingsinformatie
Houd bij het betalen voor accommodatie in Thailand rekening met het volgende:
- **Credit/Debit Card**: Het hebben van een internationale Visa of Mastercard is de handigste methode.
- **Counter Service**: Als u geen creditcard heeft, kunt u met apps zoals Traveloka online boeken en contant betalen bij elk 7-Eleven-loket.
- **Borg**: Wees bereid om bij aankomst een borg in contanten te betalen (meestal tussen de 1.000 en 3.000 Baht) om de kamersleutels te ontvangen. Deze wordt terugbetaald bij het uitchecken.
- **App Valuta**: Stel bij het browsen in de apps de valuta in op Thai Baht (THB) om de meest nauwkeurige lokale prijzen te zien.

### Eindoverzicht voor Reizigers
Voor de meest nauwkeurige en uitgebreide service in Thailand wordt aanbevolen om **Agoda** prioriteit te geven voor boekingen en **Google Maps** te gebruiken om hotellocaties te verifiëren. Samen bieden deze tools de beste dekking voor reizigers door het hele land.`,
    appsGuideMarkdown: `# Essentiële Apps & Tools voor Thailand
---
Voot een soepele reis in Thailand zijn de volgende apps en websites essentieel. Hieronder volgt een overzicht van hun diensten en betalingssystemen.

## 1. Taxi-apps (Auto's & Motoren)
### Grab
- **Service**: Meest betrouwbaar voor auto's, motoren, maaltijdbezorging en pakketten.
- **Betaling**: Contant, Credit/Debit Card en GrabPay wallet.
### Bolt
- **Service**: Vergelijkbaar met Grab maar vaak favoriet vanwege de lagere tarieven.
- **Betaling**: Voornamelijk contant, hoewel ook kaarten worden geaccepteerd.

---
## 2. Boekingsapps (Reizen tussen steden)
### 12Go Asia
- **Service**: Het belangrijkste platform voor het boeken van treinen, bussen en veerboten in heel Thailand.
### D-Ticket (Thaise Staatsspoorwegen)
- **Service**: Officiële app om direct langeafstandstreinkaartjes te boeken bij de nationale spoorwegen.

---
## 3. Navigatie & Openbaar Vervoer Tools
### Google Maps
- **Essentieel Voor**: Realtime verkeer, wandelnavigatie en het controleren van busnummers in Bangkok.
### ViaBus
- **Service**: Realtime bus-tracking voor Bangkok en andere gebieden.

---
## 4. Apps van Luchtvaartmaatschappijen (Binnenlandse lussen)
- **AirAsia**, **Nok Air**, **Thai Lion Air**

---
## 5. Overzicht van Betalingssystemen in Thailand
- **Contant**: Altijd nodig voor street food, markten en klein transport.
- **PromptPay (QR)**: Veel gebruikt door de lokale bevolking.
- **EMV (Contactloos)**: Internationale kaarten kunnen rechtstreeks worden gebruikt bij de MRT en sommige bussen in Bangkok.

---
## 6. Essentiële Toolkit voor Reizigers
1. **Google Maps** (Navigatie)
2. **Grab/Bolt** (Taxi-apps)
3. **12Go Asia** (Reisboekingen)
4. **Google Translate** (Communicatie)

---
## Aanbevolen Apps en Websites voor Accommodatie in Thailand
---
Om de perfecte accommodatie te vinden die aan uw behoeften voldoet in Thailand, worden de volgende apps en websites ten zeerste aanbevolen. Hieronder vindt u een gedetailleerd overzicht van hun diensten en betalingssystemen.

### 1. Primaire Boekingsapps en Websites
**Agoda (App/Website)**
- **Service**: Als bedrijf gevestigd in Thailand biedt it de meest uitgebreide selectie en concurrerende prijzen voor hotels, appartementen en villa's in het hele land.
- **Betaling**: Credit/Debit Card, PayPal en Google Pay.

**Booking.com (App/Website)**
- **Service**: Hotels over de hele wereld en Thailand.
- **Betaling**: Credit/Debit Card (meestal voor garantie), betalen ter plaatse.

**Airbnb (App/Website)**
- **Service**: Condo's en privéhuizen.
- **Betaling**: Vooruitbetaling via de app.

### 2. Prijsvergelijking en Regionale Apps
**Trip.com**
- **Service**: Grote promoties voor hotels in Thailand.

**Traveloka**
- **Service**: Vliegtickets + hotel, contant betalen bij 7-Eleven Thailand.
`
  },
  filipino: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Comprehensive Guide to Transportation in Thailand
---
## 1. Transportation Options & Infrastructure

### Bangkok Mass Transit (Intra-city)
To avoid Bangkok’s notorious traffic, use the rail systems:
- **BTS Skytrain**: *Ideal for reaching the city center and major shopping malls. Use a **Rabbit Card** for convenience.*
- **MRT Subway**: *Connects to different areas than the BTS. You can pay directly using **Contactless Credit/Debit cards (EMV system)**.*
- **Airport Rail Link (ARL)**: *The fastest route from Suvarnabhumi Airport (BKK) into the city.*

### Ride-Hailing & Taxis
- **Apps (Grab / Bolt / Maxim)**: *Highly recommended* as prices are transparent and pre-determined. **Grab** is the most widely used, while **Bolt** often offers lower rates.
- **Metered Taxis**: Available for street hail. **Always insist on "Meter Please."** Be cautious at night or during rain.

### Traditional & Local Transport
- **Tuk-Tuk**: *A quintessential Thai experience.* **Negotiate the price before boarding**, as they can be more expensive than taxis.
- **Motorbike Taxi (Win)**: Recognized by orange vests. *Fastest for bypassing traffic*, but prioritize safety.

---

## 2. Booking Guide: How to Buy Tickets

### One-Stop Online Platforms
- **12Go.asia**: *The most popular platform in Thailand* to compare prices and durations for trains, buses, and ferries.
- **Klook / Baolau**: Excellent for booking tickets and airport transfers.

### Specific Booking Methods
- **Trains**: Book via the **D-Ticket website/app** (up to 90 days in advance) or at station counters. *Passport is required.*
- **Buses**: Purchase at terminal counters, the **Transport Co., Ltd website**, or via **7-Eleven Counter Service**.

---

## 3. Traveler's Do's and Don'ts

### The Do’s
- **Verify the Meter**: Always check if the taxi meter is on.
- **Negotiate First**: For Tuk-Tuks or Motorbikes, *agree on a price* before moving.
- **Use Tech**: Rely on **Google Maps** for accurate bus numbers.

### The Don’ts
- **Don't Over-Haggle**: While negotiating is normal, *avoid aggressive bargaining*.
- **Respect Monks**: Do not sit in designated **"Priest Seats"** on buses or trains.
- **Mind Your Feet**: *Never rest your feet on seats* or use them to point at objects.

---

## 4. Preparation & Safety
- **Weather**: Thailand is hot. Carry water and sun protection.
- **Emergency Number**: Dial **1155** for the *Tourist Police*.
- **Luggage Safety**: Keep valuables in a hand-carry bag on overnight trips.`
  },
  farsi: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Comprehensive Guide to Transportation in Thailand
---
## 1. Transportation Options & Infrastructure

### Bangkok Mass Transit (Intra-city)
To avoid Bangkok’s notorious traffic, use the rail systems:
- **BTS Skytrain**: *Ideal for reaching the city center and major shopping malls. Use a **Rabbit Card** for convenience.*
- **MRT Subway**: *Connects to different areas than the BTS. You can pay directly using **Contactless Credit/Debit cards (EMV system)**.*
- **Airport Rail Link (ARL)**: *The fastest route from Suvarnabhumi Airport (BKK) into the city.*

### Ride-Hailing & Taxis
- **Apps (Grab / Bolt / Maxim)**: *Highly recommended* as prices are transparent and pre-determined. **Grab** is the most widely used, while **Bolt** often offers lower rates.
- **Metered Taxis**: Available for street hail. **Always insist on "Meter Please."** Be cautious at night or during rain.

### Traditional & Local Transport
- **Tuk-Tuk**: *A quintessential Thai experience.* **Negotiate the price before boarding**, as they can be more expensive than taxis.
- **Motorbike Taxi (Win)**: Recognized by orange vests. *Fastest for bypassing traffic*, but prioritize safety.

---

## 2. Booking Guide: How to Buy Tickets

### One-Stop Online Platforms
- **12Go.asia**: *The most popular platform in Thailand* to compare prices and durations for trains, buses, and ferries.
- **Klook / Baolau**: Excellent for booking tickets and airport transfers.

### Specific Booking Methods
- **Trains**: Book via the **D-Ticket website/app** (up to 90 days in advance) or at station counters. *Passport is required.*
- **Buses**: Purchase at terminal counters, the **Transport Co., Ltd website**, or via **7-Eleven Counter Service**.

---

## 3. Traveler's Do's and Don'ts

### The Do’s
- **Verify the Meter**: Always check if the taxi meter is on.
- **Negotiate First**: For Tuk-Tuks or Motorbikes, *agree on a price* before moving.
- **Use Tech**: Rely on **Google Maps** for accurate bus numbers.

### The Don’ts
- **Don't Over-Haggle**: While negotiating is normal, *avoid aggressive bargaining*.
- **Respect Monks**: Do not sit in designated **"Priest Seats"** on buses or trains.
- **Mind Your Feet**: *Never rest your feet on seats* or use them to point at objects.

---

## 4. Preparation & Safety
- **Weather**: Thailand is hot. Carry water and sun protection.
- **Emergency Number**: Dial **1155** for the *Tourist Police*.
- **Luggage Safety**: Keep valuables in a hand-carry bag on overnight trips.`
  },
  polish: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Comprehensive Guide to Transportation in Thailand
---
## 1. Transportation Options & Infrastructure

### Bangkok Mass Transit (Intra-city)
To avoid Bangkok’s notorious traffic, use the rail systems:
- **BTS Skytrain**: *Ideal for reaching the city center and major shopping malls. Use a **Rabbit Card** for convenience.*
- **MRT Subway**: *Connects to different areas than the BTS. You can pay directly using **Contactless Credit/Debit cards (EMV system)**.*
- **Airport Rail Link (ARL)**: *The fastest route from Suvarnabhumi Airport (BKK) into the city.*

### Ride-Hailing & Taxis
- **Apps (Grab / Bolt / Maxim)**: *Highly recommended* as prices are transparent and pre-determined. **Grab** is the most widely used, while **Bolt** often offers lower rates.
- **Metered Taxis**: Available for street hail. **Always insist on "Meter Please."** Be cautious at night or during rain.

### Traditional & Local Transport
- **Tuk-Tuk**: *A quintessential Thai experience.* **Negotiate the price before boarding**, as they can be more expensive than taxis.
- **Motorbike Taxi (Win)**: Recognized by orange vests. *Fastest for bypassing traffic*, but prioritize safety.

---

## 2. Booking Guide: How to Buy Tickets

### One-Stop Online Platforms
- **12Go.asia**: *The most popular platform in Thailand* to compare prices and durations for trains, buses, and ferries.
- **Klook / Baolau**: Excellent for booking tickets and airport transfers.

### Specific Booking Methods
- **Trains**: Book via the **D-Ticket website/app** (up to 90 days in advance) or at station counters. *Passport is required.*
- **Buses**: Purchase at terminal counters, the **Transport Co., Ltd website**, or via **7-Eleven Counter Service**.

---

## 3. Traveler's Do's and Don'ts

### The Do’s
- **Verify the Meter**: Always check if the taxi meter is on.
- **Negotiate First**: For Tuk-Tuks or Motorbikes, *agree on a price* before moving.
- **Use Tech**: Rely on **Google Maps** for accurate bus numbers.

### The Don’ts
- **Don't Over-Haggle**: While negotiating is normal, *avoid aggressive bargaining*.
- **Respect Monks**: Do not sit in designated **"Priest Seats"** on buses or trains.
- **Mind Your Feet**: *Never rest your feet on seats* or use them to point at objects.

---

## 4. Preparation & Safety
- **Weather**: Thailand is hot. Carry water and sun protection.
- **Emergency Number**: Dial **1155** for the *Tourist Police*.
- **Luggage Safety**: Keep valuables in a hand-carry bag on overnight trips.`
  },
  romanian: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Comprehensive Guide to Transportation in Thailand
---
## 1. Transportation Options & Infrastructure

### Bangkok Mass Transit (Intra-city)
To avoid Bangkok’s notorious traffic, use the rail systems:
- **BTS Skytrain**: *Ideal for reaching the city center and major shopping malls. Use a **Rabbit Card** for convenience.*
- **MRT Subway**: *Connects to different areas than the BTS. You can pay directly using **Contactless Credit/Debit cards (EMV system)**.*
- **Airport Rail Link (ARL)**: *The fastest route from Suvarnabhumi Airport (BKK) into the city.*

### Ride-Hailing & Taxis
- **Apps (Grab / Bolt / Maxim)**: *Highly recommended* as prices are transparent and pre-determined. **Grab** is the most widely used, while **Bolt** often offers lower rates.
- **Metered Taxis**: Available for street hail. **Always insist on "Meter Please."** Be cautious at night or during rain.

### Traditional & Local Transport
- **Tuk-Tuk**: *A quintessential Thai experience.* **Negotiate the price before boarding**, as they can be more expensive than taxis.
- **Motorbike Taxi (Win)**: Recognized by orange vests. *Fastest for bypassing traffic*, but prioritize safety.

---

## 2. Booking Guide: How to Buy Tickets

### One-Stop Online Platforms
- **12Go.asia**: *The most popular platform in Thailand* to compare prices and durations for trains, buses, and ferries.
- **Klook / Baolau**: Excellent for booking tickets and airport transfers.

### Specific Booking Methods
- **Trains**: Book via the **D-Ticket website/app** (up to 90 days in advance) or at station counters. *Passport is required.*
- **Buses**: Purchase at terminal counters, the **Transport Co., Ltd website**, or via **7-Eleven Counter Service**.

---

## 3. Traveler's Do's and Don'ts

### The Do’s
- **Verify the Meter**: Always check if the taxi meter is on.
- **Negotiate First**: For Tuk-Tuks or Motorbikes, *agree on a price* before moving.
- **Use Tech**: Rely on **Google Maps** for accurate bus numbers.

### The Don’ts
- **Don't Over-Haggle**: While negotiating is normal, *avoid aggressive bargaining*.
- **Respect Monks**: Do not sit in designated **"Priest Seats"** on buses or trains.
- **Mind Your Feet**: *Never rest your feet on seats* or use them to point at objects.

---

## 4. Preparation & Safety
- **Weather**: Thailand is hot. Carry water and sun protection.
- **Emergency Number**: Dial **1155** for the *Tourist Police*.
- **Luggage Safety**: Keep valuables in a hand-carry bag on overnight trips.`
  },
  swedish: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Comprehensive Guide to Transportation in Thailand
---
## 1. Transportation Options & Infrastructure

### Bangkok Mass Transit (Intra-city)
To avoid Bangkok’s notorious traffic, use the rail systems:
- **BTS Skytrain**: *Ideal for reaching the city center and major shopping malls. Use a **Rabbit Card** for convenience.*
- **MRT Subway**: *Connects to different areas than the BTS. You can pay directly using **Contactless Credit/Debit cards (EMV system)**.*
- **Airport Rail Link (ARL)**: *The fastest route from Suvarnabhumi Airport (BKK) into the city.*

### Ride-Hailing & Taxis
- **Apps (Grab / Bolt / Maxim)**: *Highly recommended* as prices are transparent and pre-determined. **Grab** is the most widely used, while **Bolt** often offers lower rates.
- **Metered Taxis**: Available for street hail. **Always insist on "Meter Please."** Be cautious at night or during rain.

### Traditional & Local Transport
- **Tuk-Tuk**: *A quintessential Thai experience.* **Negotiate the price before boarding**, as they can be more expensive than taxis.
- **Motorbike Taxi (Win)**: Recognized by orange vests. *Fastest for bypassing traffic*, but prioritize safety.

---

## 2. Booking Guide: How to Buy Tickets

### One-Stop Online Platforms
- **12Go.asia**: *The most popular platform in Thailand* to compare prices and durations for trains, buses, and ferries.
- **Klook / Baolau**: Excellent for booking tickets and airport transfers.

### Specific Booking Methods
- **Trains**: Book via the **D-Ticket website/app** (up to 90 days in advance) or at station counters. *Passport is required.*
- **Buses**: Purchase at terminal counters, the **Transport Co., Ltd website**, or via **7-Eleven Counter Service**.

---

## 3. Traveler's Do's and Don'ts

### The Do’s
- **Verify the Meter**: Always check if the taxi meter is on.
- **Negotiate First**: For Tuk-Tuks or Motorbikes, *agree on a price* before moving.
- **Use Tech**: Rely on **Google Maps** for accurate bus numbers.

### The Don’ts
- **Don't Over-Haggle**: While negotiating is normal, *avoid aggressive bargaining*.
- **Respect Monks**: Do not sit in designated **"Priest Seats"** on buses or trains.
- **Mind Your Feet**: *Never rest your feet on seats* or use them to point at objects.

---

## 4. Preparation & Safety
- **Weather**: Thailand is hot. Carry water and sun protection.
- **Emergency Number**: Dial **1155** for the *Tourist Police*.
- **Luggage Safety**: Keep valuables in a hand-carry bag on overnight trips.`
  },
  turkish: {
    serviceName: 'Transportation Details in Thailand',
    grabBolt: {
      title: 'Grab & Bolt e-Hailing',
      items: [
        'Grab: The most reliable and widely used app in Thailand. Offers cars, taxis, and motorbikes.',
        'Bolt: Often cheaper than Grab, very popular in Bangkok, Phuket, and Chiang Mai.',
        'Payment: Both support cash or credit card (via app).',
        'Tip: Always check the pick-up point on the map to ensure accuracy.'
      ]
    },
    btsMrt: {
      title: 'BTS (Skytrain) & MRT (Underground)',
      schedule: 'Operating Hours: 06:00 - 24:00 daily.',
      tips: [
        'Rush Hours: 07:30-09:30 and 16:30-19:30 (Trains can be very crowded).',
        'Ticketing: Single journey tokens/cards are available at stations. Rabbit Cards (BTS) and MRT Cards are recommended for frequent use.',
        'Transfer: BTS and MRT are separate systems; you must exit one to enter the other.'
      ]
    },
    intercity: {
      trains: {
        title: 'Domestic Trains',
        items: [
          'State Railway of Thailand (SRT): Connects Bangkok to the North, Northeast, and South.',
          'Classes: 1st (Sleeper), 2nd (Sleeper/Seated), and 3rd (Wooden benches - budget).',
          'Booking: Recommended to book via D-Ticket website for long-distance routes.'
        ]
      },
      buses: {
        title: 'Highway Express Buses',
        items: [
          'Transport Co. (BKS): The official government bus service.',
          'Terminals: Mo Chit (North), Ekkamai (East), Southern Bus Terminal (Sai Tai Mai).',
          'VIP Buses: Highly recommended for long journeys (extra legroom and snacks).'
        ]
      },
      flights: {
        title: 'Flight Information',
        items: [
          'Suvarnabhumi (BKK): Primary international hub and full-service domestic flights (Thai Airways, Bangkok Airways).',
          'Don Mueang (DMK): Main low-cost carrier hub (AirAsia, Nok Air, Thai Lion Air).',
          'Transfer: A free shuttle bus operates between BKK and DMK for passengers with a valid ticket.'
        ]
      }
    },
    dosAndDonts: {
      dos: {
        title: 'Do’s',
        items: [
          'Wear a face mask in crowded public transport (highly appreciated).',
          'Give up your seat to monks, elderly, pregnant women, and children.',
          'Always have small bills/coins for local transport.'
        ]
      },
      donts: {
        title: 'Don’ts',
        items: [
          'Don’t eat or drink on the BTS/MRT.',
          'Don’t step on the doors when they are closing.',
          'Don’t negotiate prices with meter-taxis (ensure they turn the meter on).'
        ]
      }
    },
    fullGuideMarkdown: `# Comprehensive Guide to Transportation in Thailand
---
## 1. Transportation Options & Infrastructure

### Bangkok Mass Transit (Intra-city)
To avoid Bangkok’s notorious traffic, use the rail systems:
- **BTS Skytrain**: *Ideal for reaching the city center and major shopping malls. Use a **Rabbit Card** for convenience.*
- **MRT Subway**: *Connects to different areas than the BTS. You can pay directly using **Contactless Credit/Debit cards (EMV system)**.*
- **Airport Rail Link (ARL)**: *The fastest route from Suvarnabhumi Airport (BKK) into the city.*

### Ride-Hailing & Taxis
- **Apps (Grab / Bolt / Maxim)**: *Highly recommended* as prices are transparent and pre-determined. **Grab** is the most widely used, while **Bolt** often offers lower rates.
- **Metered Taxis**: Available for street hail. **Always insist on "Meter Please."** Be cautious at night or during rain.

### Traditional & Local Transport
- **Tuk-Tuk**: *A quintessential Thai experience.* **Negotiate the price before boarding**, as they can be more expensive than taxis.
- **Motorbike Taxi (Win)**: Recognized by orange vests. *Fastest for bypassing traffic*, but prioritize safety.

---

## 2. Booking Guide: How to Buy Tickets

### One-Stop Online Platforms
- **12Go.asia**: *The most popular platform in Thailand* to compare prices and durations for trains, buses, and ferries.
- **Klook / Baolau**: Excellent for booking tickets and airport transfers.

### Specific Booking Methods
- **Trains**: Book via the **D-Ticket website/app** (up to 90 days in advance) or at station counters. *Passport is required.*
- **Buses**: Purchase at terminal counters, the **Transport Co., Ltd website**, or via **7-Eleven Counter Service**.

---

## 3. Traveler's Do's and Don'ts

### The Do’s
- **Verify the Meter**: Always check if the taxi meter is on.
- **Negotiate First**: For Tuk-Tuks or Motorbikes, *agree on a price* before moving.
- **Use Tech**: Rely on **Google Maps** for accurate bus numbers.

### The Don’ts
- **Don't Over-Haggle**: While negotiating is normal, *avoid aggressive bargaining*.
- **Respect Monks**: Do not sit in designated **"Priest Seats"** on buses or trains.
- **Mind Your Feet**: *Never rest your feet on seats* or use them to point at objects.

---

## 4. Preparation & Safety
- **Weather**: Thailand is hot. Carry water and sun protection.
- **Emergency Number**: Dial **1155** for the *Tourist Police*.
- **Luggage Safety**: Keep valuables in a hand-carry bag on overnight trips.`
  },
};
