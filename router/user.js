const express= require('express')
const userRouter= express.Router()
const controller= require('../controller/User')

const app= express()


app.use('/api/login', userRouter)

userRouter.get('/',controller.allUser)

module.exports= userRouter