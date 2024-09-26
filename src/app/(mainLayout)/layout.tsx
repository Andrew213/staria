import { LayoutProvider } from '@/core/providers';

import { Footer, GetNotified } from '../_components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <main className="shrink-0 grow basis-auto">{children}</main>
      <footer className="shrink-0 grow-0 basis-auto">
        <div className="dark:hidden">
          <GetNotified />
        </div>
        <Footer />
      </footer>
    </LayoutProvider>
  );
}
