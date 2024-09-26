import { routes } from '@/routes';

export const data = {
  title: 'Congratulation!',
  description: 'Your email has been successfully verified. Click below to access the platform.',
  button: {
    text: 'Access to Staria',
    href: routes.signin.getRedirectPath(),
  },
} as const;
