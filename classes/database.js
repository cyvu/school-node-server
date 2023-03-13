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

  check({table, fields, values, callback}) {
    try {
      this.connection.query(
        `SELECT COUNT(id) 
        FROM ${table}
        WHERE firstname = 'scarlet' AND lastname = 'Dragon' AND email = 'cash@mountain.stayaway'`
        // WHERE (${fields}) = (${values})`
        , (err, rows, fields) => {
          if (err) throw err
          if (rows) {
            return rows.affectedRows
          }
      })
    } catch(err) {console.error('couldn\' execute query: ' + err)}
  }

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

  write({table, fields, values, callback}) {
    this.connection.query(`
    INSERT INTO ${table} (${fields}) VALUES (${values});`, function (err, rows, fields) {
      if (err) {
        if (err.errno = 1062) {
          callback.req.flash("message", "Then entry already exist")
          return callback.res.redirect('/')
        } else throw err
      }
      if (rows) {
        if (rows.affectedRows === 1)
          callback.res.send(JSON.stringify( values, null, 2).concat(" added"))
      }
    })
  }
  
  delete({table, field, value, callback}) {
    this.connection.query(`DELETE FROM ${table} WHERE ${field}= "${value}"`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
          if (rows.affectedRows === 1)
          callback.send(JSON.stringify( values, null, 2).concat(" deleted"))
      }
    }) 
  }
  
  update({table, field, fieldValue, conditionField, conditionValue, callback}) {
    console.log(JSON.stringify( conditionValue, null, 2).concat(" updated"))
    this.connection.query(
      `UPDATE ${table} 
      SET ${field} = "${fieldValue}" 
      WHERE ${conditionField} = "${conditionValue}"`,
      function (err, rows, fields) {
        if (err) throw err
        if (rows) {
          if (rows.affectedRows === 1)
          callback.send(JSON.stringify( values, null, 2).concat(" updated"))
        }
    }) 
  }
}

module.exports = Database