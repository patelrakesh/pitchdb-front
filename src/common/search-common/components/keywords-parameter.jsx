/* eslint-disable linebreak-style */
import React from 'react';
import InputWithButton from '../../general/components/input-with-button';
import './keywords-parameter.jsx';

export default ({ onClick, handleInputChange, keywords, noMin }) => (
  <InputWithButton
    type={"text"}
    name={"keywords"}
    onChange={handleInputChange}
    onClick={onClick}
    value={keywords}
    inputClass={"podcast-search-field"}
    placeholder={"Keywords"}
    buttonClass={"input-main-action"}
    buttonText="Search"
    required={!noMin}
    min={noMin ? 0 : 2}
    max={100}
  />
);