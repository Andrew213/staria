import { twJoin } from 'tailwind-merge';

import { socials, links, TEXTS } from './data';

interface Props {
  as?: Extract<React.ElementType, 'footer' | 'div'>;
  placedUnderLayout?: 'main' | 'account' | 'manager';
}

export default function ShortFooter({ as: Element = 'footer', placedUnderLayout = 'main' }: Props) {
  return (
    <Element
      className={twJoin(
        'lg:flex lg:flex-row-reverse lg:flex-wrap lg:justify-between lg:gap-8',
        placedUnderLayout === 'main' && 'border-t border-t-gray-200 pb-12 pt-10 dark:border-t-gray-blue-500',
        placedUnderLayout === 'account' && 'pb-6 pt-8',
        placedUnderLayout === 'manager' && 'pb-10 pt-8 dark:border-t dark:border-t-gray-blue-500',
      )}
    >
      {placedUnderLayout === 'manager' ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-2 max-lg:mb-4">
          {links.map(({ id, link, title }) => (
            <li key={id}>
              <a className="text-md text-gray-blue-300" href={link} target="_blank" rel="noreferrer">
                {title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-wrap gap-6 max-lg:mb-6">
          {socials.map(({ id, link, Icon }) => (
            <li key={id}>
              <a href={link} target="_blank" rel="noreferrer">
                <Icon className="size-6 text-gray-400 dark:text-gray-blue-200" />
              </a>
            </li>
          ))}
        </ul>
      )}
      <p
        className={twJoin(
          'font-rubik text-md text-gray-500',
          placedUnderLayout === 'main' && 'dark:text-gray-blue-200',
          placedUnderLayout === 'manager' && 'dark:text-gray-blue-300',
        )}
      >
        {placedUnderLayout === 'manager' ? TEXTS.managerLayoutCopyright : TEXTS.copyright}
      </p>
    </Element>
  );
}
