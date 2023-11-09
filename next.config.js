/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
      {
        protocol: "https",
        hostname: "**.ign.com",
      },
      {
        protocol: "https",
        hostname: "**.ignimgs.com",
      },
      {
        protocol: "http",
        hostname: "**.ignimgs.com",
      },
      {
        protocol: "https",
        hostname: "**.com",
      },
      {
        protocol: "https",
        hostname: "**.photos",
      },
      {
        protocol: "https",
        hostname: "inybkzznasdhmswsixhd.supabase.co",
      },
      {
        protocol: "https",
        hostname: "pspmedia.ign.com",
      },
      {
        hostname: "assets1.ignimgs.com",
        protocol: "https",
      },
      {
        hostname: "assets1.ignimgs.com",
        protocol: "http",
      },
      {
        hostname: "assets2.ignimgs.com",
        protocol: "https",
      },
      {
        hostname: "assets2.ignimgs.com",
        protocol: "http",
      },
      {
        hostname: "assets3.ignimgs.com",
        protocol: "https",
      },
      {
        hostname: "assets3.ignimgs.com",
        protocol: "http",
      },
      {
        hostname: "assets.ignimgs.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
