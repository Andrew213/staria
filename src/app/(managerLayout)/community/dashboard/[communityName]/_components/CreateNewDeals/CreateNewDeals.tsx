import Link from 'next/link';

import FeaturedIcon from '@/lib/components/FeaturedIcon/FeaturedIcon';
import { routes } from '@/routes';

import { TEXTS, DEALS } from './data';

export default function CreateNewDeals({ communityName }: { communityName: string }) {
  return (
    <section>
      <h2 className="mb-6 text-lg font-semibold text-white">{TEXTS.title}</h2>
      <ul className="grid max-lg:gap-y-6 lg:grid-cols-2 lg:gap-x-6">
        {DEALS.map(({ id, Icon, title, description }) => (
          <li className="rounded-3 border border-gray-blue-300 bg-downriver shadow-xs" key={id}>
            <Link
              className="grid grid-cols-[auto_1fr] items-start gap-x-3 px-3.75 py-4.75 lg:px-4.75"
              href={
                id === 0
                  ? routes.community.deals.communityName.getRedirectPath({ communityName })
                  : routes.community.manage.communityName.getRedirectPath({ communityName })
              }
            >
              <FeaturedIcon
                theme="modern"
                size="lg"
                Icon={Icon}
                className="max-lg:rounded-[8.833px] max-lg:border-[0.333px] max-lg:p-2.25 max-lg:shadow-[0_0.833px_1.667px_theme(colors.gray.900/5%)]"
                iconClassName="max-lg:size-5"
              />
              <div>
                <p className="mb-0.5 text-md font-semibold text-gray-blue-50">{title}</p>
                <p className="font-rubik text-sm text-gray-blue-100">{description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
