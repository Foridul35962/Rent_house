exports.getLogin = (req, res, next) => {
  res.render('auth/loginPage', { pageTitle: "Login", isLoggedIn:req.session.isLoggedIn })
}

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true
  res.redirect('/')
}

exports.postLogOut = (req, res, next)=>{
  req.session.destroy(()=>{
    res.redirect('/')
  })
}