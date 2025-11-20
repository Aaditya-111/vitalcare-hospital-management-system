/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable static optimization for all pages
  output: 'standalone',
  // Disable static generation of API routes
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Disable static optimization for all pages
  generateEtags: false,
  // Disable static optimization for API routes
  
  // Disable static optimization for all pages
  poweredByHeader: false,
  // Disable static optimization for all pages
  compress: false,
  // Disable static optimization for all pages
  productionBrowserSourceMaps: false,
  // Disable static optimization for all pages
  optimizeFonts: false,
  // Disable static optimization for all pages
  swcMinify: true,
}

module.exports = nextConfig
