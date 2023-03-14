//import { mysql_user, mysql_pass, mysql_db } from '/env/credentials.js';
const mysql = require("mysql");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "school",
    });
  }

  isConnected() {
    this.connection.connect((err) => {
      if (err) {
        console.error("error during connection", err.stack);
        return false;
      }
    });
    return true;
  }

  closeConnection() {
    this.connection.end((err) => {
      if (err) {
        console.error("error during disconnection", err.stack);
        return false;
      }
    });
    return true;
  }

  describe({ table }) {
    this.connection.query(`DESCRIBE ${table}`, (err, rows, fields) => {});
  }

  write({ table, fields, values, callback }) {
    let msg = "";
    const _fields = fields
      .reduce((accu, currentValue) => accu + currentValue + ",", "")
      .slice(0, -1);
    const _values = values
      .reduce((accu, currentValue) => accu + '"' + currentValue + '",', "")
      .slice(0, -1);

    this.connection.query(`
    INSERT INTO ${table} (${_fields}) VALUES (${_values})`),
      function (err, rows, fields) {
          throw err;
          if (err) {
          if (err.errno == 1062) throw "Duplicates are not allowed: " + _values;
          Router.push({path: '/'})
        }
        if (rows) {
          if (rows.affectedRows === 1)
            msg = JSON.stringify(_values, null, 2).concat(" added");
        } else msg = "User(" + _values + ") already exist";
        callback.res.send(msg);
      };
  }

  read({ table, field, values, amount, start, callback }) {
    if (values) {
      // Get a user by value
      this.connection.query(
        `SELECT * FROM ${table} WHERE ${field} = ${values}`,
        (err, rows, fields) => {
          if (err) throw err;
          if (rows) {
            callback.res.send(rows);
          }
        }
      );
    } else if (amount && start) {
      // Get all users with limits
      this.connection.query(
        `SELECT * FROM ${table} LIMIT ${start}, ${amount}`,
        (err, rows, fields) => {
          if (err) throw err;
          if (rows) {
            callback.res.send(rows);
          }
        }
      );
    } else {
      // Get all users
      this.connection.query(
        `SELECT ${field} FROM ${table}`,
        (err, rows, fields) => {
          if (err) throw err;
          if (rows) {
            callback.res.send(rows);
          }
        }
      );
    }
  }

  update({ table, id, fields, values, callback }) {
    this.connection.query(
      `UPDATE ${table} 
      SET ${fields} = "${values}" 
      WHERE id = "${id}"`,
      function (err, rows, fields) {
        if (err) throw err;
        if (rows) {
          if (rows.affectedRows === 1)
            msg = JSON.stringify(value, null, 2).concat(" updated");
        } else msg = "No user by that id(" + id + ")";
        callback.res.send(msg);
      }
    );
  }

  delete({ table, field, value, callback }) {
    // TODO: Ask for confirmation
    // TODO: set user as inactive instead?
    let msg = "";
    this.connection.query(
      `DELETE FROM ${table} WHERE ${field}= "${value}"`,
      function (err, rows, fields) {
        if (err) throw err;
        if (rows) {
          if (rows.affectedRows === 1)
            msg = JSON.stringify(value, null, 2).concat(" deleted");
        } else msg = "No user by that id(" + value + ")";
        callback.res.send(msg);
      }
    );
  }
}

module.exports = Database;
