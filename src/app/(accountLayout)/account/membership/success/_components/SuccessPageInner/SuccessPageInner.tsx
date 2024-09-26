'use client';

import { create } from 'canvas-confetti';
import { useEffect, useRef } from 'react';

import NoSsr from '@/core/NoSsr/NoSsr';

import { SuccessModal } from '../../../components/SuccessModal';
import { UpgradeContainer } from '../../../components/UpgradeContainer';

export function SuccessPageInner() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      const end = Date.now() + 5 * 1000;

      const myConfetti = create(ref.current, {
        resize: true,
        useWorker: false,
      });

      const celebrate = () => {
        void myConfetti({
          particleCount: 5,
          angle: -20,
          spread: 60,
          origin: { x: 0, y: 0 },
        });
        void myConfetti({
          particleCount: 5,
          angle: 200,
          spread: 60,
          origin: { x: 1, y: 0 },
        });
        void myConfetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 1 },
        });
        void myConfetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 1 },
        });
        if (Date.now() < end) {
          requestAnimationFrame(celebrate);
        }
      };

      celebrate();
    }
  }, []);

  return (
    <UpgradeContainer activeStep={3}>
      <div className="relative -mb-4 min-h-0 w-full grow overflow-hidden lg:-mb-6">
        <canvas ref={ref} className="absolute size-full" />
        <div className="relative z-10">
          <div className="flex w-full items-center justify-center pb-32 pt-6 lg:pt-20">
            <NoSsr>
              <SuccessModal />
            </NoSsr>
          </div>
        </div>
      </div>
    </UpgradeContainer>
  );
}
