'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState, useRef } from 'react';

import { AuthApi } from '@/api/AuthApi';
import { EmailVerifiedView } from '@/features/auth';
import { Loading } from '@/lib/components';
import { routes } from '@/routes';

const api = new AuthApi();

export default function VerifyEmail() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmailInner />
    </Suspense>
  );
}

const VerifyEmailInner = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const flag = useRef(true);
  const router = useRouter();
  useEffect(() => {
    if (flag.current) {
      const verifyToken = searchParams.get('token');
      if (verifyToken) {
        const verify = async () => {
          try {
            setLoading(true);
            const response = await api.verify({ verifyToken });
            if (response === 200) {
              setLoading(false);
            }
          } catch (err) {
            router.push(routes.signin.getRedirectPath());
          }
        };
        void verify();
        flag.current = false;
      }
    }
  }, [searchParams, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-full flex-col items-center px-4 py-[112px] lg:py-40">
      <EmailVerifiedView />
    </div>
  );
};
