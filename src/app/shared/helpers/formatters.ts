// CAPITALIZE FIRST LETTER
export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


// CAPITALIZE TEXT
export const capitalizeText = (text: string): string => {
  return text.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
};


// LIMIT WORDS
export const limitWords = (text: string, numberOfWords: number): string => {
  return text.split(' ').splice(0, numberOfWords).join(' ');
};
