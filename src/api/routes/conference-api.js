/* eslint-disable linebreak-style */
import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const CONFERENCES_ENDPOINT = '/search/conferences/';

export default {
  search: query => {
    let encodedUri = encodeURI(baseApiCalls.BASE_URL + CONFERENCES_ENDPOINT + "?" + query);
    let modifiedUri = encodedUri.replace(/%2526/g, '%26');
    return axios.get(modifiedUri);
  },

  getConferenceCategories: () =>
    axios.get(encodeURI(baseApiCalls.BASE_URL + CONFERENCES_ENDPOINT + "categories")),

  getMaxAudience: () =>
    axios.get(encodeURI(baseApiCalls.BASE_URL + CONFERENCES_ENDPOINT + "maxAudience")),
};