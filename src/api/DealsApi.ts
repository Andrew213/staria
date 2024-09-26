import { env } from '@/app/_shared/constants';
import type { DealShortInfo, Deal } from '@/app/_shared/types';

class DealsApi {
  public async fetchDeals() {
    try {
      const response = await fetch(`${env.apiUrl}/deal/all`);

      if (response.ok) {
        return {
          data: (await response.json()) as DealShortInfo[],
        };
      }

      throw new Error();
    } catch {
      return {
        error: 'An error happened while fetching deals',
      };
    }
  }

  public async fetchDeal(name: string, round: string) {
    try {
      const response = await fetch(`${env.apiUrl}/deal/${name}/${round}`);

      if (response.ok) {
        return (await response.json()) as Deal;
      }

      throw new Error('An error happened while fetching deal');
    } catch (error) {
      console.error(error);
    }
  }
}

export default new DealsApi();
