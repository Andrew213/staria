import { configureStore } from '@reduxjs/toolkit';

import billingHistorySlice from './billingHistorySlice';
import offersSlice from './offersSlice';
import userSlice from './userSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      offers: offersSlice.reducer,
      billingHistory: billingHistorySlice.reducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
