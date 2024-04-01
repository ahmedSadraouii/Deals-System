/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    // These widths are used when the next/image component uses layout="responsive" or layout="fill"
    deviceSizes: [640, 768, 1024, 1280],
    // These widths are used when the next/image component uses layout="fixed" or layout="intrinsic".
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['dev.api.aldi.amplicade.com'],
    path: '/_next/image',
    loader: 'default',
  },
  sassOptions: {
    includePaths: ['node_modules', 'styles'],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    CONTENT_API_URL: process.env.CONTENT_API_URL,
    SHARED_API_URL: process.env.SHARED_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/auth-api/:path*',
        destination: `https://dev.api.aldi.amplicade.com/:path*`,
      },
    ];
  },
};

export default nextConfig;
