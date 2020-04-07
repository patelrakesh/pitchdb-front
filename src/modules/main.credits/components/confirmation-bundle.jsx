import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import commonDataParsing from '../../../common/general/util/common-data-parsing';

export default (props) => (
  <>
    <div className="row">
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_TITLE}
          text={"Order successful"} />
      </div>
    </div>
    <div className="row">
      <div className="col-7 col-lg-4">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text={"Order number:"} />
      </div>
      <div className="col-5 col-lg-2">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={props.orderNumber} />
      </div>
    </div>
    <div className="row">
      <div className="col-7 col-lg-4">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text={"Bundle:"} />
      </div>
      <div className="col-5 col-lg-2">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={commonDataParsing.toTitleCase(props.orderBundle) + " (" + props.orderAmount + " pitch(es))"} />
      </div>
    </div>
    <div className="row">
      <div className="col-7 col-lg-4">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text={"Price:"} />
      </div>
      <div className="col-5 col-lg-2">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={"$ " + props.orderPrice} />
      </div>
    </div>
    <div className="row">
      <div className="col-7 col-lg-4">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text={"Order date:"} />
      </div>
      <div className="col-5 col-lg-2">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={commonDataParsing.parseDate(props.orderDate)} />
      </div>
    </div>
  </>
);