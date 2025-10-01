const express = require('express')
const host = express.Router()
const hostController = require('../controllers/host-controller')

host.get('/add-home',hostController.getAddHome)
host.post('/add-home',hostController.postAddHome)
host.get('/home-list',hostController.getHostHome)
host.get('/home-edit/:id',hostController.getEditHome)
host.post('/home-edit',hostController.postEditHome)

module.exports = host