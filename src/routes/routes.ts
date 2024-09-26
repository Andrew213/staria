import build, { getParam } from 'build-route-tree';

const rawTree = {
  about: null,
  account: {
    dashboard: null,
    investments: null,
    settings: null,
    membership: {
      success: null,
      cancel: null,
    },
    referral: null,
  },

  blog: {
    blogSlug: getParam(null),
  },
  community: {
    communityName: getParam({
      research: {
        projectName: getParam({
          projectRound: getParam(null),
        }),
      },
    }),
    manage: {
      communityName: getParam(null),
    },
    deals: {
      communityName: getParam(null),
    },
    dashboard: {
      communityName: getParam(null),
    },
    new: null,
  },
  contact: null,
  earn: null,
  faq: {
    faqCategory: getParam({
      faqSlug: getParam(null),
    }),
  },
  invest: null,
  pricing: null,
  research: {
    projectName: getParam({
      projectRound: getParam(null),
    }),
  },
  'reset-password': null,
  'reset-password-request': null,
  resources: {
    resourceSlug: getParam(null),
  },
  signin: null,
  signup: null,
  'verify-email': null,
};

export const routes = build(rawTree);

export const unProtectedRoutes = [
  routes.signup.getRoutePath(),
  routes.signin.getRoutePath(),
  routes['reset-password-request'].getRoutePath(),
  routes['verify-email'].getRoutePath(),
  routes['reset-password'].getRoutePath(),
];

export const protectedRoutes = [routes.account.getRoutePath(), routes.community.getRoutePath()];
