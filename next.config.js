/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  async redirects() {
    return [
      {
        source: '/thailand',
        destination: 'https://thailand.asiabuddy.app',
        permanent: false,
      },
      {
        source: '/thailand/:path*',
        destination: 'https://thailand.asiabuddy.app/:path*',
        permanent: false,
      },
    ]
  },
}
module.exports = nextConfig
