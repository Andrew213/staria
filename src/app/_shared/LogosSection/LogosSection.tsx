import classNames from 'classnames';

import { Tooltip } from '@/lib/components';

import { logosData } from './constants';

export function LogosSection() {
  return (
    <div className="w-full max-w-screen-xl px-8 pb-14 pt-10 lg:px-12 lg:pb-20 lg:pt-8">
      <div className="flex flex-col gap-8 rounded-6 border border-gray-200 bg-gray-100 px-8 py-10 shadow-logos lg:gap-8 lg:px-32 lg:pb-14 lg:pt-12">
        <p className="text-center font-rubik text-xl text-gray-600">{logosData.title}</p>
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:justify-between lg:gap-18">
          {logosData.logos.map(({ icon: Icon, text, mobileIcon: MobileIcon }, index) => (
            <div
              key={index}
              className={classNames(
                'w-full max-w-[245px] cursor-pointer first:max-w-[148px] last:max-w-[201px] lg:max-w-[255px] lg:first:max-w-[170px] lg:last:max-w-[356px]',
                { 'max-w-[207px]': index === 1 },
              )}
            >
              {MobileIcon ? (
                <>
                  <MobileIcon data-tooltip-id={`${index}`} className="w-full max-w-full lg:hidden" />
                  <Icon data-tooltip-id={`${index}`} className="hidden w-full max-w-full lg:block lg:h-16" />
                </>
              ) : (
                <Icon
                  data-tooltip-id={`${index}`}
                  className="w-full max-w-full lg:h-16 lg:first:h-[57px] lg:odd:h-[42px]"
                />
              )}

              <Tooltip id={`${index}`} position="top" color="secondary" text={text} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
