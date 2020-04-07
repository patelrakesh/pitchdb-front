import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import commonDataParsing from '../../../common/general/util/common-data-parsing';

const PaymentConfirmationSubscription = ({ selectedPlan, currentInterval }) => (
  <>
    <div className="row">
      <div className="col-12">
        <DisplayLabel
          textType={textTypes.DISPLAY_TITLE}
          text={"Upgrade successful"} />
      </div>
    </div>
    <div className="row">
      <div className="col-7 col-lg-4">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text={"Plan:"} />
      </div>
      <div className="col-5 col-lg-2">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={selectedPlan.name} />
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
          text={`$${selectedPlan.price} / ${selectedPlan.interval}`} />
      </div>
    </div>
    <div className="row">
      <div className="col-7 col-lg-4">
        <DisplayLabel
          textType={textTypes.DISPLAY_SUB_SUBTITLE}
          text={"Transaction date:"} />
      </div>
      <div className="col-5 col-lg-2">
        <DisplayLabel
          textType={textTypes.DISPLAY_NORMAL}
          text={commonDataParsing.parseJSDateHuman(new Date(), true)} />
      </div>
    </div>
  </>
);

export default PaymentConfirmationSubscription;
