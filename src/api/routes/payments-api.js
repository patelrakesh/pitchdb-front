import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const PAYMENTS_ENDPOINT = '/payments/';
const paymentsApi = {
  payBundle: (token, bundleId) =>
    axios.post(baseApiCalls.BASE_URL + PAYMENTS_ENDPOINT + "/bundle", { token, bundleId })
};

export default paymentsApi;