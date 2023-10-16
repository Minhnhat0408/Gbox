/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: false,
  images: {
    domains: [
      "assets1.ignimgs.com",
      "assets2.ignimgs.com",
      "assets3.ignimgs.com",
      "assets.ignimgs.com",
      "assets-prd.ignimgs.com",
      "media.rawg.io",
      "inybkzznasdhmswsixhd.supabase.co",
      "pspmedia.ign.com",
    ],
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
        protocol: 'https',
        hostname: '**'
      }
    ],
  },
};

module.exports = nextConfig;
