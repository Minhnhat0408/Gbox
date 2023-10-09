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
    ],
  },
};

module.exports = nextConfig;
