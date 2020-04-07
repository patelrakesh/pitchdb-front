import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const SEARCH_PARAMETERS_ENDPOINT = '/search-parameters/';

const searchParametersApi = {
  getGenres: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'genres'),

  getLanguages: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'languages'),

  getLocations: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'locations'),

  getPlaces: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'places'),

  getMonths: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'months'),

  getStates: countryId =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'states?countryId=' + countryId),

  getCities: stateId =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'cities?stateId=' + stateId),

  getCountries: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'countries'),

  getRoles: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'roles'),

  getTypes: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'types'),

  getSchoolTypes: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'school-types'),

  getSponsorIndustries: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'sponsorIndustries'),

  getSponsorMarkets: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'sponsorMarkets'),

  getGuestIndustries: () =>
    axios.get(baseApiCalls.BASE_URL + SEARCH_PARAMETERS_ENDPOINT + 'guestIndustries'),

};

export default searchParametersApi;