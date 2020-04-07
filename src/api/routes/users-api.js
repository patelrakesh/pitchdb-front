import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const USERS_ENDPOINT = '/users/';

const userApi = {
  getUserInfo: () =>
    axios.get(baseApiCalls.BASE_URL + USERS_ENDPOINT + 'me'),

  changePassword: (data) =>
    axios.put(baseApiCalls.BASE_URL + USERS_ENDPOINT + 'me/password', data),
};

export default userApi;