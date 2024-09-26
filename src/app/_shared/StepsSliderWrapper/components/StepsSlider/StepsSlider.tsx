'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { SwiperClass } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { useMode } from '@/app/_shared/hooks';
import { ArrowRight } from '@/assets/icons';

import { linkTitle, linkUrl, sliderItems } from './constants';

export function StepsSlider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass>();
  const refs = useRef<HTMLLIElement[]>([]);
  const [stickParams, setStickParams] = useState({ top: 0, height: 0 });
  const [scrollCount, setScrollCount] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const scrollCountRef = useRef(scrollCount);
  const [touchStart, setTouchStart] = useState<number>();
  const [touchEnd, setTouchEnd] = useState<number>();
  const mode = useMode();

  useEffect(() => {
    scrollCountRef.current = scrollCount;
    swiperInstance?.slideTo(scrollCount);
  }, [scrollCount, swiperInstance]);

  useEffect(() => {
    setStickParams((prev) => ({
      ...prev,
      height: refs.current[0].offsetHeight,
    }));
  }, []);

  const handleTouchEnd = () => {
    if (!touchEnd || !touchStart) return;

    const deltaY = touchEnd - touchStart;

    if (deltaY > 0) {
      if (scrollCountRef.current > 0) {
        setScrollCount((prev) => prev - 1);
      }
    } else {
      if (scrollCountRef.current <= sliderItems.length - 2) {
        setScrollCount((prev) => prev + 1);
      }
    }
  };

  const handleSlideChange = (index: number) => {
    const el = refs.current[index];
    if (refs.current && el) {
      const rect = el.getBoundingClientRect();
      const containerRect = el.parentElement?.getBoundingClientRect();
      const elementPosition = rect.top - containerRect!.top;
      const elmentHeigth = el.offsetHeight;
      setStickParams({ height: elmentHeigth, top: elementPosition });
    }
  };

  return (
    <div ref={listRef} className="flex flex-col items-center justify-center gap-12 lg:w-[1640px] lg:flex-row lg:gap-16">
      <div className="flex size-full max-w-[552px] gap-5">
        <div className="relative w-1 shrink-0 bg-gray-100 dark:bg-gray-blue-600">
          <div
            className="absolute w-1 bg-primary-500 transition-all duration-200 ease-in-out dark:bg-primary-300"
            style={{
              height: stickParams.height,
              top: stickParams.top,
            }}
          />
        </div>
        <ul
          className="flex flex-col gap-8"
          onTouchStart={(e) => {
            setTouchStart(e.targetTouches[0].clientY);
          }}
          onTouchMove={(e) => {
            setTouchEnd(e.targetTouches[0].clientY);
          }}
          onTouchEnd={handleTouchEnd}
        >
          {sliderItems.map((item, index) => {
            return (
              <li
                className="flex flex-col gap-2"
                key={index}
                ref={(el) => {
                  refs.current[index] = el!;
                }}
                onMouseEnter={() => {
                  setScrollCount(index);
                }}
              >
                <h3 className="text-lg font-semibold text-gray-900 lg:text-xl dark:text-white">{item.title}</h3>
                <p className="font-rubik text-md text-gray-600 dark:text-gray-blue-100">{item.description}</p>
                {index === 0 && (
                  // TO-DO check for user registration
                  <Link className="mt-3 flex items-center gap-2 text-md font-semibold text-primary-500" href={linkUrl}>
                    {linkTitle}
                    <div className="text-primary-700">
                      <ArrowRight />
                    </div>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <Swiper
        className="h-[233px] lg:h-[582px] lg:shrink-0"
        onSwiper={setSwiperInstance}
        spaceBetween={20}
        direction="vertical"
        onRealIndexChange={(el: SwiperClass) => {
          handleSlideChange(el.activeIndex);
        }}
      >
        {sliderItems.map((item, index) => (
          <SwiperSlide className="size-full overflow-hidden lg:h-[682px] lg:w-[1024px]" key={index}>
            <Image
              className="w-full rounded-3 border-[6px] border-black lg:h-[682px] lg:w-[1024px] dark:border-gray-300"
              src={item.imageData[mode].url}
              width={item.imageData[mode].width}
              height={item.imageData[mode].height}
              alt={item.imageAlt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
