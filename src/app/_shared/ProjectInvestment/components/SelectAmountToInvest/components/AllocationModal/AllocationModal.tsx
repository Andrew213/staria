import { useState } from 'react';

import { Modal } from '@/app/_shared';
import { CloseIcon } from '@/assets/icons';
import { Button } from '@/lib/components';

import { Step } from './components/Step/Step';
import { data } from './constants';

interface Props {
  amountToInvest: bigint;
}

export function AllocationModal({ amountToInvest }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    isOpen && (
      <Modal onClose={() => setIsOpen(false)}>
        <div className="max-w-[448px] rounded-5 bg-white px-6 py-8 shadow-depth-4 dark:bg-midnight">
          <div className="mb-8 flex items-start">
            <p className="max-w-[366px] text-display-sm font-semibold text-gray-800 dark:text-gray-blue-25">
              {data.title}
            </p>
            <Button
              onClick={() => setIsOpen(false)}
              className="p-2.5"
              size="xs"
              color="transparent"
              icon={<CloseIcon className="size-6 dark:text-gray-blue-200" />}
            />
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-md font-semibold dark:text-gray-blue-25">{`You are about to participate in the sales sending ${amountToInvest} USDC from your wallet.`}</p>
              <p className="mt-1 font-rubik text-sm font-normal text-gray-500 dark:text-gray-blue-200">
                {data.subtext}
              </p>
            </div>
            {data.steps.map((props, index) => (
              <Step key={index} {...props} />
            ))}
          </div>
        </div>
      </Modal>
    )
  );
}
