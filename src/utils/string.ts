import { isDefined } from './validators';

export const toKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const capitalizeFirstLetter = (value: string | undefined) => {
  if (isDefined(value)) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
};
