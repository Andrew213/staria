import { useMembership } from '@/core/providers/MembershipProvider';

import { Notice } from './Notice';
import { PaymentMethod } from './PaymentMethod';
import { UpgradeContainer } from './UpgradeContainer';

export function UpgradePlan() {
  const { paymentStep } = useMembership();

  if (!paymentStep || paymentStep === 3) {
    return null;
  }

  return (
    <UpgradeContainer activeStep={paymentStep}>
      <div className="mt-8 rounded-3 border border-gray-200 bg-white px-4 py-5 shadow-home-hero lg:mt-6 lg:px-9 lg:py-6">
        {paymentStep === 1 && <Notice />}
        {paymentStep === 2 && <PaymentMethod />}
      </div>
    </UpgradeContainer>
  );
}
