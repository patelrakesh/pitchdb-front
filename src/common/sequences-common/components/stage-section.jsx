import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';

const stageCommon = props =>
  <div className="row">
    <div className="col-auto align-self-center stage-action-icon">
      <i className={props.stageIcon}></i>
    </div>
    <div className="col-auto align-self-center">
      <DisplayLabel
        textType={textTypes.DISPLAY_SUBTITLE}
        text={props.stageName} />
    </div>
    {props.children}
  </div>;

export default stageCommon;