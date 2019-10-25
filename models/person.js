const mongoose = require('mongoose')
const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
const Person = mongoose.model('person', personSchema)
module.exports = Person

module.exports.addPerson = (person, callback) => {
  person.save()
}
