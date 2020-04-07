import changeCase from 'change-case';

export default {
  transformRawCamelCase: object => {
    let transformedArray = [];
    Object.keys(object).forEach(key => {
      if (key && key.length > 2)
        transformedArray.push([changeCase.titleCase(key), object[key]]);
    });
    return transformedArray;
  }
};