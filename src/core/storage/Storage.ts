/* eslint-disable no-dupe-class-members */
import type { Tuple } from 'ts-toolbelt';

import { FallbackAdapter } from './FallbackAdapter';
import type { StorageAdapter, StatesToMigrations } from './types';

function entries<T extends object, K extends keyof T>(obj: T) {
  return Object.entries(obj) as [K, T[K]][];
}

interface IData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  version?: number;
}

class Storage<States extends IData[]> {
  public static namespaces: string[] = [];
  private observers: Record<
    keyof Tuple.Last<States>,
    (<K extends keyof Tuple.Last<States>>(value: Tuple.Last<States>[K], key: K) => void)[]
  >;

  constructor(
    private currentNamespace: string,
    private adapter: StorageAdapter,
    private initialState: Tuple.Last<States>,
    private migrations: StatesToMigrations<States>,
  ) {
    if (Storage.namespaces.includes(currentNamespace)) {
      console.error(`Namespace '${currentNamespace}' is already exist`);
    }

    if (!this.adapter.checkAvailability()) {
      this.adapter = new FallbackAdapter();

      console.warn(`Storage '${currentNamespace}' is not available! Fallback storage will be used.`);
    }

    Storage.namespaces = [...Storage.namespaces, currentNamespace];

    this.observers = this.getObserverKeys();

    this.normalizeVersion();
  }

  // eslint-disable-next-line class-methods-use-this
  public set(data: Tuple.Last<States>): void {
    entries(data).forEach((item) => {
      const [key, value] = item;
      this.setItem(key, value);
    });
  }

  public get(): Tuple.Last<States> {
    return this.getCurrentNamespaceKeys().reduce((acc, currentKey) => {
      const key = this.getShortKey(currentKey);
      const data = this.getItem(key);

      return {
        ...acc,
        [key]: data,
      };
    }, {} as Tuple.Last<States>);
  }

  public setItem<Key extends keyof Tuple.Last<States>>(key: Key, value: Tuple.Last<States>[Key]): void {
    const convertedValue = JSON.stringify(value);

    this.adapter.setItem(this.getFullKey(key), convertedValue);
    this.dispatch(key, value);
  }

  public getItem<Key extends keyof Tuple.Last<States>>(key: Key): Tuple.Last<States>[Key] {
    const data = this.adapter.getItem(this.getFullKey(key));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data ? JSON.parse(data) : undefined;
  }

  public subscribe<Key extends keyof Tuple.Last<States>>(
    key: Key,
    callback: (value?: Tuple.Last<States>[Key], key?: keyof Tuple.Last<States>) => void,
  ) {
    if (!this.observers[key]) {
      this.observers[key] = [];
    }

    this.observers[key].push(callback);

    return () => {
      this.observers = {
        ...this.observers,
        [key]: this.observers[key]?.filter((subscriber) => subscriber !== callback),
      };
    };
  }

  private dispatch<Key extends keyof Tuple.Last<States>>(key: Key, value: Tuple.Last<States>[Key]): void {
    this.observers[key]?.forEach((callback) => callback(value, key));
  }

  private getObserverKeys() {
    return this.getCurrentNamespaceKeys().reduce((acc, currentKey) => {
      const key = this.getShortKey(currentKey);

      return {
        ...acc,
        [key]: [],
      };
    }, {} as Tuple.Last<States>);
  }

  private normalizeVersion() {
    const version = this.getVersion();

    if (typeof version === 'number') {
      this.executeMigrations(version);
    } else {
      this.reset();
      this.set(this.initialState);
    }
    this.saveVersion(this.migrations.length as unknown as number);
  }

  private executeMigrations(currentVersion: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const migrations = (this.migrations.slice as unknown as ((state: unknown) => any)[]['slice'])(currentVersion);

    if (!migrations.length) {
      return;
    }

    const currentData = this.get();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const newData = migrations.reduce((data, migration) => migration(data), currentData);
    this.reset();
    this.set(newData);
  }

  public reset() {
    this.getCurrentNamespaceKeys().forEach((key) => {
      this.adapter.removeItem(key);
    });
  }

  private getVersion(): number | undefined | null {
    try {
      return this.getItem('version');
    } catch {
      return null;
    }
  }

  private saveVersion(version: number) {
    this.setItem('version', version);
  }

  private getFullKey<Key extends keyof Tuple.Last<States>>(key: Key): string {
    return `${this.currentNamespace}:${String(key)}`;
  }

  private getShortKey(key: string): keyof Tuple.Last<States> {
    return key.replace(`${this.currentNamespace}:`, '');
  }

  private getCurrentNamespaceKeys() {
    return this.adapter.getAllKeys().filter((currentKey) => this.isCurrentNamespaceKey(currentKey));
  }

  private isCurrentNamespaceKey(key: string | number | symbol): boolean {
    return typeof key === 'string' && new RegExp(`^${this.getFullKey('' as keyof Tuple.Last<States>)}.+$`).test(key);
  }
}

export { Storage };
