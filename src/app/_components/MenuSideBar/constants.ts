import { SettingsIcon, DashboardIcon, ReferralIcon, InvestmentIcon, MembershipsIcon, UserSquare } from '@/assets/icons';
import { routes } from '@/routes';

export interface menuItem {
  id: number;
  title: string;
  Icon: React.FC<React.SVGProps<SVGElement>>;
  href: string;
}

export const data: menuItem[] = [
  {
    id: 0,
    title: 'Dashboard',
    Icon: DashboardIcon,
    href: routes.account.dashboard.getRedirectPath(),
  },
  {
    id: 1,
    title: 'Referrals',
    Icon: ReferralIcon,
    href: routes.account.referral.getRedirectPath(),
  },
  {
    id: 2,
    title: 'My Investments',
    Icon: InvestmentIcon,
    href: routes.account.investments.getRedirectPath(),
  },
  {
    id: 3,
    title: 'Memberships',
    Icon: MembershipsIcon,
    href: routes.account.membership.getRedirectPath(),
  },
  {
    id: 4,
    title: 'Settings',
    Icon: SettingsIcon,
    href: routes.account.settings.getRedirectPath(),
  },
];

export const getCommunityManagerTab = (communityName?: string): menuItem => {
  return {
    id: 5,
    title: 'Community Account',
    Icon: UserSquare,
    href: communityName
      ? routes.community.manage.communityName.getRedirectPath({ communityName })
      : routes.community.new.getRoutePath(),
  };
};
