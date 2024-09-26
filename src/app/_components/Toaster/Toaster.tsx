import classNames from 'classnames';
import type { ToastOptions } from 'react-toastify';

import { CloseIcon, ToastErrorIcon, ToastSuccessIcon, ToastWarningIcon } from '@/assets/icons';

interface Props {
  type?: 'error' | 'warning' | 'success' | 'info';
  text: string;
  subtext?: string;
  actionUndo?: () => void;
  actionView?: () => void;
  closeToast?: () => void;
}
export function Toaster({ type, text, subtext, closeToast }: Props & Partial<ToastOptions>) {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <ToastErrorIcon />;
      case 'success':
        return <ToastSuccessIcon />;
      default:
        return <ToastWarningIcon />;
    }
  };
  return (
    <div className="relative flex max-w-[348px] flex-col-reverse items-start rounded-3 border border-gray-200 bg-white p-4 shadow-lg lg:flex-row lg:gap-3">
      {type && <div className="absolute left-2 top-2">{getIcon()}</div>}
      <div className={classNames('ml-0 mt-4 flex flex-col items-start lg:ml-9 lg:mt-0', { '!ml-0': !type })}>
        <div>
          <p className="font-semibold text-gray-900">{text}</p>
          {subtext && <p className="mt-1 text-sm font-normal text-gray-600">{subtext}</p>}
        </div>
      </div>

      <button className="ml-auto" onClick={closeToast}>
        <CloseIcon className="size-5" />
      </button>
    </div>
  );
}
