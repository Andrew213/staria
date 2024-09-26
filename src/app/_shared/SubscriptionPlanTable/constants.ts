import type { Plan } from '@/app/_shared/Plans/types';

export type PlanData = {
  platformFee: string;
  referalRewards1: string;
  referalRewards2?: string;
  referalRewards3?: string;
  isLottery: boolean;
  isFCFS: boolean;
  isGuaranteedPool: boolean;
  vipDetails?: string;
} & Omit<Plan, 'features'>;

export interface RowData {
  rowTitle: string;
  items: {
    title: string;
    description: string;
    basic: string | boolean | null;
    genesis: string | boolean | null;
    genesisPlus: string | boolean | null;
    showOnMobile?: boolean;
    hideOnMobile?: boolean;
  }[];
}

export const data: PlanData[] = [
  {
    title: 'Basic',
    id: 'basic',
    price: 0,
    periodCrossed: '',
    period: 'For Life',
    periodColor: 'text-gray-600',
    description: 'Staria will always have a free and accessible plan to start earning.',
    buttonColor: 'primary',
    buttonText: 'Subscribe',
    platformFee: '15%',
    referalRewards1: '5%',
    isLottery: true,
    isFCFS: false,
    isGuaranteedPool: false,
  },
  {
    title: 'Genesis',
    id: 'genesis',
    topTitle: {
      text: 'ONLY 1350 AVAILABLE',
      color: 'bg-cerulean',
    },
    badge: {
      color: 'blue',
      text: 'Limited Offer',
    },
    price: 1500,
    periodCrossed: 'Per\xa0Year',
    period: 'For Life',
    periodColor: 'text-dodger-blue',
    description: '**When it’s gone, it’s gone!** Our special Early Bird offer for our first 1350 users.',
    buttonColor: 'primary',
    buttonText: 'Subscribe',
    platformFee: '10%',
    referalRewards1: '10%',
    referalRewards2: '5%',
    isLottery: true,
    isFCFS: true,
    isGuaranteedPool: false,
    vipDetails: 'Limited',
  },
  {
    title: 'Genesis+',
    id: 'genesis-plus',
    topTitle: {
      text: 'ONLY 350 AVAILABLE',
      color: 'bg-warning-500',
    },
    badge: {
      color: 'warning',
      text: 'Limited Offer',
    },
    price: 3000,
    periodColor: 'text-dodger-blue',
    periodCrossed: 'Per\xa0Year',
    period: 'For Life',
    description: '**When it’s gone, it’s gone!** Our special Early Bird offer for our first 350 users.',
    buttonColor: 'primary',
    buttonText: 'Subscribe',
    platformFee: '5%',
    referalRewards1: '20%',
    referalRewards2: '10%',
    referalRewards3: '5%',
    isLottery: true,
    isFCFS: true,
    isGuaranteedPool: true,
    vipDetails: 'Full',
  },
];

export const referralTableRow: RowData = {
  rowTitle: 'Referral Rewards',
  items: [
    {
      title: 'Tier 1',
      description: 'Earn a percentage from investments made the people you referred.',
      basic: '2.5%',
      genesis: '6%',
      genesisPlus: '10%',
      hideOnMobile: true,
    },
    {
      title: 'Tier 2',
      description: 'Earn a percentage from investments made the people you referred.',
      basic: false,
      genesis: '4%',
      genesisPlus: '10%',
      hideOnMobile: true,
    },
    {
      title: 'Tier 3',
      description: 'Earn a percentage from investments made the people you referred.',
      basic: false,
      genesis: false,
      genesisPlus: '5%',
      hideOnMobile: true,
    },
  ],
};

export const subscriptionTableRows: RowData[] = [
  {
    rowTitle: 'Fee Overview',
    items: [
      {
        title: 'Platform Fee',
        description: 'Pay % fee on the invested amount.',
        basic: '15%',
        genesis: '10%',
        genesisPlus: '5%',
      },
    ],
  },
  {
    rowTitle: 'Direct Benefits',
    items: [
      {
        title: 'No Token Lock',
        description:
          'Staria will never have a token. This is all to protect you from locking your money in one platform.',
        basic: true,
        genesis: true,
        genesisPlus: true,
      },
    ],
  },
  referralTableRow,
  {
    rowTitle: 'Access Investment Pool',
    items: [
      {
        title: 'Allocation Draw',
        description:
          'Access projects via randomised, fair and allocation draw. No need to pay to participate in the draw except blockchain fees and VRF cost.',
        basic: true,
        genesis: true,
        genesisPlus: true,
      },
      {
        title: 'FCFS',
        description: 'Equitable access to investment opportunities based on the order of submission.',
        basic: false,
        genesis: true,
        genesisPlus: true,
      },
      {
        title: 'Guaranteed Pool',
        description: 'Guaranteed investement amount for every Genesis+ Owner.',
        basic: false,
        genesis: false,
        genesisPlus: true,
      },
    ],
  },
  {
    rowTitle: 'Best Opportunities',
    items: [
      {
        title: 'VIP Deals',
        description:
          'Exclusive investment opportunities with premium benefits and tailored advantages for participants',
        basic: false,
        genesis: true,
        genesisPlus: true,
      },
      {
        title: 'Airdrops Partners Token',
        description:
          'We will partner with projects willing to be introduced to our community. Airdrops will be distributed to Genesis owners.',
        basic: false,
        genesis: true,
        genesisPlus: true,
      },
    ],
  },
];
