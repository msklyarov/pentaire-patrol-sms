const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { omit } = require('ramda');
const { format } = require('date-fns');
const uuidv4 = require('uuid/v4');

const sendSms = require('../utils/sendSms');
const config = require('../../config');
const jsonFileToObj = require('../utils/jsonFileToObj');
const {
  usersLogsDirname,
  usersSmsSettingsFilename,
} = require('../utils/constants');

const router = new Router();
const tasks = {};

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

module.exports = router;
