import React from 'react';
import './radio-group.css';


const RadioGroup = props => (
  <div className="RadioGroup">
    {props.radioOptions.map((option, index) =>
      <React.Fragment key={index}>
        <input type="radio" id={option.optionId} name={props.inputName} checked={props.selectedOption == option.optionId}
          onChange={props.handleOptionChange}
          value={option.optionId}
        />
        <label className=
          {
            (props.radioOptions.length <= 2 && "toggle-no-border") ||
            index === 0 && "first-toggle" ||
            index === (props.radioOptions.length - 1) && "last-toggle" ||
            "middle-toggle"
          }
          htmlFor={option.optionId}>{option.label}
        </label>
      </React.Fragment>
    )}
  </div>
);

export default RadioGroup;