const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  generateStatsFile: true,
  statsFilename: 'analyze/client-stats.json',
})

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
      {
        protocol: 'https',
        hostname: 'thutatravel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // turbopack: {},
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
module.exports = withBundleAnalyzer(nextConfig)