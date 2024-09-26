import { ShortFooter } from '@/app/_shared';
import { Logo } from '@/assets/icons';
import { Link as UiLink, Badge } from '@/lib/components';

import { footerText, footerLinks } from './constants';

export function Footer() {
  return (
    <div className="mx-auto mt-12 max-w-screen-xl px-4 lg:mt-16 lg:px-8">
      <div className="mb-12 flex flex-col gap-12 lg:mb-16 lg:flex-row lg:justify-stretch lg:py-0">
        <div className="flex max-w-[375px] shrink-0 flex-col gap-8 lg:w-[320px]">
          <Logo className="w-[257px] text-gray-800 dark:text-white" />
          <p className="font-rubik text-md text-gray-600 dark:text-gray-blue-100">{footerText.description}</p>
        </div>
        <div className="flex flex-wrap lg:w-full">
          {footerLinks.map(({ group, links }) => (
            <div key={group} className="flex w-full max-w-[155px] flex-col gap-4 lg:max-w-[140px]">
              <p className="text-sm text-gray-500 dark:text-gray-blue-200">{group}</p>
              <div className="flex flex-col gap-3">
                {links.map(({ badge, external, href, title }) => (
                  <div key={href} className="flex items-center gap-2">
                    <UiLink
                      content={title}
                      href={href}
                      target={external ? '_blank' : '_self'}
                      color="gray"
                      size="lg"
                      className="!font-medium"
                    />
                    {badge && <Badge size="sm" color="orange" content={badge} />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ShortFooter as="div" />
    </div>
  );
}
