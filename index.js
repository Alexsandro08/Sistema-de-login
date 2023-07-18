const express = require('express')
const app = express()
const hand = require('express-handlebars')
const path = require('path')
const Router = require('./routes/index')
const session = require('express-session')
const flash = require('connect-flash')
const db = require('./models/db')
const mongoose = require('mongoose')
const passport = require('passport')
const {user} = require('./helps/user')
require('./config/att')(passport)



//Session
app.use(session({
    secret:"MinhaChave0802",
    resave:true,
    saveUninitialized:true
}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

//middleware
app.use((req,res, next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error') 
    res.locals.user = req.user || null
    next()
})

//bodyPaser
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//handlebars

app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', hand.engine({defaultLayout: 'main'})),
 

app.set('view engine', 'handlebars')

//Arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')))


//Rotas
app.use(Router)
app.get("/", (req,res)=>{
    res.render('form/login')
})
app.get('/home', user,(req,res)=>{
    res.render('home/index')
})












const Port = process.env.Port || 8080
app.listen(Port,()=>{
    console.log('Porta criada na ' + Port)
})