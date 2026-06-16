/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  outputFileTracingExcludes: {
    '*': ['./app/thailand/node_modules/**'],
  },
  turbopack: {},
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
