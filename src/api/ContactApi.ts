import { CONTACT_US_ENDPOINT } from '@/env';

import type { PostContactOptions, PostContactResponse, PostContactResponseSuccessful } from './types';

export const contactApi = {
  sendMessage: async (options: PostContactOptions): Promise<PostContactResponse | undefined> => {
    try {
      const response = await fetch(CONTACT_US_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(options),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return response.json() as Promise<PostContactResponseSuccessful>;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  },
};
