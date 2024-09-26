import { routes } from '@/routes';

export const data = {
  title: 'Congratulation Password reset!',
  description: 'Your password has been successfully reset. Click below to access Staria.',
  button: {
    text: 'Log in to Staria ',
    href: routes.signin.getRedirectPath(),
  },
} as const;
