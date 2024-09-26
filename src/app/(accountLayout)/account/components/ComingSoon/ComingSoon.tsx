'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { data } from './constants';
import LogoSvg from '../../images/logo.svg?url';

export function ComingSoon() {
  const path = usePathname();

  return (
    <div className="mt-2 flex h-full flex-col items-center lg:mt-[182px]">
      <div className="flex max-w-[352px] flex-col items-center px-6 py-10">
        <Image src={LogoSvg} alt="" className="mb-6" />
        <p className="text-lg font-semibold text-gray-900">{data.title}</p>
        <p className="text-center text-sm text-gray-600">
          {`We will implement the ${path.split('/')[2]} as soon as we launch our first sales`}
        </p>
      </div>
    </div>
  );
}
