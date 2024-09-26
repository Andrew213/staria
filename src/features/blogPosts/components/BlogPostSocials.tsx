import { usePathname } from 'next/navigation';

import { Button } from '@/lib/components';

import { sharePostData } from '../constants';

interface Props {
  postTitle: string;
}

export function BlogPostSocials({ postTitle }: Props) {
  const currentPage = usePathname();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const url = `${origin}${currentPage}`;

  const handleLinkButtonClick = () => {
    void navigator.clipboard.writeText(url);
    (document.activeElement as HTMLElement)?.blur();
  };

  const getShareLink = (type: (typeof sharePostData.items)[number]['type']) => {
    switch (type) {
      case 'twitter': {
        return `http://twitter.com/share?url=${url}&text=${postTitle}`;
      }

      case 'telegram': {
        return `https://t.me/share/url?url=${url}&text=${postTitle}`;
      }

      case 'linkedin': {
        return `http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${postTitle}`;
      }

      default: {
        return '';
      }
    }
  };

  return (
    <div className="flex gap-2.5 xs:mt-10">
      {sharePostData.items.map(({ icon: Icon, type }, index) => {
        if (type === 'link') {
          return (
            <Button
              key={index}
              icon={
                <span className="flex size-5 items-center justify-center text-gray-700">
                  <Icon />
                </span>
              }
              size="md-square"
              color="secondary-gray"
              onClick={handleLinkButtonClick}
              title="Copy URL"
              animate
            />
          );
        }

        return (
          <Button
            key={index}
            icon={
              <div className="flex size-5 shrink-0 items-center justify-center text-gray-700">
                <Icon />
              </div>
            }
            size="md-square"
            color="secondary-gray"
            blank
            href={getShareLink(type)}
            animate
          />
        );
      })}
    </div>
  );
}
