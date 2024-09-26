'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';

import { Logo } from '@/assets/icons';
import { ResetPasswordSuccess, SetNewPasswordForm } from '@/features/auth';
import { Loading } from '@/lib/components';

import { data } from './constants';

const { title, description } = data;

export default function ResetPassword() {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const onSubmitSuccess = () => {
    setIsSubmitSuccess(true);
  };

  return (
    <div className="flex h-full flex-col items-center px-4 pt-12 xl:pt-40">
      {isSubmitSuccess ? (
        <ResetPasswordSuccess />
      ) : (
        <div className="flex max-w-[360px] flex-col items-center">
          <Link href="/">
            <Logo className="w-[141px] text-gray-800 lg:w-[207px]" />
          </Link>
          <div className="mb-8 mt-6 flex flex-col gap-2 text-center">
            <h1 className="text-display-xs font-semibold text-gray-900">{title}</h1>
            <p className="font-rubik text-md font-normal text-gray-600">{description}</p>
          </div>
          <Suspense fallback={<Loading />}>
            <SetNewPasswordForm onSubmit={onSubmitSuccess} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
