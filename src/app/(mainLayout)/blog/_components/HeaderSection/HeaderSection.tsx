import { data } from './constants';

const { heading, supportingText } = data;

export function HeaderSection() {
  return (
    <div className="py-10 xl:py-16">
      <div className="m-auto flex max-w-screen-xl flex-col gap-4 px-4 lg:px-8 xl:gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-display-md font-semibold tracking-display-md text-gray-900 xl:text-display-lg xl:tracking-display-lg">
            {heading}
          </h2>
        </div>
        <p className="font-rubik text-lg text-gray-600 xl:text-xl">{supportingText}</p>
      </div>
    </div>
  );
}
