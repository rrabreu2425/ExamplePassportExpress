const express= require('express')
const loginRouter= express.Router()
const passport= require('passport')
const app= express()
app.use('/', loginRouter)
//Routers
loginRouter.get('/signin', (req, res)=>{
    res.render('signin')
})
loginRouter.get('/signup', async(req, res)=>{
            res.render('signup')
})
loginRouter.post('/signin', passport.authenticate('local-signIn', {
    successRedirect:'/home',
    failureRedirect:'/signip',
    passReqToCallback:true
}))


loginRouter.post('/signup', passport.authenticate('local-signUp', {
    successRedirect:'/home',
    failureRedirect:'/signup',
    passReqToCallback:true
    

}))


module.exports= loginRouter
