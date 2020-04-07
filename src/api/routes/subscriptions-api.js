import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const SUBSCRIPTIONS_ENDPOINT = '/subscriptions';
const paymentsApi = {
  getPlans: () =>
    axios.get(baseApiCalls.BASE_URL + SUBSCRIPTIONS_ENDPOINT + '/plans'),

  paySubscription: (token, planId) =>
    axios.post(baseApiCalls.BASE_URL + SUBSCRIPTIONS_ENDPOINT, { token, planId }),

  getCurrentUserSubscription: () =>
    axios.get(baseApiCalls.BASE_URL + SUBSCRIPTIONS_ENDPOINT + '/current'),

  updateCurrentUserSubscription: (upgradeDate) =>
    axios.put(baseApiCalls.BASE_URL + SUBSCRIPTIONS_ENDPOINT + '/current', upgradeDate),

  cancelUserSubscription: () =>
    axios.delete(baseApiCalls.BASE_URL + SUBSCRIPTIONS_ENDPOINT + '/current'),

};

export default paymentsApi;