/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  experimental: {
    outputStandalone: true,
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true // !isProd
  },
  images: {
    // These widths are used when the next/image component uses layout="responsive" or layout="fill"
    deviceSizes: [640, 768, 1024, 1280],
    // These widths are used when the next/image component uses layout="fixed" or layout="intrinsic".
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
    path: "/_next/image",
    loader: "default",
  },
  sassOptions: {
    includePaths: ["node_modules", "styles"],
  },
  env: {
    WEBAPI_BASEURL: process.env.WEBAPI_BASEURL
  },
};

export default nextConfig;
