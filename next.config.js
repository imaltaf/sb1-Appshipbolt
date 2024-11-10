/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;