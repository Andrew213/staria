'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { AuthWrapper } from '@/app/_shared';
import { useSetDarkTheme } from '@/app/_shared/hooks';
import { routes } from '@/routes';
import type { SignInErrors } from '@/types';

import { data } from './constants';
import { NoAccountView } from '../NoAccountView/NoAccountView';
import { SignInForm } from '../SignInForm/SignInForm';

const { title, subtitle, backgroundImage } = data;

export function SignInWrapper() {
  const [isAccountExists, setIsAccountExists] = useState(true);
  const [errorText, setErrorText] = useState<SignInErrors>('Unauthorized');

  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');
  const isRedirectFromCommunity = redirectParam?.startsWith(routes.community.getRoutePath());

  const onSuccess = (isAccExists: boolean) => {
    setIsAccountExists(isAccExists);
  };

  useSetDarkTheme(!!isRedirectFromCommunity);

  return isAccountExists ? (
    <AuthWrapper
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
      isShowBottomText
      isHideBgOnMobile
      marginBottomToCopyright="mb-[165px]"
    >
      <SignInForm setErrorText={setErrorText} onSuccess={onSuccess} />
    </AuthWrapper>
  ) : (
    <AuthWrapper backgroundImage="bg-reset-password" isShowBottomText isRoundedBg>
      <NoAccountView errorMessage={errorText} setState={setIsAccountExists} />
    </AuthWrapper>
  );
}
