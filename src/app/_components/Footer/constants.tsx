import {
  APPLY_FOR_LISTING_LINK,
  APPLY_FOR_KOL,
  COOKIES_LINK,
  LINKEDIN_LINK,
  MEDIA_KIT_LINK,
  PRIVACY_LINK,
  TELEGRAM_LINK,
  TERMS_LINK,
  TERMS__PLATFORM_LINK,
  TWITTER_LINK,
  YOUTUBE_LINK,
} from '@/env';
import { routes } from '@/routes';

export const footerText = {
  description: 'Staria Swisspad unlocks exclusive access to early-stage venture capital deals.',
};

export const footerLinks: {
  group: string;
  links: { title: string; href: string; external?: boolean; badge?: string }[];
}[] = [
  {
    group: 'Product',
    links: [
      { title: 'Home', href: '/' },
      { title: 'Invest', href: routes.invest.getRedirectPath() },
      { title: 'Earn', href: routes.earn.getRedirectPath() },
      {
        title: 'Pricing',
        href: routes.pricing.getRedirectPath(),
        badge: 'Discount',
      },
    ],
  },
  {
    group: 'Company',
    links: [
      { title: 'About', href: routes.about.getRedirectPath() },
      { title: 'Media kit', href: MEDIA_KIT_LINK, external: true },
      {
        title: 'Apply for Listing',
        href: APPLY_FOR_LISTING_LINK,
        external: true,
      },
      { title: 'Apply as a KOL', href: APPLY_FOR_KOL, external: true },
    ],
  },
  {
    group: 'Material',
    links: [
      { title: 'Blog', href: routes.blog.getRedirectPath() },
      { title: 'Resources', href: routes.resources.getRedirectPath() },
      { title: 'FAQ', href: routes.faq.getRedirectPath() },
      { title: 'Support', href: routes.contact.getRedirectPath() },
    ],
  },
  {
    group: 'Social',
    links: [
      { title: 'X', href: TWITTER_LINK, external: true },
      { title: 'Telegram', href: TELEGRAM_LINK, external: true },
      { title: 'LinkedIn', href: LINKEDIN_LINK, external: true },
      { title: 'Youtube', href: YOUTUBE_LINK, external: true },
    ],
  },
  {
    group: 'Legal',
    links: [
      { title: 'General Terms', href: TERMS_LINK, external: true },
      { title: 'Platform Terms', href: TERMS__PLATFORM_LINK, external: true },
      { title: 'Privacy', href: PRIVACY_LINK, external: true },
      { title: 'Cookies', href: COOKIES_LINK, external: true },
    ],
  },
];
