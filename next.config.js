const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // https://react-svgr.com/docs/next/#usage
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;

    // https://docs.family.co/connectkit/getting-started#getting-started-nextjs
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // fix build warning
    config.externals.push('pino-pretty' /* add any other modules that might be causing the error */);

    return config;
  },
  async redirects() {
    return [
      {
        source: '/launchpad',
        destination: '/invest',
        permanent: true,
      },
      {
        source: '/faq/compliance/restricted-countries-staria-launchpad',
        destination: '/faq/compliance/restricted-countries',
        permanent: true,
      },
      {
        source: '/faq/compliance/how-complete-kyc-staria-launchpad',
        destination: '/faq/compliance/how-complete-kyc',
        permanent: true,
      },
      {
        source: '/faq/investment/detailed-information-private-deals-staria-network',
        destination: '/faq/investment/detailed-information-private-deals',
        permanent: true,
      },
      {
        source: '/faq/compliance/is-kyc-mandatory-staria-network',
        destination: '/faq/compliance/is-kyc-mandatory',
        permanent: true,
      },
      {
        source: '/faq/compliance/kyc-levels-staria-network',
        destination: '/faq/compliance/kyc-levels',
        permanent: true,
      },
      {
        source: '/faq/compliance/project-compliance-check-staria-launchpad',
        destination: '/faq/compliance/project-compliance-check',
        permanent: true,
      },
      {
        source: '/faq/compliance/changes-in-regulations-staria-launchpad',
        destination: '/faq/compliance/changes-in-regulations',
        permanent: true,
      },
      {
        source: '/faq/compliance/minimum-age-requirement-staria-network',
        destination: '/faq/compliance/minimum-age-requirement',
        permanent: true,
      },
      {
        source: '/faq/due-diligence/private-deal-selection-staria-network',
        destination: '/faq/due-diligence/private-deal-selection',
        permanent: true,
      },
      {
        source: '/faq/investment/how-does-lottery-allocation-work-on-staria-network',
        destination: '/faq/investment/how-does-draw-allocation-work',
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.staria.network',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-staging.staria.network',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withSentryConfig(nextConfig, {
  org: 'staria-network',
  project: 'frontend-app',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
