import { routes } from '@/routes';

export const data = {
  emailInput: {
    label: 'Email',
    placeHolder: 'Enter your email',
    type: 'email',
  },
  passwordInput: {
    label: 'Password',
    placeHolder: 'Enter your password',
    type: 'password',
  },
  rememberLoginCheckbox: {
    text: 'Remember for 30 days',
    linkText: 'Forgot password',
    // TODO add link to forgot password
    linkHref: routes['reset-password-request'].getRedirectPath(),
  },
  buttonText: 'Log in',
  questionLink: {
    text: 'Don’t have an account?',
    linkText: 'Sign up',
  },
  googleBtnText: 'Log in with Google',
} as const;
