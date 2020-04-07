import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const EMAIL_ACCOUNTS_ENDPOINT = '/email-accounts/';

export default {
  getEmailAccounts: () =>
    axios.get(baseApiCalls.BASE_URL + EMAIL_ACCOUNTS_ENDPOINT),

  getPrimary: () =>
    axios.get(baseApiCalls.BASE_URL + EMAIL_ACCOUNTS_ENDPOINT + 'primary'),

  activateAccount: id =>
    axios.put(baseApiCalls.BASE_URL + EMAIL_ACCOUNTS_ENDPOINT + id + '/activation')

};