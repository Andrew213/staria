'use client';

import { useMembership } from '@/core/providers/MembershipProvider';

import { InitialState } from './components/InitialState';
import { UpgradePlan } from './components/UpgradePlan';

export default function Memberships() {
  const { paymentStep } = useMembership();

  return (
    <>
      <div className="w-full bg-gray-100 lg:px-6">
        {!paymentStep && <InitialState />}
        {paymentStep && <UpgradePlan />}
      </div>
    </>
  );
}
