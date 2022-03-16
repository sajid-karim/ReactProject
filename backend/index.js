const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const db = require('./queries')

const port = 4000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.delete('/users/:id', db.deleteUser)
app.post('/books', db.addBooks)
app.get('/books', db.getBooks)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})