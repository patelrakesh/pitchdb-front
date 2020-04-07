import React from 'react';
import spinnerGif from '../../../resources/gifs/spinner.gif';
import './overlay.css';

export default ({ message }) => (
  <div className="overlay-load">
    <div className="overlay-img-cont">
      <img src={spinnerGif} />
      <span>
        {message}
      </span>
    </div>
    
  </div>
);