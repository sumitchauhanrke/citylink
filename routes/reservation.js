const router = require('express').Router()
const Reservation = require('../models/reservation')
const Person = require('../models/person')
const Address = require('../models/address')

router.post('/', (req, res) => {
  const person = new Person({
    name: req.body.underName.name,
    contact: req.body.underName.mobile
  })
  person
    .save()
    .then((userData) => {
      const dropAddress = new Address({
        name: req.body.dropLocation.name,
        street: req.body.dropLocation.address.streetAddress,
        locality: req.body.dropLocation.address.addressLocality,
        region: req.body.dropLocation.address.addressRegion,
        pincode: req.body.dropLocation.address.postalCode,
        country: req.body.dropLocation.address.addressCountry
      })
      dropAddress.save().then(drop => {
        const pickupAddress = new Address({
          name: req.body.pickupLocation.name,
          street: req.body.pickupLocation.address.streetAddress,
          locality: req.body.pickupLocation.address.addressLocality,
          region: req.body.pickupLocation.address.addressRegion,
          pincode: req.body.pickupLocation.address.postalCode,
          country: req.body.pickupLocation.address.addressCountry
        })
        pickupAddress.save().then(pickup => {
          const reservation = new Reservation({
            type: req.body['@type'],
            reservationId: req.body.reservationId,
            pickupTime: req.body.pickupTime,
            pickupLocation: pickup._id,
            dropLocation: drop._id
          })
          reservation.save().then(reserve => {
            Reservation.findById(reserve._id).populate('pickupLocation').populate('dropLocation').then(data => {
              return res.json({
                message: 'User and Reservation Information Stored Sucessfully',
                reservation: data,
                user: userData
              })
            })
          }).catch(err => { return res.json(err) })
        }).catch(err => { return res.json(err) })
      }).catch(err => { return res.json(err) })
    }).catch(err => { return res.json(err) })
})
module.exports = router
