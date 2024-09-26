'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import type { SwiperClass } from 'swiper/react';

import { SliderArrowLeftIcon, SliderArrowRightIcon } from '@/assets/icons';

interface Props {
  swiper: SwiperClass;
  mobileOnly?: boolean;
  slidesPerView: number;
}

export const SwiperArrowButtons = ({ swiper, mobileOnly, slidesPerView }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLeftClick = () => {
    if (swiper) {
      swiper.slidePrev();
      setActiveIndex(swiper.realIndex);
    }
  };

  const handleRightClick = () => {
    if (swiper) {
      swiper.slideNext();
      setActiveIndex(swiper.realIndex + slidesPerView);
    }
  };

  useEffect(() => {
    const handleSlideChange = () => {
      const previousIndex = swiper.previousIndex;
      const currentIndex = swiper.activeIndex;

      if (currentIndex > previousIndex) {
        setActiveIndex(swiper.realIndex + slidesPerView);
      } else {
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
  }, [swiper, slidesPerView]);

  return (
    <div className={classNames('flex gap-4', { 'hidden gap-8 lg:flex': !mobileOnly })}>
      <button
        type="button"
        onClick={handleLeftClick}
        className={classNames(
          mobileOnly ? 'p-[14px]' : 'p-4',
          'flex flex-col items-center justify-center rounded-full border border-gray-400 bg-white text-gray-500 transition',
          {
            'hover:border-primary-500': activeIndex !== 0,
            'hover:border-primary-500 hover:bg-primary-500 hover:text-white': activeIndex,
          },
        )}
        disabled={activeIndex === 0}
      >
        <div className={mobileOnly ? 'size-5' : 'size-6'}>
          <SliderArrowLeftIcon />
        </div>
      </button>
      <button
        type="button"
        onClick={handleRightClick}
        className={classNames(
          mobileOnly ? 'p-[14px]' : 'p-4',
          'flex flex-col items-center justify-center rounded-full border border-gray-400 bg-white p-4 text-gray-500 transition',
          {
            'hover:border-primary-500 hover:bg-primary-500 hover:text-white': activeIndex !== swiper.slides.length,
          },
        )}
        disabled={activeIndex === swiper.slides.length}
      >
        <div className={mobileOnly ? 'size-5' : 'size-6'}>
          <SliderArrowRightIcon />
        </div>
      </button>
    </div>
  );
};
