import React from 'react';
import './progress-bar.css';

export default props =>
  <div className="progress">
    <div className={
      "progress-bar progress-bar-striped " +
      (props.progressComplete ? " bg-success" : " progress-bar-animated")
    }
      role="progressbar"
      aria-valuenow={props.currentProgress}
      aria-valuemin="0"
      aria-valuemax="100"
      style={
        {
          width: props.currentProgress + "%"
        }
      }>
      {props.progressText}
    </div>
  </div>;