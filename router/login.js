const express= require('express')
const loginRouter= express.Router()
const passport= require('passport')
const app= express()
app.use('/', loginRouter)
//Routers
loginRouter.get('/signin', (req, res)=>{
    res.render('signin')
})
loginRouter.get('/signup', (req, res)=>{
    res.render('signup')
})
loginRouter.post('/signin', (req, res)=>{
    return console.log('prueba')
})


loginRouter.post('/signup', passport.authenticate('local-strategy', {
    successRedirect:'/home',
    failureRedirect:'/signup',
    passReqToCallback:true
    

}))


module.exports= loginRouter
