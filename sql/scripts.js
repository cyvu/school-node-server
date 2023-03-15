//import * as env from '../\.env';
const fs = require("fs");
const Database = require("../classes/database");

const base = "\\statements\\";

const database = {
  truncate: base + "tables-truncate.sql",
  drop: base + "tables-drop.sql",
  create: base + "tables-create.sql",
  insert: base + "tables-insert.sql",
};

function readFiles(filePath, cb) {
  try {
    let data = "";
    const order = [
      database.truncate,
      database.drop,
      database.create,
      database.insert,
    ];
    order.forEach((element) => {
      data += fs.readFileSync(__dirname + element, "utf-8") + "\n";
    });
    fetchQuery(data)
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function fetchQuery(query) {
  try {
    const db = new Database(true);
    console.log(query);
    db.run(query)
    db.closeConnection();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

switch (process.argv[2]) {
  case "drop":
    {
      fs.readFile(database.drop, "utf-8", (err, data) => {
        if (err) return err;
        console.log(data);
      });
    }
    break;

  case "create":
    {
      fs.readFile(database.create, "utf-8", (err, data) => {
        if (err) return err;
        console.log(data);
      });
    }
    break;

  case "insert":
    {
      fs.readFile(database.insert, "utf-8", (err, data) => {
        if (err) return err;
        console.log(data);
      });
    }
    break;

  case "truncate":
    {
      fs.readFile(database.truncate, "utf-8", (err, data) => {
        if (err) return err;
        console.log(data);
      });
    }
    break;

  case "reset":
    {
      readFiles(database);
    }
    break;

  default:
    console.log(
      "One of the following commands should be supplied as an argument: "
    );
    for (const field in database) console.log(field);
    break;
}
