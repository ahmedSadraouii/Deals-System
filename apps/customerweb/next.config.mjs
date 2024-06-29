/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    dangerouslyAllowSVG: true,
    // These widths are used when the next/image component uses layout="responsive" or layout="fill"
    deviceSizes: [640, 768, 1024, 1280],
    // These widths are used when the next/image component uses layout="fixed" or layout="intrinsic".
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [{
      hostname: process.env.IMAGE_REMOTE_HOSTNAME
    }],
    path: '/_next/image',
    loader: 'default',
  },
  sassOptions: {
    includePaths: ['node_modules', 'styles'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    CONTENT_API_BASE_URL: process.env.CONTENT_API_BASE_URL,
    AUTH_API_BASE_URL: process.env.AUTH_API_BASE_URL,
    ADBE_API_BASE_URL: process.env.ADBE_API_BASE_URL,
    ADOBE_SCRIPT: process.env.ADOBE_SCRIPT,
  },
  skipTrailingSlashRedirect: true
};

export default nextConfig;
