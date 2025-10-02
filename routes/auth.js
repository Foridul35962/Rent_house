const express = require('express')
const auth = express.Router()
const authController= require('../controllers/auth-controller')

auth.get('/login',authController.getLogin)
auth.post('/login',authController.postLogin)
auth.post('/logout',authController.postLogOut)

module.exports = auth