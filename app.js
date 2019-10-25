const express = require('express')
const mongoose = require('mongoose')
const reservationRoute = require('./routes/reservation')
const csvRoute = require('./routes/csv')

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, db) => {
  if (err) console.log(err)
  else console.log('connected to the database successfully')
})

const app = express()

// use json body parser
app.use(express.json())

// routes for reservation
app.use('/reservation', reservationRoute)

// route for csv file upload and alteration
app.use('/csv', csvRoute)

// handle cors errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,DELETE,GET')
    return res.status(200).json({})
  }
  next()
})

// handling unhandled routes
app.use((error, res) => {
  if (error.status !== 500) {
    error.status = 404
    error.message = 'Page not found'
  }

  res.json({
    error: {
      status: error.status,
      message: error.message
    }
  })
})

module.exports = app
