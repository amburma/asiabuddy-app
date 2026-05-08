import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* TypeScript Error ရှိရင်တောင် Build ဆက်လုပ်ဖို့ ခွင့်ပြုခြင်း */
  typescript: {
    ignoreBuildErrors: true,
  },
  
  /* ESLint ကို Next.js 15+ အတွက် စနစ်တကျ ကျော်ခိုင်းခြင်း */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /* Turbopack သို့မဟုတ် အခြား optimization များအတွက် (လိုအပ်လျှင်) */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;