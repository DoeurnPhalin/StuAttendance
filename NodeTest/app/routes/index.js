const API = require('./api');

module.exports = function(app, db) {
  API(app, db);
  // Other route groups could go here, in the future
};