export const data = {
  title: 'KYC Check',
  text: 'You are not verified yet. If you want to invest, you will need to pass a KYC',
  subtext: 'Documents to provide : ',
  list: [
    { title: 'Personal information' },
    { title: 'Government-issued ID' },
    { title: 'Facial recognition' },
    { title: 'Address (déclaratif)' },
  ],
};

import { toAmountInUSD } from '@/utils/amount';

export const dataInfo = {
  title: 'KYC Check',
  errorText: 'Increase your Investments Limits',
  successText: 'Limit Checked',
  list: [
    { title: 'Personal information' },
    { title: 'Government-issued ID' },
    { title: 'Facial recognition' },
    { title: 'Address (déclaratif)' },
  ],
};

export const renderSubText = (error: boolean, amount: number) =>
  error
    ? `You can not invest more than ${toAmountInUSD(amount)}. If you want to increase your limit we need to get your proof of address.`
    : `You can still invest until ${toAmountInUSD(amount)} before providing a new document.`;
