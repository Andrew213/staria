import { Synaps } from '@synaps-io/verify-sdk';

import { userApi } from '@/api/UserApi';
import { infoCardData } from '@/app/(accountLayout)/account/settings/constants';
import { InfoCardHeader } from '@/app/_shared';

import { InfoCardAmounts } from '.';

export function InfoCardBasic() {
  const handleOnClick = async () => {
    const response = await userApi.getVerify();

    if (response?.sessionId) {
      setTimeout(() => {
        Synaps.init({
          sessionId: response.sessionId,
          mode: 'modal',
          onFinish: () => {
            //alert('Verification finished');
          },
        });

        Synaps.show();
      }, 1000);
    }
  };

  return (
    <div className="shadow-depth/4 flex flex-col gap-4 rounded-5 bg-white p-4 lg:p-8">
      <InfoCardHeader />

      <p className="text-xl font-semibold text-gray-900">{infoCardData.noKycIncreaseText}</p>

      <InfoCardAmounts depositLimit={0} withdrawLimit={0} />

      <a className="text-md font-semibold text-gray-500" href="#" onClick={() => void handleOnClick()}>
        {infoCardData.increaseLimits}
      </a>
    </div>
  );
}
