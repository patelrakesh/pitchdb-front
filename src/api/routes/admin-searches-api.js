import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const ADMIN_SEARCHES_ENDPOINT = '/admin-searches/';

export default {

  getAll: (page) => axios.get(baseApiCalls.BASE_URL + ADMIN_SEARCHES_ENDPOINT + "?page=" + page),

  getCount: () => axios.get(baseApiCalls.BASE_URL + ADMIN_SEARCHES_ENDPOINT + "count")
};