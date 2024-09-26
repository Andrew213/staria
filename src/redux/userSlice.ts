import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { User } from '@/api/types';

import type { RootState } from './store';

const initialState: User = {
  id: '',
  email: '',
  password: '',
  verifyToken: '',
  avatarUrl: null,
  accessToken: null,
  refreshToken: null,
  referralCode: '',
  referralCoupon: null,
  referralWallet: null,
  resetToken: null,
  refferals: 0,
  roles: [],
  premissions: ['all'],
  isVerified: false,
  legalType: '',
  createdAt: Date.now(),
  deletedAt: null,
  sumInvested: 0,
  communities: [],
  subscriptions: [],
  verification: {
    id: '',
    sessionId: '',
    stepper: {
      liveness: {
        status: 'SUBMISSION_REQUIRED',
        reason: null,
        isCompleted: false,
      },
      documentId: {
        status: 'SUBMISSION_REQUIRED',
        reason: null,
        isCompleted: false,
      },
      proofAddress: {
        status: 'SUBMISSION_REQUIRED',
        reason: null,
        isCompleted: false,
      },
    },
    currentStep: 'LIVENESS',
    currentLevel: 0,
    userId: '',
  },
  updatedAt: Date.now(),
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export const { setUser } = slice.actions;

export function selectActiveSubscription(state: RootState) {
  return state.user.subscriptions.findLast(({ isActive }) => isActive)?.plan;
}

export function selectIsUserManager(state: RootState) {
  return !!state.user.roles.includes('manager');
}

export function selectManagedCommunitySlug(state: RootState) {
  return state.user.communities.find((el) => el.role === 'manager')?.community.slug;
}

export function selectUserIsTheMemberOfTheCommunity(communityName: string) {
  return function (state: RootState) {
    return !!state.user.communities.find(({ community }) => community.slug === communityName);
  };
}

export default slice;
