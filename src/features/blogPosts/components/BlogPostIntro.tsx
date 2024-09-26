import { AvatarGroup, Badge, BadgeGroup } from '@/lib/components';
import type { Post } from '@/types';

interface Props {
  post: Post;
}

export function BlogPostIntro({ post }: Props) {
  const {
    author: { name, profileImage },
    primaryTag,
    excerpt,
    image,
    published,
    title,
    readingTime,
  } = post;
  return (
    <div className="flex w-full max-w-screen-xl flex-col gap-16 px-4 py-14 lg:flex-row lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="flex max-w-[624px] grow flex-col gap-8 lg:gap-12 lg:pt-18">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-4">
            <div className="self-start">
              {primaryTag ? (
                <BadgeGroup
                  innerBadgeContent={primaryTag.name}
                  content={`${readingTime} min read`}
                  size="md"
                  color="primary"
                />
              ) : (
                <Badge content={`${readingTime} min read`} size="md" color="primary" />
              )}
            </div>
            <h1 className="text-display-md font-semibold tracking-tight text-gray-900 lg:text-display-xl">{title}</h1>
          </div>
          <p className="font-rubik text-lg text-gray-600 lg:text-xl">{excerpt}</p>
        </div>

        <AvatarGroup
          key={name}
          size="xl"
          name={name}
          image={profileImage}
          text={`
                Published 
                ${
                  published
                    ? new Date(published).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : ''
                }
              `}
        />
      </div>
      <div
        className="relative w-full shrink-0 overflow-hidden rounded-3 bg-cover bg-center pt-[70%] lg:h-[640px] lg:w-[560px] lg:shrink lg:rounded-4 lg:pt-[52.5%]"
        style={{ backgroundImage: `url('${image}')` }}
      />
    </div>
  );
}
