import React, { Component } from "react";
import BundlesComponent from '../components/bundles';
import bundlesApi from '../../../api/routes/bundles-api';
import paymentsApi from '../../../api/routes/payments-api';

class Bundles extends Component {
  constructor (props) {
    super(props);
    this.state = {
      bundles: [],

      bundleSelected: null,
      amountSelected: 0,

      orderBundle: null,
      orderAmount: null,
      orderPrice: null,
      orderNumber: null,
      orderDate: null
    };

    this.functions = {
      selectBundle: this.selectBundle,
      payBundle: this.payBundle,

      setOrder: this.setOrder
    };
  }

  componentDidMount = () => {
    this.loadBundlesData();
  }

  // Bundles load

  loadBundlesData = () => {
    this.props.changeLoadingMessage('Loading');
    bundlesApi.get()
      .then(response => {
        this.setState({ bundles: response.data }, () => { this.props.changeLoadingMessage(); });
      })
      .catch(() => {
        this.props.finishLoading(true, 'An error occured while loading the bundles data, please try again later');
      });
  }

  selectBundle = (bundle) => {
    if (bundle)
      this.props.setBeginTransaction(true);
    else
      this.props.setBeginTransaction(false);
    this.setState({ bundleSelected: bundle });
  }

  payBundle = payload => {
    paymentsApi.payBundle(payload.token, this.state.bundleSelected._id)
      .then(response => {
        this.props.changeLoadingMessage();
        this.props.refresHeader(true, () => { });
        this.setOrder(response.data);
      })
      .catch(error => {
        this.props.finishLoading(true, error.response.data);
      });
  }

  setOrder = (orderDetails) => {
    this.props.setSucessItem(
      {
        ...orderDetails,
        type: 'bundle'
      });
  }

  render = () =>
    <BundlesComponent {...this.props} {...this.state} {...this.functions} />

}

export default Bundles;