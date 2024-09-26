import { StackedIcon, CoinsHandIcon, AwardIcon, ZapCircleIcon } from '@/assets/icons';
import { routes } from '@/routes';

export const featuresData = {
  title: 'Start with the Top Dealmakers in Web3',
  description:
    'No token lock required. At Staria, we pride ourselves on that fact that everyone has a chance in a compliant and secure environment. Invest and expand your portfolio.',
  link: {
    text: 'Learn more',
  },
  items: [
    {
      title: 'No Token Lock Required',
      description: 'No need to lock tokens as Staria doesn’t have a native token. Jump straight into our pools.',
      icon: ZapCircleIcon,
      url: routes.blog.blogSlug.getRedirectPath({
        blogSlug: 'no-lock-of-liquidity-with-a-token',
      }),
    },
    {
      title: 'Guaranteed Allocation',
      description: 'Guaranteed spots for our subscription members. Get a slice of the pie.',
      icon: StackedIcon,
      url:
        routes.blog.blogSlug.getRedirectPath({
          blogSlug: 'understanding-starias-fundraising-phases',
        }) + '#phase-1-guaranteed-allocation',
    },
    {
      title: 'First Come, First Serve',
      description: 'Seize investment opportunity democratically in real-time till the cap limit.',
      icon: CoinsHandIcon,
      url:
        routes.blog.blogSlug.getRedirectPath({
          blogSlug: 'understanding-starias-fundraising-phases',
        }) + '#phase-2-first-come-first-served-fcfs',
    },
    {
      title: 'Allocation Draw',
      description: 'Win a seat at the fundraising table with the public drawing phase.',
      icon: AwardIcon,
      url:
        routes.blog.blogSlug.getRedirectPath({
          blogSlug: 'understanding-starias-fundraising-phases',
        }) + '#phase-3-allocation-draw',
    },
  ],
};
