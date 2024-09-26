import { LinkedInIcon, TelegramIcon, TwitterIcon, YoutubeIcon } from '@/assets/icons';
import { LINKEDIN_LINK, TELEGRAM_LINK, TWITTER_LINK, YOUTUBE_LINK } from '@/env';

export const data = {
  title: 'Congratulations',
  socialText: 'Stay Tuned and Follow us:',
  socials: [
    {
      icon: TwitterIcon,
      link: TWITTER_LINK,
    },
    {
      icon: TelegramIcon,
      link: TELEGRAM_LINK,
    },
    {
      icon: LinkedInIcon,
      link: LINKEDIN_LINK,
    },
    {
      icon: YoutubeIcon,
      link: YOUTUBE_LINK,
    },
  ],
  winningTicket: 'Winning Ticket:',
  verification: 'Draw Onchain Verification:',
  verificationLink: 'BSC Scan',
  successfulInvestmentButton: 'Got it',
  lotteryWinButton: 'Participate',
};
