'use strict';
/* Data Access Object (DAO) module for accessing users */

const bcrypt = require('bcrypt');
const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('spg.sqlite', (err) => {
    if (err) throw err;
  });

  exports.getUser = (email, password) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM USERS WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        const user = { id: row.id, role: row.role, name: row.name, surname: row.surname, birthdate: row.birthdate, email: row.email, isConfirmed: row.isConfirmed };
        bcrypt.compare(password, row.password).then((result) => {
          if (result) {
            resolve(user);
          } else {
            resolve(false);
          }
        });
      } else {
        resolve(false);
      }
    });
  });

// get user by id
exports.getUserById = (id) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM USERS WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        const user = { id: row.id, role: row.role, name: row.name, surname: row.surname, birthdate: row.birthdate, email: row.email, isConfirmed: row.isConfirmed};
        resolve(user);
      } else {
        resolve({ err: 'User not found.' });
      }
    });
  });

exports.getRoleById = (id) => new Promise((resolve, reject) => {
    const sql = 'SELECT role FROM USERS WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        const role = row.role;
        resolve(role);
      } else {
        resolve({ err: 'User not found.' });
      }
    });
});
 