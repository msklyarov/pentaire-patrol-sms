const jsonFileToObj = require('./jsonFileToObj');
const { usersFilename } = require('./constants');

module.exports = (username, password) => {
  const users = jsonFileToObj(usersFilename);
  const user = users.find(user => user.name === username);
  if (user) {
    return user.password === password;
  }
  return false;
};
