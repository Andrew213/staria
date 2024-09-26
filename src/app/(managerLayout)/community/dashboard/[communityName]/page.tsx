import { KeyPerformance, DealsHistory, CreateNewDeals } from './_components';
import { TEXTS } from './_data';

interface RouteParams {
  params: { communityName: string };
}

export default function Page({ params }: RouteParams) {
  return (
    <div className="self-stretch">
      <h1 className="mb-6 text-display-sm font-semibold text-white lg:mb-10">{TEXTS.title}</h1>
      <KeyPerformance />
      <DealsHistory />
      <CreateNewDeals communityName={params.communityName} />
    </div>
  );
}
