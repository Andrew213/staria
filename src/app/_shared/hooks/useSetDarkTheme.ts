'use client';

import { useEffect } from 'react';

export default function useSetDarkTheme(enabled = true) {
  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark');

      return () => {
        document.documentElement.classList.remove('dark');
      };
    }
  }, []);
}
