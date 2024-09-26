import cn from 'classnames';

import { CheckRoundedIcon } from '@/assets/icons';
import { Button } from '@/lib/components';

import { data } from './constants';

const { title, subtitle, benefitsList, buttonText, background } = data;

export function EarlyBirdCard() {
  return (
    <div className="flex flex-col px-4 py-16 lg:flex-row lg:justify-center lg:py-24">
      <div className="flex w-full max-w-[1216px] flex-col lg:max-h-[716px] lg:flex-row lg:justify-center">
        <div className="rounded-t-4 bg-gray-800 px-6 pb-12 pt-10 lg:rounded-l-6 lg:rounded-tr-none xl:p-16 xl:pr-10 xl:pt-[90px]">
          <h3 className="mb-4 text-display-sm font-semibold text-white lg:mb-5 lg:text-display-md lg:tracking-tight">
            {title}
          </h3>
          <p className="mb-8 font-rubik text-xl font-normal text-white lg:mb-10">{subtitle}</p>
          <div className="flex items-center gap-6 pb-10 pt-2 lg:pb-12">
            <p className="text-nowrap text-display-lg font-semibold tracking-tight text-white">$ {data.price}</p>
            <div className="-mt-1">
              <div className="text-xl font-semibold text-white/67 line-through">{data.periodCrossed}</div>
              <p className="-mt-1 text-nowrap text-display-xs font-semibold text-white">{data.period}</p>
            </div>
          </div>
          <ul className="mb-8 flex flex-col items-start gap-5 pl-4 lg:mb-10">
            {benefitsList.map((item, index) => (
              <li key={index} className="grid grid-cols-[max-content_auto] gap-3 md:flex">
                <CheckRoundedIcon className="size-7" />
                <p className="text-lg font-semibold text-white lg:text-xl">{item}</p>
              </li>
            ))}
          </ul>
          <div className="flex w-full flex-col lg:items-start">
            <Button content={buttonText} href={data.href} size="xl" color="secondary" animate />
          </div>
        </div>
        <div
          className={cn(
            `${background} h-[280px] w-full rounded-b-4 bg-cover bg-center bg-no-repeat lg:h-[716px] lg:max-w-[619px] lg:rounded-r-4 lg:rounded-bl-none`,
          )}
        ></div>
      </div>
    </div>
  );
}
