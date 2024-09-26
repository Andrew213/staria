'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { ArrowUpRightIcon } from '@/assets/icons';

import { commitmentData } from './constants';

export function Commitment() {
  const router = useRouter();

  const handleCardClick = useCallback(
    (link: string) => {
      router.push(link);
    },
    [router],
  );

  return (
    <div className="mt-[-270px] flex justify-center bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/commitment-2.png)] bg-cover bg-[right_30%_center] bg-no-repeat pb-16 pt-[285px] sm:bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/commitment.png)] sm:bg-center lg:-mt-40 lg:bg-[center_right_65%] lg:pb-24 lg:pt-40">
      <div className="flex w-full max-w-screen-xl flex-col items-center gap-10 px-4 lg:gap-16 lg:px-12">
        {/* TODO maybe it's better to store fixed sizes in the config */}
        <div className="flex max-w-screen-md flex-col gap-5">
          <h2 className="text-left text-display-md font-semibold tracking-tight text-white lg:text-center">
            {commitmentData.title}
          </h2>
          <p className="text-left font-rubik text-lg font-normal text-gray-50 lg:text-center lg:text-xl">
            {commitmentData.description}
          </p>
        </div>

        <div className="grid w-full gap-6 lg:grid-cols-3 lg:gap-10">
          {commitmentData.items.map(({ icon: Icon, title, description, link }) => (
            <div
              key={title}
              onClick={() => handleCardClick(link)}
              className="group flex cursor-pointer flex-col items-center gap-6 rounded-4 border-2 border-transparent bg-indigo/30 px-5 py-6 transition-all duration-300 hover:scale-105 hover:border-primary-500"
            >
              <div className="flex size-16 items-center justify-center rounded-3.325 bg-java">
                <Icon className="size-8 text-white" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-center text-xl font-semibold text-white">{title}</h3>
                <p className="text-center font-rubik text-md text-gray-50">{description}</p>
              </div>
              <Link
                className="mt-auto flex items-center gap-2 text-md font-semibold text-gray-100 group-hover:text-primary-300"
                href={link}
              >
                {commitmentData.linkTitle}
                <div className="size-5 rotate-45 group-hover:rotate-0">
                  <ArrowUpRightIcon />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
