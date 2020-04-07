import React, { Component } from "react";
import subscriptionsApi from '../../../api/routes/subscriptions-api';
import async from 'async';
import swalApi from '../../../api/util/swal-api';

import SubscriptionsComponent from '../components/subscriptions';

class Subscriptions extends Component {
  constructor (props) {
    super(props);
    this.state = {

      plans: [],
      selectedPlan: null,
      userSubscription: null
    };

    this.functions = {
      selectPlan: this.selectPlan,
      paySubscription: this.paySubscription,
      upgradePlan: this.upgradePlan,
      cancelPlan: this.cancelPlan
    };
  }


  componentDidMount = () => {
    swalApi.openLoadingModal('Loading');
    async.parallel(
      [
        next => this.loadPlansData(next),
        next => this.loadUserSubscription(next)
      ],
      (err) => {
        if (err) this.props.finishLoading(true, "An error occured, please try again later");
        else swalApi.closeLoadingModal();
      }
    );
  }

  // Plans load

  loadPlansData = (callback) => {
    subscriptionsApi.getPlans()
      .then(response => {
        this.setState({ plans: response.data }, () => {
          callback();
        });
      })
      .catch(() => {
        callback('An error occured while loading the pricing information, please try again later');
      });
  }

  loadUserSubscription = (callback) => {
    subscriptionsApi.getCurrentUserSubscription()
      .then(response => {
        this.setState({ userSubscription: response.data }, () => {
          callback();
        });
      })
      .catch(() => {
        callback('An error occured while loading your subscription data, please try again later');
      });
  }

  selectPlan = (selectedPlan) => {
    if (selectedPlan)
      this.props.setBeginTransaction(true);
    else
      this.props.setBeginTransaction(false);
    this.setState({ selectedPlan });
  }

  paySubscription = payload => {
    this.props.changeLoadingMessage("Processing");
    const planId = this.state.selectedPlan.id;
    subscriptionsApi.paySubscription(payload.token, planId)
      .then(() => {
        this.props.setSucessItem({ selectedPlan: this.state.selectedPlan, type: 'subscription' });
        this.props.changeLoadingMessage();
        this.props.refresHeader(true, () => { });
      })
      .catch(error => {
        if (error.response)
          this.props.finishLoading(true, error.response.data);
        else
          this.props.finishLoading(true, 'An error occured processing your payment, please try again later');
      });
  }

  upgradePlan = () => {
    this.props.changeLoadingMessage("Processing");
    const planId = this.state.selectedPlan.id;
    subscriptionsApi.updateCurrentUserSubscription({ planId })
      .then((response) => {
        this.setState({ userSubscription: response.data }, () => {
          this.props.setSucessItem({ selectedPlan: this.state.selectedPlan, type: 'subscription' });
          this.props.changeLoadingMessage();
          this.props.refresHeader(true, () => { });
        });
      })
      .catch(error => {
        if (error.response)
          this.props.finishLoading(true, error.response.data);
        else
          this.props.finishLoading(true, 'An error occured changing your subscription, please try again later');
      });
  }

  cancelPlan = () => {
    swalApi.openConfirmation("Cancel your current plan?", null, "Cancel plan")
      .then(confirm => {
        if (confirm) {
          this.props.changeLoadingMessage("Canceling plan");
          subscriptionsApi.cancelUserSubscription()
            .then((response) => {
              this.setState({ userSubscription: response.data }, () => {
                this.props.finishLoading(false, "Plan cancelled sucessfully");
              });
            })
            .catch(() => {
              this.props.finishLoading(true, "An error occured cancelling your plan, please try again later");
            });
        }
      });
  }

  render = () =>
    <SubscriptionsComponent {...this.props} {...this.state} {...this.functions} />
}

export default Subscriptions;