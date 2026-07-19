import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/Portfolio", // <-- Uncomment this and make sure "Portfolio" matches your GitHub repo name casing exactly
};

export default nextConfig;
