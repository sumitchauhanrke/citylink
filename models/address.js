const mongoose = require('mongoose')
const addressSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  }
})
const Address = mongoose.model('address', addressSchema)
module.exports = Address
