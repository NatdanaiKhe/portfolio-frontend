import type { NextConfig } from "next";

const cmsUrl = process.env.CMS_URL ?? "http://localhost:1337";
const cmsHostname = new URL(cmsUrl).hostname;

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: cmsUrl.startsWith("https") ? "https" : "http",
        hostname: cmsHostname,
      },
    ],
  },
};

export default nextConfig;
