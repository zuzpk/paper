/* eslint-disable @typescript-eslint/no-unused-vars */
const API_URL = "http://localhost:3001/@/"
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");

const buildConf = () => {

const [ d, distDir, bistDir ] = process.argv.find(v => v.indexOf('dir=') > -1).split("=")

return `import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async rewrites(){
    return [
      { source: "/@/:method*/:action*", destination: "${API_URL}:method*/:action*" },
      { source: "/@/:method*", destination: "${API_URL}:method*" }
    ]
  },
  distDir: "${bistDir || distDir || `.next`}",
  cleanDistDir: true,
  poweredByHeader: false,
  images: {
    loader: 'custom',
    loaderFile: './imgloader.ts',
    remotePatterns: [
        {
            protocol: "https",
            hostname: "*"
        }
    ]
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
    reactRemoveProperties: true,
  },

  // Experimental TypeScript features
  experimental: {
    // Enable type-checked routing
    typedRoutes: true,
    
    // Enable server actions
    serverActions: {
      bodySizeLimit: '1mb',
      allowedOrigins: ['*']
    },
  },

  // Performance and build optimizations
  productionBrowserSourceMaps: false,
  reactStrictMode: false,

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,  
      fs: false,
      path: false,
      url: false
    };
    return config;
  },

};

export default nextConfig;`;
}

fs.writeFileSync(
    `./next.config.ts`,
    buildConf(),
    {
        encoding:'utf8',
        flag:'w'
    }
)