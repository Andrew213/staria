'use client';

import type { Dispatch } from '@reduxjs/toolkit';

import { userApi } from '@/api/UserApi';
import { setUser } from '@/redux/userSlice';

export const getAndSaveUser = async (disp: Dispatch, token: string) => {
  try {
    const user = await userApi.getMe(token);
    if (user) {
      disp(setUser(user));
    }

    return user;
  } catch (err) {
    console.log(`err in getAndSaveUser `, err);
  }
};
