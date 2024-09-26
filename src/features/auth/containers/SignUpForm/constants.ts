import { TERMS_LINK } from '@/env';

export const data = {
  emailInput: {
    label: 'Email',
    placeHolder: 'Enter your email',
    type: 'email',
  },
  passwordInput: {
    label: 'Password',
    placeHolder: 'Create a password',
    type: 'password',
  },
  repeatPasswordInput: {
    label: 'Repeat Password',
    placeHolder: 'Repeat your password',
    type: 'password',
  },
  agreeTermsCheckbox: {
    text: 'Agree with',
    linkText: 'Terms & Conditions',
    linkHref: TERMS_LINK,
  },
  buttonText: 'Get started',
  questionLink: {
    text: 'Already have an account?',
    linkText: 'Log in',
  },
  googleBtnText: 'Sign up with Google',
} as const;

export const ERROR_MESSAGE_TO_TEXT: Record<string, string> = {
  'duplicate key value violates unique constraint "UNIQUE_USER_EMAIL"':
    'Account already exists with the provided email address',
};
