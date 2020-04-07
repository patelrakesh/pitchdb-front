import swalApi from '../util/swal-api';
import cookiesApi from '../util/cookies-api';

import authConstants from '../constants/auth';

const protocol = window.location.protocol;
const port = window.location.port;
const slashes = protocol.concat("//");
const host = slashes.concat(window.location.hostname + ":" + port);

const authListener = {

};

const recieveMessage = event => {
  if (event.data === 'auth') {
    window.location.href = host + '/main/podcastSearch';
  }
  else if (event.data === 'email-config') {
    window.location.href = host + '/main/configuration?element=email';
  }
  else if (event.data === 'connectsign') {
    window.location.href = host + '/main/configuration?element=connect';
  }
  else if (event.data === authConstants.POST_AUTH_ERROR) {
    swalApi.error(cookiesApi.get(authConstants.COOKIES_AUTH_ERROR), () => {
      cookiesApi.remove(authConstants.COOKIES_AUTH_ERROR);
    });
  }
  else if (event.data === authConstants.POST_EMAIL_ERROR) {
    swalApi.error("There was an error connecting your email: " + cookiesApi.get(authConstants.COOKIES_EMAIL_ERROR), () => {
      cookiesApi.remove(authConstants.COOKIES_EMAIL_ERROR);
    });
  }
  else if (event.data === authConstants.POST_CONNECT_ERROR) {
    swalApi.error("There was an error connecting your account: " + cookiesApi.get(authConstants.COOKIES_CONNECT_ERROR), () => {
      cookiesApi.remove(authConstants.COOKIES_CONNECT_ERROR);
    });
  }

};

window.addEventListener("message", recieveMessage, false);

export default authListener;