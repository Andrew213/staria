'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { ArrowUpRightIcon } from '@/assets/icons';
import { CDN_URL, HOMEPAGE_VIDEO_LINK } from '@/env';
import { Player, VideoModal } from '@/lib/components';

import { featuresData } from './constants';

export function Features() {
  const router = useRouter();
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleCardClick = useCallback(
    (link: string) => {
      router.push(link);
    },
    [router],
  );

  return (
    <div className="flex flex-col items-center pb-4 lg:pb-0">
      <div className="flex w-full justify-center bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/features-mobile.png)] bg-cover bg-no-repeat pb-14 pt-16 sm:bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/features.png)] lg:pb-40 lg:pt-24">
        <div className="flex w-full max-w-screen-xl flex-col items-center gap-12 px-4 lg:gap-18 lg:px-8">
          <div className="flex max-w-[898px] flex-col items-start gap-5 self-start text-left">
            <h2 className="text-left text-display-md font-semibold tracking-tight text-white">{featuresData.title}</h2>
            <p className="font-rubik text-lg text-gray-50 lg:text-xl">{featuresData.description}</p>
          </div>

          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-10 lg:px-14">
            {featuresData.items.map(({ title, description, icon: Icon, url }, index) => (
              <div
                key={title + index}
                onClick={() => handleCardClick(url)}
                className="group flex cursor-pointer items-start gap-4 rounded-3 border-2 border-transparent bg-[#445da0]/30 px-3 py-4 transition duration-300 hover:scale-105 hover:border-primary-300 lg:rounded-6 lg:px-5 lg:py-7"
              >
                <div className="shrink-0 rounded-2 border border-gray-200 bg-primary-500 p-2 shadow-featured-icons lg:rounded-2.5 lg:p-3">
                  <Icon className="size-5 text-white lg:size-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-white lg:text-xl">{title}</h3>
                  <p className="font-rubik text-md text-gray-50">{description} </p>
                  <Link
                    className="flex items-center gap-2 font-rubik text-md text-gray-100 group-hover:text-primary-300 lg:hidden"
                    href={url}
                  >
                    {featuresData.link.text}
                    <ArrowUpRightIcon className="size-5 rotate-45 group-hover:rotate-0" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-4 lg:px-8">
        <div className="relative -top-6 flex w-full justify-center lg:-top-18 lg:w-auto">
          <div className="h-[193px] w-full sm:h-[300px] md:h-[450px] lg:w-[800px]">
            {showVideoModal && (
              <VideoModal onClose={() => setShowVideoModal(false)} autoplay url={HOMEPAGE_VIDEO_LINK} />
            )}
            <Player
              url={HOMEPAGE_VIDEO_LINK}
              autoplay={false}
              rootClassnames="!p-0 !lg:p-0 max-w-[916px] self-center shadow-logos"
              onClick={() => setShowVideoModal(true)}
              previewMode
              poster={`${CDN_URL}/cdn-cgi/image/format=auto/assets/images/moon-at-the-mountain.jpg`}
              overlayClasses="bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.20)_100%)] bg-[rgb(10,27,80,0.30)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
