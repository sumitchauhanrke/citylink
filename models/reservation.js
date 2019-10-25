const mongoose = require('mongoose')
const Address = require('./address')
const reservationSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  reservationId: {
    type: Number,
    required: true,
    unique: true
  },
  pickupTime: {
    type: Date,
    required: true
  },
  pickupLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Address
  },
  dropLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Address
  }
})
const Reservation = mongoose.model('reservation', reservationSchema)
module.exports = Reservation
