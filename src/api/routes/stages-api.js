import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const STAGES_ENDPOINT = '/stages/';

const stagesApi = {
  getLatestByCategory: category => axios.get(baseApiCalls.BASE_URL + STAGES_ENDPOINT + 'latestByCategory/' + category),

  actionSend: stage => axios.post(baseApiCalls.BASE_URL + STAGES_ENDPOINT + "action/send", stage),

  actionOpened: stages => axios.post(baseApiCalls.BASE_URL + STAGES_ENDPOINT + "action/opened", stages),

  actionReplied: stages => axios.post(baseApiCalls.BASE_URL + STAGES_ENDPOINT + "action/replied", stages),

  actionBook: stage => axios.post(baseApiCalls.BASE_URL + STAGES_ENDPOINT + "action/book", stage),

  actionPostpone: stage => axios.post(baseApiCalls.BASE_URL + STAGES_ENDPOINT + "action/postpone", stage),

  actionRestore: stage => axios.post(baseApiCalls.BASE_URL + STAGES_ENDPOINT + "action/restore", stage)
};

export default stagesApi;