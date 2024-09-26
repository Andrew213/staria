import type { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { AuthApi } from './api/AuthApi';
import type { JWTDecode, User as UserType } from './api/types';
import { protectedRoutes, routes, unProtectedRoutes } from './routes';

const api = new AuthApi();

class CustomError extends AuthError {
  code = 'custom';
  constructor(message: string, errorOptions?: Record<string, unknown>) {
    super(message, errorOptions);
    this.message = message;
  }
}

declare module 'next-auth' {
  interface Session {
    sessionToken: string;
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // @ts-expect-error remove later
      async authorize(credentials) {
        try {
          const NextResponse = await api.signIn({
            email: credentials.email as string,
            password: credentials.password as string,
          });
          if (NextResponse?.accessToken) {
            const decoded = jwtDecode(NextResponse.accessToken);
            return {
              ...decoded,
              expiresIn: Date.now() + NextResponse.expiresIn * 1000,
              refreshToken: NextResponse.refreshToken,
              accessToken: NextResponse.accessToken,
            };
          }
          return null;
        } catch (err: unknown) {
          const axiosError = err as AxiosError<{ message: string }>;
          throw new CustomError(axiosError.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      const userFromBack = user as JWTDecode;

      if (user && account) {
        token.expiresIn = userFromBack.expiresIn;
        token.email = userFromBack.email;
        token.refreshToken = userFromBack.refreshToken;
        token.accessToken = userFromBack.accessToken;
        return token;
      }

      if (Date.now() < (token.expiresIn as number)) {
        return token;
      }
      await signOut();
      return null;
    },
    session({ session, token }) {
      if (token) {
        session.sessionToken = token.accessToken as string;
      }

      return session;
    },
    async authorized({ request, auth }) {
      const clonedPathName = request.nextUrl.clone().pathname;
      const isProtectedRoute = protectedRoutes.some((prefix) => clonedPathName.startsWith(prefix));
      const redirectUrl = request.nextUrl.searchParams.get('redirect');
      const isRedirectFromProtectedRoute =
        redirectUrl && protectedRoutes.some((route) => redirectUrl.startsWith(route));
      if (auth) {
        const protectedManagerRoutes = [
          '/community/new',
          '/community/dashboard',
          '/community/manage',
          '/community/deals',
        ];

        if (protectedManagerRoutes.some((el) => clonedPathName.startsWith(el))) {
          const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
            headers: { Authorization: `Bearer ${auth?.sessionToken}` },
          }).then((res) => res.json() as Promise<UserType>);
          const isUsermanager = user.roles.includes('manager');
          const userManagedCommunity = user.communities.find((el) => el.role === 'manager');

          const getSlugFromUrl = clonedPathName.split('/')[3];
          if (userManagedCommunity && clonedPathName === '/community/new') {
            return NextResponse.redirect(new URL('/not-found', request.url));
          }
          if (
            (!userManagedCommunity && !isUsermanager) ||
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            (getSlugFromUrl && userManagedCommunity && userManagedCommunity.community.slug !== getSlugFromUrl) ||
            (getSlugFromUrl && !userManagedCommunity)
          ) {
            return NextResponse.redirect(new URL('/not-found', request.url));
          }
        }
      }

      if (!auth && isProtectedRoute) {
        const prevPageUrl = request.nextUrl.pathname + request.nextUrl.search;
        const absoluteURL = new URL(routes.signin.getRedirectPath(), request.nextUrl.origin);
        absoluteURL.searchParams.set('redirect', prevPageUrl);

        return NextResponse.redirect(absoluteURL.toString());
      }

      if (auth && isRedirectFromProtectedRoute) {
        return NextResponse.redirect(new URL(redirectUrl, request.nextUrl.origin).toString());
      }

      if (auth && unProtectedRoutes.includes(request.nextUrl.pathname)) {
        const redirectAfterLogin = request.nextUrl.searchParams.get('redirect');
        if (redirectAfterLogin === 'membership') {
          const absoluteURL = new URL(routes.account.membership.getRedirectPath(), request.nextUrl.origin);
          return NextResponse.redirect(absoluteURL.toString());
        }

        const absoluteURL = new URL('/', request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
      }
      return NextResponse.next();
    },
  },
});
