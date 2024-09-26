import cn from 'classnames';
import Link from 'next/link';
import Markdown from 'react-markdown';

interface Props {
  subheading: string;
  heading: string;
  supportingText: string;
  bgClass?: string;
  link?: string;
}

export function HeaderSection({
  subheading,
  heading,
  supportingText,
  link,
  bgClass = 'bg-[linear-gradient(0,rgba(3,26,95,0.5)_0%,rgba(3,26,95,0.5)_100%),url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/abstract-spiral.png)]',
}: Props) {
  return (
    <div
      className={cn(
        `flex w-full flex-col items-center justify-center bg-custom-140 bg-center bg-no-repeat px-4 py-12 text-left sm:bg-cover lg:py-24`,
        bgClass,
      )}
    >
      <p className="mb-3 text-left text-sm font-semibold text-gray-300 xl:text-center xl:text-md">{subheading}</p>
      <h2 className="mb-4 text-left text-display-md font-semibold tracking-display-md text-white lg:mb-6 xl:text-center xl:text-display-lg xl:tracking-display-lg">
        {heading}
      </h2>
      <div className="max-w-screen-md font-rubik text-lg font-normal text-gray-100 xl:text-xl">
        <Markdown
          components={{
            a: ({ children }) => (
              <Link
                className="relative inline-block text-lg after:absolute after:inset-x-0 after:bottom-1.5 after:border-b after:border-gray-100 after:content-[''] xl:text-xl"
                href={link ?? ''}
              >
                {children}
              </Link>
            ),
          }}
        >
          {supportingText}
        </Markdown>
      </div>
    </div>
  );
}
