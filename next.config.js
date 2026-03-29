/** @type {import('next').NextConfig} */

// Auto-detect NEXTAUTH_URL from Vercel's built-in VERCEL_URL env var
// This prevents "TypeError: Invalid URL" when NEXTAUTH_URL is not explicitly set
if (process.env.VERCEL_URL && !process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`
}

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  generateEtags: false,
  poweredByHeader: false,
  compress: false,
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
}

module.exports = nextConfig
