import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const USER_PODCASTS_ENDPOINT = '/user-podcasts/';

const userPodcastsApi = {
  getUserLists: () =>
    axios.post(baseApiCalls.BASE_URL + USER_PODCASTS_ENDPOINT)
};

export default userPodcastsApi;