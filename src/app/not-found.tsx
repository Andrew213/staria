'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ArrowLeftIcon, SearchIcon } from '@/assets/icons';
import { LayoutProvider } from '@/core/providers';
import { IMAGES_CDN_URL } from '@/env';
import { Button } from '@/lib/components';

import { Footer } from './_components';
import { TEXTS } from './_not-found-constants';

export default function NotFound() {
  const router = useRouter();

  return (
    <LayoutProvider>
      <div className="flex flex-col items-center">
        <div className="flex max-w-[400px] flex-col items-center justify-between px-4 py-16 lg:grid lg:max-w-screen-xl lg:grid-cols-2 lg:px-8 lg:py-6">
          <div className="mb-8 flex flex-col gap-8 lg:mb-0 lg:max-w-[480px]">
            <div className="flex flex-col gap-6">
              <Button className="self-start p-3.5" icon={<SearchIcon />} size="sm" color="secondary-gray" />
              <h1 className="text-display-sm font-semibold tracking-tight text-gray-900 md:text-display-md lg:text-display-xl">
                {TEXTS.title}
              </h1>
              <p className="font-rubik text-lg text-gray-500 lg:text-xl">{TEXTS.description}</p>
            </div>
            <div className="flex w-full flex-col items-center gap-3 lg:flex-row">
              <Button
                size="xl"
                className="order-last w-full lg:order-first"
                color="secondary-gray"
                onClick={() => router.back()}
                icon={
                  <div className="flex items-center justify-center text-gray-700">
                    <ArrowLeftIcon />
                  </div>
                }
                content={TEXTS.goBackButton}
                animate
              />
              <Button
                onClick={() => router.push('/')}
                size="xl"
                className="w-full"
                color="primary"
                content={TEXTS.homeButton}
                animate
              />
            </div>
            <div className="flex flex-col justify-stretch gap-3 lg:flex-row lg:justify-start" />
          </div>
          <Image
            className="shrink-0 lg:hidden lg:shrink"
            src={`${IMAGES_CDN_URL}/hologram-of-kids-mobile.png`}
            width={686}
            height={480}
            alt={TEXTS.imageAlt}
          />
          <Image
            className="hidden shrink-0 lg:block lg:shrink"
            src={`${IMAGES_CDN_URL}/hologram-of-kids-desktop.png`}
            width={1440}
            height={1824}
            alt={TEXTS.imageAlt}
          />
        </div>
      </div>
      <Footer />
    </LayoutProvider>
  );
}
