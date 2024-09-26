export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const dateDotsFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
