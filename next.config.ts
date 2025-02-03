import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Dodaj domeny zewnętrznych źródeł obrazów
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000', // Zmienna środowiskowa
  },
  webpack(config) {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components'); // Alias dla ścieżek
    return config;
  },
};

export default nextConfig;
