const userSchema= require('../model/User')
const controller= {}

controller.allUser=async(req, res)=>{
    const datos=await userSchema.find()
    console.log(datos[0])

}


module.exports= controller