import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const PODCASTS_ENDPOINT = '/podcasts/';

const podcastsApi = {
  searchPodcasts: queryParams => axios.get(baseApiCalls.BASE_URL + PODCASTS_ENDPOINT + 'search?' + queryParams),

  getDetailById: id => axios.get(baseApiCalls.BASE_URL + PODCASTS_ENDPOINT + encodeURIComponent(id)),

  getEpisodesById: (id, page) => axios.get(baseApiCalls.BASE_URL + PODCASTS_ENDPOINT + id + '/episodes?page=' + page),

  getEpisodesCount: (id) => axios.get(baseApiCalls.BASE_URL + PODCASTS_ENDPOINT + id + '/episodes/count'),

  getReviewsById: (id, page) => axios.get(baseApiCalls.BASE_URL + PODCASTS_ENDPOINT + id + '/reviews?page=' + page),

  getReviewsCount: (id) => axios.get(baseApiCalls.BASE_URL + PODCASTS_ENDPOINT + id + '/reviews/count'),

};

export default podcastsApi;