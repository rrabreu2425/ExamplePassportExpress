const userSchema= require('../model/User')
const controller= {}

controller.getLogin= (req, res)=>{
    res.render('login')
}

module.exports= controller