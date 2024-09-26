import { data } from './constants';

export function MapTitle() {
  return (
    <div className="flex flex-col items-center py-16 text-center xl:py-24">
      <span className="mb-3 text-sm font-semibold text-primary-700 xl:text-md">{data.text}</span>
      <h1 className="mb-6 text-display-md font-semibold text-gray-900 xl:text-display-lg">{data.title}</h1>
      <p className="font-rubik text-lg font-normal text-gray-600 xl:text-xl">{data.description}</p>
    </div>
  );
}
