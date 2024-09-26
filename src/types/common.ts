// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldNames<T extends Record<string, any>> = {
  [key in keyof T]: key;
};

export type { FieldNames };

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
