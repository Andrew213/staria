import { StepsSlider } from './components';
import { description, title } from './constants';

export function StepsSliderWrapper() {
  return (
    <div className="w-full max-w-screen-xl px-4 py-10 lg:px-8 lg:py-16 lg:pb-0 lg:pt-14">
      <div className="mb-12 flex flex-col gap-4 lg:gap-5">
        <h2 className="text-display-sm font-semibold tracking-tight text-gray-900 lg:text-display-md dark:text-white">
          {title}
        </h2>
        <p className="max-w-screen-md font-rubik text-lg text-gray-600 lg:text-xl dark:text-gray-blue-100">
          {description}
        </p>
      </div>
      <StepsSlider />
    </div>
  );
}
