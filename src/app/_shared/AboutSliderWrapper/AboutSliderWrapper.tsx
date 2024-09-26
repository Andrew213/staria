'use client';

import parse from 'html-react-parser';
import { useState } from 'react';

import { Player, VideoModal } from '@/lib/components';
import { projectParser } from '@/utils/projectParser';

import { AboutSlider, MobileImagesSection } from './components';

interface Props {
  name: string;
  tokenName: string;
  description: string;
  mediaText: string;
  gallery: string[];
  videoUrl: string;
}

export function AboutSliderWrapper({ name, tokenName, description, mediaText, gallery, videoUrl }: Props) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="flex flex-col gap-8 py-2 lg:gap-6 lg:pt-0">
      <div>
        <h3 className="mb-4 text-display-sm font-semibold text-gray-900 dark:text-white">
          {`${name}`} <span className="text-xl">({tokenName})</span>
        </h3>
        <div className="text-md font-normal text-gray-600 dark:text-gray-blue-100">
          {parse(description, projectParser)}
        </div>
      </div>
      <div className="hidden lg:block">
        <AboutSlider videoUrl={videoUrl} gallery={gallery} />
      </div>
      <div className="block lg:hidden">
        {videoUrl && (
          <>
            {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} autoplay url={videoUrl} />}
            <Player
              rootClassnames="h-[177px] mb-6 rounded-2 object-cover object-center sm:h-auto !p-0"
              url={videoUrl}
              autoplay={false}
              onClick={() => setShowVideoModal(true)}
              previewMode
            />
          </>
        )}
        <MobileImagesSection gallery={gallery} />
      </div>
      <div className="rounded-2 bg-gray-50 p-4 text-md dark:bg-downriver [&>p]:text-gray-700 dark:[&>p]:text-gray-blue-50">
        {parse(mediaText, projectParser)}
      </div>
    </div>
  );
}
