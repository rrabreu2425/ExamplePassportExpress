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
passport.use('local-signUp', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{
      const userOne= await User.findOne({username:username})
        if(!userOne){
            const newUser= new User()
            newUser.username=username
            newUser.password=newUser.encryptPassword(password)
            await newUser.save()           
            return done(null, newUser, req.flash('userCreated','The user is created'))   
    }
    else{
            return done(null, false, req.flash('signUpMessage','The user is already'))
    }

}))



