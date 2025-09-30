const Home = require('../models/home')

exports.getAddHome = (req,res,next)=>{
    res.render('host/add-home',{pageTitle: "Add Home to airbnb"})
}

exports.getHostHome = (req,res,next)=>{
    Home.fetchAll((registerHome)=>{
        res.render('host/host-home-list',{pageTitle: "Add Home to airbnb"})
    })
}

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  res.render("host/submit-home", {
    pageTitle: "Home Added Successfully"
  });
};