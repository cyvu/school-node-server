const Sanitize = require("../../classes/sanitize");

// TODO: Implement with controller in the future
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

module.exports = function (app, db) {
  const sanitize = new Sanitize.Sanitize();

  /**
   *  Create
   */
  app
    .route("/user/add")
    .get((req, res) => {
      const _database = {
        table: "users",
        fields: [],
        values: [],
      };

      for (const field in req.query) {
        _database.fields.push(sanitize.default(field, Sanitize.type.input));
        _database.values.push(
          sanitize.default(req.query[field], Sanitize.type.input)
        );
      }

      db.write({
        table: _database.table,
        fields: _database.fields,
        values: _database.values,
        callback: { req, res },
      });
    })
    .post((req, res) => {
      const _database = {
        table: "users",
        fields: [],
        values: [],
      };

      for (const field in req.query) {
        _database.fields.push(sanitize.default(field, Sanitize.type.input));
        _database.values.push(
          sanitize.default(req.query[field], Sanitize.type.input)
        );
      }

      db.write({
        table: _database.table,
        fields: _database.fields,
        values: _database.values,
        callback: { req, res },
      });
    });

  /**
   *  Update
   */
  app
    .route("/user/:id/update")
    .get((req, res) => {
      if (isNaN(req.params.id)) throw "Expected id of user after '/user/'";
      const _database = { table: "users", id: "", fields: "", values: "" };

      _database.id = sanitize.default(req.params.id, Sanitize.type.input);

      for (const field in req.query) {
        _database.fields += sanitize.default(field, Sanitize.type.input);
        _database.values += sanitize.default(
          req.query[field],
          Sanitize.type.input
        );
      }

      db.update({
        table: _database.table,
        id: _database.id,
        fields: _database.fields,
        values: _database.values,
        callback: { req, res },
      });
    })
    .post((req, res) => {
      if (isNaN(req.params.id)) throw "Expected id of user after '/user/'";
      const _database = { table: "users", id: "", fields: "", values: "" };

      _database.id = sanitize.default(req.params.id, Sanitize.type.input);

      for (const field in req.query) {
        _database.fields += sanitize.default(field, Sanitize.type.input);
        _database.values += sanitize.default(
          req.query[field],
          Sanitize.type.input
        );
      }

      db.update({
        table: _database.table,
        id: _database.id,
        fields: _database.fields,
        values: _database.values,
        callback: { req, res },
      });
    });

  /**
   * Delete
   */
  app
    .route("/user/:id/delete")
    .get((req, res) => {
      if (isNaN(req.params.id)) throw "Expected id of user after '/user/'";

      const _database = { table: "users", field: "id", value: "" };

      _database.value += sanitize.default(req.params.id, Sanitize.type.input);

      db.delete({
        table: _database.table,
        field: _database.field,
        value: _database.value,
        callback: { req, res },
      });
    })
    .post((req, res) => {
      if (isNaN(req.params.id)) throw "Expected id of user after '/user/'";

      const _database = { table: "users", field: "id", value: "" };

      _database.value += sanitize.default(req.params.id, Sanitize.type.input);

      db.delete({
        table: _database.table,
        field: _database.field,
        value: _database.value,
        callback: { req, res },
      });
    });

  /**
   * Read
   */
  app
    .route("/user/:id")
    .get((req, res) => {
      if (isNaN(req.params.id)) throw "Expected id of user after '/user/'";
      const _database = { table: "users", fields: "id", values: "" };
      _database.values += sanitize.default(req.params.id, Sanitize.type.input);
      db.read({
        table: _database.table,
        field: _database.fields,
        values: _database.values,
        callback: { req, res },
      });
    })
    .post((req, res) => {
      if (isNaN(req.params.id)) throw "Expected id of user after '/user/'";
      const _database = { table: "users", fields: "id", values: "" };
      _database.values += sanitize.default(req.params.id, Sanitize.type.input);
      db.read({
        table: _database.table,
        field: _database.fields,
        values: _database.values,
        callback: { req, res },
      });
    });

  /* Get all users from the database, by limit and position */
  app.get("/users/:amount/:start", (req, res) => {
    if (isNaN(req.params.amount))
      throw "Expected amount of users after '/users/<amount>'";
    if (isNaN(req.params.start))
      throw "Expected starting position after '/user/<amount>/<start>'";

    const _database = { table: "users", fields: "*", amount: 0, start: 0 };

    _database.amount = sanitize.default(req.params.amount, Sanitize.type.input);
    _database.start = sanitize.default(req.params.start, Sanitize.type.input);

    db.read({
      table: _database.table,
      field: _database.fields,
      amount: _database.amount,
      start: _database.start,
      callback: { req, res },
    });
  });

  /* Get all users from the database */
  app.get("/users", (req, res) => {
    const _database = { table: "users", fields: "*", values: "" };
    db.read({
      table: _database.table,
      field: _database.fields,
      callback: { req, res },
    });
    
  })
  app.post("/users", (req, res) => {
    const _database = { table: "users", fields: "*", values: "" };
    db.read({
      table: _database.table,
      field: _database.fields,
      callback: { req, res },
    });
  });
};
