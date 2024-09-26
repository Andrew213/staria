import { Modal } from '@/app/_shared';

import { Player } from '../Player/Player';

interface Props {
  url: string;
  autoplay?: boolean;
  onClose: () => void;
}

export function VideoModal({ url, autoplay, onClose }: Props) {
  return (
    <Modal contentWrapperClassName="w-216" closeButtonIsShown onClose={onClose}>
      <Player url={url} autoplay={autoplay} />
    </Modal>
  );
}
