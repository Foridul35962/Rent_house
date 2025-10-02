const express = require('express')
const auth = express.Router()
const authController= require('../controllers/auth-controller')

auth.get('/login',authController.getLogin)
auth.post('/login',authController.postLogin)
auth.post('/logout',authController.postLogOut)
auth.get('/register',authController.getRegister)
auth.post('/register',authController.postRegister)

module.exports = auth