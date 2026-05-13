/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // ဒါက Security အကုန်ကျော်ပြီး ပုံပေါ်အောင် လုပ်ပေးတာပါ
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ဘယ် website ကပုံမဆို ပေါ်ခိုင်းတာပါ
      },
    ],
  },
};

export default nextConfig;