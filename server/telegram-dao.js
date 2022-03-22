"use strict";
const db = require('./db');

db.get("PRAGMA foreign_keys = ON");

exports.newTelegramUser = (id,first_name) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO TELEGRAM_USERS_BOT (id,first_name) VALUES(?,?)';
      
      db.run(sql, [id,first_name], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
}; 

exports.getAllTelegramUsers = () => {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM TELEGRAM_USERS_BOT';
      db.all(sql, [], (err, rows) => {
          if (err) {
              reject(err);
              return;
          }
          const users = rows.map((u) => ({ id: u.id, first_name: u.first_name }));
          resolve(users);
      });
  })
};