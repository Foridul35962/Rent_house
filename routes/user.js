const express = require('express')
const user = express.Router()
const storeController = require('../controllers/store-controller')

user.get('/',storeController.getIndex)
user.get('/homes',storeController.getHomes)
user.get('/bookings',storeController.getBookings)
user.get('/favourites',storeController.getFavouriteList)
user.get('/homes/:homeId',storeController.getHomeDetails)

module.exports = user