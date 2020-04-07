// CheckoutForm.js
import React from 'react';
import DisplayLabel, { textTypes } from '../../../common/general/components/display-label';
import ActionButton, { buttonTypes } from '../../../common/general/components/action-button';
import InputBox from '../../../common/general/components/input-box';
import Select from 'react-select';
import '../../../common/general/styles/parameters.css';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from 'react-stripe-elements';
import selectStyles from '../../../common/search-common/util/select-styles';
import commonDataParsing from '../../../common/general/util/common-data-parsing';
import './payment-form.css';

const options = {
  fonts: [
    { cssSrc: "https://fonts.googleapis.com/css?family=Open+Sans" }
  ]
};

const stripeStyle = {
  base: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '1.1rem',
    '::placeholder': {
      color: 'grey',
    }
  }
};


class _PaymentForm extends React.Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    const validation = this.props.validate(this.props);
    if (validation.isValid) {
      this.props.changeLoadingMessage('Processing payment');
      this.props.stripe
        .createToken(
          {
            name: this.props.name,
            address_country: this.props.country.value,
            address_state: this.props.state.label,
            address_city: this.props.city.label,
            address_line1: this.props.address
          })
        .then((payload) => {
          if (payload.error) {
            this.props.finishLoading(true, payload.error.message);
          }
          else {
            if (this.props.selectedPlan)
              this.props.paySubscription(payload);
            else
              this.props.payBundle(payload);
          }
        });
    }
    else {
      this.props.finishLoading(true, this.props.getErrorMessage(validation));
    }
  };

  createOptions = (fontSize, padding) => {
    return {
      style: {
        base: {
          fontSize,
          color: '#424770',
          '::placeholder': {
            color: 'grey',
          },
          padding,
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };
  };

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container-fluid PaymentForm">
          <div className="row payment-title">
            <div className="col-12">
              {this.props.selectedPlan ?
                <DisplayLabel
                  textType={textTypes.DISPLAY_TITLE}
                  text={`Upgrade to "${this.props.selectedPlan.name}" plan`} />
                :
                <DisplayLabel
                  textType={textTypes.DISPLAY_TITLE}
                  text={"You selected the '" + commonDataParsing.toTitleCase(this.props.bundleSelected.type) + "' bundle"} />
              }
            </div>
            <div className="col-12">
              {this.props.selectedPlan &&
                <DisplayLabel
                  textType={textTypes.DISPLAY_NORMAL}
                  text={this.props.selectedPlan.description} />
              }
            </div>
          </div>

          {(!this.props.selectedPlan || (this.props.selectedPlan && !this.props.userSubscription)) &&
            <>
              <div className="row">
                <div className="col-12 payment-form-section-label">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_NORMAL}
                    text={"Enter payment information:"} />
                </div>
                <div className="col-10 col-lg-4 col-xl-3">
                  <div className="row">
                    <div className="col-12 payment-label">
                      <DisplayLabel
                        textType={textTypes.DISPLAY_SUB_SUBTITLE}
                        text={"Card number"} />
                    </div>
                    <div className="col-12">
                      <CardNumberElement
                        {...this.createOptions(this.props.fontSize)}
                        options={options}
                        style={stripeStyle}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-xl-2">
                  <div className="row">
                    <div className="col-12 payment-label">
                      <DisplayLabel
                        textType={textTypes.DISPLAY_SUB_SUBTITLE}
                        text={"Expiration date"} />
                    </div>
                    <div className="col-12">
                      <CardExpiryElement
                        {...this.createOptions(this.props.fontSize)}
                        options={options}
                        style={stripeStyle}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3 col-lg-2 col-xl-1">
                  <div className="row">
                    <div className="col-12 payment-label">
                      <DisplayLabel
                        textType={textTypes.DISPLAY_SUB_SUBTITLE}
                        text={"CVC"} />
                    </div>
                    <div className="col-12">
                      <CardCVCElement
                        {...this.createOptions(this.props.fontSize)}
                        options={options}
                        style={stripeStyle}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-5">
                  <div className="row payment-input">
                    <div className="col-12 payment-label">
                      <DisplayLabel
                        textType={textTypes.DISPLAY_SUB_SUBTITLE}
                        text={"Cardholder's name"} />
                    </div>
                    <div className="col-12">
                      <InputBox
                        box={true}
                        type={"text"}
                        name={"name"}
                        onChange={this.props.handleInputChange}
                        value={this.props.name}
                        inputType={"podcast-search-field"}
                        placeholder={"Name"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 payment-form-section-label">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_NORMAL}
                    text={"Enter billing information:"} />
                </div>
                <div className="col-12 col-lg-3">
                  <div className="row">
                    <div className="col-12 payment-label">
                      <DisplayLabel
                        textType={textTypes.DISPLAY_SUB_SUBTITLE}
                        text={"Country"} />
                    </div>
                    <div className="col-12">
                      <Select
                        name="country"
                        value={this.props.country}
                        onChange={this.props.handleCountry}
                        options={this.props.countriesList}
                        placeholder='Select country'
                        styles={selectStyles}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="row">
                    <div className="col-12 payment-label">
                      <DisplayLabel
                        textType={textTypes.DISPLAY_SUB_SUBTITLE}
                        text={"State"} />
                    </div>
                    <div className="col-12">
                      <Select
                        name="state"
                        value={this.props.state}
                        onChange={this.props.handleState}
                        options={this.props.statesList}
                        placeholder="Select state"
                        styles={selectStyles}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="row">
                    <div className="col-12 payment-label">
                      <DisplayLabel
                        textType={textTypes.DISPLAY_SUB_SUBTITLE}
                        text={"City"} />
                    </div>
                    <div className="col-12">
                      <Select
                        name="city"
                        value={this.props.city}
                        onChange={this.props.handleCity}
                        options={this.props.citiesList}
                        placeholder="Select city"
                        styles={selectStyles}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="row payment-input">
                    <div className="col-12 payment-label">
                      <DisplayLabel
                        textType={textTypes.DISPLAY_SUB_SUBTITLE}
                        text={"Address"} />
                    </div>
                    <div className="col-12">
                      <InputBox
                        box={true}
                        type={"text"}
                        name={"address"}
                        onChange={this.props.handleInputChange}
                        value={this.props.address}
                        inputType={"podcast-search-field"}
                        placeholder={"Address"}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4 col-lg-2">
                  <div className="row">
                    <div className="col-12 payment-label">
                      <DisplayLabel
                        textType={textTypes.DISPLAY_SUB_SUBTITLE}
                        text={"Postal code"} />
                    </div>
                    <div className="col-12">
                      <PostalCodeElement
                        {...this.createOptions(this.props.fontSize)}
                        options={options}
                        style={stripeStyle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          }

          {this.props.selectedPlan ?
            <>
              <div className="row payment-form-section-label">
                <div className="col-12">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_SUB_SUBTITLE}
                    text={"Total to pay"} />
                </div>
                <div className="col-12">
                  <DisplayLabel
                    textType={textTypes.DISPLAY_NORMAL}
                    text={`$${this.props.selectedPlan.price} / ${this.props.selectedPlan.interval}`} />
                </div>
                <div className="col-12">
                  Note: If you already have a plan, purchasing this new plan will replace the previous one. You will be credited/debited the proration changes at the start of the next billing month
                </div>
              </div>
              {
                !this.props.userSubscription ?
                  <div className="row payment-button">
                    <div className="col-lg-3 col-7">
                      <ActionButton
                        buttonType={buttonTypes.MAIN_ACTION}
                        text={"Pay and Upgrade"}
                        type='submit'
                      />
                    </div>
                  </div>
                  :
                  <div className="row payment-button">
                    <div className="col-lg-3 col-7">
                      <ActionButton
                        buttonType={buttonTypes.MAIN_ACTION}
                        text={"Change Plan"}
                        onClick={this.props.upgradePlan}
                        type='button'
                      />
                    </div>
                  </div>
              }
            </>
            :
            <div className="row payment-button">
              <div className="col-lg-3 col-7">
                <ActionButton
                  buttonType={buttonTypes.MAIN_ACTION}
                  text="Complete purchase"
                  type='submit'
                />
              </div>
            </div>
          }
        </div>
      </form >
    );
  }
}
const PaymentForm = injectStripe(_PaymentForm);
export default PaymentForm;