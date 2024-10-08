import type { Tuple } from 'ts-toolbelt';

export interface StorageAdapter {
  checkAvailability(): boolean;
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  getAllKeys(): string[];
}

type TailAndStatesToMigrations<T, S> = {
  [key in keyof T]: (state: S[Extract<key, keyof S>]) => T[key];
};

export type StatesToMigrations<S extends unknown[]> = TailAndStatesToMigrations<Tuple.Tail<S>, S>;
