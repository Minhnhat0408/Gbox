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
      {
        protocol: 'https',
        hostname:'i.pinimg.com'
      },
      {
        protocol: 'https',
        hostname:'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org'
      },
      {
        protocol: 'https',
        hostname: 'cdn2.steamgriddb.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.hobbyconsolas.com'
      },
      {
        protocol: 'https',
        hostname: 'icon-library.com'
      },
      {
        protocol: 'https',
        hostname: 'www.oyunhilelerim.xyz'
      }
    ],
  },
};

module.exports = nextConfig;
