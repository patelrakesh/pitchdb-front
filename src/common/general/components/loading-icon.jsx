import React from 'react';
import './loading-icon.css';
import reloadIcon from '../../../resources/gifs/reload.gif';

const LoadingIcon = ({hidden, size}) => (
  <img src={reloadIcon} alt="loading-icon"
    className={"loading-icon" + (hidden ? " hidden" : "") + (size ? " " + size : " loading-default")} />
);

export default LoadingIcon;