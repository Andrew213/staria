import type { Metadata } from 'next';

import { SuccessPageInner } from './_components';

export const metadata: Metadata = {
  robots: { index: false },
};

export default function Page() {
  return <SuccessPageInner />;
}
