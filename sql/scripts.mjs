//import * as env from '../\.env';
const fs = require(fs)
const Database = require('../classes/database')
const db = new Database()



if (db.isConnected()) {
   fs.read()
}