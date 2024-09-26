'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Navigation, Mousewheel } from 'swiper/modules';
import type { SwiperClass } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SwiperArrowButtons } from '@/app/_components';
import { Modal } from '@/app/_shared';

interface Props {
  gallery: string[];
}

export function MobileImagesSection({ gallery }: Props) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>();

  return (
    <div className="flex w-full flex-col justify-start gap-8">
      <Swiper
        onSwiper={setSwiper}
        mousewheel
        pagination={{ clickable: true }}
        modules={[Navigation, Mousewheel]}
        spaceBetween={8}
        slidesPerView={1}
        className="!ml-0 !mr-auto h-full !w-[272px] !overflow-visible [&>.swiper-wrapper]:items-stretch"
      >
        {gallery.map((url, index) => (
          <SwiperSlide
            className="!flex !h-[156px] !w-[272px] justify-center overflow-hidden rounded-2 align-middle"
            key={index}
          >
            {selectedImageIndex === index && (
              <Modal
                closeButtonIsShown
                onClose={() => {
                  setSelectedImageIndex(undefined);
                }}
              >
                <Image src={url} alt="" width={500} height={500} className="max-h-[500px] object-contain" />
              </Modal>
            )}
            <button
              type="button"
              className="rounded-2"
              onClick={() => {
                setSelectedImageIndex(index);
              }}
            >
              <Image fill src={url} className="w-full rounded-2 object-contain" alt="" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-start">
        {swiper && (
          <>
            <SwiperArrowButtons slidesPerView={1} mobileOnly swiper={swiper} />
          </>
        )}
      </div>
    </div>
  );
}
