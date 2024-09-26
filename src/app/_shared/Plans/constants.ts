import type { Plan } from './types';

export const plansData: {
  title: string;
  description: string;
  features: string;
  featuresSubtitle: string;
  plans: Plan[];
} = {
  title: 'Unlock Early Access to the Best Deals',
  description:
    'Staria is your go-to partner in the cosmos of crypto investments. We mix expert knowledge with top-notch financial innovation to bring you the best deals.',
  features: 'Features',
  featuresSubtitle: 'Everything in our free plan plus....',
  plans: [
    {
      title: 'Basic',
      id: 'basic',
      price: 0,
      periodColor: 'text-gray-600',
      periodCrossed: '',
      period: 'For Life',
      description: 'Staria will always have a free and accessible plan to start earning.',
      buttonColor: 'secondary-gray',
      buttonText: 'Subscribe',
      features: [
        {
          title: '**No Token Lock** to join Pool',
          included: true,
          description:
            'Staria will never have a token. This is all to protect you from locking your money in one platform.',
        },
        {
          title: 'Platform fee : **15%**',
          included: true,
          description: 'When you invest in a Project, Pay 15% fee on the invested amount.',
          isTitleReversed: true,
        },
        {
          title: '**2-Level** Profit Sharing',
          included: true,
          description: 'Earn from referrees up to 5% from their investment fees.',
        },
        {
          title: 'Get **Airdrops** Partners **Token**',
          included: false,
          description:
            'We will partner with projects willing to be introduced to our community. Airdrops will not be distributed to Basic owners.',
        },
        {
          title: 'No Access - **VIP Deals**',
          included: false,
          description:
            'Exclusive investment opportunities with premium benefits and tailored advantages for participants',
        },
        {
          title: 'Access - **Allocation Draw**',
          included: true,
          description:
            'Access projects via randomised, fair and allocation draw. No need to pay to participate in the draw except blockchain fees and VRF cost.',
        },
        {
          title: 'Access - **FCFS Pool**',
          included: false,
          description: 'Equitable access to investment opportunities based on the order of submission.',
        },
        {
          title: 'Access - **Guaranteed Pool**',
          included: false,
          description: 'Guaranteed investement amount for every Genesis+ Owner.',
        },
      ],
    },
    {
      title: 'Genesis',
      id: 'genesis',
      topTitle: { text: 'ONLY 1350 AVAILABLE', color: 'bg-cerulean' },
      badge: {
        color: 'blue',
        text: 'Limited Offer',
      },
      price: 1500,
      periodCrossed: 'Per\xa0Year',
      period: 'For Life',
      periodColor: 'text-dodger-blue',
      description: '**When it’s gone, it’s gone!** Claim your special offer. Limited to 1350 users.',
      buttonColor: 'primary',
      buttonText: 'Subscribe',
      features: [
        {
          title: '**No Token Lock** to join Pool',
          included: true,
          description:
            'Staria will never have a token. This is all to protect you from locking your money in one platform.',
        },
        {
          title: 'Platform fee : **10%**',
          included: true,
          description: 'When you invest in a Project, Pay 10% fee on the invested amount.',
          isTitleReversed: true,
        },
        {
          title: '**7-Level** Profit Sharing',
          included: true,
          description: 'Earn from referrees up to 17.5% from their investment fees.',
        },
        {
          title: 'Get **Airdrops** Partners **Token**',
          included: true,
          description:
            'We will partner with projects willing to be introduced to our community. Airdrops will be distributed to Genesis owners.',
        },
        {
          title: 'Full Access - **VIP Deals**',
          included: true,
          description:
            'Exclusive investment opportunities with premium benefits and tailored advantages for participants',
        },
        {
          title: 'Access - **Allocation Draw**',
          included: true,
          description:
            'Access projects via randomised, fair and allocation draw. No need to pay to participate in the draw except blockchain fees and VRF cost.',
        },
        {
          title: 'Access - **FCFS Pool**',
          included: true,
          description: 'Equitable access to investment opportunities based on the order of submission.',
        },
        {
          title: 'Access - **Guaranteed Pool**',
          included: false,
          description: 'Guaranteed investement amount for every Genesis+ Owner.',
        },
      ],
    },
    {
      title: 'Genesis+',
      id: 'genesis-plus',
      topTitle: { text: 'ONLY 350 AVAILABLE', color: 'bg-warning-500' },
      badge: {
        color: 'warning',
        text: 'Limited Offer',
      },
      price: 3000,
      periodColor: 'text-dodger-blue',
      periodCrossed: 'Per\xa0Year',
      period: 'For Life',
      description: '**When it’s gone, it’s gone!** Claim your special offer. Limited to 350 users.',
      buttonColor: 'primary',
      buttonText: 'Subscribe',
      features: [
        {
          title: '**No Token Lock** to join Pool',
          included: true,
          description:
            'Staria will never have a token. This is all to protect you from locking your money in one platform.',
        },
        {
          title: 'Platform fee : **5%**',
          included: true,
          description: 'When you invest in a Project, Pay 5% fee on the invested amount.',
          isTitleReversed: true,
        },
        {
          title: '**10-Level** Profit Sharing',
          included: true,
          description: 'Earn from referrees up to 39.5% from their investment fees.',
        },
        {
          title: 'Get **Airdrops** Partners **Token**',
          included: true,
          description:
            'We will partner with projects willing to be introduced to our community. Airdrops will be distributed to Genesis+ owners.',
        },
        {
          title: 'Full Access - **VIP Deals**',
          included: true,
          description:
            'Exclusive investment opportunities with premium benefits and tailored advantages for participants',
        },
        {
          title: 'Access - **Allocation Draw**',
          included: true,
          description:
            'Access projects via randomised, fair and allocation draw. No need to pay to participate in the draw except blockchain fees and VRF cost.',
        },
        {
          title: 'Access - **FCFS Pool**',
          included: true,
          description: 'Equitable access to investment opportunities based on the order of submission.',
        },
        {
          title: 'Access - **Guaranteed Pool**',
          included: true,
          description: 'Guaranteed investement amount for every Genesis+ Owner.',
        },
      ],
    },
  ],
};
