import { CheckIcon } from '@/assets/icons';

interface Props {
  label: string;
  checked: boolean;
}

export function ListItem({ label, checked }: Props) {
  return (
    <span className="flex w-full items-center justify-between gap-2 rounded-1.5 p-2.5 pl-2 transition-colors hover:bg-gray-50">
      <span className="text-md font-medium text-gray-900">{label}</span>
      {checked && (
        <span className="size-5 text-primary-600">
          <CheckIcon />
        </span>
      )}
    </span>
  );
}
