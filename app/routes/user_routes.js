const Sanitize = require('../../classes/sanitize')
const sanitize = new Sanitize.Sanitize()

module.exports = function(app, db) {
  
  /* Get all users from the database */
  app.get('/users', (req, res) => {
    db.read('persons', '*', res)
  })

  /* Example - keep comments */
  /**
   * Insert an entry to the database
   */
  app.post('/user/add', (req, res) => {
    // Local variables
    const _database = {table: "Persons", values: ''}

    // Sanitize each input
    for (const element in req.query) {
      /* TODO Deal with different input cases (input, textarea)
      if(req.query.case === input ) 
      if(req.query.case === textarea ) 
      if(req.query.case === search ) 
      */
      _database.values += sanitize.input(req.query[element], Sanitize.input_case.input) + ','
    }

    // Remove the last comma
    _database.values = _database.values.slice(0, -1)
    
    // console.log(db.write(_database.table, clean_input))
    res.send(_database.values)
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