import cn from 'classnames';

import { CheckRoundedIcon } from '@/assets/icons';
import { Button } from '@/lib/components';

import { data } from './constants';

const { title, subtitle, benefitsList, buttonText, background } = data;

export function KolCard() {
  return (
    <div className="flex flex-col px-4 py-16 lg:flex-row lg:justify-center lg:py-24">
      <div className="flex w-full max-w-[1216px] flex-col lg:max-h-[510px] lg:flex-row lg:justify-center">
        <div className="rounded-t-4 bg-gray-800 px-6 pb-12 pt-10 lg:rounded-l-6 lg:rounded-tr-none xl:p-16">
          <h3 className="mb-4 text-display-sm font-semibold text-white lg:mb-5 lg:text-display-md">{title}</h3>
          <p className="mb-8 font-rubik text-xl font-normal text-white lg:mb-10">{subtitle}</p>
          <ul className="mb-8 flex flex-col items-start gap-5 pl-4 lg:mb-10">
            {benefitsList.map((item, index) => (
              <li key={index} className="grid grid-cols-[max-content_auto] gap-3 md:flex">
                <CheckRoundedIcon className="size-7" />
                <p className="text-lg font-semibold text-white lg:text-xl">{item}</p>
              </li>
            ))}
          </ul>
          <Button content={buttonText} href={data.href} blank size="xl" color="secondary" animate />
        </div>
        <div
          className={cn(
            `${background} h-[280px] w-full rounded-b-4 bg-cover bg-center bg-no-repeat lg:h-[510px] lg:max-w-[530px] lg:rounded-r-4 lg:rounded-bl-none`,
          )}
        ></div>
      </div>
    </div>
  );
}
