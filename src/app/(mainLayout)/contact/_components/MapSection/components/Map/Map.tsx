'use client';

import { data } from './constants';
import { MarkerTooltip } from '../MarkerTooltip/MarkerTooltip';

export function Map() {
  return (
    <div className="relative mb-16 hidden h-[488px] w-full max-w-screen-lg items-center justify-center bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/map.png)] bg-cover bg-center bg-no-repeat xl:flex">
      {data.map((item, index) => (
        <MarkerTooltip
          key={index}
          country={item.country}
          city={item.city}
          icon={item.icon}
          markerPosition={item.markerPosition}
        />
      ))}
    </div>
  );
}
