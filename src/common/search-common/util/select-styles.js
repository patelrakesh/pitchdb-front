export default {
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.9rem',
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: '20',
  }),
  control: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    fontSize: '0.9rem',
    minHeight: '2.4rem',
    height: '2.4rem',
    border: '1px solid #aeaeae',
    marginBottom: '0.8rem',
    boxShadow:'none',
    '&:focus': {
      border: '2px solid rgb(0, 26, 183)'
    },
    '&:hover': {
      border: '2px solid rgb(0, 26, 183)'
    },
    '&:active': {
      border: '2px solid rgb(0, 26, 183)'
    }
    
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
};