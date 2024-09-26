import type { SocialType } from '@/app/_shared/types';
import {
  DiscordIcon,
  FacebookIcon,
  GithubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon,
  TelegramIcon,
  TikTokIcon,
  TwitterIcon,
} from '@/assets/icons';

export function getSocialIcon(type: SocialType) {
  switch (type) {
    case 'telegram':
      return <TelegramIcon />;
    case 'x':
      return <TwitterIcon />;
    case 'medium':
      return <MediumIcon />;
    case 'facebook':
      return <FacebookIcon />;
    case 'linkedin':
      return <LinkedInIcon />;
    case 'github':
      return <GithubIcon />;
    case 'discord':
      return <DiscordIcon />;
    case 'tiktok':
      return <TikTokIcon />;
    case 'instagram':
      return <InstagramIcon />;
    default:
      return <GlobeIcon />;
  }
}
