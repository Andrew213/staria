import { getSession } from 'next-auth/react';
import type { Address } from 'viem';

import { env } from '@/app/_shared/constants';
import type { Community, DealShortInfo, Deal, CommunityPost } from '@/app/_shared/types';
import { auth } from '@/auth';

class CommunityApi {
  async createOrEditCommunity(data: CommunityPost, communityName?: string) {
    try {
      const session = await getSession();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (session?.sessionToken) {
        headers.Authorization = `Bearer ${session.sessionToken}`;
      }
      const response = await fetch(`${env.apiUrl}/community${communityName ? `/${communityName}` : ''}`, {
        method: communityName ? 'PATCH' : 'POST',
        headers,
        body: JSON.stringify(data),
        cache: 'no-store',
      });

      if (response.ok) {
        return (await response.json()) as Community;
      }

      throw new Error(`An error happened while creating community`);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchCommunity(communityName: string, client?: boolean) {
    try {
      const session = client ? await getSession() : await auth();
      const response = await fetch(`${env.apiUrl}/community/${communityName}`, {
        cache: 'no-store',
        headers: session?.sessionToken ? { Authorization: `Bearer ${session.sessionToken}` } : undefined,
      });

      if (response.ok) {
        return (await response.json()) as Community;
      }

      throw new Error(`An error happened while fetching ${communityName} community`);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchDeals(communityName: string) {
    try {
      const session = await auth();
      const response = await fetch(`${env.apiUrl}/deal/community/${communityName}`, {
        headers: session?.sessionToken ? { Authorization: `Bearer ${session.sessionToken}` } : undefined,
      });

      if (response.ok) {
        return {
          data: (await response.json()) as DealShortInfo[],
        };
      }

      throw new Error();
    } catch {
      return {
        error: `An error happened while fetching ${communityName}'s deals`,
      };
    }
  }

  async fetchDeal(communityName: string, name: string, round: string) {
    try {
      const session = await auth();
      const response = await fetch(`${env.apiUrl}/deal/community/${communityName}/${name}/${round}`, {
        headers: session?.sessionToken ? { Authorization: `Bearer ${session.sessionToken}` } : undefined,
      });

      if (response.ok) {
        return (await response.json()) as Deal;
      }

      throw new Error(`An error happened while fetching ${communityName}'s ${name} deal`);
    } catch (error) {
      console.error(error);
    }
  }

  async changeImages(data: FormData, communityName?: string) {
    try {
      const session = await getSession();

      const response = await fetch(`${env.apiUrl}/community/image/${communityName}`, {
        method: 'PATCH',
        headers: session?.sessionToken ? { Authorization: `Bearer ${session.sessionToken}` } : undefined,
        body: data,
      });
      if (response.ok) {
        return (await response.json()) as Community;
      }
      throw new Error(`An error happened while changing images of community`);
    } catch (err) {
      console.error(err);
    }
  }

  async getOrEditWhitelist(type: 'wallet' | 'email', file?: FormData, communityName?: string) {
    try {
      const session = file ? await getSession() : await auth();
      console.log(`session`, session);
      const response = await fetch(`${env.apiUrl}/community/whitelist/${communityName}/${type}`, {
        method: file ? 'PATCH' : 'GET',
        headers: session?.sessionToken ? { Authorization: `Bearer ${session.sessionToken}` } : undefined,
        body: file,
      });
      if (response.ok) {
        return response;
      }
      console.log(`response `, response);
      throw new Error(`An error happened while changing whitelist of community`);
    } catch (err) {
      console.error(err);
    }
  }

  async checkIfTheWalletIsWhitelisted(communityName: string, wallet: Address) {
    try {
      const session = await getSession();
      const response = await fetch(`${env.apiUrl}/community/whitelist/${communityName}/${wallet}`, {
        headers: session?.sessionToken ? { Authorization: `Bearer ${session.sessionToken}` } : undefined,
      });

      if (response.ok) {
        return true;
      }

      if (response.status === 404) {
        return false;
      }

      throw new Error(`An error happened while checking if the ${wallet} address is whitelisted in ${communityName}`);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new CommunityApi();
