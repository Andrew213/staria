import type { Metadata } from 'next';

import NoSsr from '@/core/NoSsr/NoSsr';

import { FailModal } from '../components/FailModal';
import { UpgradeContainer } from '../components/UpgradeContainer';

export const metadata: Metadata = {
  robots: { index: false },
};

export default function CancelPage() {
  return (
    <NoSsr>
      <UpgradeContainer activeStep={3}>
        <div className="flex w-full items-center justify-center pb-32 pt-6 lg:pt-20">
          <FailModal />
        </div>
      </UpgradeContainer>
    </NoSsr>
  );
}
