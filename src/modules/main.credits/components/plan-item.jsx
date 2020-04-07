import React from 'react';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import './plan-item.css';

const PlanItem = ({ planId, clientPlanId, planName, planDescription, planPrice, interval, onClick }) => (
  <div className="PlanItem card text-center">
    <h5 className="card-header">{planName}</h5>
    <div className="card-body">
      <h5 className="card-title">{planDescription}</h5>
      <p className="card-text">{`$${planPrice} / ${interval}`}</p>
      {planId !== clientPlanId ?
        <ActionButton
          buttonType={buttonTypes.MAIN_ACTION}
          onClick={onClick}
          text="Purchase plan"
        />
        :
        <span>Your current plan</span>
      }
    </div>
  </div >
);

export default PlanItem;
