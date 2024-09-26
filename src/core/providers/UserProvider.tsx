'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { userApi } from '@/api/UserApi';
import { setUser } from '@/redux/userSlice';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const session = useSession();
  useEffect(() => {
    const getUser = async (token: string) => {
      const user = await userApi.getMe(token);

      if (user) {
        dispatch(setUser(user));
      }
    };

    if (session.status === 'authenticated') {
      void getUser(session.data.sessionToken);
    }
  }, [session.status, dispatch]);

  return children;
};
