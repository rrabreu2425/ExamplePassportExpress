const mongoose=require('mongoose')
const bcryptjs= require('bcryptjs')
const UserSchema= new mongoose.Schema({    
   username : String,
   password: String,
})

UserSchema.methods.encryptPassword=async(password)=>{
  return await bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
}

UserSchema.methods.comparePassword=async(password, passHashed)=>{
   return await bcryptjs.compare(password, passHashed)
   

}
const User= new mongoose.model('User', UserSchema)
module.exports= User