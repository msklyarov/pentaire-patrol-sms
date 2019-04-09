const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('basic-auth');
const path = require('path');
const crypto = require('crypto');

const config = require('../config');
const sendSms = require('./sendSms');

const router = express.Router();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const loginAttempts = {
  count: 0,
  skipUntil: new Date(),
};

app.use((req, res, next) => {
  if (req.originalUrl === '/api/login') {
    return next();
  }
  const user = auth(req);

  // if (loginAttempts.count > config.login.attemptsCount) {
  //   loginAttempts.skipUntil = (new Date()).getTime() + config.login.timeoutInMs;
  //   loginAttempts.number = 0;
  // }

  if (
    /*(new Date()).getTime() > loginAttempts.skipUntil.getTime() ||*/
    !user ||
    config.login.name !== user.name ||
    config.login.password !== user.pass
  ) {
    loginAttempts.number++;
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send();
  }
  loginAttempts.number = 0;
  return next();
});

const tasks = {};

const addNumber = taskId => number => tasks[taskId].completed.push(number);
const isStopped = taskId => () => tasks[taskId].stopSms;

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.send({
    loggedIn:
      config.login.name === username && config.login.password === password,
  });
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

  const taskId = crypto.randomBytes(20).toString('hex');
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
