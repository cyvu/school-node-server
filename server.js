const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
// const MongoClient = require('mongodb').MongoClient
const Database = require("./classes/database");
// const db = require('./config/db')   // TODO keep?

const app = express();
const port = 8000;


const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

const db = new Database();
require("./app/routes")(app, db);

app.listen(port, () => {
  console.log("We are live on " + port);
});
