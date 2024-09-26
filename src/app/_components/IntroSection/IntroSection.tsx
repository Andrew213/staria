'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { PlayCircleIcon } from '@/assets/icons';
import { HOMEPAGE_VIDEO_LINK, IMAGES_CDN_URL } from '@/env';
import { Button, VideoModal } from '@/lib/components';

import { introSectionText } from './constants';

export function IntroSection() {
  // TODO store breakpoints somewhere besides tailwind config
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="flex w-full max-w-screen-xl flex-col items-center gap-12 px-4 pb-8 pt-12 lg:flex-row lg:gap-8 lg:p-8">
      <div className="flex max-w-[624px] grow flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-display-lg font-semibold tracking-tight text-gray-900 lg:text-display-xl">
            {introSectionText.title}
          </h1>
          <p className="font-rubik text-xl text-gray-500">{introSectionText.description}</p>
        </div>
        <div className="flex flex-col justify-stretch gap-3 lg:flex-row lg:justify-start lg:gap-6">
          <Button
            content={introSectionText.discoverButton}
            size={isDesktop ? '2xl' : 'xl'}
            color="secondary-gray"
            icon={<PlayCircleIcon />}
            onClick={() => setShowVideoModal(true)}
          />
          {showVideoModal && (
            <VideoModal
              onClose={() => setShowVideoModal(false)}
              autoplay
              // TODO ask the url
              url={HOMEPAGE_VIDEO_LINK}
            />
          )}
          <Button
            blank
            href={introSectionText.href}
            content={introSectionText.applyButton}
            size={isDesktop ? '2xl' : 'xl'}
            color="primary"
            animate
          />
        </div>
      </div>
      <div className="relative h-[392px] w-[343px] max-w-full shrink-0 grow lg:h-auto lg:pt-[52%]">
        <Image
          className="rounded-bl-16 rounded-tr-16 object-cover object-[-100px_center] shadow-home-hero lg:object-[-170px_center]"
          src={`${IMAGES_CDN_URL}/hologram-of-a-young-man-2.jpg`}
          alt={introSectionText.imageAlt}
          fill
          priority
        />
      </div>
    </div>
  );
}
