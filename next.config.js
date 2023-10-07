/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "assets1.ignimgs.com",
      "assets2.ignimgs.com",
      "assets3.ignimgs.com",
      "assets.ignimgs.com",
      "assets-prd.ignimgs.com",
      "media.rawg.io",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
    ],
  },
};

module.exports = nextConfig;
