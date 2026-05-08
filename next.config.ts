import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TypeScript Error ရှိရင်တောင် Build ဆက်လုပ်ဖို့ ခွင့်ပြုလိုက်တာပါ
    ignoreBuildErrors: true, 
  },
  eslint: {
    // ESLint Error တွေကိုလည်း ခဏ ကျော်ခိုင်းထားလိုက်ပါ
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;