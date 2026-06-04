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
        destination: 'https://asiabuddy-thailand-vite-fsvgrviw7-amburmas-projects.vercel.app',
        permanent: false,
      },
      {
        source: '/thailand/:path*',
        destination: 'https://asiabuddy-thailand-vite-fsvgrviw7-amburmas-projects.vercel.app/:path*',
        permanent: false,
      },
    ]
  },
}
module.exports = nextConfig
