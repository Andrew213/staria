import { twJoin } from 'tailwind-merge';

import communityApi from '@/api/CommunityApi';
import dealsApi from '@/api/DealsApi';
import { ProductCard } from '@/app/_shared';

interface Props {
  communityName?: string;
}

export default async function Deals({ communityName }: Props) {
  const { data: deals, error: fetchDealsError } = communityName
    ? await communityApi.fetchDeals(communityName)
    : await dealsApi.fetchDeals();

  return deals ? (
    <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {deals
        .toSorted((a, b) => a.order - b.order)
        .map((deal, index, array) => {
          const shouldBeFullWidth = array.length !== 2 && index === 0;

          return (
            <li className={twJoin(shouldBeFullWidth && 'lg:col-span-2')} key={deal.slug}>
              <ProductCard
                project={deal}
                communityName={communityName}
                variant={!shouldBeFullWidth ? 'vertical' : undefined}
              />
            </li>
          );
        })}
    </ul>
  ) : (
    <p className="text-md text-error-300 lg:text-lg">{fetchDealsError}</p>
  );
}
