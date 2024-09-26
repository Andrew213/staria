'use client';

import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { referralStorage } from '@/core/ReferralStorage/ReferralStorage';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOffers } from '@/redux/offersSlice';
import { selectActiveSubscription } from '@/redux/userSlice';

import { PlanCard } from './components/PlanCard';
import { plansData } from './constants';

export function Plans() {
  const dispatch = useAppDispatch();
  const { offers } = useAppSelector((state) => state.offers);

  const referralCode = referralStorage.getItem('referralCode');
  const [showDiscountSticker, setShowDiscountSticker] = useState(false);
  const storageExpiryDate = referralStorage.getItem('expiry');
  const now = dayjs();
  const activePlan = useAppSelector(selectActiveSubscription);
  const session = useSession();

  useEffect(() => {
    if (!referralCode) {
      setShowDiscountSticker(false);
      return;
    }
    if (referralCode && !now.isAfter(dayjs(storageExpiryDate))) {
      if (session.status === 'unauthenticated' || (session.status === 'authenticated' && activePlan === 'basic')) {
        setShowDiscountSticker(true);
      }
    }
  }, [now, referralCode, storageExpiryDate]);

  useEffect(() => {
    void dispatch(fetchOffers());
  }, [dispatch]);

  const plans = plansData.plans.map((plan) => ({
    ...plan,
    topTitle: plan.topTitle
      ? {
          ...plan.topTitle,
          text: `${offers?.[plan.id as 'genesis' | 'genesis-plus']?.remaining ?? 0} OFFERS LEFT`,
        }
      : undefined,
  }));

  return (
    <div className="flex max-w-screen-xl flex-col items-center px-4 py-16 lg:px-8 lg:pb-24 lg:pt-0">
      <div className="flex max-w-[960px] flex-col items-center gap-4 pb-10 lg:gap-6 lg:py-24">
        <h2 className="text-left text-display-md font-semibold tracking-tight text-gray-900 lg:text-center lg:text-display-lg">
          {plansData.title}
        </h2>
        <p className="max-w-screen-md text-left font-rubik text-lg text-gray-600 lg:text-center lg:text-xl">
          {plansData.description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-12 xl:grid-cols-3 xl:gap-8">
        {plans.map((props, i) => (
          <PlanCard key={i} {...props} showDiscountSticker={showDiscountSticker} />
        ))}
      </div>
    </div>
  );
}
