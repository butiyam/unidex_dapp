/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do NOT include output: 'export'
  reactStrictMode: true,
  experimental: {
    serverActions: false, // optional
  },
};

module.exports = nextConfig;
