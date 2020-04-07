import io from 'socket.io-client';
import socketsCommon from './sockets-common';

let activeSocket;

const PODCASTS_SOCKET_ENDPOINT = '/so-podcasts';

const SOCKETIO_DEFAULT_URL = '/socket.io';

const podcastsApi = {

  events: {
    RESULTS_FIRST: "results-first",
    RESULT_COMPLETE: "result-percentage",
    RESULT_ERROR: "result-error",
    RESULTS_COMPLETE: "results-complete",
    SEARCH_ERROR: "search-error",
    // Client emitted events
    ITUNES_DATA: "itunes-data"
  },

  searchPodcasts: queryParams => {
    const url = process.env.REACT_APP_ENV === 'prod' ? PODCASTS_SOCKET_ENDPOINT : `${process.env.REACT_APP_SOCKET_API_BASE_URL}${PODCASTS_SOCKET_ENDPOINT}`;
    let socket = io(encodeURI(url + "?" + queryParams),
      {
        reconnectionAttempts: 3,
        path: process.env.REACT_APP_ENV === 'prod' ? '/socket-api' + SOCKETIO_DEFAULT_URL : SOCKETIO_DEFAULT_URL
      });
    socket.emit("jwt-authentication", socketsCommon.jwt);
    activeSocket = socket;
    return socket;
  },

  getActiveSocket: () => activeSocket
};

export default podcastsApi;