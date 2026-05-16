import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/icons/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },

  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      // Old ritual slugs → current slugs (301)
      { source: '/eu/en/rituales/canine-care', destination: '/eu/en/rituales/pampered-pup', permanent: true },
      { source: '/eu/en/rituales/flawless-bathroom', destination: '/eu/en/rituales/impeccable-bathroom', permanent: true },
      { source: '/eu/en/rituales/flawless-kitchen', destination: '/eu/en/rituales/impeccable-kitchen', permanent: true },
      { source: '/eu/en/rituales/perfect-dishware', destination: '/eu/en/rituales/perfect-dishes', permanent: true },
      { source: '/eu/en/rituales/plenitude-300', destination: '/eu/en/rituales/fulfillment-300', permanent: true },
      { source: '/eu/fr/rituales/soin-canin', destination: '/eu/fr/rituales/cocoon-canin', permanent: true },
      { source: '/eu/it/rituales/coccola-canina', destination: '/eu/it/rituales/coccole-canine', permanent: true },
      { source: '/eu/nl/rituales/hondenverzorging', destination: '/eu/nl/rituales/verwende-hond', permanent: true },
      { source: '/eu/nl/rituales/perfect-servies', destination: '/eu/nl/rituales/perfecte-vaat', permanent: true },
      { source: '/eu/nl/rituales/prestatie-300', destination: '/eu/nl/rituales/performance-300', permanent: true },
      { source: '/eu/nl/rituales/streling', destination: '/eu/nl/rituales/liefkozing', permanent: true },
      { source: '/eu/pt/rituales/louca-perfeita', destination: '/eu/pt/rituales/loica-perfeita', permanent: true },
      { source: '/eu/pt/rituales/rendimento-300', destination: '/eu/pt/rituales/desempenho-300', permanent: true },
    ];
  },

  experimental: {
    optimizePackageImports: ['next-intl'],
    scrollRestoration: true,
  },
};

export default withNextIntl(nextConfig);
