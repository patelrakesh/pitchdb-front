import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const CHARTS_ENDPOINT = '/charts/';

export default {
  stageSummary: (queryParams) =>
    axios.get(baseApiCalls.BASE_URL + CHARTS_ENDPOINT + "stages/summary?" + queryParams),

  stageAmounts: (queryParams) =>
    axios.get(baseApiCalls.BASE_URL + CHARTS_ENDPOINT + "stages/amounts?" + queryParams)
};