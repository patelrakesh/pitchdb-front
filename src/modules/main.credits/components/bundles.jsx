import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import { Elements } from 'react-stripe-elements';
import PaymentForm from './payment-form';
import CreditsBundleItem from './credits-bundle-item';
import './bundles.css';


export default (props) => (
  <>
    {!props.beginTransaction &&
      <>
        <div className="row ">
          <div className="col-12 credits-bundles-title">
            <DisplayLabel
              textType={textTypes.DISPLAY_TITLE}
              text={"Bundles"} />
          </div>
        </div>
        {
          props.bundles.length > 0 &&
          <div className="row d-flex justify-content-between">
            {props.bundles.map((bundle, index) =>
              <div className="col-12 col-sm d-flex justify-content-center" key={index}>
                <CreditsBundleItem
                  bundleTitle={bundle.type}
                  creditsAmount={bundle.amount}
                  price={bundle.price}
                  onClick={() => props.selectBundle(bundle)}
                />
              </div>
            )}
          </div>
        }
      </>
    }
    {props.bundleSelected && props.beginTransaction &&
      <div className="row">
        <div className="col-6 col-lg-2">
          <ActionButton
            buttonType={`${buttonTypes.SECONDARY_ACTION} ${buttonTypes.BACK_BUTTON}`}
            onClick={() => props.selectBundle(null)}
            text={"Go Back"}
          />
        </div>
        <div className="col-12">
          <Elements>
            <PaymentForm fontSize={'14px'} {...props} />
          </Elements>
        </div>
      </div>
    }
  </>
);