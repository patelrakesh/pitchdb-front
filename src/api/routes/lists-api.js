import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const LISTS_ENDPOINT = '/lists/';
const listsApi = {
  getUserLists: (page, noLimit = false) => {
    let query = "?page=" + page;
    if (noLimit) query += "&noLimit=1";
    return axios.get(baseApiCalls.BASE_URL + LISTS_ENDPOINT +  query);
  },

  getUserListsCount: () =>
    axios.get(baseApiCalls.BASE_URL + LISTS_ENDPOINT + "/count"),

  getListCountSummary: id =>
    axios.get(baseApiCalls.BASE_URL + LISTS_ENDPOINT + id + "/count-summary"),

  getUserList: id =>
    axios.get(baseApiCalls.BASE_URL + LISTS_ENDPOINT + id),

  createList: list =>
    axios.post(baseApiCalls.BASE_URL + LISTS_ENDPOINT, list),

  updateList: (id, podcastListChanges) =>
    axios.put(baseApiCalls.BASE_URL + LISTS_ENDPOINT + id, podcastListChanges),

  deleteList: id =>
    axios.delete(baseApiCalls.BASE_URL + LISTS_ENDPOINT + id),

  addItemsToList: (id, type, items) =>
    axios.post(baseApiCalls.BASE_URL + LISTS_ENDPOINT + id + "/items?type=" + type, items),

  getListItems: (id, type, page) =>
    axios.get(baseApiCalls.BASE_URL + LISTS_ENDPOINT + id + "/items?type=" + type + "&page=" + page),

  getListItemsCount: (id, type) =>
    axios.get(baseApiCalls.BASE_URL + LISTS_ENDPOINT + id + "/items/count?type=" + type),

  deleteItems: (id, itemIds) =>
    axios.delete(baseApiCalls.BASE_URL + LISTS_ENDPOINT + id + "/items", { data: itemIds }),

  connectContacts: (itemsData) =>
    axios.put(baseApiCalls.BASE_URL + LISTS_ENDPOINT + '/items/contact', itemsData),

  getSequence: (id, listItemId) =>
    axios.get(baseApiCalls.BASE_URL + LISTS_ENDPOINT + id + '/items/' + listItemId + '/sequence'),

  activateSequence: (id, listItemId) =>
    axios.put(baseApiCalls.BASE_URL + LISTS_ENDPOINT + id + '/items/' + listItemId + '/sequence'),

};

export default listsApi;


