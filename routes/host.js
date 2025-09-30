const express = require('express')
const host = express.Router()
const hostController = require('../controllers/host-controller')

host.get('/add-home',hostController.getAddHome)
host.post('/add-home',hostController.postAddHome)
host.get('/host-home-list',hostController.getHostHome)

module.exports = host