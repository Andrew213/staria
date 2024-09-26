import { data } from './constants';

export function TopCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-4 border border-gray-200 bg-white shadow-section-card-2 lg:grid lg:grid-cols-[575px,1fr]">
      <div className="flex flex-col gap-4 px-6 py-10 lg:gap-8 lg:py-18 lg:pl-12 lg:pr-20">
        <h2 className="text-display-md font-semibold tracking-tight text-gray-900">{data.title}</h2>
        <p className="font-rubik text-md text-gray-600 lg:text-lg">{data.description}</p>
      </div>

      <div className="h-[440px] shrink-0 bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/all-for-our-community.jpeg)] bg-cover bg-[center_right_39%] pt-[127%] brightness-[1.2] saturate-[1.1] lg:pt-0"></div>
    </div>
  );
}
