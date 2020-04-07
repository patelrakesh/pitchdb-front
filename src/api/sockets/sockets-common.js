let socketsCommon = {

  setJWT: jwt => {
    socketsCommon.jwt = "Bearer " + jwt;
  },

  attempDisconnect: socket => {
    if (socket && socket.connected)
      socket.disconnect();
  }
};

export default socketsCommon;