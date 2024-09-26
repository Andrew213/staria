// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://7903bb411906a56e5bff13f55d337b3e@o4507492597104640.ingest.de.sentry.io/4507492697374800',

  environment: process.env.NEXT_PUBLIC_NODE_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  spotlight: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
});
