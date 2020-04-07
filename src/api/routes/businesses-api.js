import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const BUSINESSES_ENDPOINT = '/search/businesses/';

export default {
  searchBusinesses: (queryParams, type) =>
    axios.get(baseApiCalls.BASE_URL + BUSINESSES_ENDPOINT + type + "?" + queryParams),

  fetchLocalBusiness: id =>
    axios.get(baseApiCalls.BASE_URL + BUSINESSES_ENDPOINT + "local/" + id),

  searchBusinessParameters: query =>
    axios.get(encodeURI(baseApiCalls.BASE_URL + BUSINESSES_ENDPOINT + "descriptions?q=" + query)),
};