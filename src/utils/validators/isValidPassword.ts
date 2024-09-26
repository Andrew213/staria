export const isValidPassword = (value: string) => {
  const specialCharsRegex = /[$&+,:";=?_@№#|'<>.^*()%!-]/;
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!specialCharsRegex.test(value)) {
    return 'Password must include at least one special symbol';
  }
};
