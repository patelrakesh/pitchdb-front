import React, { Component } from 'react';
import CreditsPaymentPanel from '../components/credits-payment-panel';
import searchParametersApi from '../../../api/routes/search-parameters-api';
import { StripeProvider } from 'react-stripe-elements';
import FormValidator from '../../../common/general/util/form-validator';

class CreditsPayment extends Component {
  constructor (props) {
    super(props);
    this.state = {

      citiesList: [],
      city: null,
      statesList: [],
      state: null,
      countriesList: [],
      country: null,

      address: '',
      name: '',

      orderSuccess: false,
      beginTransaction: false,

      successItem: null

    };

    this.functions = {
      handleInputChange: this.handleInputChange,
      handleCountry: this.handleCountry,
      handleState: this.handleState,
      handleCity: this.handleCity,
      setBeginTransaction: this.setBeginTransaction,
      setSucessItem: this.setSucessItem
    };

    this.formValidator = new FormValidator([
      {
        field: 'name',
        method: 'isLength',
        args: [{ min: 2, max: 50 }],
        validWhen: true,
        message: 'Please provide a name between 2 and 50 characters long'
      },
      {
        field: 'country',
        method: () => this.state.country ? true : false,
        validWhen: true,
        message: 'Please select a country',
        isObj: true
      },
      {
        field: 'state',
        method: () => this.state.state ? true : false,
        validWhen: true,
        message: 'Please select a state',
        isObj: true
      },
      {
        field: 'city',
        method: () => this.state.city ? true : false,
        validWhen: true,
        message: 'Please select a city',
        isObj: true
      },
      {
        field: 'address',
        method: 'isLength',
        args: [{ min: 5, max: 60 }],
        validWhen: true,
        message: 'Please provide an address between 5 and 60 characters long'
      }
    ]);
  }

  componentDidMount = () => {
    this.loadCountries();
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // General

  loadCountries = () => {
    searchParametersApi.getCountries()
      .then(response => {
        this.setState({
          countriesList: response.data
        });
      })
      .catch(error => {
        this.props.finishLoading(true,error.message);
      });
  }

  handleCountry = selectedCountry => {
    this.setState({
      country: selectedCountry,
      state: selectedCountry ? this.state.state : null,
      statesList: selectedCountry ? this.state.statesList : null,
      city: selectedCountry ? this.state.city : null,
      citiesList: selectedCountry ? this.state.citiesList : null
    }, () => {
      if (selectedCountry)
        searchParametersApi.getStates(selectedCountry.refId)
          .then(response => {
            this.setState({ statesList: response.data });
          })
          .catch(() => {

          });
    });
  }

  handleState = selectedState => {
    this.setState({ state: selectedState }, () => {
      if (selectedState)
        searchParametersApi.getCities(selectedState.refId)
          .then(response => {
            this.setState({ citiesList: response.data });
          })
          .catch(() => {

          });
    });
  }

  handleCity = selectedCity => {
    this.setState({ city: selectedCity }, () => {
    });
  }

  setBeginTransaction = (beginTransaction) => {
    this.setState({ beginTransaction });
  }

  setSucessItem = (successItem) => {
    this.setState({ successItem });
  }

  render = () =>
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
      <CreditsPaymentPanel {...this.functions} {...this.state} {...this.props} {...this.formValidator} />
    </StripeProvider>
}

export default CreditsPayment;