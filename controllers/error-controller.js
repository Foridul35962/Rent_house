exports.pageNotFound = (req,res,next)=>{{
    res.status(404).render('error',{pageTitle: 'Page Not Found', isLoggedIn: req.session.isLoggedIn})
}}