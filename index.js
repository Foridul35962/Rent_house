const express = require('express')
const path = require('path')

//local module
const user = require('./routes/user')
const host = require('./routes/host')
const auth = require('./routes/auth')
const errorController = require('./controllers/error-controller')
const {mongoConnect} = require('./utils/database')

const app = express()

//permit to public file
app.use(express.static(path.join('./public')))

//for getting value from user
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//setting ejs for html
app.set('view engine', 'ejs')

//get cookies
app.use((req, res, next)=>{
    req.isLoggedIn = req.get('Cookie') ? req.get('Cookie').split('=')[1]=== 'true' : false;
    next()
})

//routes pages
app.use(auth)
app.use(user)
app.use('/host',(req, res, next)=>{
    if (req.isLoggedIn) {
        next()
    }
    else{
        res.redirect('/')
    }
})
app.use("/host", host)
app.use(errorController.pageNotFound)

const PORT = 3000

mongoConnect(()=>{
    console.log('mongodb is connected');
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    })
})
