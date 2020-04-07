export default {
  countWordOccurences: (str, countedStr) => {
    let splitStr = str.split(' ');
    let wordCount = 0;
    splitStr.forEach(word => {
      if (countedStr.includes(word))
        wordCount++;
    });

    return wordCount;
  }
};