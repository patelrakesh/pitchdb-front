import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const SEARCHES_ENDPOINT = '/searches/';

const stagesApi = {
  saveSearch: search => {
    axios.post(baseApiCalls.BASE_URL + SEARCHES_ENDPOINT, search)
      .then(() => { }).catch(() => { });
  }
};

export default stagesApi;