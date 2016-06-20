var sqlite = require('sqlite3');
var db = new sqlite.Database("test.db");

module.exports = db;