import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["../../apps/api/prisma/generated/client/**/*"],
  },
};

export default nextConfig;
