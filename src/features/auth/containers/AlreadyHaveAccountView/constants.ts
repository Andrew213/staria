import { routes } from '@/routes';

export const data = {
  title: 'Oops, you already have an account!',
  supportingText: {
    firstText: 'If you believe this is a mistake or you forgot your password, please try signing in instead.',
    lastText: 'For further assistance, feel free to contact us:',
  },
  email: {
    linkHref: 'mailto:support@staria.network',
    linkText: 'support@staria.network',
  },
  link: {
    linkText: 'Sign Up',
    linkHref: routes.signup.getRedirectPath(),
    firstText: 'Let’s go back to ',
    lastText: 'and try with Gmail',
  },
} as const;
