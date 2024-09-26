'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { TEAM_LINK } from '@/env';

import { data } from './constants';

const {
  content: { subheading, heading, supportingText },
  cards,
} = data;

export function TeamSection() {
  const pathname = usePathname();
  const containerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash.substring(1) === TEAM_LINK && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <div
      className="m-auto flex max-w-screen-xl flex-col items-center gap-12 py-16 xl:gap-16 xl:py-24"
      ref={containerRef}
    >
      <div className="flex flex-col gap-4 px-4 xl:gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-left text-sm font-semibold text-primary-700 xl:text-md">{subheading}</p>
          <h2 className="text-left text-display-md font-semibold tracking-display-lg text-gray-900 lg:text-center lg:text-display-lg">
            {heading}
          </h2>
        </div>
        <p className="max-w-screen-sm text-left font-rubik text-lg text-gray-600 lg:text-center xl:max-w-[760px] xl:text-xl">
          {supportingText}
        </p>
      </div>
      <div className="px-4 xl:px-8">
        <div className="flex max-w-screen-sm flex-col gap-6 md:grid md:max-w-screen-md md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] xl:max-w-screen-xl xl:gap-8">
          {cards.map(({ id, name, role, supportingText, socials, image: { src, alt, width, height } }) => (
            <div
              key={id}
              className="flex flex-col items-center gap-4 rounded-3 bg-gray-50 p-6 shadow-section-card-1 xl:w-full xl:gap-5 xl:rounded-6"
            >
              <div className="flex size-20 items-center justify-center rounded-full xl:size-24">
                <Image className="object-cover" src={src} width={width} height={height} alt={alt} />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-center text-lg font-semibold text-gray-900">{name}</p>
                    <p className="text-center font-rubik text-md text-primary-700">{role}</p>
                  </div>
                  <p className="text-center font-rubik text-md text-gray-600">{supportingText}</p>
                </div>
                <div className="flex gap-4">
                  {socials.map(({ id, href, Icon }) => (
                    <a key={id} className="size-5 text-gray-400" href={href} target="_blank" rel="noreferrer">
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
