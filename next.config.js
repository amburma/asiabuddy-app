/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  outputFileTracingExcludes: {
    '*': ['./app/thailand/node_modules/**'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ysntqbakmqwuxljknwjg.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  turbopack: {},
  async redirects() {
    return [
      {
        source: '/thailand/:path*',
        has: [{ type: 'host', value: 'thailand.asiabuddy.app' }],
        destination: 'https://asiabuddy.app/thailand/:path*',
        permanent: true,
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'thailand.asiabuddy.app' }],
        destination: 'https://asiabuddy.app/thailand',
        permanent: true,
      }
    ]
  },
}
module.exports = nextConfig