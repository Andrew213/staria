import { Modal } from '@/app/_shared';
import { Cryptocurrency02 } from '@/assets/icons';
import { DEALS_TYPEFORM } from '@/env';
import { FeaturedIcon, Button } from '@/lib/components';

import { TEXTS } from './constants';

interface Props {
  onClose: () => void;
}

function CreateADealModal({ onClose }: Props) {
  return (
    <Modal
      theme="dots-background"
      // TODO remove "dark" class after review
      contentWrapperClassName="dark text-center"
      onClose={onClose}
    >
      <FeaturedIcon
        className="mb-2.75 border-10 p-2.75"
        theme="light-circle-outline"
        size="lg"
        Icon={Cryptocurrency02}
      />
      <p className="mb-1 text-lg font-semibold text-white">{TEXTS.title}</p>
      <p className="mb-5 font-rubik text-sm text-gray-blue-100">{TEXTS.subtitle}</p>
      <Button
        className="mb-5"
        color="primary"
        size="lg"
        blank
        href={DEALS_TYPEFORM}
        fullWidth
        content={TEXTS.confirmButton}
        onClick={onClose}
      />
      <Button
        className="dark:border dark:border-gray-blue-300 dark:bg-downriver"
        color="secondary-gray"
        size="lg"
        fullWidth
        content={TEXTS.cancelButton}
        onClick={onClose}
      />
    </Modal>
  );
}

export default CreateADealModal;
