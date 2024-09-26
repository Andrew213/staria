import { data } from './constants';

export function Values() {
  return (
    <div className="flex justify-center bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/values-mobile.png)] bg-cover bg-no-repeat py-20 sm:bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/values.png)] lg:pb-27 lg:pt-24">
      <div className="flex w-full max-w-screen-xl flex-col items-center gap-14 px-4 lg:gap-16 lg:px-12">
        <div className="flex max-w-screen-md flex-col gap-5">
          <h2 className="text-left text-display-md font-semibold tracking-tight text-white lg:text-center lg:text-display-lg">
            {data.title}
          </h2>
          <p className="text-left font-rubik text-lg text-gray-50 lg:text-center lg:text-xl">{data.description}</p>
        </div>

        <div className="grid w-full gap-6 lg:grid-cols-3 lg:gap-10">
          {data.items.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-6 rounded-4 bg-indigo/30 px-5 py-6 transition-all"
            >
              <div className="flex size-16 items-center justify-center rounded-3.325 bg-java">
                <Icon className="size-8" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="text-center font-rubik text-md text-gray-50">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
