import { Storage, localStorageAdapter } from '@/core/storage';

type Nullable<T> = T | null | undefined;

interface State {
  referralCode: Nullable<string>;
  expiry: Nullable<number>;
}

export const referralStorage = new Storage<[State]>(
  'referralCode',
  localStorageAdapter,
  {
    referralCode: null,
    expiry: null,
  },
  [],
);
