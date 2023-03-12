const Sanitize = require('../../classes/sanitize')

module.exports = function(app, db) {
  const sanitize = new Sanitize.Sanitize()

  /* Get all users from the database */
  app.get('/users', (req, res) => {
    db.read('persons', '*', res)
  })

  /* Get a user from the database */
  app.get('/user/:id', (req, res) => {
    
  })

  /**
   * Insert an entry to the database
   */
  app.post('/user/add', (req, res) => {
    const _database = {table: "Persons", values: '', elements: ''}

    // Sanitize each input
    for (const element in req.query) {
      /* TODO Deal with different input cases (input, textarea)
      if(req.query.case === input ) 
      if(req.query.case === textarea ) 
      if(req.query.case === search ) 
      */
      _database.values += sanitize.input(req.query[element], Sanitize.input_case.input) + ','
      _database.elements += sanitize.input(element, Sanitize.input_case.input) + ','
    }

    _database.values = _database.values.slice(0, -1)  // Remove last comma
    _database.elements = _database.elements.slice(0, -1)  // Remove last comma

    /* TODO: Check if user exists and abort if true
    try {
      let res = db.read(_database.table, '_database.elements', '_database.values')  // TODO: Expand read method
      if (res == 1) {
        console.error('user already exist')
      }
    } catch(err) { console.log('something went wrong')} 
    */
    
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