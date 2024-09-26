// TODO rename to isNumberOrStringNumber
export const isNumber = (value: unknown): value is number | `${number}` => {
  if (typeof value === 'number') {
    return !isNaN(value);
  }

  if (typeof value === 'string') {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
  }

  return false;
};
