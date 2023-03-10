//import { mysql_user, mysql_pass, mysql_db } from '/env/credentials.js';
import * as Database from "js/classes/database.mjs"








const db = new Database()

db.read("Persons", "LastName")
db.closeConnection()