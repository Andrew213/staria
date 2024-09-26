import Image from 'next/image';

import { LinkExternal02 } from '@/assets/icons';
import { DEALS_TYPEFORM, IMAGES_CDN_URL } from '@/env';
import { Button } from '@/lib/components';

import { TEXTS } from './data';

export default function Page() {
  return (
    <div className="grid gap-y-6 self-stretch lg:grid-cols-[1fr_360px] lg:gap-x-16">
      <h1 className="text-display-sm font-semibold text-white lg:col-span-2">{TEXTS.title}</h1>
      <div>
        <section className="mb-6 lg:mb-8 lg:border-b lg:border-b-gray-blue-800 lg:pb-5">
          <h2 className="mb-1 text-display-xs font-semibold text-white lg:text-lg">{TEXTS.creationSection.title}</h2>
          <p className="font-rubik text-sm text-gray-blue-100">{TEXTS.creationSection.description}</p>
        </section>
        <p className="mb-8 rounded-2 bg-downriver p-4 text-md font-medium text-gray-blue-50">{TEXTS.banner}</p>
        <section className="mb-8">
          <h2 className="mb-3 text-md font-medium text-white">{TEXTS.requirementsSection.title}</h2>
          <p className="whitespace-pre-line font-rubik text-md text-gray-blue-100">
            {TEXTS.requirementsSection.description}
          </p>
          <ul className="list-disc pl-10 font-rubik text-md text-gray-blue-100">
            {TEXTS.requirementsSection.points.map(({ id, title }) => (
              <li key={id}>{title}</li>
            ))}
          </ul>
        </section>
        <div className="relative mb-8 h-[176px]">
          <Image
            className="rounded-3 object-cover"
            src={`${IMAGES_CDN_URL}/faq-intro-mobile.jpg`}
            fill
            alt=""
            sizes="(max-width: 1023px) 991px, 700px"
          />
        </div>
        <section className="mb-6 lg:mb-8">
          <h2 className="mb-3 text-md font-medium text-white">{TEXTS.aboutSection.title}</h2>
          <p className="whitespace-pre-line font-rubik text-md text-gray-blue-100">{TEXTS.aboutSection.description}</p>
        </section>
        <Button
          className="mx-auto flex w-fit max-lg:gap-x-2 max-lg:px-4.5 max-lg:py-2.5 max-lg:text-md"
          color="primary"
          size="2xl"
          content={
            <>
              {TEXTS.button}
              <LinkExternal02 className="max-lg:size-5" />
            </>
          }
          href={DEALS_TYPEFORM}
          blank
        />
      </div>
      <article className="rounded-3 border border-gray-blue-500 bg-downriver p-[23px] text-center max-lg:row-start-2 max-lg:mb-4 lg:self-start">
        <h2 className="mb-2 text-lg font-medium text-white">{TEXTS.sidebar.title}</h2>
        <p className="mb-5 font-rubik text-gray-blue-200">{TEXTS.sidebar.description}</p>
        <Button
          className="inline-flex"
          color="primary"
          size="lg"
          content={
            <>
              {TEXTS.sidebar.button}
              <LinkExternal02 className="size-5" />
            </>
          }
          href={DEALS_TYPEFORM}
          blank
        />
      </article>
    </div>
  );
}
