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
            newUser.password=await newUser.encryptPassword(password)
            await newUser.save()           
            return done(null, newUser)   
    }
    else{
            return done(null, false, req.flash('signUpMessage','The user is already'))
    }

}))


passport.use('local-signIn', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{
const newUser= new User()

const userOne= await User.findOne({username:username})
if(!userOne){
    return done(null, false, req.flash('signInMessage','The user is not found'))
}
const passwordCompared= await userOne.comparePassword(password, userOne.password)
if(!passwordCompared){
    return done(null, false, req.flash('signInMessage','The password is incorrect'))
}
    return done(null, userOne)

}
//}
)
)



