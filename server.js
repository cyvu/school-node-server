const mysql = require('./database.js')
const bodyParser = require('body-parser')
const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))

require('./app/routes')(app, {})
app.listen(port, () => { console.log('We are live on ' + port)})
