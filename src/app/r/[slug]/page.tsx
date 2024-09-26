'use client';

import dayjs from 'dayjs';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { referralStorage } from '@/core/ReferralStorage/ReferralStorage';
import { Loading } from '@/lib/components';

export default function Page() {
  const router = usePathname();

  useEffect(() => {
    const referralCode = router.split('/').pop();
    const referralCodeFromStorage = referralStorage.getItem('referralCode');
    const storageExpiryDate = referralStorage.getItem('expiry');

    const now = dayjs();

    if (!referralCode && now.isAfter(dayjs(storageExpiryDate))) {
      referralStorage.setItem('referralCode', null);
      referralStorage.setItem('expiry', null);
    }

    if ((referralCode && !referralCodeFromStorage) ?? now.isAfter(dayjs(storageExpiryDate))) {
      referralStorage.setItem('referralCode', referralCode);
      referralStorage.setItem('expiry', now.add(24, 'hour').valueOf());
    }

    redirect('/');
  }, [router]);
  return <Loading />;
}
