import { infoCardData } from '@/app/(accountLayout)/account/settings/constants';
import { isNumber } from '@/types/common';
import { toAmountInUSD } from '@/utils/amount';

interface Props {
  depositLimit: number | string;
  withdrawLimit: number | string;
  showDocumentNeeded?: boolean;
}

export function InfoCardAmounts({ depositLimit, withdrawLimit, showDocumentNeeded }: Props) {
  return (
    <div className="flex flex-col gap-2 rounded-4 border border-gray-200 p-4 px-4 text-sm font-medium text-gray-600 lg:px-6 lg:py-4">
      <div className="flex items-center justify-between">
        <div>{infoCardData.depositLimit}</div>
        <div>{isNumber(depositLimit) ? toAmountInUSD(depositLimit) : depositLimit}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>{infoCardData.withdrawLimit}</div>
        <div>{isNumber(withdrawLimit) ? toAmountInUSD(withdrawLimit) : withdrawLimit}</div>
      </div>
      {showDocumentNeeded && (
        <div className="flex items-center justify-between">
          <div>{infoCardData.documentNeeded}</div>
          <div>{infoCardData.proofOfAddress}</div>
        </div>
      )}
    </div>
  );
}
