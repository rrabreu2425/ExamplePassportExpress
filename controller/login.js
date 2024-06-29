const userSchema= require('../model/User')
const passport= require('passport')
const controller= {}

controller.getSignIn= (req, res)=>{
    res.render('signin', {user: req.user})
}

controller.getSignUp=(req, res)=>{
    res.render('signup', {user: req.user})
}

controller.postSignIn= passport.authenticate('local-signIn', {
    successRedirect:'/home',
    failureRedirect:'/signin',
    passReqToCallback:true
})

controller.postSignUp= passport.authenticate('local-signUp', {
    successRedirect:'/home',
    failureRedirect:'/signup',
    passReqToCallback:true
})

controller.getLogOut= function(req, res, next) {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/signin");
    });
  }

module.exports= controller