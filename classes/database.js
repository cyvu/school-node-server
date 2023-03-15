"use strict";
//import { mysql_user, mysql_pass, mysql_db } from '/env/credentials.js';
const mysql = require("mysql");

class Database {
  constructor(multipleStatements=false) {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "school",
      multipleStatements: multipleStatements
    });
  }

  /** Only for server-sided queries; vulnerable */
  run(safe_query) {
    let msg = "";
    const query = this.connection.query(safe_query);
    query
      .on("error", function (err) {
        if (err.errno == 1062) msg = "Duplicates are not allowed: " + _values;
        else throw err;
      })
      .on("fields", function (fields) {})
      .on("result", function (row) {
        console.log(JSON.stringify(row, null, 2));
      })
      .on("end", function () {
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
    console.log(`INSERT INTO ${table} (${_fields}) VALUES (${_values})`);

    const query = this.connection.query(
      `INSERT INTO ${table} (${_fields}) VALUES (${_values})`
    );
    query
      .on("error", function (err) {
        if (err.errno == 1062) msg = "Duplicates are not allowed: " + _values;
        else throw err;
      })
      .on("fields", function (fields) {
        console.log("fields: ", fields);
      })
      .on("result", function (row) {
        console.log("row: ", row);
        if (row.affectedRows === 1)
          msg = JSON.stringify(_values, null, 2).concat(" added");
        /* Use with I/O
        this.connection.pause();
        processRow(row, function () {
          this.connection.resume()
        });
        */
      })
      .on("end", function () {
        console.log(msg);
        callback.res.send(msg);
      });
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
