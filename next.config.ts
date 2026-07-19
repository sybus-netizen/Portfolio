import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If hosting on a GitHub project page (e.g. https://<username>.github.io/<repo-name>),
  // uncomment the next line and change '/portfolio' to your repository name:
  // basePath: "/portfolio",
};

export default nextConfig;
