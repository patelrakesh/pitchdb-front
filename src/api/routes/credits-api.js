import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const CREDITS_ENDPOINT = '/credits/';
const COUNTERS_ENDPOINT = '/counters/';

const creditsApi = {
  getCounter: () => axios.get(baseApiCalls.BASE_URL + COUNTERS_ENDPOINT),

  buyBundle: bundleType =>
    axios.post(baseApiCalls.BASE_URL + CREDITS_ENDPOINT + "buy", { bundleType: bundleType })

};

export default creditsApi;