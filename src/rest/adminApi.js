const fs = require('fs');
const { Router } = require('express');
const jsonFileToObj = require('../utils/jsonFileToObj');
const { usersFilename } = require('../utils/constants');

const router = new Router();

router.post('/users', (req, res) => {
  const users = jsonFileToObj(usersFilename);
  res.send(users.sort((a, b) => a.id - b.id));
});

router.post('/users/add', (req, res) => {
  const users = jsonFileToObj(usersFilename);
  const maxId =
    users.length === 0 ? 0 : Math.max(...users.map(user => user.id));

  users.push({
    id: maxId + 1,
    name: req.body.name,
    password: req.body.password,
    smsLeft: req.body.smsLeft,
  });

  fs.writeFileSync(usersFilename, JSON.stringify(users, null, 2));
  res.send(users.sort((a, b) => a.id - b.id));
});

router.put('/users/:id', (req, res) => {
  const users = jsonFileToObj(usersFilename);
  const result = users.filter(user => user.id !== +req.params.id);

  if (users.length !== result.length) {
    result.push({
      id: +req.params.id,
      ...req.body,
    });
    fs.writeFileSync(usersFilename, JSON.stringify(result, null, 2));
  }
  res.send(result.sort((a, b) => a.id - b.id));
});

router.delete('/users/:id', (req, res) => {
  const users = jsonFileToObj(usersFilename);
  const result = users.filter(user => user.id !== +req.params.id);
  fs.writeFileSync(usersFilename, JSON.stringify(result, null, 2));
  res.send(result.sort((a, b) => a.id - b.id));
});

module.exports = router;
