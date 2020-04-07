import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const BUNDLES_ENDPOINT = '/bundles/';

const creditsApi = {
  get: () => axios.get(baseApiCalls.BASE_URL + BUNDLES_ENDPOINT)

};

export default creditsApi;