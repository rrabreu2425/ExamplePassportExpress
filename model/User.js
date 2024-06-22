const mongoose=require('mongoose')
const UserSchema= new mongoose.Schema({
    email: String,
    password: String,
    rol: String

})