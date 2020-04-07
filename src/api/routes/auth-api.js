import axios from 'axios';
import baseApiCalls from '../base-api-calls';
import randomstring from 'randomstring';
import cookiesApi from '../util/cookies-api';
import swalApi from '../util/swal-api';

import authConstants from '../constants/auth';

const authApi = {
  requestAuthentication: (socialSite, isSignIn) => {
    const stateString = randomstring.generate(20);
    cookiesApi.set("stateString", stateString);
    cookiesApi.set("isSignIn", isSignIn);

    const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;

    let w = 900;
    let h = 650;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;

    let newWindow = window.open('', '_blank', 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

    axios.get(baseApiCalls.BASE_URL + '/auth/' + socialSite + "?isSignIn=" + isSignIn)
      .then(response => {
        newWindow.location.href = response.data + '&state=' + stateString;
        if (window.focus) {
          newWindow.focus();
        }

      })
      .catch(error => {
        swalApi.error(error);
      });
  },

  afterAuth: () => {
    let queryParams = window.location.search.substr(1).split('&');
    let sendBody = {
      code: decodeURIComponent(getFromQueryParams(queryParams, 'code')),
      isSignIn: cookiesApi.get('isSignIn')
    };
    let invToken = cookiesApi.get('inviteToken');
    if (invToken && invToken !== 'false') {
      sendBody.invitationToken = invToken;
    }
    if (verifyStateString(queryParams))
      if (cookiesApi.get("signconfig") === "y") {
        const jwt = cookiesApi.get("jwt");
        axios.defaults.headers.common['Authorization'] = "Bearer " + jwt;
        axios.put(baseApiCalls.BASE_URL + '/users/social-login/' + cookiesApi.get('authNetwork'), sendBody)
          .then(response => {
            cookiesApi.remove("signconfig");
            cookiesApi.setUserJWT(response.data.token);
            window.opener.postMessage("connectsign", window.opener.origin);
            setTimeout(window.close, 400);
          })
          .catch(error => {
            cookiesApi.remove("signconfig");
            if (error.response) {
              cookiesApi.set(authConstants.COOKIES_CONNECT_ERROR, error.response.data);
            }
            else {
              cookiesApi.set(authConstants.COOKIES_CONNECT_ERROR, 'Error, try again later');
            }
            window.opener.postMessage(authConstants.POST_CONNECT_ERROR, window.opener.origin);
            setTimeout(window.close, 400);
          });
      }
      else
        axios.post(baseApiCalls.BASE_URL + '/auth/' + cookiesApi.get('authNetwork') + '/login', sendBody)
          .then(response => {
            if (invToken && invToken !== 'false')
              cookiesApi.remove('inviteToken');
            cookiesApi.setUserJWT(response.data.token);
            window.opener.postMessage("auth", window.opener.origin);
            setTimeout(window.close, 400);
          })
          .catch(error => {
            if (error.response) {
              cookiesApi.set(authConstants.COOKIES_AUTH_ERROR, error.response.data);
            }
            else {
              cookiesApi.set(authConstants.COOKIES_AUTH_ERROR, 'Error, try again later');
            }
            window.opener.postMessage(authConstants.POST_AUTH_ERROR, window.opener.origin);
            setTimeout(window.close, 400);
          });
    else {

      cookiesApi.set(authConstants.COOKIES_AUTH_ERROR, "There was a problem performing the " + (cookiesApi.get('isSignIn') === "true" ?
        "sign-in" : "sign-out") + ", please try again.");
      window.opener.postMessage(authConstants.POST_AUTH_ERROR, window.opener.origin);
      setTimeout(window.close, 400);
    }
  },

  regularAuth: loginData =>
    axios.post(baseApiCalls.BASE_URL + '/auth/login', loginData),

  resetPassword: emailData =>
    axios.put(baseApiCalls.BASE_URL + '/auth/password', emailData)
};

const getFromQueryParams = (queryParams, parameter) => {
  let foundCode;
  queryParams.forEach(element => {
    if (element.includes(parameter + "=")) {
      foundCode = element.split(parameter + "=")[1];
    }
  });
  return foundCode;
};

const verifyStateString = queryParams => {
  let found = false;
  queryParams.forEach(queryParam => {
    if (queryParam.includes("state=") && cookiesApi.get('stateString') === queryParam.split("=")[1]) {
      found = true;
    }
  });
  return found;
};

export default authApi;