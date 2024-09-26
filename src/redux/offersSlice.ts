import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from '@/api/UserApi';
import type { OffersData } from '@/types';

export const fetchOffers = createAsyncThunk('user/fetchOffers', async () => {
  const response = await userApi.getOffersData();
  return response!;
});

const initialState: {
  offers: OffersData | null;
  loading: boolean;
  error: null | string | undefined;
} = {
  offers: null,
  loading: true,
  error: null,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default offersSlice;
