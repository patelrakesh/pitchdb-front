import React from 'react';
import objectDetailPrint from '../../general/util/object-detail-print';
import DisplayLabel, { textTypes } from '../../general/components/display-label';
import './event-detail.css';

export default props => (
  <div className="EventDetail container-fluid">
    <div className="row">
      <div className="col">
        <DisplayLabel
          textType={textTypes.DISPLAY_TITLE}
          text={"Event Planner detail"}
        />
      </div>
    </div>
    {objectDetailPrint.transformRawCamelCase(props.eventDetail).map((value, index) =>
      <div className="row" key={index}>
        <div className="col-4 col-md-2">
          <DisplayLabel
            textType={textTypes.DISPLAY_SUB_SUBTITLE}
            text={value[0] + ":"}
          />
        </div>
        <div className="col-8 col-md">
          <DisplayLabel
            textType={textTypes.DISPLAY_NORMAL}
            text={value[1]}
          />
        </div>
      </div>
    )}
  </div>
);