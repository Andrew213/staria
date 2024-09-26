import { APPLY_FOR_KOL } from '@/env';
import type { NavLinkProps } from '@/lib/components';
import { routes } from '@/routes';

export const navLinks: NavLinkProps[] = [
  { title: 'Invest', href: routes.invest.getRedirectPath() },
  { title: 'Earn', href: routes.earn.getRedirectPath() },
  { title: 'Pricing', href: routes.pricing.getRedirectPath() },
  { title: 'About', href: routes.about.getRedirectPath() },
];

export const authenticatedLinks: NavLinkProps[] = [
  { title: 'Invest', href: routes.invest.getRedirectPath() },
  { title: 'Earn', href: routes.earn.getRedirectPath() },
  { title: 'Pricing', href: routes.pricing.getRedirectPath() },
  { title: 'About', href: routes.about.getRedirectPath() },
];

export const applyButton = {
  text: 'Apply as KOL',
  href: APPLY_FOR_KOL,
};

export const signinButton = {
  text: 'Log in',
  href: '/signin',
};

export const signupButton = {
  text: 'Sign up',
  href: '/signup',
};
