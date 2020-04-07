import types from './types';

const INITIAL_STATE = {
  placeholder: ''
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PALCEHOLDER: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
};

export default homeReducer;