export { auth as default } from './auth';

export const config = {
  matcher: ['/admin/:path*', '/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
