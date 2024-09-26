import { TwitterIcon, TelegramIcon, LinkedInIcon, YoutubeIcon } from '@/assets/icons';
import {
  TWITTER_LINK,
  TELEGRAM_LINK,
  LINKEDIN_LINK,
  YOUTUBE_LINK,
  TERMS_LINK,
  PRIVACY_LINK,
  COOKIES_LINK,
} from '@/env';

export const TEXTS = {
  copyright: '© 2024 Staria. All rights reserved.',
  managerLayoutCopyright: '© 2024 staria.network | All rights reserved.',
} as const;

export const socials = [
  {
    id: 0,
    link: TWITTER_LINK,
    Icon: TwitterIcon,
  },
  {
    id: 1,
    link: TELEGRAM_LINK,
    Icon: TelegramIcon,
  },
  {
    id: 2,
    link: LINKEDIN_LINK,
    Icon: LinkedInIcon,
  },
  {
    id: 3,
    link: YOUTUBE_LINK,
    Icon: YoutubeIcon,
  },
];

export const links = [
  {
    id: 0,
    link: TERMS_LINK,
    title: 'Terms',
  },
  {
    id: 1,
    link: PRIVACY_LINK,
    title: 'Privacy',
  },
  {
    id: 2,
    link: COOKIES_LINK,
    title: 'Cookies',
  },
];
