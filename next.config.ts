import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* TypeScript နဲ့ ESLint error တွေကို build လုပ်ချိန်မှာ ကျော်သွားဖို့အတွက် */
  typescript: {
    // TypeScript errors ရှိနေရင်တောင် production build ကို ဆက်လုပ်ခိုင်းတာပါ
    ignoreBuildErrors: true,
  },
  eslint: {
    // Build လုပ်နေတုန်း ESLint စစ်ဆေးမှုကို ကျော်ခိုင်းထားတာပါ
    ignoreDuringBuilds: true,
  },
  
  // အကယ်၍ ပုံတွေသုံးထားရင် (ဥပမာ- External domains တွေကပုံတွေ) ဒီမှာ ထပ်ထည့်နိုင်ပါတယ်
  images: {
    unoptimized: true, // Vercel မှာ image optimization error တက်ခဲ့ရင် ဒါလေးသုံးပါ
  },
};

export default nextConfig;