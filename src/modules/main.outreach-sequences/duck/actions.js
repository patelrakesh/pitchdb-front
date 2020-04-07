import types from './types.js';

export default {
  placeholder: (value) => ({
    type: types.PALCEHOLDER,
    value: value
  })
};