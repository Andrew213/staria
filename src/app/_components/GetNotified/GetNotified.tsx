import { SubscribeForm } from '@/features/subscribeForm';

import { data } from './constants';

export function GetNotified() {
  return (
    <div className="flex flex-col items-center bg-gray-50 py-10 lg:py-12">
      <div className="flex w-full max-w-[400px] flex-col gap-8 px-4 lg:max-w-screen-xl lg:flex-row lg:px-8">
        <div className="flex grow flex-col gap-2 lg:gap-4">
          <h4 className="text-display-xs font-semibold text-gray-900 lg:text-display-sm">{data.title}</h4>
          <p className="font-rubik text-md text-gray-600 lg:text-xl">{data.description}</p>
        </div>
        <div className="max-w-[400px] lg:w-[400px]">
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
}
