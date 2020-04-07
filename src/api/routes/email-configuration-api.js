import axios from 'axios';
import baseApiCalls from '../base-api-calls';
import randomstring from 'randomstring';
import cookiesApi from '../util/cookies-api';

import authConstants from '../constants/auth';
import swalApi from '../util/swal-api';

const emailConfigurationApi = {
  requestAuthentication: network => {
    const stateString = randomstring.generate(20);
    cookiesApi.set("stateString", stateString);

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

    axios.get(baseApiCalls.BASE_URL + '/email-accounts/' + network)
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
    const jwt = cookiesApi.get("jwt");
    axios.defaults.headers.common['Authorization'] = "Bearer " + jwt;
    const splitParam = cookiesApi.get('emailAuthNetwork') === 'gmail' ? 'hash' : 'search';
    let queryParams = window.location[splitParam].substr(1).split('&');
    if (verifyStateString(queryParams)) {
      if (cookiesApi.get('emailAuthNetwork') === 'gmail') {
        let accessToken = getFromQueryParams(queryParams, 'access_token');
        cookiesApi.set('gmailAccessToken', accessToken);
        const seconds = getFromQueryParams(queryParams, 'expires_in');
        let expDate = new Date();
        expDate.setSeconds(expDate.getSeconds() + Number(seconds));
        cookiesApi.set('gmailAccessTokenExp', expDate.toString());

        axios.post(baseApiCalls.BASE_URL + '/email-accounts/gmail-activation')
          .then(() => {
            window.opener.postMessage("email-config", window.opener.origin);
            setTimeout(window.close, 400);
          })
          .catch(err => {
            if (err.response) {
              cookiesApi.set(authConstants.COOKIES_EMAIL_ERROR, err.response.data);
              window.opener.postMessage(authConstants.POST_EMAIL_ERROR, window.opener.origin);
            }
          });
      }
      else {
        axios.post(baseApiCalls.BASE_URL + '/email-accounts/' + cookiesApi.get('emailAuthNetwork') + '/configure',
          { code: getFromQueryParams(queryParams, 'code') })
          .then(() => {
            window.opener.postMessage("email-config", window.opener.origin);
            setTimeout(window.close, 400);
          })
          .catch(error => {
            if (error.response) {
              cookiesApi.set(authConstants.COOKIES_EMAIL_ERROR, error.response.data);
              window.opener.postMessage(authConstants.POST_EMAIL_ERROR, window.opener.origin);
            }
            setTimeout(window.close, 400);
          });
      }
    }
    else {
      cookiesApi.set(authConstants.COOKIES_EMAIL_ERROR, "There was an error configuring the email account, please try again later");
      window.opener.postMessage(authConstants.POST_EMAIL_ERROR, window.opener.origin);
      setTimeout(window.close, 400);
    }
  }


};

const getFromQueryParams = (queryParams, parameter) => {
  let foundCode;
  queryParams.forEach(element => {
    if (element.includes(parameter + "=")) {
      let splitIndex = element.indexOf('=');
      foundCode = element.substring(splitIndex + 1, element.length);
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

export default emailConfigurationApi;