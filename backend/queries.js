const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sajid',
  host: 'localhost',
  database: 'students',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM student ORDER BY id ASC', (error, results) => {
      if (error) {
        console.log(error)
      }
      response.status(200).json(results.rows)
    })
  }

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM student WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.log(error)
      }
      response.status(200).json(results.rows)
    })
  }

const createUser = (request, response) => {
    const { firstname, lastname } = request.body
  
    pool.query('INSERT INTO student (firstname, lastname) VALUES ($1, $2)', [firstname, lastname], (error, results) => {
      if (error) {
        console.log(error)
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.log(error)
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
  }