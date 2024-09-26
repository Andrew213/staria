import { CheckEmailNotification } from './CheckEmailNotification/CheckEmailNotification';
import { DeclineNotification } from './DeclineNotification/DeclineNotification';

interface Props {
  isRequestSuccessful: boolean;
  email: string;
}

export function CheckEmail(props: Props) {
  const { isRequestSuccessful, email } = props;

  return <>{isRequestSuccessful ? <CheckEmailNotification email={email} /> : <DeclineNotification email={email} />}</>;
}
