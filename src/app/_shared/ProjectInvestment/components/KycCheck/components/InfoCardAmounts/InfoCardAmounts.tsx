import { isNumber } from '@/types/common';
import { toAmountInUSD } from '@/utils/amount';

import { data } from './constants';

interface Props {
  depositLimit: number | string;
  showDocumentNeeded?: boolean;
}

export function InfoCardAmounts({ depositLimit, showDocumentNeeded }: Props) {
  return (
    <div className="mt-4 flex flex-col gap-2 text-sm font-medium text-gray-600 dark:text-gray-blue-100">
      <div className="flex items-center justify-between">
        <div>{data.depositLimit}</div>
        <div>{isNumber(depositLimit) ? toAmountInUSD(depositLimit) : depositLimit}</div>
      </div>
      {showDocumentNeeded && (
        <div className="flex items-center justify-between">
          <div>{data.documentNeeded}</div>
          <div>{data.proofOfAddress}</div>
        </div>
      )}
    </div>
  );
}
