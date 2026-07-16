'use client'

import Link from 'next/link'

export default function PartnerInvitePage() {
  return (
    <>

      <main className="min-h-screen bg-sacred-bg">
        {/* SECTION A — HERO */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-sacred-green/5 px-4">
          {/* Abstract background pattern */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-deep/20 via-transparent to-sacred-green/20" />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-soft rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sacred-green/30 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Decorative Header */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-gold-deep/30" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-sacred-green">
                AsiaBuddy Partner Program
              </span>
              <span className="w-12 h-[1px] bg-gold-deep/30" />
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl mb-6 tracking-tight leading-tight text-sacred-green font-bold font-serif">
              ခရီးသွားနည်းပညာခေတ်သစ်ကို AsiaBuddy နှင့်အတူ ပုံဖော်ကြပါစို့
            </h1>
            
            {/* Subheadline */}
            <p className="max-w-2xl mx-auto text-gray-700 text-sm md:text-base leading-relaxed mb-8">
              Work From Home Freelancer အဖြစ် AsiaBuddy ရဲ့ Affiliate Program ကို ဝင်ရောက်ပါဝင်ပြီး ဝင်ငွေတိုးလမ်းစအသစ်တစ်ခု ဖန်တီးလိုက်ပါ။
            </p>
            
            {/* CTA */}
            <div className="flex flex-col items-center gap-4">
              <a
                href="#contact"
                className="bg-gradient-to-r from-sacred-green to-emerald-950 text-white px-10 py-4 rounded-full shadow-2xl font-bold transition-all hover:shadow-3xl hover:-translate-y-1"
              >
                အသေးစိတ်လေ့လာရန်
              </a>
              <p className="text-xs text-gray-500 max-w-md">
                ဒစ်ဂျစ်တယ် Web Application တစ်ခုတည်းနဲ့ ခရီးစဉ်အကူအညီ၊ Booking နှင့် ဝင်ငွေခွဲဝေမှုအားလုံးကို လွယ်ကူစွာ စီမံနိုင်ပါသည်။
              </p>
            </div>
          </div>
        </section>

        {/* SECTION B — PRODUCT CONTEXT */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif text-sacred-green font-bold text-center mb-8">
              AsiaBuddy (ThaiGuide) ဆိုတာ ဘာလဲ?
            </h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-sm md:text-base">
                ယခင်က ကမ္ဘာလှည့်ခရီးသွားများသည် စာအုပ်ဆိုင်များတွင် Lonely Planet ကဲ့သို့ လမ်းညွှန်စာအုပ်များကို ဝယ်ယူဖတ်ရှုပြီး ခရီးသွားခဲ့ကြရသော်လည်း၊ ယနေ့ခေတ် Digital ကာလတွင် ထိုအတွေ့အကြုံကို နည်းပညာနှင့် ပေါင်းစပ်ပြီး အဆင့်မြှင့်တင်လိုက်ပါပြီ။
              </p>
              
              <p className="text-sm md:text-base">
                ကျွန်ုပ်တို့သည် ထိုင်းနိုင်ငံသို့ အလည်အပတ်၊ ဆေးကုသမှု၊ စီးပွားရေး သို့မဟုတ် ဈေးဝယ်ရန် သွားရောက်မည့် မြန်မာခရီးသွားများအားလုံး စိတ်အေးချမ်းသာစွာဖြင့် အကောင်းဆုံးခရီးစဉ်ကို ဖြတ်သန်းနိုင်ရန် ခေတ်မီနည်းပညာသုံး [ThaiGuide] Web Application ကို ဖန်တီးထားပါသည်။ ဖုန်း၊ ကွန်ပျူတာ သို့မဟုတ် Smart TV များမှတစ်ဆင့် အခမဲ့ ဝင်ရောက်အသုံးပြုနိုင်ပါသည်။
              </p>
            </div>

            {/* Live site preview card */}
            <div className="mt-8 glass-card p-6 text-center">
              <p className="text-sm text-gray-600 mb-4">လက်တွေ့ Product ကို ကြည့်ရန်</p>
              <Link
                href="https://asiabuddy.app/thailand/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-deep text-white px-6 py-3 rounded-full font-bold text-sm transition-all hover:bg-sacred-green"
              >
                asiabuddy.app/thailand/
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION C — FEATURES */}
        <section className="py-16 px-4 bg-sacred-bg">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif text-sacred-green font-bold text-center mb-4">
              AsiaBuddy (ThaiGuide) ၏ ထူးခြားသော Feature များ
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-sm">
              ခရီးသွားတစ်ဦး ရင်ဆိုင်ရလေ့ရှိသည့် အခက်အခဲများကို စမတ်ကျကျ ဖြေရှင်းပေးနိုင်သော အဓိက Feature (၅) ခု နှင့် သီးသန့်လေ့ကျင့်ပေးထားသော Private AI (၉) ခု ပါဝင်ပါသည်။
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="glass-card p-6 hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="font-serif text-lg text-sacred-green font-bold mb-3">
                  Destination Explorer
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  ထိုင်းနိုင်ငံ၏ အလှပဆုံးနှင့် လူကြိုက်အများဆုံး နေရာများကို လွယ်ကူစွာ စူးစမ်းနိုင်ခြင်း။
                </p>
              </div>

              {/* Card 2 */}
              <div className="glass-card p-6 hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-serif text-lg text-sacred-green font-bold mb-3">
                  AI Concierge Chat (Private AI ၉ ခု)
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  ခရီးစဉ်ဆွဲခြင်း၊ သွားလာရေး၊ တည်းခိုရေး၊ အစားအသောက်၊ Shopping၊ ဆေးကုသမှုနှင့် ညဘဝအပန်းဖြေခြင်းများအတွက် အချိန်မရွေး မေးမြန်းနိုင်သော ဒစ်ဂျစ်တယ်လမ်းညွှန်စနစ်။
                </p>
              </div>

              {/* Card 3 */}
              <div className="glass-card p-6 hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4">🧰</div>
                <h3 className="font-serif text-lg text-sacred-green font-bold mb-3">
                  Travel Toolbox
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  ဗီဇာလမ်းညွှန်၊ VAT Refund အခွန်ပြန်အမ်းငွေ တောင်းခံနည်း၊ THB Currency Converter (ငွေလဲနှုန်းတွက်ချက်စနစ်)၊ ထိုင်းစကားပြောလက်စွဲနှင့် ဒေသန္တရဥပဒေလမ်းညွှန်များ။
                </p>
              </div>

              {/* Card 4 */}
              <div className="glass-card p-6 hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4">🚨</div>
                <h3 className="font-serif text-lg text-sacred-green font-bold mb-3">
                  Safety & Emergency
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  ဘေးအန္တရာယ်ကင်းရှင်းရေးအတွက် ထိုင်းနိုင်ငံခရီးသွားရဲတပ်ဖ့် (Tourist Police Hotline: 1155) သို့ တိုက်ရိုက်ဆက်သွယ်နိုင်ခြင်း။
                </p>
              </div>

              {/* Card 5 */}
              <div className="glass-card p-6 hover:-translate-y-1 transition-transform md:col-span-2 lg:col-span-1">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="font-serif text-lg text-sacred-green font-bold mb-3">
                  Multi-language Support
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  မြန်မာဘာသာစကားအပါအဝင် အင်္ဂလိပ်၊ ထိုင်း၊ စပိန်၊ ပြင်သစ်၊ ဂျာမန် ၆ ဘာသာစကား ပံ့ပိုးပေးထားခြင်း။
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D — ROADMAP */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif text-sacred-green font-bold text-center mb-4">
              စနစ်ကျသော နည်းပညာနှင့် လုပ်ငန်းတိုးချဲ့မှု လမ်းပြမြေပုံ (Roadmap)
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-sm">
              AsiaBuddy ကို တစ်နေ့ထက်တစ်နေ့ ပိုမိုခိုင်မာတောင့်တင်းလာစေရန် နည်းပညာပိုင်းကို စနစ်တကျ တည်ဆောက်ထားပါသည်။
            </p>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-deep text-white flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="glass-card p-6 flex-1">
                  <h3 className="font-serif text-lg text-sacred-green font-bold mb-3">
                    အာရှဒေသတွင်း နိုင်ငံများတိုးချဲ့ခြင်း
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    စတင်မိတ်ဆက်သည့် ထိုင်းနိုင်ငံအပြင် စင်ကာပူ၊ ဂျပန်၊ ဗီယက်နမ်၊ တောင်ကိုရီးယား အစရှိသောနိုင်ငံများကို ထပ်မံတိုးချဲ့သွားမည် ဖြစ်ပါသည်။ (လောလောဆယ်တွင် မြန်မာနိုင်ငံရဲ့ခရီးစဉ်များကို ခေတ္တချန်လှပ်ထားပြီး အိမ်နီးချင်းနိုင်ငံများကို ဦးစားပေးထည့်သွင်းရန် စဉ်းစားထားပါသည်)
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-deep text-white flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="glass-card p-6 flex-1">
                  <h3 className="font-serif text-lg text-sacred-green font-bold mb-3">
                    အလိုအလျောက် Booking & Inquiry Flow
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    သုံးစွဲသူများသည် AI နှင့် ဆွေးနွေးပြီးနောက် သဘောတူပါက Contact Form မှတစ်ဆင့် အချက်အလက်ပေးပို့ကာ လွယ်ကူစွာ Booking တင်နိုင်ပါသည်။ ၎င်း Booking များအား Sales Team ၏ Telegram Group သို့ ချက်ချင်း Alert ပေးပို့ပြီး Approve ဖြစ်ပါက PDF Invoice ကို Customer ထံသို့ စနစ်တကျ အလိုအလျောက် ပေးပို့သွားနိုင်သည့် Automation စနစ်များ ပါဝင်ပါသည်။
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-deep text-white flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="glass-card p-6 flex-1">
                  <h3 className="font-serif text-lg text-sacred-green font-bold mb-3">
                    ကမ္ဘာ့အဆင့်မီ Affiliate စနစ်များနှင့် ချိတ်ဆက်မှု
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    GetYourGuide (GYG)၊ Trip.com၊ Booking.com နှင့် Klook တို့ကို စနစ်တကျ ချိတ်ဆက်ထားပြီး ဖြစ်ပါသည်။ (Agoda Affiliate Program မှာမူ လက်ရှိတွင် လျှောက်ထားဆဲ Pending အဆင့်တွင်ရှိပြီး အမြန်ဆုံးအပြီးသတ်ရန် ကြိုးပမ်းဆောင်ရွက်လျက် ရှိပါသည်)
                  </p>
                  
                  {/* Affiliate badges */}
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gold-deep text-white rounded-full text-sm font-medium">
                      GetYourGuide
                    </span>
                    <span className="px-4 py-2 bg-gold-deep text-white rounded-full text-sm font-medium">
                      Trip.com
                    </span>
                    <span className="px-4 py-2 bg-gold-deep text-white rounded-full text-sm font-medium">
                      Booking.com
                    </span>
                    <span className="px-4 py-2 bg-gold-deep text-white rounded-full text-sm font-medium">
                      Klook
                    </span>
                    <span className="px-4 py-2 border-2 border-dashed border-gray-400 text-gray-400 rounded-full text-sm font-medium">
                      Agoda (Pending)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION E — WHO SHOULD JOIN + INCOME MODEL */}
        <section className="py-16 px-4 bg-sacred-bg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif text-sacred-green font-bold text-center mb-8">
              Affiliate Program အကျိုးတူ ပူးပေါင်းဆောင်ရွက်ရန် ဖိတ်ခေါ်ခြင်း
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed mb-12">
              <p className="text-sm md:text-base">
                ကျွန်ုပ်တို့သည် ဝဘ်ဆိုက်ကို အောင်မြင်စွာ တည်ဆောက်ထားပြီးဖြစ်သော်လည်း လေယာဉ်လက်မှတ်ဝယ်ယူပေးခြင်းနှင့် ဟိုတယ်ဘိုကင် တင်ပေးခြင်းစသည့် Sales & Marketing ကဏ္ဍများတွင် အတူတကွ ပူးပေါင်းဆောင်ရွက်လိုသူ အသက်အရွယ်မရွေး Work From Home Freelancer များကို ဖိတ်ခေါ်လိုပါသည်။
              </p>
              <p className="text-sm md:text-base">
                နည်းပညာပိုင်း မတတ်ပါကလည်း အစအဆုံး သင်ကြားပေးသွားမည်ဖြစ်ပြီး၊ မြန်မာဘာသာစကားဖြင့် အသုံးပြုနိုင်ရန် ဖန်တီးထားခြင်းကြောင့် မည်သည့်အခက်အခဲမျှ ရှိလာနိုင်မည်မဟုတ်ပါ။
              </p>
            </div>

            {/* Who should join cards */}
            <h3 className="font-serif text-xl text-sacred-green font-bold text-center mb-6">
              ဘယ်သူတွေ လက်တွဲသင့်သလဲ။
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass-card p-6">
                <h4 className="font-serif text-base text-sacred-green font-bold mb-3">
                  မြန်မာနိုင်ငံရှိ လက်ရှိ Travel Agency များ
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  အခြားအေးဂျင့်များထံမှတစ်ဆင့် B2B ပြန်လည်ချိတ်ဆက်ပြီး ရောင်းချနေရသဖြင့် ကော်မရှင်အဆင့်ဆင့် အနှုတ်ခံရမှုကို ဖြေရှင်းနိုင်ပြီး ကမ္ဘာကျော် Platform များမှ ရရှိသော အကျိုးအမြတ် (Commission) ကို တိုက်ရိုက်ရရှိပါမည်။
                </p>
              </div>
              <div className="glass-card p-6">
                <h4 className="font-serif text-base text-sacred-green font-bold mb-3">
                  ပြည်တွင်း/ပြည်ပရှိ အချိန်ပိုင်းအပိုဝင်ငွေရရှိလိုသူများ
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  မိမိတို့၏ အဓိကအလုပ်ကို မထိခိုက်စေဘဲ အားလပ်ချိန်တွင် ဝင်ငွေရအောင် Work from Home (Freelancer) အဖြစ် လွယ်ကူစွာ လုပ်ကိုင်နိုင်ပါသည်။
                </p>
              </div>
              <div className="glass-card p-6">
                <h4 className="font-serif text-base text-sacred-green font-bold mb-3">
                  ခရီးသွားလုပ်ငန်း အသစ်စတင်လိုသူများ
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  ရင်းနှီးမတည်ငွေ အမြောက်အမြား မလိုဘဲ ဤ Platform အကူအညီဖြင့် အန္တရာယ်ကင်းစွာဖြင့် လုပ်ငန်းအတွေ့အကြုံ စတင်ရယူနိုင်ပါသည်။
                </p>
              </div>
            </div>

            {/* Commission model */}
            <div className="glass-card p-8">
              <h3 className="font-serif text-xl text-sacred-green font-bold text-center mb-4">
                ဝင်ငွေခွဲဝေမှုစနစ် (50/50 Commission Sharing) နှင့် စိုးရိမ်စရာမလိုသော အာမခံချက်များ
              </h3>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm">
                ဤလုပ်ငန်းသည် အင်တာနက်နှင့် ဖုန်းရှိရုံဖြင့် မည်သည့်နိုင်ငံ (မြန်မာ၊ ထိုင်း၊ ဂျပန် စသည်) ကမဆို လွတ်လပ်စွာ လုပ်ကိုင်နိုင်သော တရားဝင် အွန်လိုင်းလုပ်ငန်း ဖြစ်သောကြောင့် ဘယ်နိုင်ငံ၏ မည်သည့်ဥပဒေ ကန့်သတ်ချက်ကိုမျှ ထိခိုက်ခြင်းမရှိပါ။
              </p>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm">
                ငွေကြေးလိမ်လည်မှုများနှင့် ပတ်သက်၍လည်း သံသယဖြစ်စရာမလိုဘဲ အောက်ပါအတိုင်း ရိုးသားပွင့်လင်းစွာ ဆောင်ရွက်ရပါ�メည်။
              </p>

              {/* 50/50 Diagram */}
              <div className="bg-sacred-bg rounded-2xl p-6 mb-8">
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-deep text-white flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div className="flex-1 glass-card p-4 text-sm">
                      <span className="font-semibold text-sacred-green">ခရီးသည်များနှင့် ငွေပေးချေမှုကိစ္စရပ်အားလုံးကို ပူးပေါင်းဆောင်ရွက်သူကိုယ်တိုင် တိုက်ရိုက်ဆောင်ရွက်ရမည်ဖြစ်ပြီး ကျွန်ုပ်တို့နှင့် မသက်ဆိုင်ပါ။</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-deep text-white flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div className="flex-1 glass-card p-4 text-sm">
                      <span className="font-semibold text-sacred-green">Affiliate link များမှတစ်ဆင့် ဟိုတယ်၊ လေယာဉ်လက်မှတ်နှင့် ဝင်ကြေးလက်မှတ်များ ဝယ်ယူပြီးစီးသည့်အခါ ရရှိလာမည့် ကြားခံခ (Commission) ကို ကျွန်ုပ်တို့ထံတွင် Screenshot ပြ၍ တောင်းခံနိုင်ပါသည်။</span>
                    </div>
                  </div>

                  {/* Step 3 - 50/50 Split */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-deep text-white flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="glass-card p-4 text-sm mb-4">
                        <span className="font-semibold text-sacred-green">Agoda, Booking.com, Trip.com စသည့် ကုမ္ပဏီကြီးများထံမှ Commission ငွေဝင်လာသည်နှင့်တစ်ပြိုင်နက် ကျွန်ုပ်တို့နှစ်ဦးကြားတွင် တစ်ဝက်စီ (50/50) စနစ်တကျ ချက်ချင်း ပြန်လည်ခွဲဝေပေးမည် ဖြစ်ပါသည်။</span>
                      </div>
                      
                      {/* Visual 50/50 Split */}
                      <div className="flex h-16 rounded-lg overflow-hidden">
                        <div className="flex-1 bg-gold-deep flex items-center justify-center text-white font-bold">
                          50% သင့်ဆီသို့
                        </div>
                        <div className="flex-1 bg-sacred-green flex items-center justify-center text-white font-bold">
                          50% AsiaBuddy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Point 1 */}
              <div className="glass-card p-6 mb-4">
                <h4 className="font-serif text-base text-sacred-green font-bold mb-3">
                  ကိုယ်ပိုင်အကောင့်ဖြင့်သာ ဝယ်ယူရခြင်း (သုံးစွဲသူများထံမှ တိုက်ရိုက်ငွေမကောက်ခံပါ)
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  ကျွန်ုပ်တို့သည် သင့်ကိုယ်စား တိုက်ရိုက်ဝင်ရောက် ဝယ်ယူပေးမည် မဟုတ်ပါ။ သင်ကိုယ်တိုင် Platform ပေါ်တွင် အသုံးပြုပုံကို လေ့လာပြီး မိမိတို့၏ ကိုယ်ပိုင်အကောင့်ဖြင့်သာ ဝယ်ယူရမည်ဖြစ်ပါသည်။ (လိမ်လည်မှုမရှိစေရန် ဝယ်ယူသူထံမှ ဉီးစွာပထမ ဝန်ဆောင်မှုတန်ဖိုးငွေ လကိုခံရရှိပြီးမှသာ တစ်ဆင့်ဝယ်ယူပေးရန် အကြံပြုပါသည်)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION F — CONTACT / CTA */}
        <section id="contact" className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-sacred-green font-bold mb-6">
              ဆက်သွယ်ဆွေးနွေးရန်
            </h2>
            
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
              စိတ်ပါဝင်စားပြီး ကျွန်ုပ်တို့နှင့်အတူ လက်တွဲကာ ဝင်ငွေတိုးလမ်းစအဖြစ် ပူးပေါင်းလုပ်ကိုင်လိုပါက အသေးစိတ်အချက်အလက်များနှင့် လုပ်ငန်းလုပ်ဆောင်ပုံကို Zoom Meeting မှတစ်ဆင့် ထပ်မံရှင်းပြပေးသွားပါမည်။
            </p>

            {/* Website link card */}
            <div className="glass-card p-6 mb-8 inline-block">
              <p className="text-sm text-gray-600 mb-4">လက်တွေ့ Product ကို ကြည့်ရန်</p>
              <Link
                href="https://asiabuddy.app/thailand/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-deep text-white px-6 py-3 rounded-full font-bold text-sm transition-all hover:bg-sacred-green"
              >
                asiabuddy.app/thailand/
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>

            {/* Closing line */}
            <p className="text-xl md:text-2xl font-serif text-sacred-green font-bold mb-12 leading-relaxed">
              ခရီးသွားနည်းပညာခေတ်သစ်ကို AsiaBuddy နှင့်အတူ အားလုံးပဲ လက်တွဲလုပ်ကိုင်ဖို့ လှိုက်လှိုက်လှဲလှဲ ဖိတ်ခေါ်အပ်ပသည်ခင်ဗျာ။
            </p>

            {/* Contact buttons */}
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">ထပ်မံသိရှိလိုသော မေးခွန်းများရှိခဲ့လျှင်</p>
              <p className="text-lg font-semibold text-sacred-green mb-6">Mobile, Viber, WhatsApp, Telegram : +491793956759</p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/491793956759"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-sm transition-all hover:bg-green-600"
                >
                  WhatsApp
                </a>
                <a
                  href="https://t.me/+491793956759"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-bold text-sm transition-all hover:bg-blue-600"
                >
                  Telegram
                </a>
                <a
                  href="viber://chat?number=%2B491793956759"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-sm transition-all hover:bg-purple-700"
                >
                  Viber
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 px-4 bg-sacred-green text-white text-center">
          <p className="text-xs opacity-80">
            Confidential — for invited partners only, please do not share this link
          </p>
          <p className="text-xs opacity-60 mt-2">
            © 2026 AsiaBuddy Services. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  )
}
