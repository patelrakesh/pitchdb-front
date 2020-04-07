import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const ACTIVITY_ENDPOINT = '/activity/';

export default {
  outreachActivity: () =>
    axios.get(baseApiCalls.BASE_URL + ACTIVITY_ENDPOINT),
};