import { api, errorHandler } from './axios';
import type {
  RefreshResponse,
  ResetPasswordRequestPayload,
  SignInRequestPayload,
  SignInResponse,
  SignUpRequestPayload,
  User,
  VerifyRequestPayload,
} from './types';

export class AuthApi {
  public async signUp(payload: SignUpRequestPayload) {
    try {
      const response = await api.postData<User>('/auth/signup', payload);
      return response.status;
    } catch (err) {
      errorHandler(err);
    }
  }
  public async verify(verifyToken: VerifyRequestPayload) {
    try {
      const response = await api.postData('/auth/verify', verifyToken);
      return response.status;
    } catch (err) {
      errorHandler(err);
    }
  }

  public async signIn(data: SignInRequestPayload) {
    try {
      const response = await api.postData<SignInResponse>('/auth/signin', data);

      return response.data;
    } catch (err) {
      console.log(`errr `, err);
      errorHandler(err);
    }
  }

  public async refresh(refreshToken: string) {
    try {
      const response = await api.postData<RefreshResponse>('/auth/refresh', {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      errorHandler(error);
    }
  }
  public async requestPassword(email: string) {
    try {
      const response = await api.postData('/auth/request', { email });
      return response.status;
    } catch (error) {
      errorHandler(error);
    }
  }
  public async resetPassword(data: ResetPasswordRequestPayload) {
    try {
      const response = await api.postData('/auth/reset', data);
      return response.status;
    } catch (error) {
      errorHandler(error);
    }
  }
}
