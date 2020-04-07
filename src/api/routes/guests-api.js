import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const GUESTS_ENDPOINT = '/guests/';

const guestsApi = {
  searchGuests: queryParams =>
    axios.get(baseApiCalls.BASE_URL + GUESTS_ENDPOINT + "search?" + queryParams),

  lookUpEmails: guests =>
    axios.post(baseApiCalls.BASE_URL + GUESTS_ENDPOINT + "lookup", guests, {
      timeout: 600000
    })
};

export default guestsApi;