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

  describe({table}) {
    this.connection.query(`DESCRIBE ${table}`, (err, rows, fields) => {
    })
  }

  /* TODO: clean on prod */
  read({table, field, values, callback}) {
    // Get a user if values is not empty
    if (values) {
      this.connection.query(`SELECT * FROM ${table} WHERE ${field} = ${values}`, (err, rows, fields) => {
        if (err) throw err
        if (rows) {
          callback.send(rows)
        }
      })
    } else {
      // Get all users if values is empty
      this.connection.query(`SELECT ${field} FROM ${table}`, (err, rows, fields) => {
        if (err) throw err
        if (rows) {
          callback.send(rows)
        }
      })
    }
  }

  /* TODO: clean on prod */
  write({table, values, callback}) {
    this.connection.query(`INSERT INTO ${table} VALUES (${values})`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
        if (rows.affectedRows === 1)
          return JSON.stringify( values, null, 2).concat(" added")
          callback.send(JSON.stringify( values, null, 2).concat(" added"))
      }
    })
  }
  
  /* TODO: clean on prod */
  delete({table, field, value, callback}) {
    this.connection.query(`DELETE FROM ${table} WHERE ${field}= "${value}"`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
          if (rows.affectedRows === 1)
          callback.send(JSON.stringify( values, null, 2).concat(" deleted"))
      }
    }) 
  }
  
  /* TODO: clean on prod */
  update({table, field, fieldValue, conditionField, conditionValue, callback}) {
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