import axios from 'axios';
import baseApiCalls from '../base-api-calls';

const TEAMS_ENDPOINT = '/teams/';

const teamsApi = {
  createTeam: () => axios.post(baseApiCalls.BASE_URL + TEAMS_ENDPOINT, {}),

  issueInvitation: (team, email) => axios.post(baseApiCalls.BASE_URL + TEAMS_ENDPOINT + "/invitation", { team: team, email: email }),

  getTeam: () => axios.get(baseApiCalls.BASE_URL + TEAMS_ENDPOINT),

  removeTeamUser: userId => axios.delete(baseApiCalls.BASE_URL + TEAMS_ENDPOINT + "users/" + userId)
};

export default teamsApi;