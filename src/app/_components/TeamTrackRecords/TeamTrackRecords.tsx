'use client';
import cn from 'classnames';
import React from 'react';

import NoSsr from '@/core/NoSsr/NoSsr';
import { TEAM_LINK } from '@/env';
import { Button } from '@/lib/components';
import { useBreakpoint } from '@/lib/hooks';
import { routes } from '@/routes';

import { data } from './constants';

export function TeamTrackRecords() {
  const { isBelowLg } = useBreakpoint('lg');

  return (
    <div className="flex flex-col items-center gap-12 bg-gray-50 px-4 py-16 lg:gap-16 lg:p-24">
      <div className="flex flex-col gap-4 text-center lg:gap-6">
        <h2 className="text-left text-display-md font-semibold tracking-tight text-gray-900 lg:text-center lg:text-display-md">
          {data.title}
        </h2>
        <p className="text-left font-rubik text-xl text-gray-600 lg:text-center">{data.description}</p>
      </div>

      <NoSsr>
        <div className="flex flex-col items-center gap-8 lg:max-w-screen-md lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-18 lg:gap-y-16">
          {data.logos.map(({ id, width, mobileWidth, icon: Icon }) => (
            <React.Fragment key={id}>
              {isBelowLg ? (
                <div
                  className={cn(
                    'relative w-full hover:[&>svg:first-child]:opacity-0 hover:[&>svg:last-child]:opacity-100',
                    {
                      'order-2': id === 5,
                    },
                  )}
                  style={{
                    maxWidth: mobileWidth,
                  }}
                >
                  <Icon className="w-full max-w-full" />
                </div>
              ) : (
                <div
                  className="relative order-1 w-full hover:[&>svg:first-child]:opacity-0 hover:[&>svg:last-child]:opacity-100"
                  style={{
                    maxWidth: width,
                  }}
                >
                  <Icon className="w-full max-w-full" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </NoSsr>

      <Button
        size="xl"
        color="secondary-gray"
        content={data.buttonText}
        href={`${routes.about.getRedirectPath()}#${TEAM_LINK}`}
        animate
      />
    </div>
  );
}
