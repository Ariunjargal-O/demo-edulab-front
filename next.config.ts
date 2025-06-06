import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  },
};

export default nextConfig;
