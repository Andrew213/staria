import { PRIVACY_LINK } from '@/env';

export const data = {
  firstNameInput: {
    label: 'First Name',
    placeHolder: 'First Name',
    type: 'text',
  },
  lastNameInput: {
    label: 'Last Name',
    placeHolder: 'Last Name',
    type: 'text',
  },
  emailInput: {
    label: 'Email',
    placeHolder: 'you@company',
    type: 'email',
  },
  phoneInput: {
    label: 'Phone number',
    placeHolder: '+1 (555) 000-0000',
  },
  messageInput: {
    label: 'Message',
    placeHolder: 'Leave us a message...',
  },
  privacyCheckbox: {
    text: 'You agree to our friendly',
    linkText: 'privacy policy.',
    linkHref: PRIVACY_LINK,
  },
  buttonText: 'Send message',
  successMessage: 'Successfully sent',
} as const;
