'use client';

import { useSetDarkTheme } from '@/app/_shared/hooks';

export default function Layout({ children }: { children: React.ReactNode }) {
  useSetDarkTheme();

  return children;
}
