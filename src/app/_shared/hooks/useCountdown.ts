'use client';

import { useState, useEffect } from 'react';

import { convertSecondsToMilliseconds } from '@/utils';

export default function useCountdown(initialEndTimestamp: number) {
  const [endTimestamp] = useState(initialEndTimestamp);
  const [millisecondsNumberLeft, setMillisecondsNumberLeft] = useState(initialEndTimestamp - Date.now());
  const countdownIsOver = millisecondsNumberLeft <= 0;

  useEffect(() => {
    if (!countdownIsOver) {
      const timeoutId = setTimeout(() => {
        setMillisecondsNumberLeft(endTimestamp - Date.now());
      }, convertSecondsToMilliseconds(1));

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [countdownIsOver, endTimestamp, millisecondsNumberLeft]);

  return countdownIsOver ? 0 : millisecondsNumberLeft;
}
