import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], 
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000', 
  },
  webpack(config) {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components'); 
    return config;
  },
};

export default nextConfig;
