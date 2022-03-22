'use strict';

const sqlite = require('sqlite3');

console.log(__dirname + '/spg.sqlite')

// open the database
const db = new sqlite.Database( __dirname +'/spg.sqlite', (err) => {
  if (err) throw err;
});

module.exports = db;