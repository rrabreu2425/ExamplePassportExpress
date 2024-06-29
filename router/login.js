const express= require('express')
const loginRouter= express.Router()
const passport= require('passport')
const controller= require('../controller/login')
const app= express()
app.use('/', loginRouter)
//Routers
loginRouter.get('/signin', controller.getSignIn)
loginRouter.get('/signup', controller.getSignUp)
loginRouter.post('/signin', controller.postSignIn)
loginRouter.post('/signup', controller.postSignUp)
loginRouter.get('/logout', controller.getLogOut);



module.exports= loginRouter
