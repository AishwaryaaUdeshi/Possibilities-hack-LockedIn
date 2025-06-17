import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: false,
  },
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
};

export default nextConfig;
