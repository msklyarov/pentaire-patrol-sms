const { Router } = require('express');
const config = require('../../config');

const auth = checkCredentials => {
  const router = new Router();
  const sessions = {};

  const checkSession = (sessionToken, timeNowInMs) => {
    if (!(sessionToken in sessions)) {
      sessions[sessionToken] = {
        loginAttemptsCount: 0,
        skipLoginUntil: timeNowInMs,
      };
    }
  };

  router.post('/getLoginStatus', (req, res) => {
    const { sessionToken } = req.body;

    const timeNowInMs = new Date().getTime();
    checkSession(sessionToken, timeNowInMs);
    const skipTimeoutInMs = sessions[sessionToken].skipLoginUntil - timeNowInMs;

    res.send({ skipTimeoutInMs });
  });

  router.post('/login', (req, res) => {
    const { username, password, sessionToken } = req.body;

    const timeNowInMs = new Date().getTime();
    checkSession(sessionToken, timeNowInMs);
    const skipTimeoutInMs = sessions[sessionToken].skipLoginUntil - timeNowInMs;

    if (skipTimeoutInMs > 0) {
      res.send({ loggedIn: false, skipTimeoutInMs });
    } else {
      const loggedIn = checkCredentials(username, password);

      if (loggedIn) {
        sessions[sessionToken].loginAttemptsCount = 0;
        res.send({ loggedIn, skipTimeoutInMs: 0 });
      } else {
        sessions[sessionToken].loginAttemptsCount++;

        if (
          sessions[sessionToken].loginAttemptsCount !==
          config.login.attemptsCount
        ) {
          res.send({ loggedIn, skipTimeoutInMs: 0 });
        } else {
          sessions[sessionToken] = {
            loginAttemptsCount: 0,
            skipLoginUntil: timeNowInMs + config.login.skipTimeoutInMs,
          };

          res.send({ loggedIn, skipTimeoutInMs: config.login.skipTimeoutInMs });
        }
      }
    }
  });

  return router;
};

module.exports = auth;
