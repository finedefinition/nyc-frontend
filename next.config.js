/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'fakeimg.pl',
      },
    ],
  },
};

module.exports = nextConfig;
