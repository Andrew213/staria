import { useAppSelector } from '@/redux/hooks';

import { InfoCardBasic, InfoCardUnlimited, InfoCardVerified } from './components';

export function InfoCard() {
  const user = useAppSelector((store) => store.user);
  const showUnlimitedCard = user.verification.currentLevel === 3;

  if (showUnlimitedCard) {
    return <InfoCardUnlimited />;
  }

  const showVerifiedCard = user.verification.currentLevel === 1 || user.verification.currentLevel === 2;

  if (showVerifiedCard) {
    return <InfoCardVerified />;
  }

  return <InfoCardBasic />;
}
