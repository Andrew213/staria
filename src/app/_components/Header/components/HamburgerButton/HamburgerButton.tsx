import { HamburgerIcon } from '@/assets/icons';
import { MobileMenuButton } from '@/lib/components';

interface Props {
  onClick: () => void;
}

export function HamburgerButton({ onClick }: Props) {
  return <MobileMenuButton onClick={onClick} icon={<HamburgerIcon />} />;
}
