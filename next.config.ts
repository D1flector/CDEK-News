import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "1e14c3489fcb.vps.myjino.ru",
        port: "5000",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
