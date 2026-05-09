import { SupportedLanguage } from '../types';

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
  MM: {
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
  EN: {
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
  ES: {
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
  FR: {
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
  DE: {
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
  TH: {
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
};
