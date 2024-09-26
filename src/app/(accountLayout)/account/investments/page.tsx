import type { Metadata } from 'next';

import Investments from './Investments';

export const metadata: Metadata = {
  robots: { index: false },
};

export default function Page() {
  return <Investments />;
}
