import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { useMembership } from '@/core/providers/MembershipProvider';
import { referralStorage } from '@/core/ReferralStorage/ReferralStorage';
import { fetchUserBillingHistory } from '@/redux/billingHistorySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOffers } from '@/redux/offersSlice';
import { selectActiveSubscription } from '@/redux/userSlice';

import { HistoryTable } from './HistoryTable';
import { PlanCard } from './PlanCard';
import { data, plansData } from '../constants';

export function InitialState() {
  const { setPaymentStep, setCheckedPlan } = useMembership();

  const dispatch = useAppDispatch();
  const { billingHistory } = useAppSelector((state) => state.billingHistory);
  const { offers } = useAppSelector((state) => state.offers);
  const [showDiscountSticker, setShowDiscountSticker] = useState(false);
  const referralCode = referralStorage.getItem('referralCode');
  const storageExpiryDate = referralStorage.getItem('expiry');
  const now = dayjs();
  const session = useSession();

  useEffect(() => {
    if (!referralCode) {
      setShowDiscountSticker(false);
      return;
    }
    if (referralCode && !now.isAfter(dayjs(storageExpiryDate))) {
      if (
        session.status === 'unauthenticated' ||
        (session.status === 'authenticated' && activeSubscription === 'basic')
      ) {
        setShowDiscountSticker(true);
      }
    }
  }, [now, referralCode, storageExpiryDate, session]);

  useEffect(() => {
    void dispatch(fetchUserBillingHistory());
  }, [dispatch]);

  useEffect(() => {
    void dispatch(fetchOffers());
  }, [dispatch]);

  const activeSubscription = useAppSelector(selectActiveSubscription);

  return (
    <>
      <div className="flex flex-col pb-10 lg:gap-1 lg:pb-8">
        <h1 className="text-left text-display-xs font-semibold text-gray-900 lg:text-display-sm">{data.title}</h1>
        <p className="font-rubik text-md text-gray-600">{data.description}</p>
      </div>

      <div className="flex flex-col gap-3 lg:ml-4">
        {plansData.map((plan) => (
          <PlanCard
            key={plan.title}
            activePlan={activeSubscription}
            isChecked={activeSubscription === plan.id}
            onClick={(id) => setCheckedPlan(id)}
            onUpgradeClick={() => setPaymentStep(1)}
            {...plan}
            offersCount={offers?.[plan.id as 'genesis']?.remaining ?? 0}
            isActive={plan.id === activeSubscription}
            showDiscountSticker={!!showDiscountSticker && plan.id !== 'basic' && activeSubscription === 'basic'}
          />
        ))}
      </div>
      {!!billingHistory.length && (
        <div className="pt-8">
          <h3 className="pb-6 text-lg font-semibold text-gray-900">{data.billing.title}</h3>
          <HistoryTable data={billingHistory} />
        </div>
      )}
    </>
  );
}
