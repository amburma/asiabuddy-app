import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // ❌ Remove any eslint block like this:
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;