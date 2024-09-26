import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
}

export function ContactItem(props: Props) {
  const { title, description, linkHref, linkText } = props;

  return (
    <div className="flex w-[343px] flex-col items-center text-center xl:w-[384px]">
      <p className="mb-1 text-lg font-semibold text-gray-900 xl:mb-2 xl:text-xl">{title}</p>
      <p className="mb-4 font-rubik text-md font-normal text-gray-600 xl:mb-5">{description}</p>
      <Link className="text-md font-semibold text-primary-500" href={linkHref} target="_blank">
        {linkText}
      </Link>
    </div>
  );
}
