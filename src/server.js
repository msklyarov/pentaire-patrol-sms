const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('basic-auth');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const { omit } = require('ramda');
const { format } = require('date-fns');

const config = require('../config');
const sendSms = require('./sendSms');

const usersSmsSettingsFilename = './data/usersSettings.json';
const usersFilename = './data/users.json';
const usersLogsDirname = './data/logs/';
const logsRoute = '/logs';

const jsonFileToObj = inputFileName => {
  let jsonDb = {};
  if (fs.existsSync(inputFileName)) {
    jsonDb = JSON.parse(fs.readFileSync(inputFileName));
  }

  return jsonDb;
};

const checkUserCredentials = (username, password) => {
  const users = jsonFileToObj(usersFilename);
  const user = users.find(user => user.name === username);
  if (user) {
    return user.password === password;
  }
  return false;
};

const router = express.Router();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (
    req.originalUrl !== '/api/sendSms' &&
    req.originalUrl !== '/api/stopSms' &&
    req.originalUrl !== '/api/getStatus'
  ) {
    return next();
  }
  const user = auth(req);

  if (!user || !checkUserCredentials(user.name, user.pass)) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send();
  }
  return next();
});

const tasks = {};
const sessions = {};

const isStopped = taskId => () => tasks[taskId].stopSms;

const updateStatus = (username, taskId) => (smsTo, smsFrom, text) => {
  tasks[taskId].completed.push(smsTo);

  const logFileName = path.join(usersLogsDirname, `${username}.txt`);
  fs.appendFileSync(
    logFileName,
    `Date: ${format(new Date(), 'YYYY-MM-DD HH:mm:ss')}\n`,
  );
  fs.appendFileSync(logFileName, `SMS To: ${smsTo}\n`);
  fs.appendFileSync(logFileName, `SMS From: ${smsFrom}\n`);
  fs.appendFileSync(logFileName, `Texts: ${text}\n`);
  fs.appendFileSync(
    logFileName,
    '======================================================\n',
  );
};

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
    const loggedIn = checkUserCredentials(username, password);

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

router.post('/getUserSettings', (req, res) => {
  const { username } = req.body;
  const data = jsonFileToObj(usersSmsSettingsFilename);
  res.json(data[username]);
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
  } = req.body.data;
  const { username } = req.body;

  const taskId = uuidv4();
  tasks[taskId] = {
    completed: [], // to phone number array
    stopSms: false,
    toLength: smsTo.length,
  };

  const data = jsonFileToObj(usersSmsSettingsFilename);
  data[username] = omit(['smsFrom', 'smsTo', 'texts'], req.body.data);

  fs.writeFileSync(usersSmsSettingsFilename, JSON.stringify(data, null, 2));

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
    updateStatus(username, taskId),
    isStopped(taskId),
  );

  res.json({ taskId });
});

router.post('/stopSms', (req, res) => {
  const { taskId } = req.body;

  if (tasks[taskId]) {
    tasks[taskId].stopSms = true;
    tasks[taskId].completed = [];
  }
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

app.use(logsRoute, serveIndex(usersLogsDirname)); // shows you the file list
app.use(logsRoute, express.static(usersLogsDirname)); // serve the actual files

//Static file declaration
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(config.server.port, () =>
  console.log(`Server listening on port ${config.server.port}!`),
);
