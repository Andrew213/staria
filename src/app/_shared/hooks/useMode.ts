import { usePathname } from 'next/navigation';

import { routes } from '@/routes';

export default function useMode() {
  const pathname = usePathname();

  return pathname.startsWith(routes.community.getRoutePath()) ? 'dark' : 'light';
}
