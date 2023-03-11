//import * as env from '../\.env';
import { Database } from "../database.mjs"








const db = new Database()

db.read("Persons", "LastName")
db.closeConnection()