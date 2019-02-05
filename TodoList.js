// Contains all user related routes

// Express
const express = require('express')

// My SQL
const mysql = require('mysql')

// Router Object
const router = express.Router()

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'syed12345',
    database: 'lbta_todolist'
})

// Global MySQL Connection
function getConnection() {
    return pool
}

// Get all Todo List Items
router.get("/todolistitems", (req, res) => {
    const queryString = "SELECT * FROM ToDoListItems"
    getConnection().query(queryString, (err, rows, field) => {
        // Check for errors
        if (err) {
          console.log("Failed to query for users")
          res.sendStatus(500)
          return 
        }
        res.json(rows)
    })
})

// Get User by ID
router.get("/todolist/:id", (req, res) => {  
    const todolistId = req.params.id
    const queryString = "SELECT * FROM ToDoListItems WHERE id = ?"
    getConnection().query(queryString, [todolistId], (err, rows, field) => {
  
      // Check for errors
      if (err) {
        console.log("Failed to query for todolist items: " + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
})

// POST a To Do List Item
router.post('/todolist_create', (req, res) => {

    // Get title, description, and completion
    console.log("Here's the title: " + req.body.title)
    console.log("Here's the description: " + req.body.description)

    const title = req.body.title
    const description = req.body.description
    const completed = 0
  
    // SQL Query to insert objects
    const queryString = "INSERT INTO ToDoListItems (title, description, completed) VALUES (?, ?, ?)"
    getConnection().query(queryString, [title, description, completed], (err, results, fields) => {
  
      // Check for errors
      if (err) {
        console.log("Failed to insert new item: " + err)
        res.sendStatus(500)
        return 
      }
      console.log("Inserted a new item with id: ", results.insertedId)
      res.end()
    })
    res.end()
})

module.exports = router 