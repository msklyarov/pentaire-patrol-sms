const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('basic-auth');
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const {
  checkUserCredentials,
  checkAdminCredentials,
} = require('../utils/checkCredentials');
const { usersLogsDirname } = require('../utils/constants');

if (!fs.existsSync(usersLogsDirname)) {
  fs.mkdirSync(usersLogsDirname);
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const user = auth(req);

  if (req.originalUrl.startsWith(config.server.routeApiPrefix)) {
    if (!user || !checkUserCredentials(user.name, user.pass)) {
      res.set('WWW-Authenticate', 'Basic realm="example"');
      return res.status(401).send();
    }
  } else if (req.originalUrl.startsWith(config.server.routeAdminApiPrefix)) {
    if (!user || !checkAdminCredentials(user.name, user.pass)) {
      res.set('WWW-Authenticate', 'Basic realm="example"');
      return res.status(401).send();
    }
  }

  return next();
});

app.use(
  config.server.routeAuthPrefix,
  require('../rest/auth')(checkUserCredentials),
);
app.use(
  config.server.routeAdminAuthPrefix,
  require('../rest/auth')(checkAdminCredentials),
);

app.use(config.server.routeApiPrefix, require('../rest/api'));
app.use(config.server.routeAdminApiPrefix, require('../rest/adminApi'));

app.use(config.server.routeLogsPrefix, serveIndex(usersLogsDirname)); // shows you the file list
app.use(config.server.routeLogsPrefix, express.static(usersLogsDirname)); // serve the actual files

//Static file declaration
app.use(
  config.server.routeAdminPrefix,
  express.static(path.join(__dirname, '../../admin/build')),
);
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(config.server.port, () =>
  console.log(`Server listening on port ${config.server.port}!`),
);
