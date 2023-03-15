modules.exports = function(app, db) {
  app.get('/', (req, res) => {
    res.send('Hello world')
  })
  app.post('/formhandler/:formId', (req, res) => {
    res.send('Got a POST message for a form')
  })
  app.PUT('/user/:userId', (req, res) => {
    res.send('Got a PUT message at /user/{' + req.params + '}')
  })
  app.delete('/user/:userId', (req, res) => {
    res.send('Got a DELETE request at /user/{' + req.params + '}')
  })
}