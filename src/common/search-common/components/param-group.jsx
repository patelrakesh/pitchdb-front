import React from 'react';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import './param-group.css';

const ParamGroup = ({ title, icon, children }) =>
  <div className={"row param-group " + (!icon ? "group-no-border" : "")}>
    <div className="col-xl-2 col-lg-3 col-12 param-label align-self-center">
      {icon && !title && <i className={icon}></i>}
      <DisplayLabel
        textType={textTypes.DISPLAY_SUB_SUBTITLE}
        text={title}
      />
    </div>
    {/* SIBLINGS */}
    {children}
  </div>;

export default ParamGroup;