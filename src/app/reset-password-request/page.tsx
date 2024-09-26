'use client';

import { useState } from 'react';

import { CheckEmail, ResetPasswordForm } from '@/features/auth';

import { data } from './constants';
import { AuthWrapperSmall } from '../_shared';

const { title, subtitle } = data;

export default function ResetPassword() {
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  const [email, setEmail] = useState('');

  const onSuccess = (email: string, isSuccess: boolean) => {
    setEmail(email);
    setIsRequestSuccessful(isSuccess);
  };

  const notificationBgImage = isRequestSuccessful
    ? 'bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/success-email-background.png)]'
    : 'bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/reset-password-background.png)]';

  return (
    <>
      {email ? (
        <AuthWrapperSmall backgroundImage={notificationBgImage} isShowBottomText isHideLogoOnMobile>
          <CheckEmail email={email} isRequestSuccessful={isRequestSuccessful} />
        </AuthWrapperSmall>
      ) : (
        <AuthWrapperSmall backgroundImage="bg-reset-password" isShowBottomText>
          <ResetPasswordForm title={title} subtitle={subtitle} onSuccess={onSuccess} />
        </AuthWrapperSmall>
      )}
    </>
  );
}
