const express = require('express')
const path = require('path')

//local module
const user = require('./routes/user')
const host = require('./routes/host')
const errorController = require('./controllers/error-controller')

const app = express()

//permit to public file
app.use(express.static(path.join('./public')))

//for getting value from user
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//setting ejs for html
app.set('view engine', 'ejs')


//routes pages
app.use(user)
app.use("/host",host)
app.use(errorController.pageNotFound)

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})