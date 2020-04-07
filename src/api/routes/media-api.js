import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const MEDIA_ENDPOINT = '/search/media/';

export default {
  search: query => {
    let encodedUri = encodeURI(baseApiCalls.BASE_URL + MEDIA_ENDPOINT + "?" + query);
    let modifiedUri = encodedUri.replace(/%2526/g, '%26');
    return axios.get(modifiedUri);
  },

  getMediaPositions: query =>
    axios.get(encodeURI(baseApiCalls.BASE_URL + MEDIA_ENDPOINT + "positions?" + query)),

  getMediaGenres: query =>
    axios.get(encodeURI(baseApiCalls.BASE_URL + MEDIA_ENDPOINT + "genres?" + query)),
};