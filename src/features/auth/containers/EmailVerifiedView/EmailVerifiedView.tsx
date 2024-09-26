import { FeaturedIcon } from '@/assets/icons';
import { Button } from '@/lib/components';

import { data } from './constants';

const { title, description, button } = data;

export function EmailVerifiedView() {
  return (
    <div className="flex max-w-[360px] flex-col items-center">
      <FeaturedIcon className="mb-6" />
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h1 className="max-w-[300] text-display-xs font-semibold text-gray-900">{title}</h1>
        <p className="font-rubik text-md font-normal text-gray-600">{description}</p>
      </div>
      <Button color="primary" size="lg" href={button.href} content={button.text} className="w-full" />
    </div>
  );
}
