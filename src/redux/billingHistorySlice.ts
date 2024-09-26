import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from '@/api/UserApi';
import type { BillingHistory } from '@/types';

export const fetchUserBillingHistory = createAsyncThunk('user/fetchBillingHistory', async () => {
  const response = await userApi.getUserBillingHistory();
  return response;
});

const initialState: {
  billingHistory: BillingHistory;
  loading: boolean;
  error: null | string | undefined;
} = {
  billingHistory: [],
  loading: false,
  error: null,
};

const billingHistorySlice = createSlice({
  name: 'billingHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBillingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBillingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.billingHistory = action.payload;
      })
      .addCase(fetchUserBillingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default billingHistorySlice;
