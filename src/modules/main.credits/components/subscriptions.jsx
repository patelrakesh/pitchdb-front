import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import { Elements } from 'react-stripe-elements';
import PaymentForm from './payment-form';
import PlanItem from './plan-item';
import './subscriptions.css';

export default (props) => (
  <>
    {!props.beginTransaction &&
      <>
        <div className="row ">
          <div className="col-12 credits-bundles-title">
            <DisplayLabel
              textType={textTypes.DISPLAY_TITLE}
              text={"Subscription plans"} />
          </div>
        </div>
        {props.userSubscription &&
          <>
            {!props.userSubscription.scheduledToCancel ?
              <div className="row">
                <div className="col-12">
                  <DisplayLabel
                    text={"Canceling your current plan will remove all the pitches that you gained from it when the current billing month ends."}
                  />
                </div>
                <div className="col-6 col-lg-2 cancel-but-col">
                  <ActionButton
                    buttonType={buttonTypes.SECONDARY_ACTION}
                    onClick={props.cancelPlan}
                    text={"Cancel plan"}
                  />
                </div>
              </div>
              :
              <div className="row">
                <div className="col-12 scheduled-explain">
                  <DisplayLabel
                    text={"You have scheduled to cancel your subscription at the end of the month."}
                  />
                </div>
              </div>
            }
          </>

        }

        {props.plans.length > 0 &&
          <div className="row d-flex justify-content-center subscriptions-row">
            {props.plans.map((plan, index) =>
              <div className="col-12 col-sm d-flex justify-content-center" key={index}>
                <PlanItem
                  planName={plan.name}
                  planDescription={plan.description}
                  planPrice={plan.price}
                  planId={plan.id}
                  interval={plan.interval}
                  clientPlanId={props.userSubscription.planId}
                  onClick={() => props.selectPlan(plan)}
                />
              </div>
            )}
          </div>
        }
      </>
    }
    {props.selectedPlan && props.beginTransaction &&
      <div className="row">
        <div className="col-6 col-lg-2">
          <ActionButton
            buttonType={"secondary-action back-button"}
            onClick={() => props.selectPlan(null)}
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