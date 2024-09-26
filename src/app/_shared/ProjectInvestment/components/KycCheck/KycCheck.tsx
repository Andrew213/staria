import { Synaps } from '@synaps-io/verify-sdk';
import { useState } from 'react';

import { userApi } from '@/api/UserApi';
import { InfoCardProgress } from '@/app/_shared';
import { CheckCircleIcon, XCircle } from '@/assets/icons';
import { useAppSelector } from '@/redux/hooks';

import { InfoCard, InfoCardAmounts } from './components';
import { data, dataInfo, renderSubText } from './constatnts';
import type { ActiveStepIndex as InvestmentActiveStepIndex } from '../../types';

interface Props {
  setInvestmentActiveStepIndex: React.Dispatch<React.SetStateAction<InvestmentActiveStepIndex>>;
  total?: number;
}

// TODO Total default value is just for testing, unmock it
export function KycCheck({ total = 1000, setInvestmentActiveStepIndex }: Props) {
  const user = useAppSelector((store) => store.user);
  const invested = user.sumInvested ?? 0;

  const [isSynaps, setSynaps] = useState(false);
  const handleOnClick = async () => {
    const response = await userApi.getVerify();

    if (response?.sessionId) {
      setSynaps(true);

      setTimeout(() => {
        Synaps.init({
          sessionId: response.sessionId,
          mode: 'embed',
          containerId: 'kyc-container',
          onFinish: () => {
            //alert('Verification finished');
          },
        });

        Synaps.show();
      }, 1000);
    }
  };

  const handleContinueClick = () => {
    setInvestmentActiveStepIndex(3);
  };

  if (user.verification.currentLevel && total) {
    const progress = (invested / total) * 100;
    const isError = progress >= 100;
    return (
      <InfoCard title={data.title} onClick={handleContinueClick}>
        <div className="mb-6 flex flex-col gap-3 lg:items-center">
          <div
            className={`flex size-12 items-center justify-center rounded-full border-8 ${isError ? 'border-error-50 dark:border-error-200' : 'border-success-50 dark:border-success-200'} ${isError ? 'bg-error-100 dark:bg-error-600' : 'bg-success-100 dark:bg-success-500'} ${isError ? 'text-error-600 dark:text-error-25' : 'text-success-600 dark:text-success-25'}`}
          >
            {isError ? <XCircle /> : <CheckCircleIcon className="size-6" />}
          </div>
          <p className="max-w-[300px] text-xl font-semibold text-gray-900 lg:text-center lg:text-display-sm dark:text-white">
            {isError ? dataInfo.errorText : dataInfo.successText}
          </p>
          <p className="font-rubik text-sm font-normal text-gray-600 lg:text-center dark:text-gray-blue-100">
            {renderSubText(isError, total - invested)}
          </p>
        </div>
        <InfoCardProgress invested={invested} total={total} />
        <InfoCardAmounts depositLimit={total} showDocumentNeeded={isError} />
      </InfoCard>
    );
  }

  return !isSynaps ? (
    <InfoCard titleWithoutBorder title={data.title} onClick={() => void handleOnClick()}>
      <p className="mb-4 text-xl font-semibold text-gray-900 lg:text-display-xs dark:text-white">{data.text}</p>
      <div className="lg:pl-4">
        <p className="mb-3 text-xl font-semibold text-gray-600 dark:text-gray-blue-100">{data.subtext}</p>
        <ul>
          {data.list.map((el, index) => (
            <li
              className="relative ml-2.5 pl-2.5 font-rubik text-md font-normal text-gray-600 before:absolute before:left-0 before:top-[50%] before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-gray-600 before:content-[''] dark:text-gray-blue-100 dark:before:bg-gray-blue-100"
              key={index}
            >
              {el.title}
            </li>
          ))}
        </ul>
      </div>
    </InfoCard>
  ) : (
    <div className="shadow-depth/4 flex h-[850px] flex-col gap-8 rounded-5 p-4 lg:p-8">
      <div id="kyc-container" className="h-[850px]" />
    </div>
  );
}
