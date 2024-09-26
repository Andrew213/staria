export const isRequired = (fieldName: string) => (value: string) => (value ? undefined : `${fieldName} is required`);
