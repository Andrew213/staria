import { SUBSCRIBE_ENDPOINT } from '@/env';

import type { SubscribeRequestOptions, SubscribeResponse } from './types';

export const subscribeApi = {
  sendSubscribeRequest: async (options: SubscribeRequestOptions): Promise<SubscribeResponse | undefined> => {
    try {
      const response = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(options),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return response.json() as Promise<SubscribeResponse>;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  },
};
