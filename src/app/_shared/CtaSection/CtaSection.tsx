'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Markdown from 'react-markdown';

import { CheckRoundedIcon } from '@/assets/icons';
import { useMembership } from '@/core/providers/MembershipProvider';
import { Badge, Button, Slider } from '@/lib/components';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOffers } from '@/redux/offersSlice';
import { selectActiveSubscription } from '@/redux/userSlice';
import { routes } from '@/routes';

import { data } from './constants';

export function CtaSection() {
  const router = useRouter();
  const session = useSession();
  const { offers } = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  const { setCheckedPlan, setPaymentStep } = useMembership();
  const activePlan = useAppSelector(selectActiveSubscription);

  useEffect(() => {
    void dispatch(fetchOffers());
  }, [dispatch]);

  function handleButtonClick() {
    const userIsAuthenticated = session.status === 'authenticated';

    if (userIsAuthenticated && activePlan !== 'genesis-plus') {
      setCheckedPlan('genesis-plus');
      setPaymentStep(1);
    }

    router.push(
      userIsAuthenticated
        ? routes.account.membership.getRedirectPath()
        : `${routes.signup.getRedirectPath()}?redirect=membership`,
    );
  }
  return (
    <div className="grid max-w-screen-sm gap-12 px-4 py-16 lg:max-w-screen-xl lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
      <div className="flex flex-col gap-8 lg:gap-10 lg:py-20 lg:pr-8 xl:pl-16">
        <div className="flex flex-col gap-8">
          <h2 className="text-display-md font-semibold tracking-tight text-gray-900 lg:text-display-lg">
            {data.title}
          </h2>
          <ul className="m-0 flex flex-col gap-4 p-0 lg:gap-5 lg:pl-4">
            {data.benefitsList.map((item) => (
              <li key={item} className="flex gap-3 font-rubik text-md text-gray-600 lg:text-lg">
                <CheckRoundedIcon className="size-7" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6 pt-2">
            <p className="text-nowrap text-display-lg font-semibold tracking-tight text-gray-900">$ {data.price}</p>
            <div className="-mt-1">
              <div className="text-xl font-semibold text-gray-900/60 line-through">{data.periodCrossed}</div>
              <p className="-mt-1 text-nowrap text-display-xs font-semibold text-gray-900">{data.period}</p>
            </div>
          </div>
          <div className="text-md font-semibold text-gray-500 lg:text-xl">
            <Markdown
              components={{
                strong: ({ children }) => <span className="text-xl font-bold text-gray-900">{children}</span>,
              }}
            >
              {data.description}
            </Markdown>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:items-center lg:gap-3">
          <Button size="xl" color="primary" content={data.buttonText} animate onClick={handleButtonClick} />
          <div className="self-center">
            <Badge size="lg" color="warning" content={`${offers?.['genesis-plus'].remaining ?? 0} OFFERS LEFT`} />
          </div>
        </div>
      </div>
      <div className="h-[680px] overflow-hidden rounded-4 lg:h-full lg:min-h-[720px]">
        <div className="relative h-full overflow-hidden rounded-4">
          <Slider items={data.sliderItems} />
        </div>
      </div>
    </div>
  );
}
