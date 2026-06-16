/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  async redirects() {
    return [
      {
        source: '/thailand/:path*',
        has: [{ type: 'host', value: 'thailand.asiabuddy.app' }],
        destination: 'https://asiabuddy.app/thailand/:path*',
        permanent: true,
      }
    ]
  },
}
module.exports = nextConfig
