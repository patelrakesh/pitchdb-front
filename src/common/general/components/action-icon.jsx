import React from 'react';
import ReactTooltip from 'react-tooltip';
import './action-icon.css';

const ActionIcon = ({ dataId, className, id, onClick, disabled, icon, iconType, tooltip, containerClass }) => (
  <div className={"ActionIcon " + containerClass}>
    <span
      data-tip data-for={dataId}
      className={className}
      id={id}
      onClick={onClick}
      disabled={disabled}>
      <i className={icon + " action-icon " + (iconType || "standard-action")}></i>
    </span>
    {tooltip &&
      <ReactTooltip id={dataId} place="right" type="dark" effect="solid" border={true} delayShow={500}>
        <span>{tooltip}</span>
      </ReactTooltip>
    }
  </div>

);

export default ActionIcon;