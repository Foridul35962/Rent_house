exports.getLogin = (req, res, next) => {
  res.render('auth/loginPage', { pageTitle: "Login" })
}

exports.postLogin = (req, res, next)=>{
    res.redirect('/')
}