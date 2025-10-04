const express = require('express')
const host = express.Router()
const hostController = require('../controllers/host-controller')
const upload = require('../utils/fileSaveHandle')


host.get('/add-home',hostController.getAddHome)
host.post('/add-home', upload.single('photoUrl'), hostController.postAddHome)
host.get('/home-list',hostController.getHostHome)
host.get('/home-edit/:id',hostController.getEditHome)
host.post('/home-edit',hostController.postEditHome)
host.post('/delete-home/:id',hostController.postDeleteHome)

module.exports = host