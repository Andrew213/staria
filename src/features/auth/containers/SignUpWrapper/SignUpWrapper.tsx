'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { AuthWrapper } from '@/app/_shared';
import { useSetDarkTheme } from '@/app/_shared/hooks';
import { routes } from '@/routes';

import { data } from './constants';
import { AlreadyHaveAccountView } from '../AlreadyHaveAccountView/AlreadyHaveAccountView';
import { CheckEmailNotification } from '../CheckEmail/CheckEmailNotification/CheckEmailNotification';
import { SignUpForm } from '../SignUpForm/SignUpForm';

const { title, subtitle, backgroundImage } = data;

export function SignUpWrapper() {
  const [email, setEmail] = useState<{
    type: string;
    value?: { email: string; password: string };
  } | null>();

  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');
  const isRedirectFromCommunity = redirectParam?.startsWith(routes.community.getRoutePath());

  useSetDarkTheme(!!isRedirectFromCommunity);

  if (email?.type === 'exists') {
    return (
      <AuthWrapper
        backgroundImage="bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/hologram-of-kids-desktop.png)]"
        isShowBottomText
        isRoundedBg
      >
        <AlreadyHaveAccountView setSignUpState={setEmail} />
      </AuthWrapper>
    );
  }

  if (email?.type === 'new') {
    return (
      <AuthWrapper
        backgroundImage="bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/hologram-of-kids-desktop.png)]"
        isShowBottomText
        isRoundedBg
      >
        <CheckEmailNotification email={email.value?.email} password={email.value?.password} />
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
      isShowBottomText
      isHideBgOnMobile
      marginBottomToCopyright="lg:mb-[72px]"
    >
      <SignUpForm onSubmit={(isEmail) => setEmail(isEmail)} />
    </AuthWrapper>
  );
}
