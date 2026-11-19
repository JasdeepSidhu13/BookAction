import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@electric-sql/pglite", "pg", "pdf-parse"],
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
