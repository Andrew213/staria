import sanitizeHtml from 'sanitize-html';

export const textSanitize = (value: string) => {
  const newValue = value.replace(/>/g, '> ');
  const cleanedData = sanitizeHtml(newValue, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
    nonBooleanAttributes: ['*'],
    nestingLimit: 6,

    textFilter: function (text, tagName) {
      if (tagName === 'body') {
        return '';
      }
      return text;
    },
  });

  return cleanedData.trim().replace(/\s+/g, ' ');
};
