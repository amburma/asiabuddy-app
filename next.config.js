/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  async rewrites() {
    return [
      {
        source: '/thailand/:path*',
        destination: '/thailand/dist/:path*',
      },
    ];
  },
}
module.exports = nextConfig
