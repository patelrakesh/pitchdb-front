import React from 'react';
import './action-button.css';

const buttonTypes = {
  MAIN_ACTION: 'main-action',
  SECONDARY_ACTION: 'secondary-action',
  BACK_BUTTON: 'back-button'
};

const ActionButton = ({ buttonType, id, onClick, disabled, text, type = 'button' }) => (
  <button
    className={"action-button " + buttonType}
    id={id}
    onClick={onClick}
    disabled={disabled}
    type={type}>
    {text}
  </button>
);

export { buttonTypes };
export default ActionButton;
