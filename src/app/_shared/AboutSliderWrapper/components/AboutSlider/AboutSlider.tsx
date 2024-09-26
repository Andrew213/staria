'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { SwiperClass } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Modal } from '@/app/_shared';
import { VideoPlayButton } from '@/assets/icons';
import { Player, VideoModal } from '@/lib/components';

interface Props {
  videoUrl: string;
  gallery: string[];
}

export function AboutSlider({ gallery, videoUrl }: Props) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass>();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [imageId, setImageId] = useState<number | null>(null);

  return (
    <div>
      <Swiper autoplay onSwiper={setSwiperInstance} className="w-full" spaceBetween={20}>
        <SwiperSlide className="!h-[388px] w-full" key={0}>
          {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} autoplay url={videoUrl} />}
          <Player
            url={videoUrl}
            autoplay={false}
            rootClassnames=" !w-full rounded-3 object-cover !p-0"
            onClick={() => setShowVideoModal(true)}
            previewMode
          />
        </SwiperSlide>
        {gallery.map((url, index) => (
          <SwiperSlide className="!h-[388px] w-full" key={index}>
            {imageId === index && (
              <Modal closeButtonIsShown onClose={() => setImageId(null)}>
                <Image src={url} alt="" width={700} height={700} className="max-h-[800px]" />
              </Modal>
            )}
            <button type="button" onClick={() => setImageId(index)}>
              <Image src={url} fill alt="" className="size-full shrink-0 rounded-3 object-contain" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-4 flex justify-between gap-1.5">
        <button
          type="button"
          className="relative h-18 w-full rounded-3"
          key={0}
          onClick={() => swiperInstance?.slideTo(0)}
        >
          <div className="relative size-full">
            <video src={videoUrl} id="myVideo" className="absolute inset-0 size-full rounded object-cover"></video>
            <div className="absolute left-[50%] top-[50%] size-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-transparent text-white">
              <VideoPlayButton />
            </div>
          </div>
        </button>
        {gallery.map((url, index) => (
          <button
            type="button"
            className="relative h-18 w-full rounded-3"
            key={index}
            onClick={() => swiperInstance?.slideTo(index + 1)}
          >
            <Image alt="" src={url} className="rounded-3 object-contain" fill />
          </button>
        ))}
      </div>
    </div>
  );
}
