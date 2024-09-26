import type { Metadata } from 'next';

import Dashboard from './Dashboard';

export const metadata: Metadata = {
  robots: { index: false },
};

export default function Page() {
  return <Dashboard />;
}
