const Sanitize = require('../../classes/sanitize')

module.exports = function(app, db) {
  const sanitize = new Sanitize.Sanitize()

  /* Get all users from the database */
  app.get('/users', (req, res) => {
    const _database = {table: "users", fields: '*', values: ''}
    db.read({table: _database.table, field: _database.fields, callback: res})
  })

  /* Get a user from the database */
  app.get('/user/:id', (req, res) => {
    const _database = {table: "users", fields: 'id', values: ''}
    _database.values += sanitize.default(req.params.id, Sanitize.input_case.input)
    db.read({table: _database.table, field: _database.fields, values: _database.values, callback: res})
  })

  /**
   * Insert an entry to the database
   */
  app.post('/user/add', (req, res) => {
    const _database = {table: "users", fields: '', values: ''}

    // Sanitize each input
    for (const field in req.query) {
      /* TODO Deal with different input cases (input, textarea)
      if(req.query.case === input ) 
      if(req.query.case === textarea ) 
      if(req.query.case === search ) 
      */
      _database.values += sanitize.default('\"' + req.query[field] + '\"', Sanitize.input_case.input) + ','
      _database.fields += sanitize.default(field, Sanitize.input_case.input) + ','
    }

    _database.values = _database.values.slice(0, -1)  // Remove last comma
    _database.fields = _database.fields.slice(0, -1)  // Remove last comma

    /* TODO: Check if user exists and abort if true */
    db.write({table: _database.table, fields: _database.fields, values: _database.values, callback: {req, res}})
  })
}

/*
  const collection = app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title }
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' })
      } else {
        res.send(result.ops[0])
      }
    })
  })
*/