import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  typescript: {
    // the spotify-worker type import pulls in its entire module graph (cloudflare:workers, lastfm-sdk, etc.)
    // which can't be resolved during vercel builds. type checking is done locally instead.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
