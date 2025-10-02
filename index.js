const express = require('express')
const path = require('path')
//for login require
const session = require('express-session')
const mongoStore = require('connect-mongodb-session')(session)
const mongoUrl = "mongodb+srv://foridulislam35962_database:foridulislam35962_database@cluster35962.maduxse.mongodb.net/rent_house?retryWrites=true&w=majority&appName=Cluster35962";

//local module
const user = require('./routes/user')
const host = require('./routes/host')
const auth = require('./routes/auth')
const errorController = require('./controllers/error-controller')
const {mongoConnect} = require('./utils/database');

const app = express()

//permit to public file
app.use(express.static(path.join('./public')))

//for getting value from user
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//setting ejs for html
app.set('view engine', 'ejs')

//connect to session on mongodb
const store = new mongoStore({
    uri: mongoUrl,
    collection: 'session'
})

//setting session
app.use(session({
    secret: 'Forid login auth',
    resave:false,
    saveUninitialized: true,
    store
}))

//routes pages
app.use(auth)
app.use(user)
app.use('/host',(req, res, next)=>{
    if (req.session.isLoggedIn) {
        next()
    }
    else{
        res.redirect('/')
    }
})
app.use("/host", host)
app.use('/error',(errorController.pageNotFound))

const PORT = 3000

mongoConnect(()=>{
    console.log('mongodb is connected');
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    })
})
