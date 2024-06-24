const express= require('express')
const passport= require('passport')
const homeRouter= express.Router()
const controller= require('../controller/home')
const app= express()

app.use('/home', homeRouter)

homeRouter.get('/',(req, res)=>{
res.render('home')
})

module.exports= homeRouter