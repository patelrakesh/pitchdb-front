/* eslint-disable linebreak-style */
import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const ADMIN_USERS_ENDPOINT = '/admin-users/';

const adminUsersApi = {

  getAllUsers: (page, term) => axios.get(baseApiCalls.BASE_URL + ADMIN_USERS_ENDPOINT + "?page=" + page + (term ? `&term=${term}` : '')),

  countUsers: (term) => axios.get(baseApiCalls.BASE_URL + ADMIN_USERS_ENDPOINT + "/count" + (term ? `?term=${term}` : '')),

  createUser: userData => axios.post(baseApiCalls.BASE_URL + ADMIN_USERS_ENDPOINT, userData),

  deleteUser: userId => axios.delete(baseApiCalls.BASE_URL + ADMIN_USERS_ENDPOINT + userId),

  addCredits: (userId, credits) => axios.put(baseApiCalls.BASE_URL + ADMIN_USERS_ENDPOINT + userId + "/credits", credits),

  resetPassword: userId => axios.put(baseApiCalls.BASE_URL + ADMIN_USERS_ENDPOINT + userId + "/reset"),

  getSignInToken: userId => axios.get(baseApiCalls.BASE_URL + ADMIN_USERS_ENDPOINT + userId + "/user-token"),

  addPrivilege: (userId, privilege) => axios.put(baseApiCalls.BASE_URL + ADMIN_USERS_ENDPOINT + userId + "/add-privilege?privilege=" + privilege),

  removePrivilege: (userId, privilege) => axios.put(baseApiCalls.BASE_URL + ADMIN_USERS_ENDPOINT + userId + "/remove-privilege?privilege=" + privilege),

  toggleStatus: userId => axios.put(baseApiCalls.BASE_URL + ADMIN_USERS_ENDPOINT + userId + "/status-toggle")
};

export default adminUsersApi;