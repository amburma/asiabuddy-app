/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  async rewrites() {
    return [
      {
        source: '/thailand',
        destination: 'https://asiabuddy-thailand-vite.vercel.app/',
      },
      {
        source: '/thailand/:path*',
        destination: 'https://asiabuddy-thailand-vite.vercel.app/:path*',
      },
    ];
  },
}
module.exports = nextConfig
