import React from 'react';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import PaymentConfirmationPanel from './payment-confirmation-panel';
import Subscriptions from '../containers/subscriptions';
import Bundles from '../containers/bundles';
import './credits-payment-panel.css';

const CreditsPaymentPanel = props => (
  <div className="CreditsPaymentPanel container-fluid">
    {!props.successItem &&
      <React.Fragment>
        <div className="row">
          {!props.beginTransaction &&
            <div className="col-6 col-md-4 col-lg-2">
              <ActionButton
                buttonType={`${buttonTypes.SECONDARY_ACTION} ${buttonTypes.BACK_BUTTON}`}
                onClick={() => props.changePage(null, true)}
                text={"Go Back"}
              />
            </div>
          }
        </div>
        <Subscriptions {...props} />
        <Bundles {...props} />
      </React.Fragment>
    }
    {props.successItem &&
      <PaymentConfirmationPanel {...props} />
    }
  </div >
);

export default CreditsPaymentPanel;
