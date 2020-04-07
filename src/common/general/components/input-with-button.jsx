import React from 'react';
import './input-with-button.css';
import './action-button.css';

export default ({ buttonText, type, name, onChange, placeholder, inputClass, buttonClass, min = 0, max = 50, required = false }) =>
  <div className="input-group mb-3">
    <input name={name} type={type}
      className={"form-control " + inputClass}
      onChange={onChange}
      placeholder={placeholder}
      minLength={min}
      maxLength={max}
      required={required}
    />
    <div className="input-group-append">
      <button
        className={"action-button " + buttonClass}
        type="submit">
        {buttonText}
      </button>
    </div>
  </div>;