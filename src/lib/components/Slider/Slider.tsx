import cn from 'classnames';
import Image from 'next/image';
import type React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { SliderArrowLeftIcon, SliderArrowRightIcon } from '@/assets/icons';

interface Props {
  items: {
    id: string;
    imageUrl: string;
    imageAlt: string;
    title: string;
    name: string;
    role: string;
    companyName: string;
  }[];
}

export function Slider({ items }: Props) {
  return (
    <Swiper className="h-full" modules={[Navigation]} spaceBetween={50} slidesPerView={1} loop={true}>
      {items.map(({ id, imageUrl, imageAlt, title, name, role }) => (
        <SwiperSlide className="rounded-4" key={id}>
          <div className="h-full overflow-hidden rounded-4">
            <div className="relative h-full">
              <Image
                className={cn(
                  'rounded-4 object-cover brightness-[0.9] saturate-[1.2]',
                  id === '1' ? 'object-bottom' : 'object-top',
                )}
                src={imageUrl}
                alt={imageAlt}
                fill
              />
            </div>
            <span className="absolute inset-x-0 bottom-0 z-30 flex flex-col gap-5 border-t border-white/30 bg-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.40)_100%)] px-5 pb-24 pt-5 backdrop-blur-md lg:gap-8 lg:p-8">
              <span className="text-xl font-semibold text-white lg:text-display-sm">{title}</span>
              <span className="flex flex-col gap-2 lg:gap-3">
                <span className="inline-block text-display-sm font-semibold text-white lg:text-display-md">{name}</span>
                <span className="flex flex-col gap-0.5 lg:gap-1">
                  <span className="whitespace-pre-wrap text-lg font-semibold text-white">{role}</span>
                </span>
              </span>
            </span>
          </div>
        </SwiperSlide>
      ))}
      <span
        slot="container-end"
        className="absolute inset-x-0 bottom-0 z-30 flex gap-4 px-4 py-8 text-white lg:justify-end lg:gap-8 lg:p-8"
      >
        <SlideNextButton />
        <SlidePrevButton />
      </span>
    </Swiper>
  );
}

interface NavigateButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const NavigateButton = ({ icon, onClick }: NavigateButtonProps) => {
  return (
    <button
      className="flex size-12 items-center justify-center rounded-full border border-white/50 lg:size-14"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <NavigateButton onClick={() => swiper.slideNext()} icon={<SliderArrowLeftIcon className="size-5 lg:size-6" />} />
  );
};

const SlidePrevButton = () => {
  const swiper = useSwiper();
  return (
    <NavigateButton onClick={() => swiper.slidePrev()} icon={<SliderArrowRightIcon className="size-5 lg:size-6" />} />
  );
};
