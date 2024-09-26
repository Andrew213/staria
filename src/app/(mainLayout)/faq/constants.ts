import { CONTACT_FORM_LINK } from '@/env';
import { routes } from '@/routes';

export const data = {
  heading: 'We’re here to help!',
  supportingText: `Find all the details you need on our product here. If you have questions that aren't answered, our friendly team is just a chat away to assist you.`,
  link: {
    text: 'Chat with us',
    href: `${routes.contact.getRedirectPath()}#${CONTACT_FORM_LINK}`,
  },
} as const;
