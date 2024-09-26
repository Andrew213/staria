import { routes } from '@/routes';

export const data = {
  title: 'Wrong credentials!',
  description: 'You have entered a wrong e-mail address or password.',
  button: {
    text: 'Try Again',
    href: routes.signin.getRedirectPath(),
  },
  link: {
    linkText: 'Reset password',
    linkHref: routes['reset-password-request'].getRedirectPath(),
    text: 'Forgot your password?',
  },
  errorsMessages: {
    Unauthorized: {
      message: 'Wrong credentials!',
      description: 'You have entered a wrong e-mail address or password.',
    },
    'Email address is not verified': {
      message: 'Email address is not verified',
      description: 'Please activate your account by verifying your email address',
    },
  },
} as const;
