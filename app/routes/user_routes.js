const Sanitize = require('../../classes/sanitize')
const sanitize = new Sanitize.Sanitize()

module.exports = function(app, db) {

  app.get('/users', (req, res) => {
    db.read('persons', '*', res)
  })
  app.post('/user/add', (req, res) => {
    let clean_input = {}
    for (const element in req.query)
      clean_input.push(sanitize.input(element, Sanitize.input_case.input))

    /* Sanitize input - TODO: put in a class later */
    // db.write('persons', '*', res)
    res.send(clean_input)
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