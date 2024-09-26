import { LayoutProvider } from '@/core/providers';

import { AccountContent } from '../_shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <AccountContent type="account">{children}</AccountContent>
    </LayoutProvider>
  );
}
