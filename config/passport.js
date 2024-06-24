const passport= require('passport')
const User=require('../model/User')
const LocalStrategy=require('passport-local').Strategy

passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser(async(id, done)=>{
   const user= await User.findById(id)
   done(null, user)
})
passport.use('local-strategy', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{
    console.log('crear user')
    const user= new User()
    user.username=username
    user.password=user.encryptPassword(password)
    await user.save()
    done(null, user)
}))



