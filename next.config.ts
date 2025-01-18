import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "cloudflare-ipfs.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "utfs.io",
      },
      {
        hostname: "img.icons8.com",
      },
    ],
  },
};

export default nextConfig;
