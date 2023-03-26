"use strict";
//import { mysql_user, mysql_pass, mysql_db } from '/env/credentials.js';
const mysql = require("mysql2");

class Database {
  constructor(multipleStatements = false) {
    this.multipleStatements = multipleStatements;
    this.connected = false;
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
      .on("end", function () {});
  }

  connect() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "school",
      multipleStatements: this.multipleStatements,
    });

    this.connection.connect((err) => {
      if (err) throw new Error(err.stack);
      return (this.connected = true);
    });
  }

  end() {
    this.connection.end((err) => {
      if (err) throw new Error(err.stack);
      return (this.connected = false);
    });
  }

  isConnected() {
    return this.connected;
  }

  describe({ table }) {
    this.connect();
    this.connection.query(`DESCRIBE ${table}`, (err, rows, fields) => {});
    this.end();
  }

  write({ table, fields, values, callback }) {
    this.connect();

    let msg = "";
    const _fields = fields
      .reduce((accu, currentValue) => accu + currentValue + ",", "")
      .slice(0, -1);
    const _values = values
      .reduce((accu, currentValue) => accu + '"' + currentValue + '",', "")
      .slice(0, -1);

    const query = this.connection.query(
      `INSERT INTO ${table} (${_fields}) VALUES (${_values})`
    );
    query
      .on("error", function (err) {
        if (err.errno == 1062) msg = "Duplicates are not allowed: " + _values;
        else throw err;
      })
      .on("fields", function (fields) {})
      .on("result", function (row) {
        if (row.affectedRows === 1)
          msg = JSON.stringify(_values, null, 2).concat(" added");
      })
      .on("end", function () {
        callback.res.send(msg);
      });
    this.end();
  }

  read({ table, field, values, amount, start, callback }) {
    this.connect();

    if (values) {
      // Get a user by value
      this.connection.query(
        `SELECT * FROM ${table} WHERE ${field} = ${values}`,
        (err, rows, fields) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error occurred while fetching data from MySQL database");
            return;
          }
          if (rows) {
            // Send the MySQL response as a JSON object in response to a fetch request
            // res.writeHead(200, { "Content-Type": "application/json" });
            // res.end(JSON.stringify(rows));

            callback.res.status(200).json(rows);
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
          if (err) {
            callback.res.writeHead(500, { "Content-Type": "text/plain" });
            callback.res.end(
              "Error occurred while fetching data from MySQL database"
            );
            return;
          }
          if (rows) {
            // Send the MySQL response as a JSON object in response to a fetch request
            // res.writeHead(200, { "Content-Type": "application/json" });
            // res.end(JSON.stringify(rows));

            // callback.res.writeHead(200, { "Content-Type": "application/json" });
            callback.res.status(200).json(rows);
          }
        }
      );
    }
    this.end();
  }

  update({ table, id, fields, values, callback }) {

    let msg = "";

    // TODO update only changed values

    for (const entry in fields) {
      this.connect();

      this.connection.query(
        `UPDATE ${table} 
      SET ${fields[entry]} = "${values[entry]}" 
      WHERE id = "${id}"`,
        function (err, rows, fields) {
          if (err) throw err;
          if (rows) {
            if (rows.affectedRows === 1)
              msg += JSON.stringify(values[entry], null, 2).concat(" updated");
          } else msg = "No user by that id(" + id + ")";
        }
      );
      
      this.end();
    }
    callback.res.send(msg);
  }

  delete({ table, field, value, callback }) {
    this.connect();
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
    this.end();
  }
}

module.exports = Database;
