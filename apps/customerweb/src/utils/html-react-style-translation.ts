export function htmlReactStyleTranslation(styleName: string): string {
  // translate all the padding-left to paddingLeft and so on
  return styleName
    .split('-')
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word[0].toUpperCase() + word.slice(1);
    })
    .join('');
}
