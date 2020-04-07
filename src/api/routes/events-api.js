import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const EVENTS_ENDPOINT = '/search/event-organizations';

const eventsApi = {
  searchEvents: queryParams =>
    axios.get(baseApiCalls.BASE_URL + EVENTS_ENDPOINT + "?" + queryParams),

  fetchEvent: id =>
    axios.get(baseApiCalls.BASE_URL + EVENTS_ENDPOINT + "/" + id),
};

export default eventsApi;