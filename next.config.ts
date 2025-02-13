import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  experimental: {
    esmExternals: false,
  },
  compress: false,
};

export default nextConfig;
