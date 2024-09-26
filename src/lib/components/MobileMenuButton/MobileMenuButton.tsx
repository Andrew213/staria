import type React from 'react';

interface Props {
  icon: React.ReactNode;
  onClick: () => void;
}

export function MobileMenuButton({ icon, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group rounded-2 p-4 transition-all duration-200 ease-linear focus:bg-white focus:shadow-mobile-menu"
    >
      <span className="flex size-6 items-center justify-center">{icon}</span>
    </button>
  );
}
