"use strict";
//import { mysql_user, mysql_pass, mysql_db } from '/env/credentials.js';
const mysql = require("mysql2");

class Database {
  constructor(multipleStatements = false) {
    this.multipleStatements = multipleStatements;
    this.connected = false;
  }

  /** Only for server-sided queries; vulnerable */
  query(query) {
    return new Promise((resolve, reject) => {
      const results = [];
      console.log(query);
      const _query = this.connection.query(query);
      _query
        .on("error", (err) => {
          reject(new Error(`Query error: ${err.message}`));
        })
        .on("result", (row) => {
          if (row.affectedRows === 1) {
            results.push(JSON.stringify(row, null, 2));
          } else {
            results.push(JSON.stringify("no rows affected", null, 2));
          }
        })
        .on("end", () => {
          resolve(results);
        });
    });
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
    // TODO prepared statements
    // TODO stored procedures
    // TODO transactions
    // TODO error handling
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
    // TODO prepared statements
    // TODO stored procedures
    // TODO transactions
    // TODO error handling
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

    // TODO compare to user, change only new values
    // TODO prepared statements
    // TODO stored procedures
    // TODO transactions
    // TODO error handling

    // Makeshift until the above has been implemented
    const newFields = [];
    for (const entry in fields) {
      if (fields[entry] === "email") newFields.unshift(entry);
      else newFields.push(entry);
    }

    for (const entry in newFields) {
      this.connect();

      const query = this.connection.query(
        `UPDATE ${table} 
      SET ${fields[entry]} = "${values[entry]}" 
      WHERE id = "${id}"`
      );

      query
        .on("error", function (err) {
          if (err.code === "ER_DUP_ENTRY")
            msg += "Duplicates are not allowed: " + values[entry];
          else throw err;
        })
        .on("fields", function (fields) {})
        .on("result", function (row) {
          if (row.affectedRows === 1) msg += values[entry] + " updated";
        })
        .on("end", function () {});

      this.end();
    }
    callback.res.json(JSON.stringify(msg), null, 2);
  }

  delete({ table, field, value, callback }) {
    this.connect();
    // TODO prepared statements
    // TODO stored procedures
    // TODO transactions
    // TODO error handling
    // TODO ask for confirmation
    // TODO set user as inactive instead?
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

  /**
   * Call a (mysql) stored procedure by its name and any argument required, as an array
   * @param {string} procedure
   * @param  {Array<number | string>} args
   */
  call(procedure, ...args) {
    if (args.length === 1 && Array.isArray(args[0])) {
      args = args[0]; // flatten the array if it contains only one element
    }
    this.query(`CALL ${procedure}(${args.join(", ")})`);
  }
}

module.exports = Database;
