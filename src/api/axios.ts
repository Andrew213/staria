import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class AxiosApi {
  protected axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  public async getData<T>(endPoint: string) {
    try {
      const response = await this.axiosInstance.get<T>(endPoint);

      return response;
    } catch (er: unknown) {
      const error = er as AxiosError;
      if (error.response) {
        console.log('Server responded with status:', error.response.status);
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async postData<T>(endPoint: string, data?: Record<string, any>) {
    try {
      const response = await this.axiosInstance.post<T>(endPoint, data);

      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async patchData<T>(endPoint: string, data?: Record<string, any>) {
    try {
      const response = await this.axiosInstance.patch<T>(endPoint, data);

      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  public setInterceptors() {
    this.axiosInstance.interceptors.request.use(async (request) => {
      const session = await getSession();
      if (session && !request.headers.Authorization) {
        request.headers.Authorization = `Bearer ${session.sessionToken}`;
      }
      return request;
    });
  }
}

export interface ErrorT {
  path: string;
  method: string;
  code: number;
  message: string;
  time: string;
}

export const errorHandler = (error: unknown) => {
  const axiosError = error as AxiosError<ErrorT>;
  throw axiosError.response?.data;
};

export const api = new AxiosApi();
