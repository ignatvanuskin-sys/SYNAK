import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static landing page — no server logic needed.
  output: "export",
  // Directory-style URLs: /privacy/ -> privacy/index.html.
  // Работает на любых статических хостингах и во всех простых серверах.
  trailingSlash: true,
  // Images are pre-optimized during asset build (WebP), so
  // the built-in optimizer is not required for static hosting.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
