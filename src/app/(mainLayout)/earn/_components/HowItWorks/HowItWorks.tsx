'use client';

import { useState } from 'react';
import Markdown from 'react-markdown';

import { CDN_URL, EARN_VIDEO_LINK } from '@/env';
import { Player, VideoModal } from '@/lib/components';

import { data } from './constants';

export function HowItWorks() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-4 border border-gray-200 bg-white shadow-section-card-2 lg:grid lg:grid-cols-[575px,1fr]">
      <div className="h-[440px] shrink-0 lg:h-auto">
        {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} autoplay url={EARN_VIDEO_LINK} />}
        <Player
          url={EARN_VIDEO_LINK}
          rootClassnames="!p-0 !lg:p-0 !rounded-none [&>video]:rounded-none"
          poster={`${CDN_URL}/cdn-cgi/image/format=auto/assets/images/cube-hologram.jpg`}
          onClick={() => setShowVideoModal(true)}
          previewMode
        />
      </div>

      <div className="-order-1 flex flex-col gap-4 px-6 py-10 lg:order-1 lg:gap-8 lg:py-16 lg:pl-14 lg:pr-12">
        <h2 className="text-display-md font-semibold tracking-tight text-gray-900">{data.title}</h2>
        <div className="flex flex-col gap-5 lg:gap-8">
          <p className="font-rubik text-md text-gray-600 lg:text-lg">{data.description}</p>
          <div className="flex flex-col gap-3 lg:gap-4">
            {data.text.map((x, index) => (
              <div key={index} className="font-rubik text-md text-gray-600 lg:text-lg">
                <Markdown
                  components={{
                    strong: ({ children }) => (
                      <span className="font-ruberoid font-bold text-gray-800 lg:text-xl">{children}</span>
                    ),
                  }}
                >
                  {x}
                </Markdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
