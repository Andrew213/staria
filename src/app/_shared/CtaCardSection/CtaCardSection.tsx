import Markdown from 'react-markdown';

import { Button } from '@/lib/components';

import { data } from './constants';

const { heading, supportingText, action1, action2 } = data;

export function CtaCardSection() {
  return (
    <div className="py-16 xl:py-24">
      <div className="m-auto max-w-screen-md px-4 md:max-w-screen-xl xl:px-8">
        <div className="flex flex-col overflow-hidden rounded-6 bg-gray-800 md:flex-row md:items-center md:shadow-xl">
          <div className="flex flex-col gap-8 px-6 pb-12 pt-10 lg:gap-10 lg:p-16">
            <div className="flex flex-col gap-4 xl:gap-5">
              <h2 className="text-display-sm font-semibold text-white xl:text-display-md xl:tracking-display-md">
                {heading}
              </h2>
              <div className="font-rubik text-xl text-gray-100">
                <Markdown
                  components={{
                    strong: ({ children }) => <span className="font-ruberoid font-bold">{children}</span>,
                  }}
                >
                  {supportingText}
                </Markdown>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <Button href="/pricing" content={action1} size="xl" color="secondary-gray" animate />
              <Button href="/signup" content={action2} size="xl" color="secondary" animate />
            </div>
          </div>
          <div className="size-full min-h-70 grow bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/features-picture.png)] bg-cover bg-center bg-no-repeat md:min-h-[400px] md:max-w-[480px]" />
        </div>
      </div>
    </div>
  );
}
