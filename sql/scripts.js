//import * as env from '../\.env';
const fs = require("fs");
const Database = require("../classes/database");
const { CLIENT_RENEG_LIMIT } = require("tls");

const base = __dirname + "/";

const database = {
  tables: {
    path: "tables/",
    create: "tables.sql",
    delete: null,
    truncate: null,
  },
  procedures: {
    users: {
      path: "procedures/users/",
      create: "create.sql",
      read: "read.sql",
      update: "update.sql",
      delete: "delete.sql",
    },
  },
  dummy: {
    path: "_dummy/",
    users: "users.sql",
  },
};

function readFiles(filePath, cb) {
  try {
    let data = "";
    const order = [
      database.tables.create,
      database.procedures.users.create,
      database.procedures.users.read,
      database.procedures.users.update,
      database.procedures.users.delete,
      database.dummy.users,
    ];
    order.forEach((element) => {
      // data += fs.readFileSync(__dirname + element, "utf-8") + "\n";
      console.log(base + element, "utf-8");
    });
    fetchQuery(data);
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function fetchQuery(query) {
  try {
    const db = new Database(true);
    console.log(query);
    db.run(query);
    db.closeConnection();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

if ("tables" === process.argv[2]) {
  if ("users" === process.argv[3]) {
    fs.readFile(
      database.dummy.path + database.dummy.users,
      "utf-8",
      (err, data) => {
        if (err) return err;
        console.log(data);
      }
    );
  }
}

if ("procedures" === process.argv[2]) {
  if (process.argv[3] === "users") {
    fs.readFile(
      database.dummy.path + database.dummy.users,
      "utf-8",
      (err, data) => {
        if (err) return err;
        console.log(data);
      }
    );
  }
}

if ("dummy" === process.argv[2]) {
  if (process.argv[3] === "users") {
    fs.readFile(
      database.dummy.path + database.dummy.users,
      "utf-8",
      (err, data) => {
        if (err) return err;
        console.log(data);
      }
    );
  }
}

if ("reset" === process.argv[2]) {
  readFiles(database);
}
