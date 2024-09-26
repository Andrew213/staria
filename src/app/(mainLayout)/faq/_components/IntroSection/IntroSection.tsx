import Link from 'next/link';
import Markdown from 'react-markdown';

import { CONTACT_FORM_LINK } from '@/env';
import { getContent } from '@/features/faq/utils';
import { routes } from '@/routes';
import type { HeroFaq } from '@/types';

import { data } from './constants';

interface Props {
  faqs: HeroFaq[];
}

export function IntroSection({ faqs }: Props) {
  return (
    <div className="flex w-full max-w-screen-sm flex-col gap-12 px-4 py-16 lg:max-w-screen-xl lg:gap-16 lg:px-8 lg:py-24">
      <div className="flex max-w-screen-md flex-col gap-4 lg:gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-display-md font-semibold tracking-tight text-gray-900 lg:text-display-lg">
            {data.title}
          </h1>
        </div>
        <div className="font-rubik text-lg text-gray-600 lg:text-xl">
          <Markdown
            components={{
              a: ({ children }) => (
                <Link
                  className="relative inline-block text-primary-500 after:absolute after:inset-x-0 after:bottom-1 after:border-b after:border-primary-500 after:content-['']"
                  href={`${routes.contact.getRedirectPath()}#${CONTACT_FORM_LINK}`}
                >
                  {children}
                </Link>
              ),
            }}
          >
            {data.description}
          </Markdown>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        <ul className="flex flex-col gap-10 lg:gap-12">
          {faqs.map(({ title, textPreview, url, id }) => (
            <li key={id} className="flex gap-4">
              <div className="flex flex-col gap-1 pt-1.5 lg:gap-2 lg:pt-2.5">
                <p className="text-lg font-semibold text-gray-900 lg:text-xl">{title}</p>

                <div className="font-rubik text-md text-gray-600">
                  {getContent(textPreview)}
                  {url && (
                    <Link
                      className="relative ml-0.5 inline text-primary-500 after:absolute after:inset-x-0 after:bottom-0.5 after:border-b after:border-primary-500 after:content-['']"
                      href={url || '/'}
                      target="_blank"
                    >
                      {data.linkTitle}
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="relative w-full rounded-2 bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/faq-intro-mobile.jpg)] bg-cover bg-center pt-[70%] lg:rounded-4 lg:bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/faq-intro.png)] lg:pt-[100%]" />
      </div>
    </div>
  );
}
