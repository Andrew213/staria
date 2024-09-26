import { XLogoIcon, InLogoIcon, TgLogoIcon, LinkIcon } from '@/assets/icons';

export const blogPostsData = {
  linkText: 'Read post',
};

export const featuredArticleData = {
  publishHeading: 'Published on',
  categoriesHeading: 'Categories',
};

export const latestPostsData = {
  topTitle: 'Latest',
  title: 'From the blog',
  description: 'The latest industry news, interviews, technologies, and resources.',
  buttonText: 'View All posts',
  linkText: 'Read post',
};

export const sharePostData = {
  items: [
    {
      icon: LinkIcon,
      type: 'link',
    },
    {
      icon: XLogoIcon,
      type: 'twitter',
    },
    {
      icon: TgLogoIcon,
      type: 'telegram',
    },
    {
      icon: InLogoIcon,
      type: 'linkedin',
    },
  ],
} as const;
