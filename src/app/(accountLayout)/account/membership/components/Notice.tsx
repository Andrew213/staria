import { useRef, useState } from 'react';
import Markdown from 'react-markdown';

import { ArrowLeftIcon, InfoCircleIcon } from '@/assets/icons';
import { useMembership } from '@/core/providers/MembershipProvider';
import { Button, Checkbox } from '@/lib/components';

import { data } from '../constants';

export function Notice() {
  const { setPaymentStep } = useMembership();
  const [checked, setChecked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  return (
    <>
      <div>
        <div className="flex size-14 items-center justify-center rounded-full border-8 border-error-50 bg-error-100 text-error-600">
          <InfoCircleIcon />
        </div>

        <h2 className="pt-3 text-display-xs font-semibold text-gray-900 lg:pt-3 lg:text-display-xs">
          {data.upgradePlan.notice.title}
        </h2>
        <p className="pt-1 font-rubik text-sm text-gray-600 lg:pt-1 lg:text-md">
          {data.upgradePlan.notice.description}
        </p>
        <p className="pt-10 text-sm font-semibold text-gray-800 lg:pt-4 lg:text-md">
          {data.upgradePlan.notice.confirmText}
        </p>
      </div>

      <div className="relative mt-4 h-[344px] overflow-hidden lg:mt-6 lg:h-[333px]">
        <div
          ref={scrollRef}
          className="scrollbar-hidden h-[344px] overflow-auto scroll-smooth rounded-2 border border-gray-300 px-3.5 pb-6 pt-3 lg:h-[333px] lg:py-3"
        >
          <button
            onClick={scrollToBottom}
            className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-primary-500"
          >
            <div className="size-4 -rotate-90 text-white">
              <ArrowLeftIcon />
            </div>
          </button>

          <div className="mb-6 text-md font-semibold text-gray-800 lg:mb-2 lg:text-md">
            <Markdown
              components={{
                ul: ({ children }) => <ul className="m-0 list-disc pl-6">{children}</ul>,
                li: ({ children }) => <li className="m-0 p-0">{children}</li>,
              }}
            >
              {data.upgradePlan.notice.content}
            </Markdown>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              size="md"
              inputProps={{
                checked,
                onChange: () => {
                  setChecked(!checked);
                },
              }}
            />
            <p className="text-sm font-medium text-gray-700 lg:text-md">{data.upgradePlan.notice.agreeText}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-5 lg:pt-8">
        <Button
          onClick={() => setPaymentStep(null)}
          size="lg"
          color="secondary-gray"
          content={data.upgradePlan.notice.cancelButton}
        />
        <Button
          onClick={() => setPaymentStep(2)}
          disabled={!checked}
          size="lg"
          color="primary"
          content={data.upgradePlan.notice.nextButton}
        />
      </div>
    </>
  );
}
