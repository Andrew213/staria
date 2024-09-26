import { CloseIcon } from '@/assets/icons';
import { MobileMenuButton } from '@/lib/components';

interface Props {
  onClick: () => void;
}

export function CloseButton({ onClick }: Props) {
  return (
    <MobileMenuButton
      onClick={onClick}
      icon={
        <span className="block size-6 text-gray-500">
          <CloseIcon className="size-6" />
        </span>
      }
    />
  );
}
