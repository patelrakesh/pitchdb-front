import React from 'react';
import ConfirmationSubscription from './confirmation-subscription';
import ConfirmationBundle from './confirmation-bundle';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import './payment-confirmation-panel.css';

export default ({ successItem, changePage }) => (
  <div className="PaymentConfirmationPanel container-fluid">
    {successItem.type === 'subscription' &&
      <ConfirmationSubscription {...successItem} />
    }
    {successItem.type === 'bundle' &&
      <ConfirmationBundle {...successItem} />
    }
    <div className="row">
      <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-lg-4 offset-lg-0 order-success-button">
        <ActionButton
          buttonType={buttonTypes.MAIN_ACTION}
          onClick={() => changePage("outreach-sequences")}
          text="Back to main page"
        />
      </div>
    </div>
  </div >
);