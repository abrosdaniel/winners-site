/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/base/:path*",
        destination: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
