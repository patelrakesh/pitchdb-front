import React from 'react';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import './credits-bundle-item.css';

const CreditsBundleItem = props => (
  <div className="CreditsBundleItem card text-center">
    <h5 className="card-header">{props.bundleTitle}</h5>
    <div className="card-body">
      <h5 className="card-title">{props.creditsAmount + (props.creditsAmount > 1 ? " Pitches" : " Pitch")}</h5>
      <p className="card-text">{"$ " + props.price}</p>
      <ActionButton
        buttonType={buttonTypes.SECONDARY_ACTION}
        onClick={props.onClick}
        text="Purchase bundle"
      />
    </div>
  </div >
);

export default CreditsBundleItem;
