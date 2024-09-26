export const MainTitle = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <h2 id={id} className="pb-4 pt-8 text-display-xs font-semibold text-gray-900 lg:pb-5 lg:pt-10 lg:text-display-sm">
      {children}
    </h2>
  );
};

export const SecondaryTitle = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <h3 id={id} className="pb-4 pt-8 text-display-xs font-semibold text-gray-900">
      {children}
    </h3>
  );
};

export const Intro = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b border-gray-200 pb-8 font-rubik text-md text-gray-600 lg:text-xl">{children}</div>;
};

export const Conclusion = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-10 rounded-4 bg-gray-50 px-5 py-6 font-rubik text-lg text-gray-600 lg:my-16 lg:p-8 [&>p]:mb-4">
      {children}
    </div>
  );
};

export const List = ({ children, type }: { children: React.ReactNode; type: 'ul' | 'ol' }) => {
  const styles = ` mb-4   ${type === 'ul' ? 'list-disc' : 'list-decimal'} pl-5 font-rubik text-md text-gray-600 last:mb-0 lg:text-lg [&>li]:pl-1`;

  if (type === 'ul') {
    return <ul className={styles}>{children}</ul>;
  }

  return <ol className={styles}>{children}</ol>;
};

export const Picture = ({ children }: { children: React.ReactNode }) => {
  return (
    <figure className="py-10 lg:py-12 [&>figcaption]:font-rubik [&>figcaption]:text-sm [&>figcaption]:text-gray-600 [&>img]:mb-4 [&>img]:rounded-3 [&_a]:underline [&_a]:underline-offset-2">
      {children}
    </figure>
  );
};

export const Blockquote = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote className="py-10 lg:py-12">
      <div className="border-l-2 border-primary-700 py-2 pl-4 text-xl font-medium italic text-gray-900 lg:pl-5 lg:text-display-xs [&>footer]:pt-6 [&>footer]:font-rubik [&>footer]:text-md [&>footer]:not-italic [&>footer]:text-gray-600 lg:[&>footer]:pt-8">
        {children}
      </div>
    </blockquote>
  );
};

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className="mb-4 font-rubik text-md text-gray-600 last:mb-0 lg:text-lg">{children}</p>;
};
