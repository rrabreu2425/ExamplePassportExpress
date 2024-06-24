const mongoose=require('mongoose')
const bcrypt= require('bcrypt-node')
const UserSchema= new mongoose.Schema({    
   username : String,
   password: String,
})

UserSchema.methods.encryptPassword=(password)=>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword=function(password){
   return bcrypt.compare(password, this.password)

}
const User= new mongoose.model('User', UserSchema)
module.exports= User