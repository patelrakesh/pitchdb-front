import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const PARAMETERS_ENDPOINT = '/search/parameters/';

export default {
  searchJobTitleParameters: query =>
    axios.get(encodeURI(baseApiCalls.BASE_URL + PARAMETERS_ENDPOINT + "job-titles?q=" + query)),

  searchIndustries: query =>
    axios.get(encodeURI(baseApiCalls.BASE_URL + PARAMETERS_ENDPOINT + "industries?q=" + query)),

  searchPositions: query =>
    axios.get(encodeURI(baseApiCalls.BASE_URL + PARAMETERS_ENDPOINT + "positions?q=" + query)),
};