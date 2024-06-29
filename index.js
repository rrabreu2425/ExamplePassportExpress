const express= require('express')
const expressSesion= require('express-session')
const dotenv=require('dotenv')
const initConexion=require('./data/db')
const loginRouter=require('./router/login')
const homeRouter=require('./router/home')
const passport= require('passport')
const flash=require('connect-flash')
require('./config/passport')





const app= express()
dotenv.config();
app.set('view engine', 'ejs')

//midelwares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(expressSesion({
    secret:'mysecretsession',
    resave: false,
    saveUninitialized:false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next)=>{
    app.locals.signUpMessage= req.flash('signUpMessage')
    app.locals.userCreated= req.flash('userCreated')
    app.locals.signInMessage= req.flash('signInMessage')
    next()
})

app.use('/', loginRouter)
app.use('/home', homeRouter)







app.listen(3000, ()=>{
    console.log('Server runing in port 3000')
})
initConexion()