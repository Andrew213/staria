'use client';

import { useEffect, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';

import { CardsSlider } from '@/lib/components';
import type { PostsShortInfo } from '@/types';

import { data } from './data';
import { SwiperArrowButtons } from '../SwiperArrowButtons/SwiperArrowButtons';

interface Props {
  posts: PostsShortInfo;
}

export function PostsSlider({ posts }: Props) {
  const items = posts.map(({ title, excerpt, image, id, slug }) => ({
    image,
    imageAlt: title,
    title,
    description: excerpt.substring(0, 121) + '...',
    slug,
    linkTitle: 'Learn More',
    id,
  }));

  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="flex w-full max-w-screen-xl flex-col gap-12 px-4 py-16 lg:gap-10 lg:px-8 lg:py-24">
      <div className="flex flex-col gap-4 text-center lg:mb-4 lg:gap-5 lg:text-left">
        <h2 className="text-left text-display-md font-semibold tracking-tight text-gray-900 lg:text-center lg:text-display-md">
          {data.title}
        </h2>
        <p className="text-left font-rubik text-lg text-gray-600 lg:pb-2 lg:text-center lg:text-xl">
          {data.description}
        </p>
      </div>

      <div>
        <CardsSlider onSwiper={setSwiper} items={items} />
      </div>
      <div className="flex flex-col items-center lg:items-start">
        {swiper && (
          <>
            <div className="lg:hidden">
              <SwiperPagination swiper={swiper} />
            </div>

            <SwiperArrowButtons slidesPerView={3} swiper={swiper} />
          </>
        )}
      </div>
    </div>
  );
}

const SwiperPagination = ({ swiper }: { swiper: SwiperClass }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleSlideChange = () => {
      if (swiper) {
        setActiveIndex(swiper.realIndex);
      }
    };

    if (swiper) {
      swiper.on('slideChange', handleSlideChange);
    }

    return () => {
      if (swiper) {
        swiper.off('slideChange', handleSlideChange);
      }
    };
  }, [swiper]);

  const handleSlideTo = (index: number) => {
    if (swiper) {
      setActiveIndex(index);
      swiper.slideTo(index);
    }
  };

  return (
    <div className="flex gap-4">
      {Array.from({ length: swiper?.slides.length || 0 }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleSlideTo(index)}
          className={`size-2.5 rounded-full ${activeIndex === index ? 'bg-primary-500' : 'bg-gray-300'}`}
        ></button>
      ))}
    </div>
  );
};
