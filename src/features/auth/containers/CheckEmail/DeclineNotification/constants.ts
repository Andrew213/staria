import { routes } from '@/routes';

export const data = {
  title: 'Oops, Email not found!',
  supportingText: {
    lastText: 'You might have used your Gmail account to create your account with:',
    firstText: 'We couldn’t find an account with this email.',
  },
  link: {
    firstText: 'Let’s go back to',
    linkHref: routes.signup.getRedirectPath(),
    linkText: 'Log in',
    lastText: 'and try with Gmail',
  },
} as const;
