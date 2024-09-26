import type { HTMLAttributeAnchorTarget } from 'react';

export const MainTitle = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <h2 id={id} className="pb-4 pt-6 text-md font-medium text-gray-900 lg:pb-4 lg:pt-6 lg:text-md dark:text-white">
      {children}
    </h2>
  );
};

export const SecondaryTitle = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <h3 id={id} className="pb-4 pt-6 text-md font-medium text-gray-900 dark:text-white">
      {children}
    </h3>
  );
};

export const List = ({ children, type }: { children: React.ReactNode; type: 'ul' | 'ol' }) => {
  const styles = `mb-4 ${type === 'ul' ? 'list-disc' : 'list-decimal'} pl-6 font-rubik text-md text-gray-600 dark:text-gray-blue-100 last:mb-0 lg:text-md [&>li]:pl-1`;

  if (type === 'ul') {
    return <ul className={styles}>{children}</ul>;
  }

  return <ol className={styles}>{children}</ol>;
};

export const Picture = ({ children }: { children: React.ReactNode }) => {
  return (
    <figure className="py-10 lg:py-12 [&>figcaption]:font-rubik [&>figcaption]:text-sm [&>figcaption]:text-gray-600 dark:[&>figcaption]:text-gray-blue-100 [&>img]:mb-4 [&>img]:rounded-3 [&_a]:underline [&_a]:underline-offset-2">
      {children}
    </figure>
  );
};

export const Blockquote = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote className="py-10 lg:py-12">
      <div className="border-l-2 border-primary-700 py-2 pl-4 text-xl font-medium italic text-gray-900 lg:pl-5 lg:text-display-xs dark:text-white [&>footer]:pt-6 [&>footer]:font-rubik [&>footer]:text-md [&>footer]:not-italic [&>footer]:text-gray-600 lg:[&>footer]:pt-8 dark:[&>footer]:text-gray-blue-100">
        {children}
      </div>
    </blockquote>
  );
};

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className="mb-4 font-rubik text-md text-gray-600 last:mb-0 dark:text-gray-blue-100">{children}</p>;
};

export const Link = ({
  children,
  href,
  rel,
  target,
}: {
  children: React.ReactNode;
  href: string | undefined;
  rel: string | undefined;
  target: HTMLAttributeAnchorTarget | undefined;
}) => {
  return (
    <a
      className="text-primary-700 transition-all duration-200 ease-linear hover:text-primary-900 focus:text-primary-700"
      href={href}
      rel={rel}
      target={target}
    >
      {children}
    </a>
  );
};
