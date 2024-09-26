import Link from 'next/link';
import Markdown from 'react-markdown';

import { CONTACT_FORM_LINK } from '@/env';
import { DiscoverFaqs } from '@/features/faq';
import { routes } from '@/routes';
import type { PopulateFaq } from '@/types';

import { data } from './constants';

const { heading, supportingText } = data;

interface Props {
  faqs: PopulateFaq[];
}

export function DiscoverSection({ faqs }: Props) {
  return (
    <div className="py-16 xl:py-24">
      <div className="m-auto flex max-w-screen-md flex-col gap-12 px-4 lg:max-w-screen-xl lg:gap-16 lg:px-8">
        <div className="flex max-w-screen-md flex-col gap-5">
          <h2 className="text-display-md font-semibold tracking-display-md text-gray-900 xl:text-display-lg xl:tracking-display-lg">
            {heading}
          </h2>
          <Markdown
            className="font-rubik text-lg text-gray-600 xl:text-xl"
            components={{
              a: ({ children }) => (
                <Link
                  className="relative inline-block after:absolute after:inset-x-0 after:bottom-1 after:border-b after:border-gray-600"
                  href={`${routes.contact.getRedirectPath()}#${CONTACT_FORM_LINK}`}
                >
                  {children}
                </Link>
              ),
            }}
          >
            {supportingText}
          </Markdown>
        </div>
        <DiscoverFaqs faqs={faqs} />
      </div>
    </div>
  );
}
