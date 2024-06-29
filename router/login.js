const express= require('express')
const loginRouter= express.Router()
const passport= require('passport')
const app= express()
app.use('/', loginRouter)
//Routers
loginRouter.get('/signin', (req, res)=>{
    res.render('signin', {user: req.user})
})
loginRouter.get('/signup', async(req, res)=>{
            res.render('signup', {user: req.user})
})
loginRouter.post('/signin', passport.authenticate('local-signIn', {
    successRedirect:'/home',
    failureRedirect:'/signin',
    passReqToCallback:true
}))


loginRouter.post('/signup', passport.authenticate('local-signUp', {
    successRedirect:'/home',
    failureRedirect:'/signup',
    passReqToCallback:true
    

}))
loginRouter.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/signin");
    });
  });



module.exports= loginRouter
