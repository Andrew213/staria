import {
  ShieldTickIcon,
  ShieldFileIcon,
  DiamondIcon,
  CoinsStackedIcon,
  UsersPlusIcon,
  CoinsHandIcon,
} from '@/assets/icons';
import { routes } from '@/routes';

export const commitmentData = {
  title: 'Supercharge your Investment Experience',
  description:
    'Staria rigorously screens and audits projects before they are available for investment, ensuring quality opportunities for our users.',
  linkTitle: 'Learn more',
  items: [
    {
      icon: DiamondIcon,
      title: 'Access Top VIP Deals',
      description: 'Invest in exclusive deals reserved to top Crypto Venture Capital.',
      link: routes.blog.blogSlug.getRedirectPath({
        blogSlug: 'staria-deal-flows',
      }),
    },
    {
      icon: ShieldFileIcon,
      title: 'Only Verified Projects',
      description: 'Based on audit screenings, we select high-ranked projects only.',
      link: '/blog/staria-deal-flows',
    },
    {
      icon: CoinsStackedIcon,
      title: 'Staria has No Token',
      description: 'No Lock of Liquidity to participate. We have no and will never have our platform token.',
      link: '/blog/no-lock-of-liquidity-with-a-token',
    },
    {
      icon: ShieldTickIcon,
      title: 'Bots Protection on Pools',
      description: 'Each fundraising including FCFS and Draw are protected from front running bots.',
      link: '/blog/bots-protection',
    },
    {
      icon: UsersPlusIcon,
      title: 'Earn with Multi-Profit Sharing',
      description: 'Spread the word, and watch your earnings skyrocket. Simple, transparent rewards.',
      link: routes.blog.blogSlug.getRedirectPath({
        blogSlug: 'referral-system-simple-profit-sharing',
      }),
    },
    {
      icon: CoinsHandIcon,
      title: 'Get Large Allocations',
      description: 'Free and Fair Allocation Draw and limited seats to ensure substantial allocation sizes.',
      link: routes.blog.blogSlug.getRedirectPath({
        blogSlug: 'large-allocations',
      }),
    },
  ],
};
