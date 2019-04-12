const fs = require('fs');

module.exports = inputFileName => {
  let jsonDb = {};
  if (fs.existsSync(inputFileName)) {
    jsonDb = JSON.parse(fs.readFileSync(inputFileName));
  }

  return jsonDb;
};
