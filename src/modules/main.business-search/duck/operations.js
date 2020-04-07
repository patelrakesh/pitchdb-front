import Creators from './actions';

const placeholder = Creators.placeholder;

const placeholderOperation = (value) => {
  return dispatch => {
    dispatch(placeholder(value));
  };
};

export default {
  placeholderOperation
};