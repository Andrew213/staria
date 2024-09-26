import { Modal } from '@/app/_shared';
import { Save02 } from '@/assets/icons';
import { FeaturedIcon, Button } from '@/lib/components';

import { TEXTS } from './constants';

interface Props {
  communityName: string;
  onClose: () => void;
  onSave: () => void;
}

function ResetModal({ communityName, onClose, onSave }: Props) {
  return (
    <Modal theme="dots-background" contentWrapperClassName="text-center" onClose={onClose}>
      <FeaturedIcon
        className="mb-2.75 border-10 p-2.75 dark:border-fuchsia-200 dark:bg-fuchsia-400"
        theme="light-circle-outline"
        size="lg"
        Icon={Save02}
      />
      <p className="mb-1 text-lg font-semibold text-white">{TEXTS.title}</p>
      <p className="mb-5 font-rubik text-sm text-gray-blue-100">
        Unfortunately you can’t access those Deals. Please contact {communityName} to request your access.
      </p>
      <Button
        className="mb-5 w-full"
        color="primary"
        size="lg"
        type="submit"
        content={TEXTS.saveButton}
        onClick={() => {
          // TODO save form data
          onSave();
          onClose();
        }}
      />
      <Button
        className="w-full dark:border dark:border-gray-blue-300 dark:bg-downriver"
        color="secondary-gray"
        size="lg"
        content={TEXTS.cancelButton}
        onClick={onClose}
      />
    </Modal>
  );
}

export default ResetModal;
