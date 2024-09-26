'use client';
import CountUp from 'react-countup';

import { data } from './constants';

const {
  content: { heading, supportingText },
  metrics,
} = data;

export function MetricsSection() {
  return (
    <div className="flex flex-col items-center gap-12 py-8 xl:gap-16 xl:py-18">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex max-w-screen-md flex-col gap-4 xl:gap-5">
          <h1 className="text-left text-display-lg font-semibold tracking-tight text-gray-900 lg:text-center xl:text-display-xl">
            {heading}
          </h1>
          <p className="text-left font-rubik text-lg text-gray-600 lg:text-center xl:text-xl">{supportingText}</p>
        </div>
      </div>
      <div className="w-full px-4 xl:p-0">
        <div className="m-auto flex max-w-screen-md flex-col gap-8 rounded-3 bg-[linear-gradient(0deg,rgba(2,0,99,0.40)_0%,rgba(2,0,99,0.40)_100%),url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/abstract-spiral.png)] bg-cover bg-center bg-no-repeat px-6 py-8 shadow-section-card-1 xl:max-w-[1216px] xl:flex-row xl:rounded-4 xl:p-16">
          {metrics.map(({ id, number: { value, units }, text, supportingText }) => (
            <div
              key={id}
              className="rounded-3 border border-white/60 bg-white/30 px-4 py-8 text-white backdrop-blur-md xl:flex xl:w-full xl:flex-col xl:rounded-4"
            >
              <p className="flex flex-col text-center text-display-xl font-semibold tracking-tight xl:grow">
                <span>
                  <CountUp end={value} decimals={2} />
                </span>{' '}
                <span>{units}</span>
              </p>
              <p className="mt-3 text-center text-lg font-semibold">{text}</p>
              <p className="mt-2 text-center font-rubik text-md">{supportingText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
