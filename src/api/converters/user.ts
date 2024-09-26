import type { BillingHistory } from '@/types';

import type { BillingHistoryResponse } from '../types';

export const convertBillingHistory = (history: BillingHistoryResponse): BillingHistory => {
  return history.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
    subscription: {
      ...item.subscription,
      createdAt: new Date(item.subscription.createdAt),
    },
  }));
};
