// Dependencies
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Get values from HTML Objects
app.use(bodyParser.urlencoded({extended: false}))

// Logging
app.use(morgan('short'))

// Create a router 
 const router = require('./TodoList.js')
 app.use(router)

// localhost: 3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003!");
})
