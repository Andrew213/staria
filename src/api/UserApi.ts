import { getSession } from 'next-auth/react';

import { env } from '@/app/_shared/constants';
import type { BillingHistory } from '@/types';

import { errorHandler } from './axios';
import { convertBillingHistory } from './converters/user';
import type { BillingHistoryResponse, OffersResponse, User, VerifyResponse, setNewPasswordRequest } from './types';

class UserApi {
  public async getMe(token: string) {
    try {
      const response = await fetch(`${env.apiUrl}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        return (await response.json()) as User;
      }
      throw new Error(`An error happened while fetching User`);
    } catch (error) {
      console.error(error);
    }
  }
  public async setNewPassword(data: setNewPasswordRequest) {
    try {
      const session = await getSession();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (session?.sessionToken) {
        headers.Authorization = `Bearer ${session.sessionToken}`;
      }

      await fetch(`${env.apiUrl}/user/password`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
      });
    } catch (err) {
      console.log(`err user setNewPassword`, err);

      errorHandler(err);
    }
  }

  public async editUser(data: Partial<User>) {
    try {
      const session = await getSession();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (session?.sessionToken) {
        headers.Authorization = `Bearer ${session.sessionToken}`;
      }

      const response = await fetch(`${env.apiUrl}/user/me`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
      });

      return response;
    } catch (err) {
      console.log(`err user`, err);
    }
  }

  public async getVerify() {
    try {
      const session = await getSession();
      const headers: HeadersInit = {};
      if (session?.sessionToken) {
        headers.Authorization = `Bearer ${session.sessionToken}`;
      }

      const response = await fetch(`${env.apiUrl}/user/verify`, {
        headers,
      }).then((res) => res.json() as Promise<VerifyResponse>);
      return response;
    } catch (err) {
      console.log(`err getVetify`, err);
    }
  }

  public async getPaymentLink(provider: string, plan: string) {
    try {
      const session = await getSession();
      const headers: HeadersInit = {};
      if (session?.sessionToken) {
        headers.Authorization = `Bearer ${session.sessionToken}`;
      }
      const response = await fetch(`${env.apiUrl}/billing/checkout/${plan}/${provider}`, { headers }).then(
        (resp) => resp.json() as Promise<{ url: string }>,
      );

      return response;
    } catch (err) {
      console.log(`err user`, err);
    }
  }

  public async getUserBillingHistory(): Promise<BillingHistory> {
    try {
      const session = await getSession();
      const headers: HeadersInit = {};
      if (session?.sessionToken) {
        headers.Authorization = `Bearer ${session.sessionToken}`;
      }
      const response = await fetch(`${env.apiUrl}/billing/me`, { headers }).then(
        (res) => res.json() as Promise<BillingHistoryResponse>,
      );

      return convertBillingHistory(response);
    } catch (err) {
      console.log(`err user`, err);
      throw new Error(err as string);
    }
  }

  // TODO maybe need another Api class for it
  public async getOffersData() {
    try {
      const session = await getSession();
      const headers: HeadersInit = {};
      if (session?.sessionToken) {
        headers.Authorization = `Bearer ${session.sessionToken}`;
      }
      const response = await fetch(`${env.apiUrl}/plan/status`, { headers }).then(
        (res) => res.json() as Promise<OffersResponse>,
      );
      return response;
    } catch (err) {
      console.log(`err user`, err);
    }
  }
}

export const userApi = new UserApi();
