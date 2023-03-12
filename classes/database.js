//import { mysql_user, mysql_pass, mysql_db } from '/env/credentials.js';
const mysql = require("mysql")

class Database
{
  constructor() {
      this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'school',
    })
  }

  isConnected() {
    this.connection.connect((err) => {
      if (err) {
        console.error('error during connection', err.stack)
        return false
      }
    })
    return true
  }

  closeConnection() {
    this.connection.end((err) => {
      if (err) {
        console.error('error during disconnection', err.stack)
        return false
      }
    })
    return true
  }

  describe(table) {
    this.connection.query(`DESCRIBE ${table}`, (err, rows, fields) => {
      /* process.stdout.write("".concat(
        "\nDatabase.\x1B[3;32m", 
        "describe",
        "\x1B[0;22m (", table, "):\n",
        JSON.stringify( rows, null, 2))
      )*/
    })
  }

  /* TODO: clean on prod */
  read(table, field, callback) {
    this.connection.query(`SELECT ${field} FROM ${table}`, (err, rows, fields) => {
      if (err) throw err
      if (rows) {
        callback.send(rows)
      // process.stdout.write("".concat("\nDatabase.\x1B[3;34m", "read", "\x1B[0;22m (", field, "):\n", JSON.stringify( rows, null, 2)))
      }
    })
  }

  /* TODO: clean on prod */
  write(table, values, callback) {
    this.connection.query(`INSERT INTO ${table} VALUES (${values})`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
        if (rows.affectedRows === 1)
          return JSON.stringify( values, null, 2).concat(" added")
          callback.send(JSON.stringify( values, null, 2).concat(" added"))
          // process.stdout.write("".concat("\nDatabase.\x1B[3;35m", "write", "\x1B[0;2m (", "\"", values, "\") into \x1B[7;24m ", table, " \x1B[27m" ))
      }
    })
  }
  
  /* TODO: clean on prod */
  delete(table, field, value, callback) {
    this.connection.query(`DELETE FROM ${table} WHERE ${field}= "${value}"`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
          if (rows.affectedRows === 1)
          callback.send(JSON.stringify( values, null, 2).concat(" deleted"))
          // process.stdout.write("".concat("\nDatabase.\x1B[3;31m" , "delete", "\x1B[0;2m (", field, "): \x1B[0;31m\"\x1B[9;31m", value, "\x1B[0;2m\x1B[0;31m\"\x1B[0;2m"))
      }
    }) 
  }
  
  /* TODO: clean on prod */
  update(table, field, fieldValue, conditionField, conditionValue, callback) {
    this.connection.query(`UPDATE ${table} SET ${field} = "${fieldValue}"  WHERE ${conditionField} = "${conditionValue}"`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
        if (rows.affectedRows === 1)
        callback.send(JSON.stringify( values, null, 2).concat(" updated"))
        // process.stdout.write(JSON.stringify( rows ))
      }
    }) 
  }
}

module.exports = Database