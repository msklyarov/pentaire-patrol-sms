const jsonFileToObj = require('./jsonFileToObj');
const { usersFilename } = require('./constants');
const config = require('../../config');

const checkUserCredentials = (username, password) => {
  const users = jsonFileToObj(usersFilename);
  const user = users.find(user => user.name === username);
  if (user) {
    return user.password === password;
  }
  return false;
};

const checkAdminCredentials = (username, password) =>
  username === config.admin.name && password === config.admin.password;

module.exports = { checkUserCredentials, checkAdminCredentials };
