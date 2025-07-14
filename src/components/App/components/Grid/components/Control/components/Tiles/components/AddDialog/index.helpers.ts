export const getValidValue = (text: string) => {
  return text.toLowerCase().replace(/ /g, '-');
};
