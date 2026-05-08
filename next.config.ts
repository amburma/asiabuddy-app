import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* TypeScript Error ရှိနေသော်လည်း Build ဆက်လုပ်ရန် */
  typescript: {
    ignoreBuildErrors: true,
  },

  /* Images optimization ကို ပိတ်ထားရန် */
  images: {
    unoptimized: true,
  },

  /* မှတ်ချက် - ESLint ကို ဤနေရာတွင် လုံးဝ မထည့်ပါနှင့် */
};

export default nextConfig;