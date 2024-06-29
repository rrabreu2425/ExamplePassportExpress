const express= require('express')
const passport= require('passport')
const homeRouter= express.Router()
const controller= require('../controller/home')
const app= express()

app.use('/home', homeRouter)

homeRouter.get('/', (req, res)=>{
    if(req.isAuthenticated())
        return res.render('home', {user: req.user})
        res.render('signin', {user: req.user})
    
    
})

module.exports= homeRouter