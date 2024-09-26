import type { FieldState, FieldValidator } from 'final-form';

export const composeValidators =
  <T>(...validators: FieldValidator<T>[]) =>
  (value: T, allValues: object, meta?: FieldState<T> | undefined) =>
    validators.reduce<string | undefined>(
      (error, validator) => error ?? (validator(value, allValues, meta) as string),
      undefined,
    );
