const express= require('express')
const dotenv=require('dotenv')
const passport= require('passport')
const cookieParser= require('cookie-parser')
const session= require('express-session')
const passportLocal= require('passport-local').Strategy
const initConexion=require('./data/db')
const userRouter=require('./router/user')

const userSchema= require('./model/User')


const app= express()
dotenv.config();


app.use('/api/login', userRouter)
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


passport.use(new passportLocal(async function(username, password, done){
    const user= await userSchema.findOne({email: username})
if(!user){
  return done(null, false, {message: 'User not found'})
}
else{
    if(user.password!=password){
        return done(null, false, {message: 'Incorrect password'})
    }else{
        return done(null, user)
    }
}
}))

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    done(null, {id:1, name: 'Rigo'})
})




app.set('view engine', 'ejs')

app.get('/api/home',(req,res,next)=>{
    if(req.isAuthenticated()) {
        return next()
    }
     // si no hemos iniciado sesion redireccionar a vista de login
   res.redirect('/api/login')
},
 async (req, res)=>{
    //si ya iniciamos sesion mostrar vista de vienvenida    
    res.render('home')
   

})

app.get('/api/login',(req, res)=>{
   // mostrar formulario de login
    res.render('login')
})

app.post('/api/login',passport.authenticate('local',{    
    successRedirect:'/api/home',
    failureRedirect:'/api/login'
}
))

app.listen(3000, ()=>{
    console.log('Server runing in port 3000')
})
initConexion()