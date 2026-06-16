import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(/*turbopackIgnore: true*/ process.cwd(), "../../"),
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
