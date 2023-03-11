const bodyParser = require('body-parser')
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const Database = require('./classes/database')
// const db = require('./config/db')   // TODO keep?

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))

/*
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database)
})
*/

const db = new Database()

if (db.isConnected()) {
  console.log("Database connected")
  require('./app/routes')(app, db)
} else
  console.error("db not connected")


app.listen(port, () => { console.log('We are live on ' + port)})