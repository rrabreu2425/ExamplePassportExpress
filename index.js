const express= require('express')
const dotenv=require('dotenv')
const passport= require('passport')
const cookieParser= require('cookie-parser')
const session= require('express-session')
const passportLocal= require('passport-local').Strategy


const app= express()
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('mi secreto'))
app.use(session({
    secret:'mi secreto',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


passport.use(new passportLocal(function(email, password, done){
 if(email=='rrabreu@gmail.com' && password=='123'){
    return done(null,{id:1, name: 'Rigo'})
 }
   return done(null, false)
}))

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    done(null, {id:1, name: 'Rigo'})
})




app.set('view engine', 'ejs')

app.get('/', (req,res,next)=>{
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
},(req, res)=>{
    //si ya iniciamos sesion mostrar vista de vienvenida
res.render('home')
    // si no hemos iniciado sesion redireccionar a vista de login

})

app.get('/login',(req, res)=>{
   // mostrar formulario de login
    res.render('login')
})

app.post('/login',passport.authenticate('local',{    
    successRedirect:'/',
    failureRedirect:'/login'
}
))

app.listen(3000, ()=>{
    console.log('Server runing in port 3000')
})