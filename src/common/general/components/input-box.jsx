import React from 'react';
import './input-box.css';

const InputBox = ({ box, type, name, onChange, value, inputType, placeholder, min = 0, max = 50, required = false }) => (
  <div className='InputBox'>
    {box ?
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        className={inputType}
        placeholder={placeholder}
        minLength={min}
        maxLength={max}
        required={required} />
      :
      <textarea rows="4" cols="50"
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        className={inputType}
        placeholder={placeholder}
        maxLength="1000" />
    }
  </div>
);

export default InputBox;