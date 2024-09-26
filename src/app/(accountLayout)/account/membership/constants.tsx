import { LayersThreeIcon, LayersTwoIcon, RadomLogo, StripeLogo, ZapIcon } from '@/assets/icons';
import type { Plan } from '@/types';

export const data = {
  title: 'Your Memberships',
  description: 'Manage your membership  and billing details.',
  perYear: 'Per Year',
  forLife: 'For Life',
  linkText: 'Learn More',
  upgradeButtonText: 'Upgrade',
  offers: 'Offers Left',
  activeBadge: 'You are',
  upgradePlan: {
    title: 'Upgrade Memberships',
    description: 'Let’s go through this flow to upgrade your plan.',
    stepperItems: [
      { title: 'Accept Terms & Conditions' },
      { title: 'Choose Payment Method' },
      { title: 'Upgraded Plan' },
    ],
    notice: {
      title: 'Important Notice',
      description:
        'Please read and understand our Terms and Conditions to see if you are eligible to buy our Genesis and Genesis + Plans.',
      confirmText:
        'I confirm that I am not a resident or citizen of any of the countries listed here. I understand that if I am a resident or citizen of any of these countries, I will not be able to complete the KYC process or invest.',
      content: `- Afghanistan
- Belarus
- Burundi
- Central African Republic
- Cuba
- Democratic Republic of the Congo (DRC)
- Eritrea
- Guinea-Bissau
- Haiti
- Iran
- Iraq
- Lebanon
- Libya
- Mali
- Myanmar
- Nicaragua
- North Korea
- Russia
- Somalia
- South Sudan
- Sudan
- Syria
- United States
- US Virgin Islands
- Venezuela
- Yemen
- Zimbabwe`,
      agreeText: 'I agree with those Terms and Conditions',
      cancelButton: 'Cancel',
      nextButton: 'Proceed',
    },
    paymentMethod: {
      title: 'Choose your Payment Method',
      description: 'Subscription fee can be paid in either CRYPTO or FIAT',
      items: [
        {
          id: 'stripe',
          title: 'Payment in FIAT',
          description: 'Provided by Stripe',
          link: '',
          linkText: 'Go to STRIPE',
          icon: <StripeLogo />,
        },
        {
          id: 'radom',
          title: 'Payment in CRYPTO',
          description: 'Provided by Radom',
          link: '',
          linkText: 'Go to RADOM',
          icon: <RadomLogo />,
        },
      ],
      checkout: 'Checkout',
      cancel: 'Cancel',
    },
    successPayment: {
      title: 'Congratulations',
      description: 'We have updated your plan. You can now access all features available in your',
      buttonText: 'Got it',
    },
    failPayment: {
      title: 'Payment Cancelled',
      description: 'Unfortunately we were unable to upgrade your plan. Please try again.',
      cancel: 'Cancel',
      tryAgain: 'Try again',
    },
  },
  billing: {
    title: 'Billing history',
  },
};

export const plansData = [
  {
    title: 'Genesis +',
    offersCount: 30,
    icon: <ZapIcon />,
    price: 3000,
    description:
      'Unlimited access to all the best deals with access to VIP Deals + Guaranteed + FCFS + Allocation Draw.',
    link: '',
    isActive: false,
    id: 'genesis-plus' as Plan,
    index: 3,
  },
  {
    title: 'Genesis',
    offersCount: 125,
    icon: <LayersThreeIcon />,
    price: 1500,
    description: 'Get the best of Staria and access our VIP Deals + FCFS Allocation + Allocation Draw.',
    link: '',
    isActive: false,
    id: 'genesis' as Plan,
    index: 2,
  },
  {
    title: 'Basic',
    icon: <LayersTwoIcon />,
    price: 0,
    description: 'Participate in the Allocations Draw.',
    link: '',
    isActive: false,
    id: 'basic' as Plan,
    index: 1,
  },
];
