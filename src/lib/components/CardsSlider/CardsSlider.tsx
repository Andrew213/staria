import type { Swiper as SwiperClass } from 'swiper';
import { Navigation, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { BlogPostCard } from '@/features/blogPosts/components';
import { useBreakpoint } from '@/lib/hooks';

interface Props {
  items: {
    id: string;
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    slug: string;
    linkTitle: string;
  }[];
  onSwiper: (swiper: SwiperClass) => void;
}

export function CardsSlider({ items, onSwiper }: Props) {
  const { isBelowLg } = useBreakpoint('lg');
  const { isBelowMd } = useBreakpoint('md');

  return (
    <>
      <Swiper
        onSwiper={onSwiper}
        pagination={{ clickable: true }}
        className="h-full !overflow-visible [&>.swiper-wrapper]:items-stretch [&>.swiper-wrapper]:!pr-20 [&_.swiper-pagination-bullet]:!size-2.5"
        modules={[Navigation, Mousewheel]}
        mousewheel
        spaceBetween={isBelowLg ? 24 : 32}
        slidesPerView={isBelowMd ? 1 : 3}
      >
        {[...items].map((item) => (
          <SwiperSlide className="!flex !h-auto items-stretch" key={item.id}>
            <BlogPostCard isBlog {...item} smallPicture />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
