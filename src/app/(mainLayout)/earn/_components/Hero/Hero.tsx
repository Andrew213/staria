'use client';
import { useState } from 'react';

import { PlayCircleIcon } from '@/assets/icons';
import { EARN_VIDEO_LINK } from '@/env';
import { Button, VideoModal } from '@/lib/components';

import { data } from './constants';

const { heading, supportingText, button } = data;

export function Hero() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="relative flex w-full flex-col items-center px-4 pb-[230px] pt-18 text-center lg:px-8 lg:pb-[290px]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(8,23,74,0.50)_0%,rgba(8,23,74,0.50)_100%),url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/referral-bg.jpeg)] bg-cover bg-[center_right_44%] bg-no-repeat brightness-[0.65] saturate-150 lg:bg-center"></div>
      <h2 className="mb-6 text-left text-display-lg font-semibold tracking-display-lg text-white lg:text-center">
        {heading}
      </h2>
      <p className="mb-8 max-w-screen-md text-left font-rubik text-xl font-normal text-gray-200 lg:text-center">
        {supportingText}
      </p>
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} autoplay url={EARN_VIDEO_LINK} />}
      <Button
        onClick={() => setShowVideoModal(true)}
        icon={
          <div className="size-6">
            <PlayCircleIcon />
          </div>
        }
        content={button.text}
        size="2xl"
        color="secondary-gray"
        animate
      ></Button>
    </div>
  );
}
