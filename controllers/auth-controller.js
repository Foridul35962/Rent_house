exports.getLogin = (req, res, next) => {
  res.render('auth/loginPage', { pageTitle: "Login", isLoggedIn:req.isLoggedIn })
}

exports.postLogin = (req, res, next) => {
  res.cookie('isLoggedIn',true)
  res.redirect('/')
}

exports.postLogOut = (req, res, next)=>{
  res.cookie('isLoggedIn', false)
  res.redirect('/')
}