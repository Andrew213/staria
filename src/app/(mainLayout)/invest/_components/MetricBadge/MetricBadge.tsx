interface Props {
  title: string;
  content: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export function MetricBadge({ title, content, bottomContent }: Props) {
  return (
    <div className="rounded-3 border border-gray-400 bg-blue-zodiac px-4 py-3 lg:px-4 lg:py-5 dark:border-gray-blue-500">
      <div className="flex flex-col gap-1 lg:gap-0">
        <p className="font-rubik text-sm text-gray-200 dark:text-gray-blue-200">{title}:</p>
        <p className="whitespace-break-spaces text-xl font-semibold text-white lg:whitespace-nowrap lg:text-display-xs">
          {content}
        </p>
        {bottomContent}
      </div>
    </div>
  );
}
