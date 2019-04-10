const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('basic-auth');
const path = require('path');
const uuidv4 = require('uuid/v4');

const config = require('../config');
const sendSms = require('./sendSms');

const router = express.Router();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (
    req.originalUrl === '/api/login' ||
    req.originalUrl === '/api/getLoginStatus'
  ) {
    return next();
  }
  const user = auth(req);

  if (
    !user ||
    config.login.name !== user.name ||
    config.login.password !== user.pass
  ) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send();
  }
  return next();
});

const tasks = {};
const sessions = {};

const addNumber = taskId => number => tasks[taskId].completed.push(number);
const isStopped = taskId => () => tasks[taskId].stopSms;

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
    const loggedIn =
      config.login.name === username && config.login.password === password;

    if (loggedIn) {
      sessions[sessionToken].loginAttemptsCount = 0;
      res.send({ loggedIn, skipTimeoutInMs: 0 });
    } else {
      sessions[sessionToken].loginAttemptsCount++;

      if (
        sessions[sessionToken].loginAttemptsCount !== config.login.attemptsCount
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

router.post('/sendSms', (req, res) => {
  const {
    proxy,
    auth,
    rcClientId,
    rcClientSecret,
    rcUsername,
    rcPassword,
    rcServerUrl,
    smsFrom,
    smsTo,
    texts,
  } = req.body;

  const taskId = uuidv4();
  tasks[taskId] = {
    completed: [], // to phone number array
    stopSms: false,
    toLength: smsTo.length,
  };

  sendSms(
    proxy,
    auth,
    rcClientId,
    rcClientSecret,
    rcUsername,
    rcPassword,
    rcServerUrl,
    smsFrom,
    smsTo,
    texts,
    addNumber(taskId),
    isStopped(taskId),
  );

  res.json({ taskId });
});

router.post('/stopSms', (req, res) => {
  const { taskId } = req.body;

  tasks[taskId].stopSms = true;
  tasks[taskId].completed = [];
  res.json({ status: 'Ok' });
});

router.post('/getStatus', (req, res) => {
  const { taskId } = req.body;

  if (tasks[taskId].toLength === tasks[taskId].completed.length) {
    tasks[taskId].completed.push('FINISH');
  }
  res.json(tasks[taskId].completed);
});

app.use(config.server.routePrefix, router);

//Static file declaration
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/build/index.html'));
});

app.listen(config.server.port, () =>
  console.log(`Server listening on port ${config.server.port}!`),
);
