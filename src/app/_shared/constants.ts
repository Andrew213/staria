import {
  SettingsIcon,
  DashboardIcon,
  ReferralIcon,
  InvestmentIcon,
  MembershipsIcon,
  UserSquare,
  UsersPlusIcon,
  Cryptocurrency02,
  PieChart01,
} from '@/assets/icons';
import { routes } from '@/routes';
import { isDefined } from '@/utils';

export const env = (function func() {
  if (!isDefined(process.env.NEXT_PUBLIC_FRONTEND_URL)) {
    throw new Error("Couldn't find environment variable: NEXT_PUBLIC_FRONTEND_URL");
  }

  if (!isDefined(process.env.NEXT_PUBLIC_API_URL)) {
    throw new Error("Couldn't find environment variable: NEXT_PUBLIC_API_URL");
  }

  if (!isDefined(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID)) {
    throw new Error("Couldn't find environment variable: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID");
  }

  if (!isDefined(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)) {
    throw new Error("Couldn't find environment variable: NEXT_PUBLIC_ALCHEMY_API_KEY");
  }

  return {
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  };
})();

interface SidebarMenuItem {
  id: number;
  title: string;
  Icon: React.FC<React.SVGProps<SVGElement>>;
  href: string;
  hide: boolean;
  children?: SidebarMenuItem[];
}

export type SidebarMenuItems = SidebarMenuItem[];

export const accountMenuItems: SidebarMenuItems = [
  {
    id: 1,
    title: 'Dashboard',
    Icon: DashboardIcon,
    href: routes.account.dashboard.getRoutePath(),
    hide: false,
  },
  {
    id: 2,
    title: 'Referrals',
    Icon: ReferralIcon,
    href: routes.account.referral.getRoutePath(),
    hide: false,
  },
  {
    id: 3,
    title: 'My Investments',
    Icon: InvestmentIcon,
    href: routes.account.investments.getRoutePath(),
    hide: false,
  },
  {
    id: 4,
    title: 'Memberships',
    Icon: MembershipsIcon,
    href: routes.account.membership.getRoutePath(),
    hide: false,
  },
  {
    id: 5,
    title: 'Settings',
    Icon: SettingsIcon,
    href: routes.account.settings.getRoutePath(),
    hide: false,
  },
];

export const getManagerAccountMenuItems = (communityName?: string): SidebarMenuItems => {
  return [
    {
      title: 'Community Account',
      Icon: UserSquare,
      id: 0,
      href: '',
      hide: false,
      children: [
        {
          id: 1,
          title: 'Dashboard',
          Icon: PieChart01,
          href: communityName ? routes.community.dashboard.communityName.getRedirectPath({ communityName }) : '/',
          hide: true,
        },
        {
          id: 2,
          title: 'Manage Community',
          Icon: UsersPlusIcon,
          href: communityName
            ? routes.community.manage.communityName.getRedirectPath({ communityName })
            : routes.community.new.getRoutePath(),
          hide: false,
        },
        {
          id: 3,
          title: 'Add Deal',
          Icon: Cryptocurrency02,
          href: communityName ? routes.community.deals.communityName.getRedirectPath({ communityName }) : '/',
          hide: true,
        },
      ],
    },
  ];
};

export const usNumberDefaultFormat = new Intl.NumberFormat('en-US');
